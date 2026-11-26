# Templates Camel X : problèmes rencontrés, corrections, à savoir

Document interne, hors du site (Docusaurus ne publie que `docs/`). Il recense ce qui a été
rencontré en construisant et en testant les quinze templates de `camelx.io` (novembre 2026),
composant par composant, avec la correction retenue. La partie utile aux utilisateurs est publiée
sur le site : `docs/projects/troubleshoot-camel-routes.md`.

Versions : Camel 4.22.0, Camel Quarkus 3.39.0, plateforme Quarkus 3.39.1, YAML DSL.
Sources des templates : `assets/scripts/templates/` (non versionné), scripts `publish.js`,
`reindex.js`, `split.js`, `docs.js`, simulateurs dans `test/`.

## Camel YAML DSL et langage Simple

| Problème | Cause | Correction |
|---|---|---|
| Échec au démarrage sur `${body.length()}`, `${header.a.b}`, `${exception.statusCode}`, `${header[x.y]}` | toute expression OGNL dans Simple exige le langage `bean`, absent du build | en-têtes ou propriétés posés avant, ou `jsonpath` sur un corps de type Map |
| Erreur du parseur de propriétés sur `"...{{prop}}}}"` | un `{{prop}}` dans une chaîne Simple qui se termine par `}}` trompe le parseur | lire la propriété dans une propriété d'échange d'abord, puis `${exchangeProperty.x}` |
| Espaces et sauts de ligne perdus dans un `simple` | les expressions sont rognées par défaut | `trim: false` |
| `loop doWhile` qui ne tourne jamais | `CamelLoopIndex` n'existe pas avant le premier tour : la condition qui l'utilise est fausse | condition sur une propriété (`hasMore`), limite de pages vérifiée dans la boucle |
| `${file:ext.single}` refusé | n'existe pas | `${file:ext}` |
| Avertissement « compact notation » | `to: direct:x` dans le DSL REST | `to: { uri: direct:x }` |
| Démarrage en échec après découpage en fichiers | un même `id` de nœud dans deux fichiers | ids uniques dans tout le projet |
| `routeConfiguration ... already exists` | classes obsolètes dans `target/` après renommage | `mvn clean package` |

## Gestion des erreurs

| Problème | Cause | Correction |
|---|---|---|
| Le `onException` et les reprises de la route appelante ne s'appliquent jamais (503 vide) | une sous-route `direct:` avec l'error handler par défaut marque l'échange comme épuisé | `routeConfiguration` avec `errorHandler: noErrorHandler: {}` sur les sous-routes |
| Reprise qui ne refait pas l'appel complet | Camel ne relivre que le processeur en échec | isoler l'appel (en-têtes, corps, jeton, requête) dans une sous-route `direct:` reprise par l'appelant |
| Aucune reprise, 503 vide | les appels étaient dans un `doTry`, qui désactive l'error handler de la route | `doTry` limité à la validation ; appels repris hors du `doTry` |
| Politique différente par réponse | — | `throwExceptionOnFailure: false`, `choice` sur `CamelHttpResponseCode` ; 429/5xx → `IllegalStateException` (repris), autre 4xx → `IllegalArgumentException` (parqué tout de suite) |
| Message parqué déjà transformé | — | `useOriginalMessage: true` |
| Propriétés `CamelCircuitBreaker*` incohérentes | peu fiables avec MicroProfile Fault Tolerance | ne pas s'appuyer dessus ; décider sur la réponse de repli |
| Resilience4j introuvable | seul `camel-quarkus-microprofile-fault-tolerance` est dans le BOM | `faultToleranceConfiguration` (`timeoutEnabled`, `timeoutDuration`, `requestVolumeThreshold`, `failureRatio`, `delay`, `successThreshold`) |

## HTTP

| Problème | Cause | Correction |
|---|---|---|
| `UnsatisfiedLinkError` Brotli | HttpClient 5 propose `br`, le décodeur natif manque | `Accept-Encoding: gzip` |
| Un 429/503 réussit « tout seul » | HttpClient 5 retente une fois, en respectant `Retry-After` | à savoir : deux couches de reprise (client puis Camel) |
| Options de l'endpoint après un second `?` | query string écrite dans l'URL de `toD` | requête dans l'en-tête `CamelHttpQuery` ; effacer les propriétés propres à un appel après chaque appel |
| Délai d'appel | — | option d'endpoint `responseTimeout` |

## Kafka et Nisshi

| Problème | Cause | Correction |
|---|---|---|
| Enregistrement publié sans clé | `kafka.KEY` ignoré en Camel 4 | `CamelKafkaKey` (vérifié dans le jar : `CamelKafkaKey`, `CamelKafkaPartition`, `CamelKafkaOffset`, `CamelKafkaTopic`) |
| `UNKNOWN_PRODUCER_ID` après redémarrage du broker | le moteur mémoire de Nisshi perd l'état des producteurs | moteur SQLite sur volume Docker ; ou redémarrer l'application |
| `nisshi cat consume` affiche des clés nulles | affichage de l'outil | vérifier les clés autrement (consommateur Camel, log) |
| Réponse webhook trop tardive quand Kafka est coupé | délais du producteur par défaut longs | `maxBlockMs`, `requestTimeoutMs`, `deliveryTimeoutMs` courts |

## Debezium (PostgreSQL)

| Problème | Cause | Correction |
|---|---|---|
| Modification perdue pendant une coupure Kafka | Debezium avance sa position quand la route rend la main ; un dead letter sur le même broker échoue aussi | `onException KafkaException` avec `maximumRedeliveries: -1` et back-off plafonné, appliqué à la route `change-event` elle-même |
| Suppression sans la ligne | `replica identity` par défaut | `alter table ... replica identity full` |
| WAL qui grossit | le slot conserve le journal tant qu'il n'est pas lu | surveiller `pg_replication_slots` ; supprimer le slot avec l'intégration |
| Nouveau snapshot au redémarrage | fichier d'offsets perdu | `offsetStorageFileName` sur volume persistant ; une seule réplique |
| En-têtes | — | `CamelDebeziumOperation`, `CamelDebeziumKey`, `CamelDebeziumBefore`, `CamelDebeziumIdentifier`, `CamelDebeziumTimestamp` ; convertisseur Struct → Map |

## S3

| Problème | Cause | Correction |
|---|---|---|
| Synthèse tronquée à la longueur du fichier source | `CamelAwsS3ContentLength` hérité de l'objet lu | `removeHeaders "*"` juste avant le `put` |
| `deleteAfterRead` cassé | en-têtes retirés au début de la route : le consommateur en a besoin pour supprimer | retirer les en-têtes seulement avant l'écriture |
| Images MinIO non téléchargeables | images retirées | `adobe/s3mock:4.2.0` pour les tests |

## SQL, Flyway, PostgreSQL

| Problème | Cause | Correction |
|---|---|---|
| Flyway refuse un schéma existant | schéma non vide | `baseline-on-migrate=true`, `baseline-version=0` |
| `validate` Flyway en échec entre projets de test | plusieurs projets sur la même base | une base de test par projet |
| Lignes sautées en synchronisation incrémentale | deux lignes au même `updated_at` de part et d'autre d'une limite de lot | curseur `(updated_at, id) > (:w, :id)` et tri sur la paire |
| Commande stockée sans événement, ou l'inverse | deux écritures | une seule instruction CTE insère la commande et l'outbox ; relais SQL avec `onConsume` |

## JSON Schema, JSONata, XSLT

| Problème | Cause | Correction |
|---|---|---|
| Adresse valide refusée (`.example`) | le format `email` contrôle le TLD | `pattern` |
| Messages de validation en français | langue de la JVM | `-Duser.language=en` |
| Fichier partiellement importé | — | `$error()` dans JSONata arrête l'échange : un fichier entier en quarantaine |
| JSON depuis SOAP | — | XSLT 3.0 via `xslt-saxon`, `xsl:output method="json"` et maps ; XPath par `local-name()` |

## SFTP (JSch)

| Problème | Cause | Correction |
|---|---|---|
| Fichiers vides jamais lus | verrou de lecture sur la taille | `readLockMinLength: 0` |
| `~/.ssh/known_hosts` de l'utilisateur modifié pendant les tests | JSch écrit dans le fichier de l'utilisateur | `useUserKnownHostsFile: false` + `knownHostsFile` ; les 2 entrées ajoutées ont été retirées (copie dans TEMP) |

## EIP : à savoir

- `multicast` : regrouper les étapes d'une branche dans un `pipeline`, sinon chaque étape devient une branche.
- `aggregate` et `MemoryIdempotentRepository` sont en mémoire : un redémarrage perd la fenêtre en cours et la mémoire des doublons. Dépôt JDBC ou Redis si cela compte.
- `idempotentConsumer` enregistre l'id quand la route se termine bien ; une erreur traitée (503) est une fin « bien » : `remove(id)` dans le gestionnaire.
- `throttle` : `mode: TotalRequests`, `timePeriodMillis`.
- Quartz : `stateful` pour que deux exécutions ne se chevauchent pas ; non clusterisé, une seule réplique.

## Plateforme

| Problème | Cause | Correction |
|---|---|---|
| Tag d'image figé (access-manager) | annotation VelaUX `publishVersion` | annotation retirée sur les 10 applications frontend |
| Templates absents de la galerie | uid d'index Meilisearch dérivé de `camelx.io` : le point est refusé | `indexUidOf` dans project-service (`[^A-Za-z0-9_-]` → `-`), index `camelx-io`, source « Camel X » dans project-manager |
| Topics absents de l'index | topics posés après la création, indexation faite à la création | `reindex.js --apply` |
| Wiki Home du template écrasé par celui du webhook, ou création en conflit | le pipeline du webhook crée aussi une page Home | `writeWiki` : `wiki/new`, repli sur `PATCH wiki/page/Home` |
| `503 no available server` de Gitea | indisponibilité passagère | relancer |
| `camelx.io/kamelet`, `pipe`, `route`, `openapi-3.0` en 404 | dépôts supprimés hors de ce travail | **à traiter** : `CreateProjectDialog.tsx` et `repos/create/page.tsx` y font référence |

## Outillage local (Windows, Git Bash)

| Problème | Cause | Correction |
|---|---|---|
| Antislashs perdus | heredoc Bash | écrire ces fichiers avec Write/Edit |
| Maven cassé | `MSYS_NO_PATHCONV` exporté globalement | le poser par commande Docker seulement |
| Chemins Windows mangés | `eval` retire les antislashs | `cygpath -m` |
| Jars verrouillés, build en échec | l'application tourne encore | `test/app.sh build` arrête l'application puis `clean` |
| Section « Files » écrite deux fois | regex de `docs.js` avec `$` en mode multiligne | remplacement du bloc généré entier ; corrigé et republié |

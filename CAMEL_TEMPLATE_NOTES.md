# Templates Camel X : problèmes rencontrés, corrections, à savoir

Document interne, hors du site (Docusaurus ne publie que `docs/`). Il recense ce qui a été
rencontré en construisant et en testant les 28 templates de `camelx.io` (novembre 2026),
composant par composant, avec la correction retenue.

Tout ce qui concerne les utilisateurs est repris sur le site, au format symptôme, cause,
vérification, correction :
- `docs/projects/troubleshoot-camel-routes.md` couvre les routes et les composants, plus une
  section « Local test environment » pour les tests locaux d'un template (Nisshi, Git Bash, Maven).
- `docs/troubleshooting/project-manager.md` couvre les templates dans la galerie (titre, topics)
  et l'erreur passagère du service Git.

Restent seulement ici :
- les détails d'outillage interne (scripts, heredocs) ;
- les corrections de plateforme déjà déployées (index Meilisearch, publishVersion) ;
- les points à traiter (indexation sur push, dépôts `kamelet` et `pipe`, port AS2).
Toute nouvelle entrée utile aux utilisateurs va aussi sur le site.

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
| Galerie affichant le nom du dépôt (`deal-won-to-erp`) | Gitea n'a pas de champ « nom affiché » | champ `title` dans `.camel.json`, lu à l'indexation par project-service (`8f29a57`) ; arrive au premier reindex, les fichiers étant poussés après la création |
| Un titre ou des topics modifiés ne remontent pas d'eux-mêmes | l'indexation ne réagit qu'à la création, pas aux push | **à faire** : réindexer un template sur push de sa branche par défaut |
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

## Templates XML, JSONata et Salesforce (27 novembre 2026)

| Problème | Cause | Correction |
|---|---|---|
| Le split du catalogue s'arrête au premier produit refusé | `stopOnException` arrête aussi sur une erreur traitée par `onException` | erreurs du produit dans un `doTry` du sous-route ; seule l'erreur Kafka, non traitée, arrête le fichier |
| 55 produits/s, threads en attente | `linger.ms` = 5 ms par défaut du client Kafka 4.2.1, payé à chaque envoi unitaire | `lingerMs: 0` ; 10 000 produits en 43 s au lieu de 180 s ; mesure témoin sur un vrai broker Kafka 3.9 pour écarter Nisshi, puis broker supprimé |
| XPath refusée | `&lt;` écrit dans le YAML | `<` directement |
| Fichier de position sur une seule ligne | chaîne YAML entre guillemets sur plusieurs lignes : les sauts sont repliés | bloc littéral `|` |
| `Node type array is invalid` sur `csv` | `header` est une chaîne dans le DSL YAML | `header: a,b,c` |
| `NoSuchEndpointException` sur `bean:` / `file:` | extension non déclarée | `bean` (ubl), `file` (salesforce-cdc) ajoutés au pom |
| `${body[x]}`, `${header.x.toLowerCase()}` | OGNL, langage `bean` requis | JSONPath sur map ; en-tête lu tel quel |
| `Instant` non sérialisable après `bulk2CreateJob` | pas de module JSR-310 dans le data format | `moduleClassNames: com.fasterxml.jackson.datatype.jsr310.JavaTimeModule` |
| `Impossible de déduire le type SQL ... InputStreamCache` | corps après `marshal` passé en paramètre SQL | `${bodyAs(String)}` dans une propriété |
| Démarrage refusé sans fichier de position | `quarkus.config.locations` exige le fichier, même au build | `camel.component.properties.location` + `ignore-missing-location`, défaut dans le placeholder `{{x:LATEST}}` |
| XML reçu entre guillemets dans le routeur | `nisshi cat produce` encode la valeur en chaîne JSON | messages XML produits avec `kafka-console-producer` (conteneur sur le réseau de `tpl-nisshi`), un document par ligne |
| `nisshi cat consume` affiche `null` | n'affiche que du JSON | `kafka-console-consumer` avec `--network container:tpl-nisshi` |
| Kafka coupé sans perdre l'état du broker | `docker stop` vide le moteur mémoire de Nisshi | `docker pause` / `unpause` |

À savoir :
- Schémas officiels embarqués : UBL 2.1 (OASIS, 15 fichiers, 2,8 Mo) et `pain.001.001.09.xsd` (iso20022.org).
- `xj` : format intermédiaire à attributs `xj:name` / `xj:type` (espace `http://camel.apache.org/component/xj`) ; la XSLT sélectionne sur `@xj:name`.
- Salesforce : `bulk2*` attend un `Job` en corps (unmarshal JSON vers `org.apache.camel.component.salesforce.api.dto.bulkv2.Job`) et l'en-tête `CamelSalesforceJobId` ; Pub/Sub donne `CamelSalesforcePubSubReplayId`.
- Salesforce testé sous WireMock seulement : login OAuth client credentials, cycle Bulk API 2.0, traitement des événements CDC ; l'abonnement gRPC Pub/Sub n'a pas été testé.
- « JHR » demandé par l'utilisateur : sens non précisé (Jira ? SIRH ?), template non construit.

## Templates AS2 et LDAP (27 novembre 2026)

| Problème | Cause | Correction |
|---|---|---|
| MDN négatif d'OpenAS2 compté comme livré | `processed/Error:decryption-failed` sans espace : le parseur Camel AS2 renvoie `processed` sans modificateur | lecture de la ligne `Disposition:` du MDN réécrit (`writeTo`) ; succès seulement pour `processed` et `processed/warning` |
| Clés AS2 impossibles à créer en beans YAML | `factoryMethod` sur `KeyStore` / `KeyStoreParameters#createKeyStore` échoue sans cause | beans `scriptLanguage: groovy`, extension `groovy` |
| Route AS2 en échec | le serveur AS2 répond HTTP 500 sans MDN | voulu pour Kafka indisponible : OpenAS2 met en file de renvoi et renvoie |
| `this.codec is null`, puis `IllegalArgumentException: factory` | `camel-quarkus-ldif` sans couche réseau de l'API LDAP | `api-ldap-net-mina` et `api-ldap-codec-standalone` 2.1.5 ajoutés |
| Timeout LDIF alors que JNDI marche | `'false' as boolean` vaut `true` en Groovy : TLS ouvert sur le port 389 | `.toBoolean()` ; trouvé avec les logs MINA en DEBUG |
| `ldif` ne se connecte pas | le producteur n'appelle ni `connect` ni `bind` | connexion vérifiée et ouverte avant chaque appel |
| Départ appliqué à moitié, ancien salarié resté dans `vpn-users` | dernier membre d'un `groupOfNames` impossible à retirer | remplacement par un membre de substitution |
| Manager jamais trouvé | `Matcher` Groovy avancé par la condition | `matcher != null && matcher.find()` |
| Erreur Gitea `Failed to create temp dir ... /tmp/gitea` | pods Gitea en redémarrage (plusieurs en ContainerStatusUnknown dans `backend`) | nouvel essai quelques minutes plus tard ; à surveiller côté infra |

À savoir :
- OpenAS2 de test : image construite depuis `Server/dist/OpenAS2Server-4.5.0.zip` du dossier `experiences/old/images/open-as2`, configuration copiée dans `assets/scripts/templates/test/as2/openas2`, partenariats PartnerA ↔ CamelX, clés de test `test/as2/camelx.p12` (mot de passe de test local).
- OpenAS2 choisit sa clé de déchiffrement dans son keystore, quel que soit l'alias du partenariat ; pour provoquer un MDN négatif il faut chiffrer pour un certificat dont il n'a pas la clé.
- Le serveur AS2 Camel ouvre son propre port (8090), distinct du port 8080 du runtime : exposition sur Camel X à régler.
- OpenLDAP (osixia 1.5.0) ne maintient pas `memberOf` pour les `groupOfNames` ajoutés ainsi ; les groupes sont cherchés par `member=<dn>`.

## Templates Snowflake (27 novembre 2026)

Pas de compte Snowflake réel (choix de l'utilisateur) : simulation avec **fakesnow 0.13.0** (`pip install "fakesnow[server]"` dans un venv, `fakesnow -s -p 18085 -d <dossier>`), qui parle le protocole HTTP de Snowflake et exécute le SQL Snowflake sur DuckDB. Le driver JDBC Snowflake 3.28.0 s'y connecte avec `ssl=off`, `account=<n'importe>`, mot de passe quelconque.

| Problème | Cause | Correction |
|---|---|---|
| `ExceptionInInitializerError` dans `UnsafeAllocationManager` | Arrow du driver Snowflake sur Java 17+ | `--add-opens=java.base/java.nio=ALL-UNNAMED` (option JVM de l'intégration) et `JDBC_QUERY_RESULT_FORMAT=JSON` |
| `mapping values are not allowed here` | `body.payload ?: ''` non quoté dans le YAML | expression entre guillemets |
| `Unknown TimeZone '+00:00'` sous fakesnow | DuckDB refuse l'espace avant le décalage | `'1970-01-01 00:00:00+00:00'`, accepté aussi par Snowflake |
| Tables perdues après arrêt brutal de fakesnow | persistance `-d` non fiable sur un kill | tables recréées ; artefact de l'émulateur |
| Comparaison de tuple refusée par Snowflake | pas de row comparison | `a > x or (a = x and b > y)` |
| Requêtes vers `169.254.169.254` dans les logs | détection de cloud par le driver | sans effet hors cloud |

À savoir :
- Le compte Snowflake d'essai n'a pas été utilisé. Une paire de clés RSA a été générée dans `~/.camelx-test/snowflake/` (clé privée restreinte au compte Windows) et le script SQL du compte de service fourni à l'utilisateur, mais l'utilisateur a choisi la simulation.
- Lot Kafka : `batching=true` + commit manuel via `CamelKafkaManualCommit` du dernier enregistrement, après le `MERGE` ; vérifié : redémarrage sans rechargement, panne Snowflake sans commit puis chargement au retour.


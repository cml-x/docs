---
title: Troubleshoot Camel YAML Routes and Components
sidebar_label: Troubleshoot Camel Routes
---

Symptoms met when writing or adapting Camel routes in YAML DSL — those of the
[Camel X templates](/projects/template-catalog) in particular — with their cause and the fix.
Versions: Camel 4.22, Camel Quarkus 3.39. Why the templates handle errors the way they do is in
[Repository Template Model](/projects/create-template).

## Simple expressions and YAML DSL

### The application fails at start on an expression such as `${body.length()}`

- **Possible cause** — the expression uses OGNL: a method call or a nested property
  (`${body.length()}`, `${header.a.b}`, `${exception.statusCode}`, `${header[x.y]}`). OGNL in
  Simple needs the `bean` language, which a Camel Quarkus build only has when it is declared.
- **Fix** — set the value in a header or a property first, or read a map body with `jsonpath`.
  Declare `camel-quarkus-bean` only if OGNL is really wanted.

### "Property placeholder" error on a message that contains `{{…}}`

- **Possible cause** — a placeholder `{{prop}}` inside a Simple text that also ends with `}}`,
  such as a JSON message: the placeholder parser takes the wrong closing braces.
- **Fix** — read the property into an exchange property first, then use
  `${exchangeProperty.name}` in the text.

### Spaces or line breaks disappear from a built text

- **Possible cause** — Simple expressions are trimmed by default.
- **Fix** — add `trim: false` to the expression.

### A `loop` with `doWhile` never runs

- **Possible cause** — the condition reads `CamelLoopIndex`, which is only set from the first
  turn: before it, the condition is false.
- **Fix** — loop on a property set before the loop (`hasMore = true`), and check a page or turn
  limit inside the loop.

### The application fails at start after the routes were split into several files

- **Possible cause** — the same node `id` is used in two files: every file loaded by
  `camel.main.routes-include-pattern` shares one namespace.
- **Check** — the start log names the duplicate id.
- **Fix** — give each node an id unique in the project. If the error is
  `routeConfiguration ... already exists` after a file was renamed, old classes are left in
  `target/`: build with `mvn clean package`.

### An XPath comparison is refused, or matches nothing

- **Possible cause** — the expression was written with XML entities, `&lt;` or `&gt;`, as in an
  XML DSL. YAML has no entities: they reach XPath as they are.
- **Fix** — write `<` and `>` directly in the YAML string.

### A text written on several lines arrives on one line

- **Possible cause** — a double-quoted YAML string that spans several lines: YAML folds its line
  breaks into spaces.
- **Fix** — a literal block keeps them:

  ```yaml
  simple:
    expression: |
      first line
      second line
  ```

### `Node type array is invalid` on a CSV data format

- **Possible cause** — `header` given as a YAML list. The YAML DSL takes the CSV header as one
  string.
- **Fix** — `header: ERP_Id__c,Name,BillingCity`.

### A Groovy regular expression finds nothing on a value that matches

- **Possible cause** — a `Matcher` used as a condition (`if (matcher && matcher.find())`) is
  already moved to its first match by the condition; `find()` then looks for a second one.
- **Fix** — `matcher != null && matcher.find()`.

## Error handling

### Retries and `onException` of a route never apply to a failing call

- **Possible cause** — the call is in a `direct:` sub-route that keeps the default error
  handler: the failure is handled there, and the calling route sees an exchange already
  exhausted.
- **Fix** — give the sub-route a route configuration without error handler, and let the caller
  decide:

  ```yaml
  - routeConfiguration:
      id: failures-go-to-the-caller
      errorHandler:
        noErrorHandler: {}
  ```

### A retried call is sent without its headers or its token

- **Possible cause** — Camel redelivers only the processor that failed, not the steps that
  prepared it.
- **Fix** — put the whole call (headers, body, token, request) in one `direct:` sub-route, and
  retry that sub-route from the caller.

### No retry and an empty error answer inside `doTry`

- **Possible cause** — the route error handler is turned off inside `doTry`: `onException` and
  redelivery do not apply to the steps it holds.
- **Fix** — keep in `doTry` only what is answered at once (a validation answered 400), and make
  the calls to retry after it.

### Every HTTP error is retried, refusals included

- **Possible cause** — the HTTP component throws the same exception for every status.
- **Fix** — call with `throwExceptionOnFailure: false`, then `choice` on
  `CamelHttpResponseCode`: throw `IllegalStateException` for 429 and 5xx, retried by
  `onException`, and `IllegalArgumentException` for other 4xx, parked or answered at once.

### Resilience4j is not found

- **Possible cause** — the Camel Quarkus BOM provides only
  `camel-quarkus-microprofile-fault-tolerance` for the circuit breaker.
- **Fix** — use `faultToleranceConfiguration` (`timeoutEnabled`, `timeoutDuration`,
  `requestVolumeThreshold`, `failureRatio`, `delay`, `successThreshold`). Decide on the fallback
  answer, not on the `CamelCircuitBreaker*` properties, which are not reliable with this
  implementation.

### A split stops at the first bad item although its error is handled

- **Possible cause** — `stopOnException: true` stops the split on a failure handled by
  `onException` too, not only on an unhandled one.
- **Fix** — catch the errors of an item with `doTry` and `doCatch` in the sub-route; leave only
  the failures that must stop the split, such as Kafka unreachable, to `onException`.

## HTTP

### `UnsatisfiedLinkError` mentioning Brotli

- **Possible cause** — Apache HttpClient 5 offers `br` encoding, and the native decoder is not in
  the runtime.
- **Fix** — set the header `Accept-Encoding: gzip` before the call.

### A 429 or 503 succeeds without any retry in the logs

- **Possible cause** — HttpClient 5 retries a 429 or a 503 once by itself, honouring
  `Retry-After`, before Camel sees the answer.
- **Fix** — nothing to fix: count on two retry layers, the client's and Camel's.

### Endpoint options end up in the query string

- **Possible cause** — a query string written in the URI of `toD`: Camel appends its own
  options after a second `?`.
- **Fix** — put the query in the `CamelHttpQuery` header, and clear it after the call so that
  the next call does not inherit it.

## Kafka

### Records are published without a key

- **Possible cause** — the key is set in the header `kafka.KEY`, which Camel 4 ignores.
- **Fix** — use `CamelKafkaKey`. The other headers are `CamelKafkaPartition`,
  `CamelKafkaOffset` and `CamelKafkaTopic`.

### `UNKNOWN_PRODUCER_ID` after the broker restarted

- **Possible cause** — an in-memory test broker lost the state of the idempotent producers.
- **Fix** — restart the integration, or run the test broker with persistent storage.

### A webhook caller times out while Kafka is down

- **Possible cause** — the producer waits for Kafka for a minute or more by default.
- **Fix** — shorten `maxBlockMs`, `requestTimeoutMs` and `deliveryTimeoutMs` so that the
  integration answers 503 before the caller gives up.

### Records are published at a few dozen per second

- **Possible cause** — records sent one by one, each waiting for its acknowledgement, with the
  Kafka 4 client's default `linger.ms` of 5 ms: every record waits to be batched with others
  that never come.
- **Check** — the threads of the integration are waiting, not computing; the broker is not the
  cause.
- **Fix** — `lingerMs: 0` on the endpoint for a flow that sends one record at a time. In a test
  of 10,000 records: 180 s with the default, 43 s without.

### A record whose processing failed is skipped

- **Possible cause** — the Kafka consumer commits the offset of a record whose exchange failed,
  and reads the next.
- **Fix** — `breakOnFirstError: true` on the consumer, and leave the failure unhandled: the
  consumer reads the record again.

## Debezium change data capture

### Changes are missing after a Kafka outage

- **Possible cause** — Debezium moves its position in the write-ahead log once the route
  returns, whatever happened; a change dead-lettered or given up is skipped for good.
- **Fix** — on `KafkaException`, retry without end (`maximumRedeliveries: -1`) with a capped
  back-off, in the route configuration of the route that publishes; capture then waits for
  Kafka.

### A delete event carries only the primary key

- **Fix** — `alter table <table> replica identity full`.

### A new snapshot at every restart

- **Possible cause** — the offset file is not on persistent storage.
- **Fix** — put `offsetStorageFileName` on a volume and run a single replica.

### The database disk fills up

- **Possible cause** — the replication slot keeps the write-ahead log while the integration is
  stopped.
- **Check** — `select slot_name, active from pg_replication_slots`.
- **Fix** — restart the integration, or drop the slot of an integration that was removed.

## S3

### A written object is cut to the length of the object that was read

- **Possible cause** — the headers of the object read, `CamelAwsS3ContentLength` among them,
  are still on the exchange when another object is written.
- **Fix** — `removeHeaders` with pattern `*` just before the `put`. Not at the start of the
  route: the consumer needs those headers for `deleteAfterRead`.

## SQL and Flyway

### Flyway refuses to start on an existing database

- **Possible cause** — the schema is not empty and has no Flyway history.
- **Fix** — `quarkus.flyway.baseline-on-migrate=true` and `quarkus.flyway.baseline-version=0`.

### An incremental synchronisation skips rows

- **Possible cause** — the position is a single timestamp: two rows changed at the same instant
  on both sides of a batch limit, and the second is never read.
- **Fix** — compare and order by the pair: `where (updated_at, id) > (:watermark, :watermarkId)
  order by updated_at, id`.

### `Can't infer the SQL type` for a parameter

- **Possible cause** — the parameter is the body after a `marshal`, a stream rather than a text.
- **Fix** — read it into a property with `${bodyAs(String)}` first, and pass the property.

## Validation

### A valid e-mail address is refused by the JSON Schema

- **Possible cause** — the `email` format checks the top-level domain against a list, and
  refuses a new one or a test domain such as `.example`.
- **Fix** — check the address with a `pattern` instead.

### Validation messages are not in English

- **Fix** — they follow the language of the JVM: `-Duser.language=en`.

## SFTP

### Empty files are never picked up

- **Fix** — `readLockMinLength: 0` on the consumer.

### The user's `known_hosts` file is changed by the integration

- **Possible cause** — JSch writes the host keys it accepts into `~/.ssh/known_hosts`.
- **Fix** — `useUserKnownHostsFile: false` and a `knownHostsFile` of the integration, mounted
  from a stored configuration.

## Salesforce

### `Java 8 date/time type java.time.Instant not supported` after a Bulk API call

- **Possible cause** — the Bulk API 2.0 operations answer with a `Job` object, whose dates are
  `Instant`; the JSON data format has no module for them.
- **Fix** — `moduleClassNames: com.fasterxml.jackson.datatype.jsr310.JavaTimeModule` on the
  `marshal`.

### The client credentials login is refused

- **Possible cause** — `loginUrl` is `https://login.salesforce.com`: the client credentials flow
  only answers on the My Domain URL of the org.
- **Fix** — `camel.component.salesforce.login-url = https://<domain>.my.salesforce.com`.

### The application does not start until a position file exists

- **Possible cause** — the file is listed in `quarkus.config.locations`, which requires it.
- **Fix** — list it in `camel.component.properties.location` with
  `camel.component.properties.ignore-missing-location = true`, and write the default in the
  placeholder itself, `{{salesforce.replay-preset:LATEST}}`, so that the file wins when it exists.

## AS2

### A partner's negative MDN is taken for a success

- **Possible cause** — the MDN says `processed/Error:decryption-failed`, without a space after
  the colon, as OpenAS2 writes it: the parser of the AS2 component does not recognise the
  modifier and reports `processed`.
- **Fix** — read the `Disposition:` line of the MDN as the partner wrote it, and count only
  `processed` and `processed/warning` as success (RFC 4130).

### The partner gets HTTP 500 instead of an MDN

- **Possible cause** — the route behind `as2:server/listen` failed: the AS2 server sends no MDN.
- **Fix** — nothing to fix when it is meant: the partner's AS2 software keeps the message and sends
  it again. Make it so for Kafka outages only, and handle the other failures in the route.

### Keys and certificates cannot be given to the AS2 component

- **Possible cause** — the component takes a `PrivateKey` and `Certificate[]`; a YAML bean built
  with `factoryMethod` on `KeyStore` fails with `Cannot create bean instance using factory method`.
- **Fix** — a bean with `scriptLanguage: groovy` that loads the keystore and returns the key or the
  chain, with the `groovy` extension.

## LDAP

### `this.codec is null` or `IllegalArgumentException: factory` when the LDIF connection is created

- **Possible cause** — `camel-quarkus-ldif` does not bring the network layer of the Apache LDAP API.
- **Fix** — add `org.apache.directory.api:api-ldap-net-mina` and `api-ldap-codec-standalone`, in the
  version of the other `api-ldap` jars.

### Every LDIF change times out, while JNDI searches work

- **Possible cause** — the connection opens TLS on a plain port: in Groovy, `'false' as boolean`
  is `true`.
- **Check** — the MINA debug log shows an SSL handshake.
- **Fix** — `'{{ldap.use-ssl}}'.toBoolean()`.

### LDIF changes fail although the connection was created

- **Possible cause** — the `ldif` component neither connects nor binds.
- **Fix** — connect and bind the `LdapConnection` before each use, which also reconnects after the
  directory restarted.

### A change is refused but the route goes on

- **Possible cause** — `ldif` answers one result per change, `success` or the error, instead of
  failing; an `add` of an entry that exists comes back empty.
- **Fix** — check every result, and fail the exchange when one is not `success`.

### A leaver is moved but stays in a group

- **Possible cause** — removing the last member of a `groupOfNames` is refused
  (`object class 'groupOfNames' requires attribute 'member'`).
- **Fix** — replace the last member by a placeholder member instead of deleting it.

## State kept in memory

### Duplicates published again, or an aggregation lost, after a restart

- **Possible cause** — `MemoryIdempotentRepository` and the default aggregation repository live
  in memory.
- **Fix** — a JDBC or Redis repository where it matters; consumers that recognise an event by
  its id in any case.

### An event answered 503 is then taken for a duplicate

- **Possible cause** — the idempotent consumer records the id when the route ends well, and an
  error handled by `onException` is an end that went well.
- **Fix** — remove the id from the repository in the error handler:
  `bean:receivedEvents?method=remove(${exchangeProperty.eventId})`.

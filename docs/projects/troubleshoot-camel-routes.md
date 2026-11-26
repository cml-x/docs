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

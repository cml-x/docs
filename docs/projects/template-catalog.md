---
title: Camel X Template Reference
sidebar_label: Camel X Template Reference
---

The templates the platform publishes, offered with the **Camel X** source in the template
selection. Each is a complete integration in Camel YAML DSL — Camel 4.22, Camel Quarkus 3.39 —
with its error handling, and was run against its systems, on its nominal path and on each failure
listed, before it was published. Its README lists the properties to set; the wiki of its
repository gives the flow, the error handling, the configuration and how to run it locally.

To start from one: [Create from a template](/projects/tasks/create-from-a-template). Why they are
built the way they are: [Repository Template Model](/projects/create-template).

## Integration templates

| Template | What it does | Patterns | Systems |
|---|---|---|---|
| `blank` | An empty integration: no route and no component, everything written from scratch | — | — |
| `rest-to-https` | REST API answered by an HTTPS backend; every backend failure turned into a status | request validation, circuit breaker with timeout and fallback, JSONata mapping | HTTPS |
| `timer-http-to-kafka` | Polls an HTTPS source every minute and publishes each item once, by state | split, idempotent consumer, content-based router, dead letter channel | HTTPS, Kafka |
| `csv-to-database` | Loads CSV files line by line; rejected lines set aside, unreadable files moved aside | split, JSONata typing, Flyway schema | files, PostgreSQL |
| `kafka-to-https` | Delivers Kafka records to an HTTPS service | refusals parked at once, exponential back-off, dead letter topic | Kafka, HTTPS |
| `sftp-to-sftp` | Moves files between two SFTP servers, sorted by type | temporary name while writing, retries, `.failed` folder | SFTP |
| `order-intake-api` | Contract-first order API that a client can call again safely | OpenAPI contract, JSON Schema, `Idempotency-Key`, transactional outbox | PostgreSQL, Kafka |
| `cdc-postgres-to-kafka` | Publishes every insert, update and delete of chosen tables, one topic per table | change data capture with Debezium, keyed events, capture waits for Kafka | PostgreSQL, Kafka |
| `partner-files-s3` | Checks partner CSV files row by row and writes one stock summary per warehouse | quarantine of a whole file, aggregator over a time window | S3 |
| `price-aggregator-api` | Asks every supplier in parallel and answers with the best sellable offer | scatter-gather with a timeout, normalisation per supplier, partial answers | HTTPS |
| `soap-to-rest-facade` | REST/JSON API in front of a legacy SOAP service | envelope template, XSLT 3.0 to JSON, SOAP faults to HTTP statuses | SOAP |

## CRM templates

| Template | What it does | Patterns | Systems |
|---|---|---|---|
| `lead-capture-api` | Takes leads from a web form and records them in the CRM, without duplicating known contacts | JSON Schema, consent check, deduplication, retries then 503 with `Retry-After` | CRM API |
| `contacts-db-to-crm` | Keeps the CRM's contacts in step with the customer database | incremental sync on `(updated_at, id)`, throttling, upsert by external id, error table | PostgreSQL, CRM API |
| `crm-webhook-to-kafka` | Receives the CRM's webhooks and publishes each event once, by family | shared token, JSON Schema, idempotent consumer, routing by event type | CRM webhooks, Kafka |
| `deal-won-to-erp` | Turns a won deal into an ERP invoice and writes its number back on the deal | multi-step orchestration, `Idempotency-Key`, retries then parking | Kafka, ERP API, CRM API |
| `crm-export-to-s3` | Exports every CRM contact each night as one JSON Lines file, partitioned by date | Quartz cron, loop over pages, page retries, all-or-nothing | CRM API, S3 |

## What a template expects

| Template | Secrets, given to the integration as | Storage | Replicas |
|---|---|---|---|
| `csv-to-database`, `order-intake-api`, `contacts-db-to-crm` | `DB_PASSWORD` | a volume for the input files (`csv-to-database`) | one for `contacts-db-to-crm` |
| `sftp-to-sftp` | `SOURCE_SFTP_PASSWORD`, `TARGET_SFTP_PASSWORD` | the `known_hosts` file | any |
| `cdc-postgres-to-kafka` | `CDC_DB_PASSWORD` | a persistent volume for the offset file | one |
| `partner-files-s3` | `S3_ACCESS_KEY`, `S3_SECRET_KEY` | — | one |
| `lead-capture-api` | `CRM_TOKEN` | — | any |
| `crm-webhook-to-kafka` | `CRM_WEBHOOK_TOKEN` | — | any; each replica recognises only the duplicates it received |
| `deal-won-to-erp` | `ERP_TOKEN`, `CRM_TOKEN` | — | any |
| `crm-export-to-s3` | `CRM_TOKEN`, `S3_ACCESS_KEY`, `S3_SECRET_KEY` | — | one |

The other templates need no secret of their own; the credentials of their target systems, when
there are some, are stored in Secret Manager and read as properties. Addresses, topics, buckets
and tuning values are properties with a default, to set for each environment.

## Files of a template

Every template has the same layout under `src/main/resources`:

| Path | Holds |
|---|---|
| `routes/<api-id>.camel.yaml` | the REST contract, or a reference to `api/*.yaml` |
| `routes/route-<id>.camel.yaml` | one route |
| `routes/configuration-<id>.camel.yaml` | one route configuration: the error handling of the routes that name it |
| `routes/beans.camel.yaml` | beans declared in YAML |
| `api/` | OpenAPI contracts |
| `schema/` | JSON Schemas the input is validated against |
| `mapping/` | JSONata mappings |
| `xslt/` | XSLT stylesheets |
| `db/migration/` | Flyway migrations, run at start-up |
| `application.properties` | every value, overridable per environment |

The README lists these files with the role of each, taken from the `description` of its routes.

## Topics

The template selection matches topics. The Camel X templates use the system (`kafka`,
`postgresql`, `s3`, `sftp`, `soap`, `crm`, `erp`), the protocol or style (`api`, `openapi`,
`webhook`, `https`), and the pattern (`dead-letter-channel`, `idempotent-consumer`, `outbox`,
`cdc`, `scatter-gather`, `aggregator`, `throttle`, `orchestration`).

---
title: Camel X Template Reference
sidebar_label: Camel X Template Reference
---

The templates the platform publishes, offered with the **Camel X** source in the template
selection. Each is a complete integration in Camel YAML DSL — Camel 4.22, Camel Quarkus 3.39 —
with its error handling, and was run against its systems, on its nominal path and on each failure
listed, before it was published. Its README lists the properties to set. The wiki of its
repository has three pages:

| Wiki page | What it gives |
|---|---|
| **Home** | the flow, the files, the error handling, how to run it locally |
| **How to use** | the steps to create a project from it and deploy it, and every property: definition, explanation, how to change it |
| **Enterprise use cases** | concrete cases it covers — systems, hosting (SaaS, on-premise, legacy), protocols — what to adapt for each, and when another template fits better |

To start from one: [Create from a template](/projects/tasks/create-from-a-template). Why they are
built the way they are: [Repository Template Model](/projects/create-template).

## Integration templates

The template selection and Assets Explorer show each template under its title, with the
repository name below it.

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

## XML and JSONata templates

| Template | What it does | Patterns | Systems |
|---|---|---|---|
| `ubl-invoice-to-erp` | Books UBL 2.1 e-invoices (Peppol BIS Billing 3.0) in the ERP, once per supplier and number | OASIS XSD with `validator`, EN 16931 rule in XPath, XSLT 3.0 to JSON, idempotent consumer | HTTPS, ERP API |
| `large-xml-feed-to-kafka` | Publishes the products of a BMEcat catalogue of any size, one by one as the file streams | `split` streaming with `xtokenize` (StAX), `jacksonXml`, JSONata, products in error set aside | files, Kafka |
| `payment-file-iso20022` | Turns approved payments into SEPA credit transfer files for the bank | IBAN check digits in JSONata, aggregator per execution date, `xj` and XSLT to pain.001.001.09, XSD before sending | Kafka, SFTP |
| `xml-content-router` | Sends each XML document of a shared topic to the topic of its type, a legacy format converted to UBL | content-based router on root namespace in XPath, XSLT conversion, unrouted documents set aside | Kafka |
| `canonical-order-hub` | Maps the order webhooks of Shopify, WooCommerce and Magento 2 to one canonical order | one JSONata mapping per source chosen by `toD`, JSON Schema of the canonical model | HTTPS webhooks, Kafka |

## Salesforce templates

| Template | What it does | Patterns | Systems |
|---|---|---|---|
| `salesforce-cdc-to-kafka` | Publishes the Change Data Capture events of Salesforce, one record per changed record and one topic per object | Pub/Sub API subscription, replay id kept on a volume, capture waits for Kafka | Salesforce, Kafka |
| `erp-to-salesforce-bulk-upsert` | Keeps Salesforce accounts in step with the ERP, thousands at a time | incremental read on `(updated_at, id)`, Bulk API 2.0 upsert by external id, job followed to its end, refused rows kept | PostgreSQL, Salesforce |

The two Salesforce templates were tested against WireMock and the local broker, not against a
Salesforce org: the OAuth login, the Bulk API 2.0 calls and the processing of change events
were, the gRPC subscription of the Pub/Sub API was not. Each wiki says what was tested; test
against a Developer Edition org before production.

## B2B and identity templates

| Template | What it does | Patterns | Systems |
|---|---|---|---|
| `as2-inbound-edi-to-kafka` | AS2 server for trading partners: EDIFACT interchanges published to one topic per message type | decryption, signature check, signed MDN sent once on Kafka, idempotent consumer on the control reference | AS2, Kafka |
| `kafka-to-as2-outbound` | Sends interchanges to a trading partner over AS2 | signed and encrypted, signed MDN asked, disposition read from the MDN, refusals parked, retries | Kafka, AS2 |
| `directory-lookup-api` | REST API over the company directory: a person with manager and groups | LDAP filter injection refused, results to JSON, 503 when the directory is down | LDAP |
| `hr-to-ldap-provisioning` | Applies joiners, movers and leavers of the HR system to the directory | LDIF changes checked one by one, leavers out of every group then moved, connection reopened | Kafka, LDAP |

The AS2 templates were tested against OpenAS2 4.5.0 as the partner, the LDAP templates against
OpenLDAP.

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
| `ubl-invoice-to-erp` | `ERP_TOKEN` | — | one, or more with the ERP's `Idempotency-Key` |
| `large-xml-feed-to-kafka` | — | a volume for the catalogues | one |
| `payment-file-iso20022` | `BANK_SFTP_PASSWORD` | the `known_hosts` file of the bank server | one |
| `salesforce-cdc-to-kafka` | `SF_CLIENT_ID`, `SF_CLIENT_SECRET` | a persistent volume for the replay position | one |
| `erp-to-salesforce-bulk-upsert` | `DB_PASSWORD`, `SF_CLIENT_ID`, `SF_CLIENT_SECRET` | — | one |
| `as2-inbound-edi-to-kafka`, `kafka-to-as2-outbound` | `AS2_KEYSTORE_PASSWORD` | the AS2 keystore: our key, the partner certificate | one inbound; outbound up to the partitions |
| `directory-lookup-api` | `LDAP_BIND_PASSWORD` | — | two or more |
| `hr-to-ldap-provisioning` | `LDAP_BIND_PASSWORD` | — | one |

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
| `xsd/` | XML Schemas, as their standards body publishes them |
| `xslt/` | XSLT stylesheets |
| `db/migration/` | Flyway migrations, run at start-up |
| `application.properties` | every value, overridable per environment |

At the root, `.camel.json` is the manifest of the project: its Camel dependencies, and the
`title` the catalog shows. The README lists the files above with the role of each, taken from
the `description` of its routes.

## Topics

The template selection matches topics. The Camel X templates use the system (`kafka`,
`postgresql`, `s3`, `sftp`, `soap`, `crm`, `erp`), the protocol or style (`api`, `openapi`,
`webhook`, `https`, `xml`, `ubl`, `iso20022`, `salesforce`), and the pattern (`dead-letter-channel`,
`idempotent-consumer`, `outbox`, `cdc`, `scatter-gather`, `aggregator`, `throttle`, `orchestration`,
`content-based-router`, `canonical-model`, `streaming`).

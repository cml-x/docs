---
title: Schema Registry Reference
sidebar_position: 3
---

**Schemas** is a registry for the **contracts** of your APIs and messages: the OpenAPI document
of a REST API, the Avro schema of the records on a Kafka topic, the JSON Schema of a payload.

## Why contracts are kept apart from repositories

A contract is shared by a producer and its consumers, which usually live in different
repositories and are released at different times. Keeping it in the repository of one of them
makes the others depend on that repository's history. In the registry, a contract has its own
identity and its own versions: every party refers to `orders/order-created`, version 3,
whatever the state of the code.

## Data model

The registry has three levels. A **group** is a folder for related contracts; an **artifact**
is one contract; a **version** is one state of its content. You address a contract by group,
artifact and version.

| Level | What it is | Constraint |
|---|---|---|
| **Group** | A namespace — typically a business domain such as `orders` | — |
| **Artifact** | One contract, in one format | Its **Artifact ID** can never be changed |
| **Version** | One state of the content | Earlier versions stay readable |

:::tip[Group by domain, not by team]
Teams are reorganized; domains last. `orders`, `billing`, `shipping` stay meaningful when the
team that owns them changes.
:::

## Schema Formats

The format is chosen when the artifact is created and tells the editor how to validate and
display the content.

| Format | Describes | Typical use |
|---|---|---|
| **OpenAPI 3.0** | A REST API: paths, operations, payloads | The contract of an API exposed through a gateway |
| **AsyncAPI 2.x** | An event-driven API: channels, messages, bindings | Topics and queues shared between integrations |
| **JSON Schema** | The structure of a JSON document | Validating a payload in a route |
| **Avro** | A record, for compact binary serialization | Kafka records with schema evolution |

## Artifact metadata

The ID is the technical identifier consumers use; the name and description are for people
browsing the registry. Because the ID cannot be changed, treat it like an API: lowercase, stable,
without a version number in it — versions are a separate level.

| Field | Rule |
|---|---|
| **Artifact ID** | Starts with a letter or a digit; letters, digits, dots, dashes and underscores. Immutable |
| **Name** | 200 characters at most |
| **Description**, **Labels** | Free |

## Compatibility between versions

The registry stores every version you publish; it does not stop you from publishing a breaking
one. Compatibility is a discipline of whoever owns the contract:

- **Adding an optional field** is safe: consumers that do not know it ignore it.
- **Removing or renaming a field, or changing a type** breaks consumers. Publish it as a new
  major version and keep the previous one in service until every consumer has moved.

:::warning[A new version does not migrate anyone]
Publishing version 4 changes nothing for a consumer reading version 3. Plan the migration of
each consumer; the registry only makes both versions available.
:::

## Related pages

- [Create a schema artifact](/projects/tasks/create-a-schema)
- [Add a schema version](/projects/tasks/add-a-schema-version)

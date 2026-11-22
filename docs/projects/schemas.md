---
title: Schema Registry
sidebar_position: 3
---

**Schemas** is the registry of API and message contracts. Contracts are versioned on their own,
independently of the repositories whose routes implement or consume them.

## Data model

| Level | What it is | Constraint |
|---|---|---|
| **Group** | A namespace for related artifacts — a domain such as `orders` | — |
| **Artifact** | One contract, with a format | The **Artifact ID** cannot be changed |
| **Version** | One state of the content of an artifact | Earlier versions stay readable |

## Formats

| Format | Use |
|---|---|
| **OpenAPI 3.0** | REST API contracts |
| **AsyncAPI 2.x** | Event-driven API contracts: channels, messages, bindings |
| **JSON Schema** | Structure and validation of JSON payloads |
| **Avro** | Binary serialization with schema evolution |

## Artifact metadata

| Field | Rule |
|---|---|
| **Artifact ID** | Starts with a letter or a digit; letters, digits, dots, dashes and underscores. Immutable |
| **Name** | 200 characters at most |
| **Description**, **Labels** | Free |

## Compatibility between versions

The registry stores versions; compatibility is a discipline of the producer:

- adding an optional field keeps existing consumers working;
- removing or renaming a field, or changing a type, breaks them — publish it as a new major
  version and keep the previous one until consumers have moved.

## Related pages

- [Create an artifact](/projects/tasks/create-a-schema)
- [Add a schema version](/projects/tasks/add-a-schema-version)

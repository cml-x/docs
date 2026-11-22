---
title: Create an OpenAPI, AsyncAPI, JSON Schema or Avro Artifact
sidebar_position: 6
---

Store the contract of an API or of a message — its fields and their types — so that integrations and teams share one definition.

## Prerequisites

- A business unit in which you may create schemas.

## Procedure

{/* screenshot: projects-tasks-create-a-schema */}

1. In **Integration Center**, go to **Schemas**.
2. Open a group, or create one to gather related schemas.
3. Create an artifact and select its format.
4. Give its ID, its name and its content.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Format** | **OpenAPI 3.0** for REST APIs, **AsyncAPI 2.x** for event-driven ones, **JSON Schema** for JSON data, **Avro** for compact serialisation. | — |
| **Artifact ID** | Its identifier. It cannot be changed afterwards. | — |
| **Name** | A readable name. Up to 200 characters. | — |
| **Description** | What the schema represents. | — |

## Behavior and limits

- Schemas are versioned on their own: a contract can stay stable while the code behind it changes.
- Group schemas by domain — orders, billing — rather than by team.

## See also

- [Project Manager: getting started](/projects/getting-start)
- [Add a version to a schema](/projects/tasks/add-a-schema-version)
- [Schemas](/projects/schemas)

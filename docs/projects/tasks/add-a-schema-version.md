---
title: Add a Schema Version
sidebar_position: 7
---

Publish a new version of a schema while keeping the earlier ones available.

## How it works

A new version records a change to a contract while keeping the earlier versions available. Consumers move to it when they are ready.

:::warning[Publishing does not migrate consumers]
A breaking change needs a plan for each consumer; the registry only keeps both versions readable.
:::

## Prerequisites

- A schema — see [Create a schema](/projects/tasks/create-a-schema).

## Procedure

{/* screenshot: projects-tasks-add-a-schema-version */}

1. In **Integration Center**, go to **Schemas** and open the artifact.
2. Add a version.
3. Give the version, its name, and describe what changed.
4. Give the new content, then save.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Version** | Its number. | — |
| **Name** | A readable name for this version. | — |
| **Description** | What changed in this version. | — |

## Behavior and limits

- Adding a field that is optional keeps existing consumers working. Removing or renaming a field breaks them: publish it as a new major version.
- Earlier versions stay readable: a consumer moves to the new one when it is ready.

## See also

- [Create a schema](/projects/tasks/create-a-schema)

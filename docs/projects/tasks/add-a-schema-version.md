---
title: Add a Version to a Schema
sidebar_position: 7
---

Publish a new version of a schema while keeping the earlier ones available.

## Before you begin

- A schema — see [Create a schema](/projects/tasks/create-a-schema).

## Procedure

{/* screenshot: projects-tasks-add-a-schema-version */}

1. In **Integration Center**, go to **Schemas** and open the artifact.
2. Add a version.
3. Give the version, its name, and describe what changed.
4. Give the new content, then save.

## Field reference

| Field | What it is | Default |
|---|---|---|
| **Version** | Its number. | — |
| **Name** | A readable name for this version. | — |
| **Description** | What changed in this version. | — |

## Good to know

- Adding a field that is optional keeps existing consumers working. Removing or renaming a field breaks them: publish it as a new major version.
- Earlier versions stay readable: a consumer moves to the new one when it is ready.

## See also

- [Create a schema](/projects/tasks/create-a-schema)

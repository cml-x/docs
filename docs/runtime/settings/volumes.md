---
title: Attach Volumes
sidebar_position: 12
---

Mount storage that survives restarts, or a temporary directory, inside an integration.

## How it works

The setting mounts storage in the integration: a persistent volume, which keeps its content across restarts, or an EmptyDir, a temporary directory that lives as long as the instance. Use it when a route writes files.

:::warning[Persistent volumes and replicas]
Most volumes can be written from one node at a time: check the access mode before running several replicas.
:::

## Prerequisites

- An [integration](/runtime/integrations), created and bound to an environment.
- For storage that survives restarts, a [storage](/runtime/storages) of the environment.

## Procedure

{/* screenshot: runtime-settings-volumes */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **Volumes**.
3. In **Persistent Volumes**, choose the storage and the place it is mounted at.
4. In **EmptyDir Volumes**, add a temporary directory: a name, a place, and optionally a size.
5. Choose **Apply changes**.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Persistent Volumes** | Storage that keeps its content across restarts, each mounted at a place. | — |
| **EmptyDir Volumes** | Temporary directories, emptied when the instance is replaced. | — |

## Behavior and limits

- Applying this setting restarts the integration; it does not rebuild its image.
- A temporary directory is private to each instance and lost with it.
- Storage shared by several instances must allow it: check the access mode of the storage.

## See also

- [Integrations](/runtime/integrations) — every setting at a glance
- [Storages](/runtime/storages)

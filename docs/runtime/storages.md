---
title: Storages
sidebar_position: 4
---

A **storage** is a persistent volume of an environment: disk space that keeps its content when
an integration restarts, is redeployed or is rescheduled on another node.

## Why an integration needs one

The file system of a container is temporary. Everything a route writes to it disappears with
the instance. That is fine for most integrations, which keep their state in the systems they
connect. It is not for those that keep state on disk:

- a file-based idempotent repository, remembering what was already processed;
- a staging directory where files wait between two steps;
- a local cache that is expensive to rebuild.

For those, create a storage and mount it.

## Create and mount

1. In **Runtime Manager**, go to **Storages** and create a storage with its size.
2. On the integration, add the **Volumes** setting and choose the storage, with the path it is
   mounted at — see [Volumes](/runtime/settings/volumes).

A storage belongs to the business unit and the environment it was created in, like everything
else that runs.

## Storage and replicas

:::warning A volume is usually writable from one node at a time
Most storage can be mounted read-write by a single node. With several replicas spread over
nodes, only some of them can mount it. Either keep one replica, use a storage whose access mode
allows many writers, or keep the state outside the integration — a database, an object store.
:::

## Storage in an integration group

A storage can be a member of an [integration group](/runtime/integration-groups), next to the
integrations that use it. It is then created and removed with the group.

:::danger Deleting a storage deletes its data
The volume and everything on it are removed. Unmount it from the integrations that use it and
save what must be kept first.
:::

## When not to use a storage

| Need | Prefer |
|---|---|
| Scratch space that may be lost | An **EmptyDir** volume, in the Volumes setting |
| Read-only files: a mapping, a catalog, a certificate | A **Resources File** configuration, mounted with the Resources setting |
| State shared by several integrations or replicas | An external database or object store |

## Related pages

- [Volumes](/runtime/settings/volumes)
- [6. Persistent storage](/tutorial/storage)

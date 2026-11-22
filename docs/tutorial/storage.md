---
title: 6. Persistent Storage
sidebar_position: 7
---

The file system of an instance is lost with it. A route that keeps files — an idempotent
repository, a staging directory, a download cache — needs a volume.

## EmptyDir versus persistent volume

| | EmptyDir | Persistent volume |
|---|---|---|
| Lifetime | The instance | Independent of instances and deployments |
| Shared between replicas | No, one per instance | Only if the access mode of the storage allows it |
| Use | Scratch space, temporary files | State that must survive a restart |

## Create the storage

In **Runtime Manager**, go to **Storages** and create one — `orders-data` — with its size. It
belongs to the environment.

## Mount it (Volumes)

{/* screenshot: tutorial-volumes-setting */}

On `orders-api`, choose **Add Capability**, then **Volumes**.

- In **Persistent Volumes**, choose `orders-data` and mount it at `/var/orders`.
- In **EmptyDir Volumes**, add `scratch` at `/tmp/orders` for temporary files.

**Apply changes** restarts the integration without rebuilding its image.

## Use the volume from a route

A file-based idempotent repository on the volume keeps the keys already processed across
restarts:

```yaml title="orders.camel.yaml"
- beans:
    - name: processedOrders
      type: org.apache.camel.support.processor.idempotent.FileIdempotentRepository
      properties:
        fileStore: /var/orders/processed.dat
- route:
    id: orders-import
    from:
      uri: file:/var/orders/inbox
      parameters:
        move: ../done
      steps:
        - idempotentConsumer:
            header: CamelFileName
            idempotentRepository: processedOrders
            steps:
              - log: "Importing ${header.CamelFileName}"
```

## Replicas and access modes

A volume mounted read-write by one node at a time cannot back several replicas spread over
nodes. With more than one replica, either use a storage whose access mode allows many writers, or
keep the state outside the integration — a database, an object store.

## Verification

- Restart the integration: the files under `/var/orders` are still there, those under
  `/tmp/orders` are gone.

Next: [build from Git](/tutorial/from-git).

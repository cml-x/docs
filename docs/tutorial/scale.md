---
title: 5. Scaling
sidebar_position: 6
---

One instance with the default requests is enough to develop. This step sizes `orders-api`, runs
several replicas, and scales them on load.

## Replicas, requests and limits (Compute)

On `orders-api`, choose **Add Capability**, then **Compute**.

| Field | Default | Value for this step |
|---|---|---|
| **Replicas** | 1 | 2 |
| **CPU Request** / **CPU Limit** | 125m / 500m | 250m / 1000m |
| **Memory Request** / **Memory Limit** | 128Mi / 512Mi | 256Mi / 768Mi |

**Apply changes** restarts the integration without rebuilding its image.

## JVM heap against the memory limit

The memory limit is enforced on the whole container. The heap is only one part of what the JVM
uses: metaspace, thread stacks and direct buffers come on top. Set the heap below the limit in the
**JVM** setting, under **JVM Options**:

```text title="JVM Options"
-Xms256m -Xmx512m
```

A container that exceeds its memory limit is killed and restarts in a loop: raise the limit, or
lower `-Xmx`.

:::tip[Set requests from what you measure]
Run the integration under representative load and read `jvm_memory_used` and
`process_cpu_usage`. Requests near the observed steady state and limits with headroom avoid
both wasted capacity and throttling.
:::

## KEDA Autoscaler

{/* screenshot: tutorial-keda-autoscaler */}

The **KEDA Autoscaler** setting adds and removes replicas from a measure — the depth of a queue,
the lag of a Kafka consumer group, a Prometheus query. It needs KEDA on the cluster of the
environment.

| Field | What it sets | Default |
|---|---|---|
| **auto** | Derive the triggers from the Camel component URIs of the route | On |
| **minReplicaCount** | Lower bound. `0` allows scale to zero | 0 |
| **maxReplicaCount** | Upper bound | — |
| **idleReplicaCount** | Replicas kept when no trigger is active | — |
| **pollingInterval** | Seconds between two evaluations of the triggers | 30 |
| **cooldownPeriod** | Seconds without activity before scaling to zero | 300 |
| **triggers** | Explicit triggers: a `type`, its `metadata`, and the secrets it reads | — |

An explicit trigger for a Kafka consumer:

```yaml title="triggers"
- type: kafka
  metadata:
    bootstrapServers: kafka.example.com:9092
    consumerGroup: orders
    topic: orders-in
    lagThreshold: "50"
```

:::warning[Scale to zero and HTTP]
With `minReplicaCount: 0`, no replica is listening while the integration is idle. An HTTP route
such as `platform-http:/orders` then refuses calls until a trigger starts a replica. Keep at
least one replica for an integration that serves requests; reserve scale to zero for consumers of
queues and topics.
:::

## Availability during node maintenance (Disruption Budget)

With two replicas or more, add **Disruption Budget** so that a node drain never takes all of them
at once — see [Pod Disruption Budget](/runtime/settings/disruption-budget). To spread the replicas
across nodes, see [Affinity](/runtime/settings/affinity).

## Verification

- The page of the integration lists as many instances as replicas, all ready.
- Under load, the number of instances follows the trigger, within the bounds.

Next: [persistent storage](/tutorial/storage).

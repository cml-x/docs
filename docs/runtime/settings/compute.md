---
title: "Compute: Replicas, CPU and Memory"
sidebar_position: 4
---

Set how many instances of an integration run, and the CPU and memory of each.

## Prerequisites

- An [integration](/runtime/integrations), created and bound to an environment.

## Procedure

{/* screenshot: runtime-settings-compute */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **Compute**.
3. Set **Replicas**, then the CPU and memory requests and limits.
4. Choose **Apply changes**.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Replicas** | The number of instances. | 1 |
| **CPU Request** | The CPU each instance is guaranteed. | 125m |
| **Memory Request** | The memory each instance is guaranteed. | 128Mi |
| **CPU Limit** | The most CPU an instance may use. | 500m |
| **Memory Limit** | The most memory an instance may use. Beyond it, the instance is stopped. | 512Mi |

## Behavior and limits

- Applying this setting restarts the integration; it does not rebuild its image.
- `1000m` is one core. Memory is written `128Mi`, `1Gi`.
- An integration stopped for using too much memory restarts in a loop: raise the memory limit.
- Two instances or more keep the integration answering while one restarts.

## See also

- [Integrations](/runtime/integrations) — every setting at a glance
- [Keep instances up during maintenance](/runtime/settings/disruption-budget)

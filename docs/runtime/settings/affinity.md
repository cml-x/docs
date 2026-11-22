---
title: Affinity
sidebar_position: 11
---

Keep the instances of an integration on separate nodes, or place them on nodes of a certain kind.

## How it works

Kubernetes decides on which node each instance runs. Affinity rules constrain that choice: require nodes with a given label, keep instances of the same integration on different nodes, or keep an integration close to another. Use it for availability or to reach dedicated hardware.

:::warning[A rule that cannot be satisfied leaves instances pending]
A required rule with no matching node means the instance never starts. Prefer "preferred" rules unless the constraint is absolute.
:::

## Prerequisites

- An [integration](/runtime/integrations), created and bound to an environment.

## Procedure

{/* screenshot: runtime-settings-affinity */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **Affinity**.
3. Turn **Pod Anti-Affinity** on to keep instances on separate nodes, or give **Node Affinity Labels** to choose the nodes.
4. Choose **Apply changes**.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Pod Anti-Affinity** | Never put two instances on the same node. | Off |
| **Pod Affinity** | Always put the instances on the same node. | Off |
| **Node Affinity Labels** | Run only on nodes carrying these labels, such as `disktype=ssd`. | — |
| **Pod Affinity Labels** | Run beside the workloads carrying these labels. | — |
| **Pod Anti-Affinity Labels** | Never run beside the workloads carrying these labels. | — |

## Behavior and limits

- Applying this setting restarts the integration; it does not rebuild its image.
- With anti-affinity on, an integration cannot have more instances than there are nodes.

## See also

- [Integrations](/runtime/integrations) — every setting at a glance
- [Keep instances up during maintenance](/runtime/settings/disruption-budget)

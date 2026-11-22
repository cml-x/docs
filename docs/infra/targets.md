---
title: Targets
sidebar_position: 1.7
---

A **target** is a namespace on a [runtime plane](/infra/runtime-planes), reserved for a business
unit. It is the unit an [environment](/infra/environments) is bound to: the target says *which
cluster and which namespace*, the environment says *which stage and which services*.

![Control plane, runtime planes, targets and environments](/img/infra/runtime-planes.drawio.png)

## Why targets exist

An environment needs a place on a cluster. A target is that place, described once: which
runtime plane, which namespace. Separating it from the environment lets the same model cover a
namespace shared with others on a managed cluster and a namespace on a cluster of your own —
and lets you move a stage by pointing its environment at another target.

:::info[A target is a namespace, not a cluster]
Several targets can sit on the same runtime plane, each in its own namespace. Creating a target
does not create or reserve a cluster.
:::

## Create a target

{/* screenshot: infra-create-target */}

In **Environment Manager**, go to **Targets**, then **Create target**.

1. **Identity** — an alias and a description. Mention the region, the kind of workloads and the
   constraints of the target.
2. **Cluster** — select the runtime plane. Each one is listed with its provider, its region and
   its health; only a healthy one can be selected.

## Parameters

| Field | What it is |
|---|---|
| **Alias** | The name of the target |
| **Description** | Free text |
| **Cluster** | The runtime plane that hosts the target — managed, or your own cluster |
| **Namespace** | The namespace on that cluster. Left empty, one is created for the target |

## Target page

The page of a target shows where it is: which cluster, which region. Use it to confirm where an environment really runs.

| Element | Content |
|---|---|
| **Identity** | Name, alias, business unit, creation and update dates |
| **Cluster** | Name, type, **Region**, **API Server** |
| **Physical location** | The region of the runtime plane |

## Targets across clusters and regions

A business unit creates as many targets as it needs, on any mix of runtime planes:

| Target | Runtime plane | Used by environment |
|---|---|---|
| `dev` | Managed, Europe | `development` |
| `prod-eu` | Managed, Europe | `production` |
| `prod-us` | Managed, North America | `production-us` |
| `onprem` | Your cluster, data center | `production-onprem` |

## Behavior and limits

- A target belongs to one runtime plane and cannot be moved: create a new target and rebind the
  environment.
- By default a target backs one environment — see
  [Target binding](/infra/environments#target-binding).
- Deleting a target is refused while an environment is bound to it.

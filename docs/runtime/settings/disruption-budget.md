---
title: Set a Pod Disruption Budget
sidebar_position: 10
---

Say how many instances of an integration must stay up while nodes are being maintained.

## How it works

Maintenance of the cluster — an upgrade, a node replaced — evicts instances. A disruption budget tells the cluster how many instances of this integration must stay available while it does so, so that it never evicts them all at once.

:::warning[Needs at least two replicas]
A budget requiring one available instance on an integration with one replica blocks maintenance of its node.
:::

## Prerequisites

- An [integration](/runtime/integrations), created and bound to an environment.
- Two instances or more — see [Size an integration](/runtime/settings/compute).

## Procedure

{/* screenshot: runtime-settings-disruption-budget */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **Disruption Budget**.
3. Give **Min Available** or **Max Unavailable**, as a number or a percentage.
4. Choose **Apply changes**.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Min Available** | The fewest instances that must stay up, such as `1` or `50%`. | — |
| **Max Unavailable** | The most instances that may be down at once, such as `1` or `25%`. | — |

## Behavior and limits

- Give one of the two, not both.
- With a single instance, requiring one to stay up blocks maintenance: run two.

## See also

- [Integrations](/runtime/integrations) — every setting at a glance
- [Choose where an integration runs](/runtime/settings/affinity)

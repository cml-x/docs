---
title: Load Balancing
sidebar_position: 11
---

Decide how the gateway spreads requests across the instances of the service, and whether a client stays on the same instance.

## Use cases

When instances are not interchangeable — a session kept in memory — or when requests differ a lot in cost.

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.
- A service running several instances.

## Procedure

{/* screenshot: api-manager-policy-tasks-load-balancing */}

1. In **API Manager**, go to **API Instances** and open the API. To cover everything published on a gateway instead, open the gateway.
2. Open its **Backend traffic** policies and add the rule **load balancing**.
3. In **Algorithm**, choose how requests are spread.
4. Turn **Session Persistence** on to keep a client on the same instance.
5. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Algorithm** | **Round Robin**: each instance in turn. **Least Request**: the least busy. **Random**. **Consistent Hash**: the same client to the same instance. | Round Robin |
| **Session Persistence** | Keep the requests of a client on the same instance. | Off |

## Behavior and limits

- **Least Request** suits requests of very different durations.
- Keeping a client on one instance is a workaround: a service that keeps nothing in memory scales and restarts better.

## See also

- [Policies](/api-manager/policies) — every rule at a glance

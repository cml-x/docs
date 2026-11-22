---
title: Circuit Breaker
sidebar_position: 10
---

Stop sending traffic to a service that is overwhelmed, by capping what the gateway sends it at the same time.

## How it works

A backend that slows down makes requests pile up in front of it, which slows it further. A circuit breaker caps how many connections and requests the gateway keeps open to the backend; beyond the cap it answers `503` at once, which lets the backend recover and lets callers fail fast.

:::tip[Size the caps from normal traffic]
Set them above the peak you observe in the gateway metrics, not at the default: too low a cap rejects healthy traffic.
:::

Every parameter and its default: [reference](/api-manager/reference/backend-traffic-policy#circuit-breaker).

## Use cases

When a service slows down under load and makes things worse by receiving more.

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.

## Procedure

{/* screenshot: api-manager-policy-tasks-circuit-breaker */}

1. In **API Manager**, go to **API Instances** and open the API. To cover everything published on a gateway instead, open the gateway.
2. Open its **Backend traffic** policies and add the rule **circuit breaker**.
3. Lower the caps that fit your service: connections, waiting requests, parallel requests, parallel retries.
4. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Max Connections** | The most connections open to the service at the same time. | 1024 |
| **Max Pending Requests** | The most requests waiting for a free connection. | 1024 |
| **Max Parallel Requests** | The most requests being handled at the same time. | 1024 |
| **Max Parallel Retries** | The most retries running at the same time. | 1024 |

## Behavior and limits

- A request beyond a cap is refused at once with `503`, instead of waiting.
- The defaults are high: measure what your service handles before lowering them.

## See also

- [Policies](/api-manager/policies) — every rule at a glance
- [Limit the number of requests](/api-manager/policy-tasks/rate-limit)

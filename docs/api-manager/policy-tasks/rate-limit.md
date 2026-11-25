---
title: Apply Rate Limiting
sidebar_position: 7
---

Refuse requests beyond a number per second, minute or hour, before they reach your service.

## How it works

The gateway counts requests over a window and answers `429` beyond the limit. It protects the service from overload and keeps one caller from consuming everything.

:::info[Counted per gateway instance]
Each instance of the gateway keeps its own counter: with three instances the effective limit is up to three times the value.
:::

Every parameter and its default: [reference](/api-manager/reference/backend-traffic-policy#rate-limit).

## Use cases

To protect a service from overload, from a client that loops, or from an unexpected peak.

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.

## Procedure

{/* screenshot: api-manager-policy-tasks-rate-limit */}

1. In **API Manager**, go to **API Instances** and open the API. To cover everything published on a gateway instead, open the gateway.
2. Open its **Backend traffic** policies and add the rule **rate limit**.
3. In **Max Requests**, give the number of requests allowed.
4. In **Time Unit**, choose the window: second, minute or hour.
5. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Max Requests** | The number of requests allowed in the window. | 100 |
| **Time Unit** | The window the limit is counted over: second, minute or hour. | Minute |

## Verification

```bash title="Beyond the limit"
for i in $(seq 1 120); do curl -s -o /dev/null -w "%{http_code}\n" https://orders.example.com/orders; done | sort | uniq -c
```

```text title="Result, with 100 requests per minute"
    100 200
     20 429
```

## Behavior and limits

- A refused request is answered `429 Too Many Requests`.
- Size the limit above what a well-behaved client sends at its busiest.

## See also

- [Policies](/api-manager/policies) — every rule at a glance
- [Limit the load on a backend](/api-manager/policy-tasks/circuit-breaker)

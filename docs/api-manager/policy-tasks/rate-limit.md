---
title: Limit the Number of Requests
sidebar_position: 7
---

Refuse requests beyond a number per second, minute or hour, before they reach your service.

## When to use it

To protect a service from overload, from a client that loops, or from an unexpected peak.

## Before you begin

- An [API instance](/api-manager/api-instances) that is deployed and answers.

## Procedure

{/* screenshot: api-manager-policy-tasks-rate-limit */}

1. In **API Manager**, go to **API Instances** and open the API. To cover everything published on a gateway instead, open the gateway.
2. Open its **Backend traffic** policies and add the rule **rate limit**.
3. In **Max Requests**, give the number of requests allowed.
4. In **Time Unit**, choose the window: second, minute or hour.
5. Deploy.

## Field reference

| Field | What it is | Default |
|---|---|---|
| **Max Requests** | The number of requests allowed in the window. | 100 |
| **Time Unit** | The window the limit is counted over: second, minute or hour. | Minute |

## Verify

```bash title="Beyond the limit"
for i in $(seq 1 120); do curl -s -o /dev/null -w "%{http_code}\n" https://orders.example.com/orders; done | sort | uniq -c
```

```text title="Result, with 100 requests per minute"
    100 200
     20 429
```

## Good to know

- A refused request is answered `429 Too Many Requests`.
- Size the limit above what a well-behaved client sends at its busiest.

## See also

- [Policies](/api-manager/policies) — every rule at a glance
- [Limit the load on a backend](/api-manager/policy-tasks/circuit-breaker)

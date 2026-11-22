---
title: Request Timeouts
sidebar_position: 8
---

Give up on a request when the service behind the API takes too long, instead of keeping the caller waiting.

## How it works

The gateway stops waiting for the backend after a set time and answers `504`. Without a timeout, a backend that hangs holds connections and callers indefinitely.

:::tip[Shorter than your callers]
Set the request timeout below the timeout of the applications that call the API, so that they get a clear `504` rather than giving up first.
:::

Every parameter and its default: [reference](/api-manager/reference/backend-traffic-policy#timeouts).

## Use cases

Always, on an API in production: without a timeout, a slow service holds connections until the caller gives up.

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.

## Procedure

{/* screenshot: api-manager-policy-tasks-timeout */}

1. In **API Manager**, go to **API Instances** and open the API. To cover everything published on a gateway instead, open the gateway.
2. Open its **Backend traffic** policies and add the rule **timeout**.
3. In **Request Timeout**, give the longest a whole request may take, such as `30s`.
4. Optionally give a **Connect Timeout** and an **Idle Timeout**.
5. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Request Timeout** | The longest a whole request may take. | `30s` |
| **Connect Timeout** | The longest the gateway waits to open a connection to the service. | — |
| **Idle Timeout** | How long a connection may stay idle before it is closed. | — |

## Verification

```bash title="A request that takes too long"
curl -i https://orders.example.com/orders/slow
```

```http title="Answer"
HTTP/1.1 504 Gateway Timeout
```

## Behavior and limits

- Set the timeout shorter than the one of the caller, so that the gateway answers before the caller gives up.
- A timeout does not stop the work already started in your service: make long operations asynchronous.

## See also

- [Policies](/api-manager/policies) — every rule at a glance
- [Retry failed requests](/api-manager/policy-tasks/retry)

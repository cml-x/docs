---
title: Retries
sidebar_position: 9
---

Send a request again when the service behind the API fails, so that a brief failure is not seen by the caller.

## Use cases

For requests that are safe to repeat: reads, and writes that your service recognises when it receives them twice.

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.

## Procedure

{/* screenshot: api-manager-policy-tasks-retry */}

1. In **API Manager**, go to **API Instances** and open the API. To cover everything published on a gateway instead, open the gateway.
2. Open its **Backend traffic** policies and add the rule **retry**.
3. In **Max Retries**, give how many times a failed request is sent again.
4. In **Retry On**, list what triggers a retry: `5xx`, `gateway-error`, `reset`, `connect-failure`.
5. Adjust **Base Interval** and **Max Interval**, the wait between attempts.
6. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Max Retries** | How many times a failed request is sent again. | 3 |
| **Retry On** | The failures that trigger a retry. | `5xx`, `gateway-error`, `reset` |
| **Base Interval** | The wait before the first retry. It grows with each attempt. | `100ms` |
| **Max Interval** | The longest wait between two attempts. | `10s` |

## Behavior and limits

- A retry sends the same request again: on a write, it can create a duplicate unless your service recognises a request it already handled.
- Retries add load to a service that is already failing. Combine them with a [circuit breaker](/api-manager/policy-tasks/circuit-breaker).
- The total time of a request with its retries is bounded by the [timeout](/api-manager/policy-tasks/timeout).

## See also

- [Policies](/api-manager/policies) — every rule at a glance

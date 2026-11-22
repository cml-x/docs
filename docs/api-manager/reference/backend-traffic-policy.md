---
title: Backend Traffic Policy
sidebar_position: 2
---

Reference of the backend traffic policy: how the gateway sends requests to the backend of an
API. It is deployed as an Envoy Gateway `BackendTrafficPolicy`.

## Target

| Field | Values | Meaning |
|---|---|---|
| `targetRef.kind` | `HTTPRoute`, `Gateway`, `GRPCRoute` | An API instance, or a whole gateway |
| `targetRef.name` | Name | The API instance or the gateway |
| `targetRef.sectionName` | Name, optional | One access point of a gateway |

## Rate limit

**Why.** Protect a backend from more traffic than it can serve, and keep one caller from
starving the others.

| Parameter | Default | Meaning |
|---|---|---|
| `requests` | Required | Requests allowed in the window |
| `unit` | `Minute` | `Second`, `Minute` or `Hour` |

**Consequences.** Beyond the limit the gateway answers `429`.

:::info[The limit is local to each gateway instance]
The counter is kept by each instance of the gateway, not shared. With two instances, the
effective limit is up to twice the configured value. Size it per instance, and remember that
autoscaling the gateway changes the total.
:::

Procedure: [Rate limiting](/api-manager/policy-tasks/rate-limit).

## Timeouts

**Why.** Without a timeout, a backend that stops answering holds a connection and a caller indefinitely. Timeouts bound how long the gateway waits at each stage.

| Parameter | Default | Meaning |
|---|---|---|
| `connectTimeout` | Gateway default | Maximum time to open a connection to the backend, such as `5s` |
| `requestTimeout` | Gateway default | Maximum time for the complete response, such as `30s` |
| `idleTimeout` | Gateway default | Close backend connections idle for this long, such as `1h` |

**Consequences.** A request that exceeds `requestTimeout` is answered `504` and the backend call
is abandoned — the backend may still complete it.

:::tip[Order the timeouts]
Client timeout above gateway `requestTimeout` above the timeout the route applies to its own
outgoing calls. Otherwise the caller gives up first and the work is wasted.
:::

Procedure: [Request timeouts](/api-manager/policy-tasks/timeout).

## Retries

**Why.** Many failures are transient: a connection reset, an instance restarting. A retry hides them from the caller — at the cost of sending the request again.

| Parameter | Default | Meaning |
|---|---|---|
| `numRetries` | `2` | Attempts after the first failure |
| `perRetryTimeout` | — | Maximum time of each attempt |
| `triggers` | `5xx` | `5xx`, `gateway-error`, `connect-failure`, `reset`, `retriable-4xx`, `retriable-status-codes` |
| `httpStatusCodes` | — | Status codes retried when `retriable-status-codes` is a trigger |
| `baseInterval` | `25ms` | Wait before the first retry; grows exponentially |
| `maxInterval` | `250ms` | Upper bound of the wait |

:::warning[Retries repeat side effects]
A retried `POST` may be executed twice by the backend. Retry on `connect-failure` and `reset`
for any operation; retry on `5xx` only when the operation is idempotent or deduplicated.
:::

**Consequences.** Worst-case duration is `(numRetries + 1) × perRetryTimeout` plus the waits:
keep it below `requestTimeout`. Retries multiply load on a backend that is already failing —
pair them with a circuit breaker.

Procedure: [Retries](/api-manager/policy-tasks/retry).

## Circuit breaker

**Why.** Cap what the gateway sends to a backend, so that a slow backend fails fast instead of
accumulating requests.

| Parameter | Default | Meaning |
|---|---|---|
| `maxConnections` | `1024` | Concurrent connections to the backend |
| `maxPendingRequests` | `1024` | Requests waiting for a connection |
| `maxParallelRequests` | `1024` | Requests in progress |
| `maxParallelRetries` | `1024` | Retries in progress |

**Consequences.** Beyond a cap the gateway answers `503` immediately. The caps apply per gateway
instance.

Procedure: [Circuit breaker](/api-manager/policy-tasks/circuit-breaker).

## Load balancing

**Why.** When a backend has several instances, the algorithm decides which one receives each request. The default suits most cases; change it for uneven request durations or for session affinity.

| Parameter | Default | Meaning |
|---|---|---|
| `algorithm` | `RoundRobin` | `RoundRobin`, `LeastRequest`, `Random`, `ConsistentHash` |
| `affinityKey` | `SourceIP` | With `ConsistentHash`: `SourceIP`, `Header` or `Cookie` |
| `headerName` | `x-user-id` | Header used as key |
| `cookieName` | `session` | Cookie used as key |
| `cookieTTL` | Session cookie | Lifetime of the cookie, such as `3600s` |

| Algorithm | Use |
|---|---|
| `RoundRobin` | Homogeneous instances, short requests |
| `LeastRequest` | Requests of uneven duration |
| `ConsistentHash` | Session affinity, local caches |

### Active health check

By default the gateway relies on the readiness reported by the platform. An active health check makes the gateway probe each instance itself and stop sending to those that fail.

| Parameter | Default | Meaning |
|---|---|---|
| `healthCheck.protocol` | `HTTP` | `HTTP`, `TCP` or `GRPC` |
| `healthCheck.interval` | `3s` | Time between probes |
| `healthCheck.timeout` | `1s` | Time allowed for a probe |
| `healthCheck.unhealthyThreshold` | `3` | Consecutive failures before an instance is removed |
| `healthCheck.httpPath` | `/healthz` | Path probed over HTTP |

:::info[Affinity is not a guarantee]
With `ConsistentHash`, a change in the number of backend instances remaps part of the keys. Keep
session state outside the instances when it must survive a scale-out.
:::

Procedure: [Load balancing](/api-manager/policy-tasks/load-balancing).

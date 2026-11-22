---
title: Monitor an Integration
sidebar_position: 5
---

Where to look, in which order, to know whether an integration is healthy.

Use this guide to set up the minimum that lets you notice a problem before your callers report
it, and to know where to look when they do.

## Signals and where they are

Each question about an integration has one signal that answers it. This table maps the question to the place to look.

| Question | Signal | Where |
|---|---|---|
| Is it deployed and ready? | Phase, instances, revision | Page of the integration, Runtime Manager |
| Did the build succeed? | Build log | Page of the integration |
| What did the routes do? | Logs, JSON, per `service.name` | Monitoring, **Logs Insight** |
| Throughput, failures, latency per route | `camel_exchanges_total`, `camel_route_policy_*` | Monitoring, **Metrics** |
| Memory, GC, threads | `jvm_*`, `process_cpu_usage` | Monitoring, **Metrics** |
| Where one request spent its time | Trace | Monitoring, **Distributed Traces** |
| What callers experienced | Gateway request rate, code classes, duration | Monitoring, **Metrics** |

## Minimal dashboard

Four panels per integration — queries on the [Metrics](/monitoring/metrics) page:

1. exchange rate per route;
2. mean processing time per route;
3. heap used against the memory limit;
4. share of 5xx responses at the gateway.

## Minimal alerts

Three alerts cover most incidents. Each one corresponds to something a caller would notice.

| Alert | Condition |
|---|---|
| Errors | Share of 5xx above a threshold for five minutes |
| Latency | Mean processing time above the target for five minutes |
| Stalled | Exchange rate at zero while traffic is expected |

## Diagnosis order

1. Phase and instances of the integration: not ready, restarting?
2. Logs of the last minutes, filtered on `ERROR` and `WARN`.
3. A trace of a slow or failed request.
4. Gateway metrics, to tell a route problem from a routing or policy problem.

Detail: [tutorial, step 10](/tutorial/observe).

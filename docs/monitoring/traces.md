---
title: Distributed Traces
sidebar_position: 5
---

**Distributed Traces** searches the traces of the environment selected and shows each one as a
timeline of spans.

## What traces are for

A trace follows **one request** across everything it touched: the gateway, the integration, the
systems the integration called. It shows where the time went and which step failed.

Reach for a trace when a request is slow or fails and one service's logs do not explain it — the
cause is often in the hop before or after. A trace also shows what a route really does at run
time, which is not always what its source suggests.

## Instrumentation

Tracing comes from `camel:opentelemetry2`, part of every integration. Spans are exported over
OTLP with the resource attributes `service.name`, `service.namespace` and
`deployment.environment`. Nothing is declared in the routes.

## What a trace contains

A trace is a tree of spans. Each span is one piece of work with a start, a duration and a status.

| Span | Represents |
|---|---|
| Server span | The exchange started by a consumer endpoint — `platform-http`, `kafka`, `timer` |
| Child spans | The endpoints the route sends to — `http`, `kafka`, `sql` |

The trace context is propagated on outgoing calls. An integration called by another, or behind
the gateway, continues the trace it receives instead of starting a new one.

## Reading a timeline

The shape of a trace usually points at the cause of a slow request.

| Pattern | Likely cause |
|---|---|
| One long child span | The system called is slow |
| A long parent whose children are short | Time spent in the route itself: transformation, aggregation, waiting on a thread pool |
| Many short sequential children | Calls made one by one that could be batched or made in parallel |
| A span in error with no child | The failure happened before any outgoing call: validation, marshalling |

:::tip[Start from the slowest]
Sort traces by duration and open the slowest of the period. One slow trace usually shows the
pattern behind a degraded average.
:::

## From a trace to its logs

Log entries written during an exchange carry its trace identifier. Search that identifier in
[Logs Insight](/monitoring/logs) to read what the route logged for that request.

## Related pages

- [Inspect a distributed trace](/monitoring/tasks/follow-a-trace)

---
title: Distributed Traces (OpenTelemetry)
sidebar_position: 5
---

**Distributed Traces** searches the traces of the environment selected and shows each one as a
timeline of spans.

## Instrumentation

Tracing comes from `camel:opentelemetry2`, part of every integration. Spans are exported over
OTLP with the resource attributes `service.name`, `service.namespace` and
`deployment.environment`. Nothing is declared in the routes.

## What a trace contains

| Span | Represents |
|---|---|
| Server span | The exchange started by a consumer endpoint — `platform-http`, `kafka`, `timer` |
| Child spans | The endpoints the route sends to — `http`, `kafka`, `sql` |

The trace context is propagated on outgoing calls. An integration called by another, or behind
the gateway, continues the trace it receives instead of starting a new one.

## Reading a timeline

| Pattern | Likely cause |
|---|---|
| One long child span | The system called is slow |
| A long parent whose children are short | Time spent in the route itself: transformation, aggregation, waiting on a thread pool |
| Many short sequential children | Calls made one by one that could be batched or made in parallel |
| A span in error with no child | The failure happened before any outgoing call: validation, marshalling |

## From a trace to its logs

Log entries written during an exchange carry its trace identifier. Search that identifier in
[Logs Insight](/monitoring/logs) to read what the route logged for that request.

## Related pages

- [Inspect a distributed trace](/monitoring/tasks/follow-a-trace)

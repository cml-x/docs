---
title: Telemetry Model
sidebar_position: 1
---

Monitoring embeds the OpenObserve views — dashboards, logs, metrics, traces, alerts and reports —
inside the console, scoped to the business unit and the environment selected.

![Telemetry pipeline: from an integration and a gateway to the Monitoring views](/img/monitoring/telemetry-pipeline.drawio.png)

## How telemetry reaches the views

Nothing is configured per integration. Every integration is built with the libraries that
produce metrics and traces, and writes its logs as JSON. In the environment, a collector receives
metrics and traces over OTLP and a log flow reads the logs. Both forward to the telemetry store,
labelled with the business unit and the environment. The views of Monitoring read that store.

The same log flow can also copy logs to systems of yours — that is the
[Log Exporter](/infra/log-exporter).

## Which signal for which question

| Your question | Signal | Why this one |
|---|---|---|
| Is the service healthy right now? | Metrics | Cheap aggregates over time; what dashboards and alerts are built on |
| Why was this request slow or refused? | Traces | One request, step by step, across services |
| What exactly did the route do? | Logs | The message, the exception, the business identifier |

In an incident the usual order is metrics, then a trace, then logs: from "something is wrong" to
"here" to "because".

## Scope of the views

{/* screenshot: monitoring-embedded-scope */}

Every view shows the data of one business unit and one environment. You do not choose them in Monitoring: they follow what is selected in the console.

| OpenObserve notion | Mapped to |
|---|---|
| Organization | The business unit selected in the console |
| Stream | The alias of the environment selected |

When a URL carries its own organization or stream, the URL wins: a link shared by a colleague
opens on what they were looking at, not on your current selection.

## What integrations emit

Every integration is instrumented at build time — see
[Observe: logs, metrics, traces](/tutorial/observe).

| Signal | Source | Transport |
|---|---|---|
| Logs | Console output of the runtime, as JSON | Log flow of the environment |
| Metrics | Micrometer meters: `camel_*`, `jvm_*`, `process_*` | OTLP |
| Traces | OpenTelemetry spans of the Camel exchanges | OTLP |

Resource attributes on every signal:

```properties
service.name=<integration name>
service.namespace=<environment alias>
deployment.environment=<environment alias>
```

## What gateways emit

Gateways report Envoy statistics — downstream requests, response code classes, request duration,
connections, TLS handshakes — listed under [Metrics](/monitoring/metrics).

## Console Views

Monitoring has one view per kind of signal, plus what is built on top of them.

| View | Content |
|---|---|
| [Dashboards](/monitoring/home) | Saved dashboards and dashboard templates |
| [Logs Insight](/monitoring/logs) | Log search |
| [Metrics](/monitoring/metrics) | PromQL over the metric streams |
| [Distributed Traces](/monitoring/traces) | Trace search and span timeline |
| **Alerts** | Alert rules, destinations, firing history |
| **Reports** | Dashboards sent on a schedule |

## What a dashboard is for

A dashboard answers "is this service well?" at a glance, for someone who did not build it. It is
worth building when you find yourself running the same three queries every morning, or when a
colleague on call needs to judge the state of a service they do not know.

A good one is small. Four panels that map to what a caller experiences — traffic, errors,
latency — and to the one resource that runs out first, usually memory, tell more than forty
panels of everything that can be measured.

:::tip[Build from templates, then remove]
Start from a ready-made template and delete the panels you never look at. A dashboard nobody
reads in full is a dashboard nobody trusts.
:::

## What logs are for

Logs answer "what happened to this request, in this route?". They are the right tool once you
know **where** to look — a metric showed errors, a trace showed the slow step — and need the
detail: the message, the exception, the identifier of the order.

They are the wrong tool for trends. "How many errors per minute" is a metric; counting log lines
to get it is slow and costly.

## What metrics are for

Metrics answer "how much, how fast, how often" over time. They are cheap to store and query,
which makes them the right basis for dashboards and alerts. They do not tell you *which* request
failed — that is what traces and logs are for.

Every integration and every gateway reports the series below without any configuration. To use
them you only need to know their names and the labels that select one service.

:::info[Selecting one service]
Filter on `service_name` — the name of the integration or of the gateway — and, to restrict to
one environment, on `service_namespace`.
:::

## What traces are for

A trace follows **one request** across everything it touched: the gateway, the integration, the
systems the integration called. It shows where the time went and which step failed.

Reach for a trace when a request is slow or fails and one service's logs do not explain it — the
cause is often in the hop before or after. A trace also shows what a route really does at run
time, which is not always what its source suggests.

## Related Tasks

| Task | Page |
|---|---|
| Search logs | [Query logs](/monitoring/tasks/search-logs) |
| Chart a series | [Query metrics](/monitoring/tasks/read-metrics) |
| Find where a request spent its time | [Inspect a distributed trace](/monitoring/tasks/follow-a-trace) |
| Assemble panels | [Create a dashboard](/monitoring/tasks/build-a-dashboard) |
| Be notified on a threshold | [Create an alert rule](/monitoring/tasks/create-an-alert) |
| Send a dashboard periodically | [Schedule a dashboard report](/monitoring/tasks/schedule-a-report) |

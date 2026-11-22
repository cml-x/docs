---
title: Overview
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

## Views

Monitoring has one view per kind of signal, plus what is built on top of them.

| View | Content |
|---|---|
| [Dashboards](/monitoring/home) | Saved dashboards and dashboard templates |
| [Logs Insight](/monitoring/logs) | Log search |
| [Metrics](/monitoring/metrics) | PromQL over the metric streams |
| [Distributed Traces](/monitoring/traces) | Trace search and span timeline |
| **Alerts** | Alert rules, destinations, firing history |
| **Reports** | Dashboards sent on a schedule |

## Tasks

| Task | Page |
|---|---|
| Search logs | [Query logs](/monitoring/tasks/search-logs) |
| Chart a series | [Query metrics](/monitoring/tasks/read-metrics) |
| Find where a request spent its time | [Inspect a distributed trace](/monitoring/tasks/follow-a-trace) |
| Assemble panels | [Create a dashboard](/monitoring/tasks/build-a-dashboard) |
| Be notified on a threshold | [Create an alert rule](/monitoring/tasks/create-an-alert) |
| Send a dashboard periodically | [Schedule a dashboard report](/monitoring/tasks/schedule-a-report) |

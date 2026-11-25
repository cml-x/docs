---
title: 10. Observe Logs, Metrics and Traces
sidebar_position: 11
---

Every integration is instrumented when it is built: nothing is added to the routes. This step
shows what is emitted, how it is labelled, and where to read it.

## Telemetry pipeline

Three dependencies are part of every integration and cannot be removed:

```text title="Dependencies"
camel:opentelemetry2
camel:micrometer
mvn:io.quarkus:quarkus-micrometer-opentelemetry
```

| Signal | Produced by | Transport |
|---|---|---|
| Logs | The console of the runtime, written as JSON | Collected by the log flow of the environment |
| Metrics | Micrometer: Camel, JVM and process meters | OTLP |
| Traces | OpenTelemetry spans of the Camel exchanges | OTLP |

Each signal carries the resource attributes set by the platform:

| Attribute | Value |
|---|---|
| `service.name` | The name of the integration — `orders-api` |
| `service.namespace` | The alias of the environment |
| `deployment.environment` | The alias of the environment |

In **Monitoring**, the organization is the business unit and the stream is the environment. Both
are taken from what is selected in the console.

## Query the Logs

{/* screenshot: tutorial-logs-insight */}

Open **Monitoring**, then **Logs Insight**. Logs are JSON: level, logger and message are separate
fields. Log from a route with the `log` step:

```yaml title="orders.camel.yaml"
- log:
    loggingLevel: INFO
    message: "Order ${header.orderId} accepted"
```

A log entry written during a traced exchange carries the trace ID: from the entry, open the
trace.

To ship logs to your own Elasticsearch, Splunk, Loki or Kafka as well, see
[Log Exporter](/infra/log-exporter).

## Read the Metrics

Open **Metrics**. The series reported by an integration, with the queries the console itself
charts:

```promql title="Camel"
sum(rate(camel_exchanges_total{service_name="orders-api"}[5m])) by (routeid)
sum(camel_exchanges_inflight{service_name="orders-api"}) by (routeid)
sum(camel_routes_running{service_name="orders-api"}) by (camelcontext)
```

```promql title="Mean processing time per route, in milliseconds"
(sum(rate(camel_route_policy_sum{service_name="orders-api"}[5m])) by (routeid)
 / sum(rate(camel_route_policy_count{service_name="orders-api"}[5m])) by (routeid)) * 1000
```

```promql title="JVM and process"
sum(jvm_memory_used{service_name="orders-api", area="heap"}) by (id)
sum(jvm_threads_live{service_name="orders-api"})
avg(process_cpu_usage{service_name="orders-api"}) * 100
```

Add `service_namespace="<environment>"` to restrict a query to one environment.

## Follow a Trace

Open **Distributed Traces** and filter on the service `orders-api`. A trace shows the exchange of
each route as a span, and the calls made to other systems as child spans. The trace context is
propagated on outgoing HTTP calls, so a call from one integration to another is one trace.

:::tip[Put a business identifier in the logs]
Log the order number or the message ID in each route. A trace tells you which step was slow;
the identifier tells you which order it was.
:::

## Gateway metrics

The gateway reports the same request from the outside: request rate, response code classes,
request duration, active connections, TLS handshakes. Compare the request duration at the gateway
with the processing time of the route to tell network and policy time from route time.

## Dashboards and alerts

- [Create a dashboard](/monitoring/tasks/build-a-dashboard) with the queries above.
- [Create an alert rule](/monitoring/tasks/create-an-alert) on the error rate and on the
  processing time.

Next: [production readiness](/tutorial/production).

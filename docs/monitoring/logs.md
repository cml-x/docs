---
title: Logs Insight
sidebar_position: 3
---

**Logs Insight** searches the logs collected in the environment selected.

## Log format

Integrations write their console output as JSON. Each entry is parsed into fields — timestamp,
level, logger name, message, thread — so that filters apply to a field rather than to a text
match.

:::warning Output that is not JSON is not parsed
The log flow of the environment parses JSON. A line that is not valid JSON — a stack trace
printed directly to standard output, a library writing its own format — is not split into
fields. Log through the Camel `log` step or a logger, not with `System.out`.
:::

## Fields added by the platform

| Field | Value |
|---|---|
| `service.name` | Name of the integration |
| `service.namespace` | Alias of the environment |
| Trace and span identifiers | Present on entries written during a traced exchange |

## Logging from a route

```yaml
- log:
    loggingLevel: WARN
    logName: orders
    message: "Order ${header.orderId} rejected: ${exception.message}"
```

Set the level of a logger with a runtime property:

```properties
quarkus.log.category."org.apache.camel.component.kafka".level=DEBUG
```

## Retention and export

Logs stay in the platform store. To send them to your own systems as well — Elasticsearch,
OpenSearch, Loki, Splunk, Datadog, Kafka, HTTP — see [Log Exporter](/infra/log-exporter).

## Related pages

- [Query logs](/monitoring/tasks/search-logs)
- [Camel runtime properties](/runtime/settings/camel-runtime)

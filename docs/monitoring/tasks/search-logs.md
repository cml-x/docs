---
title: Query Logs
sidebar_position: 1
---

Find what an integration or a gateway logged, in a period, matching what you are looking for.

## How it works

Logs are searched by period and by field. Because integrations log in JSON, you filter on the level, the logger or the service name rather than on raw text, which is both faster and more precise.

:::tip Narrow the period first
Start from the minute of the incident and widen. A search over a day of logs is slow and returns too much to read.
:::

## Prerequisites

- Something running in the environment: an integration, a gateway.
- The business unit and the environment selected in the console: the views open on them.

## Procedure

{/* screenshot: monitoring-tasks-search-logs */}

1. In **Monitoring**, go to **Logs Insight**.
2. Choose the period.
3. Narrow down by the integration, the level, or a word of the message.
4. Open an entry to read all its fields.

## Behavior and limits

- Integrations log in a structured form: each entry has fields — level, logger, message — that can be filtered on.
- An entry that belongs to a traced request carries its trace: from there you can follow the whole request.
- To send logs to your own tools as well, see [Log Exporter](/infra/log-exporter).

## See also

- [Monitoring: getting started](/monitoring/getting-start)
- [Follow a request across services](/monitoring/tasks/follow-a-trace)
- [Logs](/monitoring/logs)

---
title: Search the Logs
sidebar_position: 1
---

Find what an integration or a gateway logged, in a period, matching what you are looking for.

## Before you begin

- Something running in the environment: an integration, a gateway.
- The business unit and the environment selected in the console: the views open on them.

## Procedure

{/* screenshot: monitoring-tasks-search-logs */}

1. In **Monitoring**, go to **Logs Insight**.
2. Choose the period.
3. Narrow down by the integration, the level, or a word of the message.
4. Open an entry to read all its fields.

## Good to know

- Integrations log in a structured form: each entry has fields — level, logger, message — that can be filtered on.
- An entry that belongs to a traced request carries its trace: from there you can follow the whole request.
- To send logs to your own tools as well, see [Log Exporter](/infra/log-exporter).

## See also

- [Monitoring: getting started](/monitoring/getting-start)
- [Follow a request across services](/monitoring/tasks/follow-a-trace)
- [Logs](/monitoring/logs)

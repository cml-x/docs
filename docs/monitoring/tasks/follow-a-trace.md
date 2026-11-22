---
title: Follow a Request Across Services
sidebar_position: 3
---

See the path one request took — through the gateway, the integration and what it called — and where its time went.

## When to use it

When a request is slow or fails and the logs of one service are not enough to say why.

## Before you begin

- Something running in the environment: an integration, a gateway.
- The business unit and the environment selected in the console: the views open on them.

## Procedure

{/* screenshot: monitoring-tasks-follow-a-trace */}

1. In **Monitoring**, go to **Distributed Traces**.
2. Choose the period and find the request: by service, by duration, by error.
3. Open the trace. Each line is a step; its length is the time it took.
4. Open a step to read its details and the logs written during it.

## Good to know

- Every integration is traced without any change to its routes: it comes from the monitoring dependencies each integration carries.
- The longest step is where to look first. A step that is long while its own children are short spent its time waiting.

## See also

- [Monitoring: getting started](/monitoring/getting-start)
- [Search the logs](/monitoring/tasks/search-logs)
- [Traces](/monitoring/traces)

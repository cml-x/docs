---
title: Read the Metrics
sidebar_position: 2
---

See how much traffic a service takes, how fast it answers and how often it fails, over time.

## Before you begin

- Something running in the environment: an integration, a gateway.
- The business unit and the environment selected in the console: the views open on them.

## Procedure

{/* screenshot: monitoring-tasks-read-metrics */}

1. In **Monitoring**, go to **Metrics**.
2. Choose the period.
3. Choose what to look at: the requests of a gateway, the exchanges of an integration, its memory.

## Good to know

- Integrations report on their routes — exchanges completed, failed, in flight, and how long they take — and on their JVM: memory, garbage collection.
- Gateways report on connections and requests, by API.
- A page of an integration also has its own **dashboard**, for a first look without leaving Runtime Manager.

## See also

- [Monitoring: getting started](/monitoring/getting-start)
- [Build a dashboard](/monitoring/tasks/build-a-dashboard)
- [Metrics](/monitoring/metrics)

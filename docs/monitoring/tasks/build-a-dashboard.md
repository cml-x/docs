---
title: Create a Dashboard
sidebar_position: 4
---

Gather on one page the figures that tell whether a service is well: traffic, errors, response time, resources.

## How it works

A dashboard keeps the queries you run again and again on one page. Build it around what a caller experiences — traffic, errors, latency — plus the resource that runs out first.

:::tip[Use variables]
Filter panels on a `service_name` variable so that one dashboard serves every integration.
:::

## Prerequisites

- Something running in the environment: an integration, a gateway.
- The business unit and the environment selected in the console: the views open on them.

## Procedure

{/* screenshot: monitoring-tasks-build-a-dashboard */}

1. In **Monitoring**, go to **Dashboards**.
2. Create a dashboard, or start from a ready-made template.
3. Add a panel: choose what it shows and how — a line, a number, a table.
4. Arrange the panels and save.

## Behavior and limits

- Start with four panels per service: requests, errors, response time, and what it uses of its memory.
- A dashboard can be shared by its address: the period and the filters travel with it.

## See also

- [Monitoring: getting started](/monitoring/getting-start)
- [Be alerted](/monitoring/tasks/create-an-alert)
- [Send a report regularly](/monitoring/tasks/schedule-a-report)

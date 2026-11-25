---
title: Dashboard Reference
sidebar_position: 2
---

**Dashboards** lists the dashboards of the business unit, in the `default` folder, and opens them
inside the console on the environment selected.

Rationale: [What a dashboard is for](/monitoring/getting-start#what-a-dashboard-is-for).

## Dashboard templates

When no dashboard exists yet, the page offers ready-made templates. A template bundles one or
several dashboard definitions and a README; instantiating it creates each dashboard in the
`default` folder.

## Panels and queries

A panel charts a query over a stream: PromQL for metrics, a log query for logs. The queries of
the [Metrics](/monitoring/metrics) page can be pasted as they are.

## Dashboard Variables

Filter panels on `service_name` and `service_namespace` rather than hard-coding an integration:
the same dashboard then serves every integration and every environment.

## Dashboard Sharing

The address of a dashboard carries its organization, its stream, its period and its variables.
Whoever opens the link sees the same data, provided they have access to the business unit.

## Related pages

- [Create a dashboard](/monitoring/tasks/build-a-dashboard)
- [Schedule a dashboard report](/monitoring/tasks/schedule-a-report)

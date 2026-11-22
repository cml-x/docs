---
title: Dashboards
sidebar_position: 2
---

**Dashboards** lists the dashboards of the business unit, in the `default` folder, and opens them
inside the console on the environment selected.

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

## Dashboard templates

When no dashboard exists yet, the page offers ready-made templates. A template bundles one or
several dashboard definitions and a README; instantiating it creates each dashboard in the
`default` folder.

## Panels and queries

A panel charts a query over a stream: PromQL for metrics, a log query for logs. The queries of
the [Metrics](/monitoring/metrics) page can be pasted as they are.

## Variables

Filter panels on `service_name` and `service_namespace` rather than hard-coding an integration:
the same dashboard then serves every integration and every environment.

## Sharing

The address of a dashboard carries its organization, its stream, its period and its variables.
Whoever opens the link sees the same data, provided they have access to the business unit.

## Related pages

- [Create a dashboard](/monitoring/tasks/build-a-dashboard)
- [Schedule a dashboard report](/monitoring/tasks/schedule-a-report)

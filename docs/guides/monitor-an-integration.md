---
title: Monitor an Integration
sidebar_position: 5
---

Once an integration is deployed, two apps tell you what it's doing right now.

## 1. Deployment health, in Runtime Manager

Open the [Capsule](/runtime/capsule) the integration runs in. It shows real-time deployment status
and per-component health (running, succeeded, failed), plus a revision history if you need to
check what changed or roll back.

## 2. Dashboards, logs, metrics and traces, in Monitoring

In [Monitoring](/monitoring/getting-start), for the same project and environment:

- **Dashboards** — browse existing ones, or create one from the template gallery in one click if
  this is the first time you're monitoring this project.
- **Logs Insight**, **Metrics** and **Distributed Traces** — each opens the corresponding
  OpenObserve view in a new tab, already scoped to the current project and environment.

## If something looks wrong

Start with the Capsule's per-component health in Runtime Manager — a failed or not-running
component is often visible there before it shows up as missing data in a dashboard.

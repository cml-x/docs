---
title: Create an Alert Rule
sidebar_position: 5
---

Be told when a figure crosses a threshold, instead of watching a dashboard.

## Prerequisites

- Something running in the environment: an integration, a gateway.
- The business unit and the environment selected in the console: the views open on them.
- Where the alert is sent: an address your team reads.

## Procedure

{/* screenshot: monitoring-tasks-create-an-alert */}

1. In **Monitoring**, go to **Alerts**.
2. Create a **destination**: where alerts are sent.
3. Create a **rule**: what is watched, the threshold, for how long it must be crossed.
4. Choose the destination of the rule and save.

## Behavior and limits

- Alert on what a user feels — errors, response time — before alerting on causes.
- Require the threshold to be crossed for some minutes: a single slow request should wake no one.
- The history of an alert shows when it fired and when it stopped.

## See also

- [Monitoring: getting started](/monitoring/getting-start)
- [Build a dashboard](/monitoring/tasks/build-a-dashboard)

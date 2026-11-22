---
title: Cron Schedule
sidebar_position: 9
---

Run an integration at set times instead of continuously: it starts, does its work and stops.

## How it works

For an integration that runs on a schedule rather than continuously, this setting has the platform start it at the times of a cron expression and stop it when the work is done. Nothing runs, or is paid for, between two executions.

:::info[For periodic batches]
It suits routes that start from a timer or a scheduler. A route that listens for requests must stay up.
:::

## Prerequisites

- An [integration](/runtime/integrations), created and bound to an environment.
- A route that starts from a timer, a cron expression or a scheduler.

## Procedure

{/* screenshot: runtime-settings-cron */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **Cron Schedule**.
3. In **Schedule**, give the cron expression, such as `0/5 * * * *` for every five minutes.
4. Optionally give the **Time Zone** and what happens when a run is still going at the next one.
5. Choose **Apply changes**.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Schedule** | When the integration runs, as a cron expression. | — |
| **Time Zone** | The time zone of the schedule, such as `Europe/Paris`. | — |
| **Concurrency Policy** | When a run is still going at the next one: **Allow** both, **Forbid** the new one, or **Replace** the old one. | — |
| **Starting Deadline** | How late a missed run may still start, in seconds. | — |
| **Active Deadline** | The longest a run may take, in seconds. | 60 |
| **Backoff Limit** | How many times a failed run is tried again. | 2 |

## Behavior and limits

- Between two runs nothing runs: a scheduled integration uses no CPU or memory while it waits.
- It is not exposed and cannot be called: it is for batch work.

## See also

- [Integrations](/runtime/integrations) — every setting at a glance

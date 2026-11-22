---
title: Health Probes
sidebar_position: 8
---

Adjust the checks that say whether an integration is alive, whether it is ready to receive requests, and whether it has finished starting.

## How it works

Three probes tell the platform about an instance. **Startup**: has it finished starting? **Readiness**: may it receive traffic? **Liveness**: is it stuck and to be restarted? Wrong thresholds cause the two classic failures: traffic sent too early, and healthy instances restarted in a loop.

:::tip[Slow start: lengthen the startup probe, not liveness]
A generous startup probe gives a slow integration time to start without weakening the detection of a hang later.
:::

## Prerequisites

- An [integration](/runtime/integrations), created and bound to an environment.

## Procedure

{/* screenshot: runtime-settings-health-probes */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **Health Probes**.
3. Adjust the delays and thresholds of the liveness, readiness and startup checks.
4. Choose **Apply changes**.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Liveness** | Is the integration still working? If not, it is restarted. | On |
| **Readiness** | May the integration receive requests? If not, none is sent to it. | On |
| **Startup** | Has the integration finished starting? The two others wait for it. | Off |
| **Initial Delay** | How long to wait before the first check. | — |
| **Period** | How often the check runs. | — |
| **Timeout** | How long a check may take. | — |
| **Failure Threshold** | How many failed checks in a row count as a failure. | — |

## Behavior and limits

- Applying this setting restarts the integration; it does not rebuild its image.
- An integration that is slow to start and gets restarted before it is ready needs a **startup** check, or a longer initial delay.
- Each of the three checks has its own delays and thresholds.

## See also

- [Integrations](/runtime/integrations) — every setting at a glance
- [Size an integration](/runtime/settings/compute)

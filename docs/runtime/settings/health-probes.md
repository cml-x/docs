---
title: Tell When an Integration Is Ready
sidebar_position: 8
---

Adjust the checks that say whether an integration is alive, whether it is ready to receive requests, and whether it has finished starting.

## Before you begin

- An [integration](/runtime/integrations), created and bound to an environment.

## Procedure

{/* screenshot: runtime-settings-health-probes */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **Health Probes**.
3. Adjust the delays and thresholds of the liveness, readiness and startup checks.
4. Choose **Apply changes**.

## Field reference

| Field | What it is | Default |
|---|---|---|
| **Liveness** | Is the integration still working? If not, it is restarted. | On |
| **Readiness** | May the integration receive requests? If not, none is sent to it. | On |
| **Startup** | Has the integration finished starting? The two others wait for it. | Off |
| **Initial Delay** | How long to wait before the first check. | — |
| **Period** | How often the check runs. | — |
| **Timeout** | How long a check may take. | — |
| **Failure Threshold** | How many failed checks in a row count as a failure. | — |

## Good to know

- Applying this setting restarts the integration; it does not rebuild its image.
- An integration that is slow to start and gets restarted before it is ready needs a **startup** check, or a longer initial delay.
- Each of the three checks has its own delays and thresholds.

## See also

- [Integrations](/runtime/integrations) — every setting at a glance
- [Size an integration](/runtime/settings/compute)

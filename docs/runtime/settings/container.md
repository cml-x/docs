---
title: Harden the Container Security Context
sidebar_position: 13
---

Set how the container of an integration runs: as which user, with which privileges.

## How it works

The security context restricts what the container may do: run as a non-root user, forbid privilege escalation, make the root file system read-only, drop Linux capabilities. Hardening it limits what an attacker gains from a compromised integration.

:::warning[A read-only file system breaks routes that write locally]
Give such routes an EmptyDir volume for their temporary files.
:::

## Prerequisites

- An [integration](/runtime/integrations), created and bound to an environment.

## Procedure

{/* screenshot: runtime-settings-container */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **Container**.
3. Turn **Run As Non Root** on, leave **Allow Privilege Escalation** off, and keep every capability dropped.
4. Choose **Apply changes**.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Run As Non Root** | Refuse to start as the root user. | — |
| **Run As User** | The user ID the container runs as. | — |
| **Allow Privilege Escalation** | Let the process gain more privileges than it started with. | — |
| **Seccomp Profile** | The system calls the container may make: the default profile of the runtime, or unconfined. | — |
| **Capabilities Drop** | The capabilities taken away from the container. | All |
| **Capabilities Add** | The capabilities given back to it. | — |
| **Image** | Another image than the one built by the platform. | — |
| **Image Pull Policy** | When the image is fetched again. | — |

## Behavior and limits

- Applying this setting restarts the integration; it does not rebuild its image.
- An integration needs no capability: give one back only when a library requires it.

## See also

- [Integrations](/runtime/integrations) — every setting at a glance

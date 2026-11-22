---
title: Mounted Files
sidebar_position: 2
---

Mount the files of a stored configuration inside an integration, at the place you choose.

## How it works

The setting mounts stored files — a mapping, a catalog, a stylesheet, a certificate bundle — at a path inside the integration, read-only. Routes read them like local files, and the content is changed in Secret Manager without rebuilding.

:::info[Same path in every environment]
Mount each environment's file at the same path so that the route does not change between them.
:::

## Prerequisites

- An [integration](/runtime/integrations), created and bound to an environment.
- A [Resources File](/config-sources/templates#resources-file) configuration holding the files, available in the environment.

## Procedure

{/* screenshot: runtime-settings-resources */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **Resources**.
3. In **Files**, choose the configuration, add it, then set the place it is mounted at, such as `/etc/orders`.
4. Choose **Apply changes**.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Files** | The configurations mounted as files, each at its own place. | — |

## Verification

```text title="A configuration holding catalog.json, mounted at /etc/orders"
/etc/orders/catalog.json
```

## Behavior and limits

- Applying this setting restarts the integration; it does not rebuild its image.
- Give each configuration its own place: two configurations cannot be mounted at the same one.
- The files of a configuration are read-only inside the integration.
- What this setting mounts is added to what the other settings mount, whatever the order they were added in.

## See also

- [Integrations](/runtime/integrations) — every setting at a glance
- [Trust a Private Certificate Authority](/runtime/trust-private-certificates)

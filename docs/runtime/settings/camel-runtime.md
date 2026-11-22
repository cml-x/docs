---
title: Camel Runtime Properties
sidebar_position: 6
---

Add properties to the application itself, and choose its runtime.

## Prerequisites

- An [integration](/runtime/integrations), created and bound to an environment.

## Procedure

{/* screenshot: runtime-settings-camel-runtime */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **Camel Runtime**.
3. In **Runtime Properties**, add one property per line, written `key=value`.
4. Choose **Apply changes**.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Runtime Properties** | Properties added to the application, written `key=value`. The ones the platform sets cannot be removed. | — |
| **Runtime Version Override** | Another version of the runtime, when a route needs one. | — |
| **Runtime Provider** | The runtime the integration runs on. | Quarkus |

## Verification

```properties title="Examples of runtime properties"
quarkus.http.limits.max-body-size=20M
camel.main.streamCachingEnabled=true
```

## Behavior and limits

- For your own application settings, prefer a [properties configuration](/runtime/settings/configuration): it is stored once and can differ by environment.
- Changing the runtime version rebuilds the image.

## See also

- [Integrations](/runtime/integrations) — every setting at a glance
- [Change how an integration is built](/runtime/settings/build)

---
title: "Configuration: Property Files"
sidebar_position: 1
---

Load stored properties into an integration, so that its routes read their values from outside the code.

## Prerequisites

- An [integration](/runtime/integrations), created and bound to an environment.
- A [Properties](/config-sources/templates#properties-configuration) or [Secure Properties](/config-sources/templates#secure-properties-configuration) configuration, available in the environment. It can be created from the setting.

## Procedure

{/* screenshot: runtime-settings-configuration */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **Configuration**.
3. In **Property files**, choose the configuration and add it. **New secret** creates one.
4. Turn **Hot Reload** on to reload the integration when the configuration changes.
5. Choose **Apply changes**.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Property files** | The configurations the integration loads as property files. | — |
| **Hot Reload** | Reload the integration when a mounted configuration changes. | Off |

## Verification

```yaml title="Reading a property in a route"
- setBody:
    simple: "{{orders.greeting}}"
```

## Behavior and limits

- Applying this setting restarts the integration; it does not rebuild its image.
- Several configurations can be added: their properties are all available.
- A property defined twice takes the value of the configuration loaded last: give properties distinct names.

## See also

- [Integrations](/runtime/integrations) — every setting at a glance
- [Tutorial: configure it](/tutorial/configure)

---
title: Set Environment Variables
sidebar_position: 3
---

Give an integration environment variables, written in the setting or read from a stored configuration.

## How it works

Environment variables are read by the runtime, by libraries, and by routes through `{{env:NAME}}`. Use them for the few values software expects in that form; prefer property files for the settings of your routes.

:::danger[A variable typed here is stored in clear]
For a secret value, read the variable from a stored configuration instead of typing it.
:::

## Prerequisites

- An [integration](/runtime/integrations), created and bound to an environment.

## Procedure

{/* screenshot: runtime-settings-environment */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **Environment**.
3. In **Environment Variables**, add one variable per line: `NAME=value`, or `NAME=secret:configuration/key` to read a stored value.
4. Choose **Apply changes**.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Environment Variables** | One per line: `NAME=value`, or `NAME=secret:name/key`. | — |
| **Inject Container Metadata** | Give the integration its namespace and instance name, as `NAMESPACE` and `POD_NAME`. | On |
| **Propagate HTTP Proxy** | Pass the proxy settings of the environment on to the integration. | On |

## Verification

```yaml title="Reading a variable in a route"
- setBody:
    simple: "${env:ORDERS_REGION}"
```

## Behavior and limits

- Applying this setting restarts the integration; it does not rebuild its image.
- A value written in the setting is visible to anyone who can see the integration: read sensitive values from a stored configuration.

## See also

- [Integrations](/runtime/integrations) — every setting at a glance
- [Give an integration properties](/runtime/settings/configuration)

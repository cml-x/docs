---
title: Lua Filter
sidebar_position: 12
---

Run a script on each request and each response: read and change headers, inspect the content, or call another service.

## How it works

When no built-in rule fits, a Lua script runs in the gateway on each request and response. It can read and change headers, log, or reject a request. It runs in the request path, so every millisecond it takes is added to every call.

:::warning[Last resort]
Use a built-in rule whenever one exists: it is validated, documented and observable. A script is code you must maintain.
:::

Every parameter and its default: [reference](/api-manager/reference/lua-policy).

## Use cases

For a small adjustment that no rule covers. Anything substantial belongs in an integration.

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.

## Procedure

{/* screenshot: api-manager-policy-tasks-custom-lua */}

1. In **API Manager**, go to **API Instances** and open the API.
2. Open its **Custom Policy** tab and activate the custom policy. A gateway or an API carries one.
3. In **Script**, choose **Written here** and type the script, or **A stored script** and choose a [Lua Script](/config-sources/templates#lua-script) configuration shared between policies.
4. Deploy.

To change a script written in the policy later, use **Open the script** on that tab, edit it in
the window, close it, then choose **Save changes** in the banner that appears, and deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Script** | Written in the policy, or taken from a stored script. | Written here |
| **Stored Script** | The stored script the policy runs. | — |
| **Lua Script** | The script. It defines `envoy_on_request`, `envoy_on_response`, or both. | An example |

## Verification

```lua title="A script that adds a header to every request"
function envoy_on_request(request_handle)
  request_handle:headers():add("x-checked-by", "gateway")
end
```

## Behavior and limits

- A script that fails is logged and the request goes on: do not rely on a script alone to refuse access.
- Store a script once when several policies use it: changing it then changes them all.

## See also

- [Policies](/api-manager/policies) — every rule at a glance
- [Templates: Lua Script](/config-sources/templates#lua-script)

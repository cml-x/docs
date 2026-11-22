---
title: Lua Policy
sidebar_position: 4
---

Reference of the custom policy: a Lua script run by the gateway on each request and each
response. It is deployed as an Envoy Gateway `EnvoyExtensionPolicy`.

## Target

| Field | Values | Meaning |
|---|---|---|
| `targetRef.kind` | `HTTPRoute`, `Gateway`, `GRPCRoute` | An API instance, or a whole gateway |
| `targetRef.name` | Name | The API instance or the gateway |
| `targetRef.sectionName` | Name, optional | One access point of a gateway |

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| `scriptSource` | `Inline` | `Inline`: written in the policy. `Stored`: a Lua Script configuration |
| `script` | An example script | The script, when inline |
| `storedScript` | — | The stored script, when `scriptSource` is `Stored` |

## Entry points

```lua title="Script"
function envoy_on_request(request_handle)
  request_handle:headers():add("x-request-source", "gateway")
end

function envoy_on_response(response_handle)
  local status = response_handle:headers():get(":status")
  response_handle:logInfo("status " .. status)
end
```

| Function | Called | Typical use |
|---|---|---|
| `envoy_on_request` | Before the request is sent to the backend | Add or check headers, reject early |
| `envoy_on_response` | Before the response is sent to the client | Add headers, log |

## Behavior and limits

- The script runs in the request path of the gateway: keep it short and free of blocking calls.
- A runtime error in the script fails the request.
- A stored script is shared by every policy that references it: a change reaches all of them.

:::warning Prefer a built-in rule when one exists
Header changes, URL rewrite, authentication and rate limiting have dedicated rules that are
validated and observable. Keep Lua for what none of them covers.
:::

Procedure: [Lua filter](/api-manager/policy-tasks/custom-lua).

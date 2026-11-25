---
title: Route Filter Reference
sidebar_position: 5
---

Reference of the settings attached to one API instance — header modification and URL rewrite —
and of the TLS settings of a gateway towards its backends.

## Request header modification

A `RequestHeaderModifier` filter on the route. Response headers have the same three parameters,
applied to the response.

| Parameter | Meaning |
|---|---|
| `add` | Headers appended, even when the header already exists |
| `set` | Headers set, replacing an existing value |
| `remove` | Header names removed before forwarding |

:::tip[Strip what the backend must not trust]
Remove from incoming requests the headers your backend treats as identity — `x-user-id`,
`x-client-id` — then let the authentication rule set them.
:::

Procedure: [Header modification](/api-manager/policy-tasks/headers).

## URL rewrite

A `URLRewrite` filter on the route.

| Parameter | Default | Meaning |
|---|---|---|
| `hostname` | — | Host name set on the forwarded request, such as `backend.internal` |
| `path` | — | The new path |
| `pathType` | `ReplaceFullPath` | `ReplaceFullPath`: the whole path. `ReplacePrefixMatch`: only the matched prefix |

| Request | `pathType` | `path` | Forwarded |
|---|---|---|---|
| `/v1/orders/42` | `ReplacePrefixMatch` on `/v1` | `/` | `/orders/42` |
| `/v1/orders/42` | `ReplaceFullPath` | `/orders` | `/orders` |

Procedure: [URL rewrite](/api-manager/policy-tasks/url-rewrite).

## Backend TLS

A setting of the **gateway**: how it connects to backends that expect TLS.

| Parameter | Default | Meaning |
|---|---|---|
| `minVersion` | `1.2` | Lowest TLS version towards backends |
| `maxVersion` | `1.3` | Highest TLS version towards backends |
| `clientCertificate` | — | A TLS Certificate configuration the gateway presents, for mutual TLS |

:::info[One client certificate per gateway]
The client certificate is set on the gateway and presented to every backend that asks for one.
Backends that require different client identities need different gateways.
:::

Procedure: [Backend TLS](/api-manager/policy-tasks/backend-tls).

---
title: API Security
sidebar_position: 2
---

The controls available on an exposed API, layer by layer, and which threat each one addresses.

## Layers

A request crosses several controls before it reaches your service. Each layer stops a different kind of problem; none replaces the others.

| Layer | Control | Where |
|---|---|---|
| Network reachability | Exposure mode of the gateway: Public, Private, Internal | [API Gateways](/api-manager/gateway) |
| Transport | TLS on the access point; versions and ciphers | [Client Traffic Policy](/api-manager/reference/client-traffic-policy) |
| Source | IP allowlist and denylist | [Security Policy](/api-manager/reference/security-policy#ip-allowlist-and-denylist) |
| Identity | JWT, OIDC, API key, Basic | [Security Policy](/api-manager/reference/security-policy) |
| Decision | Audience check, external authorization | [Security Policy](/api-manager/reference/security-policy#external-authorization) |
| Abuse and overload | Rate limit, connection limit, circuit breaker | [Backend Traffic Policy](/api-manager/reference/backend-traffic-policy) |
| Backend link | TLS and mutual TLS towards the backend | [Route Filters](/api-manager/reference/route-filters#backend-tls) |
| Environment | Network policies between workloads | [Network Policies](/infra/network) |

## Threats and controls

Read this table from the threat you are worried about to the control that addresses it.

| Threat | Control |
|---|---|
| Anonymous access | An authentication rule on the API |
| Token issued for another API replayed here | JWT audience check |
| Leaked API key | Rotation of the key list; header transport with `sanitize` |
| Credential stuffing, scraping | Rate limit; IP rules |
| Slow clients exhausting connections | `requestReceivedTimeout`, `maxConnections` |
| Downgrade to weak TLS | `tlsMinVersion` |
| Backend bypassing the gateway | Network policies: ingress to the integration from the gateway only |
| Header spoofing of identity | Remove identity headers on the way in |
| Cascading failure of a slow backend | Timeout, circuit breaker |

:::danger[An API without a security policy is open]
A new API instance has no authentication. On a **Public** gateway it is reachable by anyone as
soon as it is created. Add its security policy before publishing the host name.
:::

## Baseline for a production API

1. HTTPS access point, TLS 1.2 minimum.
2. JWT authentication with the audience check — or OIDC for browser users.
3. Rate limit and request timeout.
4. Identity headers removed on the way in.
5. Ingress to the backend restricted to the gateway.

:::info[Policy precedence]
A security policy on an API instance replaces the gateway's for that API — see
[Policies](/api-manager/policies#policy-targets-gateway-or-api-instance).
:::

## Secrets used by security rules

Keys, user lists and client credentials are stored configurations. Several are kept as
fingerprints only and cannot be read back — see
[Configuration templates](/config-sources/templates).

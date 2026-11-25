---
title: Security Policy Reference
sidebar_position: 1
---

Reference of the security policy and of each of its rules. A security policy is deployed as an
Envoy Gateway `SecurityPolicy`.

## Policy Target

| Field | Values | Meaning |
|---|---|---|
| `targetRef.kind` | `HTTPRoute`, `Gateway`, `GRPCRoute` | An API instance, or a whole gateway |
| `targetRef.name` | Name | The API instance or the gateway |
| `targetRef.sectionName` | Name, optional | One access point of a gateway |

## JWT authentication

**Why.** Authenticate applications without a session: each request carries a signed token that
the gateway verifies locally, with the public keys of the issuer.

| Parameter | Default | Meaning |
|---|---|---|
| `source` | `provider` | `auth-gateway`: tokens issued by an auth gateway of the platform. `provider`: another issuer |
| `authGateway.name`, `hostname`, `port` | port `443` | The auth gateway. Its address gives the issuer and the JWKS URL |
| `providerName` | — | A short name for an external issuer |
| `issuer` | — | Expected `iss` claim. Must match exactly |
| `jwksUri` | — | Where the signing keys are published |
| `checkAudience` | Off | Refuse a token not issued for this API |
| `apiAudience` | — | The audience ID of the API. First value a token is checked against |
| `audiences` | — | Other accepted `aud` values |

**Consequences.**

- A request without a valid token receives `401`; nobody is redirected.
- Validity covers signature, issuer and expiry. Without `checkAudience`, a token issued for
  another API of the same issuer is accepted.

:::warning[Turn the audience check on]
An issuer shared by several APIs makes every token valid everywhere unless the audience is
checked. Leave it off only while migrating clients.
:::

Procedure: [JWT authentication](/api-manager/policy-tasks/jwt).

## OIDC authentication

**Why.** Sign people in from a browser: the gateway runs the authorization code flow with your
identity provider and keeps a session cookie.

| Parameter | Default | Meaning |
|---|---|---|
| `issuer` | Required | Address of the identity provider |
| `clientSecretName` | Required | Stored Client Credentials: client ID and secret |
| `clientID` | From the stored credentials | Overrides the client ID |
| `redirectURL` | Required | Callback registered at the provider. HTTPS |
| `logoutPath` | — | Path that ends the session, such as `/logout` |
| `cookieDomain` | Host of the API | `.example.com` shares the session across subdomains |
| `scopes` | — | Scopes requested, such as `openid`, `profile`, `email` |
| `jwksUri`, `jwksBackendName`, `jwksBackendPort` | port `443` | Signing keys, and a relay service when the URL is not directly reachable |
| `authorizationEndpoint`, `tokenEndpoint` | Discovered | Overrides of the discovery document |

**Consequences.**

- An unauthenticated request is answered with a redirect, not `401`: unsuitable for API clients
  that do not follow browser flows.
- The redirect URL must match the provider registration character for character.

Procedure: [OIDC authentication](/auth/configure-oidc).

## API key authentication

**Why.** The simplest credential for a few known callers and for tools that cannot run OAuth.

| Parameter | Default | Meaning |
|---|---|---|
| `credentialSecretName` | Required | Stored API Keys list |
| `headerName` | — | Header carrying the key, such as `x-api-key` |
| `queryParamName` | — | Query parameter carrying the key |
| `cookieName` | — | Cookie carrying the key |
| `forwardClientIDHeader` | — | Header in which the identity of the caller is passed to the backend |
| `sanitize` | Off | Remove the key from the request before forwarding |

:::tip[Prefer the header, and sanitize]
A key in a query parameter ends up in access logs and browser history. Carry it in a header and
turn `sanitize` on so that the backend never sees it.
:::

**Consequences.** A key does not expire and identifies an application, not a user: rotate by
adding the new key, moving callers, then removing the old one.

Procedure: [API key authentication](/api-manager/policy-tasks/api-key).

## HTTP Basic authentication

**Why.** A user name and password checked by the gateway: supported by every HTTP client and every browser, with no token service to run. Suitable for internal tools and legacy callers.

| Parameter | Default | Meaning |
|---|---|---|
| `usersSecretName` | Required | Stored Basic Auth Users: user names and hashed passwords |
| `forwardUsernameHeader` | — | Header in which the verified user name is passed to the backend |

**Consequences.** Credentials travel with every request: use it on HTTPS access points only. A
browser shows its native prompt.

Procedure: [HTTP Basic authentication](/api-manager/policy-tasks/basic-auth).

## CORS Fields

**Why.** Let pages served from another origin call the API from a browser.

| Parameter | Default | Meaning |
|---|---|---|
| `allowOrigins` | `*` | Origins allowed, such as `https://app.example.com` |
| `allowMethods` | `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS` | Methods allowed |
| `allowHeaders` | `Content-Type`, `Authorization` | Request headers allowed |
| `exposeHeaders` | — | Response headers the page may read |
| `maxAge` | `3600s` | How long a browser caches the preflight answer |
| `allowCredentials` | Off | Allow cookies and `Authorization` on cross-origin requests |

:::warning[Wildcard origin and credentials]
Browsers refuse `allowCredentials` together with the origin `*`. List the origins explicitly
when credentials are allowed.
:::

Procedure: [CORS](/api-manager/policy-tasks/cors).

## IP allowlist and denylist

**Why.** Restrict an API to known networks — your offices, a partner — or block addresses that misbehave. It is a coarse filter, best combined with authentication.

| Parameter | Default | Meaning |
|---|---|---|
| `defaultAction` | `Deny` | What happens when no rule matches |
| `rules[].action` | `Allow` | `Allow` or `Deny` |
| `rules[].cidrs` | — | Addresses or ranges in CIDR notation: `10.0.0.0/8`, `203.0.113.42/32` |

Rules are evaluated in order; the first match wins. `defaultAction: Deny` with `Allow` rules is an
allowlist; `defaultAction: Allow` with `Deny` rules is a denylist.

:::info[Which address is evaluated]
The address is the one the gateway sees. Behind a proxy or a CDN, that is the address of the
proxy unless the original address is preserved up to the gateway.
:::

Procedure: [IP allowlist and denylist](/api-manager/policy-tasks/ip-rules).

## External authorization

**Why.** Decide with your own service: contract status, time of day, fraud score.

| Parameter | Default | Meaning |
|---|---|---|
| `protocol` | `HTTP` | `HTTP` or `GRPC` |
| `service.kind` | `Service` | `Service`: a service of the platform. `Backend`: an upstream |
| `service.name` | Required | The service or the upstream |
| `service.port` | `80` | Port of a service. An upstream carries its own |
| `failOpen` | Off | Let requests through when the authorization service is unavailable |

**Consequences.** Every request waits for the authorization service: its latency is added to
every call, and its availability becomes that of the API.

:::danger[failOpen removes the protection during an outage]
With `failOpen` on, an unavailable authorization service means **no check at all**. Keep it off
unless availability matters more than access control for that API.
:::

Procedure: [External authorization](/api-manager/policy-tasks/external-auth).

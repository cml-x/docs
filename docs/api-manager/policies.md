---
title: Policy Model and Attachment
sidebar_position: 6
---

A policy changes how the gateway treats traffic without touching the service behind it:
who may call, how much, how long the gateway waits, what happens when the backend fails.

## Why policies sit at the gateway

- **One enforcement point.** A rule holds for every instance of the service, whatever its
  language or version.
- **Rejected early.** An unauthenticated or throttled request never reaches the integration and
  costs it nothing.
- **Changed without a build.** A policy is applied in seconds; the integration is neither rebuilt
  nor restarted.

## Policy families

Policies are grouped by the side of the gateway they act on. Knowing the family tells you where a rule is configured and what it can affect.

| Family | Controls | Rules | Reference |
|---|---|---|---|
| **Security policy** | Who may call | JWT, OIDC, API key, Basic, CORS, IP rules, external authorization | [Security Policy](/api-manager/reference/security-policy) |
| **Backend traffic policy** | How the gateway talks to the backend | Rate limit, timeouts, retries, circuit breaker, load balancing | [Backend Traffic Policy](/api-manager/reference/backend-traffic-policy) |
| **Client traffic policy** | How clients connect to the gateway | Connection limit, timeouts, TLS versions and ciphers | [Client Traffic Policy](/api-manager/reference/client-traffic-policy) |
| **Custom policy** | Anything else, in Lua | Script on request and response | [Lua Policy](/api-manager/reference/lua-policy) |
| Route filters | The request and response of one API | Headers, URL rewrite | [Route Filters](/api-manager/reference/route-filters) |

## Policy targets: gateway or API instance

{/* screenshot: api-policies-overview */}

A policy has a **target**: a whole gateway — it then covers every API on it — or one
[API instance](/api-manager/api-instances).

| Target | Use it for |
|---|---|
| Gateway | A baseline every API must meet: TLS versions, a global connection limit, an IP allowlist |
| API instance | What is specific to one API: its authentication, its rate limit, its timeouts |

### Where a policy lives

A policy is not a separate object to manage: it is deployed **with** the gateway or the API
instance it protects.

- It is added to the same application as its target, as one more component. In an API group,
  each API instance carries its own policies beside it.
- It is named after its target and its family, for example `orders-api-security-policy`.
- It depends on its target: the target is deployed first, and the policy is applied once the
  target is ready.
- Applying the gateway or the API group applies its policies; deleting it removes them.

A gateway and an API instance are created with their policies already beside them, empty:

| Created | Policies it starts with |
|---|---|
| Gateway | Security, backend traffic, client traffic |
| API instance, on its own or in an API group | Security, backend traffic |

An empty policy enforces nothing; it is there so that a rule can be added to it without creating
anything first.

| Policy | Number per gateway or API | Can be removed |
|---|---|---|
| Security | One, created with its target | No: remove its rules instead |
| Backend traffic | One, created with its target | No: remove its rules instead |
| Client traffic (gateways only) | One, created with the gateway | Yes |
| Custom | One, none by default | Yes |

A gateway or an API carries **at most one custom policy**, named after its target, for example
`orders-api-custom-policy`. Once it is activated, its tab shows where the script comes from and
how long it is, not the script itself: **Open the script** shows it in an editor. Once it is
changed there, a banner on the page says so and offers **Save changes**, which updates the policy
itself, for every environment, and takes effect at the next **Apply**.

Adding a rule to a policy, activating one or deactivating one changes the application of its
target, and takes effect at the next **Apply**.

:::warning[A policy on an API replaces the gateway's, it does not add to it]
When a policy of the same family targets both a gateway and one of its API instances, the API
instance uses **its own policy only**. A JWT rule set on the gateway is no longer enforced on an
API that has its own security policy without that rule: repeat in the API's policy what must
still hold.
:::

## How rules combine inside a policy

One policy holds several rules. How they combine differs per family.

| Family | Combination |
|---|---|
| Security policy | Every rule present must pass. CORS answers preflights before authentication |
| Backend traffic policy | Each rule covers its own aspect; they do not conflict |
| Client traffic policy | One set of connection and TLS settings per target |

:::tip[Start with three rules]
For an API open to applications: **JWT authentication** with the audience check, a **rate limit**,
and a **request timeout** below the timeout of your callers. Add retries only for idempotent
operations.
:::

## Consequences to anticipate

Every rule changes what some callers receive. Decide on these effects before turning a rule on in production, and tell the teams that call the API.

| Rule | Effect on callers | Watch |
|---|---|---|
| Authentication | `401` without valid credentials | Preflight `OPTIONS` requests carry none: add CORS |
| Rate limit | `429` beyond the limit | The limit is counted per gateway instance |
| Timeout | `504` when the backend is slower | Long-running calls, streaming, uploads |
| Retries | The backend may receive the same request several times | Non-idempotent operations |
| Circuit breaker | `503` beyond the caps | Caps too low for peak traffic |

## Configurations referenced by policies

Several rules read a list or a credential stored once in **Secret Manager**:

| Rule | Template |
|---|---|
| API key authentication | [API Keys](/config-sources/templates#api-keys) |
| HTTP Basic authentication | [Basic Auth Users](/config-sources/templates#basic-auth-users) |
| OIDC authentication | [Client Credentials](/config-sources/templates#client-credentials) |
| Lua policy, stored script | [Lua Script](/config-sources/templates#lua-script) |
| Backend TLS, client certificate | [TLS Certificate](/config-sources/templates#tls-certificate) |

:::info[Make the configuration available first]
A configuration can only be chosen in an environment it was made available to. The selectors of
the policy forms offer to do it in place.
:::

## Related Procedures

One page per rule, with its procedure and verification: [Policy tasks](/api-manager/policy-tasks).

---
title: Authentication vs Authorization
sidebar_position: 1
---

Two questions, asked at two different places: **who is calling** (authentication) and **what
may they do** (authorization). The platform answers them separately for the console and for the
APIs you expose.

## Console access

This is about the people and programs that **manage** the platform.

| | Authentication | Authorization |
|---|---|---|
| Question | Who is signing in? | What may they manage? |
| Mechanism | Sign-in, optionally through an [identity provider](/access/identity-providers), with a [second factor](/access/mfa-policy) | [Roles](/access/rbac-principles) granted on projects, optionally restricted to environments |
| Managed in | Access Manager: Users, Identity Providers, MFA Policy, Settings | Access Manager: RBAC |
| For programs | [Service accounts](/access/connected-apps) | The same roles |

## Exposed APIs

This is about the applications and people that **call** the APIs you publish.

| | Authentication | Authorization |
|---|---|---|
| Question | Which application or person is calling the API? | Is this call allowed? |
| Mechanism | A [security policy](/api-manager/reference/security-policy) rule: JWT, OIDC, API key, Basic | Audience check, IP rules, [external authorization](/api-manager/policy-tasks/external-auth) |
| Credentials issued by | An [auth gateway](/auth/auth-gateway) to registered [clients](/auth/client-lists), or your identity provider | — |
| Enforced by | The gateway, before the request reaches the service | The gateway; then the service for business rules |

:::warning[Two independent systems]
A role in Access Manager gives no right to **call** an API, and a token for an API gives no
right to **manage** anything in the console. A developer who manages an API still needs a client
to call it.
:::

## What the JWT rule verifies

The gateway checks that a token is genuine and meant for this API. It does not interpret what the token says about the caller.

| Verified by the gateway | Left to you |
|---|---|
| Signature, against the keys of the issuer | Scopes and custom claims |
| Issuer (`iss`) and expiry (`exp`) | Per-resource rules: "this customer, this order" |
| Audience (`aud`), when the check is on | — |

For decisions on other claims, use external authorization, or check them in the route.

:::tip[Pass identity to the backend in a header]
The API key and Basic rules can forward the identity of the caller in a header. Remove that
header from incoming requests first — see [Route filters](/api-manager/reference/route-filters).
:::

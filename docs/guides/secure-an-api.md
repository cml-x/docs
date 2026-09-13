---
title: Secure an API
sidebar_position: 4
---

Security-first version of [Expose an API](/guides/expose-an-api): set up the identity provider and
access rules before anyone can reach the API.

```
Auth Manager                Access Manager              API Manager           Application
identity provider           users, roles, permissions   security policy       uses the tokens
```

## 1. Stand up the identity provider, in Authentication Manager

1. Create an [Auth Gateway](/auth/getting-start) — a Kanidm-backed OAuth2/OIDC identity provider —
   in the same environment as your API.
2. Register a **Client App** against it (public or confidential) for whatever will request tokens
   on behalf of API callers, or a **Service Account** for machine-to-machine access. See
   [Configure OIDC](/auth/configure-oidc).

## 2. Define who has access, in Access Manager

- Create the [users](/access/create-user) who need access, or confirm they already exist.
- Grant them [project-scoped authorizations](/access/assign-roles-and-permissions) if they need to
  manage the API itself, separately from anyone who will only *call* it with a token.
- If the organization requires it, review [MFA Policy](/access/mfa-policy) and
  [organization access settings](/access/configure-organization-access).

## 3. Protect the API, in API Manager

Attach a security policy to the gateway or the API Instance — see
[Protect an API with JWT](/auth/protect-api-with-jwt) for the concrete steps. JWT, OIDC, API key
and basic auth are all confirmed policy types under API Manager's Security family.

## 4. Use the mechanism from the calling application

The calling application authenticates against the Auth Gateway using the Client App or Service
Account credentials from step 1, obtains a token, and sends it with each request to the API. The
exact request/response shape (headers, token format specifics) is
**[À CONFIRMER]** — verify against your Auth Gateway's live OIDC endpoints.

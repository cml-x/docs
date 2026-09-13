---
title: Protect an API with JWT
sidebar_position: 3
---

Securing an API combines two apps: **Authentication Manager** issues tokens, **API Manager**
checks them at the gateway.

## Steps

1. In [Authentication Manager](/auth/getting-start), create (or reuse) an **Auth Gateway** — a
   Kanidm-backed OAuth2/OIDC identity provider.
2. Register a **Client App** against that gateway (public or confidential, with its redirect
   origin) for whatever will request tokens on behalf of API consumers.
3. In [API Manager](/api-manager/getting-start), open your API Instance (or gateway) and attach a
   **JWT auth** security policy — one of the policy types confirmed under API Manager's Security
   family, alongside OIDC auth, API key auth, basic auth, CORS, IP allow/deny and external auth.

## Result

Requests to the API must now present a valid JWT issued by your Auth Gateway; requests without one
are rejected at the gateway before reaching your backend.

The exact policy configuration fields (claims to validate, issuer, audience) are
**[À CONFIRMER]** — verify in the API Manager UI for your environment.

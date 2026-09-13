---
title: Authentication Manager
sidebar_position: 5
---

### Token invalid

- **Possible cause** — the Client App or Service Account that requested the token doesn't match
  what the relying party (an API policy, or an application) expects, or the Auth Gateway itself
  isn't fully healthy.
- **Check** — on the [Auth Gateway](/auth/auth-gateway)'s page, check its live health: identity
  provider readiness, replica status, and admin-credential availability.
- **Fix** — if the gateway itself is unhealthy, that takes priority — fix it first. Otherwise,
  confirm the Client App's redirect origin and public/confidential type match what the caller uses.

### OIDC/JWT problem

- **Possible cause** — the Auth Gateway isn't reachable from where the check happens, or the
  Client App/Service Account configuration doesn't match the request.
- **Check** — confirm the gateway is exposed the way the caller expects (internal, via an API
  Gateway route, or via a public Load Balancer) and reachable from there.
- **Fix** — adjust the gateway's exposure or the Client App's redirect origin as needed. Specific
  OIDC discovery/JWT validation error messages are **[À CONFIRMER]** — read them directly from the
  Auth Gateway's live endpoints.

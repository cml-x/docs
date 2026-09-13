---
title: API Security in Camel X
sidebar_position: 2
---

[API Manager](/api-manager/getting-start) secures traffic through **policies** — reusable rules
attached to a gateway, an API Instance, or an upstream. They're grouped into four confirmed
families.

## Security policies

Control who and what can call the API:

- **JWT auth** — validate a bearer JWT, typically issued by an [Auth Gateway](/auth/getting-start).
- **OIDC auth** — validate against an OpenID Connect provider.
- **API key auth** — require a static API key.
- **Basic auth** — username/password over the request.
- **CORS** — control which origins can call the API from a browser.
- **IP allow/deny** — restrict callers by IP.
- **External auth** — delegate the authentication decision to an external service.

See [Protect an API with JWT](/auth/protect-api-with-jwt) for the concrete setup steps.

## Backend traffic policies

Protect the backend the API routes to: rate limiting, circuit breaker, retry, timeout, load
balancing, resilience.

## Client traffic policies

Shape traffic on the client-facing side of the gateway.

## Custom policies

Free-form policy definitions for anything not covered by the built-in families.

## Transport security

Attach a custom [Domain](/api-manager/domains) to a project to serve the API on your own hostname,
with TLS certificates issued automatically (Let's Encrypt via a Route53 cluster issuer) — no
manual certificate management.

## Where policies attach

Security, backend traffic, and client traffic policies can all be attached at the **gateway**
level (affecting every API Instance on it), the **API Instance** level (one route only), or an
**upstream** (one external backend). Attaching the same kind of policy at more than one level and
how conflicts resolve is **[À CONFIRMER]**.

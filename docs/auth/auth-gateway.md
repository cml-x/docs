---
title: Auth Gateways
sidebar_position: 2
---

An **Auth Gateway** is a Kanidm identity-provider instance — the top-level resource everything else
in this app is scoped to.

![Auth Flow](/img/auth/auth-flow.svg)

## Managing a gateway

- **Live health** — identity-provider readiness, replica status, and admin-credential
  availability, with a one-click reveal of the generated admin secret.
- **Client Apps** — register OAuth2/OIDC applications (public or confidential) with their redirect
  origin, so external apps can authenticate through the gateway.
- **Service Accounts** — machine identities for programmatic (M2M) access to the gateway.
- **Users** and **Groups** — manage person accounts and group membership directly inside the
  gateway.
- Inspect the underlying **Kubernetes Service** — cluster IP, and external IP for load-balanced
  gateways.

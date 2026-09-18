---
title: Configure OIDC
sidebar_position: 4
---

Every [Auth Gateway](/auth/auth-gateway) is itself an OAuth2/OIDC identity provider. Configuring
OIDC access for an application or API means registering that consumer as a **Client App** against
the gateway.

![OIDC Flow](/img/auth/oidc-flow.svg)

## Steps

1. Open the Auth Gateway in [Authentication Manager](/auth/getting-start).
2. Register a Client App:
   - Choose **public** (for browser/mobile apps that can't hold a secret) or **confidential** (for
     backend services that can).
   - Set its redirect origin — where the gateway sends the user back after sign-in.
3. Use the resulting client against the gateway's OIDC endpoints from your application or API.

## Machine-to-machine access

For programmatic access instead of an interactive login flow, create a **Service Account** on the
gateway rather than a Client App.

Discovery endpoint URLs and other OIDC-specific parameters are **[À CONFIRMER]** — read them
directly from the running Auth Gateway.

---
title: Getting Started
sidebar_position: 1
---

API Manager is where integration flows built on the platform are exposed, routed and secured as
APIs. It sits on top of the Kubernetes Gateway API (Envoy-based gateways) — no hand-written Gateway
API YAML required.

## Publish your first API

1. Create a [Gateway](/api-manager/gateway) — an Envoy-based entry point (internal, external, or
   public) bound to an environment.
2. Run the guided publishing wizard: **Name** → **Gateway & Backend** (pick the gateway, add one or
   more weighted Kubernetes Service backends) → **Hostname & Rules** (hostname and path-prefix
   matching). This produces an [API Instance](/api-manager/api-instances).
3. Optionally attach a custom [Domain](/api-manager/domains) for automated TLS.

## Secure it

Traffic and security **policies** (JWT/OIDC/API-key auth, CORS, rate limiting, retries, circuit
breaking, and more) can be layered onto gateways, API instances or upstreams once your first API is
live — see [Protect an API with JWT](/auth/protect-api-with-jwt) for the concrete steps.

## How this fits with Auth Manager and Access Manager

- **API Manager** exposes the route and enforces the policy at the gateway.
- **[Authentication Manager](/auth/getting-start)** is where the identity provider that issues the
  tokens those policies check actually lives.
- **[Access Manager](/access/users)** controls which Camel X users can manage this API and its
  gateway in the first place — a separate concern from who can *call* the API at runtime.

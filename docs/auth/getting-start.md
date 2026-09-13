---
title: Getting Started
sidebar_position: 1
---

Authentication Manager provisions and operates **Kanidm**-backed identity gateway instances — each
one a self-contained OAuth2/OIDC identity provider that other platform services and external
client applications authenticate against.

## Create your first auth gateway

1. Give it a name, alias, description and [environment](/infra/environments) binding. It's
   provisioned as a Kanidm instance via the `kaniop.rs` Kubernetes operator.
2. Choose how to expose it: **internally**, through a public **API Gateway** route, or through a
   public **Load Balancer** — with an optional custom domain and TLS secret.

Once running, see [Auth Gateways](/auth/auth-gateway) to register client applications, service
accounts, users and groups against it.

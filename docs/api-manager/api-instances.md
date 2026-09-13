---
title: API Instances
sidebar_position: 3
---

An **API Instance** is a published route bound to a [gateway](/api-manager/gateway), with path
matching and one or more weighted backends.

## Publishing wizard

1. **Name** the API instance.
2. **Gateway & Backend** — pick the gateway to publish on, then add one or more Kubernetes Service
   backends, each with a traffic weight (for canary/blue-green style splits).
3. **Hostname & Rules** — set the hostname and a path-prefix matching rule.

## Supported protocols

API Instances can be **HTTP**, **gRPC**, **TLS-passthrough**, or raw **TCP** routes (backed by
Gateway API's `HTTPRoute` / `GRPCRoute` / `TLSRoute` / `TCPRoute` resources) — pick whichever
matches the backend you're exposing.

Backends aren't limited to in-cluster Services either — register an external target as an
**Upstream** if the API needs to route outside the cluster.

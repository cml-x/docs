---
title: API Gateways
sidebar_position: 2
---

A **Gateway** is an Envoy-based entry point for traffic, scoped to one [environment](/infra/environments).

## Creating a gateway

- Choose a service type: **internal**, **external**, or **public**.
- Every gateway ships its own **OpenTelemetry pipeline** for access logs, traces and metrics —
  visible from [Monitoring](/monitoring/getting-start).

## What routes through a gateway

Once a gateway exists, you publish [API Instances](/api-manager/api-instances) on top of it —
HTTP, gRPC, TLS-passthrough or raw TCP routes, each with their own hostname and backend rules. You
can also attach traffic and security **policies** (JWT/OIDC auth, CORS, rate limiting, circuit
breaking, retries, load balancing) directly to a gateway.

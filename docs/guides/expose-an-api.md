---
title: Expose an API
sidebar_position: 3
---

Turning a running integration into a callable API touches four apps.

```
Runtime Manager        API Manager             Auth Manager        Access Manager      Monitoring
running service    →   Gateway + API Instance  identity provider   who can manage it   observe
```

## 1. Have a running service, in Runtime Manager

The backend an API routes to is a Kubernetes Service — typically the one created for a Camel
Integration or other network-facing component inside a [Capsule](/runtime/capsule) once it's
deployed and running. Confirm it's healthy on the Capsule's page in
[Runtime Manager](/runtime/getting-start) before exposing it.

## 2. Expose it, in API Manager

1. Create a [Gateway](/api-manager/gateway) bound to the same environment, if you don't already
   have one.
2. Run the API publishing wizard. On the **Gateway & Backend** step, the backend picker calls the
   project's live Kubernetes Services list — your Capsule's service should appear directly in the
   dropdown, with its ports pre-filled. Pick it and set a traffic weight.
3. On **Hostname & Rules**, set the hostname and path-prefix the API will be reachable on.

This produces an [API Instance](/api-manager/api-instances) — see that page for the supported
protocols (HTTP, gRPC, TLS-passthrough, TCP).

## 3. Secure it

See [Secure an API](/guides/secure-an-api) for the full security setup — at minimum, attach a
security policy (JWT, OIDC, API key, or basic auth) from [API Manager](/api-manager/getting-start)
before treating the API as production-ready.

## 4. Control who can manage it, in Access Manager

Grant [project-scoped authorizations](/access/assign-roles-and-permissions) to teammates who
should be able to configure this API, its gateway or its policies. This is separate from who can
*call* the API at runtime, which is governed by the security policy from step 3.

## 5. Observe it, in Monitoring

Every gateway ships its own OpenTelemetry pipeline for access logs, traces and metrics — see
[Monitoring](/monitoring/getting-start) to watch traffic as it happens.

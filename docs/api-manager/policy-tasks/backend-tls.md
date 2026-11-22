---
title: Secure the Connection to a Backend
sidebar_position: 14
---

Choose the TLS versions the gateway uses towards the services it forwards to, and the certificate it presents to a service that requires one.

## When to use it

When a backend requires a recent TLS version, or mutual TLS.

## Before you begin

- A [gateway](/api-manager/gateway) that forwards to a service over TLS, typically an [upstream](/api-manager/upstreams).
- For mutual TLS, a [TLS Certificate](/config-sources/templates#tls-certificate) configuration holding the certificate the gateway presents.

## Procedure

{/* screenshot: api-manager-policy-tasks-backend-tls */}

1. In **API Manager**, open the gateway.
2. Add the setting **Backend TLS**.
3. Choose the **Minimum** and **Maximum TLS Version**.
4. In **Client Certificate**, choose the certificate the gateway presents, or leave it empty when the backend does not ask for one.
5. Deploy.

## Field reference

| Field | What it is | Default |
|---|---|---|
| **Minimum TLS Version** | The lowest TLS version the gateway uses towards backends. | 1.2 |
| **Maximum TLS Version** | The highest TLS version the gateway uses towards backends. | 1.3 |
| **Client Certificate** | The certificate the gateway presents to a backend that requires mutual TLS. | None |

## Good to know

- This is about the connection from the gateway to the backend. The connection from callers to the gateway is set by its access points and its client traffic policy.

## See also

- [Upstreams](/api-manager/upstreams)
- [Control how clients connect](/api-manager/policy-tasks/client-traffic)

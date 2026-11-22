---
title: Backend TLS
sidebar_position: 14
---

Choose the TLS versions the gateway uses towards the services it forwards to, and the certificate it presents to a service that requires one.

## How it works

By default the gateway talks to a backend as the backend is declared. When a backend requires TLS — and possibly a client certificate — this setting says which versions the gateway uses and which certificate it presents. It protects the hop between the gateway and the service, which TLS on the access point does not cover.

:::info[Set on the gateway]
The setting applies to every backend the gateway connects to, not to one API.
:::

Every parameter and its default: [reference](/api-manager/reference/route-filters#backend-tls).

## Use cases

When a backend requires a recent TLS version, or mutual TLS.

## Prerequisites

- A [gateway](/api-manager/gateway) that forwards to a service over TLS, typically an [upstream](/api-manager/upstreams).
- For mutual TLS, a [TLS Certificate](/config-sources/templates#tls-certificate) configuration holding the certificate the gateway presents.

## Procedure

{/* screenshot: api-manager-policy-tasks-backend-tls */}

1. In **API Manager**, open the gateway.
2. Add the setting **Backend TLS**.
3. Choose the **Minimum** and **Maximum TLS Version**.
4. In **Client Certificate**, choose the certificate the gateway presents, or leave it empty when the backend does not ask for one.
5. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Minimum TLS Version** | The lowest TLS version the gateway uses towards backends. | 1.2 |
| **Maximum TLS Version** | The highest TLS version the gateway uses towards backends. | 1.3 |
| **Client Certificate** | The certificate the gateway presents to a backend that requires mutual TLS. | None |

## Behavior and limits

- This is about the connection from the gateway to the backend. The connection from callers to the gateway is set by its access points and its client traffic policy.

## See also

- [Upstreams](/api-manager/upstreams)
- [Control how clients connect](/api-manager/policy-tasks/client-traffic)

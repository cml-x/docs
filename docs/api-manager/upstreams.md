---
title: Upstreams
sidebar_position: 5
---

An **Upstream** declares a service that an [API Instance](/api-manager/api-instances) can route
to when that service is not a plain service of the environment — typically a service outside
the platform.

## Create an upstream

Open **API Manager**, go to **Upstreams**, then create one.

### Target types

| Target | What you give | Example |
|---|---|---|
| **Host name** | One or several public host names, each with its port | `api.partner.com:443` |
| **IP address** | One or several public IP addresses, each with its port | `203.0.113.10:8443` |
| **Platform service** | A service of the platform, chosen by name | — |

### Connection options

| Option | What it does | Default |
|---|---|---|
| **TLS** | The gateway speaks TLS to the upstream. Not asked for a platform service. | On |
| **Application Protocol** | Only when the upstream does not speak HTTP/1.1: HTTP/2 cleartext, WebSocket, or WebSocket over TLS. | — |

:::info What an upstream may point at
An upstream points at public host names and public addresses, or at a service of the platform
chosen by name. Addresses inside the platform cannot be typed in by hand.
:::

## Reference an upstream from an API instance

When creating an API instance, choose the upstream as its **Backend Service**. The upstream comes
with its own ports: none is asked for on the API.

How the gateway negotiates TLS with upstreams — the versions allowed, and the certificate it
presents to an upstream that requires one — is set with the **Backend TLS** setting. The
certificate is a stored configuration of the kind
[TLS Certificate](/config-sources/templates#tls-certificate).

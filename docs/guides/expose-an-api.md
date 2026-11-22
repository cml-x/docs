---
title: Expose an API
sidebar_position: 3
---

Publish a service of an environment on a host name, through a gateway.

## Prerequisites

- A running service: an integration with **Expose HTTP Endpoint** on, or an
  [upstream](/api-manager/upstreams) for a service outside the environment.
- A [domain](/api-manager/domains) attached to the environment, for a public host name.
- For HTTPS, a **TLS Certificate** configuration covering the host name.

## Procedure

1. In **API Manager**, **API Gateways**: create a gateway, or reuse one. Choose its exposure —
   **Public**, **Private** or **Internal** — and add an access point: HTTPS on 443 with the
   certificate.
2. In **API Instances**: create the API. Choose the gateway and the access point, the host name,
   then the backend service and its port.
3. Add policies as needed: [authentication](/guides/secure-an-api),
   [rate limiting](/api-manager/policy-tasks/rate-limit),
   [timeouts](/api-manager/policy-tasks/timeout).

## Listener kind and route kind

| Access point | Route created | TLS |
|---|---|---|
| HTTP | HTTP route | None |
| HTTPS | HTTP route | Terminated at the gateway |
| TLS | TLS route | Passed through to the backend |
| TCP | TCP route | Opaque to the gateway |

## Verification

```bash
curl -i https://orders.example.com/orders
```

Response codes and what they point to: [Request routing](/api-manager/how-requests-are-routed).
A complete example: [tutorial, step 8](/tutorial/expose).

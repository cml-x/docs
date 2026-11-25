---
title: Troubleshoot API Exposure
sidebar_position: 4
---

Start from what the caller receives.

### Host name does not resolve

The caller cannot find an address for the host name: the request never leaves it.

| Cause | Check | Fix |
|---|---|---|
| The DNS record is not published yet | `dig <host>` | Wait for propagation; check the [domain](/api-manager/domains) of the environment |
| The host name is not under a domain of the environment | The host name of the API instance | Use a domain attached to the environment |

### Connection refused or timeout

The name resolves but nothing answers on the port.

| Cause | Check | Fix |
|---|---|---|
| Exposure mode does not match the caller | **Internal** or **Private** gateway called from the internet | Exposure mode of the [gateway](/api-manager/gateway) |
| No access point on that port | The access points of the gateway | Add the access point |

### TLS certificate error

The connection opens but the client rejects the certificate presented by the gateway.

| Cause | Check | Fix |
|---|---|---|
| The certificate does not cover the host name | `openssl s_client -connect <host>:443 -servername <host>` | A certificate whose SAN covers the name |
| Certificate expired | Its `notAfter` date | Replace the TLS Certificate configuration |

### `404` from the gateway

No route matches the host name and path. Check the host name of the API instance, the access
point it is attached to, and the path sent.

### `401` or `403`

A rule of the security policy refused the request. See
[Tokens and sign-in](/troubleshooting/tokens-and-sign-in) for JWT; for an API key, check the header
name and that the key is in the list; for IP rules, the source address seen by the gateway.

### `429`

The [rate limit](/api-manager/policy-tasks/rate-limit) was reached.

### `503`

The gateway found the route but could not hand the request to a backend.

| Cause | Check | Fix |
|---|---|---|
| No ready instance behind the route | The integration in Runtime Manager | See [Builds and deployments](/troubleshooting/runtime-manager) |
| Wrong backend port | The port of the backend reference | The port the service listens on |
| Circuit breaker open | Concurrent requests against its caps | [Circuit breaker](/api-manager/policy-tasks/circuit-breaker) |
| Backend TLS validation fails | Upstream TLS errors | [Backend TLS](/api-manager/policy-tasks/backend-tls) |

### `504`

The backend answered later than the [request timeout](/api-manager/policy-tasks/timeout).
Compare the request duration at the gateway with the processing time of the route.

### CORS preflight refused

The origin, the method or a header is not allowed by the [CORS](/api-manager/policy-tasks/cors)
rule. An `OPTIONS` preflight carries no credentials: it must pass before authentication.

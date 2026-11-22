---
title: Request Routing
sidebar_position: 1.5
---

A request to one of your APIs crosses several objects before it reaches a service. Knowing which
one decides what tells you where to look, and where to change things.

![The path of a request, from the caller to the integration](/img/tutorial/exposure.drawio.png)

## Resource model

Four objects take part in routing a request. Each decides one thing, and each is managed in its own place.

| Object | Decides | You manage it in |
|---|---|---|
| **Gateway** | Who can reach it at all: the internet, your private network, or the platform only | [API Gateways](/api-manager/gateway) |
| **Access point** | The port, the kind of traffic, and — for HTTPS — the certificate | The gateway |
| **API instance** | Which requests are for this API — by host name and path — and which service answers | [API Instances](/api-manager/api-instances) |
| **Policy** | Whether a request may go on, and how the gateway treats it | [Policies](/api-manager/policies) |
| **Service or upstream** | Where the request finally goes | The integration, or [Upstreams](/api-manager/upstreams) |

## Route matching

1. The request arrives on an **access point** of the gateway.
2. Among the API instances published on that access point, the gateway keeps those whose **host
   name** matches the one of the request.
3. Among those, it keeps the one whose **path** matches best: the longest prefix wins.
4. If none matches, the gateway answers `404`.

| Request | API instances published | Goes to |
|---|---|---|
| `orders.example.com/orders/12` | `orders.example.com` | That API |
| `api.example.com/orders/12` | `api.example.com` + `/orders`, `api.example.com` + `/` | The one on `/orders` |
| `other.example.com/` | None for that name | `404` |

## TLS termination and passthrough

Where TLS ends decides who holds the certificate and what the gateway can see. Only when the gateway terminates TLS can it read the request, and therefore route on the path and apply HTTP policies.

| Access point | The gateway | Your service receives |
|---|---|---|
| **HTTPS** | Ends the encryption with its certificate, reads the request | Plain HTTP |
| **TLS** | Does not decrypt: it reads only the name asked for, then forwards | The encrypted connection, which it must decrypt itself |
| **HTTP**, **TCP** | Forwards as it is | What the caller sent |

Policies that read the request — a key, a token, a header — need the gateway to see it: they
apply to HTTP and HTTPS access points, not to TLS or TCP ones.

## Policy evaluation order

A request passes, in this order:

1. the **client traffic** policy of the gateway — connections, TLS version;
2. the **security** rules — is the caller allowed?
3. the **custom** logic, if any;
4. the **backend traffic** rules — rate limit, timeout, retry, load balancing;
5. the service.

A policy attached to an **API instance** takes precedence over the same kind of policy attached
to its **gateway**: the gateway's applies to the APIs that have none of their own.

## DNS and wiring automated by the platform

- A host name that is not a wildcard is **declared in DNS**.
- With a path on a shared address, the **prefix is removed** before the request reaches your
  service.
- Every request is **logged, measured and traced**, visible in
  [Monitoring](/monitoring/getting-start).

## Troubleshooting by response code

What the caller receives tells you which stage refused the request. Start from the answer and look at the object named in the last column.

| Answer | Meaning | Look at |
|---|---|---|
| The name does not resolve | The host name is not in DNS yet, or is misspelt | The host name of the API instance |
| Connection refused, or a timeout | The gateway is not reachable from where you call | The exposure mode of the gateway |
| A certificate error | The certificate does not cover the host name, or has expired | The certificate of the access point |
| `404` | No API instance matches the host name and path | The API instance, and the access point it is on |
| `401`, `403` | A security rule refused the request | The security policy |
| `429` | The rate limit was reached | The backend traffic policy |
| `503` | No instance of the service is ready, or a cap was reached | The integration, the circuit breaker |
| `504` | The service took longer than the timeout | The integration, the timeout |

## See also

- [Policy tasks](/api-manager/policy-tasks) — one page per rule
- [Tutorial: expose it as an API](/tutorial/expose)

---
title: Client Traffic Policy
sidebar_position: 13
---

Cap the connections a gateway accepts, set how long clients may take, and choose the TLS versions they may use.

## How it works

This policy governs the connection between a client and the gateway, before any route is chosen: how many clients may connect, how long the gateway waits for them, which TLS versions it accepts. It protects the gateway itself and sets the security floor of everything published on it.

:::warning Affects every API of the gateway
Raising the minimum TLS version or lowering a timeout applies to all callers of all APIs on that gateway.
:::

Every parameter and its default: [reference](/api-manager/reference/client-traffic-policy).

## Use cases

To protect a gateway from too many connections, or to require a minimum TLS version.

## Prerequisites

- A [gateway](/api-manager/gateway).

## Procedure

{/* screenshot: api-manager-policy-tasks-client-traffic */}

1. In **API Manager**, go to **API Gateways** and open the gateway.
2. Open its **Client traffic** policies and add a policy.
3. Fill the limits you need: connections, timeouts, TLS versions.
4. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Max Connections** | The most client connections at the same time. The ones above are refused. | — |
| **Close Delay** | How long the gateway waits before closing connections above the limit. | — |
| **Request Timeout** | The longest a client may take to send the headers of its request. | — |
| **Idle Timeout** | How long an idle connection is kept. | — |
| **Minimum TLS Version** | The lowest TLS version a client may use. | 1.2 |
| **Maximum TLS Version** | The highest TLS version a client may use. | 1.3 |
| **TLS Cipher Suites** | For TLS 1.0 to 1.2 only. Empty for the defaults of the gateway. | — |
| **ALPN Protocols** | `h2`, `http/1.1` or `http/1.0`. Empty for the defaults of the gateway. | — |

## Verification

```bash title="Check the TLS version a client is refused"
curl -i --tlsv1.1 --tls-max 1.1 https://orders.example.com/orders
```

## Behavior and limits

- A client traffic policy applies to the whole gateway, not to one API.
- Leave cipher suites, curves and signature algorithms empty unless a security requirement names them.

## See also

- [Policies](/api-manager/policies) — every rule at a glance
- [API Gateways](/api-manager/gateway)

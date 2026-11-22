---
title: Client Traffic Policy
sidebar_position: 3
---

Reference of the client traffic policy: how clients connect to a gateway. It is deployed as an
Envoy Gateway `ClientTrafficPolicy`.

## Target

| Field | Values | Meaning |
|---|---|---|
| `targetRef.kind` | `Gateway` | A gateway |
| `targetRef.name` | Name | The gateway |
| `targetRef.sectionName` | Name, optional | One access point |

## Connections

These parameters protect the gateway itself from too many or too slow clients. They act before any route is chosen.

| Parameter | Default | Meaning |
|---|---|---|
| `maxConnections` | No limit | Clients connected at the same time |
| `connectionCloseDelay` | — | Grace period before closing connections above the limit, such as `10s` |
| `requestReceivedTimeout` | Gateway default | Maximum time to receive the request headers, such as `30s` |
| `idleTimeout` | Gateway default | Close client connections idle for this long, such as `90s` |

:::tip Slow clients
`requestReceivedTimeout` is the defence against clients that open connections and send headers
very slowly. Set it on public gateways.
:::

## TLS

These parameters decide which TLS handshakes the gateway accepts from clients. Tightening them improves security and may exclude old clients.

| Parameter | Default | Meaning |
|---|---|---|
| `tlsMinVersion` | `1.2` | Lowest version a client may use |
| `tlsMaxVersion` | `1.3` | Highest version a client may use |
| `tlsCiphers` | Gateway default | Cipher suites for TLS 1.0 to 1.2. No effect on TLS 1.3 |
| `tlsEcdhCurves` | Gateway default | ECDH curves offered |
| `tlsSignatureAlgorithms` | Gateway default | Signature algorithms supported |
| `tlsAlpnProtocols` | Gateway default | `h2`, `http/1.1`, `http/1.0` |

:::warning Raising the minimum version cuts off old clients
Setting `tlsMinVersion` to `1.3` refuses every client limited to TLS 1.2. Check the access
logs for the versions in use before raising it.
:::

## Behavior and limits

- These settings apply to HTTPS and TLS-terminating access points. A TLS passthrough access
  point leaves the handshake to the backend.
- A policy on one access point (`sectionName`) takes the place of the gateway-wide policy for
  that access point.

Procedure: [Client traffic policy](/api-manager/policy-tasks/client-traffic).

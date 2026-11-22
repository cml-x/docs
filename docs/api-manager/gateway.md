---
title: API Gateways
sidebar_position: 2
---

A **Gateway** is the entry point of traffic for one [environment](/infra/environments). It has a
load balancer of its own, and one or several **access points** through which
[API Instances](/api-manager/api-instances) and [Auth Gateways](/auth/auth-gateway) are reached.

![Gateway Routing](/img/api-manager/gateway.drawio.png)

## Create a gateway

Open **API Manager**, go to **Gateways**, then create one. Two things are asked for.

### Exposure mode

The exposure mode decides from where the gateway can be reached. It determines the kind of load balancer the gateway gets, and cannot be worked around with a policy: a gateway that is not exposed to the internet is unreachable from it, whatever its routes.

| Mode | Who can reach the gateway |
|---|---|
| **Public** | Anyone on the internet. This is the default. |
| **Private** | Your private network only. |
| **Internal** | Only what runs inside the platform. |

### Access points (listeners)

{/* screenshot: gateway-access-points */}

An access point is a port the gateway listens on, with the kind of traffic it takes. A gateway
starts with one HTTP access point on port 80; add the ones you need.

| Kind | Traffic | Default port | What the gateway does |
|---|---|---|---|
| **HTTP** | Standard web traffic | 80 | Reads the requests, unencrypted |
| **HTTPS** | Encrypted web traffic | 443 | Ends the encryption, with a certificate you choose |
| **TLS** | Encrypted traffic passed through | 8443 | Forwards without decrypting: the backend holds the certificate |
| **TCP** | Raw TCP connections | 8080 | Forwards the connection as it is |

For each access point:

- **Name** — lowercase letters, digits and hyphens. APIs choose an access point by this name.
- **Domain** — only accept traffic for this domain. Leave it empty to accept every domain. Not
  asked for a TCP access point.
- **Certificate** — required for HTTPS: a stored configuration of the kind
  [TLS Certificate](/config-sources/templates#tls-certificate). Choose an existing one or create
  it from the field.
- **Who may publish on it** — by default, only what belongs to the same environment.

:::tip HTTPS is where encryption ends
With an HTTPS access point, the gateway holds the certificate and your services receive plain
HTTP. Use TLS instead when the service must hold the certificate itself.
:::

## Listener domains

The domain of an access point is chosen among the [domains](/api-manager/domains) of the
environment. One more choice is always offered, marked **internal**: the address of the gateway
inside the platform, `<gateway>.<namespace>`. It is what to choose for an access point reached
only from inside the platform.

## Gateway settings

{/* screenshot: gateway-settings */}

Once created, a gateway is tuned through its settings.

| Setting | What it does | Defaults |
|---|---|---|
| **Access points** | Add, change or remove access points. | One HTTP access point, port 80 |
| **Resources** | Number of instances, and the CPU and memory of each. | 2 instances, 100m / 128Mi requested, 500m / 256Mi at most |
| **Autoscaling** | Add instances when CPU use rises above a target, and remove them when it falls. | 2 to 10 instances, at 80% CPU |
| **Shutdown** | How long an instance waits for the connections in progress before stopping. | — |

## Routes attached to a gateway

- [API Instances](/api-manager/api-instances) — your APIs, each on an access point.
- [Auth Gateways](/auth/auth-gateway) — the token service of the environment, on an HTTPS access
  point.

[Policies](/api-manager/policies) can be attached to the whole gateway, in which case they apply
to everything published on it, or to one API only.

Every gateway also produces access logs, traces and metrics, visible in
[Monitoring](/monitoring/getting-start).

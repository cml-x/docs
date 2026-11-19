---
title: Private Links
sidebar_position: 4
---

A **Private Link** connects an [environment](/infra/environments) to a network that is not on
the public internet — a datacenter, a private cloud, a VPC — so that integrations can call
applications there, and be called from there, without exposing either side.

Each link belongs to one environment and is isolated from the others. An environment can have
as many links as it has remote networks to reach.

![A private link between an environment and a remote network](/img/infra/private-link.svg)

## How it works

A link is a tunnel that the **environment opens** towards the remote network. Nothing is
exposed on the environment's side; the remote side only has to accept one incoming connection.

Traffic can then flow in two directions, each declared separately:

| | Who calls | What is called | Address used |
|---|---|---|---|
| **Remote applications** | Your integrations | An application in the remote network | The name you gave it, e.g. `sap-erp:443` |
| **Open services** | The remote side | A service of the environment | The environment's tunnel address and the port you opened, e.g. `10.250.0.2:8443` |

Anything that is not declared is not reachable.

### Three kinds of addresses

A link involves three kinds of addresses, and they are easy to mix up:

| Address | Example | What it is | Where it is entered |
|---|---|---|---|
| **Tunnel addresses** | `10.250.0.2` (environment), `10.250.0.1` (remote side) | The two ends of the tunnel, nothing else | Filled in for you at creation |
| **Remote networks** | `10.20.0.0/16` | What is routed into the tunnel | Step **This side** |
| **Address of a remote application** | `10.20.1.15` | The final destination of a call | **Remote Applications** tab |

## Two sides, set up in turn

A link needs both sides to agree, and they are usually run by different people. The console is
built around that:

1. **You** create the link and apply it. The environment's side starts.
2. The console gives you a **configuration file** for the remote side.
3. **The remote administrator** loads the file and gives you back two or three values.
4. **You** enter those values and apply again. The tunnel opens.

Until step 4, the link is not in error: it shows **Waiting for the remote side**.

## Create a link

Open the environment, go to **Network**, then **New link**. Creation takes three steps. Every
field is described in the [field reference](#field-reference) below.

1. **Link** — name the link and choose the tunnel type.
2. **This side** — check the tunnel address and give the remote networks.
3. **Remote side** — what only the remote administrator can give. **Leave it empty** if you do
   not have it yet: the link is created and waits.

Then click **Apply** on the environment.

### WireGuard or IPsec

| | WireGuard | IPsec (IKEv2) |
|---|---|---|
| When to choose it | By default | When the remote side requires it |
| What the two sides agree on | One public key each, one port | Identities, a shared key, proposals |
| Port to open on the remote side | UDP 51820 (configurable) | UDP 500 and 4500 |
| Measured throughput | Higher | About half — see [Performance and limits](#performance-and-limits) |

:::caution
The tunnel type cannot be changed once the link exists. To switch, create a new link.
:::

## Give the configuration file to the remote side

Open the link. Its **Setup** tab shows where the link stands, and offers:

- **Download the file** — a file ready to load on the remote side, named
  `<environment>-<link>-wireguard.conf` or `<environment>-<link>-ipsec.conf`.
- **Copy as text** — the same information as a plain list, for a remote side that does not use
  WireGuard tools or strongSwan.

Below, a table lists everything the remote side needs and what it is asked to give back.

The file is rebuilt from what is saved each time, so you can come back and download it again
at any moment. It never contains a secret: the remote side's private key, and the IPsec shared
key, are left for the remote administrator to fill in.

:::note
For a WireGuard link, the file is available once the link has been applied a first time: the
link creates its own key when it starts.
:::

## Enter what the remote side answers

In the link's **Properties** tab, enter the values the remote administrator gave back (see the
**Remote side** fields in the [field reference](#field-reference)), then click **Apply**. The
link connects by itself and shows **Connected**.

## Declare remote applications

In the **Remote Applications** tab, add each application of the remote network your
integrations call. Once applied, an application named `sap-erp` on port `443` is reachable from
the environment as `sap-erp:443`, like any other service. Integrations need no VPN client and
no special configuration.

## Open services to the remote side

In the **Open to the Remote Network** tab, add each service of the environment the remote side
may call.

### How the remote side calls an open service

The remote side calls **the environment's tunnel address, on the port you opened**. With a
tunnel address of `10.250.0.2` and an open port `8443`, the call is made to `10.250.0.2:8443`.

- **No name is created.** The platform publishes no DNS record for an open service, and the
  names used inside the environment (`orders-api`) do not exist on the remote side.
- **If the remote side wants a name**, it creates one in its own DNS (or hosts file) pointing
  to the tunnel address — for example `orders.partner.internal → 10.250.0.2`.
- **For HTTPS**, traffic is passed through as is: the certificate presented is the one of the
  service in the environment. The name the remote side uses must therefore be one that
  certificate covers.
- **Routing.** The host carrying the tunnel reaches `10.250.0.2` directly. Other machines of
  the remote network need a route to that address through the tunnel host, or the tunnel host
  translates addresses for them.

## Field reference

### Link

| Field | Meaning | Example | Notes |
|---|---|---|---|
| **Name** | Identifies the link in the environment. | `paris-site` | Lowercase letters, digits and dashes, 30 characters at most. Cannot be changed. |
| **Tunnel type** | The technology the tunnel uses. | WireGuard | Cannot be changed once the link exists. |

### This side

| Field | Meaning | Example | Notes |
|---|---|---|---|
| **Address of this environment in the tunnel** | The address the environment takes inside the tunnel. The remote side sees every call as coming from it, and calls open services on it. | `10.250.0.2` | Filled in for you and different for each link of the environment (`10.250.0.2`, `10.250.1.2`, …). Change it only if it overlaps a range the remote network already uses. |
| **Remote networks** | The address ranges of the remote network that are sent through the tunnel. Only traffic to these ranges uses the link. | `10.20.0.0/16` | At least one. Written as a network, with its prefix length. |

### Remote side

| Field | Meaning | Example | Notes |
|---|---|---|---|
| **Remote entry point** | The public address or name where the remote side accepts the tunnel. | `vpn.partner.com` | Given by the remote administrator. Empty until then. |

**WireGuard**

| Field | Meaning | Default | Notes |
|---|---|---|---|
| **Public key of the remote side** | The key that identifies the remote side's end of the tunnel. | — | Given by the remote administrator. It is not a secret. |
| **Port of the remote side** | The UDP port the remote side listens on. | `51820` | Change it only if the remote side uses another port. |
| **Keep-alive (seconds)** | How often the environment sends a signal to keep the tunnel open through firewalls. | `25` | Lower it if a firewall on the path closes idle connections sooner. |
| **Largest packet** | The largest packet the tunnel carries (MTU). | `1380` | Lower it (e.g. `1280`) if small requests work but large transfers stall. |

**IPsec**

| Field | Meaning | Default | Notes |
|---|---|---|---|
| **Identity of this environment** | The name the environment presents to the remote side. | `<link>@<environment>` | The remote side must be configured with the same value. |
| **Identity of the remote side** | The name the remote side presents. | — | Given by the remote administrator. |
| **Shared key** | The secret both sides use to authenticate each other. | — | Stored as a configuration. Use **New secret** above the field to create it, then **Make available** for this environment. Exchange it with the remote administrator by a secure channel: it never appears in the configuration file. |
| **Proposals to open the tunnel** | The algorithms offered to establish the tunnel (IKE). | `aes256-sha256-ecp256, aes256-sha256-modp2048` | Change only to match what the remote equipment accepts. |
| **Proposals to protect the traffic** | The algorithms offered to encrypt what the tunnel carries (ESP). | `aes256gcm16-ecp256, aes256-sha256-modp2048` | Same remark. |

### Remote applications

| Field | Meaning | Example | Notes |
|---|---|---|---|
| **Name** | The name integrations call. It becomes a service of the environment. | `sap-erp` | Must be unique in the environment. |
| **IP address of the application, as known in the remote network** | The application's real address there — the one its neighbours already use. | `10.20.1.15` | Not a tunnel address. It must belong to one of the link's remote networks. |
| **Port** | The port the application answers on. Integrations call the same port. | `443` | |

### Open services

| Field | Meaning | Example | Notes |
|---|---|---|---|
| **Name** | A label for what is opened. | `orders` | |
| **Service of the environment** | The service of the environment that answers. | `orders-api` | Its name inside the environment. |
| **Port of the service** | The port that service listens on. | `8080` | |
| **Port the remote side calls** | The port opened on the environment's tunnel address. | `8443` | Between 1024 and 19999, different for each open service of the link. |

## Link states

| State | Meaning |
|---|---|
| **Not applied yet** | The link is saved but the environment has not been applied since. |
| **Deployment in progress…** | The environment is being applied. |
| **Starting…** | The link is deployed and coming up. |
| **Waiting for the remote side** | This side is ready; the remote values are missing, or the remote side is not answering. |
| **Connected** | The tunnel is open. |
| **Deployment failed** | The last apply failed. |

The state refreshes by itself, including on a page opened in the middle of a deployment.

## Performance and limits

### Throughput

Measured on the platform, one transfer of 1 GiB through a link:

| Tunnel type | Measured throughput |
|---|---|
| WireGuard | 500 to 570 Mbit/s |
| IPsec | 250 to 300 Mbit/s |

These figures are a **ceiling for the link itself**, not a promise. They were measured between
two points of the same cluster, on 2-vCPU nodes, with a single connection and no internet path
in between. The WireGuard figure equals what the same transfer reached without any tunnel, so
the link was not the limiting factor in that test.

In practice the bandwidth of a link is the lowest of: the internet path between the two sides,
the capacity of the remote equipment, and the figures above.

### Connections and timeouts

| Limit | Value |
|---|---|
| Simultaneous connections per link | 2,000, both directions together. Beyond that, new connections wait. |
| Time allowed to reach a destination | 10 seconds |
| Idle connection | Closed after 1 hour without traffic |
| Remote applications per link | No fixed limit |
| Open services per link | One port each, between 1024 and 19999 |
| Remote sides per link | One |

### Availability

- **A link runs as a single instance.** When it restarts — a platform maintenance, or a change
  to its tunnel settings — open connections are cut and calls fail for a few seconds to a
  minute, until the tunnel is back.
- **Adding or removing a remote application or an open service does not restart the link.** It
  takes effect in about a minute, and the tunnel stays up.
- **A tunnel that drops is detected in about 3 minutes** (WireGuard) **to 4 minutes** (IPsec).
  The link then stops being **Connected**, and calls to remote applications fail at once
  instead of hanging.
- **Capacity is fixed per link** and cannot be raised from the console.

### Other limits

- TCP traffic only.
- IPsec authenticates with a shared key; certificates are not supported.
- The downloadable IPsec file is in strongSwan format. For other equipment, use **Copy as
  text** and enter the values by hand.

### Advice

- **Prefer WireGuard** when the remote side accepts it: it is simpler to agree on and about
  twice as fast.
- **One link per remote network.** Each link has its own capacity; two heavy flows to two
  networks do not slow each other down.
- **Use IP addresses for remote applications.** Names of the remote network are not known to
  the environment.
- **Keep address ranges apart.** The tunnel addresses and the remote networks must not overlap
  ranges already used on either side.
- **Make integrations tolerant to a short interruption**: retry a failed call, and do not rely
  on a connection that stays open and idle for more than an hour.
- **If large transfers stall while small requests work**, lower **Largest packet**.

## For the remote administrator

What the remote side needs to know, whatever its equipment:

- **The environment opens the tunnel.** Allow one incoming UDP port (WireGuard) or UDP 500 and
  4500 (IPsec). Nothing has to be opened towards the environment.
- **The environment's public address is not fixed.** Recognise it by its key (WireGuard) or
  its identity (IPsec), not by its source address.
- **Every call arrives from one address**: the environment's tunnel address. Firewall rules for
  the remote applications only need that single source.
- **Route the replies.** The host carrying the tunnel must be the route back to the
  environment's tunnel address for the remote applications, or translate addresses.
- **To call an open service**, use the environment's tunnel address and the port listed in the
  table. Create a DNS name for it on your side if you need one.

## Network rules

A link does not change the environment's [network policy](/infra/environments). If the policy
restricts outgoing traffic, allow the link to reach the remote entry point: the WireGuard UDP
port, or UDP 500 and 4500 for IPsec.

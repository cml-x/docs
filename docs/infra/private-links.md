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

## Two sides, set up in turn

A link needs both sides to agree, and they are usually run by different people. The console is
built around that:

1. **You** create the link and apply it. The environment's side starts.
2. The console gives you a **configuration file** for the remote side.
3. **The remote administrator** loads the file and gives you back two or three values.
4. **You** enter those values and apply again. The tunnel opens.

Until step 4, the link is not in error: it shows **Waiting for the remote side**.

## Create a link

Open the environment, go to **Network**, then **New link**. Creation takes three steps.

### 1. Link

- **Name** — which remote network this link goes to, e.g. `paris-site`.
- **Tunnel type** — **WireGuard** or **IPsec**.

| | WireGuard | IPsec (IKEv2) |
|---|---|---|
| When to choose it | By default | When the remote side requires it |
| What the two sides agree on | One public key each, one port | Identities, a shared key, proposals |
| Port to open on the remote side | UDP 51820 (configurable) | UDP 500 and 4500 |

:::caution
The tunnel type cannot be changed once the link exists. To switch, create a new link.
:::

### 2. This side

- **Address of this environment in the tunnel** — filled in for you, and different for each
  link of the environment (`10.250.0.2`, then `10.250.1.2`, …). The remote side sees every
  call as coming from this address. Change it only if it overlaps a range already used on the
  remote network.
- **Remote networks** — the networks on the remote side that should be reached through the
  tunnel, e.g. `10.20.0.0/16`. This is the one thing you have to provide.

### 3. Remote side

What only the remote administrator can give. **Leave it empty** if you do not have it yet and
create the link: it will wait.

Then click **Apply** on the environment.

## Give the configuration file to the remote side

Open the link. Its **Setup** tab shows where the link stands and offers the file:

- **Download the file** — a file ready to load on the remote side, named
  `<environment>-<link>-wireguard.conf` or `<environment>-<link>-ipsec.conf`.
- **Copy as text** — the same information as a plain list, for a remote side that does not use
  WireGuard tools or strongSwan.

The file is rebuilt from what is saved each time, so you can come back and download it again
at any moment. It never contains a secret: the remote side's private key, and the IPsec shared
key, are left for the remote administrator to fill in.

:::note
For a WireGuard link, the file is available once the link has been applied a first time: the
link creates its own key when it starts.
:::

## Enter what the remote side answers

In the link's **Properties** tab:

| Tunnel type | What to enter |
|---|---|
| WireGuard | The remote **entry point** (public address or name) and the **public key of the remote side** |
| IPsec | The remote **entry point**, the **identity of the remote side** and the **shared key** |

For IPsec, the shared key is stored as a configuration: use **New secret** above the field to
create it in place, then **Make available** to use it in this environment.

Click **Apply**. The link connects by itself and shows **Connected**.

## Declare remote applications

In the **Remote Applications** tab, add each application of the remote network your
integrations call:

| Field | What to enter | Example |
|---|---|---|
| **Name** | The name your integrations will call | `sap-erp` |
| **IP address of the application** | Its real address in the remote network — not a tunnel address | `10.20.1.15` |
| **Port** | The port it answers on | `443` |

The address must belong to one of the link's **remote networks**.

Once applied, the application is reachable from the environment as `sap-erp:443`, like any
other service. Integrations need no VPN client and no special configuration.

## Open services to the remote side

In the **Open to the Remote Network** tab, add each service of the environment the remote side
may call:

| Field | What to enter | Example |
|---|---|---|
| **Name** | A name for what is opened | `orders` |
| **Service of the environment** | The service that answers | `orders-api` |
| **Port of the service** | Its port | `8080` |
| **Port the remote side calls** | Between 1024 and 19999 | `8443` |

The remote side then calls the environment's tunnel address on that port — `10.250.0.2:8443`
in this example.

## Link states

| State | Meaning |
|---|---|
| **Not applied yet** | The link is saved but the environment has not been applied since. |
| **Deployment in progress…** | The environment is being applied. |
| **Starting…** | The link is deployed and coming up. |
| **Waiting for the remote side** | This side is ready; the remote values are missing, or the remote side is not answering. |
| **Connected** | The tunnel is open. |
| **Deployment failed** | The last apply failed. |

The state refreshes by itself, including on a page opened in the middle of a deployment. When
a tunnel drops, the link stops being **Connected** within a few minutes, and calls to remote
applications fail immediately instead of hanging.

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

## Network rules

A link does not change the environment's [network policy](/infra/environments). If the policy
restricts outgoing traffic, allow the link to reach the remote entry point: the WireGuard UDP
port, or UDP 500 and 4500 for IPsec.

## Limits

- TCP traffic only.
- IPsec authenticates with a shared key; certificates are not supported.
- The downloadable IPsec file is in strongSwan format. For other equipment, use **Copy as
  text** and enter the values by hand.

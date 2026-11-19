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

## Addresses and allowlisting

Two different addresses identify the environment, at two different levels. Mixing them up is
the most common mistake when a firewall is involved.

| | Tunnel address of the link | Public address of a cluster node |
|---|---|---|
| Example | `10.250.0.2` | `142.93.106.75` |
| Where it is visible | Inside the tunnel only | On the internet, around the tunnel |
| What it carries | The calls themselves, once decrypted | The encrypted packets of the tunnel |
| Stable | Yes — you choose it | No — it changes when a node is replaced or the link restarts elsewhere |

### What to allow, and where

| Who filters | What it sees | What to allow |
|---|---|---|
| **The remote application**, or the firewall in front of it | Calls coming from the link's tunnel address | The tunnel address (`10.250.0.2`), to the application's port |
| **The internet-facing firewall**, where the tunnel arrives | Encrypted UDP packets from the public address of a node | The tunnel's UDP port, from any source |

- **Allowlist the tunnel address on the application side.** It never changes, and every call
  from the environment arrives from it.
- **Do not allowlist the node's public address at the tunnel entry.** It is not fixed. The
  link is recognised by its key (WireGuard) or its identity (IPsec), which is what actually
  protects the entry: a packet from an unknown key is ignored.
- **All integrations share the same source.** The remote side cannot tell two integrations of
  the environment apart by their address. To apply different rules, rely on what the call
  carries (a token, a client certificate), or create a second link: it has its own tunnel
  address.

:::note
If the host carrying the tunnel on the remote side translates addresses to reach the other
machines of its network, those machines see **that host's address**, not the tunnel address.
Allowlist that host instead.
:::

## Guide: a WireGuard link

### On the console

1. **Network → New link.** Name it, keep **WireGuard**.
2. **This side.** Keep the proposed tunnel address; enter the remote networks.
3. **Remote side.** Leave empty. **Create the link**, then **Apply** on the environment.
4. Open the link, tab **Setup**. Once the state is **Waiting for the remote side**, click
   **Download the file** and send it to the remote administrator.

### On the remote side

The file is a standard WireGuard configuration. On a Linux host with WireGuard tools:

1. **Create the key of this side** and put the private key in the file, in place of
   `<private key of the remote side>`:

   ```
   wg genkey | tee remote.key | wg pubkey > remote.pub
   ```

2. **Load the file:**

   ```
   wg-quick up ./<environment>-<link>-wireguard.conf
   ```

3. **Open the port** given by `ListenPort` (UDP 51820 by default) on the internet-facing
   firewall, from any source.

4. **Let the remote applications answer.** The host carrying the tunnel reaches the
   environment directly. For the other machines of the network, either route the tunnel
   address through this host, or let the host translate addresses. For example:

   ```
   sysctl -w net.ipv4.ip_forward=1
   # either, on the network's router: a route to the tunnel address through this host
   ip route add 10.250.0.2/32 via <address of this host>
   # or, on this host: translate, so that nothing else has to change
   iptables -t nat -A POSTROUTING -s 10.250.0.2/32 -o <network interface> -j MASQUERADE
   ```

5. **Give back** to the environment's owner: the public address or name of this host, and the
   content of `remote.pub`.

What the file sets, and why:

| Line | Meaning |
|---|---|
| `ListenPort` | The UDP port the environment connects to. |
| `Address` | The remote side's own address in the tunnel, next to the environment's. It can be changed freely. |
| `[Peer] PublicKey` | The key of the link. Only packets signed with it are accepted. |
| `[Peer] AllowedIPs` | The environment's tunnel address: the only source accepted from this peer, and what is routed back to it. |
| No `Endpoint` | Intended: the environment opens the tunnel and keeps it open, wherever it comes from. |

### Back on the console

1. Tab **Properties**: enter the **Remote entry point** and the **Public key of the remote
   side**. **Apply**.
2. The state becomes **Connected** within a minute.
3. Add the applications to reach in **Remote Applications**, and **Apply**.

### Checking

On the remote side, `wg show` lists the peer with a recent **latest handshake** and growing
**transfer** counters. From the environment, an integration calling `<name>:<port>` gets an
answer.

| Symptom | Likely cause |
|---|---|
| The link stays **Waiting for the remote side** | The UDP port is not open on the internet-facing firewall, the entry point is wrong, or the public key entered on either side is not the right one. |
| `wg show` shows no handshake | The packets do not reach this host: check the firewall and any port forwarding in front of it. |
| The link is **Connected** but calls time out | The remote application cannot answer: missing route or translation (step 4), or its firewall does not allow the tunnel address. |
| Small requests work, large transfers stall | Lower **Largest packet** on the link. |

## Guide: an IPsec link

Choose IPsec when the remote equipment does not support WireGuard. More has to be agreed on,
so settle these values with the remote administrator first:

| To agree on | Default on the link | Notes |
|---|---|---|
| Protocol | IKEv2 | IKEv1 is not supported. |
| Authentication | Shared key | Certificates are not supported. |
| Who initiates | The environment | The remote side answers; it does not need to reach the environment. |
| Transport | UDP 500 and 4500, with UDP encapsulation | The environment is behind address translation. |
| Identity of the environment | `<link>@<environment>` | Free text; both sides must use the same value. |
| Identity of the remote side | — | Chosen by the remote side. |
| Proposals to open the tunnel (IKE) | AES-256, SHA-256, with ECP-256 or MODP-2048 | `aes256-sha256-ecp256, aes256-sha256-modp2048` |
| Proposals to protect the traffic (ESP) | AES-256-GCM with ECP-256, or AES-256 with SHA-256 and MODP-2048 | `aes256gcm16-ecp256, aes256-sha256-modp2048` |
| Networks carried | The environment's tunnel address `/32` on one side, the remote networks on the other | Often called traffic selectors, or local and remote subnets. |
| Dead peer detection | Every 30 seconds | |

### On the console

1. **Network → New link.** Name it, choose **IPsec**.
2. **This side.** Keep the proposed tunnel address; enter the remote networks.
3. **Remote side.** Check the **Identity of this environment**; leave the rest empty if you do
   not have it. **Create the link**, then **Apply**.
4. Tab **Setup**: **Download the file**, or **Copy as text** for equipment that is not
   strongSwan, and send it to the remote administrator.

### On the remote side

**With strongSwan**, the file is ready to use:

1. Replace `<the shared key>` with the key agreed on, and `<identity of the remote side>` with
   the chosen identity if it is not filled in. A key can be made with:

   ```
   openssl rand -hex 24
   ```

2. Place the file in `/etc/swanctl/conf.d/` and load it:

   ```
   swanctl --load-all
   ```

3. **Open UDP 500 and 4500** on the internet-facing firewall, from any source.

4. **Let the remote applications answer**, as for WireGuard: route the environment's tunnel
   address through this host, or translate addresses.

5. **Give back**: the public address or name of this host, its identity, and — by a secure
   channel, never by e-mail in clear — the shared key.

**With other equipment** (firewall appliance, cloud VPN gateway), create a site-to-site,
policy-based IKEv2 tunnel with the values of the table above. Two points differ from a usual
site-to-site setup:

- The peer has **no fixed public address**. Configure it as a dynamic or "any address" peer,
  identified by its identity. Equipment that requires a fixed peer address cannot be used.
- The peer is behind address translation: enable **NAT traversal**.

### Back on the console

1. Tab **Properties**: enter the **Remote entry point** and the **Identity of the remote
   side**.
2. **Shared key**: click **New secret**, create it with the agreed key, then **Make
   available** for this environment and select it.
3. **Apply**. The state becomes **Connected** within a minute.

### Checking

On strongSwan, `swanctl --list-sas` shows the connection `ESTABLISHED` and its child
`INSTALLED`.

| Symptom | Likely cause |
|---|---|
| The link stays **Waiting for the remote side** | UDP 500 or 4500 is filtered, the entry point is wrong, or the remote side expects a fixed peer address. |
| The remote side logs an authentication failure | The shared key or one of the two identities differs between the sides. |
| The remote side logs "no proposal chosen" | The proposals do not overlap: align them on the link's **Properties**. |
| The tunnel is up but no traffic passes | The networks carried do not match on both sides, or the remote application cannot answer (route, translation or firewall). |

## What every remote administrator should know

Whatever the tunnel type and the equipment:

- **The environment opens the tunnel.** Nothing has to be opened towards the environment.
- **The environment's public address is not fixed.** Recognise it by its key or its identity.
- **Every call arrives from one address**: the environment's tunnel address. This is the
  address to allowlist on the applications.
- **Route the replies** to that address through the host carrying the tunnel, or translate.
- **To call an open service**, use the environment's tunnel address and the port listed in the
  sheet. Create a DNS name for it on your side if you need one.

## Network rules

A link does not change the environment's [network policy](/infra/environments). If the policy
restricts outgoing traffic, allow the link to reach the remote entry point: the WireGuard UDP
port, or UDP 500 and 4500 for IPsec.

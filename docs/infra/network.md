---
title: Network
sidebar_position: 7
---

The **Network** service of an [environment](/infra/environments) holds two things:

- the **traffic rules** of the environment — what may come in, and what may go out;
- its [private links](/infra/private-links) to remote networks, each deployed on its own.

This page covers the traffic rules. Private links have [a page of their own](/infra/private-links).

## Traffic rules

Rules come in two lists, each with its own page under **Network**:

| List | What its rules describe |
|---|---|
| **Ingress Rules** | Traffic coming **into** the environment: who may call what runs in it |
| **Egress Rules** | Traffic going **out of** the environment: what it may call |

### A rule

{/* screenshot: env-network-rule */}

A rule names who is on the other side, and on which ports.

**Who** — one or several of:

| Choice | What it means |
|---|---|
| **Any source/destination** | Everyone |
| **Pods matching labels** | Workloads of the environment that carry the labels you give |
| **All pods in matching namespaces** | Everything in the namespaces that carry the labels you give |
| **Pods in matching namespaces with matching labels** | Both conditions at once |
| **External IP range** | A range of addresses, such as `203.0.113.0/24`, with exceptions if needed |

Labels are written `key=value`, separated by commas.

**Ports** — each with its protocol, **TCP**, **UDP** or **SCTP**. Leave the ports empty for every
port.

### Ready-made rules

A rule can start from a preset. **DNS — kube-dns** lets the environment resolve names: UDP and TCP
on port 53, to the name service of the cluster. Add it to the egress rules of an environment
whose outgoing traffic you restrict, or its workloads will not find the services they call.

## Apply

Rules take effect when you click **Apply** on the environment. The Network service only holds
configuration: it has no running part of its own to watch.

## Good to know

- Rules are about the network. To decide **who** may call an API, and with which credentials,
  use [policies](/api-manager/policies) on the gateway.
- A remote network reached through a [private link](/infra/private-links) is declared on the
  link, not in these rules.

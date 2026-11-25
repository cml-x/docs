---
title: Network Policies
sidebar_position: 7
---

The **Network** page of an [environment](/infra/environments) holds two lists:

- its **network policies** — the rules on what may come in, and what may go out;
- its [private links](/infra/private-links) to remote networks.

Each policy and each link is deployed on its own, from its own page. This page covers the
network policies. Private links have [a page of their own](/infra/private-links).

## Several policies per environment

An environment carries as many network policies as it needs. Each one has:

| Part | What it is |
|---|---|
| **Name** | Lowercase letters, digits and dashes; unique in the environment |
| **Applies to** | The workloads it concerns, chosen by label. Empty: every workload of the environment |
| **Ingress Rules** and **Egress Rules** | What it allows in, and out |

Create one with **New policy**, name it, then set what it applies to and write its rules on
its page. A policy is removed from the list, or with **Delete** on its page: its rules are
lifted at once.

Policies add up: traffic is allowed as soon as one policy that applies to the workload allows
it. Use several to keep unrelated rules apart — one for the database tier, one for what partners
may reach — so that changing one never redeploys the other.

:::note[The policy of an older environment]
An environment set up when it had a single policy shows it in the list like the others, with a
notice on its page. **Move the policy** gives it a deployment of its own; its rules are lifted
until you deploy it again.
:::

## Why restrict traffic inside an environment

By default, workloads on a cluster can call each other and reach the outside freely. That is
convenient and means that a compromised or misconfigured integration can reach everything.
Traffic rules narrow it: this environment may call that database and that partner, and nothing
else; only the gateway may call the integrations.

Rules describe what is **allowed**. Once a list holds rules, what none of them allows is
refused.

:::warning[Restricting egress cuts DNS unless you allow it]
The first symptom of an egress list without the DNS preset is that every outgoing call fails
with "unknown host". Add **DNS — kube-dns** before any other egress rule.
:::

## Ingress and egress rules

Rules come in two lists, each a tab of the policy's page:

| List | What its rules describe |
|---|---|
| **Ingress Rules** | Traffic coming **into** the environment: who may call what runs in it |
| **Egress Rules** | Traffic going **out of** the environment: what it may call |

### Rule definition: peers and ports

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

### Preset rules

A rule can start from a preset. **DNS — kube-dns** lets the environment resolve names: UDP and TCP
on port 53, to the name service of the cluster. Add it to the egress rules of an environment
whose outgoing traffic you restrict, or its workloads will not find the services they call.

:::tip[Allow by label, not by address]
Addresses of workloads change at every restart. Rules that select workloads by labels keep
working; rules on internal IP ranges do not.
:::

## Apply

A policy takes effect when you click **Deploy changes** on its page. That deploys this policy
alone: nothing else of the environment is touched, and **Apply** on the environment does not
deploy it. A policy only holds configuration: it has no running part of its own to watch.

## Behavior and limits

- Rules are about the network. To decide **who** may call an API, and with which credentials,
  use [policies](/api-manager/policies) on the gateway.
- A remote network reached through a [private link](/infra/private-links) is declared on the
  link, not in these rules.

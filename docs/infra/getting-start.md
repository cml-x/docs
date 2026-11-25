---
title: Environment and Cluster Model
sidebar_position: 1
---

Environment Manager decides **where** integrations and APIs run. It works across several
Kubernetes clusters at once — operated by the platform or by you, on any provider, in any region —
and presents them through one model.

![Control plane, runtime planes, targets and environments](/img/infra/runtime-planes.drawio.png)

## Resource model

Four objects, each contained in the previous one. Read the table from top to bottom: it goes from the platform as a whole down to where one integration runs.

| Object | What it is | Scope |
|---|---|---|
| **Control plane** | The console, its API and the deployment engine | One for the platform |
| [**Runtime plane**](/infra/runtime-planes) | A Kubernetes cluster where workloads run: managed by the platform, or yours (BYOC) | A provider, a region |
| [**Target**](/infra/targets) | A namespace on a runtime plane, reserved for a business unit | One runtime plane |
| [**Environment**](/infra/environments) | A named stage — development, production — bound to a target, with its services | One target |

Integrations, gateways and configurations are attached to an **environment**. They never refer to
a cluster: moving a stage to another region or to your own cluster changes the target of the
environment, not what is deployed in it.

## Multi-cluster and multi-region

- A business unit can hold targets on several runtime planes at once.
- Each environment runs on the runtime plane of its target: production in Europe, production in
  North America and a staging environment in your data center are three environments of the same
  business unit.
- An integration bound to several environments is built and deployed separately in each.

## Bring Your Own Cluster

A cluster you operate — in a public cloud account of yours, a private cloud or a data center — is
connected as a runtime plane. Targets and environments are then created on it exactly as on a
managed one. See [Runtime planes](/infra/runtime-planes#bring-your-own-cluster-byoc).

## Quick start: first environment

1. In **Targets**, create a target on a healthy runtime plane — see [Targets](/infra/targets).
2. In **Environments**, create an environment bound to that target.
3. Activate its [Camel Integration Service](/infra/camel-integration-service): registry, Maven,
   build and runtime settings.

The guided setup does the three in one pass: environment basics, container registry, Maven
configuration, then the Camel Integration Service.

Next: deploy an integration in it — [Quick start](/getting-started/quick-start).

## Why targets exist

An environment needs a place on a cluster. A target is that place, described once: which
runtime plane, which namespace. Separating it from the environment lets the same model cover a
namespace shared with others on a managed cluster and a namespace on a cluster of your own —
and lets you move a stage by pointing its environment at another target.

:::info[A target is a namespace, not a cluster]
Several targets can sit on the same runtime plane, each in its own namespace. Creating a target
does not create or reserve a cluster.
:::

## Why Camel integration is a service of the environment

Building and running integrations needs an operator, a container registry to push images to, and
Maven settings to resolve dependencies. These differ between environments: production pushes to
another registry than development, a regulated environment resolves from an internal mirror
only.

So each environment gets its own, configured once. Integrations then carry none of it: the same
integration builds in any environment with that environment's registry and Maven settings.

## Why export logs

The logs of an environment are already searchable in Monitoring. Export them when they must
**also** be somewhere else: the SIEM of your security team, the log platform your on-call
engineers already use, an archive with its own retention.

Exporting does not move logs out of Monitoring. A flow copies the logs it selects to the
destinations it names; what no flow selects stays where it was.

:::info[Three objects, in this order]
Configure the **exporter**, then create a **destination**, then a **flow** that sends logs to
it. A destination that no flow references receives nothing.
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

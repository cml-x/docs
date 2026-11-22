---
title: "Environment Manager: Runtime Planes, Targets, Environments"
sidebar_position: 1
---

Environment Manager decides **where** integrations and APIs run. It works across several
Kubernetes clusters at once — operated by the platform or by you, on any provider, in any region —
and presents them through one model.

![Control plane, runtime planes, targets and environments](/img/infra/runtime-planes.drawio.png)

## Resource model

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

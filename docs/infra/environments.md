---
title: Environment Model and Lifecycle
sidebar_position: 2
---

An **environment** is a named stage — development, staging, production — bound to one
[target](/infra/targets), that is to one namespace on one
[runtime plane](/infra/runtime-planes). Everything that runs is deployed *in an environment*,
never directly on a cluster.

![Control plane, runtime planes, targets and environments](/img/infra/runtime-planes.drawio.png)

## Abstraction over clusters

An environment hides the cluster under it. Whether its target is on a managed runtime plane or on
a cluster of yours, in a public or a private cloud, in one region or another:

- the same services are activated the same way;
- integrations, gateways and configurations are bound to it the same way;
- its state is followed in the same screens.

## Multi-cluster topologies

Because an environment only refers to a target, the same model covers very different layouts. These are the common ones.

| Topology | Environments | Targets |
|---|---|---|
| Stages on one cluster | `development`, `production` | Two namespaces on one runtime plane |
| Stages isolated per cluster | `development`, `production` | One runtime plane each |
| Multi-region production | `production`, `production-us` | Runtime planes in two regions |
| Hybrid | `production`, `production-onprem` | A managed runtime plane and your own cluster |

An integration is bound to each environment it must run in, and is built and deployed separately
in each. Multi-region is therefore explicit: one binding per region.

:::tip[Name environments after their stage, not their cluster]
`production` stays true when the environment moves to another region or to your own cluster;
`aws-eu-west-1` does not.
:::

## Environment services

{/* screenshot: env-services */}

![The services of an environment](/img/infra/env-services.drawio.png)

An environment has three services. Each is configured on its own, and shows whether it is
healthy, in warning, or not configured yet.

| Service | What it does | Details |
|---|---|---|
| **Camel Integration** | Sets the environment up for Apache Camel integrations: an operator of its own that builds and runs them, and its registry, Maven, build and runtime settings. | [Camel Integration Service](/infra/camel-integration-service) |
| **Logging** | Collects the logs of the environment and sends them to your destinations. | [Log Exporter](/infra/log-exporter) |
| **Network** | The rules for traffic in and out of the environment, and its private links to remote networks. | [Network](/infra/network), [Private Links](/infra/private-links) |

### Apply and recycle

A change to a service does nothing until it is applied.

- **Apply** deploys the changes — of the service that is open, or of every configured service
  when used from the page of the environment.
- **Recycle** removes from the environment what was deployed.

While a deployment is in progress, the page follows it and shows when it has settled.

## Resources scoped to an environment

- [Integrations](/runtime/integrations) run in an environment.
- [Gateways](/api-manager/gateway), [API instances](/api-manager/api-instances) and
  [auth gateways](/auth/auth-gateway) belong to one.
- [Configurations](/config-sources/templates) are made available to the environments that need
  them.

## Current environment: the selector in the console header

{/* screenshot: environment-header-selector */}

The applications that work inside an environment — API Manager, Runtime Manager, Auth, Network
and Monitoring — show the **current environment** at the left of the header, in capitals, next
to the menu button. Select it to open the list of environments of the business unit and choose
another one. Applications that are not tied to an environment, such as Secret Manager or
Environments Manager itself, show no selector.

| Situation | What the console does |
|---|---|
| First visit of a business unit | The first environment of the list is selected. |
| Later visits | The environment last used **in that business unit** is selected again, in every application. |
| A link carries `?env=<name>` | That environment is selected, if the business unit has it. |
| The environment last used was deleted | The first one is selected, and a notice says which one is gone. |
| The business unit changes | The environments of the new unit are read; its own last-used environment is selected, never the one of the unit you left. |
| The business unit has no environment yet | The applications show an invitation to create one, with a link to **Environments**. |

Changing the environment keeps you on the page you are on. A list shows what the new environment
holds; the page of a resource that is not bound to it offers to bind it.

The environment a business unit is created with, `sync-<business unit>`, is never offered: it
holds resources that belong to the unit as a whole, such as
[custom domains](/api-manager/domains), whose pages do not depend on the selector.

## Target binding

An environment is bound to exactly one target, chosen at creation.

By default, a target backs one environment. **Allow target conflict**, at creation, lets several
environments share one target — for small setups where a namespace per environment is not
justified. The environments then share that namespace: prefer one target per environment for
production.

To move an environment to another cluster or region, bind it to another target, then apply its
services again there.

---
title: Environments
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

| Topology | Environments | Targets |
|---|---|---|
| Stages on one cluster | `development`, `production` | Two namespaces on one runtime plane |
| Stages isolated per cluster | `development`, `production` | One runtime plane each |
| Multi-region production | `production`, `production-us` | Runtime planes in two regions |
| Hybrid | `production`, `production-onprem` | A managed runtime plane and your own cluster |

An integration is bound to each environment it must run in, and is built and deployed separately
in each. Multi-region is therefore explicit: one binding per region.

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

## Target binding

An environment is bound to exactly one target, chosen at creation.

By default, a target backs one environment. **Allow target conflict**, at creation, lets several
environments share one target — for small setups where a namespace per environment is not
justified. The environments then share that namespace: prefer one target per environment for
production.

To move an environment to another cluster or region, bind it to another target, then apply its
services again there.

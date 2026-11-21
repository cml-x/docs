---
title: Environments
sidebar_position: 2
---

An **Environment** (e.g. "Production", "Staging") is a named, described scope bound to one
[Target](/infra/targets), under which the platform's per-environment services are configured.

![Environment and Targets](/img/infra/env-targets.svg)

## The services of an environment

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

## What else uses an environment

- [Integrations](/runtime/integrations) run in an environment.
- [Gateways](/api-manager/gateway), [API instances](/api-manager/api-instances) and
  [auth gateways](/auth/auth-gateway) belong to one.
- [Configurations](/config-sources/templates) are made available to the environments that need
  them.

## Target binding

By default, one target backs only one environment. Turning on "allow target conflict" when
creating an environment lets several environments share the same physical target — useful for
smaller setups where a full cluster per environment isn't justified.

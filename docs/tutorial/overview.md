---
title: Overview
sidebar_position: 1
---

This tutorial follows **one example from end to end**. You start with a few lines of an Apache
Camel route typed into the console, and finish with an API that is published on a gateway, served
over HTTPS and protected so that only the callers you chose can reach it.

Each step adds one thing to the previous one. You can stop after any step and have something that
works.

![The example, from the caller to the integration](/img/tutorial/architecture.drawio.png)

## Example: the orders REST service

An **orders** service:

- it answers `GET /orders` with a small JSON document;
- it reads a greeting from a **property file**, a region from an **environment variable**, and a
  catalog from a **file**;
- it calls a partner over HTTPS, signed by a **private certificate authority**;
- it is published as `https://orders.example.com`, then protected.

## Tutorial steps

Each step is one page and adds one capability to the same integration.

| Step | Task | Concepts |
|---|---|---|
| [1. Create a Camel integration](/tutorial/first-integration) | Type a REST route in the console | Inline source, route DSLs, dependency resolution |
| [2. Deploy](/tutorial/deploy) | Bind to an environment and apply | Image build, rollout, phases, revisions |
| [3. Externalize configuration](/tutorial/configure) | Add properties, variables and a mounted file | Property placeholders, stored configurations, restart without rebuild |
| [4. Private CA in the JVM truststore](/tutorial/trust) | Trust a partner signed by a private CA | JVM setting, PEM bundle, truststore build |
| [5. Scale](/tutorial/scale) | Size the integration and autoscale it | Requests and limits, heap sizing, KEDA triggers, disruption budget |
| [6. Persistent volume](/tutorial/storage) | Mount storage that survives restarts | EmptyDir, persistent volumes, access modes |
| [7. Build from a Git repository](/tutorial/from-git) | Build the same integration from a repository | Git source mode, branch and release builds |
| [8. Expose the integration](/tutorial/expose) | Create a gateway and an API instance | Listeners, TLS termination, host names, HTTP routes |
| [9. Secure the API](/tutorial/secure) | Add API key, Basic, JWT, external authorization | Authentication method per client type |
| [10. Observe](/tutorial/observe) | Read logs, metrics and traces | OTLP pipeline, resource attributes, PromQL |
| [11. Production readiness](/tutorial/production) | Review before real traffic | Sizing, availability, environments, RBAC |

:::info How to use this tutorial
Follow the steps in order the first time: each one changes the integration built in the previous
one. Afterwards, each page stands on its own as a worked example of one concept.
:::

## Prerequisites

You need:

- access to the console, in a business unit where you may create integrations and gateways;
- an [environment](/infra/environments) whose **Camel Integration** service is activated — see
  [Camel Integration Service](/infra/camel-integration-service). Without it, nothing can be built
  or run there.

If you only have a few minutes, steps 1, 2 and 6 give you a working API.

## Console application per task

The tutorial moves between applications of the console. This table says which one each kind of task belongs to.

| You want to | Go to |
|---|---|
| Write, deploy and configure an integration | **Runtime Manager** |
| Store properties, files, credentials, certificates | **Secret Manager** |
| Create a gateway, publish and protect an API | **API Manager** |
| Prepare an environment | **Infrastructure** |
| Read logs, metrics and traces | **Monitoring** |

Start with [step 1](/tutorial/first-integration).

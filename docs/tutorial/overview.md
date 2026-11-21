---
title: What You Will Build
sidebar_position: 1
---

This tutorial follows **one example from end to end**. You start with a few lines of an Apache
Camel route typed into the console, and finish with an API that is published on a gateway, served
over HTTPS and protected so that only the callers you chose can reach it.

Each step adds one thing to the previous one. You can stop after any step and have something that
works.

![The example, from the caller to the integration](/img/tutorial/architecture.drawio.png)

## The example

An **orders** service:

- it answers `GET /orders` with a small JSON document;
- it reads a greeting from a **property file**, a region from an **environment variable**, and a
  catalog from a **file**;
- it calls a partner over HTTPS, signed by a **private certificate authority**;
- it is published as `https://orders.example.com`, then protected.

## The steps

| Step | What you do | What you learn |
|---|---|---|
| [1. Write the integration](/tutorial/first-integration) | Type a Camel route in the console | Inline mode, dependencies, what an integration is |
| [2. Deploy and watch it](/tutorial/deploy) | Bind it to an environment and deploy | Build, instances, logs, what "healthy" means |
| [3. Configure it](/tutorial/configure) | Add properties, variables, a file, more memory | Settings, stored configurations, what restarts |
| [4. Trust a private authority](/tutorial/trust) | Give it your company's certificate | The JVM setting and its truststore |
| [5. Move the source to Git](/tutorial/from-git) | Build the same integration from a repository | Git mode, releases, when to choose which |
| [6. Expose it as an API](/tutorial/expose) | Create a gateway and an API instance | Access points, host names, paths, HTTPS |
| [7. Secure the API](/tutorial/secure) | Add an API key, then tokens, then your own check | Which protection for which caller |
| [8. Ready for production](/tutorial/production) | Review what to settle before real traffic | Sizing, availability, environments, access |

## Before you start

You need:

- access to the console, in a business unit where you may create integrations and gateways;
- an [environment](/infra/environments) whose **Camel Integration** service is activated — see
  [Camel Integration Service](/infra/camel-integration-service). Without it, nothing can be built
  or run there.

If you only have a few minutes, steps 1, 2 and 6 give you a working API.

## Where each thing lives

| You want to | Go to |
|---|---|
| Write, deploy and configure an integration | **Runtime Manager** |
| Store properties, files, credentials, certificates | **Secret Manager** |
| Create a gateway, publish and protect an API | **API Manager** |
| Prepare an environment | **Infrastructure** |
| Read logs, metrics and traces | **Monitoring** |

Start with [step 1](/tutorial/first-integration).

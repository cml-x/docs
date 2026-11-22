---
title: Integrations
sidebar_position: 3
---

An **Integration** is a Camel route that the platform builds and runs. Its source is typed in the
console (**inline** mode) or taken from a Git repository (**Git** mode). It is created on its
own, or inside a group — see [Capsules](/runtime/capsule).

## Create an integration

- Choose the source mode: **Inline**, and type the route, or **Git**, and pick the repository
  then a **branch or release** to build from.
- Attach it to an existing Capsule, or create a new one on the spot.
- Configure component-level secrets inline while creating it — Git credentials, properties, and
  resource files the route needs at runtime.

Integrations are what actually route messages, transform data and call out to other systems inside
a Capsule — everything else (gateways, policies, storage) exists to support them.

## Integration settings

{/* screenshot: runtime-integration-settings */}

Once created, an integration is tuned through its settings. Several of them give it files or
values stored in [Secret Manager](/config-sources/templates):

| Setting | What it gives the integration |
|---|---|
| **Configuration** | Configurations of the kind Properties, loaded as property files. |
| **Resources** | Configurations of the kind Resources File, each mounted at the place you choose. |
| **Environment** | Environment variables, written in the setting or read from a stored configuration. |
| **Compute** | The number of instances, and the CPU and memory of each. |
| **JVM** | Extra JVM flags, remote debugging, and the certificate authorities it trusts — see [Trust a Private Certificate Authority](/runtime/trust-private-certificates). |

Every setting has a page of its own: see [Integration settings](/runtime/settings). What happens
between a route and a running service is explained in
[How Integrations Are Built and Run](/runtime/how-integrations-run).

Several settings can give files to the same integration: what each one mounts is added to what
the others mount, whatever the order they were added in.

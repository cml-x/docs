---
title: Integrations
sidebar_position: 3
---

Inside a [Capsule](/runtime/capsule), an **Integration** is a Camel route component sourced
directly from a Git repository.

## Adding an Integration

- Pick the source **repository**, then a **branch or release** to build from.
- Attach it to an existing Capsule, or create a new one on the spot.
- Configure component-level secrets inline while creating it — Git credentials, properties, and
  resource files the route needs at runtime.

Integrations are what actually route messages, transform data and call out to other systems inside
a Capsule — everything else (gateways, policies, storage) exists to support them.

## Settings of an integration

Once created, an integration is tuned through its settings. Several of them give it files or
values stored in [Secrets & Configuration](/config-sources/templates):

| Setting | What it gives the integration |
|---|---|
| **Property files** | Configurations of the kind Properties, loaded as property files. |
| **Files** | Configurations of the kind Resources File, each mounted at the place you choose. |
| **JVM** | Extra JVM flags, remote debugging, and the certificate authorities it trusts — see [Trust a Private Certificate Authority](/runtime/trust-private-certificates). |

Several settings can give files to the same integration: what each one mounts is added to what
the others mount, whatever the order they were added in.

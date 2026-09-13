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

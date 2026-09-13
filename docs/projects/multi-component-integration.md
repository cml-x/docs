---
title: Build an Integration with Multiple Components
sidebar_position: 8
---

A real integration is rarely one component — it's usually a route plus supporting pieces like a
gateway, a policy, or storage. In Camel X, that composition happens at two levels.

## In Project Manager: multiple project types

A single piece of work can span several Project Manager project types — for example, an
**Integration** (Camel routes) that implements an **API Specification** (its OpenAPI contract), or
a **Pipe** that chains together several **Kamelets**. Each is its own Git repository, versioned and
released independently.

## In Runtime Manager: multiple components in one Capsule

The more common case is assembling multiple component types into a single
[Capsule](/runtime/capsule):

1. Create (or open) a Capsule in [Runtime Manager](/runtime/getting-start).
2. Add your Camel route as an [Integration](/runtime/integrations), sourced from its Git
   repository and release.
3. Add any other components the flow needs — an API Gateway, a Load Balancer, a security or
   traffic policy, a Job/Cron Task — using the same dynamic, definition-driven configuration form
   for each type. See [Capsules](/runtime/capsule) for the full, verified list of addable
   component types.
4. Attach [Storage](/runtime/storages) if the flow needs to persist data.

## Result

All the components deploy and run together as one Capsule, with a single deployment status and
revision history — see [Capsules](/runtime/capsule).

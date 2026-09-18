---
title: Getting Started
sidebar_position: 1
---

Environments Manager provisions the infrastructure the rest of the platform runs on: it connects
Kubernetes clusters as [Targets](/infra/targets), groups them into named
[Environments](/infra/environments), and configures the per-environment services that actually run
Apache Camel integrations.

![Environment and Targets](/img/infra/env-targets.svg)

## Create your first target

1. Register a **target** by pointing it at a connected Kubernetes cluster — pick from a live list
   showing each cluster's health status and region. A target can't be created on an unhealthy
   cluster.
2. Create an **environment** by naming it and binding it to that target. By default a target backs
   only one environment at a time; an explicit "allow target conflict" switch lifts this if you
   need several environments to share the same physical target.

## Or use the guided setup wizard

The `/new` wizard walks through all of it end to end in four steps: **Environment basics** →
**Container Registry** (image push/pull) → **Maven configuration** (for builds) → **Apache Camel
Integration Platform** deployment. This produces a fully working environment, not just the bare
record.

Once an environment exists, head to [Runtime Manager](/runtime/getting-start) to deploy your first
Capsule into it.

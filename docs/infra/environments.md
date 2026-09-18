---
title: Environments
sidebar_position: 2
---

An **Environment** (e.g. "Production", "Staging") is a named, described scope bound to one
[Target](/infra/targets), under which the platform's per-environment services are configured.

![Environment and Targets](/img/infra/env-targets.svg)

## Per-environment platform services

Each service is configured and status-monitored independently:

- **Apache Camel Integration Platform** — the Camel K integration engine itself, configured via
  Registry, Maven, and Build Config **traits**.
- **Log Exporter** — routes and forwards application logs out of the environment, via Aggregator
  and Collector components.
- **Network Policy** — ingress/egress traffic rules for the environment (configuration only, no
  running service to monitor).

Each configured service shows a live health indicator (healthy, warning, or not yet configured)
and drills into its own trait-based configuration page.

## Target binding

By default, one target backs only one environment. Turning on "allow target conflict" when
creating an environment lets several environments share the same physical target — useful for
smaller setups where a full cluster per environment isn't justified.

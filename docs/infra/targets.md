---
title: Targets
sidebar_position: 3
---

A **Target** is a named deployment target bound to one connected Kubernetes **cluster** — the
physical/virtual substrate an [environment](/infra/environments) deploys onto.

## Creating a target

- Pick a cluster from the live list of connected clusters, each showing a health status and
  region.
- A target can't be created on a cluster that isn't healthy.
- Once created, a target is ready to be bound to one (or, with "allow target conflict", several)
  environments.

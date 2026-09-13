---
title: Storages
sidebar_position: 4
---

**Storage** attaches persistent volumes (PVCs) to a [Capsule](/runtime/capsule), for stateful
workloads that need data to survive restarts and redeployments.

## What you can do

- Attach one or more persistent volumes to a Capsule.
- Volumes are scoped to the Capsule's project and environment, the same as every other component.

Use Storage whenever an Integration needs to write files, cache state, or otherwise keep data
around between runs — anything that doesn't need this can skip it entirely.

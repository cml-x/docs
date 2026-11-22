---
title: Storages
sidebar_position: 4
---

**Storage** attaches persistent volumes (PVCs) to an [integration group](/runtime/integration-groups), for stateful
workloads that need data to survive restarts and redeployments.

## Operations

- Attach one or more persistent volumes to an integration group.
- Volumes are scoped to the integration group's project and environment, the same as every other component.

Use Storage whenever an Integration needs to write files, cache state, or otherwise keep data
around between runs — anything that doesn't need this can skip it entirely.

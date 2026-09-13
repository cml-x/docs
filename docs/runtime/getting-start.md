---
title: Getting Started
sidebar_position: 1
---

Runtime Manager is where Apache Camel integration flows are deployed and operated. The deployable
unit here is a **Capsule** — a KubeVela-backed application that groups one or more Camel routes,
gateways, jobs and storage volumes, bound to a specific project and environment.

## Deploy your first Capsule

1. Pick the project and [environment](/infra/environments) to deploy into.
2. Follow the two-step wizard: fill in the Capsule's details, then configure each component with a
   dynamic, definition-driven form (the fields shown depend on the component type you pick).
3. Add [Integrations](/runtime/integrations) — Camel routes sourced directly from a Git repository
   (choose the repo, then a branch or release).
4. Attach [Storage](/runtime/storages) if the flow needs to persist data across restarts.

Once deployed, you can watch real-time deployment status, drill into per-component health, and
roll back to a previous revision from the Capsule's detail page.

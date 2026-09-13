---
title: Environment Manager
sidebar_position: 2
---

### Environment unavailable

- **Possible cause** — the target it's bound to is unhealthy, or the target's cluster is
  unreachable.
- **Check** — open [Environments](/infra/environments) and look at the target's health status.
- **Fix** — resolve the underlying cluster issue (see below), then re-check the environment's
  status; it's derived from its target's health.

### Cluster problem

- **Possible cause** — the cluster backing a target isn't healthy. Camel X won't let you create a
  **new** target on an unhealthy cluster in the first place.
- **Check** — the [Targets](/infra/targets) list shows each connected cluster's live health status
  and region.
- **Fix** — fix connectivity/health at the cluster level (outside Camel X), then confirm the
  target picks up the healthy status. The exact reconciliation delay is **[À CONFIRMER]**.

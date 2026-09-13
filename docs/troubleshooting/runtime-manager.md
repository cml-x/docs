---
title: Runtime Manager
sidebar_position: 3
---

### Deployment failed

- **Possible cause** — a component in the Capsule failed to build or start.
- **Check** — open the [Capsule](/runtime/capsule)'s page; per-component health shows
  **running**, **succeeded**, or **failed** individually, not just an overall status.
- **Fix** — fix the failing component's configuration and redeploy, or roll back to the last known
  good deployment from the Capsule's **revision history**.

### Runtime unavailable

- **Possible cause** — the environment's Apache Camel Integration Platform service isn't healthy.
- **Check** — in [Environments](/infra/environments), each platform service (Camel K Integration
  Platform, Log Exporter, Network Policy) shows its own live status: healthy, warning, or not yet
  configured.
- **Fix** — resolve the platform service's configuration in Environment Manager before retrying
  the deployment.

### Flow doesn't start

- **Possible cause** — the component depends on a release, Git source, or secret that isn't
  correctly attached.
- **Check** — confirm the Integration's Git repository, branch/release, and any component-level
  secrets (Git credentials, properties, resources) are set correctly on the component.
- **Fix** — correct the source or secret reference and redeploy. The specific error surfaced for a
  misconfigured source is **[À CONFIRMER]**.

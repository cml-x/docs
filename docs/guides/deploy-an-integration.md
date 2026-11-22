---
title: Deploy an Integration
sidebar_position: 2
---

Deploying builds an image from the source of the integration and rolls it out in an environment.

## Prerequisites

- An integration — see [Create an integration](/guides/create-an-integration).
- An [environment](/infra/environments) with its
  [Camel Integration Service](/infra/camel-integration-service) activated and healthy.

## Procedure

1. Open the integration and choose **Bind to environment**.
2. For a Git source, choose what to build: a branch in development, a release elsewhere.
3. Add the settings the environment needs — [property files](/runtime/settings/configuration),
   [environment variables](/runtime/settings/environment),
   [compute resources](/runtime/settings/compute).
4. Choose **Apply changes**.

## What happens

Applying an integration runs two phases. Knowing which phase failed tells you where to look.

| Phase | Work done | Fails on |
|---|---|---|
| Build | Maven resolves dependencies, the image is built and pushed to the registry of the environment | Unresolved dependency, source that does not compile, registry credentials |
| Rollout | The image is started with its settings | Missing property or file, memory limit, failing readiness |

A change of settings alone skips the build phase.

## Promotion across environments

Bind the same integration to the next environment and point it at the same release. Each
environment builds and deploys on its own [runtime plane](/infra/runtime-planes), with its own
settings.

## Rollback

Each deployment is a revision. Roll back to an earlier revision from the page of the integration.

## Verification

- The integration is **running** and **ready**.
- Its service answers inside the environment: `curl http://<integration>/<path>`.

If not, see [Builds and deployments](/troubleshooting/runtime-manager).

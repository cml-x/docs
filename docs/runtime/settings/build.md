---
title: Build Configuration
sidebar_position: 7
---

Pass properties to the build of an integration, choose the image it is built on, and size the build.

## How it works

This setting changes how the image of this integration is built: build-time properties, Maven profiles, the resources given to the build. Most integrations never need it. Reach for it when a dependency needs a build-time property or when a large build runs out of memory.

:::info Changes here rebuild the image
Unlike most settings, this one triggers a new build at the next apply.
:::

## Prerequisites

- An [integration](/runtime/integrations), created and bound to an environment.

## Procedure

{/* screenshot: runtime-settings-build */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **Build**.
3. Fill **Build Properties**, **Base Image**, or the CPU and memory of the build.
4. Choose **Apply changes**.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Build Properties** | Properties given to the build, written `key=value`. | — |
| **Base Image** | The image the integration is built on. It must hold a Java runtime. | `mcr.microsoft.com/openjdk/jdk:17-distroless` |
| **Incremental Image Build** | Reuse what was already built to build faster. | As the environment |
| **Builder CPU Request** | The CPU a build asks for. | 200m |
| **Builder Memory Request** | The memory a build asks for. | 512Mi |
| **Builder CPU Limit** | The most CPU a build may use. | 1000m |
| **Builder Memory Limit** | The most memory a build may use. | 2Gi |

## Behavior and limits

- This setting rebuilds the image.
- A build that fails for lack of memory needs a higher **Builder Memory Limit**.
- What applies to every integration of an environment is set once, on its [Camel Integration Service](/infra/camel-integration-service).

## See also

- [Integrations](/runtime/integrations) — every setting at a glance
- [Camel Integration Service](/infra/camel-integration-service)

---
title: Integrations
sidebar_position: 3
---

An **integration** is a set of Camel routes that the platform builds and runs, together with the
settings it runs with. This page describes what an integration is made of and what each part
controls.

## Anatomy of an integration

| Part | What it holds | Changing it |
|---|---|---|
| **Source** | The routes: inline files, or a Git repository with a branch or release | Rebuilds the image |
| **Dependencies** | Camel components and Maven artifacts beyond those detected in the routes | Rebuilds the image |
| **Settings** | How it runs: properties, files, variables, compute, JVM, probes… | Restarts without rebuilding |
| **Bindings** | The environments it is deployed in | Deploys or undeploys |

The distinction between the first two rows and the third is the one to remember: a rebuild takes
minutes, a restart seconds.

## Create an integration

In **Runtime Manager**, **Integrations**, **Create Integration**. Three choices are made at
creation.

**Integration group.** **None — create it on its own**, or an existing
[integration group](/runtime/integration-groups). On its own, the integration is deployed and
versioned by itself.

**Source mode.** **Inline**: you type the routes in the console. **Git**: you choose a
repository, then a branch or a release. Inline suits prototypes; anything that reaches
production belongs in Git, where it has a history and releases — see
[Build from a Git repository](/tutorial/from-git).

**Expose HTTP Endpoint.** On: the integration gets a service inside the environment, named after
it, so that other workloads and the gateway can call it. Turn it off for an integration that only
consumes — a queue listener, a timer.

:::info A service inside the environment is not a public address
With **Expose HTTP Endpoint** on, the integration is reachable from the environment only.
Publishing it is done in API Manager, with a gateway and an API instance.
:::

## Integration settings

{/* screenshot: runtime-integration-settings */}

Settings are added with **Add Capability**. Each one covers one aspect of how the integration
runs, and each has [a page of its own](/runtime/settings). The ones used most:

| Setting | What it gives the integration | Page |
|---|---|---|
| **Configuration** | Property files, read with placeholders | [Property files](/runtime/settings/configuration) |
| **Resources** | Files mounted at a path you choose | [Mounted files](/runtime/settings/resources) |
| **Environment** | Environment variables | [Environment variables](/runtime/settings/environment) |
| **Compute** | Replicas, CPU and memory | [Compute resources](/runtime/settings/compute) |
| **JVM** | JVM flags, debugging, trusted certificate authorities | [JVM options](/runtime/settings/jvm) |
| **Volumes** | Persistent and temporary storage | [Volumes](/runtime/settings/volumes) |

Several settings can give files to the same integration. What each one mounts is added to what
the others mount, whatever the order they were added in.

:::tip Keep values out of the routes
Anything that differs between environments — an address, a credential, a batch size — belongs in
a setting, read by the route through a placeholder. The same release then runs everywhere.
:::

## Bindings, revisions and rollback

An integration is **bound** to an environment before it can be deployed there. Each **Apply
changes** that changes something creates a **revision** in that environment. Rolling back
returns the integration to an earlier revision, reusing the image that was built for it.

**Undeploy** removes the integration from the selected environment and keeps its definition.
**Delete** removes the integration itself.

:::warning Revisions are per environment
Rolling back in production does not change development, and the reverse. Check the environment
selected before rolling back.
:::

## Related pages

- [Build and run lifecycle](/runtime/how-integrations-run)
- [Integration settings](/runtime/settings)

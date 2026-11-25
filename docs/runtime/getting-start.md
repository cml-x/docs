---
title: Integration Runtime Model
sidebar_position: 1
---

Runtime Manager is where integrations are **deployed, configured and operated**. Project Manager
holds their source; Runtime Manager decides what runs, where, and with which settings.

![On its own, in an integration group, in an API group](/img/runtime/groups.drawio.png)

## What an integration is here

An integration is the **deployable unit**: a set of Camel routes plus everything needed to run
them — dependencies, properties, files, memory, replicas. It is not a file and not an image: the
platform builds the image from it each time its source or dependencies change.

Two properties of this model explain most of what you will do in Runtime Manager:

- **Source and settings are separate.** The routes say what the integration does; its settings
  say how it runs in a given environment. Changing a setting never rebuilds the image.
- **One integration, several environments.** An integration is bound to each environment it must
  run in, and is built and deployed separately in each. Development and production can run
  different versions of the same integration with different settings.

## Object Model

Runtime Manager works with three objects.

| Object | What it is | When you need it |
|---|---|---|
| [**Integration**](/runtime/integrations) | Camel routes that the platform builds and runs | Always |
| [**Integration group**](/runtime/integration-groups) | Integrations and storage deployed and versioned together | When several integrations must always be released together |
| [**Storage**](/runtime/storages) | A volume that keeps data across restarts | When a route keeps files or state on disk |

:::tip[Start with an integration on its own]
Create integrations with **None — create it on its own**. Group them only when deploying one
without the others would break something.
:::

## Quick start: create and deploy an integration

The environment must have its
[Camel Integration Service](/infra/camel-integration-service) activated.

1. Open **Integrations**, then **Create Integration**. Name it and choose **None — create it on
   its own**.
2. Keep the source mode **Inline** and type a route:

   ```yaml
   - route:
       from:
         uri: platform-http:/hello
         steps:
           - setBody:
               constant: "Hello from Camel X"
   ```

3. **Bind** the integration to an [environment](/infra/environments).
4. **Apply changes**. The environment builds an image from your route, then starts it.
5. Follow the build and the instance on the page of the integration.

:::info[The first build takes a few minutes]
Maven downloads the dependencies and the image is pushed to the registry of the environment.
Later builds reuse what was downloaded; a change of settings alone does not build at all.
:::

## What "Apply changes" does

Nothing you edit in Runtime Manager takes effect until it is applied. **Apply changes** sends the
current definition of the integration to the selected environment, which works out what to do:

| You changed | The environment |
|---|---|
| A route, a dependency | Rebuilds the image, then rolls it out |
| A setting: properties, variables, memory, replicas | Rolls out the existing image with the new settings |
| Nothing | Does nothing |

Each apply that changes something creates a **revision**, which you can roll back to.

## Why an integration needs a storage

The file system of a container is temporary. Everything a route writes to it disappears with
the instance. That is fine for most integrations, which keep their state in the systems they
connect. It is not for those that keep state on disk:

- a file-based idempotent repository, remembering what was already processed;
- a staging directory where files wait between two steps;
- a local cache that is expensive to rebuild.

For those, create a storage and mount it.

## Next steps

Once an integration is deployed, these pages take it further.

| You want to | Read |
|---|---|
| Understand what happens between apply and running | [Build and run lifecycle](/runtime/how-integrations-run) |
| Give it properties, variables and files | [3. Configuration](/tutorial/configure) |
| Call a service signed by a private authority | [JVM truststore](/runtime/trust-private-certificates) |
| Build from a repository | [7. Build from Git](/tutorial/from-git) |
| Publish it as an API | [8. Expose as an API](/tutorial/expose) |

---
title: Overview
sidebar_position: 1
---

Runtime Manager is where Apache Camel integrations are deployed and operated.

![On its own, in an integration group, in an API group](/img/runtime/groups.drawio.png)

## Objects

Runtime Manager works with three objects.

| | What it is |
|---|---|
| **Integration** | A Camel route that the platform builds and runs. Its source is typed in the console (**inline**) or taken from a repository (**Git**). |
| **Integration group** | Integrations and storage that are deployed and versioned together. |
| **Storage** | A volume that keeps data across restarts. |

An integration is created **on its own** or **in a group**. On its own, it is deployed and
versioned by itself — the simplest way to start. A group suits integrations that are always
released together.

## Quick start: create and deploy an integration

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
4. **Apply changes**. The platform builds an image from your route, then starts it.
5. Follow the build and the instance on the page of the integration.

The environment must have its
[Camel Integration Service](/infra/camel-integration-service) activated.

## Next steps

Once an integration is deployed, these pages take it further.

| You want to | Read |
|---|---|
| Follow one example from this route to a secured API | [Tutorial](/tutorial/overview) |
| Give the integration properties, variables and files | [Configure it](/tutorial/configure) |
| Call a service signed by a private authority | [Trust a Private Certificate Authority](/runtime/trust-private-certificates) |
| Build from a repository | [Move the source to Git](/tutorial/from-git) |
| Publish it as an API | [Expose it as an API](/tutorial/expose) |

Reference: [Integrations](/runtime/integrations), [Integration groups](/runtime/integration-groups),
[Storages](/runtime/storages).

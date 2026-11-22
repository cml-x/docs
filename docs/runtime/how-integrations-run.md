---
title: Build and Run Lifecycle
sidebar_position: 1.5
---

You give the platform a Camel route. It gives you back a running service. This page explains
what happens in between, so that you know what to change when something is slow, fails, or needs
tuning.

{/* screenshot: runtime-concept-build-and-run */}

## Why the platform builds for you

With plain Camel you maintain a Maven project, a Dockerfile, a pipeline and Kubernetes manifests
for each integration. Here you provide routes only. The environment generates the project,
resolves the dependencies from the routes, builds an image and writes the deployment — the model
of Apache Camel K.

What this buys is speed and uniformity: every integration is built and instrumented the same
way. What it costs is that the build happens **in the environment**, at deployment time: a
dependency that cannot be resolved, or a registry that refuses the image, fails the deployment
rather than a pipeline. The phases below are therefore worth knowing.

:::info Built per environment
Each environment builds its own image, with its own registry, Maven settings and base image.
The same release built in two environments gives two images from the same source.
:::

## Lifecycle phases

Between the moment you apply an integration and the moment it answers, the platform goes through these phases in order. A failure stops the sequence at one of them.

| Step | What happens | What it depends on |
|---|---|---|
| **1. Source** | The route is taken from what you typed (inline) or from a repository (Git). | The source mode of the integration |
| **2. Dependencies** | The Camel components the route uses are found from its addresses and added to the ones you listed. | The **Dependencies** of the integration |
| **3. Build** | Maven resolves the dependencies, the application is compiled and packaged on a base image. | The Maven settings, build settings and base image of the environment |
| **4. Publish** | The image is pushed to the registry of the environment. | The registry of the environment |
| **5. Run** | The image is started with your settings: properties, files, variables, memory. | The settings of the integration |
| **6. Serve** | When **Expose HTTP Endpoint** is on, a service gives the integration a stable name inside the environment. | The integration |

Steps 3 and 4 only happen when the route or its dependencies change. Changing a setting goes
straight to step 5.

## Camel K operator per environment

Each environment has an **operator of its own**, installed by its
[Camel Integration Service](/infra/camel-integration-service). The operator builds the
integrations of that environment and keeps them running; nothing is shared with another
environment.

The service also holds what every build of the environment uses:

| Setting of the environment | Used at |
|---|---|
| **Registry** — where images are published | Step 4 |
| **Maven** — repositories, mirrors and credentials | Step 3 |
| **Build** — where builds run, and how much they may use | Step 3 |
| **Runtime** — the runtime and the base image | Steps 3 and 5 |

A setting of an integration overrides the one of the environment for that integration only — see
[Change how an integration is built](/runtime/settings/build).

## Build duration and caching

- **The first build of an integration** downloads its dependencies: a few minutes.
- **An integration with the same dependencies as another** reuses what was already built: much
  faster.
- **A change of route only** rebuilds a thin layer.
- **A change of setting** rebuilds nothing.

## Route DSLs

A route is written in **YAML**, **Java** or **XML**. The three describe the same routes; choose
by what your team reads most easily.

| | Good for |
|---|---|
| **YAML** | Short routes, reviewed as configuration |
| **Java** | Routes with logic, helper classes, tests |
| **XML** | Teams coming from earlier Camel projects |

## Dependency notation

Dependencies are written with a prefix that says where they come from.

| Written | Means |
|---|---|
| `camel:kafka` | The Camel component `kafka` |
| `mvn:com.example:orders-model:1.4.0` | A Maven library, by group, artifact and version |

Components used in the address of a route — `kafka:orders`, `platform-http:/orders` — are found
for you. Add by hand what does not appear in an address: a data format, a driver, a library of
your own. A library that is not in a public repository needs its repository listed in
**Repositories**, or in the Maven settings of the environment.

## Configuration sources

An integration can receive configuration in four ways. They differ in what they suit and in how a route reads the value.

| Way | Set with | Read in a route as |
|---|---|---|
| Property files | [Configuration](/runtime/settings/configuration) | `{{name}}` |
| Environment variables | [Environment](/runtime/settings/environment) | `${env:NAME}` |
| Files | [Resources](/runtime/settings/resources) | A path, such as `/etc/orders/catalog.json` |
| Runtime properties | [Camel Runtime](/runtime/settings/camel-runtime) | Read by the runtime itself |

:::tip Read the build log first
When a deployment fails, the page of the integration shows the build with its log. Most failures
are there, and the log names the missing artifact or the line that does not compile.
:::

## Troubleshooting by phase

Start from what the page of the integration shows, then look where the table says.

| What you see | Where to look | Usual cause |
|---|---|---|
| The build fails | The build log, on the page of the integration | A dependency that cannot be found, a route that does not compile |
| The integration never becomes ready | Its logs | A property or a file it expects is missing; a system it calls at startup is unreachable |
| It restarts in a loop | Its instances, then its logs | Not enough memory; an error at startup |
| It runs but calls fail | Its logs and traces | The network rules of the environment; a certificate it does not trust |

## See also

- [Integration settings](/runtime/settings) — one page per setting
- [Camel Integration Service](/infra/camel-integration-service)
- [Tutorial](/tutorial/overview)

---
title: Camel Integration Service
sidebar_position: 5
---

The **Camel Integration Service** sets an [environment](/infra/environments) up for Apache Camel
integrations. It gives the environment an operator of its own, which builds the integrations and
runs them, and tells that operator where images go and how builds run.

An environment cannot run integrations until this service is activated.

## Activate it

{/* screenshot: env-camel-activate */}

Open the environment, go to **Camel Integration**, then **Activate Camel integrations**.

| Field | What it is | Default |
|---|---|---|
| **Camel K Version** | The version of Camel K that builds and runs the integrations of this environment. | `2.11.0` |

Then click **Apply** on the environment. The page shows whether the service is healthy.

## Settings

Six settings adjust the service. Each has its own page under **Camel Integration**.

### Registry

{/* screenshot: env-camel-registry */}

The container registry the integrations of this environment are published to.

| Field | What it is | Default |
|---|---|---|
| **Address** | The address of the registry, such as `ghcr.io` or `registry.example.com:5000`. | `ghcr.io` |
| **Organization** | The organization, or the prefix of the repositories, inside the registry. | — |
| **Pull Secret** | The credentials of the registry: a configuration of the kind [Image Registry](/config-sources/templates#image-registry). | — |
| **CA Secret** | The certificate authority of the registry, when it is a private one: a [TLS Certificate](/config-sources/templates#tls-certificate) or a [Secure Resources File](/config-sources/templates#secure-resources-file). | None |
| **Insecure** | Allow connections to the registry without verifying its certificate. | Off |

### Maven

{/* screenshot: env-camel-maven */}

The Maven settings the builds of this environment use.

| Field | What it is |
|---|---|
| **Settings Secret** | A configuration of the kind [Maven Settings](/config-sources/templates#maven-settings). Its `settings.xml` is used for every build. |
| **Settings Security Secret** | A Maven Settings configuration whose `settings-security.xml` is used, when the passwords of the settings are encrypted. Optional. |
| **Maven Options** | Extra options passed to Maven on every build. |

Both fields choose among the same kind of configuration, because one Maven Settings
configuration can hold the two files. Choose the same one in both when it holds both.

### Build

How the integrations of this environment are built.

| Field | What it is | Default |
|---|---|---|
| **Build Strategy** | Where builds run: in a pod of their own, or inside the operator. | In a pod of its own |
| **Build Order** | In which order waiting builds run: one after the other, by dependencies, or first in first out. | One after the other |
| **CPU Request**, **Memory Request** | What a build asks for. | 200m, 512Mi |
| **CPU Limit**, **Memory Limit** | The most a build may use. | 1000m, 1Gi |
| **Build Timeout** | The longest a build may take, such as `10m`. | — |

### Runtime

What the integrations of this environment run on.

| Field | What it is | Default |
|---|---|---|
| **Runtime** | The runtime integrations are built for: Quarkus, or the legacy Quarkus runtime. | Quarkus |
| **Runtime Version** | Only for the legacy runtime. | — |
| **Base Image** | The image integrations are built on. | `mcr.microsoft.com/openjdk/jdk:17-distroless` |

### Operator Version

The version of the operator that builds and runs the integrations of this environment.

### Operator Resources

The CPU and memory the operator of this environment may use.

| Field | Default |
|---|---|
| **CPU Request** | 100m |
| **Memory Request** | 256Mi |
| **CPU Limit** | 500m |
| **Memory Limit** | 1Gi |

## Apply and recycle

Changing a setting does nothing until it is applied.

- **Apply** deploys the changes of the service that is open.
- **Recycle** removes from the environment what the service deployed.

From the page of the environment itself, both act on every service that is configured.

## Good to know

- Each environment has its **own** operator: what you set here does not affect another
  environment.
- A change of registry or of base image applies to the integrations built **after** it. Deploy an
  integration again for it to be rebuilt.

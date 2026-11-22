---
title: "JVM: Options, Classpath and Truststore"
sidebar_position: 5
---

Pass flags to the JVM of an integration, attach a debugger or an agent, extend its classpath, and choose the certificate authorities it trusts.

## Prerequisites

- An [integration](/runtime/integrations), created and bound to an environment.

## Procedure

{/* screenshot: runtime-settings-jvm */}

1. In **Runtime Manager**, go to **Integrations** and open the integration.
2. Choose **Add Capability**, then **JVM**.
3. Fill what you need: **JVM Options**, **Remote Debugging**, **Trusted CA Certificates**.
4. Choose **Apply changes**.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **JVM Options** | Flags the JVM starts with, such as `-Xmx512m`. | — |
| **Extra Classpath** | Extra places the JVM looks for classes, separated by colons. | — |
| **Application JAR** | The JAR that runs the application. Empty for an integration built by the platform. | — |
| **Agents** | Agents downloaded and attached, each written `name;url[;options]`. | — |
| **Remote Debugging** | Let a debugger attach to the JVM. | Off |
| **Debug Address** | Where the JVM listens for a debugger. | `*:5005` |
| **Wait for the Debugger** | Hold the integration until a debugger attaches. | Off |
| **Trusted CA Certificates** | A PEM file of certificate authorities, chosen in a stored configuration. | — |
| **Keep Public Authorities** | Also trust the public authorities Java ships with. | On |
| **Truststore Password** | The password of the truststore that is built. | `changeit` |

## Behavior and limits

- Applying this setting restarts the integration; it does not rebuild its image.
- Set the heap with `-Xmx` below the memory limit of the integration, leaving room for the rest of the JVM.
- Remote debugging is for development environments: it lets whoever reaches the port control the JVM.

## See also

- [Integrations](/runtime/integrations) — every setting at a glance
- [Trust a Private Certificate Authority](/runtime/trust-private-certificates)
- [Size an integration](/runtime/settings/compute)

---
title: Camel Dependencies
sidebar_position: 7
---

A Camel route talks to systems through **components**: `kafka:`, `https:`, `sql:`,
`platform-http:`. Each component is a library that must be part of the built integration. This
page explains how the platform decides which libraries to include, and what you must declare
yourself.

## What is resolved for you

When an integration is built, its routes are inspected and the component behind every endpoint
URI is added to the build. You write the URI; the dependency follows.

```yaml
- route:
    from:
      uri: kafka:orders-in                          # camel-kafka is added
      steps:
        - to: https://partner.example.com/orders    # camel-http is added
```

This covers most routes. You do not maintain a `pom.xml`.

## What you must declare

Inspection only sees endpoint URIs. Anything a route uses **without a URI** is invisible to it
and must be listed in **Dependencies** on the integration — otherwise the build succeeds and the
integration fails at startup, when the class is not found.

Typical cases: a data format (`json`, `csv`), an expression language, a JDBC driver, a bean
from a library of yours.

| Notation | Adds | Example |
|---|---|---|
| `camel:<name>` | A Camel component, data format or language | `camel:jackson` |
| `mvn:<group>:<artifact>:<version>` | Any Maven artifact | `mvn:org.postgresql:postgresql:42.7.3` |

:::tip A class not found at startup is a missing dependency
`ClassNotFoundException` or `No DataFormat with name ... could be found` in the logs of an
integration that built fine means a dependency to declare here.
:::

## Dependencies that are always present

Three dependencies are part of every integration and cannot be removed. They are what produces
its metrics and traces without any change to the routes:

```text
camel:opentelemetry2
camel:micrometer
mvn:io.quarkus:quarkus-micrometer-opentelemetry
```

## Where artifacts are downloaded from

A `mvn:` dependency is resolved from the Maven repositories known to the environment. There are
two places to add one, depending on who needs it:

- **Repositories**, on the integration — for a repository only this integration needs.
- The Maven settings of the [Camel Integration Service](/infra/camel-integration-service) — for
  repositories, mirrors and credentials shared by every integration of the environment.

:::info A private repository needs credentials and trust
An artifact server behind authentication or signed by a private authority is configured in the
Maven settings of the environment, not on each integration.
:::

## Kamelets

A Kamelet is used like a component, with the `kamelet:` scheme. Unlike a component, it is not a
library fetched at build time: it is an object that must exist in the environment the
integration runs in. Apply it there from the page of its repository before deploying a route
that uses it.

```yaml
- to: kamelet:log-sink
```

## Related pages

- [Build and run lifecycle](/runtime/how-integrations-run)
- [Build configuration](/runtime/settings/build)

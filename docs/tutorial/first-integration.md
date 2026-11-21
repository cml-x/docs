---
title: 1. Write the Integration
sidebar_position: 2
---

An **integration** is an Apache Camel route that the platform builds and runs for you. In
**inline** mode you type the route in the console: there is no repository, no build file and no
image to prepare.

## Create it

Open **Runtime Manager**, go to **Integrations**, then **Create Integration**.

1. **Name** it `orders-api` and describe what it does.
2. **Integration group** — choose **None — create it on its own**. On its own, the integration is
   deployed and versioned by itself. In a group, it is deployed and versioned with the other
   integrations of the group; a group suits integrations that are always released together.
3. **Source mode** — keep **Inline**.

## Write the route

In **Sources**, keep the language **YAML** and name the file `orders.camel.yaml`:

```yaml
- route:
    id: orders
    from:
      uri: platform-http:/orders
      parameters:
        httpMethodRestrict: GET
      steps:
        - setHeader:
            name: Content-Type
            constant: application/json
        - setBody:
            constant: '{"service":"orders","status":"ok"}'
```

What it says:

- `platform-http:/orders` — listen for HTTP requests on the path `/orders`;
- `httpMethodRestrict: GET` — only answer `GET`;
- the two steps set the content type and the body of the answer.

Routes can also be written in **Java** or **XML**; choose the language of each source file. One
integration can hold several source files.

## Dependencies

**Dependencies** lists the Camel components and libraries the integration needs.

- The components your route uses in its addresses — here `platform-http` — are found and added for
  you.
- Three monitoring dependencies are already there and cannot be removed: they are what makes
  logs, metrics and traces work.
- Add one yourself when a route needs something that does not appear in an address, such as a
  data format: `camel:jackson` for a Camel component, `mvn:group:artifact:version` for a Maven
  library.

**Repositories** takes the addresses of extra Maven repositories, when a library is not in the
ones the environment already knows.

## Expose HTTP Endpoint

Leave **Expose HTTP Endpoint** on. It gives the integration a service inside the environment, so
that other integrations — and later the gateway — can call it. Turn it off for an integration that
only consumes, such as one reading a queue or running on a timer.

:::info Reachable inside the environment only
At this stage the integration has no address on the internet. Publishing it is
[step 6](/tutorial/expose).
:::

Create the integration. It now exists, but nothing runs yet:
[deploy it](/tutorial/deploy).

## What you have

```text
Runtime Manager
└── orders-api        an integration on its own, inline, one YAML route
```

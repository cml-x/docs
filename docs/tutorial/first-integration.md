---
title: 1. Create the Integration
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An **integration** is an Apache Camel route that the platform builds and runs for you. In
**inline** mode you type the route in the console: there is no repository, no build file and no
image to prepare.

## Integration creation form

{/* screenshot: tutorial-create-integration */}

Open **Runtime Manager**, go to **Integrations**, then **Create Integration**.

1. **Name** it `orders-api` and describe what it does.
2. **Integration group** — choose **None — create it on its own**. On its own, the integration is
   deployed and versioned by itself. In a group, it is deployed and versioned with the other
   integrations of the group; a group suits integrations that are always released together.
3. **Source mode** — keep **Inline**.

## Route source: YAML, Java or XML DSL

{/* screenshot: tutorial-inline-source */}

In **Sources**, choose the language of the file and type the route. The three versions below
do exactly the same thing: use the one you are most at ease with. The rest of the tutorial uses
YAML.

<Tabs groupId="camel-dsl">
<TabItem value="yaml" label="YAML" default>

```yaml title="orders.camel.yaml" showLineNumbers
- route:
    id: orders
    from:
      # highlight-next-line
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

</TabItem>
<TabItem value="java" label="Java">

```java title="Orders.java" showLineNumbers
import org.apache.camel.builder.RouteBuilder;

public class Orders extends RouteBuilder {
    @Override
    public void configure() {
        // highlight-next-line
        from("platform-http:/orders?httpMethodRestrict=GET")
            .routeId("orders")
            .setHeader("Content-Type", constant("application/json"))
            .setBody(constant("{\"service\":\"orders\",\"status\":\"ok\"}"));
    }
}
```

</TabItem>
<TabItem value="xml" label="XML">

```xml title="orders.camel.xml" showLineNumbers
<routes xmlns="http://camel.apache.org/schema/spring">
  <route id="orders">
    <!-- highlight-next-line -->
    <from uri="platform-http:/orders?httpMethodRestrict=GET"/>
    <setHeader name="Content-Type">
      <constant>application/json</constant>
    </setHeader>
    <setBody>
      <constant>{"service":"orders","status":"ok"}</constant>
    </setBody>
  </route>
</routes>
```

</TabItem>
</Tabs>

What it says:

- `platform-http:/orders` — listen for HTTP requests on the path `/orders`;
- `httpMethodRestrict: GET` — only answer `GET`;
- the two steps set the content type and the body of the answer.

One integration can hold several source files, each in its own language.

## Camel and Maven dependencies

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

## HTTP service (Expose HTTP Endpoint)

Leave **Expose HTTP Endpoint** on. It gives the integration a service inside the environment, so
that other integrations — and later the gateway — can call it. Turn it off for an integration that
only consumes, such as one reading a queue or running on a timer.

:::info Reachable inside the environment only
At this stage the integration has no address on the internet. Publishing it is
[step 8](/tutorial/expose).
:::

Create the integration. It now exists, but nothing runs yet:
[deploy it](/tutorial/deploy).

## Resulting resources

```text title="What exists so far"
Runtime Manager
└── orders-api        an integration on its own, inline, one YAML route
```

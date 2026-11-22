---
title: Quick Start
sidebar_position: 2
---

Create a Camel integration typed in the console, deploy it to an environment, call it, then
expose it over HTTPS through a gateway. No repository, no Maven project and no image to prepare.

## Prerequisites

- A business unit, and an [environment](/infra/environments) whose
  [Camel Integration Service](/infra/camel-integration-service) is activated.
- For the exposure part: a domain attached to the environment and a TLS certificate for the host
  name.

## 1. Create the integration

In **Runtime Manager**, go to **Integrations**, then **Create Integration**.

1. **Name**: `orders-api`.
2. **Integration group**: **None — create it on its own**.
3. **Source mode**: **Inline**.
4. In **Sources**, add a YAML file:

```yaml title="orders.camel.yaml"
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

5. Leave **Expose HTTP Endpoint** on, then create.

The `platform-http` component is resolved from the URI. Java and XML DSL are accepted as well —
see [step 1 of the tutorial](/tutorial/first-integration).

## 2. Bind and deploy

1. Open `orders-api`, choose **Bind to environment** and pick the environment.
2. Choose **Apply changes**.

The first deployment builds an image: Maven resolves the dependencies, the image is pushed to the
registry of the environment, then the integration starts. Later changes that do not touch the
route or its dependencies only restart it.

## 3. Call the service

The integration has a service named after it, reachable inside the environment:

```bash title="From inside the environment"
curl http://orders-api/orders
```

```json title="Response"
{"service":"orders","status":"ok"}
```

## 4. Expose it over HTTPS

1. In **Secret Manager**, create a **TLS Certificate** configuration for `orders.example.com` and
   make it available to the environment.
2. In **API Manager**, go to **API Gateways** and create `public-gateway`: exposure **Public**,
   one **HTTPS** access point on port 443 with the certificate.
3. Go to **API Instances** and create `orders`: the gateway and its HTTPS access point, the host
   name `orders.example.com`, and `orders-api` as backend.

```bash title="From anywhere"
curl https://orders.example.com/orders
```

## 5. Read its telemetry

In **Monitoring**, open **Logs Insight**, **Metrics** and **Distributed Traces**: the integration
is instrumented at build time, with `service.name` set to `orders-api`.

## Next steps

The [learning path](/getting-started/your-first-integration) takes this integration, one concept
per page, to a production deployment.

---
title: 2. Deploy
sidebar_position: 3
---

An integration runs in an [environment](/infra/environments). Deploying means: build an image
from your route, then start it there.

## Environment binding

{/* screenshot: tutorial-bind-environment */}

Open `orders-api`. Choose **Bind to environment** and pick the environment — `dev` for example.

An integration can be bound to several environments. Each one is deployed separately, which is how
the same integration goes from development to production.

## Build and rollout

{/* screenshot: tutorial-build-progress */}

With the environment selected, choose **Apply changes**.

Two things then happen, the first time:

1. **Build** — the platform turns your route into a container image: it resolves the
   dependencies with Maven, compiles, and publishes the image to the registry of the environment.
   This takes a few minutes the first time.
2. **Run** — the image is started. The integration is ready when its route has started.

The overview of the integration follows both. The build has a log of its own: when a build fails,
that is where the reason is — most often a dependency that cannot be found, or a route that does
not parse.

:::tip Later deployments are faster
A change that does not touch the route or its dependencies — a property, a variable, more memory —
does not rebuild the image. The integration only restarts.
:::

## Integration phases and readiness

{/* screenshot: tutorial-integration-running */}

The page of the integration shows where the deployment stands. "Running" and "ready" are two different things: the process can be up while its routes have not started.

| What you see | What it means |
|---|---|
| Build in progress | The image is being made |
| Running, ready | The route started and answers |
| Running, not ready | The process started but the route did not: read the logs |
| Error | The build failed, or the integration stops as soon as it starts |

## Call the in-cluster service

The integration has no public address yet. To check it from inside the environment, call its
service by name — the name of the integration:

```bash title="From inside the environment"
curl http://orders-api/orders
```

```json title="Answer"
{"service":"orders","status":"ok"}
```

## Logs and instance state

The page of the integration gives its instances and their state. For the rest, open
**Monitoring**:

| You want | Look at |
|---|---|
| What the route logged | **Logs Insight** |
| How many requests, how fast, how many failed | **Metrics** |
| Where the time of one request went | **Distributed Traces** |

Nothing has to be added to the route for this: it comes from the monitoring dependencies that
every integration carries.

## Redeploy after a source change

Edit the source of the integration, then **Apply changes** again. Each deployment is kept as a
**revision**: you can see what was deployed and when, and go back to an earlier one.

## Undeploy

**Undeploy** removes the integration from the selected environment and keeps its definition.
**Delete** removes the integration itself.

Next: [externalize the configuration](/tutorial/configure).

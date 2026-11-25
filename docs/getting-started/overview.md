---
title: Platform Architecture
sidebar_position: 1
---

Camel X is a platform for building, running and exposing Apache Camel integrations on
Kubernetes, without writing Kubernetes manifests or maintaining build pipelines. You write
routes; the platform builds images, deploys them, routes traffic to them and collects their
telemetry.

It is a set of applications in one console rather than a single tool. Each application owns one
part of the life of an integration, and they share the same objects: an integration created in
one is what another one exposes or observes.

![The console applies what you declare to a runtime plane, where Envoy Gateway receives the callers and Camel K runs the integrations; status and telemetry come back](/img/getting-started/architecture.drawio.png)

The console holds what you declare. A runtime plane, a Kubernetes cluster, executes it: Envoy
Gateway receives the callers, Camel K builds and runs the integrations, and their status, logs,
metrics and traces come back to the console.

## What runs underneath

You do not need to operate these, but knowing them tells you what to expect and which upstream
documentation applies:

| Concern | Built on | What that means for you |
|---|---|---|
| Building and running routes | Apache Camel K, Camel Quarkus runtime | Routes in YAML, Java or XML DSL; Camel K traits appear as integration settings |
| Exposing APIs | Envoy Gateway, Kubernetes Gateway API | Gateways, listeners, routes and policies behave as Envoy Gateway defines them |
| Telemetry | OpenTelemetry, OpenObserve | OTLP metrics and traces, JSON logs, PromQL |
| Where it runs | Any Kubernetes cluster | Managed runtime planes, or your own cluster |

:::info[The console hides the manifests, not the semantics]
A rate limit is an Envoy rate limit; a readiness probe is a Kubernetes probe. When you need the
fine print of a behavior, the upstream project's documentation applies.
:::

## Applications and responsibilities

Each application answers one question. The table is ordered as an integration lives: written,
deployed, exposed, secured, observed.

| Application | The question it answers | Its objects |
|---|---|---|
| [Project Manager](/projects/getting-start) | Where is the source, and which version? | Repositories, releases, schemas |
| [Environment Manager](/infra/getting-start) | Where does it run? | Runtime planes, targets, environments |
| [Runtime Manager](/runtime/getting-start) | What is deployed, and how is it configured? | Integrations, integration groups, storages |
| [Secret Manager](/config-sources/getting-start) | Where do credentials and settings come from? | Configurations, distributed to environments |
| [API Manager](/api-manager/getting-start) | How is it reached from outside? | Gateways, API instances, policies, auth gateways |
| [Access Manager](/access/users) | Who may manage all this? | Users, roles, service accounts |
| [Monitoring](/monitoring/getting-start) | What is it doing? | Logs, metrics, traces, dashboards, alerts |
| [Assets Explorer](/library/assets) | Does it already exist? | Templates and releases, searchable |

## Two scopes: business unit and environment

Your company is an **organization**, divided into **business units** — see
[Organization and units](/access/organization-and-business-units). Everything you create belongs
to a business unit: a team, a department, a product. Most of what runs additionally belongs to an **environment** — a stage such as
development or production, on one cluster.

The console always shows which business unit and which environment are selected, and what you
see follows that selection. This is the most common cause of "my integration has disappeared":
it is in another environment.

:::tip[Check the selectors first]
Before concluding that something is missing — an integration, a gateway, a log — check the
business unit and the environment selected at the top of the console.
:::

## End-to-end flow

A typical integration crosses the applications in this order:

1. **Project Manager** — the routes are committed to a repository and released.
2. **Environment Manager** — an environment exists, with its Camel Integration Service active.
3. **Secret Manager** — the credentials and property files it needs are stored and made
   available to that environment.
4. **Runtime Manager** — the integration is created, bound to the environment and applied: the
   environment builds and runs it.
5. **API Manager** — a gateway and an API instance publish it; policies protect it.
6. **Monitoring** — its logs, metrics and traces are there without any change to the routes.

The [Quick Start](/getting-started/quick-start) does steps 4 and 5 with an inline route, and the
[Learning Path](/getting-started/your-first-integration) adds the others one at a time.

## Application per task

| You want to | Go to |
|---|---|
| Write or change routes, create a release | Project Manager |
| Deploy, configure, scale or roll back an integration | Runtime Manager |
| Publish an API, add a policy, issue tokens to callers | API Manager |
| Store a credential, a certificate, a property file | Secret Manager |
| Create an environment, connect a cluster, open network access | Environment Manager |
| Add a teammate, grant a role, enforce MFA | Access Manager |
| Read logs, chart a metric, follow a trace | Monitoring |

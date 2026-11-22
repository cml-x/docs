---
title: Learning Path
sidebar_position: 3
---

Each step adds one concept to the `orders-api` integration of the
[quick start](/getting-started/quick-start). The steps can be read in order or on their own.

## Build and deploy

| Concept | Page |
|---|---|
| Inline source, route DSLs, dependency resolution, HTTP service | [1. Create a Camel integration](/tutorial/first-integration) |
| Environment binding, image build, rollout, revisions | [2. Deploy](/tutorial/deploy) |
| Build phases, operator, build cache | [Build and run lifecycle](/runtime/how-integrations-run) |

## Configuration

| Concept | Page |
|---|---|
| Property files, placeholders, environment variables, mounted files | [3. Externalize configuration](/tutorial/configure) |
| JVM options, private CA, truststore | [4. Private CA in the JVM truststore](/tutorial/trust) |
| Every setting, one page each | [Integration settings](/runtime/settings) |

## Capacity and state

| Concept | Page |
|---|---|
| Replicas, requests and limits, heap sizing, KEDA autoscaling, disruption budget | [5. Scale](/tutorial/scale) |
| EmptyDir, persistent volumes, access modes | [6. Persistent volume](/tutorial/storage) |

## Source control

| Concept | Page |
|---|---|
| Git source mode, branch builds, release builds | [7. Build from a Git repository](/tutorial/from-git) |
| Repositories, releases, templates | [Project Manager](/projects/getting-start) |

## Exposure and security

| Concept | Page |
|---|---|
| Gateway, listeners, TLS termination, HTTP route, upstreams | [8. Expose the integration](/tutorial/expose) |
| API key, Basic, JWT with client credentials, external authorization | [9. Secure the API](/tutorial/secure) |
| Route matching, policy evaluation order | [Request routing](/api-manager/how-requests-are-routed) |
| Rate limiting, timeouts, retries, circuit breaker | [Policy tasks](/api-manager/policy-tasks) |

## Operations

| Concept | Page |
|---|---|
| Logs, metrics, traces, resource attributes, PromQL | [10. Observe](/tutorial/observe) |
| Checklist before production | [11. Production readiness](/tutorial/production) |
| Roles and environment scope | [RBAC model](/access/rbac-principles) |

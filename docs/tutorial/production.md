---
title: 8. Ready for Production
sidebar_position: 9
---

The example works. Before it takes real traffic, settle the points below. Each is a decision more
than a task: the right answer depends on your context.

## The source

| Question | Recommendation |
|---|---|
| Where is the route? | In a repository, not inline — [step 5](/tutorial/from-git) |
| What is deployed in production? | A **release**, never a branch |
| Is the same thing tested and released? | Yes when the same release is deployed to each environment in turn |

## Configuration and secrets

- Nothing sensitive in the route or in a variable written in clear: use **Secure Properties**, or
  a variable that reads a stored configuration.
- One configuration per environment where values differ — addresses, credentials, limits — and
  the same names in each.
- Certificates and keys are stored configurations too: they are replaced without touching the
  integration.

## Sizing and availability

| Setting | Development | Production |
|---|---|---|
| **Replicas** | 1 | 2 or more |
| **Memory Limit** | The default | Measured under load, with margin |
| **Disruption Budget** | — | Keep at least one instance up during maintenance |
| **Health Probes** | The defaults | Adjusted when the integration is slow to start |

On the gateway, **Autoscaling** adds instances when traffic rises; keep at least two.

## The API

| Question | Recommendation |
|---|---|
| Is it served over HTTPS only? | Publish on an HTTPS access point; do not keep an HTTP one for the same API |
| Who can call it? | Tokens, with the audience check on — [step 7](/tutorial/secure) |
| What if a client goes wild? | A **rate limit** |
| What if the integration is slow? | A **timeout**, shorter than the caller's own |
| What if it fails briefly? | A **retry**, only for calls that can safely be repeated |

:::warning Retries and writes
A retry sends the same request again. That is safe for a read, and can create a duplicate for a
write unless the integration recognises a request it has already handled.
:::

## The environment

- The [Camel Integration Service](/infra/camel-integration-service) of the production environment
  points at a registry and Maven settings of its own.
- Its [Log Exporter](/infra/log-exporter) uses **persistent** buffer storage, so that no log is
  lost when it restarts, and sends logs to where your teams read them.
- Its [network rules](/infra/network) say what the environment may call. Systems in your
  datacenter are reached through a [private link](/infra/private-links).

## Who can change what

Calling the API and managing it are separate.

| Role | Typical permissions |
|---|---|
| Developer | Create and manage integrations, in development only |
| Release manager | Apply changes on integrations and APIs, in production |
| Security | Manage policies, auth gateways and lists of clients |

Permissions can be restricted to some environments — see
[RBAC principles](/access/rbac-principles).

## Watching it run

- A dashboard for the API: requests, errors, response time.
- An alert when errors or response time rise.
- Traces kept long enough to investigate an incident.

See [Monitoring](/monitoring/getting-start).

## Checklist

- [ ] The integration is built from a release.
- [ ] No secret in the source or in clear variables.
- [ ] Two instances or more, and a disruption budget.
- [ ] Memory limit measured under load.
- [ ] HTTPS only, with a certificate that is renewed before it expires.
- [ ] Tokens, audience check on, one client per calling application.
- [ ] Rate limit and timeout on the API.
- [ ] Logs exported, alerts in place.
- [ ] Production permissions restricted to those who need them.

## Where to go next

| You want to | Read |
|---|---|
| Every setting of an integration | [Integrations](/runtime/integrations) |
| Every policy rule | [Policies](/api-manager/policies) |
| Every kind of stored configuration | [Templates](/config-sources/templates) |
| Reach a system in a private network | [Private Links](/infra/private-links) |
| Understand permissions | [RBAC principles](/access/rbac-principles) |

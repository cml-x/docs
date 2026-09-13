---
title: Understanding Camel X
sidebar_label: Overview
sidebar_position: 1
---

Camel X is not a single application — it's a modular integration platform made of independent
micro-applications. Each one owns one capability; together they let you build, secure, deploy, run
and observe Apache Camel integrations.

## The platform, at a glance

```
CAMEL X
│
├── Project Manager       — build integrations, manage releases
├── Runtime Manager        — deploy and run integration flows
├── API Manager            — expose and secure APIs
├── Authentication Manager — identity providers for APIs and apps
├── Access Manager         — users, roles and permissions
├── Environment Manager    — where things run
└── Monitoring             — observe what's running
```

Two more apps support these seven: **Secrets Manager** (credentials and configuration for your
flows) and **Assets Explorer** (a searchable catalog of everything already published).

## What each app is responsible for

| App | Responsible for |
|---|---|
| [Project Manager](/projects/getting-start) | Git-backed repositories: Integrations, API Specifications, Kamelets, Pipes, and their releases |
| [Runtime Manager](/runtime/getting-start) | Capsules — the deployed, running form of an integration |
| [API Manager](/api-manager/getting-start) | Gateways and API Instances that expose flows as APIs |
| [Authentication Manager](/auth/getting-start) | Auth Gateways — identity providers that protect APIs and apps |
| [Access Manager](/access/users) | Users, project-scoped authorizations, connected apps, MFA |
| [Environment Manager](/infra/getting-start) | Targets and Environments — the infrastructure everything deploys onto |
| [Monitoring](/monitoring/getting-start) | Dashboards, and links into logs, metrics and traces |
| [Secrets Manager](/config-sources/getting-start) | Configurations and secrets distributed to environments |
| [Assets Explorer](/library/assets) | Search across everything already published |

## How they work together

The apps are independent, but a real integration touches several of them in sequence:

> **Project Manager** creates the release. **Environment Manager** provides the target
> environment. **Runtime Manager** deploys and runs the release. **Monitoring** lets you observe
> it running.

This is the exact path [Your First Integration](/getting-started/your-first-integration) walks
through end to end.

## Which app do I need?

- Writing or changing Camel routes, or cutting a release → **Project Manager**.
- Deploying a release, checking if it's running, rolling back → **Runtime Manager**.
- Exposing a flow as an HTTP/gRPC API, attaching a domain → **API Manager**.
- Standing up an identity provider to protect an API or app → **Authentication Manager**.
- Adding a teammate, granting project access, enforcing MFA → **Access Manager**.
- Registering a cluster, creating an environment → **Environment Manager**.
- Checking dashboards, logs, metrics or traces → **Monitoring**.

---
title: Getting Started with Camel X
sidebar_label: Quick Start
sidebar_position: 2
---

The shortest path from nothing to a running, observed integration. Each step links to the app
that owns it.

## 1. Understand Camel X

Camel X is a set of independent micro-applications, not one monolithic app. See
[Understanding Camel X](/getting-started/overview) for what each one does.

## 2. Create your project

In [Project Manager](/projects/getting-start), create a project. Pick **Integration** if you're
building Camel routes — the most common starting point.

## 3. Create your first integration

Still in Project Manager: start from the template gallery (grouped by topic — REST, database,
messaging, cloud, files, scheduling…), from Apache Camel Main sources, or from a blank canvas.
Creating an Integration project opens the dedicated **IT Designer**, where the routes themselves
are built.

## 4. Create a release

Once the integration is ready, cut a **release** — a tagged version of the repository — from
[Integrations](/projects/repos) in Project Manager.

## 5. Create or configure an environment

In [Environment Manager](/infra/getting-start), register a **target** (bound to a Kubernetes
cluster), then create an **environment** bound to it. The guided `/new` wizard provisions a
target, an environment, and the Camel K Integration Platform in one flow.

## 6. Deploy the release

From the release's repository, open the **Applications** tab and use the one-click **Deploy**
action — or go to [Runtime Manager](/runtime/getting-start) and create a **Capsule** directly,
attaching the integration from its Git repository, branch or release.

## 7. Execute the integration

Once deployed, the Capsule's Camel routes run. Runtime Manager shows real-time deployment status
and per-component health (running, succeeded, failed) — see [Capsules](/runtime/capsule).

## 8. Observe the integration with Monitoring

In [Monitoring](/monitoring/getting-start), a dashboard template gets you a working view in one
click; from there, jump to logs, metrics or distributed traces for the running integration.

---

For the same path walked through as one continuous example, see
[Your First Integration](/getting-started/your-first-integration).

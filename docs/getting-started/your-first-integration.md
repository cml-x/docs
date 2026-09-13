---
title: Your First Integration
sidebar_label: Your First Integration
sidebar_position: 3
---

This walkthrough takes one integration from nothing to a running, observed flow, using four Camel
X apps in sequence: **Project Manager** builds it, **Environment Manager** provides somewhere to
run it, **Runtime Manager** deploys and runs it, **Monitoring** lets you watch it work.

## 1. Build the integration in Project Manager

Open [Project Manager](/projects/getting-start) and create a project of type **Integration**.
You have three ways to start:

- Pick a template from the gallery, grouped by topic (REST, database, messaging, cloud, files,
  scheduling…).
- Start from Apache Camel Main sources.
- Start from a blank canvas.

Creating the project opens the dedicated **IT Designer**, where the Camel routes themselves are
built — Project Manager manages the repository, IT Designer builds what's inside it.

Once the integration works the way you want, go to [Integrations](/projects/repos) and create a
**release** — a tagged, deployable version of the repository. Everything downstream deploys a
release, not a work-in-progress branch.

## 2. Give it somewhere to run, in Environment Manager

An integration needs an **environment** to deploy into. In
[Environment Manager](/infra/getting-start):

- If you don't have one yet, register a **target** by pointing it at a healthy, connected
  Kubernetes cluster.
- Create an **environment** bound to that target — or run the guided `/new` wizard, which sets up
  the target, the environment, and the Apache Camel Integration Platform for you in four steps.

Environment Manager answers *where* things run; the next step, Runtime Manager, answers *how*.

## 3. Deploy and run it in Runtime Manager

There are two ways to deploy your release:

- **From Project Manager**: open the release's repository, go to its **Applications** tab, and use
  the one-click **Deploy** action.
- **From [Runtime Manager](/runtime/getting-start)** directly: create a **Capsule** — the
  deployable unit that groups your Camel routes with any gateways, jobs or storage it needs — and
  attach the integration by picking its Git repository and the branch or release to build from.

Either way, you land on the Capsule's page in Runtime Manager, where you can watch real-time
deployment status and per-component health, and browse its revision history if you ever need to
roll back.

## 4. Observe it in Monitoring

Open [Monitoring](/monitoring/getting-start) for the same project and environment. If this is the
first dashboard for this project, the page leads with a **template gallery** — pick one and it's
created in one click, rather than building a dashboard from scratch. From there, links take you
into logs, metrics and distributed traces for the environment your integration is running in.

---

That's the full loop: **build** (Project Manager) → **provide an environment** (Environment
Manager) → **deploy and run** (Runtime Manager) → **observe** (Monitoring). Everything else in
Camel X — exposing the flow as an API, securing it, managing who can touch it — builds on top of
this same loop.

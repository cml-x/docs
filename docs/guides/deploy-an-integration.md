---
title: Deploy an Integration
sidebar_position: 2
---

For when you already have a release and just need to get it running — the deployment half of
[Create an Integration](/guides/create-an-integration).

```
Project Manager        Environment Manager        Runtime Manager        Monitoring
Release                 target environment          Deployment              Observation
```

## 1. Confirm the release

The release you want to deploy already exists in [Integrations](/projects/repos) in Project
Manager — a tagged, frozen snapshot of the repository.

## 2. Pick the target environment

In [Environment Manager](/infra/getting-start), make sure the environment you're deploying into
exists and is bound to a healthy target. Select it from the environment switcher — Runtime Manager
deploys into whichever environment is currently selected.

## 3. Deploy

Two equivalent paths:

- From the release's repository in Project Manager, open its **Applications** tab and use the
  one-click **Deploy** action.
- From [Runtime Manager](/runtime/getting-start), create or update a **Capsule** and attach the
  integration by selecting that release as its source.

Either way, the Capsule shows real-time deployment status and per-component health. If something
goes wrong, its **revision history** lets you roll back to the previous working deployment.

## 4. Confirm it's running, in Monitoring

Open [Monitoring](/monitoring/getting-start) for the same project and environment to confirm the
deployment is live and check its dashboards, logs, metrics or traces.

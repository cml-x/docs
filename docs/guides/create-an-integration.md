---
title: Create an Integration
sidebar_position: 1
---

The complete path from an empty project to a running, observed integration — one app at a time.

```
Project Manager                Environment Manager        Runtime Manager           Monitoring
project → integration          environment                deploy → execute          observe
  → configure → release
```

## 1. Project Manager

1. Create a project of type **Integration**.
2. Build the routes: start from the template gallery, from Apache Camel Main sources, or from a
   blank canvas — this opens **IT Designer**, the visual canvas where routes are actually built.
3. Configure the components your route needs inside IT Designer.
4. Test the integration. A dedicated testing feature inside Project Manager/IT Designer is
   **[À CONFIRMER]** — not verified in this audit; confirm what's available in your IT Designer
   version before relying on a specific workflow here.
5. Once it works, cut a **release** — see [Create a Release](/projects/create-release). Everything
   downstream deploys a release, not a moving branch.

## 2. Environment Manager

Make sure a target environment exists: register a **target** bound to a healthy cluster, then
create an **environment** bound to it — or run the guided `/new` wizard, which provisions the
target, environment and Camel K Integration Platform together. See
[Create Your First Environment](/infra/getting-start).

## 3. Runtime Manager

Select that environment from the environment switcher, then either:

- Open the release's repository in Project Manager, go to its **Applications** tab, and use the
  one-click **Deploy** action; or
- Create a **Capsule** directly in [Runtime Manager](/runtime/getting-start) and attach the
  integration by picking its Git repository and release.

The Capsule's Camel routes start running once deployed. Watch real-time deployment status and
per-component health on the Capsule's page.

## 4. Monitoring

Open [Monitoring](/monitoring/getting-start) for the same project and environment. If it's the
first dashboard here, pick one from the template gallery — it's created in one click. From there,
jump into logs, metrics or distributed traces for the running integration.

---

Already have a release and just need to deploy it? See the shorter
[Deploy an Integration](/guides/deploy-an-integration) guide instead.

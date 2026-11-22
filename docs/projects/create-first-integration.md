---
title: Repository to Release
sidebar_position: 4
---

This walkthrough follows one project from an empty repository to a release running in two
environments, and then through a first change. It shows how the pieces described in the
[overview](/projects/getting-start) fit in practice.

![From a repository to a running integration](/img/projects/source-to-runtime.drawio.png)

## Prerequisites

- A business unit in which you may create repositories.
- Two [environments](/infra/environments) — here `development` and `production` — whose
  [Camel Integration Service](/infra/camel-integration-service) is activated.

## 1. Create the repository

In **Integration Center**, go to **Integrations** and create a repository of type **Routes**,
named `orders`, **from scratch**. When the repository is created, the Web IDE opens on it.

## 2. Commit a route

Add the file `routes/orders.camel.yaml` and commit it.

```yaml title="routes/orders.camel.yaml"
- route:
    id: orders
    from:
      uri: platform-http:/orders
      parameters:
        httpMethodRestrict: GET
      steps:
        - setBody:
            constant: '{"service":"orders","status":"ok"}'
```

Back on the page of the repository, **Actions**, **Changes** lists the commit. Nothing is
deployed yet: a commit only changes the repository.

## 3. Build the branch in development

In **Runtime Manager**, create an integration `orders-api`. Set **Source mode** to **Git**,
choose the repository `orders` and its default branch. Bind the integration to `development`
and choose **Apply changes**.

The environment builds the head of the branch and starts the integration. From now on, each
time you apply it again, it builds whatever the branch contains — which is what you want while
developing.

## 4. Create a release

When the route does what it should, return to the repository and create a release with
**Version** `1.0.0`. The tag `v1.0.0` now points at that commit, for good.

## 5. Deploy the release in production

Bind `orders-api` to `production`. For this environment, point the Git source at the release
`1.0.0` instead of the branch, then **Apply changes**.

Production now runs exactly the commit you released. Further commits on the branch are built in
development and do not reach production.

:::info[One integration, two sources]
The same integration is bound to both environments, and each binding has its own source: the
branch in development, a release in production. That is what keeps the two apart.
:::

## 6. Ship a change

1. Commit the change. Apply the integration in `development` and verify.
2. Create the release `1.1.0`.
3. In `production`, point the source at `1.1.0` and **Apply changes**.

Each deployment is a revision of the integration. If `1.1.0` misbehaves in production, roll back
to the previous revision: the image of `1.0.0` runs again without a rebuild.

## What you learned

- A commit does not deploy; applying an integration does.
- A branch build moves with the branch; a release build is fixed.
- Promotion is pointing the next environment at the release that was verified.

Next: [Releases](/projects/create-release) for the versioning rules, and
[Build from a Git repository](/tutorial/from-git) for the options of the Git source.

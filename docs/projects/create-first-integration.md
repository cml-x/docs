---
title: Repository to Release
sidebar_position: 4
---

One project followed from an empty repository to a release running in an environment.

## Prerequisites

- A business unit in which you may create repositories.
- An [environment](/infra/environments) whose
  [Camel Integration Service](/infra/camel-integration-service) is activated.

## 1. Create the repository

In **Integration Center**, go to **Integrations** and create a repository of type **Routes**,
named `orders`, **from scratch**. The Web IDE opens on it.

## 2. Commit a route

Add `routes/orders.camel.yaml` and commit:

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

The commit appears under **Actions**, **Changes**.

## 3. Build the branch in a development environment

In **Runtime Manager**, create an integration `orders-api` with **Source mode** set to **Git**,
choose the repository and its default branch, bind it to the development environment and
**Apply changes**. Each new deployment builds the head of the branch.

## 4. Tag a release

On the repository page, create a release with **Version** `1.0.0`. The tag is `v1.0.0`.

## 5. Deploy the release

Bind `orders-api` to the test or production environment and point its Git source at the release
`1.0.0` instead of the branch. **Apply changes** builds exactly that tag.

## 6. Ship a change

Commit the change, verify it on the branch build, create release `1.1.0`, then move the
environments to it one after the other. Each deployment is a revision that can be rolled back.

## Related pages

- [Build from a Git repository](/tutorial/from-git) — branch builds versus release builds
- [Releases and semantic versioning](/projects/create-release)

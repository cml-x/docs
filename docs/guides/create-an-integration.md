---
title: Create an Integration
sidebar_position: 1
---

The shortest path from a route to an integration that exists in the platform. Two starting
points lead to the same object.

Use this guide when you have a route in mind and want it to exist in the platform. It stops
before deployment: at the end, the integration is defined but nothing runs.

## Choose the source mode

An integration takes its source from one of two places. The choice is made at creation and can be changed later.

| | Inline | Git |
|---|---|---|
| Source lives in | The integration itself | A [repository](/projects/repos) |
| History, review, releases | No | Yes |
| Use for | Prototypes, small glue routes | Anything that reaches test or production |

## Inline Source

1. In **Runtime Manager**, **Integrations**, **Create Integration**.
2. Name it, choose **None — create it on its own**, keep **Source mode** on **Inline**.
3. Add one or several source files — YAML, Java or XML DSL.
4. Leave **Expose HTTP Endpoint** on if a route consumes HTTP, then create.

Detail and a complete route: [tutorial, step 1](/tutorial/first-integration).

## Git Source

1. In **Integration Center**, [create a repository](/projects/tasks/create-a-repository) of type
   **Routes**, or [from a template](/projects/tasks/create-from-a-template).
2. Commit the routes, from the Web IDE or with Git.
3. In **Runtime Manager**, create the integration with **Source mode** on **Git** and choose the
   repository, then a branch or a release.

Detail: [tutorial, step 7](/tutorial/from-git).

## Camel Dependencies

Components used in endpoint URIs are resolved for you. Declare the rest in **Dependencies** —
see [Camel dependencies](/projects/use-a-component).

## Verification

The integration is listed in **Runtime Manager**, not yet deployed. Next:
[Deploy an integration](/guides/deploy-an-integration).

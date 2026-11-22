---
title: Overview
sidebar_position: 1
---

Project Manager — **Integration Center** in the menu — is where the **source** of your
integrations lives. Runtime Manager runs things; Project Manager keeps what they are built from:
one Git repository per project, its history, its releases, and the contracts of your APIs and
messages.

You need it as soon as an integration must be reviewed, versioned or deployed to more than one
environment. An integration typed inline in the console has none of that: it has no history and
cannot be promoted as a fixed version.

![From a repository to a running integration](/img/projects/source-to-runtime.drawio.png)

## How source reaches an environment

The diagram reads from left to right. You commit routes to a **repository**. An **integration**
in Runtime Manager points at that repository — at a branch while you develop, at a release once
the version is settled. Each time the integration is applied in an environment, that environment
fetches the source, builds an image and runs it.

Two consequences follow, and they explain most of what the other pages describe:

- **Nothing is deployed by a commit.** Committing only changes the repository. A deployment
  happens when someone applies the integration in an environment.
- **What is built depends on what the integration points at.** A branch gives whatever the
  branch contains at that moment; a release always gives the same source.

## Project types

Every repository has a type, chosen when it is created. The type tells the platform what the
repository contains and how it is used; it is stored as a topic on the repository.

| Type | Content of the repository | How it is used |
|---|---|---|
| **Routes** | Camel routes in YAML, Java or XML DSL | Built and run as an [integration](/runtime/integrations) |
| **Kamelet** | A Kamelet: a parameterized route template | Applied to an environment, then used in routes as `kamelet:<name>` |
| **Pipe** | A Pipe: a source Kamelet bound to a sink | Deployed in an environment |
| **API specification** | An OpenAPI document | Kept in the [schema registry](/projects/schemas) |

If you write integrations, you want **Routes**. Choose **Kamelet** when several teams need the
same connector logic and you want to publish it once; choose **Pipe** when a flow is only "read
from this, write to that" with no logic in between.

:::tip Start with one repository per deployable integration
A repository is released as a whole. Routes that are deployed together belong together; routes
that are released on different schedules are easier to manage in separate repositories.
:::

## Branches and releases

A **branch** moves: its head is the last commit. A **release** does not: it is a tag,
`v1.2.0`, on one commit.

Build from a branch in development, where you want every commit to be testable at once. Build
from a release everywhere else, so that what was tested is exactly what runs in production and
can be rebuilt identically later. [Releases](/projects/create-release) explains the versioning
rules the platform enforces.

## What Project Manager does not do

It does not deploy, configure or monitor. Properties, secrets, memory and replicas are
**settings of the integration** in Runtime Manager, not files in the repository — which is what
lets one release run with different settings in each environment.

## Where to go next

| You want to | Read |
|---|---|
| Create the repository of a project | [Create a repository](/projects/tasks/create-a-repository) |
| Understand what the repository page offers | [Repositories](/projects/repos) |
| Follow one project from an empty repository to production | [Repository to release](/projects/create-first-integration) |
| Version an API or message contract | [Schema registry](/projects/schemas) |

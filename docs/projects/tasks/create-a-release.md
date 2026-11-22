---
title: Create a Release
sidebar_position: 4
---

Publish a named, fixed version of a repository. A release is what test and production environments deploy.

## How it works

A release fixes one state of the repository under a version number. It is what environments beyond development build, so that what runs is known and can be rebuilt identically.

:::warning Commit before releasing
A release tags what is committed. Work still open in the Web IDE is not part of it.
:::

## Use cases

Each time a state of the project is ready to leave development.

## Prerequisites

- A repository whose changes are committed.

## Procedure

{/* screenshot: projects-tasks-create-a-release */}

1. In **Integration Center**, go to **Integrations** and open the repository.
2. Go to its releases and create one.
3. Give the version and describe what changed.
4. Create the release.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Version** | The name of the release, such as `1.4.0`. | — |
| **Description** | What changed since the previous release. | — |

## Behavior and limits

- A release never changes: deploying it again gives exactly the same source.
- Number releases so that the kind of change is readable: a fix, a new capability, a breaking change.
- A release can be deleted as long as nothing deployed depends on it.

## See also

- [Project Manager: getting started](/projects/getting-start)
- [Move the source to Git](/tutorial/from-git)
- [Deploy an integration](/guides/deploy-an-integration)

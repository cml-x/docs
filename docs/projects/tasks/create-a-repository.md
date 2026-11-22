---
title: Create a Repository
sidebar_position: 1
---

Create the Git repository that holds an integration project: its routes, its history and its releases.

## Use cases

For anything that will be deployed beyond a first try. An integration typed inline in the console has no repository; see [Move the source to Git](/tutorial/from-git).

## Prerequisites

- A business unit in which you may create repositories.

## Procedure

{/* screenshot: projects-tasks-create-a-repository */}

1. In **Integration Center**, go to **Integrations**, then create a repository.
2. Select the **type of project**: routes that connect applications and services, a reusable connector (Kamelet), or a pipeline that links Kamelets (Pipe).
3. Choose **Start from scratch**, or **Create routes from template** and pick a template — see [Start from a template](/projects/tasks/create-from-a-template).
4. In **Repo Configuration**, give the name and an optional description, then create.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Type of project** | Routes, a reusable connector, or a pipeline of connectors. | — |
| **Name** | Lowercase letters, numbers, dashes and underscores. It starts with a letter or a number. | — |
| **Description** | What the project is for. Up to 100 characters. | — |

## Behavior and limits

- The repository is an ordinary Git repository: it can be cloned and worked on with the tools your team already uses.
- The name cannot be changed casually afterwards: integrations and releases refer to it.

## See also

- [Project Manager: getting started](/projects/getting-start)
- [Edit a project in the Web IDE](/projects/tasks/edit-in-the-web-ide)
- [Create a release](/projects/tasks/create-a-release)

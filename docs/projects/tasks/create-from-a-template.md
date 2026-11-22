---
title: Create From a Template
sidebar_position: 2
---

Create a repository that already holds a working integration, taken from a template, instead of an empty one.

## How it works

Starting from a template gives you routes that already run and the conventions of whoever published it. The content is copied: your repository is independent from the first commit.

:::info[Read what the template expects]
Its documentation lists the properties and stored configurations to create before the first deployment.
:::

## Use cases

When a template matches what you are about to build: an API over a database, a file transfer, a queue listener.

## Prerequisites

- A business unit in which you may create repositories.

## Procedure

{/* screenshot: projects-tasks-create-from-a-template */}

1. In **Integration Center**, go to **Integrations**, then create a repository and choose **Create routes from template**.
2. In **Template Selection**, search and filter, then select a template. **What's included** lists what it brings.
3. In **Repo Configuration**, name the repository, then create.
4. Open the repository and adapt the routes to your systems.

## Behavior and limits

- A template is copied when the repository is created: later changes to the template do not reach your repository.
- Any repository of yours can become a template — see [Share a repository as a template](/projects/tasks/share-as-a-template).

## See also

- [Project Manager: getting started](/projects/getting-start)
- [Templates](/library/templates)

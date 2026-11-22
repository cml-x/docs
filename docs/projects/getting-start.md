---
title: Getting Started
sidebar_position: 1
---

Project Manager is where integration work starts. A **project** is a Git-backed repository that
holds one integration, API specification, Kamelet or pipe.

![Project entities hierarchy](/img/projects/project-entities.svg)

## Create your first project

1. Make sure a Git provider (GitHub, GitLab or Bitbucket) is configured — projects can't be listed
   or created without one.
2. Pick a project type:
   - **Integration** — Apache Camel routes. You can start from the template gallery (grouped by
     topic: REST, database, messaging, cloud, files, scheduling…), from Apache Camel Main sources,
     or from a blank canvas.
   - **API Specification** — OpenAPI, AsyncAPI, JSON Schema or Avro.
   - **Kamelet** — a reusable Camel DSL connector.
   - **Pipe** — a declarative Kamelet-to-Kamelet event pipeline.
3. Creating an Integration or API Specification project opens the dedicated **IT Designer** — the
   visual route-building canvas lives there, not in Project Manager itself.

From here, the natural next step is [Runtime Manager](/runtime/getting-start) to deploy what you
just built.

## Tasks

| You want to | Read |
|---|---|
| Create the repository of a project | [Create a repository](/projects/tasks/create-a-repository) |
| Start from something that works | [Start from a template](/projects/tasks/create-from-a-template) |
| Write and change routes | [Edit a project in the Web IDE](/projects/tasks/edit-in-the-web-ide) |
| Publish a version to deploy | [Create a release](/projects/tasks/create-a-release) |
| Let others start from your project | [Share a repository as a template](/projects/tasks/share-as-a-template) |
| Define the contract of an API or a message | [Create a schema](/projects/tasks/create-a-schema) |
| Give a group of people access | [Manage a team](/projects/tasks/manage-a-team) |

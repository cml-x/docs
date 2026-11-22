---
title: "Project Manager: Repositories, Releases, Schemas"
sidebar_position: 1
---

Project Manager — **Integration Center** in the menu — holds the source of what the platform
runs: one Git repository per project, its releases, and the schema registry.

![Project entities hierarchy](/img/projects/project-entities.svg)

## Project types

| Type | Content of the repository | Deployed as |
|---|---|---|
| **Routes** | Camel routes in YAML, Java or XML DSL | An [integration](/runtime/integrations) built from a branch or a release |
| **Kamelet** | A Kamelet: a parameterized route template used as a connector | A Kamelet applied to an environment from the repository page |
| **Pipe** | A Pipe: a source Kamelet bound to a sink Kamelet | A Pipe in an environment |
| **API specification** | An OpenAPI document | Stored in the [schema registry](/projects/schemas) |

The type is recorded as a topic of the repository: `routes`, `kamelet`, `pipe` or
`api-specification`.

## From source to runtime

| Stage | Object | Page |
|---|---|---|
| Write | Commits on a branch, made in the Web IDE or with Git | [Integrations](/projects/repos) |
| Version | A release: a tag `v<version>` in semantic versioning | [Releases](/projects/create-release) |
| Build | An integration in Git source mode, pointed at a branch or a release | [Build from a Git repository](/tutorial/from-git) |
| Run | The image built by the environment, deployed by Runtime Manager | [Build and run lifecycle](/runtime/how-integrations-run) |

A branch build follows the head of the branch; a release build is reproducible.

## Tasks

| Task | Page |
|---|---|
| Create a repository, empty or from a template | [Create a repository](/projects/tasks/create-a-repository), [from a template](/projects/tasks/create-from-a-template) |
| Edit routes | [Edit routes in the Web IDE](/projects/tasks/edit-in-the-web-ide) |
| Tag a version | [Create a release](/projects/tasks/create-a-release) |
| Reuse a repository as a starting point | [Set a repository as a template](/projects/tasks/share-as-a-template) |
| Store an API or message contract | [Create an artifact](/projects/tasks/create-a-schema), [add a version](/projects/tasks/add-a-schema-version) |
| Manage access to repositories | [Manage team members and permissions](/projects/tasks/manage-a-team) |
| Follow one project end to end | [Walkthrough: repository to deployed release](/projects/create-first-integration) |

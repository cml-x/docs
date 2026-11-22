---
title: Repositories
sidebar_position: 2
---

**Integrations**, in the menu of Integration Center, lists the Git repositories of the business
unit. Each repository is one project. This page describes what the page of a repository shows
and what each action does.

## Repository page

{/* screenshot: projects-repository-page */}

The page of a repository is its control panel: it shows what the repository is, lists its
releases, and gives access to the editor and to the actions below. It does not show the files
themselves — those are read and edited in the Web IDE.

| Element | What you find there |
|---|---|
| **Details** | Description, topics, default branch, visibility |
| **Releases** | The releases of the repository, newest first. **Draft** marks a release not yet published, **Pre** a pre-release |
| **Edit in Web IDE** | Opens the repository in the route designer of the platform |
| **Apply** | Kamelet repositories only: applies the Kamelet to an environment |
| **Actions** | The menu described in the next section |

## Actions menu

The **Actions** menu gathers what is done occasionally. Two of its entries only appear for
Kamelet repositories, because only a Kamelet is deployed straight from its repository; routes
are deployed through an integration in Runtime Manager.

| Action | What it does |
|---|---|
| **Changes** | Shows the commit history, searchable by message or author. Use it to check that a change is committed before releasing |
| **Deployments** | Kamelet repositories only. Lists where the Kamelet is applied, per environment, and lets you deploy it |
| **Edit metadata** | Changes the description and the topics |
| **Set as template** | Makes the repository a [template](/projects/create-template) others can start from |
| **Delete** | Deletes the repository |

:::danger[Deleting a repository is irreversible]
The code, the issues and every release are deleted. An integration already built from it keeps
running on its existing image, but can never be rebuilt. Check in Runtime Manager that no
integration still points at the repository.
:::

## Naming rules

The name of a repository becomes part of its address and is what integrations refer to. Choose
it to last: renaming means updating every integration that builds from it.

| Field | Rule |
|---|---|
| **Name** | Starts with a letter or a digit; then letters, digits, dashes, dots and underscores |
| **Description** | Optional, 100 characters at most |

## Topics

Topics are free labels on a repository. They matter for two reasons. The platform uses one of
them to record the project type. And the search of [Assets Explorer](/library/assets) matches
them: a repository with the topics `kafka`, `sftp` or `salesforce` is found by someone looking
for an existing integration with that system, where a bare name such as `flow-12` is not.

## Working with a Git client

A repository is an ordinary Git repository. Cloning it and pushing commits from your own tools
gives the same result as the Web IDE: the commits appear under **Changes** and are built the
same way.

## Related pages

- [Releases](/projects/create-release)
- [Build from a Git repository](/tutorial/from-git)

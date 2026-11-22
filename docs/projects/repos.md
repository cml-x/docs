---
title: Integrations (Git Repositories)
sidebar_position: 2
---

**Integrations** lists the Git repositories of the business unit. Each repository is one project:
routes, a Kamelet, a Pipe or an API specification.

## Repository page

{/* screenshot: projects-repository-page */}

| Element | Content |
|---|---|
| **Details** | Description, topics, default branch, visibility |
| **Releases** | The tags of the repository, newest first, with **Draft** and **Pre** markers |
| **Edit in Web IDE** | Opens the repository in the route designer of the platform |
| **Apply** | Kamelet repositories only: applies the Kamelet to an environment |
| **Actions** | The menu described below |

## Actions menu

| Action | Effect |
|---|---|
| **Changes** | Commit history of the repository, searchable by message or author |
| **Deployments** | Kamelet repositories only: where the Kamelet is applied, per environment, with a **Deploy** action |
| **Edit metadata** | Change the description and the topics |
| **Set as template** | Marks the repository as a [template](/projects/create-template). Not reversible from this menu |
| **Delete** | Deletes the repository with its code, issues and releases. Irreversible |

## Naming rules

| Field | Rule |
|---|---|
| **Name** | Starts with a letter or a digit; letters, digits, dashes, dots and underscores |
| **Description** | Optional, 100 characters at most |

## Topics

Topics classify a repository and feed the search of [Assets Explorer](/library/assets). The
project type is itself a topic. Add the systems and protocols the routes touch — `kafka`, `sftp`,
`salesforce` — so that the repository can be found.

## Related pages

- [Releases and semantic versioning](/projects/create-release)
- [Build from a Git repository](/tutorial/from-git)

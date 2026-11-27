---
title: Troubleshoot Repositories and Releases
sidebar_position: 1
---

### Repository creation refused

The wizard refuses to create the repository.

| Cause | Fix |
|---|---|
| Name already used in the business unit | Another name |
| Invalid name | Start with a letter or a digit; letters, digits, dashes, dots, underscores |
| Description over 100 characters | Shorten it |

### Repository creation fails: `Failed to create temp dir`

The Git service is restarting. Try again a few minutes later; if it lasts, the platform team
checks the Git service.

### A template is shown under its repository name

The template selection shows the `title` of the manifest `.camel.json` when it has one, and the
repository name otherwise — see [Repository Template Model](/projects/create-template).

### A template is listed under *Custom templates* rather than with its family

The template selection groups templates by the `category` of the manifest `.camel.json`; a
template without one is listed with the others of its source — see
[Repository Template Model](/projects/create-template).

### A template's new title, category or topics do not show in the template selection

A template is indexed when it is created as a template, from what it holds then. Set the title,
the category and the topics before marking the repository as a template; otherwise the platform
team indexes it again.

### Release refused: invalid version format

The version must be semantic: `MAJOR.MINOR.PATCH`, optionally `-prerelease` — `1.2.0`,
`1.2.0-rc.1`. No `v` prefix: the tag adds it.

### Release refused: version must be greater than the latest release

Versions only go up. Use the next PATCH, MINOR or MAJOR — see
[Releases](/projects/create-release).

### The release does not contain the last change

A release tags what is committed on the default branch at that moment. Check **Actions**,
**Changes**: a change still open in the Web IDE and not committed is not in the release.

### Integration built from Git does not pick up a commit

What is built depends on what the integration points at.

| Source | Behavior |
|---|---|
| Branch | Built at the head of the branch at each **Apply changes** |
| Release | Fixed: create a new release and point the integration at it |

### Repository not listed in Git source mode

Repositories are listed per business unit. Check the business unit selected, and that your role
gives access to the repository.

### Schema: artifact ID cannot be changed

By design. Create a new artifact and retire the old one — see
[Schema Registry](/projects/schemas).

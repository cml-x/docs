---
title: Release Reference
sidebar_position: 5
---

A **release** is a named, fixed version of a repository: a Git tag on one commit, with a
description of what changed. It is what you deploy outside development.

Rationale: [Why deploy releases and not branches](/projects/getting-start#why-deploy-releases-and-not-branches).

## Version format

The platform enforces [semantic versioning](https://semver.org). The **Version** field accepts
`MAJOR.MINOR.PATCH`, optionally followed by a pre-release suffix, and refuses anything else.

```text title="Accepted"
1.0.0
1.2.0-beta
2.0.0-rc.1
```

Two further rules are checked when you create a release:

- **The version must be greater than the latest release.** You cannot publish `1.3.0` after
  `1.4.0`. Versions only go up.
- **The tag is the version prefixed with `v`.** Enter `1.2.0`; the tag created is `v1.2.0`. Do
  not type the `v` yourself.

A pre-release sorts before the version it prepares: `1.2.0-rc.1` comes before `1.2.0`. That is
what lets you publish release candidates and then the final version.

## Which number to increase

The three numbers tell whoever deploys the release what to expect. The question to ask is: *what
does a caller of this integration have to change?*

| The change | Callers must | Increase |
|---|---|---|
| Fixes a defect, same behavior otherwise | Do nothing | PATCH |
| Adds a route, an endpoint, an optional field | Do nothing; may use the addition | MINOR |
| Removes or renames an endpoint or a field, changes a contract | Adapt | MAJOR |

## Release markers

A release can carry one of two markers, shown next to it on the repository page. They are
information for people choosing what to deploy; the platform builds a marked release like any
other.

| Marker | Meaning |
|---|---|
| **Draft** | The release is being prepared and is not published yet |
| **Pre** | A pre-release: a candidate, not meant for production |

## What a release contains

A release tags the repository **as committed at that moment** on its default branch. A change
that is still open in the Web IDE and not committed is not part of it. Before releasing, check
**Actions**, **Changes** for the commit you expect.

## Deleting a release

A release can be deleted from the repository page.

:::warning[A deleted release cannot be rebuilt]
An integration already built from that release keeps running on its image. But a new build of
the same release — for another environment, or after the image is gone — is no longer possible.
Delete only releases that no environment uses.
:::

## Related pages

- [Create a release](/projects/tasks/create-a-release)
- [Branch builds versus release builds](/tutorial/from-git)

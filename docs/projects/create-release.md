---
title: Releases
sidebar_position: 5
---

A release is a Git tag on a repository, with a description. It is the unit that test and
production environments build from.

## Version format

The **Version** field accepts semantic versioning only:

```text title="Accepted"
MAJOR.MINOR.PATCH
MAJOR.MINOR.PATCH-PRERELEASE      1.2.0-beta, 2.0.0-rc.1
```

| Rule | Detail |
|---|---|
| Format | `1.0.0` or `1.0.0-beta`. Anything else is refused |
| Ordering | The version must be greater than the latest release |
| Pre-release | A version with a suffix sorts before the same version without it: `1.2.0-rc.1` then `1.2.0` |
| Tag | The tag created is `v` followed by the version: `v1.2.0` |

## Release markers

| Marker | Meaning |
|---|---|
| **Draft** | Not published yet |
| **Pre** | A pre-release |

## Which number to increase

| Change | Increase |
|---|---|
| Fix with no change of behavior for callers | PATCH |
| New route, new optional field, new endpoint | MINOR |
| Removed or renamed endpoint or field, changed contract | MAJOR |

## Deletion

A release can be deleted from the repository page. An integration built from it keeps running on
the image already built, but cannot be rebuilt from that release.

## Related pages

- [Create a release](/projects/tasks/create-a-release)
- [Branch builds versus release builds](/tutorial/from-git)

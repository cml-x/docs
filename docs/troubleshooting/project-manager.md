---
title: Project Manager
sidebar_position: 1
---

### Integration invalid or can't be created

- **Possible cause** — no Git provider is configured for the project. Project Manager can't list
  or create repositories without one.
- **Check** — confirm a Git provider (GitHub, GitLab or Bitbucket) is set up before creating a
  project.
- **Fix** — configure the Git provider, then retry creating the Integration project.

### Release problem

- **Possible cause** — the repository state at the time of tagging wasn't what you expected (e.g.
  changes not yet saved from IT Designer).
- **Check** — open the repository in [Integrations](/projects/repos) and confirm its latest
  commits match what you built in IT Designer before cutting the release.
- **Fix** — save your work in IT Designer, then create the release again. A release can be deleted
  and recreated if it was tagged too early.

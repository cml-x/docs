---
title: Create Your First Integration
sidebar_position: 4
---

Step-by-step version of what's covered briefly in [Getting Started](/projects/getting-start).

## Prerequisites

A Git provider (GitHub, GitLab or Bitbucket) must be configured — Project Manager can't list or
create repositories without one.

## Steps

1. In Project Manager, create a new project and choose type **Integration**.
2. Choose how to start:
   - **From a template** — browse the gallery, grouped by topic (REST, database, messaging,
     cloud, files, scheduling…).
   - **From Apache Camel Main sources.**
   - **From a blank canvas.**
3. Confirm creation. Project Manager creates the backing Git repository and opens the dedicated
   **IT Designer** — the visual canvas where the Camel routes themselves are built and edited.
4. Build your routes in IT Designer, then save your work back to the repository.

## Result

You have a Git repository holding a working Camel integration. It isn't running anywhere yet —
that's [Create a Release](/projects/create-release), followed by
[deploying it in Runtime Manager](/runtime/getting-start).

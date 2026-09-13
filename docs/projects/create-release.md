---
title: Create a Release
sidebar_position: 5
---

A **release** is a tagged, frozen version of a project's repository. Deployments target a
release, never a moving branch — this is what [Runtime Manager](/runtime/getting-start) and
[Environment Manager](/infra/getting-start) build on.

## Steps

1. Open [Integrations](/projects/repos) and select your repository.
2. Create a release — this tags the current state of the repository as a versioned, deployable
   snapshot.

## Managing releases

Releases can also be deleted from the same view when they're no longer needed.

## Result

The release is now available to deploy: from the repository's **Applications** tab (one-click
**Deploy**), or by picking it as the source when creating a Capsule in
[Runtime Manager](/runtime/getting-start).

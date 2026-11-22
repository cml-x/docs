---
title: Integration Groups
sidebar_position: 8
---

An integration created **on its own** is deployed and versioned by itself. An **integration
group** — a [Capsule](/runtime/capsule) — deploys several components together, under one status
and one revision history.

## When to group

| Situation | Choice |
|---|---|
| Routes released on their own schedule | One integration each, no group |
| Routes that only make sense together and are always released together | One group |
| A route and the storage it writes to | One group |

## Components of a group

A group can hold several Camel integrations, Pipes, jobs and cron tasks, and persistent volumes.
The full list is on the [Capsules](/runtime/capsule) page.

## Revisions and rollback

Deploying a group creates one revision for all its components. A rollback returns every component
to the state of the chosen revision: a group cannot be rolled back partially.

## Several repositories, one group

Each integration of a group has its own source: its own repository and branch or release. The
group pins a set of sources that were validated together.

## Related pages

- [Capsules](/runtime/capsule)
- [Storages](/runtime/storages)

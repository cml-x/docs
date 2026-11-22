---
title: Grouping Integrations
sidebar_position: 8
---

An integration is created either **on its own** or in an
[integration group](/runtime/integration-groups). The choice decides how it is deployed and
versioned, and it is worth making deliberately: a group couples the release cycle of its
members.

![On its own, in an integration group, in an API group](/img/runtime/groups.drawio.png)

## What grouping changes

On its own, an integration is deployed by itself and has its own revisions: you can deploy it,
or roll it back, without touching anything else.

In a group, the members are deployed **together** and share **one** revision history. Deploying
the group deploys all of them; rolling back returns all of them to the chosen revision.

## When to group

The question is whether deploying one member without the others can leave the system in a
state that does not work.

| Situation | Choice | Why |
|---|---|---|
| Routes released on their own schedule | One integration each | A group would force them to be released together |
| An importer and an exporter that share a message format | One group | A new format must reach both at once |
| A route and the volume it writes to | One group | The storage is created and removed with the route |

:::tip When in doubt, do not group
An integration on its own can always be coordinated with others by releasing them in sequence.
A group cannot be partially deployed.
:::

## Sources stay separate

Grouping is about deployment, not about source. Each integration of a group still has its own
repository and points at its own branch or release. The group records a set of sources that
were validated together.

## Related pages

- [Integration Groups](/runtime/integration-groups)
- [Storages](/runtime/storages)

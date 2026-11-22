---
title: Integration Groups
sidebar_position: 2
---

An **integration group** gathers the integrations and the storage that are deployed together. It
is deployed as one unit and has one revision history.

![On its own, in an integration group, in an API group](/img/runtime/groups.drawio.png)

## On its own or in a group

When creating an integration, **Integration group** offers **None — create it on its own** or an
existing group.

| | Integration on its own | Integrations in a group |
|---|---|---|
| Deployed | By itself | With the other members of the group |
| Revisions | Its own | One history for the group |
| Rollback | That integration only | Every member of the group |
| Use for | Routes released on their own schedule | Routes that are always released together, with the storage they share |

:::tip Default to "on its own"
A group couples release cycles. Group integrations only when deploying one without the others
would leave the system inconsistent.
:::

## Members of a group

A group holds two kinds of members.

| Member | Page |
|---|---|
| Integrations, each with its own source and settings | [Integrations](/runtime/integrations) |
| Storage: persistent volumes mounted by the integrations | [Storages](/runtime/storages) |

## Environment binding

A group is bound to an environment, then deployed there. A group not yet bound to the selected
environment says so and offers to bind it. Its members are deployed together in that
environment.

## Revisions and rollback

Each deployment of a group creates one revision for all its members. A rollback returns every
member to the state of the chosen revision.

:::warning A rollback is never partial
Rolling a group back reverts every integration in it, including those that had not changed for
the wrong reason. If one member must move independently, it does not belong in the group.
:::

## Deletion

**Delete integration group** permanently deletes the group and its members.

## Related pages

- [API Groups](/api-manager/api-groups) — the same notion for API instances
- [Build and run lifecycle](/runtime/how-integrations-run)

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

:::tip[Default to "on its own"]
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

## The page of a deployment request

A group — and every integration deployed on its own — is deployed through a **deployment request**.
Its page is reached from the list, or from a component with **Deployment request**.

| Tab | What it shows |
|---|---|
| **Overview** | What the platform says of the request right now, the deployment in progress, its components, then its revisions |
| **Components** | What the request deploys |
| **Services** | The addresses it exposes in the selected environment |
| **Instances** | The pods it started in the selected environment, each with its containers |
| **Policies** | The policies applied to it, each open to editing |

**Apply changes** deploys it to the selected environment. **Actions** holds what changes its
place: bind it to another environment, undeploy it from the selected one, remove that
environment from it, or delete it once it is deployed nowhere.

## Revisions and rollback

Each deployment of a group creates one revision for all its members. They are listed at the
bottom of the **Overview**. A rollback returns every member to the state of the chosen revision.

:::warning[A rollback is never partial]
Rolling a group back reverts every integration in it, including those that had not changed for
the wrong reason. If one member must move independently, it does not belong in the group.
:::

## Group Deletion

**Delete integration group** permanently deletes the group and its members.

## Related pages

- [API Groups](/api-manager/api-groups) — the same notion for API instances
- [Build and run lifecycle](/runtime/how-integrations-run)

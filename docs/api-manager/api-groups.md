---
title: API Groups
sidebar_position: 3.5
---

An **API group** gathers API instances that are deployed together. An API instance is created
either on its own or in a group.

![On its own, in an integration group, in an API group](/img/runtime/groups.drawio.png)

## On its own or in a group

The choice is about deployment, not about traffic: grouped API instances are deployed and rolled back together.

| | API instance on its own | API instances in a group |
|---|---|---|
| Deployed | By itself | With the other members of the group |
| Revisions | Its own | One history for the group |
| Rollback | That API only | Every API of the group |
| Use for | APIs that evolve independently | Versions or facets of one product: `orders-v1`, `orders-v2`, `orders-admin` |

## Create an API group

{/* screenshot: api-group-create */}

In **API Manager**, go to **API Groups** and create a group. It starts empty. Then create API
instances **in** it: the creation form of an API instance offers the group, or none.

## Environment binding

A group is bound to an environment before it can be deployed there. A group not yet bound to the
selected environment says so and offers to bind it.

:::info[The choice is made at creation]
An API instance is created in a group or on its own. Decide before creating it: the group is
part of how it is deployed and versioned.
:::

## The page of a deployment request

A group — and every API instance, gateway or upstream deployed on its own — is deployed through a **deployment request**.
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

## Policies in a group

Policies still target a gateway or one API instance — see
[Policies](/api-manager/policies). A group changes how APIs are deployed together, not how
their traffic is handled.

## Related pages

- [API Instances](/api-manager/api-instances)
- [Integration Groups](/runtime/integration-groups)

---
title: API Groups
sidebar_position: 3.5
---

An **API group** gathers API instances that are deployed together. An API instance is created
either on its own or in a group.

![On its own, in an integration group, in an API group](/img/runtime/groups.drawio.png)

## On its own or in a group

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

:::info The choice is made at creation
An API instance is created in a group or on its own. Decide before creating it: the group is
part of how it is deployed and versioned.
:::

## Policies in a group

Policies still target a gateway or one API instance — see
[Policies](/api-manager/policies). A group changes how APIs are deployed together, not how
their traffic is handled.

## Related pages

- [API Instances](/api-manager/api-instances)
- [Integration Groups](/runtime/integration-groups)

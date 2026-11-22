---
title: Role Grants
sidebar_position: 2
---

An authorization grants a [user](/access/users) one or several roles on one project. It is the
**RBAC** entry of the menu.

## Structure of a grant

A grant answers one question: *what may this person do in this project?* It ties three things together. Without a grant, an account can sign in but sees no project.

| Element | Content |
|---|---|
| User | One account |
| Project | One project |
| Roles | At least one role of that project — see [Create and manage roles](/access/create-and-manage-roles) |

What a role allows, and in which environments, is defined on the role — see the
[RBAC model](/access/rbac-principles).

## States

A grant can be switched off without being lost. This is the difference between suspending access — someone on leave, an audit in progress — and removing it.

| Action | Effect |
|---|---|
| Deactivate | The grant stops applying at once; it is kept and can be reactivated |
| Reactivate | The grant applies again |
| Delete | The grant is removed |

Deactivating a grant removes the access without touching the account: the user still signs in,
and keeps the other grants.

## Related pages

- [Grant roles on a project](/access/tasks/grant-access-on-a-project)
- [Assign roles and permissions](/access/assign-roles-and-permissions)

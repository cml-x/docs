---
title: Role Grants
sidebar_position: 2
---

An authorization grants a [user](/access/users) or a [service account](/access/connected-apps)
one or several roles on one project. It is the **RBAC** entry of the menu.

:::info[A project is a business unit]
This screen names **Project** what the rest of the console calls a
[business unit](/access/organization-and-business-units). They are the same thing.
:::

## Why grants are separate from accounts

What someone may do depends on the project: the same person can administer one project and only
read another. A grant therefore ties a user to roles **on one project**, and a user has as many
grants as projects they work on.

This also keeps offboarding and reorganizations simple. Moving someone to another team is
removing one grant and adding another; their account, sign-in method and second factor are
untouched.

:::warning[No grant, no access]
A user without a grant on a project does not see it at all — not even in the business unit
selector. "I cannot see the project" almost always means a missing or deactivated grant.
:::

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
- [Access design and reference matrix](/access/access-design) — who gets which role in a reference organization

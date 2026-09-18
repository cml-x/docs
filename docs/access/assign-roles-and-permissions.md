---
title: Assign Roles & Permissions
sidebar_position: 8
---

Camel X separates two kinds of role in Access Manager: **organization-level admin roles**
(assigned when [creating a user](/access/create-user)) and **project-scoped roles**, granted
through **Authorizations**.

![RBAC Model](/img/access/rbac-model.svg)

## Understanding the chain

```
User → Role → Permission → Access → Resource
```

A user is assigned a **role**; the role carries a set of **permissions**; those permissions
determine what **access** the user has to a project's **resources**.

## Grant project access

1. In Access Manager, open **Authorizations**.
2. Pick the user, the project, and one or more of that project's defined roles.
3. Confirm — the grant is active immediately.

## Managing an existing grant

A grant can be **activated**, **deactivated**, or **deleted** at any time from the same view,
without touching the user's account itself.

## Creating a custom role

Defining a brand-new, custom role (beyond the project's existing defined roles) is
**[À CONFIRMER]** — not a capability confirmed in the current Authorizations interface. Roles
available for a project appear to be predefined; authorizations assign users to them rather than
creating new ones.

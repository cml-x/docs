---
title: Assign Roles & Permissions
sidebar_position: 8
---

Camel X separates two kinds of role in Access Manager: **organization-level admin roles**
(assigned when [creating a user](/access/create-user)) and **business-unit roles**, which you
define yourself and grant through **Authorizations** (shown as **RBAC** in the menu).

![RBAC Model](/img/access/rbac-model.svg)

## Understanding the chain

```
User → Role → Permission → Scope (business unit / environments) → Resource
```

A user is assigned a **role**; the role carries a set of **permissions** picked from the
platform's catalog; each permission applies to the whole business unit or only to chosen
environments. Read [RBAC Principles](/access/rbac-principles) for the full model.

## Define the role first

Business-unit roles are created and edited on the business unit's **Roles Base Access** tab: pick
the permissions, optionally restrict them to environments, and save. You can also clone a role or
import one from JSON. The step-by-step walkthrough is in
[Create and Manage Roles](/access/create-and-manage-roles).

## Grant business-unit access

1. In Access Manager, open **RBAC** (Authorizations).
2. Pick the user, the business unit, and one or more of its roles.
3. Confirm — the grant is active immediately.

Members can also be added with their roles directly from the business unit's **Members** tab.

## Managing an existing grant

A grant can be **activated**, **deactivated**, or **deleted** at any time from the same view,
without touching the user's account itself. Changing a role's permissions takes effect for every
user who holds it.

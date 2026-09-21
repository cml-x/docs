---
title: RBAC Principles
sidebar_position: 3
---

Access Manager's RBAC (role-based access control) answers one question: **what is this user
allowed to do, and where?** This page explains the model behind it. To put it into practice, follow
the [Create and Manage Roles](/access/create-and-manage-roles) tutorial.

## The big picture

```
User ──granted──▶ Role ──carries──▶ Permissions ──apply to──▶ Business unit  (everywhere)
                                                          └─▶ Environment    (only where restricted)
```

- A **user** never holds permissions directly. They are **granted one or more roles** on a
  business unit (see [Authorizations](/access/authorizations)).
- A **role** is a named bundle of permissions — for example *Platform Editor Access*.
- A **permission** is one action on one kind of resource — for example "edit gateways".
- A permission applies either to the **whole business unit** or, for some resources, to **specific
  environments only**.

Every request a backend service receives is checked against this model. If the user's roles do not
grant the required permission, the service answers **403 Forbidden**.

## Business units and environments

| Concept | What it is |
|---|---|
| **Business unit** | The boundary of access. Roles, members and resources all belong to exactly one business unit. Permissions never leak from one business unit to another. |
| **Environment** | A deployment target (for example `dev`, `staging`, `prod`) that belongs to a business unit. Some permissions can be narrowed to a subset of environments. |

## Roles

Roles are defined **per business unit**, on the **Roles Base Access** tab of the business unit.

- A role has a **name** and a generated **key** (lowercase letters, digits and dashes — accents are
  normalized, so "Créateur" becomes `createur`) and an optional **group** used only for
  organizing the list.
- **The name always ends with "Access".** If you type `Editor`, the role is created as
  `Editor Access`. This keeps role names consistent and readable in member lists.
- Deleting a role removes it from every user who had it.

## Permissions: the catalog

Permissions come from a **closed catalog**, one category per application. You pick from the
catalog — you cannot invent new permissions.

| Category | Covers |
|---|---|
| API Manager | Gateways, API instances, upstreams, policies |
| Cloud Resources | Custom domains, DNS and other cloud resources |
| Auth Manager | Auth gateways, client apps, service accounts, users, groups |
| Applications Manager | Integrations, storage, capsules |
| Environments Manager | Environments, targets, environment configs |
| Secrets Manager | Configs, distributions, config templates |
| Monitoring Manager | Dashboards |
| Project Manager | Repos, releases, tags, artifacts |

For each resource the catalog offers up to four actions:

| Action | Meaning |
|---|---|
| **View** | Read-only access. |
| **Edit** | Create and modify. Also covers binding a resource to a new environment. |
| **Deploy** | Apply changes — deploy, roll back and recycle. Only exists for resources that are deployed. |
| **Delete** | Remove the resource, including removing it from an environment. |

In the role editor these are presented as plain-language choices — **"Create and manage Gateway"**,
**"Apply changes on Gateway"** — rather than raw action names.

:::info View is never a checkbox of its own
**View is implied** by Edit and Delete on the same resource: if a role can edit gateways, it can
obviously see them. That is why you will not find a standalone "View" checkbox for most resources.
:::

## Scope: everywhere or only in some environments

Three categories — **API Manager, Auth Manager and Applications Manager** — hold resources that
live *inside* an environment (gateways, capsules, integrations…). For these, every permission can
be granted in one of two scopes:

- **Business-unit-wide** (default) — the permission applies in every environment, including
  environments created later.
- **Restricted to environments** — the permission applies only in the environments you tick.

```
Role "Platform Editor Access"
├── API Manager
│   ├── Create and manage Gateway       → dev, staging        (restricted)
│   └── Apply changes on Gateway        → dev, staging        (restricted)
├── Applications Manager
│   └── Create and manage Capsule       → business-unit-wide
└── Secrets Manager
    └── Create and manage Config        → business-unit-wide  (not environment-scoped)
```

Rules worth knowing:

1. **Restriction is per category, not per permission.** Within a category, either all its
   permissions are business-unit-wide or all are restricted to the environments you chose.
   Categories are independent — API Manager can be restricted to `dev` while Auth Manager is
   business-unit-wide.
2. **View stays business-unit-wide.** Even when a category is restricted, the ability to *see* its
   resources is kept business-unit-wide. Otherwise the resource would disappear from lists and
   detail pages, which are not tied to a single environment.
3. **Other categories are never environment-scoped.** Environments Manager, Secrets Manager,
   Monitoring Manager and Project Manager permissions are always business-unit-wide.
4. **Inheritance.** An environment automatically inherits the business unit's permissions. A
   restriction narrows a role to specific environments *instead of* granting it everywhere.

### Which action is checked where

| Operation | Permission required | Scope checked |
|---|---|---|
| List, open, search a resource | View | Business unit |
| Create or edit a resource | Edit | Business unit |
| Bind a resource to a new environment | Edit | Business unit |
| Deploy, roll back or recycle in an environment | Deploy | That environment |
| Edit an environment-specific override | Edit | That environment |
| Remove a resource from an environment | Delete | That environment |
| Delete a resource entirely | Delete | Business unit |

## Enforcement and what users see

Permissions are enforced **by the backend services**, not just hidden in the interface — a user
cannot bypass a missing permission by calling an API directly. When a check fails:

- The API returns **403 Forbidden**.
- List pages in the console show an **Access denied** panel explaining that the user does not have
  permission to view that resource type, instead of an empty list. This makes "nothing here" and
  "you may not look here" visibly different.
- Business-unit administrators are not restricted by the catalog.

:::note
A failed check never fails open: if the authorization service cannot be reached, the request is
refused rather than allowed.
:::

## Where things are managed

| Task | Where |
|---|---|
| Create, edit, clone and delete roles; view what a role grants | Business unit → **Roles Base Access** tab |
| Add a member to a business unit with roles | Business unit → **Members** tab |
| Review and manage grants across users | Access Manager → **RBAC** ([Authorizations](/access/authorizations)) |
| Organization-level admin roles | Access Manager → [Users](/access/users) |

Organization-level admin roles (Owner, Viewer, User Manager…) are a separate concept: they control
who can administer the *platform*. Roles described here control what people can do *inside a
business unit*.

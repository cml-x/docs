---
title: RBAC Model
sidebar_position: 3
---

Access control answers one question: **what is this user
allowed to do, and where?** This page explains the model behind it. To put it into practice, follow
the [Create and Manage Roles](/access/create-and-manage-roles) tutorial; for which roles to build
and whom to give them to, see [Access design](/access/access-design).

## Authorization model

![A user is assignee of a role; the role holds permissions on a business unit or on one environment; organization administrators and viewers reach every business unit](/img/access/role-structure.drawio.png)

The model is **relationship-based**: access is not a list of rights attached to a user, it is a
set of **relations between objects**. A user is *assignee* of a role; the role holds a
permission *on* a business unit; an environment *belongs to* a business unit. Deciding whether
a request is allowed means following those relations. The platform evaluates them with
OpenFGA.

Four ideas summarize it:

- A **user** never holds permissions directly. They are **assigned roles** in a business unit
  (see [Role grants](/access/authorizations)).
- A **role** is a named bundle of permissions, defined in one business unit.
- A **permission** is one action on one kind of resource — "edit gateways".
- A permission holds on the **whole business unit** or, for some resources, on **specific
  environments only**.

Every request a backend service receives is checked against this model. If no relation grants
the required permission, the service answers **403 Forbidden**.

## How roles are structured

A role sits between people and permissions, and each side of it is a relation.

| Relation | From | To | Meaning |
|---|---|---|---|
| `assignee` | User, service account | Role | This identity has the role |
| `business_unit` | Role | Business unit | The role is defined in, and limited to, this unit |
| `can_<action>_<resource>` | Role | Business unit | Everyone with the role may do this action in the whole unit |
| `can_<action>_<resource>` | Role | Environment | Everyone with the role may do this action in that environment only |
| `business_unit` | Environment | Business unit | The environment belongs to the unit and inherits its permissions |
| `organization` | Business unit | Organization | The unit belongs to the organization |

A permission is named after what it allows: `can_edit_gateway`, `can_deploy_integration`,
`can_view_secret_config`. The role editor shows them in plain language — **Create and manage
Gateway**, **Apply changes on Integration** — but the name is what a `403` reports and what an
exported role contains.

### Reading the diagram

Take the role *Platform Editor Access* of the business unit `payments`:

1. `alice`, `bob` and the service account `ci-deployer` are **assignees** of the role.
2. The role holds **Create and manage Integration** on the business unit: its assignees may
   edit integrations in every environment of `payments`, including ones created later.
3. The role holds **Apply changes on Gateway** on the environment `development` only: its
   assignees may deploy gateways there, and nowhere else.
4. Nothing links the role to `production` for gateways: a deployment there is refused.

### How a check is resolved

When `alice` deploys a gateway in `development`, the service asks one question: *does `alice`
have `can_deploy_gateway` on `environment:development`?* The answer is yes if **any** of these
holds:

| Path | Why it grants |
|---|---|
| A role of `alice` holds the permission on that environment | Direct grant, restricted |
| A role of `alice` holds the permission on the business unit | The environment inherits from its business unit |
| `alice` is administrator of the business unit | Administrators hold every permission of the unit |
| `alice` is administrator of the organization | An organization administrator is administrator of every unit |

For a **view** permission, two more paths exist: holding *edit* or *delete* on the same
resource, and being **viewer** of the organization.

:::info[Permissions add up, they never subtract]
There is no "deny". A user with two roles has the union of what both grant. To take a right
away, remove it from the role or remove the role from the user.
:::

## Organization-level relations

Above business units, the organization has relations of its own. They are not part of the role
catalog: they are given to a user for the whole organization.

| Relation | Effect |
|---|---|
| **admin** | Administrator of every business unit: bypasses the catalog everywhere |
| **viewer** | Read access to every resource of every business unit; no change allowed |
| **member** | Belongs to the organization; sees only the business units where a role is granted |
| **support agent** | Handles support cases |

:::warning[Organization administrator is the widest right there is]
It reaches every business unit, present and future. Give it to the few people who administer
the platform itself, and use business unit roles for everyone else.
:::

The structure of organizations and business units is described in
[Organization and units](/access/organization-and-business-units).

## Finer grants on configurations

For stored configurations, the model goes below the business unit. Besides the permissions a
role holds on the whole unit, access can be given to:

| Level | Covers |
|---|---|
| One **template** | Every configuration of that template, present and to come — all TLS certificates, for instance |
| One **configuration** | That configuration alone |

This lets a team manage its own credentials without reading those of the others in the same
business unit.

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
| API Manager | Gateways, API instances, auth gateways, upstreams, policies, cloud resources such as custom domains |
| Applications Manager | Integrations, integration groups, storage, policies |
| Environments Manager | Environments, targets, environment configs |
| Environment Services | The Camel Integration, Logging and Network services of an environment |
| Access Manager | Who has access to which resources |
| Secrets Manager | Configs, distributions, config templates |
| Monitoring Manager | Dashboards, exporters, log outputs and log flows |
| Project Manager | Repos, releases, tags, artifacts, builds, teams |
| Support Manager | Support cases |

[Auth gateways](/auth/auth-gateway) are resources of the **API Manager** category: there is no
separate category for authentication.

For each resource the catalog offers up to five actions:

| Action | Meaning |
|---|---|
| **View** | Read-only access. |
| **Edit** | Create and modify. Also covers binding a resource to a new environment. |
| **Deploy** | Apply changes — deploy, roll back and recycle. Only exists for resources that are deployed. |
| **Recycle** | Remove from an environment what a service deployed there. Only exists for the services of an environment. |
| **Delete** | Remove the resource, including removing it from an environment. |

In the role editor these are presented as plain-language choices — **"Create and manage Gateway"**,
**"Apply changes on Gateway"** — rather than raw action names.

:::info[View is never a checkbox of its own]
**View is implied** by Edit and Delete on the same resource: if a role can edit gateways, it can
obviously see them. That is why you will not find a standalone "View" checkbox for most resources.
:::

## Role scope: all environments or selected ones

Three categories — **API Manager, Applications Manager and Environment Services** — hold
resources that live *inside* an environment (gateways, integration groups, integrations, the
services of the environment…). For these, every permission can
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
│   └── Create and manage Integration   → business-unit-wide
└── Secrets Manager
    └── Create and manage Config        → business-unit-wide  (not environment-scoped)
```

Rules worth knowing:

1. **Restriction is per category, not per permission.** Within a category, either all its
   permissions are business-unit-wide or all are restricted to the environments you chose.
   Categories are independent — API Manager can be restricted to `dev` while Applications
   Manager is business-unit-wide.
2. **View stays business-unit-wide.** Even when a category is restricted, the ability to *see* its
   resources is kept business-unit-wide. Otherwise the resource would disappear from lists and
   detail pages, which are not tied to a single environment.
3. **Other categories are never environment-scoped.** Environments Manager, Secrets Manager,
   Monitoring Manager and Project Manager permissions are always business-unit-wide.
4. **Inheritance.** An environment automatically inherits the business unit's permissions. A
   restriction narrows a role to specific environments *instead of* granting it everywhere.
5. **Cloud resources belong to the business unit.** A [custom domain](/api-manager/domains), like
   every cloud resource, lives in the environment the business unit is created with
   (`sync-<business unit>`), not in a deployment environment. Its permissions — the
   **Cloud Resource** entries of API Manager — are always checked on the business unit, whatever
   environments the rest of API Manager is restricted to.

### Permission checked per action

| Operation | Permission required | Scope checked |
|---|---|---|
| List, open, search a resource | View | Business unit |
| Create or edit a resource | Edit | Business unit |
| Bind a resource to a new environment | Edit | Business unit |
| Deploy, roll back or recycle in an environment | Deploy | That environment |
| Edit an environment-specific override | Edit | That environment |
| Remove a resource from an environment | Delete | That environment |
| Delete a resource entirely | Delete | Business unit |

## Enforcement in the API and the UI

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

## Management screens

Each part of the model is managed in its own screen of Access Manager. This table tells you where to go for what.

| Task | Where |
|---|---|
| Create, edit, clone and delete roles; view what a role grants | Business unit → **Roles Base Access** tab |
| Add a member to a business unit with roles | Business unit → **Members** tab |
| Review and manage grants across users | Access Manager → **RBAC** ([Authorizations](/access/authorizations)) |
| Organization-level admin roles | Access Manager → [Users](/access/users) |

Organization-level admin roles (Owner, Viewer, User Manager…) are a separate concept: they control
who can administer the *platform*. Roles described here control what people can do *inside a
business unit*.

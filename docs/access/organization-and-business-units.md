---
title: Organization and Units
sidebar_position: 2.5
---

Everything in the platform sits in a two-level structure: an **organization**, which contains
**business units**. Understanding the two levels explains why a colleague cannot see your
integration, why a role created in one place does not exist in another, and where to grant
what.

![An organization contains business units; each business unit holds its members, roles, repositories, configurations and environments](/img/access/organization-business-units.drawio.png)

## Organization

The organization is **your company on the platform**. There is one per customer, created when
the platform is first set up. It has an **Organization ID** and a **Primary Domain**, shown on
its page.

What belongs to the organization is what concerns *people and how they sign in*:

| Belongs to the organization | Managed in |
|---|---|
| Users and service accounts | Access Manager: [Users](/access/users), [Service accounts](/access/connected-apps) |
| Identity providers | Access Manager: [Identity Providers](/access/identity-providers) |
| MFA, login, password and lockout policies | Access Manager: [MFA Policy](/access/mfa-policy), [Sign-in policies](/access/settings) |
| The list of business units | The **Organization** page |
| Organization administrators | [Users](/access/users) |

An account therefore exists **once**, for the whole organization. What that account may do is
decided separately, business unit by business unit.

## Business unit

A business unit is the **boundary of work and of access** inside the organization: a team, a
department, a product line, a subsidiary. It is what you select at the top of the console, and
everything you then see belongs to it.

A business unit owns:

| Owned by a business unit | Why it matters |
|---|---|
| **Members and roles** | A role is defined in one business unit and grants nothing in another |
| **Repositories, releases, schemas** | Source is visible to the members of the unit only |
| **Configurations and secrets** | A credential of one unit cannot be mounted by another |
| **Targets and environments** | Each unit has its own stages, on the clusters it chose |
| **Integrations, gateways, APIs** | Everything deployed, through its environments |
| **Telemetry** | Logs, metrics and traces are read per business unit |

:::warning[A business unit is a hard boundary]
Nothing is shared across business units: not a role, not a configuration, not a gateway. Two
teams that must share a gateway or a secret belong in the same business unit, with roles that
separate what each may do.
:::

## How the two levels relate

| Question | Level | Example |
|---|---|---|
| Can this person sign in, and how? | Organization | Account, identity provider, second factor |
| Which units exist? | Organization | `payments`, `logistics` |
| What may this person do? | Business unit | Role *Platform Editor Access* in `payments` |
| Where does it run? | Business unit, then environment | Environment `production` of `payments` |

A person has **one account** in the organization and **as many grants as business units** they
work in. Someone who works for two teams has two grants, possibly with different roles.

## Environments, inside a business unit

An [environment](/infra/environments) belongs to exactly one business unit. It is the third
level of the structure, and the one at which a role can be **restricted**: a role may allow
deployments in `development` and not in `production` — see
[RBAC model](/access/rbac-principles).

## Designing your business units

The right split follows **who must be kept apart**, not the org chart.

| Situation | Choice |
|---|---|
| One team, several stages | One business unit, several environments |
| Two teams sharing gateways and secrets, with different rights | One business unit, different roles |
| Two teams that must not see each other's source, secrets or traffic | Two business units |
| A subsidiary with its own cluster and its own administrators | Its own business unit |

:::tip[Start with few business units]
Roles and environment restrictions already separate duties inside a unit. Create a new business
unit only when isolation must be complete — it cannot be relaxed afterwards without moving
resources.
:::

## Create a business unit

On the **Organization** page, **Create Business Unit** asks for a name. The unit is created
empty: add environments, then members and roles.

## Deleting a business unit or an organization

Removing a business unit or an organization is a **critical action with contractual
implications**. It is not done with a button.

The **Delete** action of the Organization page exists, and asks you to type the name of the
unit. But it only removes the business unit **from view**:

| What the Delete button does | What it does not do |
|---|---|
| Removes the business unit from the console | Stop its integrations, gateways and environment services |
| | Release the resources it uses on its runtime planes |
| | Stop the billing of those resources |

:::danger[A deleted business unit keeps running and keeps being billed]
After a deletion from the console, everything the business unit owns **stays active** and
continues to be invoiced according to your billing mode — see your billing policy. You simply no
longer see it. Do not use the Delete button to stop a service or to reduce a bill.
:::

### To end a service

Ending the service of a business unit, or of a whole organization, is a request made through
the appropriate channels — your account contact or the support desk — and not an operation of
the console.

- It is handled as a contractual change, under the terms of your agreement.
- **Processing can take several weeks.** Plan it ahead of the date you need.
- Until it is confirmed as complete, the resources remain active and billed.

:::warning[Reduce consumption yourself in the meantime]
What you can do at once, from the console, is stop what consumes: **undeploy** the integrations
and gateways of the business unit and **recycle** the services of its environments. That reduces
what runs; it does not end the service or the contract.
:::

:::tip[Before asking for an end of service]
Export what you must keep — repositories, schemas, configurations you are entitled to read —
and tell the teams that call the APIs of the unit. Once the service is ended, none of it can be
recovered from the console.
:::

## Who administers what

| Role | Scope | Can |
|---|---|---|
| Organization administrator | The whole organization | Manage users and policies; acts as administrator of **every** business unit |
| Organization viewer | The whole organization | Read every business unit, change nothing |
| Business unit administrator | One business unit | Everything in that unit, including its roles and members |
| Member with roles | One business unit | What the roles allow |

## Related pages

- [RBAC model](/access/rbac-principles) — how roles are structured and checked
- [Create and manage roles](/access/create-and-manage-roles)
- [Access design and reference matrix](/access/access-design) — profiles and roles for a reference organization
- [Runtime planes](/infra/runtime-planes) — where the environments of a unit run

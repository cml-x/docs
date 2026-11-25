---
title: "Access Design: Profiles, Recommendations and Reference Matrix"
sidebar_label: Access Design and Reference Matrix
sidebar_position: 3.5
---

This page gives a recommended way to set up access to an organization: how people sign in, which
profiles to distinguish, which roles to build for them, and a complete access matrix for a
reference organization. It applies the [RBAC model](/access/rbac-principles); read that page
first for the mechanics.

![A reference organization: a few owners, user managers and viewers at organization level, everyone else signing in through the identity provider; in a business unit, one role edits and deploys in development and staging, another only deploys in production, each with its own service account](/img/access/reference-organization.drawio.png)

## Decisions, in order

Access is decided at three levels. Settle them from the outside in: a role is of no use while
anyone can still sign in with a weak password.

| Order | Level | Decision | Screen |
|---|---|---|---|
| 1 | Sign-in | Which identity provider, which second factor, which local accounts remain | [Identity Providers](/access/identity-providers), [MFA Policy](/access/mfa-policy), [Sign-In Policies](/access/settings) |
| 2 | Organization | Who administers the platform itself | [Users](/access/users), **Manage Roles** |
| 3 | Business unit | Which roles exist, restricted to which environments | Business unit, **Roles Base Access** |
| 4 | Grant | Who holds which role, people and programs | [Role grants](/access/authorizations) |

## Recommendations

### Sign-in

| Recommendation | Reason |
|---|---|
| Federate sign-in with the company identity provider | Offboarding, password policy and second factor of the directory apply to the console |
| Turn **Require MFA** on, with **Local MFA Only** when the provider already enforces a second factor | No account opens the console with a password alone; federated users are not asked twice |
| Keep two or three local administrator accounts, each with a security key | They are the way in when the identity provider is down or misconfigured |
| Turn **Registration** off | Accounts come from the directory or from an administrator, never from the sign-in page |
| Turn **Password Login** off once everyone signs in through the provider | The remaining local accounts use **Passwordless Login** |
| Turn **Ignore Unknown Users** on | The sign-in page does not confirm which user names exist |

The sequence to get there without locking anyone out is in
[Sign-in hardening](/access/configure-organization-access).

### Organization level

| Recommendation | Reason |
|---|---|
| Two or three **Owner** accounts, no more | Owner reaches every business unit, present and future |
| Do not use an Owner account for daily work | The person who administers the platform also holds an ordinary account with roles |
| Give **Viewer** to audit and security staff | They read every business unit and change nothing |
| Give **User Manager** to those who create and suspend accounts | Managing accounts does not require the right to deploy |
| Create a business unit only when isolation must be complete | Roles and environment restrictions already separate duties inside a unit — see [Organization and units](/access/organization-and-business-units) |

### Roles

| Recommendation | Reason |
|---|---|
| One role per duty, not per person | A person with two duties holds two roles; permissions add up, they never subtract |
| Keep roles small and combine them | A role restricts a whole category to the same environments: *edit in development* and *deploy in production* cannot live in one role |
| Separate who edits from who deploys to production | A change reaches production through a second person or through the pipeline |
| Restrict API Manager, Applications Manager and Environment Services to environments | These are the three categories whose permissions can be narrowed |
| Keep **Delete** out of everyday roles | Deleting a resource is rare and not reversible |
| Name a role after the duty: `Integration Developer Access` | The name is what appears in member lists and in reviews; it always ends with "Access" |
| Export each role as JSON and keep it under version control | A role can then be reviewed, compared and recreated in another business unit |

### Programs

| Recommendation | Reason |
|---|---|
| One service account per program | A leaked credential is revoked without stopping anything else |
| Never run a pipeline with a person's credentials | It would act with all of that person's rights, and stop when they leave |
| A separate service account for production | The pipeline that deploys to development cannot deploy to production |
| Prefer a JWT key, or a personal access token with a short expiration | A JWT key leaves no shared secret on the platform side; an expired token is of no use |
| Keep the credential in the secret store of the pipeline | Never in a repository or in a build log |

### Lifecycle

| Recommendation | Reason |
|---|---|
| Deactivate a grant or an account before deleting it | Access stops at once; the history stays for audit |
| Review grants in **RBAC** at a fixed interval, and at every change of team | A grant outlives the reason it was given unless someone removes it |
| Give a temporary grant an owner and an end date in your own tracking | The platform keeps a grant until it is removed |
| Verify a new role signed in as a member | An action outside the role must be refused, not hidden |

## Profiles

A profile is a kind of person or program, defined by what it must be able to do. Most
organizations have the same ones.

### At organization level

These are given in [Users](/access/users), **Manage Roles**. They concern the platform itself,
not the content of a business unit.

| Profile | Organization role | Typical holder |
|---|---|---|
| Platform administrator | **Owner** — full access to all resources and settings of the organization | The two or three people who run the platform |
| Auditor | **Viewer** — read-only access to the resources of the organization | Security officer, internal audit, architecture |
| Account manager | **User Manager** — manages users and their access | IT service desk |
| Access manager | **Permission Editor** — edits permissions and role assignments | Security team |
| Business unit creator | **Project Creator** — creates business units | Platform team, on request |

Everyone else is a plain member: they see only the business units where a role is granted to
them.

### In a business unit

| Profile | Does | Does not |
|---|---|---|
| Business unit administrator | Everything in the unit: roles, members, resources | Act in another unit |
| Integration developer | Writes, builds and deploys integrations up to staging | Deploy to production |
| API developer | Designs gateways, API instances, policies and auth gateways up to staging | Deploy to production |
| Release manager | Deploys and rolls back in production | Edit what is deployed |
| Environment operator | Creates environments and targets, deploys and recycles their services | Edit integrations or APIs |
| Secrets custodian | Creates and distributes configurations and secrets | Deploy |
| Observability engineer | Builds dashboards, exporters, log flows | Change what runs |
| Support contact | Opens and follows support cases | Change what runs |
| Deployment pipeline | Deploys to development and staging | Deploy to production |
| Release pipeline | Deploys to production | Edit |

## Reference roles

The profiles above are served by eight roles, built once in each business unit. Each holds
permissions from one or two categories only, so that they can be combined freely.

In the table, **E** is edit, **D** deploy, **R** recycle, **X** delete and **V** view. The
environments after a permission are those the category is restricted to; none means the whole
business unit.

| Role | Category | Permissions | Environments |
|---|---|---|---|
| `Integration Developer Access` | Applications Manager | E, D | development, staging |
| | Project Manager | E | — |
| `API Developer Access` | API Manager | E, D | development, staging |
| `Production Release Access` | Applications Manager | V, D | production |
| | API Manager | V, D | production |
| `Environment Operator Access` | Environments Manager | E | — |
| | Environment Services | D, R | all |
| `Secrets Custodian Access` | Secrets Manager | E, X | — |
| `Observability Access` | Monitoring Manager | E | — |
| `Support Access` | Support Manager | E | — |
| `Cleanup Access` | Applications Manager, API Manager | X | all |

:::info[View comes with Edit and Delete]
A role that edits or deletes a resource also sees it, and viewing stays business-unit-wide even
when the category is restricted. A role that only deploys needs View beside it. For someone who
must read everything and change nothing, the organization role **Viewer** is simpler than a role
in every business unit.
:::

`Cleanup Access` is granted for the time of an operation and removed afterwards.

## Reference matrix

The organization below has two business units, `payments` and `logistics`, each with the
environments `development`, `staging` and `production`. Each line is a person or a program, with
the organization role and the roles granted in each business unit.

| Who | Profile | Organization | `payments` | `logistics` |
|---|---|---|---|---|
| Platform lead | Platform administrator | Owner | — | — |
| Platform engineer | Platform administrator | Owner | — | — |
| Same two people, daily account | Environment operator | Member | Environment Operator | Environment Operator |
| Security officer | Auditor | Viewer | — | — |
| Service desk | Account manager | User Manager | — | — |
| Head of payments | Business unit administrator | Member | Administrator | — |
| Payments developer | Integration developer | Member | Integration Developer, Observability | — |
| Payments API developer | API developer | Member | API Developer, Observability | — |
| Payments tech lead | Release manager | Member | Integration Developer, Production Release, Support | — |
| Vault administrator | Secrets custodian | Member | Secrets Custodian | Secrets Custodian |
| On-call engineer | Release manager | Member | Production Release, Observability, Support | Production Release, Observability, Support |
| Logistics developer | Integration developer | Member | — | Integration Developer, Observability |
| Shared developer, two teams | Integration developer | Member | Integration Developer | Integration Developer |
| `ci-payments-deployer` | Deployment pipeline | Service account | Integration Developer | — |
| `ci-payments-release` | Release pipeline | Service account | Production Release | — |
| `ci-logistics-deployer` | Deployment pipeline | Service account | — | Integration Developer |
| `ci-logistics-release` | Release pipeline | Service account | — | Production Release |

Role names are shortened: each ends with "Access".

### What each profile may do, per environment

The same matrix, read as actions on integrations and APIs. It is what the combination of roles
above produces.

| Profile | development | staging | production |
|---|---|---|---|
| Integration developer | Edit, deploy | Edit, deploy | View |
| API developer | Edit, deploy | Edit, deploy | View |
| Tech lead | Edit, deploy | Edit, deploy | View, deploy |
| On-call engineer | View | View | View, deploy |
| Environment operator | Services: deploy, recycle | Services: deploy, recycle | Services: deploy, recycle |
| Deployment pipeline | Edit, deploy | Edit, deploy | View |
| Release pipeline | View | View | View, deploy |
| Auditor | View | View | View |
| Business unit administrator | Everything | Everything | Everything |

## Examples

### A developer joins the payments team

They sign in through the identity provider; the account is created at that first sign-in. In
**RBAC**, one grant on `payments` with `Integration Developer Access` and `Observability Access`.
Nothing else: they do not see `logistics`.

### A production incident at night

The on-call engineer holds `Production Release Access`: they roll the integration back to its
previous revision. They cannot edit it — the correction goes through development and staging
the next day, by a developer.

### A pipeline deploys on every merge

`ci-payments-deployer` holds `Integration Developer Access`, restricted to development and
staging. Promotion to production is another job, run with `ci-payments-release`, whose
credential is available only to the protected branch of the repository.

### Someone changes team

Moving from `payments` to `logistics` is removing one grant and adding another. The account, the
sign-in method and the second factor do not change.

### An external contractor for three months

A local account, since they are not in the directory, with a second factor enrolled at first
sign-in. One grant with `API Developer Access`. At the end of the mission, the account is
deactivated — and deleted once nothing refers to it.

### An audit

The auditor receives the organization role **Viewer** for the duration of the audit. They read
every business unit, including the roles and their permissions, and change nothing.

## Checklist

- [ ] An identity provider is active and tested with a second session open
- [ ] **Require MFA** is on
- [ ] Two or three local administrators hold a security key; **Registration** is off
- [ ] No more than three accounts hold **Owner**
- [ ] Every business unit has its reference roles, exported as JSON
- [ ] No role both edits and deploys to production
- [ ] Every pipeline has its own service account; production has a separate one
- [ ] No personal access token is without an expiration
- [ ] The grants were reviewed at the last change of team

## Related pages

- [RBAC model](/access/rbac-principles)
- [Create and manage roles](/access/create-and-manage-roles)
- [Sign-in hardening](/access/configure-organization-access)
- [Service accounts](/access/connected-apps)

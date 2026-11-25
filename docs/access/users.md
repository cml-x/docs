---
title: Users
sidebar_position: 1
---

**Users** lists the human accounts of the organization. Programs use
[service accounts](/access/connected-apps) instead.

## Accounts, and what they do not give

An account lets a person **sign in**. It gives no access to any business unit: a new user sees
an empty console until a role is granted to them in one. Identity and access are managed in
two different screens on purpose — you can suspend one without touching the other.

People who sign in through your company's [identity provider](/access/identity-providers) get
their account at first sign-in. Create accounts here only for people outside it.

## Account fields

An account is identified by its user name and reached through its email address. Only four fields are required to create one.

| Field | Rule |
|---|---|
| **Email** | Required. An invitation is sent to it; changing it sends a verification link |
| **Username** | Required. The login name |
| **First Name**, **Last Name** | Required |
| **Display Name**, **Nickname** | Optional |

## Account states and actions

Three actions stop someone from signing in, and they differ in what they keep. Choose the least destructive one that solves the problem.

![An active account can be locked or deactivated and brought back, with its grants kept; deleting it is permanent](/img/access/account-states.drawio.png)

| Action | Effect | Reversible |
|---|---|---|
| **Lock User Account** | Sign-in refused; grants kept | Yes, unlock |
| **Deactivate User** | Account disabled; grants kept | Yes, reactivate |
| **Delete User** | Account and access removed | No |
| **Resend verification email** | Sends the verification link again | — |
| **Manage Roles** | Organization-level roles of the user | — |

Access to business units is not set here: see [Role grants](/access/authorizations).

## Organization-level roles

**Manage Roles** gives a user a role on the organization itself. These roles administer the
platform; they are not the roles of a business unit.

| Role | Gives |
|---|---|
| **Owner** | Full access to all resources and settings of the organization |
| **Viewer** | Read-only access to the resources of the organization |
| **User Manager** | Managing users and their access |
| **Permission Editor** | Editing permissions and role assignments |
| **Project Editor** | Editing the permissions and configuration of business units |
| **Project Creator** | Creating business units |

Who should hold which is covered in [Access design](/access/access-design).

:::tip[Deactivate before deleting]
A deactivated account keeps its grants and its history, and can be reactivated. Delete only when
nothing — an audit, a transfer of ownership — still refers to the account.
:::

## Second factors of a user

An administrator can remove a factor a user has lost — **Authenticator App**, **Email OTP**,
**SMS OTP**, a security key — and unlink an external identity provider from the account. The user
enrolls again at the next sign-in when the [MFA policy](/access/mfa-policy) requires it.

## Tasks

| Task | Page |
|---|---|
| Create an account | [Create a user](/access/tasks/invite-a-user) |
| Give access to a project | [Grant roles on a project](/access/tasks/grant-access-on-a-project) |
| Suspend or remove an account | [Lock, deactivate or delete a user](/access/tasks/lock-or-remove-a-user) |
| Full sequence for a newcomer | [Onboard a user](/access/create-user) |
| Decide which profiles and roles to set up | [Access design and reference matrix](/access/access-design) |

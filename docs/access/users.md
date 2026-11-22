---
title: Users
sidebar_position: 1
---

**Users** lists the human accounts of the organization. Programs use
[connected apps](/access/connected-apps) instead.

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

| Action | Effect | Reversible |
|---|---|---|
| **Lock User Account** | Sign-in refused; grants kept | Yes, unlock |
| **Deactivate User** | Account disabled; grants kept | Yes, reactivate |
| **Delete User** | Account and access removed | No |
| **Resend verification email** | Sends the verification link again | — |
| **Manage Roles** | Organization-level roles of the user | — |

Access to projects is not set here: see [Authorizations](/access/authorizations).

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

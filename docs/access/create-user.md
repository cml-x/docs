---
title: "Onboard a User: Account, Roles, First Sign-In"
sidebar_position: 7
---

The full sequence to give a newcomer working access.

## 1. Create the account

In **Access Manager**, **Users**, **Create User**: email, user name, first and last name. An
invitation is sent. Skip this step for people who sign in through an
[identity provider](/access/identity-providers): their account is created at first sign-in.

## 2. Choose or create the role

Check that a role matches the job — see
[Create and manage roles](/access/create-and-manage-roles). Prefer a role restricted to the
environments the person works in.

## 3. Grant the role on the project

In **RBAC**, **New Authorization**: the user, the project, the role. See
[Grant roles on a project](/access/tasks/grant-access-on-a-project).

## 4. First sign-in

The user follows the invitation, sets a password, and enrolls a second factor when the
[MFA policy](/access/mfa-policy) requires one.

## 5. Verification

Signed in as the user, or with them:

- the project appears in the business unit selector;
- the applications of the menu match the role;
- an action outside the role — a deployment in production for a development role — is refused.

## Offboarding

Deactivate the account first: access stops, grants are kept for audit. Delete once nothing refers
to the account.

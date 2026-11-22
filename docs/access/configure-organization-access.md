---
title: Sign-In Hardening
sidebar_position: 9
---

A sequence that takes an organization from user name and password to single sign-on with a
second factor.

## Target state

The steps below lead to this configuration. Read it first: it tells you whether this hardening fits your organization before you change anything.

| Aspect | Setting |
|---|---|
| Sign-in | Through the company identity provider |
| Second factor | Required for local accounts; delegated to the provider for the others |
| Local accounts | A few break-glass administrators with security keys |
| Self-registration | Off |

## 1. Add the identity provider

[Add an OIDC or SAML identity provider](/access/tasks/add-an-identity-provider), activate it, and
verify with one account that sign-in works end to end.

## 2. Enforce the second factor

In [MFA Policy](/access/mfa-policy), turn **Require MFA** on with **Local MFA Only**, so that
users of the provider are not asked twice.

## 3. Tighten the login settings

In [Settings](/access/settings):

- turn **Registration** off;
- turn **Ignore Unknown Users** on;
- set the password policy and the lockout policy for the local accounts that remain.

## 4. Restrict password login

Once every user signs in through the provider, turn **Password Login** off — after checking that
the break-glass administrators can sign in with **Passwordless Login**.

## 5. Review access

In **RBAC**, review the grants: deactivate those that are no longer needed, and replace broad
roles with roles restricted to environments — see the [RBAC model](/access/rbac-principles).

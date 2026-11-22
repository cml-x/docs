---
title: Require Multi-Factor Authentication
sidebar_position: 6
---

Ask everyone for a second proof when they sign in, beyond their password.

## Before you begin

- The right to change the security policies of the organization.

## Procedure

{/* screenshot: access-tasks-require-mfa */}

1. In **Access Manager**, go to **MFA Policy**.
2. Turn **Require MFA for all users** on.
3. Choose whether it applies to **local users only**, leaving those who sign in through an identity provider to that provider.
4. Choose the methods offered as a second factor.

## Field reference

| Field | What it is | Default |
|---|---|---|
| **Require MFA for all users** | Users must set it up at their next sign-in. | Off |
| **Local users only** | Do not ask users who sign in through an external identity provider. | — |
| **Second factor methods** | An authenticator app, a code by email, a code by SMS, a security key. | — |

## Good to know

- Users set their second factor up at their next sign-in: warn them before turning this on.
- A security key or the fingerprint reader of a device resists phishing; a code by SMS does not.
- A user who lost their factor is helped from their page — see [Lock or remove a user](/access/tasks/lock-or-remove-a-user).

## See also

- [MFA Policy](/access/mfa-policy)
- [Set sign-in and password rules](/access/tasks/set-sign-in-rules)

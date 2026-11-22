---
title: Login, Password and Lockout Policies
sidebar_position: 7
---

Choose how people may sign in, how strong passwords must be, and what happens after failed attempts.

## Prerequisites

- The right to change the security policies of the organization.

## Procedure

{/* screenshot: access-tasks-set-sign-in-rules */}

1. In **Access Manager**, go to **Settings**.
2. In **Authentication Methods**, choose what is allowed: user name and password, external identity providers, security keys, and whether new users may register themselves.
3. In the password rules, set the length and the characters required.
4. In the lockout policy, set after how many failed attempts an account is locked.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Allow sign in with username and password** | Turn off when everyone signs in through an identity provider. | — |
| **Allow sign in via external identity providers** | Needed for the providers you added. | — |
| **Allow sign in with WebAuthn/FIDO2** | Security keys and device biometrics. | — |
| **Allow new users to register** | Let anyone create an account. Leave off for a private organization. | — |

## Behavior and limits

- Before turning user name and password off, check that an administrator can still sign in another way.
- Settings can be reset to their default values.
- Some of these changes ask you to prove who you are again.

## See also

- [Settings](/access/settings)
- [Configure organization access](/access/configure-organization-access)

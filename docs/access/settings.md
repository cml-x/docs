---
title: Sign-In Policies
sidebar_position: 6
---

**Settings** holds the sign-in policies of the organization.

## What these policies protect

These settings apply to **local accounts** — those that sign in with a user name and a password
kept by the platform. Users of an external identity provider follow that provider's rules for
passwords and lockout.

Tighten them in proportion to how many local accounts remain. An organization that signs in
entirely through its identity provider needs strong rules for a handful of emergency accounts,
not for everyone.

## Login settings

These switches decide which sign-in methods the organization accepts at all, and what the sign-in page reveals. They apply to every user.

| Setting | Effect |
|---|---|
| **Password Login** | Allow sign-in with user name and password |
| **Registration** | Allow new users to register themselves |
| **External Login (IdP)** | Allow sign-in through [identity providers](/access/identity-providers) |
| **Passwordless Login** | Allow sign-in with WebAuthn/FIDO2 |
| **Disable Email Login** | Only the user name is accepted as login name |
| **Hide Reset Link** | The "Forgot password" link is not shown |
| **Ignore Unknown Users** | No error reveals that a user name does not exist |

## Password policy

The password policy applies when a password is set or changed. It does not invalidate existing passwords: a stricter rule takes effect at each user's next change.

| Setting | Effect |
|---|---|
| **Minimum Length** | Minimum number of characters |
| **Uppercase**, **Lowercase** | Require at least one letter of each case |
| **Numbers** | Require at least one digit |
| **Symbols** | Require at least one special character |

## Lockout policy

The lockout policy limits guessing. After the configured number of failures the account is locked until an administrator unlocks it.

| Setting | Effect |
|---|---|
| **Max Password Attempts** | Failed passwords before the account is locked |
| **Max OTP Attempts** | Failed one-time codes before the account is locked |
| **Show Login Failures** | Tell the user how many attempts remain |

A locked account is unlocked from [Users](/access/users).

## Behavior and limits

- Changing a policy may require you to authenticate again with your second factor.
- Login settings can be reset to their defaults.
- Before turning **Password Login** off, verify that an administrator can sign in through an
  identity provider or a security key.

## Related pages

- [Login, password and lockout policies: procedure](/access/tasks/set-sign-in-rules)
- [MFA policy](/access/mfa-policy)

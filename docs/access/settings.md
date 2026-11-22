---
title: Sign-In Policies
sidebar_position: 6
---

**Settings** holds the sign-in policies of the organization.

## Login settings

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

| Setting | Effect |
|---|---|
| **Minimum Length** | Minimum number of characters |
| **Uppercase**, **Lowercase** | Require at least one letter of each case |
| **Numbers** | Require at least one digit |
| **Symbols** | Require at least one special character |

## Lockout policy

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

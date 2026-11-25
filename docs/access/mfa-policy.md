---
title: MFA Policy
sidebar_position: 5
---

The MFA policy decides whether a second factor is required at sign-in, for whom, and which
methods are offered.

## Why a second factor

A password can be guessed, reused from another site, or typed into a fake sign-in page. A second
factor means that the password alone is no longer enough. For the console — from which
production can be deployed, exposed and deleted — it is the single most effective protection.

## Enforcement

![A person signs in through the identity provider or with a local account; the MFA policy adds a second factor; the session says who they are, and roles decide what they may do](/img/access/sign-in-path.drawio.png)

Two switches decide who is asked for a second factor. The second one exists because users of an external identity provider usually already pass a second factor there.

| Setting | Effect |
|---|---|
| **Require MFA** | Every user must set up a second factor at the next sign-in |
| **Local MFA Only** | Users who sign in through an external identity provider are not asked: their provider is trusted for it |

## Methods

You choose which methods users may enroll. They are not equivalent: a code typed by the user can be captured by a fake sign-in page, a security key cannot.

| Method | Kind | Resists phishing |
|---|---|---|
| **Authenticator App (TOTP)** | Second factor | No |
| **OTP Email** | Second factor | No |
| **OTP SMS** | Second factor | No |
| **Security Keys (U2F/WebAuthn)** | Second factor, or multi-factor with user verification | Yes |

A second factor (2FA) proves possession. A multi-factor method (MFA) with user verification — a
security key with a PIN or a biometric check — proves possession and presence in one step.

:::tip[Prefer security keys for administrators]
A security key or a device's biometric check verifies the site it talks to: it cannot be
replayed on a fake page. Codes sent by SMS or email can.
:::

## Before enforcing

- Announce it: users enroll at their next sign-in and cannot skip it.
- Keep at least two administrators enrolled with a security key.
- A user who loses a factor is helped from their page in [Users](/access/users).

## Related pages

- [Enforce multi-factor authentication](/access/tasks/require-mfa)
- [Login, password and lockout policies](/access/settings)

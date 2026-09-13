---
title: Configure Organization Access
sidebar_position: 9
---

Organization-wide access rules live in two places in Access Manager.

## Login and password rules

In [Settings](/access/settings), configure:

- **Login Policy** — password login, external identity-provider login, self-registration,
  passwordless login, MFA enforcement, password-reset link visibility, and unknown-user handling
  for email login.
- **Password Policy** — complexity rules new passwords must satisfy.
- **Lockout Policy** — failed sign-in attempt thresholds before an account is temporarily locked.

## Multi-factor authentication

In [MFA Policy](/access/mfa-policy), choose which second-factor methods are available (TOTP, U2F,
email OTP, SMS OTP), which require device-level verification, and whether MFA is forced for
everyone or only for local (non-federated) accounts.

## External identity providers

To let users sign in with an existing account instead of a platform password, federate a provider
under [Identity Providers](/access/identity-providers) — Google, GitHub, GitHub Enterprise,
Microsoft, GitLab, Apple, generic OIDC, or SAML 2.0.

---
title: MFA Policy
sidebar_position: 5
---

Enforce multi-factor authentication **organization-wide**, rather than leaving it up to each user.

## What you can configure

- Toggle which **second-factor methods** are available: TOTP (authenticator app), U2F (security
  keys), email OTP, SMS OTP.
- Choose which **multi-factor methods require device-level verification** (e.g. U2F with
  PIN/biometrics).
- Optionally **force MFA for everyone**, or only for **local accounts** (leaving users who sign in
  through a federated [identity provider](/access/identity-providers) to that provider's own MFA).

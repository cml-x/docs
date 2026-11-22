---
title: Service Accounts
sidebar_position: 3
---

A connected app is a machine identity: a CI pipeline, a script or another system that calls the
platform API without a person signing in. It is granted roles exactly like a user.

:::info Not for the clients of your APIs
Applications that call the APIs **you expose** are OAuth clients of an
[auth gateway](/auth/client-lists), not connected apps.
:::

## Why programs get their own identity

A pipeline or a script that uses a person's credentials stops working when that person leaves,
acts with all of their rights, and makes the audit trail say a human did what a robot did. A
service account fixes the three: it belongs to no one, has only the roles you grant it, and
appears under its own name.

:::tip One account per program
When a credential leaks, you revoke one account and one program is affected. A shared account
turns every leak into an outage for everything that used it.
:::

## Credentials

{/* screenshot: access-connected-app-credentials */}

A service account can authenticate in three ways. They differ in what is stored where and in how the credential is presented; an account may have several at once.

| Credential | Use | Shown |
|---|---|---|
| **Client ID** and **Client Secret** | OAuth 2.0 client credentials grant | The secret, once, at creation |
| **Personal Access Tokens** | A bearer token sent as is in the `Authorization` header | Once, at creation; with an expiration |
| **JWT Keys** | A private key used to sign a JWT assertion exchanged for a token | Downloaded once, at creation; with an expiration |

## Choosing a credential

The right credential depends on what the calling program can do and on how much you want to limit a leak.

| Situation | Credential |
|---|---|
| A script, a quick automation | Personal access token with a short expiration |
| A service that can run an OAuth flow | Client ID and secret |
| No shared secret may be stored on the platform side | JWT key: only the public key is kept |

## States

Each credential can be revoked on its own, and the whole account can be suspended. Revocation is immediate: the next call with that credential is refused.

| Action | Effect |
|---|---|
| **Remove Client Secret** | The client credentials grant stops working at once |
| **Delete Token**, **Delete Key** | That credential stops working at once |
| **Deactivate** | Every credential of the app is refused; reversible |
| **Delete** | Permanent. The name of the app must be typed to confirm |

## Related pages

- [Create a connected app](/access/tasks/create-a-connected-app)
- [RBAC model](/access/rbac-principles)

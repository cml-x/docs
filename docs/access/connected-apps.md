---
title: "Connected Apps: Service Accounts for the Platform API"
sidebar_position: 3
---

A connected app is a machine identity: a CI pipeline, a script or another system that calls the
platform API without a person signing in. It is granted roles exactly like a user.

:::info Not for the clients of your APIs
Applications that call the APIs **you expose** are OAuth clients of an
[auth gateway](/auth/client-lists), not connected apps.
:::

## Credentials

{/* screenshot: access-connected-app-credentials */}

| Credential | Use | Shown |
|---|---|---|
| **Client ID** and **Client Secret** | OAuth 2.0 client credentials grant | The secret, once, at creation |
| **Personal Access Tokens** | A bearer token sent as is in the `Authorization` header | Once, at creation; with an expiration |
| **JWT Keys** | A private key used to sign a JWT assertion exchanged for a token | Downloaded once, at creation; with an expiration |

## Choosing a credential

| Situation | Credential |
|---|---|
| A script, a quick automation | Personal access token with a short expiration |
| A service that can run an OAuth flow | Client ID and secret |
| No shared secret may be stored on the platform side | JWT key: only the public key is kept |

## States

| Action | Effect |
|---|---|
| **Remove Client Secret** | The client credentials grant stops working at once |
| **Delete Token**, **Delete Key** | That credential stops working at once |
| **Deactivate** | Every credential of the app is refused; reversible |
| **Delete** | Permanent. The name of the app must be typed to confirm |

## Related pages

- [Create a connected app](/access/tasks/create-a-connected-app)
- [RBAC model](/access/rbac-principles)

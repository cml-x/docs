---
title: Service Account Reference
sidebar_position: 3
---

A service account is a machine identity: a CI pipeline, a script or another system that calls
the platform API without a person signing in. It is granted roles exactly like a user.

:::info[Not for the clients of your APIs]
Applications that call the APIs **you expose** are OAuth clients of an
[auth gateway](/auth/client-lists), not service accounts.
:::

Rationale: [Why programs get their own identity](/access/sign-in-and-identity-model#why-programs-get-their-own-identity).

## Credential Types

{/* screenshot: access-connected-app-credentials */}

A service account can authenticate in three ways. They differ in what is stored where and in how the credential is presented; an account may have several at once.

![A program presents one of the three credentials of its service account: a client secret or a signed JWT is exchanged for an access token, a personal access token is sent as is; the platform API then checks the roles of the account](/img/access/service-account-credentials.drawio.png)

| Credential | Use | Shown |
|---|---|---|
| **Client ID** and **Client Secret** | OAuth 2.0 client credentials grant | The secret, once, at creation |
| **Personal Access Tokens** | A bearer token sent as is in the `Authorization` header | Once, at creation; with an expiration |
| **JWT Keys** | A private key used to sign a JWT assertion exchanged for a token | Downloaded once, at creation; with an expiration |

Rationale: [Choosing a service account credential](/access/sign-in-and-identity-model#choosing-a-service-account-credential).

## Revocation and Account States

Each credential can be revoked on its own, and the whole account can be suspended. Revocation is immediate: the next call with that credential is refused.

| Action | Effect |
|---|---|
| **Remove Client Secret** | The client credentials grant stops working at once |
| **Delete Token**, **Delete Key** | That credential stops working at once |
| **Deactivate** | Every credential of the app is refused; reversible |
| **Delete** | Permanent. The name of the app must be typed to confirm |

## Related pages

- [Create a service account](/access/tasks/create-a-connected-app)
- [RBAC model](/access/rbac-principles)
- [Access design and reference matrix](/access/access-design) — one account per pipeline, a separate one for production

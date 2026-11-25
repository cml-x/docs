---
title: Secure an API
sidebar_position: 4
---

Require every caller of an API to authenticate, with tokens issued by the platform.

Use this guide when an API is published and must only answer callers you know.

## Choose the method

The right authentication method depends on who calls the API. Pick the row that matches the caller.

| Caller | Method | Page |
|---|---|---|
| Applications, service to service | JWT with OAuth 2.0 client credentials | This guide |
| People in a browser | OIDC authorization code flow | [OIDC authentication](/auth/configure-oidc) |
| A few known partners, simple tooling | API key | [API key authentication](/api-manager/policy-tasks/api-key) |
| Decision taken by your own service | External authorization | [External authorization](/api-manager/policy-tasks/external-auth) |

## Procedure: JWT with client credentials

1. **Token service** — in **API Manager**, **Auth Gateways**, create an
   [auth gateway](/auth/auth-gateway) on an HTTPS access point. Its address is the issuer.
2. **Audience** — open the API instance and copy its **audience ID**.
3. **Client** — in a [client list](/auth/client-lists) attached to the auth gateway, register
   the application and add the audience ID to the APIs its tokens are for.
4. **Policy** — on the API instance, add a **JWT authentication** rule issued by the auth
   gateway, with the audience check on.

## Verification

```bash title="Token request"
TOKEN=$(curl -s https://auth.example.com/api/oidc/token \
  -u "$CLIENT_ID:$CLIENT_SECRET" \
  -d grant_type=client_credentials | jq -r .access_token)
```

```bash title="Calls"
curl -i https://orders.example.com/orders                                  # 401
curl -i https://orders.example.com/orders -H "Authorization: Bearer $TOKEN" # 200
```

:::warning[Never put the client secret in a URL or a repository]
Read it from a stored configuration or from the secret store of the calling application. A
secret that reached a log or a commit must be regenerated.
:::

## Who may manage the API

Calling an API and managing it are separate: the first is decided by tokens, the second by
[roles](/access/rbac-principles) in Access Manager.

Refused calls: [Tokens and sign-in](/troubleshooting/tokens-and-sign-in).

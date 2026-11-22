---
title: JWT Authentication
sidebar_position: 3
---

Require a valid access token on every request, issued by an auth gateway of the environment or by your own identity provider.

## How it works

The caller sends a signed token; the gateway verifies its signature with the public keys of the issuer, then its issuer, expiry and — when asked — audience. No call is made to the issuer per request, so verification is fast and keeps working if the issuer is briefly unavailable.

:::warning Turn the audience check on
Without it, a token issued for another API by the same issuer is accepted here.
:::

Every parameter and its default: [reference](/api-manager/reference/security-policy#jwt-authentication).

## Use cases

For APIs called by applications. A token expires and names the API it is for, which a key does not.

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.
- An [auth gateway](/auth/auth-gateway) with a [list of clients](/auth/client-lists), or an identity provider that issues JWT tokens.

## Procedure

{/* screenshot: api-manager-policy-tasks-jwt */}

1. In **API Manager**, go to **API Instances** and open the API. To cover everything published on a gateway instead, open the gateway.
2. Open its **Security** policies and add the rule **token verification (JWT)**.
3. In **Tokens issued by**, choose **An auth gateway**, then the auth gateway. For your own provider, choose **Another identity provider** and fill **Provider Name**, **Issuer** and **JWKS URI**.
4. Turn **Check the audience** on. **Audience of this API** is filled in for you.
5. Add **Other audiences** only if tokens meant for something else must also be accepted.
6. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Tokens issued by** | An auth gateway of the environment, or another identity provider. | Another identity provider |
| **Auth gateway** | The auth gateway whose tokens are accepted. Its issuer and the address of its keys come with it. | — |
| **Provider Name** | A short name for the source of tokens, such as `internal-sso`. | — |
| **Issuer** | The issuer written in the tokens. It must match exactly. | — |
| **JWKS URI** | The address where the provider publishes its public keys. | — |
| **Check the audience** | Refuse a token that was not issued for this API. | Off |
| **Audience of this API** | The audience ID of the API. A token is checked against it first. | Filled in |
| **Other audiences** | Other values a token may be intended for. | — |

## Verification

```bash title="Obtain a token, then call the API"
TOKEN=$(curl -s -u "<client-id>:<secret>" https://auth.example.com/api/oidc/token \
  -d grant_type=client_credentials -d scope="orders.read" | jq -r .access_token)

curl -i -H "Authorization: Bearer $TOKEN" https://orders.example.com/orders
```

```http title="Answer"
HTTP/1.1 200 OK
```

## Behavior and limits

- With **Check the audience** off, any valid token of the issuer is accepted, whatever API it was meant for.
- A change in a list of clients takes a couple of minutes to reach the auth gateway; a token obtained before the change does not carry it.

## See also

- [Protect an API with JWT](/auth/protect-api-with-jwt) — the complete walk-through
- [Lists of Clients](/auth/client-lists)
- [Policies](/api-manager/policies) — every rule at a glance

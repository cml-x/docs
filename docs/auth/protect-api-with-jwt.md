---
title: Protect an API with JWT
sidebar_position: 4
---

A **JWT policy** makes a gateway check the access token of every request before it reaches your
service. A request without a valid token is refused at the gateway.

This page goes from an unprotected API to one that only the applications you registered can call.

## Before you start

You need:

- an [API instance](/api-manager/api-instances) published on a gateway;
- an [auth gateway](/auth/auth-gateway) in the same environment — or an identity provider of your
  own that issues JWT tokens.

## 1. Note the audience ID of the API

Open the API instance. Its page shows its **audience ID**. Copy it: it is how tokens say they are
meant for this API.

## 2. Register the application

In a [list of clients](/auth/client-lists), add a client for the application that will call the
API:

- give it a name and generate its secret — **copy the secret now**, it is shown once;
- in **Permissions it may ask for**, give at least one, such as `orders.read`;
- in **APIs its tokens are for**, add the audience ID you copied.

Make sure the list is chosen in the **Clients** setting of the auth gateway.

## 3. Add the policy to the API

On the page of the API instance, open its security policies and add **token verification (JWT)**.

| Field | What to choose |
|---|---|
| **Tokens issued by** | **An auth gateway** |
| **Auth gateway** | Your auth gateway. Its issuer and the address of its keys are filled in for you. |
| **Check the audience** | On |
| **Audience of this API** | Already filled in with the audience ID of the API. |
| **Other audiences** | Leave empty, unless tokens meant for something else must also be accepted. |

Deploy.

### With an identity provider of your own

Choose **Another identity provider** and give:

| Field | What it is | Example |
|---|---|---|
| **Provider Name** | A short name for this source of tokens | `internal-sso` |
| **Issuer** | The issuer written in the tokens — it must match exactly | `https://sso.example.com` |
| **JWKS URI** | Where the provider publishes its public keys | `https://sso.example.com/keys` |

## 4. Call the API

The application first obtains a token:

```bash title="1. Obtain a token"
curl -u "<client-id>:<secret>" \
  https://auth.example.com/api/oidc/token \
  -d grant_type=client_credentials \
  -d scope="orders.read"
```

then sends it with each request:

```bash title="2. Call the API"
curl -H "Authorization: Bearer <token>" https://orders.example.com/orders
```

## What is accepted, what is refused

| The request carries | Result |
|---|---|
| A valid token naming this API | Reaches your service |
| No token | Refused |
| A token that has expired | Refused |
| A token signed by another issuer | Refused |
| A valid token that does not name this API, with **Check the audience** on | Refused |
| A valid token that does not name this API, with **Check the audience** off | Reaches your service |

## Should the audience be checked?

**Check the audience** answers this question: *is a token issued for another API good enough to
call this one?*

- **Off** — any valid token of the auth gateway is accepted. Simple, and enough when every client
  may call every API.
- **On** — only the tokens that name this API are accepted. Each client then calls the APIs
  listed for it, and no other. This is the setting to prefer as soon as several APIs share an
  auth gateway.

A client that calls several APIs lists the audience ID of each: its tokens name them all, and
each of those APIs accepts them.

## If a call is refused

- **The token has expired** — obtain a new one.
- **The audience is missing** — check that the audience ID of the API is in **APIs its tokens are
  for** on the client, and that the client's list is chosen on the auth gateway. A change in a
  list takes a couple of minutes to be picked up; a token obtained before the change does not
  carry it.
- **The issuer does not match** — the address of the auth gateway changed, or the policy points at
  another one.

To see what a token carries, decode it: the `aud` field lists the APIs it names, `iss` its
issuer, `exp` when it expires.

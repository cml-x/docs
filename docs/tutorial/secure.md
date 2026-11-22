---
title: "9. Secure the API: API Key, Basic Auth, JWT, External Authorization"
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The orders API answers anyone. This step closes it, in four ways, from the simplest to the most
complete. They are alternatives: choose the one that fits who calls the API.

![Where each protection is checked](/img/tutorial/security.drawio.png)

In every case the check happens **at the gateway**. A request that fails it never reaches the
integration, and the route does not change.

## Authentication method by client type

| Who calls | Protection | What the caller sends | What you manage |
|---|---|---|---|
| A few known applications, simply | **API key** | A key in a header | A list of keys |
| People or scripts, on an internal tool | **User name and password** | A user name and a password | A list of users |
| Applications, at scale and per API | **Token (JWT)** | A token obtained beforehand | Clients, and what each may call |
| Anything, by rules of your own | **External authentication** | Whatever your service expects | A service that answers yes or no |
| People in a browser | **Sign-in** | Nothing: they are sent to sign in | An identity provider |

Security rules are added from the page of the API instance, in its security policy.

## A. API key authentication

{/* screenshot: tutorial-api-key-rule */}

The quickest way to close an API.

1. In **Secret Manager**, create an **API Keys** configuration named `orders-keys`. Add one entry
   per client — `mobile-app`, `backoffice`. Each key is shown once: copy it.
2. On the API instance, add the rule **API keys**, choose `orders-keys`, and say where the key is
   sent: the header `x-api-key`.
3. Deploy.

<Tabs>
<TabItem value="without" label="Without a key" default>

```bash
curl -i https://orders.example.com/orders
```

```http title="Answer"
HTTP/1.1 401 Unauthorized
```

</TabItem>
<TabItem value="with" label="With a key">

```bash
# highlight-next-line
curl -i -H "x-api-key: <key>" https://orders.example.com/orders
```

```http title="Answer"
HTTP/1.1 200 OK
content-type: application/json

{"greeting":"Hello from orders","region":"eu-west"}
```

</TabItem>
</Tabs>

Useful options: **Forward Client ID Header** passes the name of the client to the integration,
which can then tell `mobile-app` from `backoffice`; **Sanitize Key** removes the key before the
request reaches the integration.

**Limits** — a key does not expire and says nothing about what the caller may do. Whoever holds
it can call the API until you remove it.

## B. HTTP Basic authentication

1. Create a **Basic Auth Users** configuration with the users and their passwords.
2. On the API instance, add the rule **user name and password**, and choose it.
3. Deploy.

```bash title="With a user name and a password"
curl -u alice:<password> https://orders.example.com/orders
```

A browser shows its own sign-in prompt. **Forward Username Header** passes the verified user name
to the integration.

**Limits** — the password travels with every request. Suitable for an internal tool, not for a
public API.

## C. JWT authentication (OAuth 2.0 client credentials)

{/* screenshot: tutorial-jwt-rule */}

The way to protect APIs called by applications. The caller first obtains a **token** from an auth
gateway, valid for a limited time, then sends it with each request. The gateway checks the
signature of the token, that it has not expired, and that it was issued **for this API**.

1. **Create the token service.** In **API Manager**, **Auth Gateways**, create one on the HTTPS
   access point of your gateway, at `auth.example.com`.
2. **Register the caller.** Copy the **audience ID** shown on the orders API. In a list of
   clients, add a client: a name, a generated secret, the permission `orders.read`, and the
   audience ID. Choose the list on the auth gateway.
3. **Protect the API.** On the API instance, add **token verification (JWT)**: tokens issued by
   **an auth gateway**, yours, with **Check the audience** on.
4. Deploy.

```bash title="1. Obtain a token from the auth gateway"
curl -u "<client-id>:<secret>" https://auth.example.com/api/oidc/token \
  -d grant_type=client_credentials \
  -d scope="orders.read"
```

```json title="Answer"
{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

```bash title="2. Call the API with the token"
curl -H "Authorization: Bearer eyJhbGciOi..." https://orders.example.com/orders
```

Why it is better than a key:

- a token **expires**: a stolen one is useless shortly after;
- a token says **which API** it is for: a client registered for the orders API cannot call the
  billing API with it;
- the secret of the client is sent to the auth gateway only, never to the API.

Each step is detailed in [Auth Gateways](/auth/auth-gateway),
[Lists of Clients](/auth/client-lists) and
[Protect an API with JWT](/auth/protect-api-with-jwt).

If your company already has an identity provider that issues tokens, choose **Another identity
provider** in the rule and give its issuer and the address of its keys: no auth gateway is needed.

## D. External authorization

When the decision depends on your own rules — a customer's contract, a time of day, a partner
directory — the gateway can ask **a service of yours** for each request.

1. Deploy the service that decides. It can be an integration: it receives the request's headers
   and answers *allowed* or *denied*.
2. On the API instance, add the rule **external authentication**: choose **HTTP** or **gRPC**,
   and the service.
3. Deploy.

**Fail Open** decides what happens when your service does not answer. Off — the default — the
request is refused: the API is unavailable but never open. On, the request goes through.

**Limits** — every request now waits for your service, and depends on it. Keep it fast and run
more than one instance.

## Combining rules in one security policy

A security policy can hold several rules. Two combinations are common:

- **tokens + address rules** — only your partners' addresses, and each with a valid token;
- **tokens + rate limit** — each client is identified, and none can flood the API.

Add **CORS** when the API is called by a web page served from another site.

## Test matrix

| Test | Expected |
|---|---|
| Call without credentials | Refused |
| Call with valid credentials | Answered |
| Call with the credentials of another API | Refused, with tokens and the audience check on |
| Look at the logs of the integration | Only the accepted calls appear |

Next: [observe the integration](/tutorial/observe).

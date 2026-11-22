---
title: Overview
sidebar_position: 1
---

Authentication answers one question for your APIs: **who is calling?**

Camel X covers the two usual situations:

| Who calls the API | How it proves who it is | What to set up |
|---|---|---|
| An **application** — a backend, a partner system, a scheduled job | It obtains a token and sends it with each call | An [auth gateway](/auth/auth-gateway), a [list of clients](/auth/client-lists), and a [JWT policy](/auth/protect-api-with-jwt) on the API |
| A **person**, in a browser | They sign in with your identity provider | A [sign-in policy](/auth/configure-oidc) on the API |

Simpler means exist too — API keys, user name and password — described with the other
[policies](/api-manager/policies).

## Why tokens rather than keys

An API key is a shared secret that never expires and says nothing about what it may be used
for. A token is issued for a short time, for named APIs, and is verified by the gateway from its
signature alone: no lookup, no shared secret travelling with every call.

The price is one more component — the token service — and one more call for the application.
The platform provides the token service: the **auth gateway**.

:::tip When an API key is enough
A handful of internal callers, a tool that cannot run OAuth, a quick integration test: an API key
is a reasonable choice. Move to tokens when callers multiply or when one credential must not
open every API.
:::

## Client credentials flow in four steps

1. **Create an auth gateway.** It is the token service of the environment.
2. **Register your applications as clients**, in a list of clients, and attach the list to the
   auth gateway.
3. **Protect the API** with a JWT policy that trusts the auth gateway.
4. **Call the API**: the application asks the auth gateway for a token, then sends it with each
   request.

![Tokens for applications](/img/auth/token-flow.drawio.png)

The application never talks to your service without going through the gateway, and your service
never has to check a token itself.

:::warning A token is valid until it expires
Removing a client stops it from obtaining new tokens; tokens already issued stay valid until
their expiry. Keep token lifetimes short for sensitive APIs.
:::

## Console locations

- **Auth gateways** are created in **API Manager**, under **Auth Gateways**.
- **Lists of clients** are stored configurations: they live in **Secret Manager**, and
  can be created from the auth gateway itself.
- **Policies** are attached from the page of an API instance or of a gateway.

Start with [Auth Gateways](/auth/auth-gateway).

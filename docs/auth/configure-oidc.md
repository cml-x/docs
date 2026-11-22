---
title: OIDC Authentication With an Identity Provider
sidebar_position: 5
---

A **sign-in policy** sends the people who open an API or an application in their browser to the
sign-in page of your identity provider — Google, Microsoft, Keycloak or any provider that speaks
OpenID Connect. Once signed in, they are kept signed in with a session cookie. Nothing changes in
your application.

It is meant for **people using a browser**. For applications calling an API, use
[tokens and a JWT policy](/auth/protect-api-with-jwt) instead.

## Prerequisites

Register your application with the identity provider. It gives you:

- a **client ID** and a **client secret**;
- the address of the provider, such as `https://accounts.google.com`.

It also asks for a **redirect URL**: the address users are sent back to after signing in. It is
an address of your API, in HTTPS.

## 1. Client credentials configuration

In **Secret Manager**, create a configuration of the kind
[Client Credentials](/config-sources/templates#client-credentials) with the client ID and the
client secret. You can also create it from the policy, in the next step.

## 2. OIDC rule on the security policy

On the page of the API instance or of the gateway, open its security policies and add **sign-in
with an identity provider (OIDC)**.

| Field | What it is | Default |
|---|---|---|
| **OIDC Issuer** | The address of the identity provider. | — |
| **Credentials** | The stored client ID and secret of your application. | — |
| **Client ID** | Leave empty: it is read from the credentials. Fill it only for a provider whose ID is not stored with its secret. | Empty |
| **Redirect URL** | The address users are sent back to after signing in. It must be the one registered with the provider. | — |
| **Scopes** | What is asked of the provider about the user. | `openid`, `email`, `profile` |
| **Cookie Suffix** | Added to the name of the session cookie, to tell policies apart when several are in use. | Empty |

Deploy.

## Authorization code flow as seen by the user

1. They open the address of the API in their browser.
2. They are sent to the sign-in page of the identity provider.
3. Once signed in, they are sent back and reach the application. They are not asked again until
   their session ends.

## Behavior and limits

- The redirect URL must match **exactly** what is registered with the provider, scheme and path
  included.
- When two sign-in policies protect two APIs on the same host name, give each a different
  **Cookie Suffix**.
- The [auth gateway](/auth/auth-gateway) of an environment issues tokens to applications; it is
  not an identity provider for signing people in.

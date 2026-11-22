---
title: Add an Identity Provider
sidebar_position: 5
---

Let the people of your company sign in to the console with the accounts they already have.

## How it works

Federation lets people sign in with their company account. The console redirects them to the provider and receives a signed assertion of who they are. Roles are still granted in the console.

:::warning[Keep a way back in]
Keep an administrator session open, and a local administrator account, until sign-in through the provider is verified.
:::

## Prerequisites

- An administrator of your identity provider, to register the console there.

## Procedure

{/* screenshot: access-tasks-add-an-identity-provider */}

1. In **Access Manager**, go to **Identity Providers** and choose **Add Provider**.
2. Choose your provider among the popular ones, or **Generic Provider** for any provider that speaks OpenID Connect or SAML.
3. Follow the **Setup Guide** shown: it gives the **callback URL** to register at the provider.
4. Fill what the provider gave you, then add.
5. Turn the provider on for sign-in.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Display Name** | What users see on the sign-in page. | — |
| **Client ID, Client Secret** | Given by the provider when the console is registered there. | — |
| **Issuer URL** | For OpenID Connect: the address of the provider. | — |
| **Metadata URL or XML** | For SAML: the description of the provider. | — |
| **Scopes** | What is asked of the provider about the user. | — |

## Behavior and limits

- The callback URL must be registered at the provider exactly as shown.
- A provider can be deactivated without being deleted.
- This is about signing in to the **console**. Signing people in to one of **your APIs** is a [policy](/auth/configure-oidc).

## See also

- [Identity Providers](/access/identity-providers)
- [Require multi-factor authentication](/access/tasks/require-mfa)

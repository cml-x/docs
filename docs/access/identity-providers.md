---
title: Identity Providers
sidebar_position: 4
---

An identity provider lets people sign in to the console with an account managed elsewhere.

## Why federate sign-in

Without an identity provider, every user has one more password, and leaving the company does not
remove access to the console until someone remembers to. With one, people sign in with their
company account: its password policy, its second factor and its offboarding apply here too.

The console still decides **what** each person may do, through roles. The provider only answers
**who** they are.

## Supported providers

Popular providers have a dedicated form that asks only for what that provider needs. Any other provider that speaks OpenID Connect or SAML 2.0 is configured with the generic forms.

| Provider | Protocol | What you give |
|---|---|---|
| **Google** | OIDC | Client ID, client secret |
| **Microsoft** | OIDC | Client ID, client secret, tenant |
| **GitHub**, GitHub Enterprise Server | OAuth 2.0 | Client ID, client secret; the server URL for Enterprise |
| **GitLab**, self-hosted GitLab | OIDC | Client ID, client secret; the instance URL when self-hosted |
| **Apple** | OIDC | Service ID, Team ID, Key ID, private key (`.p8`) |
| **Generic OIDC** | OIDC | Issuer URL, client ID, client secret, scopes |
| **SAML 2.0** | SAML | Metadata URL or metadata XML |

## Registration at the provider

The console shows, for each provider, the value to register on the provider side:

| Protocol | Value | Where it goes |
|---|---|---|
| OIDC, OAuth 2.0 | **Redirect URI / Callback URL** | Allowed redirect URIs of the application |
| SAML 2.0 | **ACS URL** (Assertion Consumer Service) | Service provider settings |

The value must be registered exactly as shown: scheme, host, path, no trailing slash added.

:::warning Test with a second session
Before requiring the provider for everyone, sign in through it in a private window while keeping
an administrator session open. A mistake in the redirect URL locks out whoever depends on it.
:::

## Lifecycle

A provider is added once and can then be switched on and off. Switching it off is how you test a change, or cut a provider quickly, without losing its configuration.

| Action | Effect |
|---|---|
| Activate for sign-in | The provider appears on the sign-in page |
| Deactivate | It disappears from the sign-in page; its configuration is kept |
| Update the client secret | For a secret rotated at the provider |
| Delete | The configuration is removed |

External sign-in must also be allowed in the [login settings](/access/settings).

## Related pages

- [Add an OIDC or SAML identity provider](/access/tasks/add-an-identity-provider)
- [OIDC authentication on an API](/auth/configure-oidc) — sign-in to your APIs, not to the console

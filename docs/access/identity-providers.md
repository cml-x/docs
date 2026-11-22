---
title: "Identity Providers: OIDC, SAML 2.0 and Social Login"
sidebar_position: 4
---

An identity provider lets people sign in to the console with an account managed elsewhere.

## Supported providers

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

## Lifecycle

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

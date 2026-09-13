---
title: Authentication vs Authorization
sidebar_position: 1
---

Camel X keeps these two concerns in different apps — mixing them up is the most common source of
confusion when something is unexpectedly denied.

- **Authentication** answers *"who is this?"*
- **Authorization** answers *"what are they allowed to do?"*

## For the Camel X platform itself

| | Authentication | Authorization |
|---|---|---|
| Signing in | [Access Manager](/access/configure-organization-access): password login, or a federated [Identity Provider](/access/identity-providers) (Google, GitHub, Microsoft, GitLab, Apple, OIDC, SAML), plus [MFA](/access/mfa-policy) | [Access Manager](/access/assign-roles-and-permissions): organization-level admin roles (Owner, Viewer, User Manager, Permission Editor, Project Editor, Project Creator) and project-scoped Authorizations |
| Programmatic access | A [Connected App](/access/connected-apps)'s client secret, personal access token, or JSON Web Key | Whatever project authorizations are granted to the account the Connected App acts as |

Authentication happens once, at sign-in. Authorization is checked continuously — a project
authorization can be deactivated at any time, immediately revoking access without touching the
user's login credentials.

## For an API you expose

| | Authentication | Authorization |
|---|---|---|
| Who issues proof of identity | [Authentication Manager](/auth/getting-start): an Auth Gateway (Kanidm-backed OAuth2/OIDC) issues tokens to registered Client Apps or Service Accounts |
| Who checks it at the door | [API Manager](/api-manager/getting-start): a Security policy (JWT, OIDC, API key, or basic auth) attached to the gateway or API Instance validates the token on every request |
| Fine-grained authorization | Whether a validated token's specific claims or scopes are checked for finer-grained authorization (beyond "valid or not") is **[À CONFIRMER]** — verify against your policy's configuration |

See [Secure an API](/guides/secure-an-api) for the end-to-end setup, and
[API Security in Camel X](/security/api-security) for the full list of available policies.

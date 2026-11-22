---
title: Overview
sidebar_position: 1
---

**Secret Manager** is the single place where the platform keeps everything that must not be
written in source code or baked into an image: credentials, certificates, lists of clients and
users, externalized settings. Every other application of the console **refers** to what is
stored here; none keeps a copy.

![Configurations are kept in a secured vault and mounted only on the instances that need them](/img/config-sources/secure-configuration.drawio.png)

## The center of all configuration

Whatever an integration, a gateway or an environment needs from outside its own definition is a
**configuration** of Secret Manager. That is true for secrets and for plain settings alike.

| What | Template | Consumed by |
|---|---|---|
| OAuth clients allowed to obtain tokens | Auth Gateway Clients | Auth gateways |
| Users for HTTP Basic authentication | Basic Auth Users | Gateways, through a security policy |
| API keys | API Keys | Gateways, through a security policy |
| TLS certificates and private keys | TLS Certificate | Gateway access points, backend TLS |
| Certificate authorities to trust | Resources File | Integrations, through the JVM setting |
| Externalized properties | Properties, Secure Properties | Integrations |
| Mounted files: mappings, catalogs | Resources File, Secure Resources File | Integrations |
| Registry, Maven and Git credentials | Image Registry, Maven Settings, Git Repository Credentials | Environment build service, integrations |
| Credentials of log destinations | Logging templates | Log exporter |

Having one place has practical consequences: a credential is rotated once and every consumer
follows; an audit of "who can read the production database password" has one screen to look at;
and no team invents its own way of passing secrets.

## Security model

The model rests on one separation: **the platform knows a configuration by reference; its
content lives in a secured vault and reaches only the instances that need it.**

| Property | What it means |
|---|---|
| **Content in a vault** | The values of a configuration are written to a secured store, encrypted. The console and its database keep the name, the template and the distribution — not the content |
| **References everywhere else** | An integration setting, a policy or an environment service records *which* configuration it uses, by name. Exporting or reading that definition reveals no secret |
| **Mounted on instances only** | The content is delivered directly to the running instance — as a file or a variable — when it starts. It is not in the source repository, not in the container image, not in build logs |
| **Distribution is explicit** | A configuration exists in an environment only if it was made available there. A production credential not distributed to development cannot be mounted, or leaked, there |
| **Write-only values** | Keys of an API Keys list, passwords of Basic Auth Users and secrets of OAuth clients are kept as fingerprints: they can be replaced, never read back |
| **Masked display** | Other sensitive values are hidden on screen until explicitly revealed, by someone whose role allows it |

:::info Vault-backed storage
Storage of contents in a dedicated vault is the target architecture and is being rolled out. The
model above — references in the platform, contents mounted only on instances — is the one to
design for: never copy a secret value into a route, a property committed to Git, or an
environment variable typed in clear.
:::

:::danger What defeats the model
A secret pasted into a route, into an inline property or into a clear-text environment variable
is stored with the integration and visible to whoever can read it. Always choose a stored
configuration instead.
:::

## Model

Three notions are enough to use Secret Manager. A template says what kind of thing is stored; a
configuration is one such thing; its distribution says where it can be used.

| Object | What it is |
|---|---|
| **Template** | The kind of a configuration: its fields, its validation, whether it is sensitive — see [Templates](/config-sources/templates) |
| **Configuration** | One instance of a template, with its values |
| **Distribution** | The environments a configuration is available in |

## Lifecycle

1. **Create** — choose a template; the form has three steps: **Details**, **Properties**,
   **Distribute**.
2. **Distribute** — make it available to the environments that need it, and only those.
3. **Reference** — choose it in the field of an integration setting, a policy or an environment
   service.
4. **Rotate** — change its value in place; consumers follow without being edited.

:::tip Created and distributed from the form that needs it
Every field that expects a configuration lists the ones of the right template, offers **New
secret** to create one in a side panel, and **Make available** when one exists but is not yet
distributed to the environment.
:::

## Views

The menu offers three ways into the same configurations, split by sensitivity or by template.

| View | Shows |
|---|---|
| [Secrets](/config-sources/secrets) | Sensitive configurations: credentials, keys, tokens, certificates |
| [Config Maps](/config-sources/configs) | Non-sensitive configurations: property files, resource files |
| [Templates](/config-sources/templates) | Every template, and the configurations of each |

## What changing a configuration triggers

A change to a configuration does not reach every consumer at the same moment. Know when it takes
effect before rotating a credential.

| Consumer | Effect of a change |
|---|---|
| Integration: property and resource files | Picked up at the next restart of the integration |
| Auth gateway: client lists | Read again within a couple of minutes, no restart |
| Gateway: certificates, key lists | Applied by the gateway without a redeployment |

## Good practice

- **One configuration per purpose and per tier.** `orders-db-dev` and `orders-db-prod`, each
  distributed to its own environments.
- **Least distribution.** Make a configuration available where it is used, nowhere else.
- **Rotate in place.** Keep the configuration, change the value: no reference has to be edited.
- **Restrict who can read.** Access to Secret Manager is a role like any other — see the
  [RBAC model](/access/rbac-principles).

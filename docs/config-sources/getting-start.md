---
title: Overview
sidebar_position: 1
---

**Secret Manager** stores what integrations, gateways and environments need but must not carry
in their source: credentials, certificates, property files, key lists. A stored item is a
**configuration**; it is used in an environment only once made available there.

![Secrets Distribution](/img/config-sources/secrets-distribution.svg)

## Model

Three notions are enough to use Secret Manager. A template says what kind of thing is stored; a configuration is one such thing; its distribution says where it can be used.

| Object | What it is |
|---|---|
| **Template** | The kind of a configuration: its fields, its validation, whether it is sensitive — see [Templates](/config-sources/templates) |
| **Configuration** | One instance of a template, with its values |
| **Distribution** | The environments a configuration is available in |

## Lifecycle

1. **Create** — choose a template; the form has three steps: **Details**, **Properties**,
   **Distribute**.
2. **Distribute** — make it available to the environments that need it.
3. **Reference** — choose it in the field of an integration setting, a policy or an environment
   service.
4. **Update** — a change reaches every place that references it.

:::info Created and distributed from the form that needs it
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

:::warning Some values cannot be read back
The keys of an API Keys list, the passwords of Basic Auth Users and the secrets of OAuth clients
are kept as fingerprints. Copy them when they are created: afterwards they can only be replaced.
:::

## What changing a configuration triggers

A change to a configuration does not reach every consumer at the same moment. Know when it takes effect before rotating a credential.

| Consumer | Effect of a change |
|---|---|
| Integration: property and resource files | Picked up at the next restart of the integration |
| Auth gateway: client lists | Read again within a couple of minutes, no restart |
| Gateway: certificates, key lists | Applied by the gateway without a redeployment |

:::tip One configuration per purpose and per environment tier
Keep `orders-db-dev` and `orders-db-prod` apart and distribute each to its environments only. A
production credential that is not distributed to development cannot leak there.
:::

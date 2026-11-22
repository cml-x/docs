---
title: Config Maps
sidebar_position: 3
---

**Config Maps** lists the **non-sensitive** configurations: property files and resource files
that integrations read.

## Typical content

Two templates produce non-sensitive configurations. One holds key-value properties, the other holds files.

| Template | Holds | Read by an integration as |
|---|---|---|
| **Properties Configuration** | Key-value properties | Property placeholders — see [Property files](/runtime/settings/configuration) |
| **Resources File** | Any files: a catalog, a mapping, an XSLT, a PEM bundle | Files mounted at a path — see [Mounted files](/runtime/settings/resources) |

```properties title="orders-settings"
orders.greeting=Hello
orders.partner.url=https://partner.example.com/orders
orders.batch.size=200
```

## Operations

A configuration is managed from its page. Distribution is separate from creation: an existing configuration can be made available to more environments at any time.

| Operation | Effect |
|---|---|
| Search | Full-text over names, aliases and templates |
| Browse per template, or all configurations | — |
| Edit, delete | As for [secrets](/config-sources/secrets#operations) |
| **Distribute to environment** | Make it available in one more environment, without recreating it |

:::warning[Not for credentials]
A value in a Config Map is shown in clear to whoever can read the configuration. Passwords,
tokens and keys belong in the **Secure** templates.
:::

:::tip[Same keys, one configuration per environment]
Use the same property keys in `orders-settings-dev` and `orders-settings-prod`, and distribute
each to its environment. The route reads the same placeholder and gets the value of the
environment it runs in.
:::

## Behavior and limits

- A change is read by an integration at its next restart.
- A file configuration is mounted read-only.

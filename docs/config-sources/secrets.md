---
title: Secret Reference
sidebar_position: 2
---

**Secrets** lists the **sensitive** configurations of the business unit: credentials, tokens,
keys and certificates.

## What makes a configuration a secret

Its template. Templates such as Secure Properties, TLS Certificate, API Keys or Client
Credentials are sensitive by nature; Properties and Resources File are not — see
[Templates](/config-sources/templates).

## Available Operations

A secret is managed from its page. Each operation takes effect for every consumer that references the secret.

| Operation | Effect |
|---|---|
| **New configuration** | Create from a template |
| Edit | Change values; consumers pick the change up as described in the [overview](/config-sources/getting-start#what-changing-a-configuration-triggers) |
| **Distribute to environment** | Make it available in one more environment |
| **Delete distribution** | Withdraw it from an environment |
| **Delete configuration** | Remove it everywhere |

## Display of sensitive values

Values are masked until revealed. Values kept as fingerprints are never shown again.

:::danger[Deleting a configuration that is in use]
Deleting a configuration, or withdrawing its distribution, breaks what references it at the
next restart or reload: an integration no longer starts, a policy refuses every caller. Remove
the references first.
:::

## Secret Rotation

Rotating a secret without interrupting callers means that the old and the new value are both accepted for a while. How to achieve that depends on the kind of secret.

| Kind | Rotation without interruption |
|---|---|
| API key list | Add the new key, move callers, remove the old key |
| OAuth client secret | Generate a new secret on the client, deploy it to the application |
| TLS certificate | Replace the certificate in the same configuration before it expires |
| Database password in Secure Properties | Change it at the source and in the configuration, then restart the integration |

:::tip[Rotate in place]
Keep the same configuration and change its value. Creating a new configuration means updating
every reference to it.
:::

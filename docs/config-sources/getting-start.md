---
title: Getting Started
sidebar_position: 1
---

Secret Maps stores the credentials and configuration values that feed your Apache Camel
integration flows — API keys, passwords, tokens and application settings — and pushes them out to
the environments where those flows run.

![Secrets Distribution](/img/config-sources/secrets-distribution.svg)

## Create your first configuration

1. Pick a [Template](/config-sources/templates) — its JSON Schema and UI schema drive a dynamic
   form, so the right inputs are asked for automatically depending on what you're configuring.
2. Fill in the fields.
3. Choose which [environments/targets](/infra/getting-start) to distribute the resulting
   configuration to.

Every configuration is flagged **sensitive** (treated as a secret) or not, and can also be flagged
**shared** across consumers.

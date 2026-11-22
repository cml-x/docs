---
title: Configuration Templates
sidebar_position: 4
---

A **template** is a kind of configuration: it decides which fields a configuration has and what
it is used for. When you create a configuration you first choose its template; the right form
then appears.

This page describes every template, what to put in it, and where it is used.

## Template summary

Every configuration is created from a template. The table lists them by who consumes the configuration; the sections below describe each one.

| Template | Holds | Used by |
|---|---|---|
| [Properties Configuration](#properties-configuration) | Settings as `key=value` | Integrations |
| [Secure Properties Configuration](#secure-properties-configuration) | Sensitive settings as `key=value` | Integrations |
| [Resources File](#resources-file) | One or several files | Integrations |
| [Secure Resources File](#secure-resources-file) | One or several sensitive files | Integrations, the registry of an environment |
| [Git Repository Credentials](#git-repository-credentials) | Access to a private Git repository | Integrations built from a private repository |
| [Image Registry](#image-registry) | Access to a container registry | Camel Integration Service |
| [Maven Settings](#maven-settings) | Maven `settings.xml` | Camel Integration Service |
| [TLS Certificate](#tls-certificate) | A certificate and its private key | Gateways |
| [API Keys](#api-keys) | Keys, one per client | API key policy |
| [Basic Auth Users](#basic-auth-users) | Users and passwords | User name and password policy |
| [Client Credentials](#client-credentials) | A client ID and its secret | Sign-in policy |
| [Lua Script](#lua-script) | A script | Custom policies |
| [Auth Gateway Clients](#auth-gateway-clients) | Applications allowed to obtain tokens | Auth gateways |
| [Logging API Key](#logging-api-key) | One API key | Log destinations |
| [Logging Basic Auth](#logging-basic-auth) | A user name and a password | Log destinations |
| [Logging Kafka SASL Credentials](#logging-kafka-sasl-credentials) | Kafka user name, password and mechanism | Kafka log destination |
| [Logging Kafka TLS Certificates](#logging-kafka-tls-certificates) | Certificates for Kafka | Kafka log destination |
| [Logging Splunk HEC Token](#logging-splunk-hec-token) | A Splunk token | Splunk log destination |
| [Private Link Shared Key](#private-link-shared-key) | A key shared with a remote network | IPsec private links |

## Lifecycle of a configuration

{/* screenshot: secret-create-configuration */}

1. **Create** it from a template and fill it in.
2. **Make it available** to the environments that need it. A configuration that exists but was
   not made available to an environment cannot be used there.
3. **Choose** it in the field that asks for it. Every such field only offers the configurations
   of the templates it accepts, and lets you create one or make one available without leaving
   the form.

Passwords, keys and tokens are hidden on the page of a configuration until you ask to see them.
Some values are kept only as a fingerprint and **cannot be read back** at all: the keys of an
API keys list, the passwords of basic auth users, and the secrets of clients. Copy them when
they are made.

## For integrations

### Properties Configuration

Settings written as `key=value`, one per line, or loaded from a `.properties` file.

```properties
orders.timeout=30
orders.retries=3
```

An integration loads them as a property file when the configuration is chosen in its
**Configuration** setting.

### Secure Properties Configuration

The same as a Properties Configuration, for sensitive values such as passwords: the content is
hidden on its page until you ask to see it.

### Resources File

{/* screenshot: secret-resources-file */}

One or several **files**, dropped into the form. Each file is kept under its own name.

An integration receives them as files:

- with its **Resources** setting, at the place you choose;
- with its **JVM** setting, for the certificate authorities it trusts — see
  [Trust a Private Certificate Authority](/runtime/trust-private-certificates).

### Secure Resources File

The same as a Resources File, for sensitive files such as keystores: their content is hidden on
the page until you ask to see it. Also accepted for the certificate authority of the
[registry of an environment](/infra/camel-integration-service#registry).

### Git Repository Credentials

Access to a private Git repository, for integrations built from it.

| Field | What it is |
|---|---|
| **Git Provider** | GitHub, GitLab, Gitea or another |
| **Repository URL** | Such as `https://github.com/org/repo` or `git@github.com:org/repo.git` |
| **Access Token** | Issued by the provider |
| **Username**, **Email** | Optional; needed by some providers |

## For the environment

### Image Registry

Access to the container registry the integrations of an environment are published to.

| Field | What it is | Default |
|---|---|---|
| **Registry** | Its address | `index.docker.io` |
| **Username**, **Password**, **Email** | The account used | — |
| **Skip TLS verification** | Accept a certificate that cannot be verified | Off |
| **Use HTTP** | Reach the registry without encryption | Off |

Chosen as the **Pull Secret** of the
[registry of an environment](/infra/camel-integration-service#registry).

### Maven Settings

The Maven configuration used when integrations are built.

| Field | What it is |
|---|---|
| **Maven Settings** | The content of `settings.xml`. Required. |
| **Maven Security Settings** | The content of `settings-security.xml`, when passwords in the settings are encrypted. |

Chosen in the [Maven setting of an environment](/infra/camel-integration-service#maven).

### Private Link Shared Key

The key an environment and a remote network agree on to open an IPsec
[private link](/infra/private-links). At least 20 characters, without quotes or spaces. It can be
generated on its page.

## For gateways and APIs

### TLS Certificate

A certificate and its private key, both in PEM format, pasted or loaded from a file.

Used for:

- the **HTTPS access points** of a [gateway](/api-manager/gateway);
- the certificate a gateway presents to a backend that requires one;
- the certificate authority of the registry of an environment.

### API Keys

A list of keys, **one per client**. The name of the client is what your service receives when the
policy forwards the caller's identity. A key cannot be read back once saved.

Chosen in the [API key rule](/api-manager/reference/security-policy#api-key-authentication) of a security policy.

### Basic Auth Users

A list of users with their passwords. Passwords are kept as fingerprints: they cannot be
recovered, only replaced.

Chosen in the [user name and password rule](/api-manager/reference/security-policy#http-basic-authentication)
of a security policy.

### Client Credentials

A **client ID** and its **client secret**, as issued by an identity provider for your
application.

Chosen in a [sign-in policy](/auth/configure-oidc).

### Lua Script

A script stored once and used in any number of
[custom policies](/api-manager/reference/lua-policy). It runs on each request and response.

### Auth Gateway Clients

A list of the applications allowed to obtain tokens from an
[auth gateway](/auth/auth-gateway). A list is created empty and filled in on its page — see
[Lists of Clients](/auth/client-lists).

## For log destinations

These hold the credentials a [log destination](/infra/log-exporter#destinations) needs.

### Logging API Key

One API key, for destinations that authenticate with a key, such as Datadog or Elasticsearch.

### Logging Basic Auth

A user name and a password, for Elasticsearch, OpenSearch, Loki or an HTTP endpoint.

### Logging Kafka SASL Credentials

A user name, a password and the mechanism: `PLAIN`, `SCRAM-SHA-256` or `SCRAM-SHA-512`.

### Logging Kafka TLS Certificates

The certificate of the authority that signed the brokers, and the certificate and private key
the log exporter presents to them.

### Logging Splunk HEC Token

The token of a Splunk HTTP Event Collector.

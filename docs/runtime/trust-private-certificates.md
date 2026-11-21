---
title: Trust a Private Certificate Authority
sidebar_position: 5
---

An integration that calls a service over HTTPS checks the certificate that service presents. If
the certificate was signed by a **private certificate authority** — the one of your company, of a
partner, or a self-signed one on a test system — the call is refused, because the integration
only knows the public authorities.

The **JVM** setting of an integration lets you add your own authorities to the ones it trusts.

![How an integration comes to trust a private authority](/img/runtime/truststore.drawio.png)

## Why it is needed

| The service is signed by | Without this setting | With this setting |
|---|---|---|
| A public authority (Let's Encrypt, DigiCert…) | The call works | The call works |
| Your company's authority | The call is refused | The call works |
| A self-signed certificate | The call is refused | The call works |

A refused call typically shows in the logs of the integration as
`PKIX path building failed` or `unable to find valid certification path to requested target`.

## What you need

One **PEM file** holding the certificate of the authority. The file may hold **several
certificates**, one after the other — for example a root authority and an intermediate one, or the
authorities of two partners:

```text
-----BEGIN CERTIFICATE-----
MIIDdzCCAl+gAwIBAgIE...
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIDqDCCApCgAwIBAgIJ...
-----END CERTIFICATE-----
```

Lines outside the `BEGIN` / `END` blocks, such as comments, are ignored.

:::info Certificates only
The file holds certificates, which are public. It never holds a private key.
:::

## Set it up

### 1. Store the file

In **Secret Manager**, create a configuration of the kind **Resources File** and drop
your PEM file in it. Make it available to the environment the integration runs in.

You can also do it from the integration itself: in the field described below, **New secret**
opens the same creation panel and selects what you created.

### 2. Choose it on the integration

Open the integration, add or edit its **JVM** setting, and fill in **Trusted CA Certificates**:

1. choose the configuration that holds the file;
2. choose the file in it.

The field shows where the file is mounted for you. Nothing else has to be mounted by hand.

### 3. Deploy

Deploy the integration. Before it starts, a step builds its truststore; the integration then
starts with it.

## Field reference

| Field | What it is | Default |
|---|---|---|
| **Trusted CA Certificates** | The PEM file of your authorities, chosen in a stored configuration. One file; it may hold several certificates. | None |
| **Keep Public Authorities** | Also trust the public authorities Java ships with, so that calls to public HTTPS services keep working. | On |
| **Truststore Password** | The password of the truststore that is built, in plain text: at least 6 letters, digits or `. _ @ % + -`. | `changeit` |

The truststore only holds certificates, which are public: its password protects nothing secret.
The default is the one Java itself uses, and there is rarely a reason to change it.

## The different cases

| You want the integration to trust | Trusted CA Certificates | Keep Public Authorities |
|---|---|---|
| Public services only | Leave empty | — |
| Public services **and** your authority | Your file | On |
| Public services **and** several private authorities | One file holding them all | On |
| **Only** your authority, and nothing public | Your file | Off |

:::warning Turning public authorities off
With **Keep Public Authorities** off, every call to a public HTTPS service — a cloud API, a SaaS
— is refused. Use it only for an integration that must talk to your own systems and nothing else.
:::

## What happens when the integration starts

1. The configuration is mounted in the integration.
2. A step runs before the integration: it starts from the truststore Java ships with (unless
   public authorities are off), then adds each certificate of your file.
3. The integration starts with that truststore.

If the file holds **no certificate**, the step fails and the integration does not start: you
see the error instead of running with an authority that is silently missing.

Changing the file, the password or the switch restarts the integration.

## Check that it worked

- The integration reaches **Running** and is ready.
- A call to the service signed by your authority succeeds.

If the integration stays in its starting phase, open its instance and look at the step that runs
first: it says which certificate could not be read.

## Limits

- **One file per integration.** Put all the authorities an integration needs in the same file.
- **PEM only.** A file in another format (DER, PKCS#12, JKS) is not read: convert it to PEM first.
- **For calls the integration makes.** This is about the services an integration *calls*. To
  serve HTTPS to the outside, publish the integration through an
  [API Gateway](/api-manager/gateway), which holds the certificate.

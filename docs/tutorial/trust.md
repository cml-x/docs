---
title: 4. Trust a Private Authority
sidebar_position: 5
---

The orders service now has to call a partner system over HTTPS. That system presents a
certificate signed by your company's own authority.

## What goes wrong first

Add the call to the route:

```yaml
        - to:
            uri: https://inventory.corp.example/stock
```

Deploy. The integration starts, but the call fails, and the logs say:

```text
PKIX path building failed: unable to find valid certification path to requested target
```

Java only trusts the public certificate authorities it ships with. Yours is not one of them.

## Give it your authority

![How the truststore of an integration is built](/img/runtime/truststore.drawio.png)

### 1. Store the certificate

Get the certificate of the authority as a **PEM file** — `corp-ca.pem`. If the partner's
certificate was signed by an intermediate authority, put the root and the intermediate in the same
file, one after the other.

In **Secret Manager**, create a **Resources File** configuration named `corp-ca` and drop the file
in it. Make it available to the environment.

### 2. Choose it on the integration

On `orders-api`, add the setting **JVM**. In **Trusted CA Certificates**, choose the configuration
`corp-ca`, then the file `corp-ca.pem`. Leave **Keep Public Authorities** on.

### 3. Deploy

**Apply changes**. Before the integration starts, a step builds its truststore: the public
authorities, plus yours. The call to the partner now succeeds, and calls to public services keep
working.

## The switch that matters

| Keep Public Authorities | The integration trusts |
|---|---|
| **On** (default) | Public services **and** your authority |
| **Off** | Your authority **only** — every call to a public HTTPS service is refused |

Turn it off only for an integration that must talk to your own systems and nothing else.

## If the integration no longer starts

The step that builds the truststore fails when the file holds no certificate: the integration then
does not start, and the instance shows which step failed. Check that the file is a PEM file, with
its `-----BEGIN CERTIFICATE-----` lines.

The complete reference is in
[Trust a Private Certificate Authority](/runtime/trust-private-certificates).

## What else the JVM setting does

| Field | Use it to |
|---|---|
| **JVM Options** | Pass flags such as `-Xmx512m` |
| **Remote Debugging** | Attach a debugger, in a development environment |
| **Extra Classpath** | Add a driver or a library mounted as a file |
| **Agents** | Attach a Java agent |

Next: [move the source to Git](/tutorial/from-git).

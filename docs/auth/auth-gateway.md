---
title: Auth Gateways
sidebar_position: 2
---

An **Auth Gateway** is the token service of an [environment](/infra/environments). The
applications registered with it as [clients](/auth/client-lists) obtain the tokens your APIs
ask for.

It issues tokens to **applications**, with the OAuth 2.0 *client credentials* flow. It is not a
sign-in page for people: for that, see
[Sign In with an Identity Provider](/auth/configure-oidc).

## Create an auth gateway

{/* screenshot: auth-gateway-create */}

Open **API Manager**, go to **Auth Gateways**, then create one.

| Field | What it is |
|---|---|
| **Gateway & Access Point** | The [gateway](/api-manager/gateway) and the access point the service is reached through, and the host name it answers on, such as `auth.example.com`. Only an **HTTPS** access point can carry it. |
| **Version** | The version of the token service to run. |

:::info The address is the issuer
Tokens are issued in the name of the address you choose here: `https://auth.example.com`. APIs
that check the tokens are given that same address. Changing it later means every token already
issued is refused.
:::

The gateway ends the encryption with the certificate of its access point; nothing has to be
installed on the token service.

## Its addresses

{/* screenshot: auth-gateway-addresses */}

The page of an auth gateway lists the addresses applications and APIs need:

| Address | Example | Used by |
|---|---|---|
| **Issuer** | `https://auth.example.com` | An API that checks tokens |
| **Token endpoint** | `https://auth.example.com/api/oidc/token` | An application asking for a token |
| **Signing keys** | `https://auth.example.com/jwks.json` | An API checking the signature of a token |
| **Discovery** | `https://auth.example.com/.well-known/openid-configuration` | Software that configures itself |
| **Introspection** | `https://auth.example.com/api/oidc/introspection` | Asking whether a token is still valid |

The discovery document is also shown on the page, ready to copy.

## Settings

| Setting | What it sets | Defaults |
|---|---|---|
| **Clients** | The [lists of clients](/auth/client-lists) the service reads. Several lists can be chosen: their clients are gathered. | None |
| **Sessions** | How long a session lasts and how long it survives unused, and whether the service keeps what it remembers across restarts. | 1 h, 5 min idle, nothing kept |
| **Resources** | The CPU and memory the service is given. | 50m / 64Mi requested, 1 CPU / 256Mi at most |
| **Logging** | How much it logs: info, debug or trace. | Info |

### Clients

{/* screenshot: auth-gateway-clients-setting */}

Choose one or several lists. A list that is not yet available in the environment is offered
apart, with what makes it available. **New list of clients** creates one — empty — and selects
it.

- A client may be in **one list only**.
- Until a list with at least one client is attached, the service issues no token.
- A change in a list is picked up **within a couple of minutes, without a restart**. If a change
  makes a list unreadable, the service keeps the lists it was using.

### Keeping data across restarts

By default the service starts from an empty memory each time it restarts: the tokens it issued
stay valid until they expire, but it no longer knows which ones were revoked.

Turn **Keep data across restarts** on to reserve space for that data. The reserved space can be
raised later, never lowered.

### Logging

**Trace** logs everything, in very large volumes. It is meant for working out why one request was
refused, not for leaving on. Changing the level restarts the service.

## Next

- [Register applications as clients](/auth/client-lists)
- [Protect an API with JWT](/auth/protect-api-with-jwt)

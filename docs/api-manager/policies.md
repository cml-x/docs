---
title: Policies
sidebar_position: 6
---

A **policy** changes how a [gateway](/api-manager/gateway) treats the traffic of an API: who may
call it, how many calls it takes, what happens when the service behind it is slow.

## Where a policy applies

A policy has a **target**: a whole gateway, or one [API instance](/api-manager/api-instances).

| Target | What it covers |
|---|---|
| A gateway | Everything published on that gateway |
| An API instance | That API only |

Policies come in four families. A policy holds one or several **rules** of its family.

| Family | What its rules decide |
|---|---|
| [Security](#security-rules) | Who is let through |
| [Backend traffic](#backend-traffic-rules) | How the gateway talks to the service behind the API |
| [Client traffic](#client-traffic) | How callers connect to the gateway |
| [Custom](#custom-logic) | Logic of your own, as a script |

## Security rules

### Token verification (JWT)

Requires a valid access token on every request. Nobody is redirected: the caller — an application
or another service — sends the token it obtained, and a request without a valid one is refused.

| Field | What it is |
|---|---|
| **Tokens issued by** | **An auth gateway** of the environment, or **another identity provider** |
| **Auth gateway** | When tokens come from an [auth gateway](/auth/auth-gateway): choose it. Its address gives the issuer and where its keys are published. |
| **Provider Name**, **Issuer**, **JWKS URI** | When tokens come from another provider: a short name, the issuer written in the tokens, and the address where its public keys are published. |
| **Check the audience** | Refuse a token that was not issued for this API. Off by default. |
| **Audience of this API** | Filled in for you with the audience ID of the API. A token is checked against it first. |
| **Other audiences** | Other values a token may be intended for. |

The complete walk-through is in [Protect an API with JWT](/auth/protect-api-with-jwt).

### Sign-in with an identity provider (OIDC)

Sends visitors to the sign-in page of your identity provider before they reach the API, then
keeps them signed in with a session cookie. Meant for people using a browser. See
[Sign In with an Identity Provider](/auth/configure-oidc).

### API keys

Requires a key on every request.

| Field | What it is |
|---|---|
| **API Keys** | A stored list of keys, one per client — a configuration of the kind [API Keys](/config-sources/templates#api-keys). |
| **Extract from Header / Query Param / Cookie** | Where callers put the key, for example the header `x-api-key`. |
| **Forward Client ID Header** | Pass the name of the client that called to your service, in this header. |
| **Sanitize Key** | Remove the key from the request before it reaches your service. |

### User name and password (Basic)

Asks for a user name and a password; a browser shows its sign-in prompt.

| Field | What it is |
|---|---|
| **Users** | A stored list of users — a configuration of the kind [Basic Auth Users](/config-sources/templates#basic-auth-users). |
| **Forward Username Header** | Pass the verified user name to your service, in this header. |

### Cross-origin calls (CORS)

Lets pages of other websites call the API.

| Field | Default |
|---|---|
| **Allowed Origins** | `*` — every site |
| **Allowed Methods** | `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS` |
| **Allowed Headers** | `Content-Type`, `Authorization` |
| **Exposed Headers** | None |
| **Cache Duration** | `3600s` |
| **Allow Credentials** | Off. Requires named origins, not `*`. |

### Allow or block addresses

Lets through, or blocks, callers by where they come from.

| Field | What it is |
|---|---|
| **Default Action** | What happens to a caller no rule matches. **Deny** by default: only the addresses you allow get through. |
| **Rules** | In order, each with an action — allow or deny — and address ranges. The first rule that matches decides. |

### External authentication

Asks a service of yours whether each request may pass.

| Field | What it is |
|---|---|
| **Protocol** | HTTP or gRPC |
| **Authentication Service** | The service that decides — a service of the platform, or an [upstream](/api-manager/upstreams). |
| **Fail Open** | Let requests through when that service does not answer. Off by default: they are refused. |

## Backend traffic rules

| Rule | What it does | Defaults |
|---|---|---|
| **Rate limit** | Refuses requests beyond a number per second, minute or hour. | 100 per minute |
| **Retry** | Sends a request again when the backend fails. | 3 retries, on `5xx`, `gateway-error` and `reset`; from 100 ms to 10 s between attempts |
| **Timeout** | Stops waiting for a slow backend: for the whole request, for opening the connection, for an idle connection. | 30 s for the whole request |
| **Circuit breaker** | Stops sending to a backend that is overwhelmed, by capping connections, waiting requests, parallel requests and parallel retries. | 1024 each |
| **Load balancing** | Chooses how requests are spread across the instances of the backend — round robin, least requests, random or consistent hash — and whether a client stays on the same instance. | Round robin |

## Client traffic

A client traffic policy targets a gateway. It sets:

- the most simultaneous connections the gateway accepts, and how long it waits before closing the
  ones above the limit;
- how long a client has to send its request, and how long an idle connection is kept;
- the TLS versions a client may use (1.2 to 1.3 by default) and, when needed, the cipher suites,
  curves, signature algorithms and ALPN protocols.

## Custom logic

A custom policy runs a **Lua script** on each request and each response. The script can read and
change headers, inspect the content, or call another service.

The script is written in the policy, or reused from a stored configuration of the kind
[Lua Script](/config-sources/templates#lua-script) shared between several policies.

## Stored configurations used by policies

Several rules read a list or a credential you store once in
[Secrets & Configuration](/config-sources/templates). In each of those fields you can choose an
existing configuration, **create one** without leaving the form, or make available one that
exists but is not yet in the environment.

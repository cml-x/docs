---
title: Overview
sidebar_position: 1
---

API Manager is where the services of an environment are published, routed and protected as APIs.
It works with gateways, and asks for no configuration file.

![The path of a request, from the caller to the integration](/img/tutorial/exposure.drawio.png)

## Why a gateway in front of an integration

An integration that exposes HTTP is reachable only inside its environment. To be called from
elsewhere it needs an address, TLS, and a place to decide who may call it. Doing that in each
integration would mean certificates, authentication and rate limiting written into every route.

A gateway does it once, in front. The integration keeps to business logic; the gateway carries
the address, the certificate and the policies. The same integration can be published on several
gateways — public for partners, internal for other teams — without changing a line of it.

## Objects

API Manager works with a handful of objects. A request crosses them in this order, so knowing them tells you where to look when something does not answer.

| | What it is |
|---|---|
| [Gateway](/api-manager/gateway) | The entry point of traffic for an environment, with its access points |
| [API instance](/api-manager/api-instances) | One service published on a gateway, at an address |
| [Upstream](/api-manager/upstreams) | A service outside the environment that an API can route to |
| [Policy](/api-manager/policies) | A rule on who may call an API, how fast, and what happens when its service is slow |
| [Auth gateway](/auth/auth-gateway) | The service that issues tokens to the applications calling your APIs |
| [Domain](/api-manager/domains) | A domain name of your own, for the addresses of your APIs |

## Quick start: publish an API

You need a service to publish — an [integration](/runtime/getting-start) that is running, for
example.

1. **Create a gateway.** Choose its exposure — public, private or internal — and add an **HTTPS**
   access point with a [TLS certificate](/config-sources/templates#tls-certificate).
2. **Create an API instance.** Choose the gateway and its access point, give the host name of the
   API, and choose the service that answers.
3. **Deploy**, then call the address.

The API is then open to everyone: protect it before giving the address out.

:::danger A published API is open
A new API instance has no authentication. On a public gateway it answers anyone as soon as its
host name resolves. Add its security policy before you give the address out.
:::

## Authentication options

An API is open until a security policy says otherwise. Which rule to use depends on who calls it.

| Who calls | Use |
|---|---|
| A few known applications | [API keys](/api-manager/reference/security-policy#api-key-authentication) |
| Applications, at scale | [Tokens (JWT)](/auth/protect-api-with-jwt) |
| People, in a browser | [Sign-in with an identity provider](/auth/configure-oidc) |
| Anything, by rules of your own | [External authentication](/api-manager/reference/security-policy#external-authorization) |

The [tutorial](/tutorial/secure) goes through each of them on the same example.

## Responsibilities per application

- **API Manager** publishes the API and applies its policies at the gateway.
- An **[auth gateway](/auth/getting-start)** issues the tokens those policies check.
- **[Access Manager](/access/users)** decides which users may manage the API and its gateway — a
  separate matter from who may *call* it.

---
title: API Delivery Architecture
sidebar_position: 0.5
---

A call to one of your APIs crosses the same four stages whatever the API: an entry that depends
on the exposure of the gateway, the proxy of the gateway, a route, and the service that answers.

![A caller enters through the exposure of the gateway — public, private or internal — then the gateway proxy ends TLS on an access point, matches an API instance, applies its policies and forwards to an integration or to an upstream](/img/api-manager/api-delivery.drawio.png)

## Entry: public, private or internal

A gateway has one exposure, chosen when it is created. It decides from where the gateway can be
reached at all, before any route or policy is looked at.

| Exposure | Who can reach it | How |
|---|---|---|
| **Public** | Anyone on the internet | A public load balancer |
| **Private** | Your private network only | A private load balancer |
| **Internal** | Only what runs inside the platform | An address inside the platform, no load balancer facing outside |

To publish the same service to partners and to other teams, use two gateways with two
exposures: nothing has to change in the service. [API Gateway Reference](/api-manager/gateway)
describes each mode.

## Proxy: access point, route, policies

Behind the entry, the proxy of the gateway does three things, in this order.

| Stage | What happens | Set on |
|---|---|---|
| **Access point** | The connection is accepted on a port and a protocol. On HTTPS, TLS ends here, with the certificate of the access point | [The gateway](/api-manager/gateway) |
| **API instance** | The request is matched to a route by its host name and its path. No match, no answer | [The API instance](/api-manager/api-instances) |
| **Policies** | The caller is checked — API key, token or sign-in — and traffic limits apply. A refused request never reaches the service | [Policies](/api-manager/policies) |

:::danger[A route without a security policy is open]
The proxy checks a caller only if a security policy says so. On a public gateway, a new API
instance answers anyone until its policy is added.
:::

## Backend: integration or upstream

An accepted request is forwarded to the service chosen in the API instance.

| Backend | Where it is | Link to it |
|---|---|---|
| **Integration** | In the same environment | Stays inside the environment |
| **Upstream** | Outside the environment | TLS, and mutual TLS when the gateway presents a client certificate — see [Backend TLS](/api-manager/reference/route-filters#backend-tls) |

## Where each protection applies

| Protection | Stage | Reference |
|---|---|---|
| Reachability | Entry, by the exposure of the gateway | [API Gateway Reference](/api-manager/gateway) |
| TLS towards the caller | Access point | [TLS Certificate](/config-sources/templates#tls-certificate) |
| Authentication of the caller | Policies | [Security Policy Reference](/api-manager/reference/security-policy) |
| TLS and mutual TLS towards the backend | Backend | [Route Filter Reference](/api-manager/reference/route-filters#backend-tls) |

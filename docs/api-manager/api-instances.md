---
title: API Instances
sidebar_position: 3
---

An **API Instance** exposes one service through a [gateway](/api-manager/gateway): it says on
which access point the API is reached, at which address, and which service answers.

![API Instances](/img/api-manager/api-instances.svg)

## Create an API instance

Open **API Manager**, go to **API Instances**, then create one. Two things are asked for.

### Gateway & access point

{/* screenshot: api-instance-gateway-select */}

Choose the gateway, then one of its access points. The kind of the access point decides the kind
of route: an HTTP or HTTPS access point gives an HTTP API, a TLS access point a TLS route, a TCP
access point a TCP route.

Then choose how the API is addressed:

| Mode | Address of the API | When to use it |
|---|---|---|
| **Its own host name** | `orders.example.com` | The API has a name of its own |
| **A path on the gateway's address** | `gateway.example.com/orders` | Several APIs share one address |

With a path, **URL rewrite** is on by default: the path prefix is removed before the request
reaches your service, so that `/orders/123` arrives as `/123`. Turn it off when your service
expects the prefix.

A host name that is not a wildcard is also declared in DNS for you.

### Backend service

Choose what answers the requests:

- a **service of the platform** — an integration or another service of the environment, with its
  port;
- an [upstream](/api-manager/upstreams) — a service outside the environment that you declared.

## The audience ID of an API

{/* screenshot: api-instance-audience-id */}

Every API instance is given an **audience ID**, shown on its page. It identifies this API in the
tokens that are issued for it:

- a [client](/auth/client-lists) lists the audience IDs of the APIs it calls, and every token it
  obtains names them;
- the [JWT policy](/auth/protect-api-with-jwt) of the API can refuse a token that does not name
  it.

The audience ID is worked out from the API itself: it does not change when the API is deployed
again, and two different APIs never share one.

## After creation

The page of an API instance shows its address, its backend, its audience ID and whether the
gateway accepted it.

From there you can:

- attach [policies](/api-manager/policies) — who may call the API, how fast, what happens when
  the backend is slow;
- rewrite the path or the host name before the request reaches the backend;
- add, replace or remove headers on requests and responses.

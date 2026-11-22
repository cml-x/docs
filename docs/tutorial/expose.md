---
title: 8. Expose as an API
sidebar_position: 9
---

The orders service answers inside the environment. To be called from outside, it is **published
on a gateway**. The integration itself does not change, and is never reachable directly.

## Request path: client, gateway, route, service

![The path of a request, from the caller to the integration](/img/tutorial/exposure.drawio.png)

| | What happens | Where it is set |
|---|---|---|
| **1** | The caller resolves `orders.example.com`. The name is declared in DNS for you. | The host name of the API instance |
| **2** | The request reaches the load balancer of the gateway. | The exposure mode of the gateway |
| **3** | It enters by an **access point**. On HTTPS, encryption ends here, with your certificate. | The access points of the gateway |
| **4** | The gateway finds the **API instance** whose host name and path match. | The API instance |
| **5** | The **policies** of the API decide whether the request goes on. | [Step 9](/tutorial/secure) |
| **6** | The request is sent to the **service** of the integration, inside the environment. | The backend of the API instance |
| **7** | The integration answers, and the answer follows the same path back. | — |

Two things follow from this picture:

- **encryption and access control happen at the gateway**, not in your route;
- the integration only ever receives requests that were let through.

## 1. TLS certificate

HTTPS needs a certificate for `orders.example.com`. In **Secret Manager**, create a configuration
of the kind **TLS Certificate** with the certificate and its private key. You can also create it
from the gateway, in the next step.

## 2. Gateway with an HTTPS listener

{/* screenshot: tutorial-create-gateway */}

Open **API Manager**, go to **API Gateways**, and create `public-gateway`.

- **Exposure Mode** — **Public**, to be reached from the internet. **Private** keeps it on your
  private network, **Internal** inside the platform.
- **Access Points** — add one:

| Field | Value |
|---|---|
| Kind | **HTTPS** |
| Port | `443` |
| Name | `https` |
| Certificate | The TLS Certificate you stored |

Deploy the gateway. One gateway serves many APIs: you create it once per environment and
exposure, not once per API.

## 3. API instance routed to the integration service

{/* screenshot: tutorial-create-api-instance */}

Go to **API Instances** and create `orders`.

**Gateway & Access Point** — choose `public-gateway`, then its access point `https`. Then choose
how the API is addressed:

| Mode | Address | Choose it when |
|---|---|---|
| **Its own host name** | `https://orders.example.com/orders` | The API has a name of its own |
| **A path on the gateway** | `https://api.example.com/orders-api/orders` | Several APIs share one address |

With a path, the prefix is removed before the request reaches the integration, so the route keeps
listening on `/orders`. Turn **URL rewrite** off if your route expects the prefix.

**Backend Service** — choose the service of `orders-api`. Its port comes with it.

Deploy the API instance.

:::danger[The API is now public and unprotected]
From this point anyone who knows the host name can call `orders`. On a real system, add the
security policy of [step 9](/tutorial/secure) before publishing the name.
:::

## 4. Test with curl

```bash title="From anywhere"
curl https://orders.example.com/orders
```

```json title="Answer"
{"greeting":"Hello from orders","pageSize":20}
```

The API is public and **open to everyone**. That is the subject of the
[next step](/tutorial/secure).

:::info[Nothing changed in the integration]
The route still listens on `platform-http:/orders`. The certificate, the host name and the
exposure are entirely on the gateway side.
:::

## Other topologies

### External backend (upstream)

An API instance can route to something outside the environment — a partner's service, an existing
application. Declare it as an [upstream](/api-manager/upstreams), then choose the upstream as the
backend.

### TLS passthrough and TCP routes

The kind of the access point decides the kind of route:

| Access point | Use it for |
|---|---|
| **HTTP**, **HTTPS** | Web APIs |
| **TLS** | Encrypted traffic that the service must decrypt itself |
| **TCP** | Any other protocol over TCP |

### Internal-only listener

Give the access point the **internal** domain offered in its list: the address of the gateway
inside the platform. Nothing is then published in DNS.

## Traffic policies

Once published, the API can be adjusted without touching the integration:

| You want | Add |
|---|---|
| To refuse calls beyond a rate | A **rate limit** |
| To stop waiting for a slow integration | A **timeout** |
| To try again when the integration fails | A **retry** |
| To let a web page of another site call it | **CORS** |
| To add or remove headers | Request and response **headers** |

They are described in [Policies](/api-manager/policies).

Next: [secure the API](/tutorial/secure).

---
title: Domains
sidebar_position: 4
---

A **custom domain** is a DNS domain of your own — `example.com` — managed by the platform for
a business unit, so that gateways and APIs are published under names such as
`orders.example.com`.

Adding a domain creates a **DNS hosted zone** for it (AWS Route53, provisioned through
Crossplane). Once the zone is delegated at your registrar, the domain is offered on the access
points of your gateways, and the DNS records of your gateways and APIs are written into it.

```
Add the domain ──► Apply ──► Delegate at the registrar ──► Choose it on an access point ──► Publish APIs
  (recorded)     (hosted zone      (NS records)            (gateway listener)            (DNS records)
                   created)
```

## Scope: one hosted zone per domain, owned by the business unit

- A domain belongs to the **business unit as a whole**, not to one of its deployment
  environments. It lives in the environment the business unit is created with
  (`sync-<business unit>`), like every cloud resource; its page shows no environment selector.
- Each domain is one application holding one `hosted-zone` component. `example.com` is stored
  as the application `example-com` with the component `dns-example-com`.
- The same domain is offered to the gateways of every environment of the business unit.

## Add a domain: hosted zone creation and apply

{/* screenshot: domain-add */}

Open **API Manager → Custom Domains**, then **Add Domain**.

1. **Enter the domain.** A full domain name — `example.com`, `api.example.com` — without
   scheme, path or port. A wildcard is refused: the zone is created for the domain, wildcard
   host names come later, on access points. A domain the business unit already manages is
   refused.
2. **Next** records the domain. Nothing exists at the DNS provider yet.
3. **Apply** creates the hosted zone and opens the page of the domain.

A domain left unapplied stays in the list; open it and use **Apply changes** to create its
zone later.

:::tip[Dedicate a subdomain]
Delegating `api.example.com` rather than `example.com` keeps the rest of your DNS where it is
and limits what the platform manages to the names of your APIs.
:::

## Provisioning status: `Ready` and `Synced` conditions of the hosted zone

{/* screenshot: domain-overview */}

The page of a domain follows an apply until the provider has finished, with the same progress
bar and badge as a gateway or an API instance.

| Shown | Meaning |
|---|---|
| **Applying** | The workflow is pushing the hosted zone to the cluster. |
| **Rolling out** | The provider is creating the zone: its `Ready` condition is not `True` yet. |
| **Deployed** | The provider reports the zone `Ready`. The zone ID, the number of record sets and the name servers are displayed. |
| **Rollout failed** | The provider could not apply the zone: its `Synced` condition is `False`. The reason given by the provider is shown, for example missing rights on the AWS account. |

The zone is read again every 10 seconds while an apply is followed, every 30 seconds while it
is still being created, and every two minutes otherwise. An apply started elsewhere — another
user, a pipeline — is picked up the same way.

The same conditions decide the health of the component: a domain is healthy once its zone is
`Ready` and not refused, not as soon as it is submitted.

## Delegation: declare the name servers at the registrar

A hosted zone answers for your domain only once the domain is **delegated** to it.

1. On the page of the domain, open **Nameservers**: the four name servers of the zone are
   listed, each with a copy button.
2. At your registrar — or in the parent zone, for a subdomain — replace the `NS` records of the
   domain with these four names.
3. Use **Re-check registration**. The page compares the list with the `NS` records publicly
   registered for the domain.

| Result | Meaning |
|---|---|
| **All verified** | The four name servers are registered: the delegation is in place. |
| **Partially configured** | Some are registered, some are missing. |
| **Not configured** | None is registered yet, or the change has not propagated. |
| **Could not be checked** | The public resolver did not answer. This says nothing about your delegation: check again. |

Until the delegation is in place, the records the platform writes into the zone exist but
nobody resolves them.

## Attach a domain to a gateway access point (listener)

{/* screenshot: domain-access-point */}

A domain is used through the **Domain** field of an
[access point](/api-manager/gateway#access-points-listeners) of a gateway. Open the gateway,
then **Access points**, and choose the domain of the access point. For each custom domain two
choices are offered:

| Choice shown | Host name set on the listener | Use it when |
|---|---|---|
| `{api-name}.example.com` | `*.example.com` | Each API has a host name of its own under the domain: `orders.example.com`, `billing.example.com`. |
| `<gateway>.example.com/{path}` | `<gateway>.example.com` | The gateway has one address and APIs are told apart by their path: `public-gw.example.com/orders`. |

The same field also offers, whatever your domains:

- **No domain filter** — the access point accepts every host name;
- the **platform domain** of the cluster, in the same two forms, which needs no domain of yours;
- the **internal** address of the gateway, `<gateway>.<namespace>`, for an access point reached
  only by workloads of the platform.

An access point serves one domain. To serve two domains, or a domain both by host name and by
path, add one access point per choice. Apply the gateway for the change to take effect.

### HTTPS on a custom domain: the certificate is yours

An **HTTPS** access point ends the encryption with a certificate you provide, stored as a
[TLS Certificate](/config-sources/templates#tls-certificate) configuration and made available
to the environment of the gateway. It must cover the host names the access point serves:

- `*.example.com` for the `{api-name}.example.com` choice — a wildcard certificate;
- `<gateway>.example.com` for the path choice.

No certificate is issued for a custom domain on your behalf. On a **TLS** access point the
gateway forwards the encrypted traffic and the backend holds the certificate.

## Publish an API under the domain

When you create an [API instance](/api-manager/api-instances), choose the gateway and the
access point that carries the domain. The access point decides how the API is addressed:

| Access point domain | Address of the API | What you enter |
|---|---|---|
| `*.example.com` | `orders.example.com` | The host name of the API, under the domain |
| `<gateway>.example.com` | `<gateway>.example.com/orders` | The base path of the API |

A route is accepted by the gateway only if its host name matches the domain of the access
point: `orders.example.org` is refused on an access point for `*.example.com`.

## DNS records: what is written, and when

Records are written into the hosted zone by the cluster the gateway runs on, as `A` or `CNAME`
records pointing at the load balancer of the gateway.

| What you configure | Record written |
|---|---|
| An access point with the domain `<gateway>.example.com` | `<gateway>.example.com`, when the gateway is applied |
| An API instance with its own host name `orders.example.com` | `orders.example.com`, when the API instance is applied |
| An access point with the wildcard domain `*.example.com` | None for the wildcard itself: each API host name gets its own record |

- A record is **created and updated** automatically. It is **not removed** when the API
  instance or the access point is removed: delete it in the zone if the name must stop
  resolving.
- A new record takes the usual DNS propagation time to be visible everywhere.
- Records are only resolved once the zone is applied **and** delegated. A domain is offered on
  access points as soon as it is added: check its page shows **Deployed** and **All verified**
  before publishing on it.

## Remove a domain

On the page of the domain, under **Actions**:

- **Remove from the DNS provider** deletes the hosted zone. The domain stays listed and can be
  applied again; it then gets a **new** zone with **new** name servers, to declare again at the
  registrar. Route53 only deletes a zone that holds nothing but its own `NS` and `SOA` records:
  delete the records of your gateways and APIs from the zone first.
- **Delete domain** removes it from the business unit. It is available once the zone has been
  removed from the provider.

Before removing a domain, change the access points and API instances that use it: their host
names stop resolving as soon as the zone is gone.

## Permissions: the `Cloud Resource` scope

Every operation on a domain is governed by the **Cloud Resource** permissions of API Manager,
checked on the business unit:

| Operation | Permission | In the role editor |
|---|---|---|
| List domains, open a domain, follow its status and its applies | `can_view_cloud_resource` | Included in the two entries below |
| Add a domain, rename it | `can_edit_cloud_resource` | **Cloud Resource — Create and manage** |
| Delete a domain | `can_delete_cloud_resource` | **Cloud Resource — Create and manage** |
| Apply a domain, remove it from the DNS provider | `can_deploy_cloud_resource` | **Cloud Resource — Apply changes** |

Because a domain belongs to the business unit, these permissions apply to the whole unit even
in a role whose API Manager permissions are restricted to particular environments. Choosing a
domain on an access point is a change to the **gateway**, governed by the Gateway permissions;
it only requires seeing the domains. See [RBAC principles](/access/rbac-principles).

## Limits

- One hosted zone per domain and per business unit. The same domain cannot be added twice.
- The domain of an existing hosted zone cannot be changed at the provider: add the new domain,
  move the access points to it, then remove the old one.
- A wildcard cannot be a hosted zone; wildcards are host names of access points.
- Certificates of custom domains are not issued by the platform.

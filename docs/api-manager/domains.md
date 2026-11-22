---
title: Domains
sidebar_position: 4
---

A **domain** is a DNS domain of your own — `example.com` — attached to a project, so that your
APIs are published under names such as `orders.example.com`.

## Why attach a domain

A gateway is reached through host names. For a public API you want a name you control, covered
by a certificate browsers and clients trust. Attaching the domain to the project lets the
platform manage the DNS records of your APIs for you: when you publish an API instance on
`orders.example.com`, the record is created; when you remove it, the record goes away.

## DNS zone and records

- A **DNS hosted zone** is attached to the project.
- **TLS certificates are issued automatically** (Let's Encrypt, via a Route53 cluster issuer) —
  no manual certificate management.

:::info Delegation happens at your registrar
For the hosted zone to answer for your domain, the domain — or the subdomain you dedicate to the
platform — must be delegated to its name servers at your DNS provider.
:::

## Use a domain

Once attached, the domain is offered in two places:

- on an **access point** of a [gateway](/api-manager/gateway), as the domain it serves;
- as the **host name** of an [API instance](/api-manager/api-instances).

:::tip Dedicate a subdomain
Delegating `api.example.com` rather than `example.com` keeps the rest of your DNS where it is
and limits what the platform manages to the names of your APIs.
:::

## The internal domain

Every access point is also offered a choice marked **internal**: the address of the gateway
inside the platform. It needs no domain of yours and is the one to use for an API reached only
by workloads of the platform.

## Behavior and limits

- A new record takes the usual DNS propagation time to be visible everywhere.
- A wildcard host name is not declared in DNS for you.

---
title: Asset Catalog
sidebar_position: 1
---

**Assets Explorer** is a search engine over what already exists: the repositories, templates and
releases of your organization, and the public catalogs of Apache Camel and Camel X.

## Why search before building

In an organization with more than a few integrations, the connector you are about to write
often exists already: someone integrated that SFTP server, that Kafka cluster, that billing
API. Finding it saves the work and, more importantly, the credentials dance and the edge cases
its author already went through. The catalog is how you find it.

## What is indexed

Nothing is published by hand in the common case. Two things make something an asset:

- a repository is **set as template** — see [Repository templates](/projects/create-template);
- a **release** is created on a repository — see [Releases](/projects/create-release).

So the catalog reflects what teams actually released, not a list someone maintains.

## Search indexes

An index is a collection the search runs over. The selector chooses one or several.

| Index | Content | Use it to find |
|---|---|---|
| **My Org** | Repositories, templates and releases of the business unit | What your colleagues built |
| **Apache Camel** | The Apache Camel catalog | A component or a Kamelet of the project |
| **CamelX** | The catalog published by the platform | Ready-made templates |

## Facets

Facets narrow a search to a kind of asset. They are computed from the results, so a facet only
offers values that exist.

| Facet | Values | Typical use |
|---|---|---|
| Type | `release`, `template` | "Something I can start from": `template` |
| Topics | The topics of the repositories | "Anything about SAP": topic `sap` |
| Visibility | Public or private | — |
| Owner | The organization that owns the asset | "What team X published" |

:::tip[Topics are what make an asset findable]
Search matches names, descriptions and topics. An asset named `flow-12` with no topic is
invisible. Add topics for the system, the protocol and the pattern when you publish.
:::

The **Templates** entry of the menu is this search with the type facet set to `template`.

## Asset page

{/* screenshot: assets-asset-page */}

Opening an asset shows what it is and where it comes from, so that you can decide whether to
reuse it before opening its repository.

| Element | Content |
|---|---|
| **Asset Details** | Type, version, author, default branch, size, creation, last update and publication dates |
| **Topics** | Add or remove topics |
| **Version Manager** | The versions of the asset |
| Documentation | The documentation of the asset, rendered from its repository |

:::info[Read the documentation and the dates]
An asset last updated two years ago for a system that has since changed may cost more to adapt
than to rewrite. The dates and the version history tell you whether it is maintained.
:::

## Tasks

| Task | Page |
|---|---|
| Search with indexes and facets | [Search the asset catalog](/library/tasks/find-an-asset) |
| Make something reusable | [Publish an asset](/library/tasks/publish-an-asset) |
| Choose or add a version | [Manage asset versions](/library/tasks/manage-versions) |

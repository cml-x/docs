---
title: "Assets Explorer: Search Indexes and Facets"
sidebar_position: 1
---

Assets Explorer is a full-text search over what is published: the repositories and releases of
your organization, and the public catalogs of Apache Camel and Camel X.

## Search indexes

The index selector chooses where to search. Several indexes can be searched at once.

| Index | Content |
|---|---|
| **My Org** | Repositories, templates and releases of the business unit |
| **Apache Camel** | The Apache Camel catalog |
| **CamelX** | The catalog published by the platform |

## Facets

| Facet | Values |
|---|---|
| Type | `release`, `template` |
| Topics | The topics of the repositories: project type, systems, protocols |
| Visibility | Public or private |
| Owner | The organization that owns the asset |

The **Templates** entry of the menu is this search with the type facet set to `template`.

## Asset page

{/* screenshot: assets-asset-page */}

| Element | Content |
|---|---|
| **Asset Details** | Type, version, author, default branch, size, creation, last update and publication dates |
| **Topics** | Add or remove topics |
| **Version Manager** | The versions of the asset |
| Documentation | The documentation of the asset, rendered from its repository |

## Publication

Nothing is published by hand in the common case: a repository set as a template, and each release
of a repository, are indexed as assets. **Create Asset** starts a new project of the chosen type.

## Tasks

| Task | Page |
|---|---|
| Search with indexes and facets | [Search the asset catalog](/library/tasks/find-an-asset) |
| Make something reusable | [Publish an asset](/library/tasks/publish-an-asset) |
| Choose or add a version | [Manage asset versions](/library/tasks/manage-versions) |

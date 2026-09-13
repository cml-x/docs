---
title: Assets
sidebar_position: 1
---

Assets Explorer is a searchable catalog over everything already published across
[Project Manager](/projects/getting-start)'s repositories and the schema registry — it doesn't
create integration content itself, it helps you find and reuse what already exists instead of
rebuilding it.

## Searching

- **Full-text, faceted search** across all published assets, with instant results and active-filter
  chips.
- Scope a search to one or several indexes at once via the **index selector**.
- Results scroll infinitely; each card shows an icon/logo, name, description, topic
  (`integration` / `api-specification`), type badge (`release` / `template`), and version.

## Asset types

- **Integration** — a Camel integration route; creating one hands off to Project Manager's
  repository/template picker.
- **API Specification** — OpenAPI, AsyncAPI, JSON Schema or Avro; creating one hands off to the
  schema registry.
- **Kamelet** — a reusable, pluggable Camel DSL connector component.
- **Pipe** — a declarative event-driven pipeline built by chaining Kamelets together.

Search results also surface finer-grained indexed types extracted from published repositories —
`release`, `operation`, `component`, `api`, `policy`, `service` — not just the four top-level types
above.

## Asset details

Opening an asset shows an API spec viewer (for OpenAPI-type assets), lets you **publish a new
version** (version number + package file), and includes an embedded wiki/documentation editor for
that asset. Assets can also be deleted from here.

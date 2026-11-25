---
title: Asset Catalog Model
sidebar_position: 0
---

The asset catalog indexes what a business unit has already built, so that it is found and reused
rather than rebuilt. This page explains what the catalog is for; its screens are described in the
[Asset Catalog Reference](/library/assets) and the [Asset Template Reference](/library/templates).

## Why search before building

In an organization with more than a few integrations, the connector you are about to write
often exists already: someone integrated that SFTP server, that Kafka cluster, that billing
API. Finding it saves the work and, more importantly, the credentials dance and the edge cases
its author already went through. The catalog is how you find it.

## What an asset template gives you

A working project instead of an empty repository: routes that already run, with the conventions
of whoever published it for property names, error handling and logging. You adapt addresses and
credentials instead of starting from a blank file.

The template is **copied** when you create your repository. Your project then lives on its own:
you can change anything, and later changes to the template do not reach you.

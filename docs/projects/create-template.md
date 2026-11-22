---
title: Repository Templates
sidebar_position: 6
---

A **template** is a repository that new repositories can be generated from. Use templates to
give every new integration the same starting point: a working route, the house conventions for
property names and logging, a README.

## How a template works

Creating a repository from a template **copies** the content of the template into the new
repository. From then on the two are unrelated: the new repository has its own history, and
later changes to the template do not reach it.

This is the right behavior for a starting point — your project is not rewritten behind your back
— and it has one consequence to keep in mind: improving a template only helps repositories
created afterwards.

## Create a repository from a template

In the creation wizard, choose **Create routes from template**. The **Template Selection** step
offers a search field and a source filter; selecting a template shows **What's included**, the
list of what it brings. Then name the repository as usual. The steps are in
[Create from a template](/projects/tasks/create-from-a-template).

## Turn a repository into a template

On the page of the repository, open **Actions** and choose **Set as template**. The repository
then appears in the template selection of the wizard, and in
[Assets Explorer](/library/templates) under **Templates**.

:::info[Setting as template changes nothing in the repository]
Its content, its releases and the integrations built from it are untouched. The repository is
only offered as a starting point in addition.
:::

## What makes a template usable

A template is read by someone who did not write it. Three things decide whether they can use it:

- **It runs as it is.** Every address, credential and tuning value is read from a property
  placeholder — `{{orders.partner.url}}` — never written in the route.
- **It says what it expects.** A README lists the properties to set and the stored
  configurations to create.
- **It can be found.** Topics name the systems, the protocols and the pattern: `sftp`, `kafka`,
  `content-based-router`. The search matches topics.

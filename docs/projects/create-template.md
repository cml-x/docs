---
title: Repository Templates
sidebar_position: 6
---

A template is a repository that new repositories can be generated from. The new repository gets a
copy of its content at creation time and then lives on its own.

## Create a repository from a template

In the creation wizard, choose **Create routes from template**. **Template Selection** offers a
search field and a source filter; selecting a template shows **What's included**. See
[Create a repository from a template](/projects/tasks/create-from-a-template).

## Turn a repository into a template

On the repository page, **Actions**, then **Set as template**. The repository then appears in the
template selection of the wizard and in [Assets Explorer](/library/templates) under **Templates**.

## What makes a usable template

- Routes that run as they are, with every endpoint address, credential and tuning value read from
  property placeholders.
- A README listing the properties to set and the stored configurations expected.
- Topics naming the systems, protocols and patterns involved: they are what the search matches.

## Behavior and limits

- A template is copied, not linked: later commits to the template do not reach the repositories
  generated from it.
- Setting a repository as a template does not change its content or its releases.

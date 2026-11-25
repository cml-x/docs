---
title: Asset Template Reference
sidebar_position: 2
---

**Templates** is the asset search restricted to the type `template`: repositories that can be
used as the starting point of a new one.

## What a template gives you

A working project instead of an empty repository: routes that already run, with the conventions
of whoever published it for property names, error handling and logging. You adapt addresses and
credentials instead of starting from a blank file.

The template is **copied** when you create your repository. Your project then lives on its own:
you can change anything, and later changes to the template do not reach you.

## Where templates come from

| Source | How it appears here |
|---|---|
| Your organization | A repository becomes a template through **Actions**, **Set as template** — see [Repository templates](/projects/create-template) |
| The platform | Ready-made templates in the **CamelX** index |

## Use a template

1. Open the template and read its documentation: which systems it connects, which properties
   and stored configurations it expects.
2. In **Integration Center**, create a repository with **Create routes from template** and
   select it — see [Create from a template](/projects/tasks/create-from-a-template).
3. Set the properties it expects, then deploy.

:::tip[Search by topic]
Topics are the reliable way to find a template: the system (`sap`, `salesforce`, `kafka`), the
protocol (`sftp`, `jms`, `rest`), the pattern (`content-based-router`, `aggregator`).
:::

:::warning[A template is a starting point, not a dependency]
Because it is copied, a fix made later in the template does not reach your repository. If you
need shared logic that stays up to date, publish it as a **Kamelet** and use it from your routes.
:::

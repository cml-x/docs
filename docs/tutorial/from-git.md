---
title: 5. Move the Source to Git
sidebar_position: 6
---

Inline mode is the fastest way to start. As soon as an integration matters, its source belongs in
a repository: it is reviewed, versioned and released like any other code.

This step is a detour: the integration does the same thing, built from Git.

## Inline or Git?

| | Inline | Git |
|---|---|---|
| Where the route lives | In the integration, in the console | In a repository |
| History and review | Revisions of the integration | Commits, branches, merge requests |
| What is deployed | What was typed | A branch, or a release |
| Several files, tests, shared code | Possible, quickly awkward | Natural |
| Best for | Trying something, a small route, a demonstration | Anything that goes to production |

Nothing else changes: settings, deployment, exposure and security work the same in both modes.

## Put the route in a repository

In **Integration Fabric**, create a repository for the integration — or use one you already have
— and add the route to it:

```text
orders-api/
└── src/main/resources/routes/
    └── orders.camel.yaml
```

Commit it. When the route is ready to be deployed, create a **release**: a named, fixed version
of the repository.

## Build the integration from it

Create a new integration, or edit `orders-api`, and set **Source mode** to **Git**. In **Git
Project**:

1. choose the **repository**;
2. choose what to build: a **branch**, to follow its latest commit, or a **release**, to deploy
   exactly that version.

For a private repository, the integration needs credentials: a configuration of the kind
[Git Repository Credentials](/config-sources/templates#git-repository-credentials).

Deploy. The build now starts from the repository instead of the text typed in the console.

## Branch or release?

| Build from | You get | Use it in |
|---|---|---|
| A **branch** | The latest commit, each time you deploy | Development |
| A **release** | Always the same source | Test and production |

Deploying a release means that what runs in production is exactly what was tested.

## Keep the settings

The properties, variables, files and certificates of [step 3](/tutorial/configure) and
[step 4](/tutorial/trust) are settings of the integration, not part of its source. They stay as
they are when you change the source mode, and they keep differing by environment.

That separation is the point: **the repository holds what the integration does, the settings hold
where it runs.**

Next: [expose it as an API](/tutorial/expose).

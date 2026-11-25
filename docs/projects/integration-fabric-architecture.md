---
title: Integration Fabric Architecture
slug: /projects
sidebar_position: 0
---

Integration Fabric is where integrations are designed and versioned before anything runs. The
rest of this documentation calls it **Project Manager**; in the console it is the application
named **Integration Fabric**. It is made of four parts that work on the same projects.

![Integration Fabric: an online designer and a schema designer, a Git provider and a schema registry; what is released is published to Assets Explorer, from where it is reused or deployed to an environment](/img/projects/integration-fabric.drawio.png)

## The four parts

| Part | What it does | What it keeps |
|---|---|---|
| **Online designer** | Builds routes in the browser, visually or as code, with no local installation | Nothing: it commits to the repository of the project |
| **Schema designer** | Edits the contracts of your APIs and messages in the browser | Nothing: it saves to the schema registry |
| **Git provider** | Holds one repository per project, its branches and its releases | The source and its history |
| **Schema registry** | Stores every contract and each of its versions | OpenAPI, JSON Schema and Avro documents |

The two designers are editors; the Git provider and the schema registry are where the work is
stored. Nothing is kept in the designers themselves, so a project can be opened by anyone who
may access it, from any browser.

## Online designer and its catalog

The online designer does not ship a fixed list of building blocks. It reads its catalog from
the **Asset Service**: the Camel components, the Kamelets and the templates available to your
business unit.

The consequence is that a Kamelet or a template published by one team appears in the designer
of the others, without an upgrade of anything. See
[Camel dependencies](/projects/use-a-component) for how a component reaches a build.

## Git provider: built-in or your own

Every organization starts on the built-in Git provider, with nothing to set up. An organization
can connect its own instead, so that the source stays where its teams and its pipelines already
work:

| Provider | Hosting |
|---|---|
| **Built-in** | Managed by the platform |
| **GitLab** | gitlab.com or a GitLab you host |
| **GitHub** | github.com or GitHub Enterprise Server |
| **Gitea** | A Gitea you host |

Whatever the provider, a project is one repository, edited in the online designer or with any
Git client. [Repository Reference](/projects/repos) describes the screens.

## Schema designer and schema registry

A contract is designed in the schema designer and saved to the schema registry, where each
change is a new version. [Schema Registry Reference](/projects/schemas) lists the formats.

## Publication to Assets Explorer

What Integration Fabric produces is published to **Assets Explorer**, the searchable side of the
Asset Service. It is published for two uses:

| Use | What is published | Who takes it |
|---|---|---|
| **Reuse** | Templates and Kamelets | Another team, starting a project or adding a connector in the designer |
| **Deployment** | Releases | Runtime Manager, which builds and runs a release in an environment |

This closes the loop of the diagram: the catalog the designer reads on the left is fed by what
was published on the right. [Asset Catalog Model](/library/asset-catalog-model) explains what
the catalog is for.

## Pages of this section

| You want to | Read |
|---|---|
| Understand repositories, branches and releases | [Source and Release Model](/projects/getting-start) |
| Add a Camel component to a project | [Camel Dependencies](/projects/use-a-component) |
| Publish a project as a template | [Repository Templates](/projects/create-template) |
| Decide which integrations to group | [Grouping Integrations](/projects/multi-component-integration) |
| Know what the catalog indexes | [Asset Catalog Model](/library/asset-catalog-model) |

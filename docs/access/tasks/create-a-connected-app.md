---
title: Create a Service Account
sidebar_position: 4
---

Create an identity for a program — a script, a pipeline, another system — that calls the platform without a person signing in.

## How it works

A service account is an identity for a program. It has its own credentials and its own roles, so that automation neither borrows a person's rights nor stops when that person leaves.

:::danger[The secret is shown once]
Copy it when it is created. It cannot be displayed again, only replaced.
:::

## Use cases

For automation that manages the platform itself. For applications that call **your APIs**, register a client on an [auth gateway](/auth/client-lists) instead.

## Prerequisites

- The right to manage service accounts.

## Procedure

{/* screenshot: access-tasks-create-a-connected-app */}

1. In **Access Manager**, go to **Service Accounts** and choose **Create Service Account**.
2. Give a **Display Name** and a description.
3. Create, then create its client secret and **copy it**: it is shown once.
4. Give the app access, as for a user.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Display Name** | What the app is, for the people reading the list. | — |
| **Description** | What it is used for. | — |

## Behavior and limits

- A service account has no access until it is given some.
- Removing its client secret, or deactivating the app, stops it at once.
- One app per program: when a secret leaks, only that program has to be given a new one.

## See also

- [Service Accounts](/access/connected-apps)
- [RBAC principles](/access/rbac-principles)

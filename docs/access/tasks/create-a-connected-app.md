---
title: Create a Connected App
sidebar_position: 4
---

Create an identity for a program — a script, a pipeline, another system — that calls the platform without a person signing in.

## When to use it

For automation that manages the platform itself. For applications that call **your APIs**, register a client on an [auth gateway](/auth/client-lists) instead.

## Before you begin

- The right to manage connected apps.

## Procedure

{/* screenshot: access-tasks-create-a-connected-app */}

1. In **Access Manager**, go to **Connected Apps** and choose **Create Connected App**.
2. Give a **Display Name** and a description.
3. Create, then create its client secret and **copy it**: it is shown once.
4. Give the app access, as for a user.

## Field reference

| Field | What it is | Default |
|---|---|---|
| **Display Name** | What the app is, for the people reading the list. | — |
| **Description** | What it is used for. | — |

## Good to know

- A connected app has no access until it is given some.
- Removing its client secret, or deactivating the app, stops it at once.
- One app per program: when a secret leaks, only that program has to be given a new one.

## See also

- [Connected Apps](/access/connected-apps)
- [RBAC principles](/access/rbac-principles)

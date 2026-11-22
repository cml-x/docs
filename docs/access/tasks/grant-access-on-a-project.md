---
title: Grant Roles on a Project
sidebar_position: 2
---

Give a user one or several roles on a project. Without this, a user sees nothing of it.

## How it works

A grant gives a user one or several roles on one project. It is what makes the project visible to them and decides what they may do in it.

:::tip Least privilege
Grant the smallest role that covers the work, restricted to the environments the person works in.
:::

## Prerequisites

- The user exists.
- The roles exist — see [Create and manage roles](/access/create-and-manage-roles).

## Procedure

{/* screenshot: access-tasks-grant-access-on-a-project */}

1. In **Access Manager**, go to **RBAC** and choose **New Authorization**.
2. Select the user, then the project.
3. Select at least one role.
4. Save.

## Behavior and limits

- An authorization can be deactivated without being deleted: the user loses the access, and gets it back when it is reactivated.
- Give the smallest role that lets the person do their work, and restrict it to the environments they work in.

## See also

- [RBAC principles](/access/rbac-principles)
- [Assign roles and permissions](/access/assign-roles-and-permissions)

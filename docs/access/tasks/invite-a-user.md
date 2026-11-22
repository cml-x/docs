---
title: Create a User
sidebar_position: 1
---

Create an account for someone and let them choose their password.

## How it works

Creating a user gives someone an account and sends them an invitation to set their password. The account can sign in but sees nothing until a role is granted.

:::info[Not needed with an identity provider]
People who sign in through your company provider get their account at first sign-in.
:::

## Prerequisites

- The right to manage users.

## Procedure

{/* screenshot: access-tasks-invite-a-user */}

1. In **Access Manager**, go to **Users** and choose **Create User**.
2. Fill **Email**, **Username**, **First Name** and **Last Name**.
3. Create. An invitation is sent to the address.
4. Give the user access: see [Give a user access to a project](/access/tasks/grant-access-on-a-project).

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Email** | Where the invitation is sent. Changing it later sends a verification link. | — |
| **Username** | What the user signs in with. | — |
| **First Name, Last Name** | Required. | — |
| **Display Name, Nickname** | Optional. | — |

## Behavior and limits

- A new user is a regular user: they see nothing until they are given access.
- People who sign in through your company's identity provider need no invitation — see [Let people sign in with your identity provider](/access/tasks/add-an-identity-provider).

## See also

- [RBAC principles](/access/rbac-principles)
- [Users](/access/users)

---
title: Lock or Delete a User
sidebar_position: 3
---

Stop someone from signing in, for a while or for good.

## How it works

Three actions stop someone from signing in. Locking and deactivating keep the account and its grants; deleting removes them for good.

:::danger[Deletion is permanent]
The account and its grants cannot be restored. Deactivate first; delete when nothing refers to the account any more.
:::

## Prerequisites

- The right to manage users.

## Procedure

{/* screenshot: access-tasks-lock-or-remove-a-user */}

1. In **Access Manager**, go to **Users** and open the user.
2. Choose what fits: **lock** the account, **deactivate** it, or **delete** the user.
3. Confirm.

## Behavior and limits

- **Lock** and **deactivate** are reversible: the account and its access are kept.
- **Delete** is permanent: the user loses access to every resource.
- When someone leaves, deactivate first; delete once nothing depends on the account.
- To reset how a user proves who they are, open **Two-Factor Authentication** on the user and remove the factor they lost.

## See also

- [Users](/access/users)

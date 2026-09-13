---
title: Access Manager
sidebar_position: 6
---

### Permission denied

- **Possible cause** — the user has no active [authorization](/access/assign-roles-and-permissions)
  for this project, or the grant was deactivated.
- **Check** — open **Authorizations**, filter to the user and project, and confirm a grant exists
  and is **active** — a deactivated grant blocks access immediately without deleting it.
- **Fix** — activate the existing grant, or create a new authorization with the role that covers
  what the user needs.

### User has no access

- **Possible cause** — the user account exists but has never been granted a project authorization,
  or the account itself is deactivated or locked.
- **Check** — on the [Users](/access/users) page, confirm the account is active (not deactivated
  or locked); then check **Authorizations** for a grant on the relevant project.
- **Fix** — reactivate/unlock the account if needed, then grant the appropriate project
  authorization — see [Create a User](/access/create-user) and
  [Assign Roles & Permissions](/access/assign-roles-and-permissions).

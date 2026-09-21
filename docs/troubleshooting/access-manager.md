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

### "Access denied" on a list page

- **Possible cause** — the user's roles do not grant **View** on that resource type (for example
  Auth Gateways) in this business unit. The console shows an **Access denied** panel instead of an
  empty list, and the API answers 403.
- **Check** — on the business unit's **Roles Base Access** tab, choose **View permissions** on the
  user's role and look for the resource's category. See
  [RBAC Principles](/access/rbac-principles).
- **Fix** — edit the role to add the permission (View is implied by Edit or Delete), or grant the
  user another role that covers it.

### Can view a resource but cannot deploy or delete it in one environment

- **Possible cause** — the role's permissions for that category are **restricted to specific
  environments**, and this environment is not one of them. View always stays business-unit-wide.
- **Check** — open **View permissions** on the role and read the environment badges of the
  category.
- **Fix** — edit the role (step 3 of the wizard) and tick the environment, or clear the
  restriction to make the permission business-unit-wide. See
  [Create and Manage Roles](/access/create-and-manage-roles).

### Role import says nothing was recognized

- **Possible cause** — the JSON is invalid, or none of its permissions exist in the current
  catalog.
- **Fix** — export a role with **Download** from its **View permissions** dialog and use that file
  as the template.

### User has no access

- **Possible cause** — the user account exists but has never been granted a project authorization,
  or the account itself is deactivated or locked.
- **Check** — on the [Users](/access/users) page, confirm the account is active (not deactivated
  or locked); then check **Authorizations** for a grant on the relevant project.
- **Fix** — reactivate/unlock the account if needed, then grant the appropriate project
  authorization — see [Create a User](/access/create-user) and
  [Assign Roles & Permissions](/access/assign-roles-and-permissions).

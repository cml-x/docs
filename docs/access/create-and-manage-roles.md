---
title: Create and Manage Roles
sidebar_position: 4
---

This tutorial walks through building a role, checking what it grants, reusing it, and giving it to
a user. It assumes you have read [RBAC Principles](/access/rbac-principles), or at least know that
permissions belong to a **role** and can apply to the whole business unit or to chosen
**environments**.

**What you will build:** a role called *Platform Editor Access* that lets people manage gateways
and capsules, deploy only to `dev` and `staging`, and read everything else.

## 1. Open the Roles tab

1. Open your business unit from the organization page.
2. Select the **Roles Base Access** tab.

You see the list of the business unit's roles. Each row has a **⋯ menu** with **View permissions**,
**Edit scopes**, **Clone** and **Remove**.

## 2. Create the role

Click **Create Role**. The wizard has three steps.

### Step 1 — Identify the role

- **Name** — type `Platform Editor`. The key is derived automatically (`platform-editor-access`).
  You do not need to type "Access": it is added for you when you continue.
- **Group** *(optional)* — a label such as `management` to organize the list.
- **Import permissions from JSON** *(optional)* — start from a file exported from another role
  instead of ticking everything by hand. See [Import and export](#import-and-export).

### Step 2 — Choose permissions

Each application category is a collapsible section. Click a title anywhere to expand it, then tick
what the role should grant, for example:

- API Manager → **Create and manage Gateway** and **Apply changes on Gateway**
- Applications Manager → **Create and manage Capsule** and **Apply changes on Capsule**

The checkbox next to a category title selects or clears **all** of its permissions. The badge shows
how many are selected. Categories you do not touch grant nothing.

### Step 3 — Restrict to environments *(optional)*

Only categories that support environment restriction and have something selected appear here
(API Manager, Auth Manager, Applications Manager).

1. Expand **API Manager**.
2. Tick `dev` and `staging`.

A badge shows *restricted to 2 environments*. Leave a category with **no** environment ticked to
keep it business-unit-wide. Categories are independent, so you can restrict API Manager while
leaving Applications Manager wide open.

Click **Save**. Nothing is created on the platform until this moment — closing the wizard earlier
discards everything.

:::tip
Viewing stays business-unit-wide even for a restricted category, so people can still see gateways
in `prod` — they just cannot deploy there.
:::

## 3. Check what the role grants

From the role's **⋯ menu**, choose **View permissions**.

- **List** — one collapsible section per category, each permission tagged
  *Business-unit-wide* or with the environments it is restricted to. When a permission covers many
  environments, only the first few are shown; use **+N more** to expand and **Show less** to fold
  it back.
- **JSON** — the same information as a document, ready to copy or download.

This view reads the live permissions, so it always reflects the truth — use it to audit a role
before you hand it out.

## Import and export

The **JSON** view has a **Download** button that saves `<role-key>-permissions.json`. The file
looks like this:

```json
{
  "role": "platform-editor-access",
  "displayName": "Platform Editor Access",
  "group": "management",
  "businessUnit": {
    "scopes": ["can_view_gateway", "can_edit_capsule", "can_view_capsule"]
  },
  "environments": [
    { "environmentId": "dev", "scopes": ["can_edit_gateway", "can_deploy_gateway"] },
    { "environmentId": "staging", "scopes": ["can_edit_gateway", "can_deploy_gateway"] }
  ]
}
```

Use it to keep a role under version control, move a role between business units, or review it in a
pull request. To load it, open **Create Role** and click **Import permissions from JSON** on step 1:

- The file pre-fills steps 2 and 3 — review them, adjust, then save. **Nothing is saved on import.**
- Entries the current catalog does not recognize are ignored. If nothing in the file is
  recognized, or the file is not valid JSON, you get an error and nothing changes.
- If the name field is empty, the file's name is suggested with "(imported)" appended.

## Clone a role

To create a variation of an existing role, open its **⋯ menu** and choose **Clone**. The Create
Role wizard opens with all the permissions of the source role already selected — including its
environment restrictions. Give the clone a name and save. Like import, cloning changes nothing
until you save.

## Edit or remove a role

- **Edit scopes** opens the wizard directly on step 2 with the role's current permissions loaded.
  A spinner shows while they load; if they cannot be loaded, you see an error instead of a
  misleading empty selection, and **Next**/**Save** stay disabled.
- **Remove** deletes the role and removes it from every user who had it.

## 4. Give the role to a user

A role does nothing until someone holds it.

1. On the business unit, open the **Members** tab and click **Add Member**.
2. Pick the user and tick **Platform Editor Access**.
3. Confirm.

Alternatively, use **RBAC** in Access Manager to manage grants across users — see
[Authorizations](/access/authorizations). Grants can be deactivated or deleted at any time, which
revokes access immediately.

## 5. Verify

Sign in as the user (or ask them) and check:

- They can open gateways and capsules.
- They can deploy a gateway in `dev`, but **not** in `prod`.
- Pages for resources the role does not cover show an **Access denied** panel.

If something is unexpectedly blocked or allowed, see
[Troubleshooting: Access Manager](/troubleshooting/access-manager).

## Good practices

- **Start narrow.** Grant View-level roles broadly and keep Deploy and Delete in small,
  well-named roles.
- **One role per job.** *Platform Editor Access*, *Auditor Access*, *Release Manager Access* are
  easier to reason about than one role with everything ticked.
- **Restrict Deploy on production.** Give Deploy to `dev` and `staging` in a general role, and
  keep production in a separate, tightly held role.
- **Audit with View permissions.** Before granting a role to a group of people, read it in list
  and JSON form.
- **Export important roles** and keep the JSON in version control.

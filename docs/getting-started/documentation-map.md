---
title: Documentation Map
sidebar_position: 1.5
---

This documentation is organized by **what you need at the moment you open it**, following the
[Diátaxis](https://diataxis.fr) framework. The same subject — a JWT policy, a release — appears
in up to four places, each written for a different need.

![The four kinds of pages: tutorials, how-to guides, concepts, reference](/img/docs-map.drawio.png)

## The four kinds of pages

Each kind answers a different question. Knowing which question you have tells you where to go.

| Kind | Your question | What the page gives you | Example |
|---|---|---|---|
| **Tutorials** | "I am new to this. Show me." | A lesson that works from start to finish | [Quick Start](/getting-started/quick-start) |
| **How-to guides** | "How do I do X?" | The steps to reach one goal, and how to verify it | [Rate limiting](/api-manager/policy-tasks/rate-limit) |
| **Concepts** | "Why does it work this way?" | Models, architecture, trade-offs | [Request routing](/api-manager/how-requests-are-routed) |
| **Reference** | "What exactly is the default of Y?" | Every parameter, default and limit | [Backend Traffic Policy](/api-manager/reference/backend-traffic-policy) |

:::tip Pick by situation, not by product area
Stuck on a `503` in production? Go to **How-to guides → Troubleshooting**. Deciding whether to
group two integrations? **Concepts**. Looking for the default retry interval? **Reference**.
:::

## How one subject is spread

Take JWT authentication on an API:

| You want to | Kind | Page |
|---|---|---|
| See it work once, end to end | Tutorial | [9. Secure the API](/tutorial/secure) |
| Add it to your API now | How-to guide | [JWT authentication](/api-manager/policy-tasks/jwt) |
| Understand what the gateway verifies and what it does not | Concept | [Authn and Authz](/security/authentication-vs-authorization) |
| Look up `checkAudience` and its default | Reference | [Security Policy](/api-manager/reference/security-policy#jwt-authentication) |

## Conventions

- **Bold** marks a label you see in the console: **Apply changes**.
- `Monospace` marks what you type or read in a file, a log or a command.
- Coloured blocks mark what must not be missed:

:::info
Context that helps you understand a behavior.
:::

:::tip
A recommendation.
:::

:::warning
Something that surprises people or has a cost.
:::

:::danger
Something irreversible or that removes a protection.
:::

## If you are new

1. Read [Platform Architecture](/getting-started/overview) — five minutes.
2. Do the [Quick Start](/getting-started/quick-start) — a route deployed and exposed.
3. Follow the [Learning Path](/getting-started/your-first-integration) at your own pace.

---
title: HTTP Basic Authentication
sidebar_position: 2
---

Ask every caller for a user name and a password. A browser shows its own sign-in prompt.

## How it works

The gateway checks the user name and password of the `Authorization: Basic` header against a list of users whose passwords are stored hashed. It suits internal tools and callers that cannot do better.

:::warning HTTPS only
Basic credentials are sent with every request, merely encoded. Never enable this on an HTTP access point.
:::

Every parameter and its default: [reference](/api-manager/reference/security-policy#http-basic-authentication).

## Use cases

For an internal tool or a test environment. The password travels with every request: for a public API, use [tokens](/auth/protect-api-with-jwt).

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.
- A list of users: a stored configuration of the kind [Basic Auth Users](/config-sources/templates#basic-auth-users). It can be created from the rule.

## Procedure

{/* screenshot: api-manager-policy-tasks-basic-auth */}

1. In **API Manager**, go to **API Instances** and open the API. To cover everything published on a gateway instead, open the gateway.
2. Open its **Security** policies and add the rule **user name and password**.
3. In **Users**, choose the list of users, or **New secret** to create one.
4. Optionally fill **Forward Username Header** to pass the verified user name to your service.
5. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Users** | The stored list of users and their passwords. | — |
| **Forward Username Header** | Header in which the verified user name is passed to your service, such as `x-username`. | — |

## Verification

```bash title="With a user name and a password"
curl -i -u alice:<password> https://orders.example.com/orders
```

```http title="Answer"
HTTP/1.1 200 OK
```

## Behavior and limits

- Passwords are kept as fingerprints: they cannot be recovered, only replaced.
- Publish the API on an HTTPS access point: over HTTP the password would travel in clear.

## See also

- [Policies](/api-manager/policies) — every rule at a glance
- [Templates: Basic Auth Users](/config-sources/templates#basic-auth-users)

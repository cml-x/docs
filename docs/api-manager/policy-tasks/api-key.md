---
title: API Key Authentication
sidebar_position: 1
---

Refuse every request that does not carry a key you issued. Each client has its own key, so that a key can be withdrawn without disturbing the others.

## How it works

The gateway compares a key sent by the caller with a list you store. A request without a key from the list is answered `401` before it reaches the service. Each caller should have its own key, so that one can be withdrawn without affecting the others.

:::warning[A key never expires on its own]
Plan its rotation: add the new key to the list, move the caller, then remove the old one.
:::

Every parameter and its default: [reference](/api-manager/reference/security-policy#api-key-authentication).

## Use cases

For a small number of known applications, when a key in a header is enough. For APIs called by many applications, or when a token must expire, use [tokens](/auth/protect-api-with-jwt).

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.
- A list of keys: a stored configuration of the kind [API Keys](/config-sources/templates#api-keys). It can be created from the rule.

## Procedure

{/* screenshot: api-manager-policy-tasks-api-key */}

1. In **API Manager**, go to **API Instances** and open the API. To cover everything published on a gateway instead, open the gateway.
2. Open its **Security** policies and add the rule **API keys**.
3. In **API Keys**, choose the list of keys, or **New secret** to create one. Add one entry per client and copy each key: it is shown once.
4. Say where callers send the key: fill **Extract from Header** with `x-api-key`, or use a query parameter or a cookie.
5. Optionally fill **Forward Client ID Header** and turn **Sanitize Key** on.
6. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **API Keys** | The stored list of keys, one per client. | — |
| **Extract from Header** | Header in which callers send the key, such as `x-api-key`. | — |
| **Extract from Query Param** | Query parameter in which callers send the key, such as `api_key`. | — |
| **Extract from Cookie** | Cookie in which callers send the key. | — |
| **Forward Client ID Header** | Header in which the name of the client is passed to your service, such as `x-client-id`. | — |
| **Sanitize Key** | Remove the key from the request before it reaches your service. | Off |

## Verification

```bash title="Without a key"
curl -i https://orders.example.com/orders
```

```http title="Answer"
HTTP/1.1 401 Unauthorized
```

```bash title="With a key"
curl -i -H "x-api-key: <key>" https://orders.example.com/orders
```

```http title="Answer"
HTTP/1.1 200 OK
```

## Behavior and limits

- A key does not expire. Remove a client from the list to withdraw its key.
- A key in a query parameter ends up in logs and browser histories: prefer a header.
- Keys are kept as fingerprints and cannot be read back: copy them when they are made.

## See also

- [Policies](/api-manager/policies) — every rule at a glance
- [Protect an API with JWT](/auth/protect-api-with-jwt)
- [Templates: API Keys](/config-sources/templates#api-keys)

---
title: IP Allowlist and Denylist
sidebar_position: 6
---

Let through, or block, callers according to the address they come from.

## How it works

The gateway allows or refuses a request from its source address, before authentication. Use an allowlist to open an API to known networks only, or a denylist to block addresses that abuse it.

:::warning Check which address the gateway sees
Behind a CDN or a proxy, every request appears to come from the proxy. Test from the real client network before relying on a rule.
:::

Every parameter and its default: [reference](/api-manager/reference/security-policy#ip-allowlist-and-denylist).

## Use cases

To open an API to your partners' addresses only, or to block an address that misbehaves.

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.

## Procedure

{/* screenshot: api-manager-policy-tasks-ip-rules */}

1. In **API Manager**, go to **API Instances** and open the API. To cover everything published on a gateway instead, open the gateway.
2. Open its **Security** policies and add the rule **allow or block addresses**.
3. Choose the **Default Action**: **Deny** to let through only the addresses you list, **Allow** to block only those you list.
4. Add **Rules**, in order. Each has an action — allow or deny — and one or several address ranges, such as `203.0.113.0/24`.
5. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Default Action** | What happens to a caller that no rule matches. | Deny |
| **Rules** | In order, each with an action and address ranges. The first rule that matches decides. | — |

## Verification

```bash title="From an address that is not allowed"
curl -i https://orders.example.com/orders
```

```http title="Answer"
HTTP/1.1 403 Forbidden
```

## Behavior and limits

- Rules are read in order: put the most specific first.
- The address seen is the one the gateway receives the connection from. Behind a proxy of your own, it is the address of that proxy.

## See also

- [Policies](/api-manager/policies) — every rule at a glance
- [Network](/infra/network) — the traffic rules of the environment

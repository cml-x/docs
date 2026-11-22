---
title: Allow or Block Addresses
sidebar_position: 6
---

Let through, or block, callers according to the address they come from.

## When to use it

To open an API to your partners' addresses only, or to block an address that misbehaves.

## Before you begin

- An [API instance](/api-manager/api-instances) that is deployed and answers.

## Procedure

{/* screenshot: api-manager-policy-tasks-ip-rules */}

1. In **API Manager**, go to **API Instances** and open the API. To cover everything published on a gateway instead, open the gateway.
2. Open its **Security** policies and add the rule **allow or block addresses**.
3. Choose the **Default Action**: **Deny** to let through only the addresses you list, **Allow** to block only those you list.
4. Add **Rules**, in order. Each has an action — allow or deny — and one or several address ranges, such as `203.0.113.0/24`.
5. Deploy.

## Field reference

| Field | What it is | Default |
|---|---|---|
| **Default Action** | What happens to a caller that no rule matches. | Deny |
| **Rules** | In order, each with an action and address ranges. The first rule that matches decides. | — |

## Verify

```bash title="From an address that is not allowed"
curl -i https://orders.example.com/orders
```

```http title="Answer"
HTTP/1.1 403 Forbidden
```

## Good to know

- Rules are read in order: put the most specific first.
- The address seen is the one the gateway receives the connection from. Behind a proxy of your own, it is the address of that proxy.

## See also

- [Policies](/api-manager/policies) — every rule at a glance
- [Network](/infra/network) — the traffic rules of the environment

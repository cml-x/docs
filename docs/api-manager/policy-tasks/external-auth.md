---
title: External Authorization
sidebar_position: 4
---

Ask a service of yours, for each request, whether it may pass. The service answers allowed or denied, and can add headers to the request.

## How it works

The gateway asks a service of yours, for each request, whether to let it through. Your service receives the request details and answers yes or no. Use it when the decision needs data only you have: a contract, a quota, a risk score.

:::danger[Your service is now in the path of every call]
Its latency is added to every request and its outage is an outage of the API. Make it fast, replicated, and decide deliberately on `failOpen`.
:::

Every parameter and its default: [reference](/api-manager/reference/security-policy#external-authorization).

## Use cases

When the decision follows rules of your own that no other rule expresses: a contract, a directory, a time of day.

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.
- The service that decides, deployed and reachable: a service of the platform — an integration for example — or an [upstream](/api-manager/upstreams).

## Procedure

{/* screenshot: api-manager-policy-tasks-external-auth */}

1. In **API Manager**, go to **API Instances** and open the API. To cover everything published on a gateway instead, open the gateway.
2. Open its **Security** policies and add the rule **external authentication**.
3. In **Protocol**, choose **HTTP** or **gRPC**, as your service speaks.
4. In **Authentication Service**, choose the service. Its port comes with it.
5. Leave **Fail Open** off unless the API must stay reachable when your service is down.
6. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Protocol** | How your service is called: HTTP or gRPC. | HTTP |
| **Authentication Service** | The service that decides: a service of the platform, or an upstream. | — |
| **Fail Open** | Let requests through when your service does not answer. | Off |

## Verification

```bash title="A request your service refuses"
curl -i https://orders.example.com/orders
```

```http title="Answer"
HTTP/1.1 403 Forbidden
```

## Behavior and limits

- Every request now waits for your service. Keep it fast, and run more than one instance.
- With **Fail Open** off, the API is unavailable while your service is: unavailable, but never open.
- An HTTP service allows a request by answering with a success status, and denies it with any other.

## See also

- [Policies](/api-manager/policies) — every rule at a glance
- [Upstreams](/api-manager/upstreams)

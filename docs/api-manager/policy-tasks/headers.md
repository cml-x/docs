---
title: Request and Response Header Modification
sidebar_position: 15
---

Change the headers of requests before they reach your service, and of responses before they reach the caller.

## Use cases

To pass a fixed value to a service, to hide a header that reveals too much, or to add a security header to every response.

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.

## Procedure

{/* screenshot: api-manager-policy-tasks-headers */}

1. In **API Manager**, open the API instance.
2. Add the setting **HTTP request headers**, **HTTP response headers**, or both.
3. Fill **Add Headers**, **Set Headers** and **Remove Headers**.
4. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Add Headers** | Headers added, even when one of the same name is already there. | — |
| **Set Headers** | Headers set: an existing value is replaced. | — |
| **Remove Headers** | Names of the headers removed. | — |

## Verification

```bash title="See the headers of a response"
curl -sI https://orders.example.com/orders
```

## Behavior and limits

- **Add** keeps an existing header and adds another; **Set** replaces it. Use **Set** when the value must be the only one.

## See also

- [Rewrite the path or the host name](/api-manager/policy-tasks/url-rewrite)
- [API Instances](/api-manager/api-instances)

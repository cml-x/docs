---
title: CORS
sidebar_position: 5
---

Let web pages served from another site call the API. Browsers refuse such calls unless the API says they are allowed.

## Use cases

When the API is called from JavaScript running in a browser, on a page that is not served from the same address as the API. Calls from servers and scripts are not concerned.

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.

## Procedure

{/* screenshot: api-manager-policy-tasks-cors */}

1. In **API Manager**, go to **API Instances** and open the API. To cover everything published on a gateway instead, open the gateway.
2. Open its **Security** policies and add the rule **CORS**.
3. In **Allowed Origins**, list the sites allowed to call the API, such as `https://app.example.com`.
4. Adjust **Allowed Methods** and **Allowed Headers** to what those pages send.
5. Turn **Allow Credentials** on only if the pages send cookies or an authorization header.
6. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **Allowed Origins** | The sites allowed to call the API. | `*` — every site |
| **Allowed Methods** | The HTTP methods those sites may use. | `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS` |
| **Allowed Headers** | The headers those sites may send. | `Content-Type`, `Authorization` |
| **Exposed Headers** | The response headers the calling page may read. | — |
| **Cache Duration** | How long a browser remembers these rules before asking again. | `3600s` |
| **Allow Credentials** | Allow cookies and authorization headers in cross-origin calls. | Off |

## Verification

```bash title="What a browser asks before calling"
curl -i -X OPTIONS https://orders.example.com/orders \
  -H "Origin: https://app.example.com" \
  -H "Access-Control-Request-Method: GET"
```

```http title="Answer"
HTTP/1.1 200 OK
access-control-allow-origin: https://app.example.com
```

## Behavior and limits

- **Allow Credentials** requires named origins: it does not work with `*`.
- CORS is not a protection: it tells browsers what is allowed. Combine it with an authentication rule.

## See also

- [Policies](/api-manager/policies) — every rule at a glance

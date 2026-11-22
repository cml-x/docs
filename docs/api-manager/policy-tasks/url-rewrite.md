---
title: URL Rewrite
sidebar_position: 16
---

Change the path or the host name of a request before it is forwarded, so that the address callers use need not be the one your service expects.

## How it works

The gateway changes the path or the host name of the request before forwarding it. The address you publish and the address the service expects can then differ: `/v1/orders` outside, `/orders` inside.

:::info The service sees the rewritten request
Links or redirects the service builds from its own path will not include the public prefix.
:::

Every parameter and its default: [reference](/api-manager/reference/route-filters#url-rewrite).

## Use cases

When an API is published under a path the service does not know, or when the service expects a particular host name.

## Prerequisites

- An [API instance](/api-manager/api-instances) that is deployed and answers.

## Procedure

{/* screenshot: api-manager-policy-tasks-url-rewrite */}

1. In **API Manager**, open the API instance.
2. Add the setting **URL rewrite**.
3. In **New Path**, give the path the request is forwarded with, and choose the **Path Rewrite Mode**.
4. Optionally give a **New Hostname**.
5. Deploy.

## Parameters

| Field | What it is | Default |
|---|---|---|
| **New Path** | The path the request is forwarded with, such as `/api/v2`. | — |
| **Path Rewrite Mode** | **Replace full path**, or **Replace matched prefix only**. | Replace full path |
| **New Hostname** | The host name the request is forwarded with, such as `backend.internal`. | — |

## Behavior and limits

- An API published on a path of the gateway already has its prefix removed by default: this setting is for anything beyond that.

## See also

- [API Instances](/api-manager/api-instances)
- [Add, replace or remove headers](/api-manager/policy-tasks/headers)

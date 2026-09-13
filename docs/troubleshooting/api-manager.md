---
title: API Manager
sidebar_position: 4
---

### API inaccessible

- **Possible cause** — the backend Kubernetes Service or port is wrong, or the gateway isn't bound
  to the environment the backend actually runs in.
- **Check** — on the API Instance's **Gateway & Backend** configuration, confirm the service
  appears in the live Kubernetes Services dropdown for the project (if it doesn't, it isn't
  running or isn't in this environment) and that the port matches.
- **Fix** — deploy or fix the backend in [Runtime Manager](/runtime/getting-start) first, then
  re-select it as the backend, or correct the service name/port if entered manually.

### Authentication failed

- **Possible cause** — the security policy (JWT, OIDC, API key, or basic auth) attached to the
  gateway or API Instance is rejecting the request — often because the token wasn't issued by the
  Auth Gateway the policy expects, or has expired.
- **Check** — confirm which [Auth Gateway](/auth/getting-start) issued the token, and that the
  policy on the API side points at that same gateway.
- **Fix** — re-issue a token from the correct gateway, or update the policy to point at the right
  one. Exact error responses for each auth type are **[À CONFIRMER]**.

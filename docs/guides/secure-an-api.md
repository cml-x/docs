---
title: Secure an API
sidebar_position: 4
---

Security-first version of [Expose an API](/guides/expose-an-api): set up who may call the API
before anyone can reach it.

![Tokens for applications](/img/auth/token-flow.drawio.png)

## 1. Create the token service, in API Manager

Create an [Auth Gateway](/auth/auth-gateway) in the same environment as your API. Choose the
gateway and the HTTPS access point it is reached through, and the host name it answers on: that
address is the one tokens are issued in the name of.

## 2. Register the applications that will call the API

1. Open the API instance and copy its **audience ID**.
2. Create a [list of clients](/auth/client-lists) and add one client per application: a name, a
   secret, at least one permission, and the audience ID of the API.
3. Choose the list in the **Clients** setting of the auth gateway.

## 3. Decide who manages all this, in Access Manager

Who may *call* the API is decided by the tokens. Who may *manage* it is a separate matter:

- Create the [users](/access/create-user) who need access, or confirm they already exist.
- Grant them [project-scoped authorizations](/access/assign-roles-and-permissions) if they need to
  manage the API, its policies or its clients.
- If the organization requires it, review [MFA Policy](/access/mfa-policy) and
  [organization access settings](/access/configure-organization-access).

## 4. Protect the API, in API Manager

Add a **token verification (JWT)** rule to the API instance, issued by your auth gateway, with
**Check the audience** on. The concrete steps are in
[Protect an API with JWT](/auth/protect-api-with-jwt).

Other ways to protect an API — a sign-in page for people, API keys, user name and password — are
described in [Policies](/api-manager/policies).

## 5. Call the API from the application

The application asks the auth gateway for a token, then sends it with each request:

```bash
curl -u "<client-id>:<secret>" \
  https://auth.example.com/api/oidc/token \
  -d grant_type=client_credentials \
  -d scope="orders.read"

curl -H "Authorization: Bearer <token>" https://orders.example.com/orders
```

A request without a valid token never reaches your service.

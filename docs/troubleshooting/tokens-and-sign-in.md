---
title: Troubleshoot Tokens and Sign-In
sidebar_position: 5
---

### The token endpoint answers "not found"

- **Possible cause** — the [auth gateway](/auth/auth-gateway) has no client yet. Until a list
  with at least one client is attached, it issues no token.
- **Check** — the **Clients** setting of the auth gateway: is a list chosen, and does it hold a
  client?
- **Fix** — add a client to a [list](/auth/client-lists) and choose the list on the auth gateway.

### The application is refused a token

- **Possible cause** — the client ID or the secret is wrong, the client was removed, or the list
  was changed a moment ago.
- **Check** — the client still exists in its list; the secret is the one copied when it was made.
  A secret cannot be read back: if in doubt, generate a new one.
- **Fix** — give the application the right credentials. After a change in a list, wait a couple of
  minutes: the auth gateway picks it up without a restart.

### The API refuses a valid-looking token

- **Possible cause** — the token does not name this API, it has expired, or it was issued by
  another auth gateway than the one the policy trusts.
- **Check** — decode the token: `aud` lists the APIs it names, `iss` its issuer, `exp` when it
  expires. Compare `aud` with the audience ID shown on the API, and `iss` with the address of the
  auth gateway.
- **Fix** — add the audience ID of the API to **APIs its tokens are for** on the client, then
  obtain a new token: a token obtained before the change does not carry it. If the issuer
  differs, point the [JWT policy](/auth/protect-api-with-jwt) at the right auth gateway.

### A new list of clients does not show up on the auth gateway

- **Possible cause** — the list exists but was not made available to the environment of the auth
  gateway.
- **Check** — in the **Clients** setting, the list is offered apart, as not available in this
  environment.
- **Fix** — make it available from there, then choose it.

### People are not sent to the sign-in page

- **Possible cause** — the redirect URL of the [sign-in policy](/auth/configure-oidc) does not
  match the one registered with the identity provider, or the stored credentials are not the
  right ones.
- **Check** — compare the redirect URL character for character, scheme and path included.
- **Fix** — correct the policy or the registration at the provider, then deploy again.

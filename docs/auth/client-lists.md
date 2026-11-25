---
title: OAuth Client Reference
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A **client** is an application allowed to obtain tokens from an
[auth gateway](/auth/auth-gateway). Clients are kept in **lists of clients**: stored
configurations that one or several auth gateways read.

## Create a client list

{/* screenshot: client-list-create */}

A list is created **empty**, in one step, then filled in on its own page.

- From an auth gateway: in its **Clients** setting, **New list of clients**. Give it a name and
  create it; it is selected for you.
- From **Secret Manager**: create a configuration of the kind **Auth Gateway Clients**.

Then make the list available to the environment of the auth gateway, and choose it in the
**Clients** setting of that auth gateway.

## Register a client

{/* screenshot: client-list-add-client */}

Open the list in **Secret Manager** and choose **Add a client**. The clients of a list
are shown in a table you can search, filter and sort.

| Field | What it is |
|---|---|
| **Name** | For the people reading the list: the ID alone says nothing of what the client is. |
| **How it proves who it is** | A secret in the request header, a secret in the request body, or a key of its own — see below. |
| **Client ID** | What the application presents itself as. Given when the client is made, and never changed. |
| **Secret** or **Public keys** | The proof, according to the choice above. |
| **Permissions it may ask for** | The scopes, separated by spaces, such as `orders.read orders.write`. At least one. A token carries those the application asked for, among these. |
| **APIs its tokens are for** | Optional. The [audience ID](/api-manager/api-instances#audience-id-aud-claim) of each API the client calls, or its address. Add them one by one. |

### Client authentication methods

A client proves its identity when it asks for a token. The method is chosen per client; it decides what the application must keep secret.

| Choice | How it works | When to choose it |
|---|---|---|
| **A secret, in the request header** | The client sends its ID and secret as HTTP Basic credentials. | By default |
| **A secret, in the request body** | The ID and secret are sent as form fields. | For a client that cannot set a header |
| **A key of its own** | The client signs each request with its private key. Only its public key is kept. | When no secret should be shared at all |

**With a secret** — choose **Generate a secret**. The secret is shown **once**: copy it then. It
is kept as a fingerprint and cannot be read back; a new one replaces it, and the application must
be given the new one.

**With a key** — choose **Add a key**, then either have a pair generated and **Download the key
pair**, or give the public key you were sent. The downloaded file holds the private key and is
offered **once**: it is kept nowhere else. A client can have several keys, which lets you replace
one without interruption.

### Token audiences

Every token a client obtains names **all** the APIs listed here. An API whose
[JWT policy](/auth/protect-api-with-jwt) checks the audience refuses a token that does not name
it.

| The client lists | Its tokens | An API that checks the audience |
|---|---|---|
| The audience ID of the API | Name that API | Accepts them |
| Several audience IDs | Name them all | Each of those APIs accepts them |
| Nothing | Name no API | Refuses them |

Leaving the field empty is allowed: it suits APIs that do not check the audience.

## Token request (client credentials grant)

The application asks the **token endpoint** of the auth gateway, shown on the page of the auth
gateway.

The request depends on how the client proves who it is:

<Tabs groupId="client-proof">
<TabItem value="header" label="Secret in the header" default>

```bash
# highlight-next-line
curl -u "<client-id>:<secret>" \
  https://auth.example.com/api/oidc/token \
  -d grant_type=client_credentials \
  -d scope="orders.read"
```

</TabItem>
<TabItem value="body" label="Secret in the body">

```bash {3-4}
curl https://auth.example.com/api/oidc/token \
  -d grant_type=client_credentials \
  -d client_id="<client-id>" \
  -d client_secret="<secret>" \
  -d scope="orders.read"
```

</TabItem>
</Tabs>

The answer holds the token and how long it is valid:

```json title="Answer"
{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

The application then sends the token with each call to the API:

```bash
curl -H "Authorization: Bearer eyJhbGciOi..." https://orders.example.com/orders
```

A client that proves itself with a key signs a short assertion with its private key and sends it
in place of the secret, as the `private_key_jwt` method of OpenID Connect describes. Most OAuth
libraries do it for you when given the key file.

## Edit, rotate or delete a client

- **Edit** a client to change its name, permissions or APIs. Its ID never changes.
- **Generate a new secret** or key to replace a lost or leaked one. The old one stops working.
- **Remove** a client to refuse it new tokens. The tokens it already holds stay valid until they
  expire.

Changes are picked up by the auth gateways that read the list within a couple of minutes.

## Multiple client lists

An auth gateway can read several lists: use one per team, per partner or per application family.
A client belongs to one list only.

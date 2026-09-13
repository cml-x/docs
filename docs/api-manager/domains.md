---
title: Domains
sidebar_position: 4
---

Attach a custom **Domain** to a project to serve your APIs from your own hostname instead of a
generated one.

## What happens when you add a domain

- A **DNS hosted zone** is attached to the project.
- **TLS certificates are issued automatically** (Let's Encrypt, via a Route53 cluster issuer) — no
  manual certificate management.

Once a domain is attached, use it as the hostname when publishing an [API Instance](/api-manager/api-instances).

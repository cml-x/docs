---
title: Sign-In and Identity Model
sidebar_position: 2.8
---

Before any role is checked, the platform must know **who** is asking: a person who signed in,
or a program that presented a credential. This page explains the choices behind sign-in and
machine identities. What each identity may then do is the subject of the
[RBAC model](/access/rbac-principles).

## Why federate sign-in

Without an identity provider, every user has one more password, and leaving the company does not
remove access to the console until someone remembers to. With one, people sign in with their
company account: its password policy, its second factor and its offboarding apply here too.

The console still decides **what** each person may do, through roles. The provider only answers
**who** they are.

![A person signs in through the identity provider or with a local account; the MFA policy adds a second factor; the session says who they are, and roles decide what they may do](/img/access/sign-in-path.drawio.png)

## Why require a second factor

A password can be guessed, reused from another site, or typed into a fake sign-in page. A second
factor means that the password alone is no longer enough. For the console — from which
production can be deployed, exposed and deleted — it is the single most effective protection.

## Why programs get their own identity

A pipeline or a script that uses a person's credentials stops working when that person leaves,
acts with all of their rights, and makes the audit trail say a human did what a robot did. A
service account fixes the three: it belongs to no one, has only the roles you grant it, and
appears under its own name.

:::tip[One account per program]
When a credential leaks, you revoke one account and one program is affected. A shared account
turns every leak into an outage for everything that used it.
:::

## Choosing a service account credential

The right credential depends on what the calling program can do and on how much you want to limit a leak.

| Situation | Credential |
|---|---|
| A script, a quick automation | Personal access token with a short expiration |
| A service that can run an OAuth flow | Client ID and secret |
| No shared secret may be stored on the platform side | JWT key: only the public key is kept |

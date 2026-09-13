---
title: Use an Apache Camel Component
sidebar_position: 7
---

Camel routes are built from **components** — connectors to protocols and systems (HTTP, files,
message queues, databases, and hundreds more from the Apache Camel ecosystem).

## Where components are used

Component selection and configuration happens in **IT Designer**, the visual canvas that opens
when you create or edit an Integration project in [Project Manager](/projects/getting-start).
Project Manager itself hosts the Git repository; it doesn't expose a component picker on its own.

The exact palette of available components, and whether custom/third-party components can be
added, is **[À CONFIRMER]** — verify directly in IT Designer for your environment.

## Components at the Capsule level

Separately, when a route is deployed as part of a [Capsule](/runtime/capsule) in
[Runtime Manager](/runtime/getting-start), you choose from a different, Capsule-level list of
component types — Camel Integration, Camel Pipe, API Gateway, Load Balancer, security/traffic
policies, Job/Cron Task, and Persistent Volume. Kamelet and Web Service are notably **not** in
that picker — see [Capsules](/runtime/capsule) for the confirmed list and why.

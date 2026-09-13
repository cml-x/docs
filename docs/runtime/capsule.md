---
title: Capsules
sidebar_position: 2
---

A **Capsule** is the top-level unit you create, deploy and monitor in Runtime Manager — a group of
Apache Camel integration components bound to one project and one environment.

## Components

A Capsule can contain any mix of the component types the "Add component" picker offers:

- **Camel Integration** and **Apache Camel Integration** — the core Camel flow logic (two distinct
  types exposed by the platform).
- **Camel Pipe** — a declarative connector building block.
- **API Gateway** and **Load Balancer** — network entry points for the Capsule.
- **Security Policy**, **Backend Traffic**, **Client Traffic** and **Custom Policy** — rules
  attached to the Capsule's exposed components.
- **Job / Task** and **Cron Task** — batch and scheduled workload types.
- **Persistent Volume** — see [Storage](/runtime/storages).

**Kamelet** and **Web Service** are not offered in this picker — a Kamelet is created as its own
project in [Project Manager](/projects/getting-start) instead, and a Web Service's underlying
Deployment/Service is generated automatically for a component that needs to be network-reachable
(e.g. an exposed Camel Integration), rather than added directly.

## Operating a Capsule

- **Real-time status** — deployment/workflow status for the whole Capsule, and health (running,
  succeeded, failed) per component.
- **Revision history** — every deployment is kept as a revision (version, deploy user, date,
  status), with one-click **rollback** to a previous revision.
- **Gallery and list views**, with search and an environment filter to scope what you see to a
  single environment.

## Where Capsules come from

Capsules are usually created from a project's repository — see the **Applications tab** on
[Integrations](/projects/repos) in Project Manager for the one-click "Deploy" path from source to
running Capsule.

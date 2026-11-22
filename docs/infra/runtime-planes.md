---
title: Runtime Planes and BYOC
sidebar_position: 1.5
---

A **runtime plane** is a Kubernetes cluster on which the platform runs workloads. The control
plane deploys to runtime planes and observes them; the traffic of your integrations and APIs
stays on the runtime plane and never crosses the control plane.

## Two kinds of runtime plane

| | Managed runtime plane | Your cluster (BYOC) |
|---|---|---|
| Operated by | The platform | You |
| Runs in | Regions offered by the platform | Your public cloud account, private cloud or data center |
| Kubernetes upgrades, nodes, capacity | Platform | You |
| Data location and network perimeter | The region of the plane | Yours |
| Targets, environments, deployments | Identical | Identical |

Once a cluster is a runtime plane, its provider, its distribution and its location no longer
matter to what you deploy: the console shows them for information.

## Attributes of a runtime plane

{/* screenshot: infra-runtime-plane-card */}

| Attribute | Content |
|---|---|
| Name, description | Identification |
| **Provider** | The cloud or infrastructure provider |
| **Region** | The physical location |
| Status | **Healthy** or not, with the reason |
| **API Server** | The address of its Kubernetes API |
| **Dashboard** | A link to its dashboard, when it has one |
| Labels | Free key-value pairs; `region` is read from them |

A target can only be created on a **healthy** runtime plane.

## Choosing where a workload runs

| Constraint | Choice |
|---|---|
| Latency to users or to the systems called | A runtime plane in the closest region |
| Data residency, sector regulation | A runtime plane in the required jurisdiction, or BYOC |
| Systems reachable only from a private network | BYOC inside that network, or a managed plane with a [private link](/infra/private-links) |
| Existing cloud commitment, own cost control | BYOC in your account |
| Nothing to operate | Managed runtime plane |

## Bring Your Own Cluster (BYOC)

### What connecting a cluster does

A cluster is connected with a name and its **kubeconfig**. The platform registers it as a runtime
plane, checks its health, and from then on deploys into the namespaces of the targets you create
on it. Nothing is installed in a namespace until an environment bound to it activates a service.

### Requirements

- A Kubernetes API reachable from the control plane.
- A kubeconfig whose identity may create namespaces and the resources of the environment
  services.
- Outbound access from the cluster to the container registry and the Maven repositories the
  [Camel Integration Service](/infra/camel-integration-service) is configured with.
- For gateways exposed in **Public** or **Private** mode, a load balancer implementation on the
  cluster.
- A default storage class, for [persistent volumes](/runtime/storages) and persistent log
  buffers.

### What stays under your control

- The kubeconfig can be scoped and rotated; removing the cluster from the platform stops every
  deployment to it.
- Nodes, upgrades, capacity, backups and network policy of the cluster outside the namespaces of
  the targets.

### Removing a runtime plane

**Delete cluster** disconnects it. Delete its environments and targets first: workloads already
running on the cluster are not removed by the disconnection.

## Related pages

- [Targets](/infra/targets)
- [Environments](/infra/environments)
- [Private Links](/infra/private-links)

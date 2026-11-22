---
title: Environments and Clusters
sidebar_position: 3
---

### Cluster not selectable when creating a target

Only a **healthy** [runtime plane](/infra/runtime-planes) can host a target. The cluster card
gives the reason of its state. For a cluster of yours, check that its Kubernetes API is reachable
from the control plane and that the kubeconfig is still valid.

### Target refused: already used by an environment

A target backs one environment by default. Create another target, or create the environment with
**Allow target conflict** — see [Target binding](/infra/environments#target-binding).

### Service stays "not configured" or in warning

A service of the environment does not reach the healthy state.

| Cause | Check | Fix |
|---|---|---|
| Changes saved but not applied | The service shows pending changes | **Apply** |
| A referenced configuration is not available in the environment | The secret selectors of the service | **Make available** on the configuration |
| The deployment did not settle | The state shown while it is followed | Open the service, read its status |

### Camel Integration Service: builds fail for every integration

The cause is in the environment, not in the integrations: the Registry or Maven setting of the
[Camel Integration Service](/infra/camel-integration-service). Check the registry address, the
pull secret and the CA secret, then **Apply**.

### Logs do not reach a destination

Logs are visible in Monitoring but do not arrive in your own system.

| Cause | Check | Fix |
|---|---|---|
| No flow sends to that destination | The flows of the [Log Exporter](/infra/log-exporter) | Add the destination to a flow |
| Credentials or TLS of the destination | Authentication and TLS options | Correct the stored configuration |
| The selector of the flow excludes the application | Its labels | Widen the selector |

### Workloads cannot reach an external system

[Network policies](/infra/network) deny what is not allowed. Add an egress rule for the address
and port, and keep the DNS preset. For a private network, see
[Private Links](/infra/private-links).

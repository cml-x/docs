---
title: Telemetry
sidebar_position: 7
---

### Views are empty

Every view shows nothing at all: the scope or the period is wrong more often than the data is missing.

| Cause | Check | Fix |
|---|---|---|
| No environment selected, or another one | The environment selector of the console | Select the environment the workload runs in |
| A shared link carries another scope | `org_identifier` and `stream` in the address | Open the view from the menu |
| Period too narrow | The time range | Widen it |

### One chart stays empty

The stream of its metric does not exist yet. `camel_route_policy_*` appears after the first
exchange, `jvm_gc_pause_*` after the first collection.

### No metric for one integration

Other integrations report metrics; this one does not.

| Cause | Check | Fix |
|---|---|---|
| Wrong label value | `service_name` is the name of the integration, `service_namespace` the alias of the environment | Correct the selector |
| The integration cannot reach the collector | OTLP export errors in its logs | Egress of the [network policies](/infra/network) |

### Logs present but not split into fields

The line is not JSON. Output written with `System.out`, or by a library with its own format, is
not parsed. Log through the Camel `log` step or a logger — see [Logs Insight](/monitoring/logs).

### A trace stops at the gateway or at one integration

The trace context is not propagated by the next hop: a non-instrumented system, or a call made
with a client that does not forward the `traceparent` header.

### Alert never fires

Run the query of the rule in **Metrics** over the period: an empty result means a selector that
matches nothing. Then check that the rule has a destination.

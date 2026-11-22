---
title: Metrics
sidebar_position: 4
---

**Metrics** queries the metric streams of the environment with PromQL. Every series carries
`service_name` — the integration or the gateway — and `service_namespace` — the environment.

## Camel metrics

| Metric | Type | Useful labels |
|---|---|---|
| `camel_routes_running` | Gauge | `camelcontext` |
| `camel_exchanges_total` | Counter | `routeid` |
| `camel_exchanges_inflight` | Gauge | `routeid` |
| `camel_route_policy_sum`, `camel_route_policy_count` | Timer: seconds and count | `routeid` |

```promql title="Exchange rate per route"
sum(rate(camel_exchanges_total{service_name="orders-api"}[5m])) by (routeid)
```

```promql title="Mean processing time per route, in milliseconds"
(sum(rate(camel_route_policy_sum{service_name="orders-api"}[5m])) by (routeid)
 / sum(rate(camel_route_policy_count{service_name="orders-api"}[5m])) by (routeid)) * 1000
```

## JVM and process metrics

| Metric | Type | Useful labels |
|---|---|---|
| `jvm_memory_used` | Gauge, bytes | `area` (`heap`, `nonheap`), `id` |
| `jvm_threads_live` | Gauge | — |
| `jvm_gc_pause_sum`, `jvm_gc_pause_count` | Timer | `gc` |
| `process_cpu_usage` | Gauge, 0 to 1 | — |

```promql title="Mean GC pause, in milliseconds"
(sum(rate(jvm_gc_pause_sum{service_name="orders-api"}[5m])) by (gc)
 / sum(rate(jvm_gc_pause_count{service_name="orders-api"}[5m])) by (gc)) * 1000
```

## Gateway metrics (Envoy)

| Metric | Meaning | Useful labels |
|---|---|---|
| `http_downstream_rq_total` | Requests received | `envoy_http_conn_manager_prefix` |
| `listener_http_downstream_rq_xx` | Responses by code class | `envoy_response_code_class` |
| `http_downstream_rq_time_sum`, `http_downstream_rq_time_count` | Request duration | `envoy_http_conn_manager_prefix` |
| `http_downstream_cx_active` | Active HTTP connections | `envoy_http_conn_manager_prefix` |
| `listener_downstream_cx_active`, `listener_downstream_cx_total` | Connections per listener | `envoy_listener_address` |
| `cluster_upstream_cx_active` | Connections to backends | `envoy_cluster_name` |
| `listener_ssl_handshake` | TLS handshakes | `envoy_listener_address` |

```promql title="Share of 5xx responses"
sum(rate(listener_http_downstream_rq_xx{envoy_response_code_class="5"}[5m]))
 / sum(rate(listener_http_downstream_rq_xx[5m]))
```

## An empty chart

A chart stays empty when the stream of its first metric does not exist yet: the integration has
not emitted that meter. `camel_route_policy_*` appears after the first exchange,
`jvm_gc_pause_*` after the first collection.

## Related pages

- [Query metrics](/monitoring/tasks/read-metrics)
- [Create an alert rule](/monitoring/tasks/create-an-alert)

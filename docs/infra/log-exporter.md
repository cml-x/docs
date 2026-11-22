---
title: Log Exporter
sidebar_position: 6
---

The **Log Exporter** collects the logs of everything that runs in an
[environment](/infra/environments) and sends them where you want them: your own Elasticsearch,
Splunk, Datadog, a Kafka topic, or any HTTP endpoint.

It works with three things:

| | What it is |
|---|---|
| **The exporter** | What collects the logs of the environment |
| **Destinations** | Where logs are sent |
| **Flows** | Which logs go to which destinations |

## Why export logs

The logs of an environment are already searchable in Monitoring. Export them when they must
**also** be somewhere else: the SIEM of your security team, the log platform your on-call
engineers already use, an archive with its own retention.

Exporting does not move logs out of Monitoring. A flow copies the logs it selects to the
destinations it names; what no flow selects stays where it was.

:::info[Three objects, in this order]
Configure the **exporter**, then create a **destination**, then a **flow** that sends logs to
it. A destination that no flow references receives nothing.
:::

## Exporter configuration

Open the environment, go to **Logging**, and configure the service.

| Field | What it is | Default |
|---|---|---|
| **Buffer Storage** | Where logs wait before being sent. **Persistent** survives restarts; **Temporary** is faster, but what was waiting is lost on restart. | Temporary |
| **Buffer Disk Size** | With persistent storage, the space reserved for waiting logs. Size it to hold a few minutes of logs at the busiest time. | 10Gi |
| **Parse JSON Logs** | Read logs written as JSON into separate fields, which makes them easier to search. | On |
| **Keep Original Message** | Also keep the message as it was written, beside the fields. Useful when working out a parsing problem. | Off |

Then click **Apply** on the environment.

## Destinations

{/* screenshot: env-log-destinations */}

A destination is a place logs are sent to. Create as many as you need.

| Destination | What you give |
|---|---|
| **Datadog** | Your API key and the intake host — `http-intake.logs.datadoghq.eu` for the EU region |
| **Elasticsearch** | Host, port (9200) and protocol |
| **OpenSearch** | Host, port (9200) and protocol |
| **Grafana Loki** | The address of your Loki instance |
| **Splunk** | Host and port (8088) of the HTTP Event Collector, and its token |
| **Kafka** | The brokers, the topic and the message format |
| **OpenObserve** | The ingest address of your instance |
| **HTTP endpoint** | Any address that receives logs over HTTP |

Every destination also has a **Flush Interval** — how often waiting logs are sent, 2 minutes by
default. A lower value shows logs sooner and makes more calls.

The environment also has a **default destination**: the log store of the platform itself, with
nothing to configure.

### Destination options

Once created, a destination can be given options. Which ones depends on the destination.

| Option | What it sets | For |
|---|---|---|
| **Authentication** | The credentials, from a stored configuration | Elasticsearch, OpenSearch, Loki, HTTP, Kafka |
| **TLS** | Encryption of the connection and how certificates are verified | Elasticsearch, OpenSearch, Loki, HTTP, Kafka, Splunk |
| **Buffer** | How logs are grouped before being sent | Datadog, Elasticsearch, OpenSearch, Loki, HTTP, Kafka, Splunk |
| **Index** | The index logs are written to, and its naming by date | Elasticsearch, OpenSearch |
| **AWS** | Request signing for Amazon OpenSearch Service, in place of authentication | OpenSearch |
| **Labels** | The labels attached to log streams | Loki |
| **Tagging** | Service, source and custom tags | Datadog |
| **Routing** | Index, source and source type of events | Splunk |
| **Headers** | Headers sent with each request | HTTP |
| **Settings** | Transport, compression or delivery options | Datadog, HTTP, Kafka |

Credentials are stored configurations — see the
[templates for log destinations](/config-sources/templates#for-log-destinations).

:::warning[Credentials of a destination are stored configurations]
An API key or a password is never typed into the destination itself: it is chosen among the
configurations of Secret Manager, which must be made available to the environment.
:::

## Flows

{/* screenshot: env-log-flows */}

A flow says which logs go where.

| Field | What it is |
|---|---|
| **Application Selector** | The applications whose logs are collected, chosen by their labels. Leave it empty to collect the logs of every application. |
| **Output References** | The destinations the logs are sent to. At least one. |

A flow can also change the logs on their way:

| Option | What it does |
|---|---|
| **Parser** | Reads fields out of the message: JSON, Nginx, Apache, Syslog, or a pattern of your own. |
| **Filter** | Keeps only the entries where a field matches a pattern, or drops those that match. |
| **Enrich** | Adds fields to every entry — `environment=production` for example — or removes some. |

## Resources

Two settings give the exporter more or less to run on.

| Setting | What it is | Defaults |
|---|---|---|
| **Aggregator** | What gathers the logs and sends them to the destinations. | 100m / 128Mi requested, 500m / 512Mi at most |
| **Collector** | What reads the logs on each node. | 50m / 64Mi requested, 200m / 128Mi at most |

Raise the aggregator's when logs are delayed at busy times.

## Behavior and limits

- Logs go to a destination only if a flow sends them there.
- With **temporary** buffer storage, logs waiting to be sent when the exporter restarts are lost.
  Choose **persistent** when no log may be missed.

---
title: Repository Template Model
sidebar_position: 6
---

A **template** is a repository that new repositories can be generated from. Use templates to
give every new integration the same starting point: a working route, the house conventions for
property names and logging, a README.

The platform publishes its own templates in the Camel X catalog — Camel eXchanges — each a
complete integration with its error handling: the list is in the
[Camel X template reference](/projects/template-catalog). This page explains how templates
behave, and the design rules those templates follow, so that the templates of your organization
can follow them too.

## How a template works

Creating a repository from a template **copies** the content of the template into the new
repository. From then on the two are unrelated: the new repository has its own history, and
later changes to the template do not reach it.

This is the right behavior for a starting point — your project is not rewritten behind your back
— and it has one consequence to keep in mind: improving a template only helps repositories
created afterwards.

## Create a repository from a template

In the creation wizard, choose **Create routes from template**. The **Template Selection** step
offers a search field and a source filter; selecting a template shows **What's included**, the
list of what it brings. Then name the repository as usual. The steps are in
[Create from a template](/projects/tasks/create-from-a-template).

## Turn a repository into a template

On the page of the repository, open **Actions** and choose **Set as template**. The repository
then appears in the template selection of the wizard, and in
[Assets Explorer](/library/templates) under **Templates**.

:::info[Setting as template changes nothing in the repository]
Its content, its releases and the integrations built from it are untouched. The repository is
only offered as a starting point in addition.
:::

## How a template reaches the template selection

The template selection searches an index, not Git. When a template repository is created, the
platform receives the event, reads the repository — description, topics, the title of its
manifest — and indexes it,
in the index of its organization; the Camel X templates are in the `camelx-io` index, shown with
the **Camel X** source.

Topics added after the creation of the repository reach the index at its next update: a
template whose topics were set a minute after it was created is found by its description at
first, and by its topics once it is indexed again.

## What makes a template usable

A template is read by someone who did not write it. Three things decide whether they can use it:

- **It runs as it is.** Every address, credential and tuning value is read from a property
  placeholder — `{{orders.partner.url}}` — never written in the route.
- **It says what it expects.** A README lists the properties to set and the stored
  configurations to create.
- **It can be found.** Topics name the systems, the protocols and the pattern: `sftp`, `kafka`,
  `content-based-router`. The search matches topics.
- **It has a name a reader understands.** A repository name is short and lower case; the
  catalog shows the `title` of the manifest `.camel.json` in its place — *Won CRM Deal to ERP
  Invoice* rather than `deal-won-to-erp`:

  ```json title=".camel.json"
  {
    "name": "deal-won-to-erp",
    "title": "Won CRM Deal to ERP Invoice",
    "category": "CRM",
    "type": "Route"
  }
  ```

  A title of more than 80 characters is ignored.
- **It sits with its family.** The template selection groups templates by the `category` of the
  manifest — *CRM*, *XML and JSONata*, *Data warehouse*. A template without one is shown with
  the other templates of its source, under *Custom templates* for a business unit's own. Use the
  categories of the [Camel X Template Reference](/projects/template-catalog) when one fits; a
  category of more than 40 characters is ignored.

  Like the topics, the title and the category are read when the template is indexed: set them
  before the repository is marked as a template, or have it indexed again.

## One file per route

A Camel project loads every file that matches
`camel.main.routes-include-pattern = classpath:routes/*.camel.yaml`, so a project does not need
to hold its routes in one file. The Camel X templates keep one top-level element per file:

| File | Holds |
|---|---|
| `<api-id>.camel.yaml` | the REST contract, or a reference to an OpenAPI file |
| `route-<id>.camel.yaml` | one route |
| `configuration-<id>.camel.yaml` | one route configuration: the error handling shared by the routes that name it |
| `beans.camel.yaml` | beans declared in YAML, such as an idempotent repository |

Someone who adapts a template then changes one route without reading the others, and a review
shows which part of the flow changed. The files share one namespace: a node `id` used in two
files makes the application fail at start.

## Error handling, decided per failure

The Camel X templates do not have one error handler for everything. Each answer of an external
system is turned into one of two exceptions, and the route configuration decides what each
means:

| The system answers | Exception | What happens |
|---|---|---|
| 429, 5xx, timeout, connection refused | `IllegalStateException`, `IOException` | retried with an exponential back-off, then dead-lettered, parked or answered 503 |
| any other 4xx | `IllegalArgumentException` | not retried: sending the same request again would get the same refusal |

Choosing the exception is choosing the policy. An HTTP call made with
`throwExceptionOnFailure: false`, followed by a `choice` on `CamelHttpResponseCode`, is what lets
the route make that choice instead of the HTTP component.

### Retries apply to a whole call

Camel redelivers the processor that failed, not the steps before it. A call that needs a header,
a body and a token prepared first is therefore put in a `direct:` route of its own, which the
caller retries as one step. That sub-route must not handle its errors: with the default error
handler, it would mark the exchange as handled and the caller's retries would never run. Its
route configuration says so:

```yaml title="routes/configuration-failures-go-to-the-caller.camel.yaml"
- routeConfiguration:
    id: failures-go-to-the-caller
    errorHandler:
      noErrorHandler: {}
```

For the same reason, a call that should be retried stays out of `doTry`: inside a `doTry`, the
route error handler is turned off. The templates keep `doTry` for what is answered at once,
such as a schema validation answered 400.

### Never dead-letter where the source moves on

A dead letter channel is safe when the failed message can be found again. It is not when the
source forgets the message once the route returns: Debezium moves its position in the
write-ahead log, a webhook caller is told that the event was taken. In those templates, a
failure of Kafka blocks or is reported to the caller instead:

- `cdc-postgres-to-kafka` retries the publication without end, so that capture waits for
  Kafka; a change sent to an error topic on the same unreachable broker would be skipped.
- `crm-webhook-to-kafka` answers 503 with `Retry-After`, and removes the event from the events
  already received, so that the caller's next attempt is published rather than taken for a
  duplicate.

### Steps that can run again

A retry or a replay runs the steps again. The templates make each step harmless the second time
rather than remembering which steps already ran: a customer is looked up before it is created,
an invoice carries the deal as its `Idempotency-Key`, a contact is written with `PUT` by its
external id, an order and its event are written by one SQL statement. In `deal-won-to-erp`, a
deal retried four times reached the ERP four times with the same key, and one invoice was
created.

## Testing before publication

Each Camel X template was run before it was published, against a Kafka-compatible broker,
PostgreSQL, an S3 store and simulated HTTP and SOAP services, on its nominal path and on each
failure its documentation lists. The three rules above on error handling come from failures seen
there: retries that never ran because a sub-route handled the error, calls without retry inside
a `doTry`, a change lost while Kafka was down.

The other symptoms met — a Kafka record without a key, an S3 object cut short, an e-mail address
refused by the schema, an expression failing at start — are in
[Troubleshoot Camel YAML Routes and Components](/projects/troubleshoot-camel-routes), with their
fix. Each template's wiki adds what it was tested against and how to run it locally.

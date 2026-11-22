---
title: 3. Configure It
sidebar_position: 4
---

So far everything is written in the route. A real integration takes its values from outside, so
that the same route runs in development and in production with different settings.

An integration is configured through **settings** that you add to it one by one. This step adds
four.

| You want to give the integration | Setting | Stored in |
|---|---|---|
| Values, such as a timeout or an address | **Configuration** | A *Properties* configuration |
| Sensitive values, such as a password | **Configuration** | A *Secure Properties* configuration |
| One or two values that differ by environment | **Environment** | The setting itself |
| A file | **Resources** | A *Resources File* configuration |
| More CPU, memory or instances | **Compute** | The setting itself |

## Properties

### Store them

In **Secret Manager**, create a configuration of the kind **Properties Configuration**, named
`orders-settings`:

```properties title="orders-settings — a Properties Configuration"
orders.greeting=Hello from orders
orders.page-size=20
```

Make it available to the environment the integration runs in.

### Give them to the integration

{/* screenshot: tutorial-configuration-setting */}

On `orders-api`, add the setting **Configuration** and choose `orders-settings` in **Property
files**. You can also create the configuration from this field with **New secret**.

### Use them in the route

A property is read between double braces:

```yaml title="orders.camel.yaml"
        - setBody:
            # highlight-next-line
            simple: '{"greeting":"{{orders.greeting}}","pageSize":{{orders.page-size}}}'
```

**Hot Reload** makes the integration reload when the configuration changes, without being
deployed again.

For passwords and other sensitive values, use a **Secure Properties Configuration** in the same
way: its content is hidden in the console.

## Environment variables

{/* screenshot: tutorial-environment-setting */}

Add the setting **Environment**. In **Environment Variables**, each line is one variable:

| Written | Gives the variable |
|---|---|
| `ORDERS_REGION=eu-west` | The value as written |
| `DB_PASSWORD=secret:orders-db/password` | One value of a stored configuration |

In the route, a variable is read with `env:`:

```yaml title="orders.camel.yaml"
        - setBody:
            # highlight-next-line
            simple: '{"region":"${env:ORDERS_REGION}"}'
```

Two switches are on by default: the integration is told its own namespace and instance name, and
the proxy settings of the environment are passed on to it.

:::tip Properties or variables?
Use **properties** for the configuration of the application: they are grouped, named and stored
once. Use **variables** for the few values a library expects as variables, or that you set by
hand for one environment.
:::

## A file

### Store it

In **Secret Manager**, create a configuration of the kind **Resources File**, named
`orders-catalog`, and drop a file `catalog.json` in it:

```json title="catalog.json — in orders-catalog, a Resources File"
{"items":["keyboard","mouse","screen"]}
```

### Mount it

{/* screenshot: tutorial-resources-setting */}

On `orders-api`, add the setting **Resources**. In **Files**, choose `orders-catalog`, then set
the place it is mounted at — `/etc/orders` for example. The file is then at
`/etc/orders/catalog.json`.

### Read it in the route

```yaml title="orders.camel.yaml"
        - setBody:
            # highlight-next-line
            simple: 'resource:file:/etc/orders/catalog.json'
```

A configuration can hold several files: they are all mounted in the same place.

## The route so far

With the first two settings in place, the route reads its greeting from the property file and its
region from a variable. The highlighted line is the one that changed since
[step 1](/tutorial/first-integration).

```yaml title="orders.camel.yaml" showLineNumbers
- route:
    id: orders
    from:
      uri: platform-http:/orders
      parameters:
        httpMethodRestrict: GET
      steps:
        - setHeader:
            name: Content-Type
            constant: application/json
        - setBody:
            # highlight-next-line
            simple: '{"greeting":"{{orders.greeting}}","region":"${env:ORDERS_REGION}"}'
```

```json title="Answer"
{"greeting":"Hello from orders","region":"eu-west"}
```

| The route reads | It comes from | Set in |
|---|---|---|
| `{{orders.greeting}}` | `orders-settings` | The **Configuration** setting |
| `${env:ORDERS_REGION}` | `ORDERS_REGION=eu-west` | The **Environment** setting |
| `/etc/orders/catalog.json` | `orders-catalog` | The **Resources** setting |

## CPU, memory and instances

Add the setting **Compute**.

| Field | Default | When to change it |
|---|---|---|
| **Replicas** | 1 | Two or more so that the integration keeps answering while one instance restarts |
| **CPU Request**, **Memory Request** | 125m, 128Mi | What the integration is guaranteed |
| **CPU Limit**, **Memory Limit** | 500m, 512Mi | The most it may use. Raise the memory when the integration is stopped for using too much |

## Deploy the changes

Choose **Apply changes**. None of these settings rebuilds the image: the integration restarts
with its new configuration.

## A different value per environment

Everything above applies to every environment the integration is bound to. To give **one**
environment a different value — more memory in production, another property file — select that
environment on the integration and set the value there: it overrides the common one for that
environment only.

## Other settings

| Setting | What it does |
|---|---|
| **Camel Runtime** | Runtime properties added to the application |
| **Build** | Build-time properties, and the CPU and memory of the build |
| **JVM** | JVM flags, debugging, trusted certificate authorities — [next step](/tutorial/trust) |
| **Health Probes** | When the integration is considered alive and ready |
| **Volumes** | Storage that survives restarts, and temporary directories |
| **Cron Schedule** | Run the integration on a schedule instead of continuously |
| **Disruption Budget** | How many instances must stay up during maintenance |

Several settings can mount files into the same integration: what each one mounts is added to what
the others mount.

Next: [trust a private authority](/tutorial/trust).

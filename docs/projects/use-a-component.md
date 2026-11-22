---
title: Camel Dependencies
sidebar_position: 7
---

A route uses Camel components through its endpoint URIs. The platform resolves the matching
dependencies when it builds the integration.

## Automatic resolution

Components that appear in an endpoint URI are detected and added to the build:

```yaml
- route:
    from:
      uri: kafka:orders-in          # adds camel-kafka
      steps:
        - to: https://partner.example.com/orders   # adds camel-http
```

## Explicit dependencies

What does not appear in a URI must be declared in **Dependencies** on the integration: data
formats, languages, beans from a library.

| Notation | Meaning | Example |
|---|---|---|
| `camel:<name>` | A Camel component, data format or language | `camel:jackson` |
| `mvn:<group>:<artifact>:<version>` | Any Maven artifact | `mvn:org.postgresql:postgresql:42.7.3` |

Three dependencies are always present and cannot be removed — they carry the telemetry:

```text
camel:opentelemetry2
camel:micrometer
mvn:io.quarkus:quarkus-micrometer-opentelemetry
```

## Additional Maven repositories

**Repositories** on the integration takes the URLs of extra Maven repositories. Repositories
shared by every integration of an environment, mirrors and credentials are set once in the Maven
settings of the [Camel Integration Service](/infra/camel-integration-service).

## Kamelets

A Kamelet is used as a component with the `kamelet:` scheme. It must exist in the environment
the integration runs in: apply it from its repository page.

```yaml
- to: kamelet:log-sink
```

## Related pages

- [Dependency notation and build phases](/runtime/how-integrations-run)
- [Build configuration](/runtime/settings/build)

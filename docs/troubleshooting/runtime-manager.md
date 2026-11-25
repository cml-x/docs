---
title: Troubleshoot Builds and Deployments
sidebar_position: 2
---

### Build fails: dependency not resolved

Maven cannot download an artifact. The build log names it.

| Cause | Check | Fix |
|---|---|---|
| The artifact is not in any configured repository | The build log names the missing coordinates | Add the repository in **Repositories** on the integration, or in the Maven settings of the [Camel Integration Service](/infra/camel-integration-service) |
| Wrong notation | `camel:<name>` or `mvn:group:artifact:version` | Correct the entry in **Dependencies** |
| The repository needs credentials or a private CA | `401` or a TLS error in the build log | Maven Settings configuration; CA secret of the Maven setting |

### Build fails: image push refused

The image was built but the registry of the environment refused it.

| Cause | Check | Fix |
|---|---|---|
| Registry credentials missing or expired | `unauthorized` in the build log | Pull secret of the Registry setting of the environment |
| Registry signed by a private CA | `x509` in the build log | CA secret of the Registry setting |

### Build fails: source does not compile or parse

The build log gives the file and the line. For YAML DSL, check indentation and that `steps` is
under `from`.

### Integration running but never ready

The process started, but its routes did not: the readiness check keeps failing.

| Cause | Check | Fix |
|---|---|---|
| Missing property | `Property with key [...] not found` in the logs | [Property files](/runtime/settings/configuration) setting, or a default: `{{key:default}}` |
| A mounted file is absent | `FileNotFoundException` in the logs | [Mounted files](/runtime/settings/resources) setting; make the configuration available to the environment |
| A system called at startup is unreachable | Connection errors in the logs | [Network policies](/infra/network) of the environment; the address |
| Probe too strict for the startup time | Restarts before the routes are up | [Health probes](/runtime/settings/health-probes) |

### Restart loop

The integration starts, stops and starts again.

| Cause | Check | Fix |
|---|---|---|
| Container killed on its memory limit | Last state of the instance: out of memory | Raise the memory limit, or lower `-Xmx` — see [Scaling](/tutorial/scale) |
| Exception at startup | First stack trace in the logs | Depends on the exception |
| Truststore build fails | Logs of the `build-truststore` init step | The PEM file holds no certificate, or is not PEM — see [JVM truststore](/runtime/trust-private-certificates) |

### `PKIX path building failed` on an outgoing call

The server is signed by an authority the JVM does not trust. Add the CA in the **JVM** setting,
**Trusted CA Certificates** — see [JVM truststore](/runtime/trust-private-certificates).

### Outgoing call times out

A route calls a system and gets no answer at all, rather than an error.

| Cause | Check | Fix |
|---|---|---|
| Egress blocked | No egress rule for the destination and port | [Network policies](/infra/network), egress rule; DNS preset |
| Destination only reachable on a private network | The address is private | [Private link](/infra/private-links) |

### Change applied but nothing changed

A setting restarts the integration; a source or dependency change rebuilds it. Check that
**Apply changes** was used on the environment you are looking at, and that a new revision
exists.

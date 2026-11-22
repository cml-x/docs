# Screen captures to add

The documentation is written before the screens could be captured. Every place that needs a
capture carries a marker in its page. This file lists them all: read it, capture each screen,
and replace the marker.

## The marker

In a page, a marker is one line that readers do not see:

```mdx
{/* screenshot: tutorial-create-gateway */}
```

## How to replace one

1. Open the console at the place given in **How to reach it** and reproduce what **Screen** describes.
   Use the example of the tutorial where it applies: `orders-api`, `orders.example.com`, `corp-ca`.
2. Capture the panel or the part of the page concerned, not the whole window. Light theme, browser at 100%.
3. Save it as `static/img/screens/<id>.png`.
4. In the page, replace the marker line with the image:

   ```mdx
   ![What the capture shows](/img/screens/tutorial-create-gateway.png)
   ```

5. In the table below, change **Status** from `to do` to `done`.

To find every marker still in place:

```bash
grep -rn "screenshot:" docs
```

While capturing, compare what the page says with what the screen shows — names of buttons, order
of fields — and correct the page where they differ: the pages were written from the code and the
forms of the platform, not from the screens.

## The captures (66)

### `docs/access/create-and-manage-roles.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `access-role-restrict` | Step 3 — Restrict to environments *(optional)* | The role editor, step 3: API Manager restricted to two environments | Access Manager > RBAC > create a role > step 3 | to do |

### `docs/api-manager/api-instances.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-instance-gateway-select` | Gateway & access point | The Gateway & Access Point field: a gateway chosen, its access points listed, host name mode selected | API Manager > API Instances > create | to do |
| `api-instance-audience-id` | The audience ID of an API | The properties block of an API instance showing its audience ID with the copy button | API Manager > API Instances > an API > Overview | to do |

### `docs/api-manager/gateway.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `gateway-access-points` | Access points | The access points editor of a gateway: one HTTP and one HTTPS access point, the HTTPS one expanded with its certificate | API Manager > API Gateways > a gateway > Access points | to do |
| `gateway-settings` | Settings of a gateway | The page of a gateway with its settings: access points, resources, autoscaling, shutdown | API Manager > API Gateways > a gateway | to do |

### `docs/api-manager/policies.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-policies-overview` | Where a policy applies | The policies of an API instance, the four families visible | API Manager > API Instances > an API > its policies | to do |

### `docs/api-manager/policy-tasks/api-key.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-api-key` | Procedure | The API keys rule, with a list chosen and the header filled in | API Manager > API Instances > an API > its policies > the rule | to do |

### `docs/api-manager/policy-tasks/backend-tls.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-backend-tls` | Procedure | The Backend TLS setting of a gateway | API Manager > API Gateways > a gateway > Backend TLS | to do |

### `docs/api-manager/policy-tasks/basic-auth.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-basic-auth` | Procedure | The user name and password rule, with a list of users chosen | API Manager > API Instances > an API > its policies > the rule | to do |

### `docs/api-manager/policy-tasks/circuit-breaker.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-circuit-breaker` | Procedure | The circuit breaker rule, with its four caps | API Manager > API Instances > an API > its policies > the rule | to do |

### `docs/api-manager/policy-tasks/client-traffic.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-client-traffic` | Procedure | A client traffic policy on a gateway, with the TLS versions | API Manager > API Gateways > a gateway > its client traffic policies | to do |

### `docs/api-manager/policy-tasks/cors.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-cors` | Procedure | The CORS rule, with one origin listed | API Manager > API Instances > an API > its policies > the rule | to do |

### `docs/api-manager/policy-tasks/custom-lua.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-custom-lua` | Procedure | A custom policy, with a Lua script written in it | API Manager > API Instances > an API > its policies > the rule | to do |

### `docs/api-manager/policy-tasks/external-auth.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-external-auth` | Procedure | The external authentication rule, with the protocol and the service chosen | API Manager > API Instances > an API > its policies > the rule | to do |

### `docs/api-manager/policy-tasks/headers.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-headers` | Procedure | The request headers setting of an API instance | API Manager > API Instances > an API > HTTP request headers | to do |

### `docs/api-manager/policy-tasks/ip-rules.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-ip-rules` | Procedure | The address rule, with the default action and one rule | API Manager > API Instances > an API > its policies > the rule | to do |

### `docs/api-manager/policy-tasks/jwt.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-jwt` | Procedure | The token verification rule, issued by an auth gateway, audience check on | API Manager > API Instances > an API > its policies > the rule | to do |

### `docs/api-manager/policy-tasks/load-balancing.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-load-balancing` | Procedure | The load balancing rule, with an algorithm chosen | API Manager > API Instances > an API > its policies > the rule | to do |

### `docs/api-manager/policy-tasks/rate-limit.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-rate-limit` | Procedure | The rate limit rule, with a number of requests and a time unit | API Manager > API Instances > an API > its policies > the rule | to do |

### `docs/api-manager/policy-tasks/retry.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-retry` | Procedure | The retry rule, with the number of retries and the triggers | API Manager > API Instances > an API > its policies > the rule | to do |

### `docs/api-manager/policy-tasks/timeout.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-timeout` | Procedure | The timeout rule, with a request timeout | API Manager > API Instances > an API > its policies > the rule | to do |

### `docs/api-manager/policy-tasks/url-rewrite.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `api-manager-policy-tasks-url-rewrite` | Procedure | The URL rewrite setting of an API instance | API Manager > API Instances > an API > URL rewrite | to do |

### `docs/auth/auth-gateway.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `auth-gateway-create` | Create an auth gateway | The auth gateway creation form: gateway, HTTPS access point and host name chosen, version select | API Manager > Auth Gateways > create | to do |
| `auth-gateway-addresses` | Its addresses | The page of an auth gateway: Token service block and the Discovery document section | API Manager > Auth Gateways > an auth gateway > Overview | to do |
| `auth-gateway-clients-setting` | Clients | The Clients setting: one list chosen, another offered as not available here with Make available, the New list of clients link | API Manager > Auth Gateways > an auth gateway > Clients | to do |

### `docs/auth/client-lists.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `client-list-create` | Create a list | The creation panel for a list of clients: name filled, the note that the list is created empty, the Create button | API Manager > Auth Gateways > an auth gateway > Clients > New list of clients | to do |
| `client-list-add-client` | Add a client | The Add a client panel: name, proof method, client ID, a freshly generated secret, permissions, APIs | Secret Manager > a list of clients > Add a client | to do |

### `docs/config-sources/templates.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `secret-create-configuration` | How a configuration is used | The creation panel of a configuration: template chosen, the three steps Details, Properties, Distribute | Secret Manager > New configuration | to do |
| `secret-resources-file` | Resources File | A Resources File configuration with two files dropped in | Secret Manager > a Resources File configuration | to do |

### `docs/infra/camel-integration-service.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `env-camel-activate` | Activate it | The Camel Integration page of an environment not yet activated, with the Activate button | Infrastructure > Environments > an environment > Camel Integration | to do |
| `env-camel-registry` | Registry | The Registry setting: address, organization, pull secret, CA secret | Infrastructure > Environments > an environment > Camel Integration > Registry | to do |
| `env-camel-maven` | Maven | The Maven setting, with Advanced parameters turned on | Infrastructure > Environments > an environment > Camel Integration > Maven | to do |

### `docs/infra/environments.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `env-services` | The services of an environment | The page of an environment with its three services and their state | Infrastructure > Environments > an environment | to do |

### `docs/infra/log-exporter.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `env-log-destinations` | Destinations | The list of log destinations of an environment, and the panel to create one | Infrastructure > Environments > an environment > Logging | to do |
| `env-log-flows` | Flows | A log flow: application selector and destinations | Infrastructure > Environments > an environment > Logging > a flow | to do |

### `docs/infra/network.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `env-network-rule` | A rule | An egress rule being edited: who, ports, and the DNS preset | Infrastructure > Environments > an environment > Network > Egress Rules | to do |

### `docs/runtime/how-integrations-run.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-concept-build-and-run` | the introduction | The overview of an integration with its build panel and its instance, to show build then run on one screen | Runtime Manager > Integrations > an integration > Overview | to do |

### `docs/runtime/integrations.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-integration-settings` | Settings of an integration | The page of an integration with its settings listed, and the Add Capability panel open | Runtime Manager > Integrations > an integration > Add Capability | to do |

### `docs/runtime/settings/affinity.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-settings-affinity` | Procedure | The Affinity setting | Runtime Manager > Integrations > an integration > Add Capability > the setting | to do |

### `docs/runtime/settings/build.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-settings-build` | Procedure | The Build setting | Runtime Manager > Integrations > an integration > Add Capability > the setting | to do |

### `docs/runtime/settings/camel-runtime.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-settings-camel-runtime` | Procedure | The Camel Runtime setting, with a property | Runtime Manager > Integrations > an integration > Add Capability > the setting | to do |

### `docs/runtime/settings/compute.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-settings-compute` | Procedure | The Compute setting | Runtime Manager > Integrations > an integration > Add Capability > the setting | to do |

### `docs/runtime/settings/configuration.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-settings-configuration` | Procedure | The Configuration setting, with a properties configuration chosen | Runtime Manager > Integrations > an integration > Add Capability > the setting | to do |

### `docs/runtime/settings/container.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-settings-container` | Procedure | The Container setting | Runtime Manager > Integrations > an integration > Add Capability > the setting | to do |

### `docs/runtime/settings/cron.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-settings-cron` | Procedure | The Cron Schedule setting, with a schedule | Runtime Manager > Integrations > an integration > Add Capability > the setting | to do |

### `docs/runtime/settings/disruption-budget.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-settings-disruption-budget` | Procedure | The Disruption Budget setting | Runtime Manager > Integrations > an integration > Add Capability > the setting | to do |

### `docs/runtime/settings/environment.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-settings-environment` | Procedure | The Environment setting, with two variables | Runtime Manager > Integrations > an integration > Add Capability > the setting | to do |

### `docs/runtime/settings/health-probes.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-settings-health-probes` | Procedure | The Health Probes setting | Runtime Manager > Integrations > an integration > Add Capability > the setting | to do |

### `docs/runtime/settings/jvm.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-settings-jvm` | Procedure | The JVM setting, with a trusted certificate chosen | Runtime Manager > Integrations > an integration > Add Capability > the setting | to do |

### `docs/runtime/settings/resources.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-settings-resources` | Procedure | The Resources setting, with a configuration and its mount path | Runtime Manager > Integrations > an integration > Add Capability > the setting | to do |

### `docs/runtime/settings/volumes.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-settings-volumes` | Procedure | The Volumes setting, with a storage mounted | Runtime Manager > Integrations > an integration > Add Capability > the setting | to do |

### `docs/runtime/trust-private-certificates.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `runtime-jvm-trusted-ca` | 2. Choose it on the integration | Same screen as tutorial-jvm-trusted-ca: the JVM setting with a configuration and a file chosen | Runtime Manager > Integrations > an integration > Add Capability > JVM | to do |

### `docs/tutorial/configure.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `tutorial-configuration-setting` | Give them to the integration | The Configuration setting with orders-settings chosen in Property files, the New secret link visible | Runtime Manager > Integrations > orders-api > Add Capability > Configuration | to do |
| `tutorial-environment-setting` | Environment variables | The Environment setting with ORDERS_REGION=eu-west entered | Runtime Manager > Integrations > orders-api > Add Capability > Environment | to do |
| `tutorial-resources-setting` | Mount it | The Resources setting with orders-catalog chosen and its place set to /etc/orders | Runtime Manager > Integrations > orders-api > Add Capability > Resources | to do |

### `docs/tutorial/deploy.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `tutorial-bind-environment` | Bind it to an environment | The integration page with the "Bind to environment" choice open | Runtime Manager > Integrations > orders-api > Bind to environment | to do |
| `tutorial-build-progress` | Deploy | The overview of the integration while its image is being built, build panel visible | Runtime Manager > Integrations > orders-api > Overview, right after Apply changes | to do |
| `tutorial-integration-running` | What "running" means | The overview of the integration once it is running and ready | Runtime Manager > Integrations > orders-api > Overview | to do |

### `docs/tutorial/expose.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `tutorial-create-gateway` | 2. Create the gateway | The gateway creation form: exposure Public, one HTTPS access point on 443 with a certificate | API Manager > API Gateways > create | to do |
| `tutorial-create-api-instance` | 3. Publish the integration | The API instance form: gateway and access point chosen, host name orders.example.com, backend orders-api | API Manager > API Instances > create | to do |

### `docs/tutorial/first-integration.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `tutorial-create-integration` | Create it | The Create Integration panel: name filled, "None — create it on its own", source mode Inline | Runtime Manager > Integrations > Create Integration | to do |
| `tutorial-inline-source` | Write the route | The Sources editor with the YAML route typed in, the language selector visible | Runtime Manager > Integrations > Create Integration > Sources | to do |

### `docs/tutorial/from-git.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `tutorial-git-project` | Build the integration from it | The integration form in Git source mode, repository and release chosen | Runtime Manager > Integrations > Create Integration > Source mode Git | to do |

### `docs/tutorial/secure.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `tutorial-api-key-rule` | A. An API key | The API keys rule on the orders API, list orders-keys chosen, header x-api-key | API Manager > API Instances > orders > Security policies > API keys | to do |
| `tutorial-jwt-rule` | C. Tokens | The token verification rule: issued by an auth gateway, audience check on, audience of this API filled in | API Manager > API Instances > orders > Security policies > token verification | to do |

### `docs/tutorial/trust.md`

| ID | After | Screen | How to reach it | Status |
|---|---|---|---|---|
| `tutorial-jvm-trusted-ca` | 2. Choose it on the integration | The JVM setting: configuration corp-ca chosen, file corp-ca.pem chosen, "Mounted for you at" line visible | Runtime Manager > Integrations > orders-api > Add Capability > JVM | to do |

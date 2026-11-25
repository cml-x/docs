import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    "intro",
    {
      "type": "category",
      "label": "Start Here",
      "collapsed": false,
      "items": [
        "getting-started/overview",
        "getting-started/documentation-map"
      ],
      "link": {
        "type": "generated-index",
        "slug": "/getting-started",
        "title": "Start Here",
        "description": "What the platform is made of, and how this documentation is organized."
      }
    },
    {
      "type": "category",
      "label": "Tutorials",
      "collapsed": true,
      "items": [
        "getting-started/quick-start",
        "getting-started/your-first-integration",
        {
          "type": "category",
          "label": "Orders API Tutorial",
          "collapsed": true,
          "items": [
            "tutorial/overview",
            "tutorial/first-integration",
            "tutorial/deploy",
            "tutorial/configure",
            "tutorial/trust",
            "tutorial/scale",
            "tutorial/storage",
            "tutorial/from-git",
            "tutorial/expose",
            "tutorial/secure",
            "tutorial/observe",
            "tutorial/production"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/tutorial",
            "title": "Orders API Tutorial",
            "description": "One example taken from an inline route to a secured, observed API in production."
          }
        },
        "projects/create-first-integration"
      ]
    },
    {
      "type": "category",
      "label": "How-to Guides",
      "collapsed": true,
      "items": [
        {
          "type": "category",
          "label": "Run and Configure Integrations",
          "collapsed": true,
          "items": [
            "guides/create-an-integration",
            "guides/deploy-an-integration",
            "guides/monitor-an-integration",
            "runtime/trust-private-certificates",
            "runtime/settings/configuration",
            "runtime/settings/resources",
            "runtime/settings/environment",
            "runtime/settings/compute",
            "runtime/settings/jvm",
            "runtime/settings/camel-runtime",
            "runtime/settings/build",
            "runtime/settings/health-probes",
            "runtime/settings/cron",
            "runtime/settings/disruption-budget",
            "runtime/settings/affinity",
            "runtime/settings/volumes",
            "runtime/settings/container"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/runtime/settings",
            "title": "Run and Configure Integrations",
            "description": "Create, deploy and configure integrations: one page per goal."
          }
        },
        {
          "type": "category",
          "label": "Expose and Secure APIs",
          "collapsed": true,
          "items": [
            "guides/expose-an-api",
            "guides/secure-an-api",
            "auth/protect-api-with-jwt",
            "auth/configure-oidc",
            "api-manager/policy-tasks/api-key",
            "api-manager/policy-tasks/basic-auth",
            "api-manager/policy-tasks/jwt",
            "api-manager/policy-tasks/external-auth",
            "api-manager/policy-tasks/cors",
            "api-manager/policy-tasks/ip-rules",
            "api-manager/policy-tasks/rate-limit",
            "api-manager/policy-tasks/timeout",
            "api-manager/policy-tasks/retry",
            "api-manager/policy-tasks/circuit-breaker",
            "api-manager/policy-tasks/load-balancing",
            "api-manager/policy-tasks/custom-lua",
            "api-manager/policy-tasks/client-traffic",
            "api-manager/policy-tasks/backend-tls",
            "api-manager/policy-tasks/headers",
            "api-manager/policy-tasks/url-rewrite"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/api-manager/policy-tasks",
            "title": "Expose and Secure APIs",
            "description": "Expose, secure and shape the traffic of an API: one page per goal."
          }
        },
        {
          "type": "category",
          "label": "Repositories and Schemas",
          "collapsed": true,
          "items": [
            "projects/tasks/create-a-repository",
            "projects/tasks/create-from-a-template",
            "projects/tasks/edit-in-the-web-ide",
            "projects/tasks/create-a-release",
            "projects/tasks/share-as-a-template",
            "projects/tasks/create-a-schema",
            "projects/tasks/add-a-schema-version",
            "projects/tasks/manage-a-team"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/projects/tasks",
            "title": "Repositories and Schemas",
            "description": "Repositories, releases, templates, schemas and teams."
          }
        },
        {
          "type": "category",
          "label": "Query Telemetry and Alert",
          "collapsed": true,
          "items": [
            "monitoring/tasks/search-logs",
            "monitoring/tasks/read-metrics",
            "monitoring/tasks/follow-a-trace",
            "monitoring/tasks/build-a-dashboard",
            "monitoring/tasks/create-an-alert",
            "monitoring/tasks/schedule-a-report"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/monitoring/tasks",
            "title": "Query Telemetry and Alert",
            "description": "Logs, metrics, traces, dashboards, alerts and reports."
          }
        },
        {
          "type": "category",
          "label": "Use the Asset Catalog",
          "collapsed": true,
          "items": [
            "library/tasks/find-an-asset",
            "library/tasks/publish-an-asset",
            "library/tasks/manage-versions"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/library/tasks",
            "title": "Use the Asset Catalog",
            "description": "Find, publish and version assets."
          }
        },
        {
          "type": "category",
          "label": "Manage Users and Access",
          "collapsed": true,
          "items": [
            "access/tasks/invite-a-user",
            "access/tasks/grant-access-on-a-project",
            "access/tasks/lock-or-remove-a-user",
            "access/tasks/create-a-connected-app",
            "access/tasks/add-an-identity-provider",
            "access/tasks/require-mfa",
            "access/tasks/set-sign-in-rules",
            "access/create-and-manage-roles",
            "access/assign-roles-and-permissions",
            "access/create-user",
            "access/configure-organization-access"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/access/tasks",
            "title": "Manage Users and Access",
            "description": "Users, roles, service accounts, identity providers and sign-in policies."
          }
        },
        {
          "type": "category",
          "label": "Troubleshoot by Area",
          "collapsed": true,
          "items": [
            "troubleshooting/project-manager",
            "troubleshooting/runtime-manager",
            "troubleshooting/environment-manager",
            "troubleshooting/api-manager",
            "troubleshooting/tokens-and-sign-in",
            "troubleshooting/access-manager",
            "troubleshooting/monitoring"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/troubleshooting",
            "title": "Troubleshoot by Area",
            "description": "Organized by area and by symptom: cause, check, fix."
          }
        }
      ],
      "link": {
        "type": "generated-index",
        "slug": "/guides",
        "title": "How-to Guides",
        "description": "Goal-oriented procedures. You know what you want to do; these pages give the steps."
      }
    },
    {
      "type": "category",
      "label": "Concepts",
      "collapsed": true,
      "items": [
        {
          "type": "category",
          "label": "Projects and Source",
          "collapsed": true,
          "items": [
            "projects/getting-start",
            "projects/use-a-component",
            "projects/create-template",
            "projects/multi-component-integration"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/projects",
            "title": "Projects and Source",
            "description": "Where source lives and how it reaches an environment."
          }
        },
        {
          "type": "category",
          "label": "Integration Runtime",
          "collapsed": true,
          "items": [
            "runtime/getting-start",
            "runtime/how-integrations-run",
            "runtime/integration-groups"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/runtime",
            "title": "Integration Runtime",
            "description": "How an integration is built, run and grouped."
          }
        },
        {
          "type": "category",
          "label": "API Delivery",
          "collapsed": true,
          "items": [
            "api-manager/getting-start",
            "api-manager/how-requests-are-routed",
            "api-manager/policies",
            "api-manager/api-groups"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/api-manager",
            "title": "API Delivery",
            "description": "How a request reaches a service through a gateway, and what policies do."
          }
        },
        {
          "type": "category",
          "label": "Authentication and Security",
          "collapsed": true,
          "items": [
            "auth/getting-start",
            "security/authentication-vs-authorization",
            "security/api-security",
            "access/organization-and-business-units",
            "access/rbac-principles",
            "access/access-design"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/security",
            "title": "Authentication and Security",
            "description": "Who may call an API, who may manage the platform, and how both are enforced."
          }
        },
        {
          "type": "category",
          "label": "Environments and Clusters",
          "collapsed": true,
          "items": [
            "infra/getting-start",
            "infra/runtime-planes",
            "infra/environments"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/infra",
            "title": "Environments and Clusters",
            "description": "Runtime planes, targets and environments, on any cluster."
          }
        },
        {
          "type": "category",
          "label": "Configuration and Telemetry",
          "collapsed": true,
          "items": [
            "config-sources/getting-start",
            "monitoring/getting-start"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/config-sources",
            "title": "Configuration and Telemetry",
            "description": "How configuration is distributed and how telemetry is collected."
          }
        }
      ]
    },
    {
      "type": "category",
      "label": "Reference",
      "collapsed": true,
      "items": [
        {
          "type": "category",
          "label": "Repositories and Schemas",
          "collapsed": true,
          "items": [
            "projects/repos",
            "projects/create-release",
            "projects/schemas"
          ]
        },
        {
          "type": "category",
          "label": "Integration Runtime",
          "collapsed": true,
          "items": [
            "runtime/integrations",
            "runtime/storages"
          ]
        },
        {
          "type": "category",
          "label": "Gateway and Policies",
          "collapsed": true,
          "items": [
            "api-manager/gateway",
            "api-manager/api-instances",
            "api-manager/upstreams",
            "api-manager/domains",
            "api-manager/reference/security-policy",
            "api-manager/reference/backend-traffic-policy",
            "api-manager/reference/client-traffic-policy",
            "api-manager/reference/lua-policy",
            "api-manager/reference/route-filters"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/api-manager/reference",
            "title": "Gateway and Policies",
            "description": "Gateways, API instances, and every parameter of every policy."
          }
        },
        {
          "type": "category",
          "label": "Token Service",
          "collapsed": true,
          "items": [
            "auth/auth-gateway",
            "auth/client-lists"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/auth",
            "title": "Token Service",
            "description": "Auth gateways and OAuth clients."
          }
        },
        {
          "type": "category",
          "label": "Environment Services",
          "collapsed": true,
          "items": [
            "infra/targets",
            "infra/camel-integration-service",
            "infra/log-exporter",
            "infra/network",
            "infra/private-links"
          ]
        },
        {
          "type": "category",
          "label": "Secrets and Configuration",
          "collapsed": true,
          "items": [
            "config-sources/secrets",
            "config-sources/configs",
            "config-sources/templates"
          ]
        },
        {
          "type": "category",
          "label": "Telemetry Views",
          "collapsed": true,
          "items": [
            "monitoring/home",
            "monitoring/logs",
            "monitoring/metrics",
            "monitoring/traces"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/monitoring",
            "title": "Telemetry Views",
            "description": "The views of Monitoring and the series they read."
          }
        },
        {
          "type": "category",
          "label": "Asset Catalog",
          "collapsed": true,
          "items": [
            "library/assets",
            "library/templates"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/library",
            "title": "Asset Catalog",
            "description": "The asset catalog."
          }
        },
        {
          "type": "category",
          "label": "Access Control",
          "collapsed": true,
          "items": [
            "access/users",
            "access/authorizations",
            "access/connected-apps",
            "access/identity-providers",
            "access/mfa-policy",
            "access/settings"
          ],
          "link": {
            "type": "generated-index",
            "slug": "/access",
            "title": "Access Control",
            "description": "The screens of Access Manager."
          }
        }
      ]
    }
  ],
};

export default sidebars;

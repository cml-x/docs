export const CARD_DIAGRAMS = [
  'flow', 'gateway', 'policy', 'domain', 'token', 'people', 'store', 'clusters', 'signals', 'repository',
  'settings', 'build', 'catalog', 'diagnose', 'steps', 'apiKey', 'lock', 'password', 'breaker', 'clientTraffic',
  'origins', 'script', 'askOutside', 'headers', 'allowDeny', 'tokenParts', 'fanOut', 'ceiling', 'loop', 'clock',
  'rewrite', 'grouped', 'route', 'routing', 'outside', 'placement', 'gearFlow', 'gauges', 'fileToBox', 'nested',
  'calendar', 'minAvailable', 'keyValues', 'heartbeat', 'heap', 'twoBars', 'volume', 'isolation', 'map', 'replicas',
  'matrix', 'robot', 'roleCard', 'addUser', 'twoFactor', 'orgTree', 'triple', 'toggles', 'userList', 'lockUser',
  'tag', 'stamp', 'schema', 'plug', 'versions', 'editor', 'share', 'stages', 'logPipe', 'network',
  'tunnel', 'target', 'dashboard', 'logLines', 'spans', 'alert', 'clientList', 'search',
] as const;

export type CardDiagram = (typeof CARD_DIAGRAMS)[number];

export const DIAGRAM_BY_PAGE: Readonly<Record<string, CardDiagram>> = {
  'intro': 'map',

  'getting-started/overview': 'map',
  'getting-started/documentation-map': 'catalog',
  'getting-started/quick-start': 'steps',
  'getting-started/your-first-integration': 'flow',

  'tutorial/overview': 'map',
  'tutorial/first-integration': 'flow',
  'tutorial/configure': 'keyValues',
  'tutorial/deploy': 'build',
  'tutorial/expose': 'gateway',
  'tutorial/secure': 'policy',
  'tutorial/observe': 'signals',
  'tutorial/from-git': 'repository',
  'tutorial/production': 'clusters',
  'tutorial/scale': 'replicas',
  'tutorial/storage': 'volume',
  'tutorial/trust': 'lock',

  'guides/create-an-integration': 'flow',
  'guides/deploy-an-integration': 'build',
  'guides/expose-an-api': 'gateway',
  'guides/monitor-an-integration': 'signals',
  'guides/secure-an-api': 'policy',

  'projects/getting-start': 'steps',
  'projects/repos': 'repository',
  'projects/schemas': 'schema',
  'projects/create-first-integration': 'flow',
  'projects/create-release': 'tag',
  'projects/create-template': 'stamp',
  'projects/multi-component-integration': 'grouped',
  'projects/use-a-component': 'plug',
  'projects/tasks/create-a-repository': 'repository',
  'projects/tasks/create-a-release': 'tag',
  'projects/tasks/create-a-schema': 'schema',
  'projects/tasks/add-a-schema-version': 'versions',
  'projects/tasks/create-from-a-template': 'stamp',
  'projects/tasks/share-as-a-template': 'share',
  'projects/tasks/edit-in-the-web-ide': 'editor',
  'projects/tasks/manage-a-team': 'people',

  'library/assets': 'catalog',
  'library/templates': 'stamp',
  'library/tasks/find-an-asset': 'search',
  'library/tasks/manage-versions': 'versions',
  'library/tasks/publish-an-asset': 'share',

  'runtime/getting-start': 'steps',
  'runtime/how-integrations-run': 'isolation',
  'runtime/integrations': 'build',
  'runtime/integration-groups': 'grouped',
  'runtime/storages': 'volume',
  'runtime/trust-private-certificates': 'lock',
  'runtime/settings/affinity': 'placement',
  'runtime/settings/build': 'build',
  'runtime/settings/camel-runtime': 'gearFlow',
  'runtime/settings/compute': 'gauges',
  'runtime/settings/configuration': 'fileToBox',
  'runtime/settings/container': 'nested',
  'runtime/settings/cron': 'calendar',
  'runtime/settings/disruption-budget': 'minAvailable',
  'runtime/settings/environment': 'keyValues',
  'runtime/settings/health-probes': 'heartbeat',
  'runtime/settings/jvm': 'heap',
  'runtime/settings/resources': 'twoBars',
  'runtime/settings/volumes': 'volume',

  'api-manager/getting-start': 'steps',
  'api-manager/gateway': 'gateway',
  'api-manager/api-instances': 'route',
  'api-manager/api-groups': 'grouped',
  'api-manager/upstreams': 'outside',
  'api-manager/domains': 'domain',
  'api-manager/policies': 'policy',
  'api-manager/how-requests-are-routed': 'routing',
  'api-manager/policy-tasks/api-key': 'apiKey',
  'api-manager/policy-tasks/backend-tls': 'lock',
  'api-manager/policy-tasks/basic-auth': 'password',
  'api-manager/policy-tasks/circuit-breaker': 'breaker',
  'api-manager/policy-tasks/client-traffic': 'clientTraffic',
  'api-manager/policy-tasks/cors': 'origins',
  'api-manager/policy-tasks/custom-lua': 'script',
  'api-manager/policy-tasks/external-auth': 'askOutside',
  'api-manager/policy-tasks/headers': 'headers',
  'api-manager/policy-tasks/ip-rules': 'allowDeny',
  'api-manager/policy-tasks/jwt': 'tokenParts',
  'api-manager/policy-tasks/load-balancing': 'fanOut',
  'api-manager/policy-tasks/rate-limit': 'ceiling',
  'api-manager/policy-tasks/retry': 'loop',
  'api-manager/policy-tasks/timeout': 'clock',
  'api-manager/policy-tasks/url-rewrite': 'rewrite',
  'api-manager/reference/security-policy': 'policy',
  'api-manager/reference/backend-traffic-policy': 'fanOut',
  'api-manager/reference/client-traffic-policy': 'clientTraffic',
  'api-manager/reference/lua-policy': 'script',
  'api-manager/reference/route-filters': 'headers',

  'auth/getting-start': 'steps',
  'auth/auth-gateway': 'token',
  'auth/client-lists': 'clientList',
  'auth/configure-oidc': 'askOutside',
  'auth/protect-api-with-jwt': 'tokenParts',

  'config-sources/getting-start': 'steps',
  'config-sources/secrets': 'store',
  'config-sources/configs': 'fileToBox',
  'config-sources/templates': 'stamp',

  'infra/getting-start': 'steps',
  'infra/environments': 'stages',
  'infra/targets': 'target',
  'infra/runtime-planes': 'clusters',
  'infra/camel-integration-service': 'build',
  'infra/log-exporter': 'logPipe',
  'infra/network': 'network',
  'infra/private-links': 'tunnel',

  'monitoring/getting-start': 'steps',
  'monitoring/home': 'dashboard',
  'monitoring/logs': 'logLines',
  'monitoring/metrics': 'signals',
  'monitoring/traces': 'spans',
  'monitoring/tasks/build-a-dashboard': 'dashboard',
  'monitoring/tasks/create-an-alert': 'alert',
  'monitoring/tasks/follow-a-trace': 'spans',
  'monitoring/tasks/read-metrics': 'signals',
  'monitoring/tasks/schedule-a-report': 'calendar',
  'monitoring/tasks/search-logs': 'logLines',

  'access/organization-and-business-units': 'orgTree',
  'access/rbac-principles': 'triple',
  'access/sign-in-and-identity-model': 'password',
  'library/asset-catalog-model': 'share',
  'access/access-design': 'allowDeny',
  'access/users': 'userList',
  'access/create-user': 'addUser',
  'access/create-and-manage-roles': 'roleCard',
  'access/assign-roles-and-permissions': 'people',
  'access/authorizations': 'matrix',
  'access/connected-apps': 'robot',
  'access/identity-providers': 'token',
  'access/mfa-policy': 'twoFactor',
  'access/configure-organization-access': 'toggles',
  'access/settings': 'settings',
  'access/tasks/add-an-identity-provider': 'token',
  'access/tasks/create-a-connected-app': 'robot',
  'access/tasks/grant-access-on-a-project': 'people',
  'access/tasks/invite-a-user': 'addUser',
  'access/tasks/lock-or-remove-a-user': 'lockUser',
  'access/tasks/require-mfa': 'twoFactor',
  'access/tasks/set-sign-in-rules': 'toggles',

  'security/api-security': 'policy',
  'security/authentication-vs-authorization': 'triple',

  'troubleshooting/access-manager': 'lockUser',
  'troubleshooting/api-manager': 'routing',
  'troubleshooting/tokens-and-sign-in': 'token',
  'troubleshooting/environment-manager': 'stages',
  'troubleshooting/monitoring': 'signals',
  'troubleshooting/project-manager': 'repository',
  'troubleshooting/runtime-manager': 'build',
};

const RULES: ReadonlyArray<readonly [CardDiagram, RegExp]> = [
  ['diagnose', /troubleshoot/],
  ['policy', /polic|security|authorization/],
  ['domain', /domain|certificate/],
  ['token', /auth-gateway|\/auth\/|token|identity/],
  ['gateway', /gateway|api-manager|upstream/],
  ['people', /\/access\/|rbac|role|user|team|member/],
  ['store', /config-sources|secret|configs/],
  ['signals', /monitoring|metric|alert|report/],
  ['clusters', /\/infra\/|environment|target|cluster|network/],
  ['settings', /\/settings\//],
  ['repository', /\/projects\/|repo|release|schema/],
  ['catalog', /\/library\/|asset|catalog/],
  ['build', /\/runtime\/|integration|storage|build|deploy/],
  ['steps', /getting-start|tutorial|guide|quick/],
];

export function pageKeyOf(href: string | undefined): string {
  const path = (href ?? '').split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
  const known = Object.keys(DIAGRAM_BY_PAGE);
  return known.find(key => path === key || path.endsWith(`/${key}`)) ?? path;
}

export function cardDiagramFor(href: string | undefined, title: string | undefined): CardDiagram {
  const byPage = DIAGRAM_BY_PAGE[pageKeyOf(href)];
  if (byPage) return byPage;
  const text = `${href ?? ''} ${title ?? ''}`.toLowerCase();
  const found = RULES.find(([, pattern]) => pattern.test(text));
  return found ? found[0] : 'flow';
}

export function isCardDiagram(value: unknown): value is CardDiagram {
  return typeof value === 'string' && (CARD_DIAGRAMS as readonly string[]).includes(value);
}

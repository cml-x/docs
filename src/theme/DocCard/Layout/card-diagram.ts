export type CardDiagram =
  | 'policy' | 'domain' | 'gateway' | 'token' | 'people' | 'store' | 'clusters' | 'signals'
  | 'repository' | 'settings' | 'build' | 'catalog' | 'diagnose' | 'steps' | 'flow';

const RULES: ReadonlyArray<readonly [CardDiagram, RegExp]> = [
  ['diagnose', /troubleshoot/],
  ['policy', /polic|rate-limit|retry|timeout|circuit|cors|jwt|oidc|basic-auth|api-key|ip-allow|ip-deny|authorization|security|lua|mfa/],
  ['domain', /domain|certificate|tls/],
  ['token', /auth-gateway|\/auth\/|token|client-list|client-app|service-account/],
  ['gateway', /gateway|api-instance|api-group|upstream|how-requests|api-manager/],
  ['people', /\/access\/|rbac|role|user|team|member|identity-provider|business-unit|organization/],
  ['store', /config-sources|secret|configs|template/],
  ['signals', /monitoring|logs?\b|log-|metric|trace|alert|dashboard|report/],
  ['clusters', /\/infra\/|environment|target|runtime-plane|cluster|network|private-link/],
  ['settings', /\/settings\/|jvm|resources|probe|mount|replica|scal/],
  ['repository', /\/projects\/|repo|release|schema|branch|component/],
  ['catalog', /\/library\/|asset|kamelet|catalog/],
  ['build', /\/runtime\/|integration|storage|build|deploy/],
  ['steps', /getting-start|tutorial|guide|intro|quick/],
];

export function cardDiagramFor(href: string | undefined, title: string | undefined): CardDiagram {
  const text = `${href ?? ''} ${title ?? ''}`.toLowerCase();
  const found = RULES.find(([, pattern]) => pattern.test(text));
  return found ? found[0] : 'flow';
}

export function isCardDiagram(value: unknown): value is CardDiagram {
  return typeof value === 'string' && (value === 'flow' || RULES.some(([name]) => name === value));
}

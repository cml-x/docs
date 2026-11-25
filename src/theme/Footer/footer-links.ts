export interface FooterLink {
  label: string;
  href: string;
  internal?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSites {
  www: string;
  blog: string;
}

export const FOOTER_TAGLINE = 'Camel eXchanges. The open control plane for integration.';

export const FOOTER_NOTICE =
  'Built on Apache Camel. Apache Camel is a trademark of the Apache Software Foundation. Other marks belong to their owners.';

export function footerColumns({www, blog}: FooterSites): FooterColumn[] {
  const site = (path: string): string => `${www}${path}`;
  return [
    {
      title: 'Platform',
      links: [
        {label: 'Overview', href: site('/platform')},
        {label: 'Get started', href: site('/start')},
        {label: 'Open and reversible', href: site('/open')},
        {label: 'Sovereignty and security', href: site('/sovereignty')},
        {label: 'Open-source inventory', href: site('/open-source')},
        {label: 'AI and agents', href: site('/ai')},
      ],
    },
    {
      title: 'Resources',
      links: [
        {label: 'Beyond API-led', href: site('/why-not-api-led')},
        {label: 'Coming from MuleSoft', href: site('/from-mulesoft')},
        {label: 'Articles', href: blog},
        {label: 'Documentation', href: '/', internal: true},
      ],
    },
    {
      title: 'Company',
      links: [
        {label: 'About', href: site('/about')},
        {label: 'Careers', href: site('/careers')},
        {label: 'Partners', href: site('/partners')},
        {label: 'Contact', href: site('/contact')},
      ],
    },
  ];
}

export function footerLegalLinks({www}: FooterSites): FooterLink[] {
  return [
    {label: 'Privacy', href: `${www}/privacy`},
    {label: 'Terms', href: `${www}/terms`},
    {label: 'Legal', href: `${www}/legal`},
  ];
}

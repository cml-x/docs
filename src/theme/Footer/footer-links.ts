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
  app: string;
}

export const FOOTER_TAGLINE = 'Camel eXchanges. The open control plane for integration.';

export const FOOTER_NOTICE =
  'Built on Apache Camel. Apache Camel is a trademark of the Apache Software Foundation. Other marks belong to their owners.';

export function footerColumns({www, app}: FooterSites): FooterColumn[] {
  const site = (path: string): string => `${www}${path}`;
  return [
    {
      title: 'Documentation',
      links: [
        {label: 'Tutorials', href: '/getting-started/quick-start', internal: true},
        {label: 'How-to guides', href: '/guides', internal: true},
        {label: 'Concepts', href: '/projects/getting-start', internal: true},
        {label: 'Reference', href: '/projects/repos', internal: true},
      ],
    },
    {
      title: 'Camel X',
      links: [
        {label: 'Platform', href: site('/platform')},
        {label: 'Get started', href: app},
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

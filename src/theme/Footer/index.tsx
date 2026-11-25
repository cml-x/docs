import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  FOOTER_NOTICE,
  FOOTER_TAGLINE,
  footerColumns,
  footerLegalLinks,
  type FooterLink,
  type FooterSites,
} from './footer-links';
import styles from './styles.module.css';

function FooterAnchor({link}: {link: FooterLink}): React.JSX.Element {
  if (link.internal) {
    return <Link to={link.href}>{link.label}</Link>;
  }
  return <a href={link.href}>{link.label}</a>;
}

export default function Footer(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const sites = siteConfig.customFields?.sites as FooterSites;
  const wordmark = useBaseUrl('/img/camelx-wordmark-white.svg');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <img className={styles.wordmark} src={wordmark} alt="Camel X" />
            <p>{FOOTER_TAGLINE}</p>
          </div>
          {footerColumns(sites).map(column => (
            <div key={column.title}>
              <h4>{column.title}</h4>
              {column.links.map(link => (
                <FooterAnchor key={link.label} link={link} />
              ))}
            </div>
          ))}
        </div>
        <div className={styles.base}>
          <span>
            &copy; {new Date().getFullYear()} Camel X. {FOOTER_NOTICE}
          </span>
          <span className={styles.legal}>
            {footerLegalLinks(sites).map(link => (
              <FooterAnchor key={link.label} link={link} />
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}

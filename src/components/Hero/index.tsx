import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function Hero(): ReactNode {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <Heading as="h1" className={styles.heroTitle}>
            Your integrations belong to you.
          </Heading>
          <p className={styles.heroSubtitle}>
            Camel X deploys, governs and observes standard Apache Camel routes, on our clusters or on
            yours. This documentation takes you from a first route to an API in production.
          </p>
          <Link className={`button button--primary button--lg ${styles.heroCta}`} to="/getting-started/quick-start">
            Deploy Your First Route
          </Link>
        </div>
        <div className={styles.heroImage}>
          <img
            src="/img/hero-illustration.svg"
            alt="Camel X is a control plane between your systems and your consumers: integrations, gateways, secrets, roles and telemetry, on managed clusters or on your own."
          />
        </div>
      </div>
    </header>
  );
}

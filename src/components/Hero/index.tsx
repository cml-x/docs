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
            Integrate. Expose. Monitor.
          </Heading>
          <p className={styles.heroSubtitle}>
            Camel X is a modular integration platform: build Apache Camel integrations, expose and
            secure APIs, deploy and run your flows, and monitor everything, one micro-application
            at a time.
          </p>
          <Link className={`button button--primary button--lg ${styles.heroCta}`} to="/getting-started/your-first-integration">
            Build Your First Integration
          </Link>
        </div>
        <div className={styles.heroImage}>
          <img
            src="/img/hero-illustration.svg"
            alt="Camel X sits as an integration middleware between client applications (CRM, ERP, e-commerce, mobile, partner portal) and backend systems (database, legacy system, cloud service, data warehouse, file server)."
          />
        </div>
      </div>
    </header>
  );
}

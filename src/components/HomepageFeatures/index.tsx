import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: string;
  href: string;
  img: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Integration Projects',
    description: 'Git-backed integration projects, schemas, team access.',
    href: '/projects',
    img: '/img/sections/projects.svg',
  },
  {
    title: 'Integration Runtime',
    description: 'Capsules, cross-capsule integrations, storage.',
    href: '/runtime',
    img: '/img/sections/runtime.svg',
  },
  {
    title: 'Environments & Targets',
    description: 'Kubernetes clusters, namespaces, deployment targets.',
    href: '/infra',
    img: '/img/sections/infra.svg',
  },
  {
    title: 'Observability',
    description: 'Dashboards, logs, metrics, distributed traces.',
    href: '/monitoring',
    img: '/img/sections/monitoring.svg',
  },
  {
    title: 'API Delivery',
    description: 'API gateways, running API instances, custom domains.',
    href: '/api-manager',
    img: '/img/sections/api-manager.svg',
  },
  {
    title: 'Authentication',
    description: 'Kanidm-backed identity provider gateways.',
    href: '/auth',
    img: '/img/sections/auth.svg',
  },
  {
    title: 'Access Control',
    description: 'Users, authorizations, connected apps, identity providers, MFA.',
    href: '/access',
    img: '/img/sections/access.svg',
  },
  {
    title: 'Secrets & Configuration',
    description: 'Encrypted secrets, config maps, reusable templates.',
    href: '/config-sources',
    img: '/img/sections/config-sources.svg',
  },
  {
    title: 'Component Library',
    description: 'Reusable Kamelets, schemas, connector definitions, templates.',
    href: '/library',
    img: '/img/sections/assets.svg',
  },
];

function Feature({title, description, href, img}: FeatureItem) {
  return (
    <div className="col col--4">
      <Link to={href} className={styles.card}>
        <div className={styles.cardImageFrame}>
          <img src={img} alt="" className={styles.cardImage} />
        </div>
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <p className={styles.cardDescription}>{description}</p>
        <span className={styles.cardLink}>Learn more →</span>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.sectionTitle}>
        Explore the Platform
      </Heading>
      <div className={`row ${styles.grid}`}>
        {FeatureList.map((item) => (
          <Feature key={item.href} {...item} />
        ))}
      </div>
    </section>
  );
}

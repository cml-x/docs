import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type QuickStartItem = {
  title: string;
  description: string;
  href: string;
};

const QuickStartList: QuickStartItem[] = [
  {
    title: 'Deploy your first integration',
    description: 'New to Camel X? Start by deploying your first capsule.',
    href: '/runtime/getting-start',
  },
  {
    title: 'Connect a repository',
    description: 'Bring your integration projects into the platform from Git.',
    href: '/projects/getting-start',
  },
  {
    title: 'Secure your APIs',
    description: 'Create your first API gateway and start routing traffic.',
    href: '/api-manager/getting-start',
  },
  {
    title: 'Watch it run',
    description: 'Explore dashboards, logs, metrics and traces for your services.',
    href: '/monitoring/getting-start',
  },
];

function QuickStartCard({title, description, href}: QuickStartItem) {
  return (
    <div className="col col--3">
      <Link to={href} className={styles.card}>
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <p className={styles.cardDescription}>{description}</p>
      </Link>
    </div>
  );
}

export default function QuickStart(): ReactNode {
  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.sectionTitle}>
        Quick Start
      </Heading>
      <div className={`row ${styles.grid}`}>
        {QuickStartList.map((item) => (
          <QuickStartCard key={item.href} {...item} />
        ))}
      </div>
    </section>
  );
}

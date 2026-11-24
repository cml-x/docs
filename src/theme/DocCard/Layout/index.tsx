import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/DocCard/Layout';
import CardDiagramFigure from './diagrams';
import {cardDiagramFor, isCardDiagram} from './card-diagram';
import styles from './styles.module.css';

export default function DocCardLayout({item, className, href, title, description}: Props): React.ReactElement {
  const chosen = item.customProps?.diagram;
  const diagram = isCardDiagram(chosen) ? chosen : cardDiagramFor(href, title);
  return (
    <Link href={href} className={clsx('card', 'theme-doc-card-container', styles.card, className)}>
      <div className={styles.figure}>
        <CardDiagramFigure name={diagram} />
      </div>
      <div className={styles.body}>
        <h2 className={styles.title} title={title}>{title}</h2>
        {description && <p className={styles.description} title={description}>{description}</p>}
      </div>
    </Link>
  );
}

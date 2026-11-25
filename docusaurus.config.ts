import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Camel X Docs',
  tagline: 'Documentation for the Camel X integration platform',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.orsetra.co',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // Repo the site is generated from — used for "edit this page" links and,
  // if we ever switch off Vercel, GitHub Pages deployment.
  organizationName: 'cml-x', // GitHub org (see apps/*, ghcr.io/cml-x/*)
  projectName: 'docs',

  onBrokenLinks: 'throw',

  customFields: {
    sites: {
      www: (process.env.PUBLIC_WWW_URL ?? 'https://www.williams-penka.workers.dev').replace(/\/$/, ''),
      blog: (process.env.PUBLIC_BLOG_URL ?? 'https://blog.williams-penka.workers.dev').replace(/\/$/, ''),
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Docs live at the site root (/) instead of /docs, so the sidebar is
          // visible on the homepage — same structure as docs.appcircle.io.
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/cml-x/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Client-side search index — no external service (Algolia) needed.
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: true,
        indexPages: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'Camel X',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
        width: 117,
        height: 32,
      },
      items: [
        {
          href: 'https://github.com/cml-x',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'properties', 'java', 'http', 'log'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

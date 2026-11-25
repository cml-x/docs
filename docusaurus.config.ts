import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const siteUrl = (value: string | undefined, fallback: string) => (value ?? fallback).replace(/\/$/, '');

const sites = {
  www: siteUrl(process.env.PUBLIC_WWW_URL, 'https://www.williams-penka.workers.dev'),
  blog: siteUrl(process.env.PUBLIC_BLOG_URL, 'https://blog.williams-penka.workers.dev'),
  app: siteUrl(process.env.PUBLIC_APP_URL, 'https://app.camelx.io'),
};

const codeTheme = {
  ...prismThemes.vsDark,
  plain: {color: '#f4f4f4', backgroundColor: '#161616'},
};

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
    sites,
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
      title: 'Docs',
      logo: {
        alt: 'Camel X',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
        width: 124,
        height: 32,
      },
      items: [
        {href: `${sites.www}/platform`, label: 'Platform', position: 'left', target: '_self'},
        {href: `${sites.www}/open`, label: 'Open', position: 'left', target: '_self'},
        {href: `${sites.www}/ai`, label: 'AI and agents', position: 'left', target: '_self'},
        {href: sites.blog, label: 'Articles', position: 'left', target: '_self'},
        {href: 'https://github.com/cml-x', label: 'GitHub', position: 'right'},
        {href: sites.app, label: 'Get started', position: 'right', className: 'navbar-cta'},
      ],
    },
    prism: {
      theme: codeTheme,
      darkTheme: codeTheme,
      additionalLanguages: ['bash', 'properties', 'java', 'http', 'log'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

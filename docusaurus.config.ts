import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SHELL Workspace',
  tagline: 'Robotics, Software, AI, Systems, and Music',
  favicon: 'img/favicon.svg',
  url: 'https://SHELL05117.github.io',
  baseUrl: '/SHELL_workspace/',
  organizationName: 'SHELL05117',
  projectName: 'SHELL_workspace',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/SHELL05117/SHELL_workspace/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/shell-workspace-og.svg',
    navbar: {
      title: 'SHELL Workspace',
      logo: {
        alt: 'SHELL Workspace Logo',
        src: 'img/favicon.svg',
      },
      items: [
        {to: '/', label: 'Home', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/projects', label: 'Projects', position: 'left'},
        {to: '/docs/music/intro', label: 'Music', position: 'left'},
        {to: '/about', label: 'About', position: 'left'},
        {
          href: 'https://github.com/SHELL05117/SHELL_workspace',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Workspace',
          items: [
            {label: 'Docs', to: '/docs/intro'},
            {label: 'Projects', to: '/projects'},
            {label: 'About', to: '/about'},
          ],
        },
        {
          title: 'Deploy',
          items: [
            {label: 'GitHub Pages', href: 'https://SHELL05117.github.io/SHELL_workspace/'},
            {label: 'Assets Placeholder', href: 'https://assets.shellworkspace.cn'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SHELL Workspace.`,
    },
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

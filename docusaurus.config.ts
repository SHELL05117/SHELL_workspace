import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SHELL Workspace',
  tagline: 'Robotics, Software, Course, and Music',
  favicon: 'img/brand/shell-logo-mark.png',
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
          routeBasePath: 'notes',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/SHELL05117/SHELL_workspace/tree/main/',
        },
        blog: {
          routeBasePath: 'blog',
          showReadingTime: true,
          blogSidebarTitle: '全部文章',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/source-assets/LOGO.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'SHELL Workspace',
      logo: {
        alt: 'SHELL Workspace Logo',
        src: 'img/brand/shell-logo-mark.png',
      },
      items: [
        {to: '/', label: 'Home', position: 'left', activeBaseRegex: '^/$'},
        {to: '/projects', label: 'Projects', position: 'left', activeBaseRegex: '^/projects(?:/|$)'},
        {to: '/blog', label: 'Blog', position: 'left', activeBaseRegex: '^/blog(?:/|$)'},
        {to: '/notes', label: 'Notes', position: 'left', activeBaseRegex: '^/notes(?:/|$)'},
        {to: '/about', label: 'About', position: 'left', activeBaseRegex: '^/about(?:/|$)'},
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
            {label: 'Notes', to: '/notes'},
            {label: 'Projects', to: '/projects'},
            {label: 'Blog', to: '/blog'},
            {label: 'About', to: '/about'},
            {label: 'Archive', to: '/archive'},
          ],
        },
        {
          title: 'Status',
          items: [
            {label: 'GitHub Pages', href: 'https://SHELL05117.github.io/SHELL_workspace/'},
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

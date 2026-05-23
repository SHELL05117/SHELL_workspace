import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Robotics',
      link: {
        type: 'doc',
        id: 'robotics/intro',
      },
      items: [
        'robotics/pushback',
        'robotics/pushback_document',
        'robotics/vex-u',
        'robotics/pure-pursuit',
      ],
    },
    {
      type: 'category',
      label: 'Computer Science',
      link: {
        type: 'doc',
        id: 'cs/intro',
      },
      items: ['cs/git-github', 'cs/web-development'],
    },
    {
      type: 'category',
      label: 'Course',
      link: {
        type: 'doc',
        id: 'math-physics/intro',
      },
      items: [
        'math-physics/calculus',
        'math-physics/engineering-physics',
        'math-physics/engineering-drawing',
      ],
    },
  ],
};

export default sidebars;

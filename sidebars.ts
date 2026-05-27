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
        id: 'course/intro',
      },
      items: [
        {
          type: 'category',
          label: 'Calculus',
          link: {
            type: 'doc',
            id: 'course/calculus/intro',
          },
          items: ['course/calculus/拉格朗日乘数法学习笔记'],
        },
        {
          type: 'category',
          label: 'Physics',
          link: {
            type: 'doc',
            id: 'course/physics/intro',
          },
          items: [],
        },
        {
          type: 'category',
          label: 'Engineering Graphics',
          link: {
            type: 'doc',
            id: 'course/engineering-graphics/intro',
          },
          items: [],
        },
      ],
    },
  ],
};

export default sidebars;

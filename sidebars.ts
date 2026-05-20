import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro', 'about-shell'],
    },
    {
      type: 'category',
      label: 'Robotics',
      items: [
        'robotics/intro',
        'robotics/pushback',
        'robotics/pushback-skill-analysis',
        'robotics/vex-u',
        'robotics/pure-pursuit',
        'robotics/motion-control',
      ],
    },
    {
      type: 'category',
      label: 'Computer Science',
      items: ['cs/intro', 'cs/git-github', 'cs/web-development', 'cs/systems'],
    },
    {
      type: 'category',
      label: 'Math & Physics',
      items: [
        'math-physics/intro',
        'math-physics/calculus',
        'math-physics/engineering-physics',
        'math-physics/engineering-drawing',
      ],
    },
    {
      type: 'category',
      label: 'Music',
      items: ['music/intro', 'music/songs', 'music/mv', 'music/ai-vocal-workflow'],
    },
    {
      type: 'category',
      label: 'Archive',
      items: ['archive/intro'],
    },
  ],
};

export default sidebars;

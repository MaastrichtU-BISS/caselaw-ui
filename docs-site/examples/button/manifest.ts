import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'variants',
    file: 'Variants',
    title: 'Variants',
    description:
      'One primary action per task. Secondary and ghost buttons carry the supporting work; danger is reserved for destructive actions.',
  },
  {
    id: 'sizes-icons',
    file: 'SizesAndIcons',
    title: 'Sizes and icons',
    description:
      'Use the small size inside toolbars and table rows. Icon-only buttons are square and need an aria-label.',
  },
  {
    id: 'loading',
    file: 'Loading',
    title: 'Loading',
    description:
      'While an action runs, the button keeps its width, announces aria-busy and ignores further clicks.',
  },
  {
    id: 'link',
    file: 'Link',
    title: 'As a link',
    description:
      'Pass href to render an anchor with button styling. A disabled link drops its href and cannot be activated.',
  },
];

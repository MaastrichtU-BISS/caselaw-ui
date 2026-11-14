import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'gallery',
    file: 'Gallery',
    title: 'Images from a project update',
    description:
      'Open the viewer from a thumbnail. Arrow keys step through the images, Home and End jump to either end, Escape closes and focus returns to the thumbnail.',
    height: 640,
  },
];

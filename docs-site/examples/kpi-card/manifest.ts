import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'overview',
    file: 'Overview',
    title: 'Dashboard row',
    description:
      'Place a few cards in a biss-kpi-grid at the top of a dashboard. Use the note for the comparison that makes the number meaningful.',
    layout: 'fill',
    height: 200,
  },
  {
    id: 'derived',
    file: 'Derived',
    title: 'Values from your data',
    description:
      'Compute and format the value yourself, then pass it as a string. The card prints exactly what it gets, so currency and units stay in your locale.',
    layout: 'fill',
    height: 200,
  },
];

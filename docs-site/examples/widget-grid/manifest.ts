import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'editable-dashboard',
    file: 'EditableDashboard',
    title: 'Rearrangeable dashboard',
    description:
      'Readers reorder widgets with the arrow buttons or by dragging the grip. The grid emits the new order; store it so the layout survives a reload. A span of 2 makes a widget full width.',
    layout: 'fill',
    height: 520,
  },
  {
    id: 'read-only',
    file: 'ReadOnly',
    title: 'Fixed layout',
    description:
      'Set editable to false for a shared or published dashboard. The widgets keep their frames and titles without the reorder controls.',
    layout: 'fill',
    height: 200,
  },
];

import type { ExampleMeta } from '../registry';

export const examples: readonly ExampleMeta[] = [
  {
    id: 'project-details',
    file: 'ProjectDetails',
    title: 'Project details',
    description:
      'Wrap each control in a field to connect its label, hint and required marker. The control picks up the id and aria-describedby on its own.',
  },
  {
    id: 'validation',
    file: 'Validation',
    title: 'Validation',
    description:
      'Pass an error after the user submits. It replaces the hint, marks the control invalid and is announced to screen readers.',
  },
  {
    id: 'optional-disabled',
    file: 'OptionalAndDisabled',
    title: 'Optional and disabled',
    description:
      'Mark the few fields a user may skip as optional. A disabled field disables its control and dims the label.',
  },
  {
    id: 'custom-control',
    file: 'CustomControl',
    title: 'Custom control',
    description:
      'For a control the library does not ship, spread the control attributes from the slot onto your own element.',
  },
];

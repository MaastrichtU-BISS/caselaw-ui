/** Each example is one compiled module and its exact raw source. */
export const dialogExamples = [
  {
    id: 'basic',
    file: 'Basic',
    title: 'Composition',
    description:
      'An uncontrolled dialog with a BISS button as its trigger. The primitive owns state, IDs and focus.',
  },
  {
    id: 'controlled',
    file: 'Controlled',
    title: 'Controlled state and forms',
    description:
      'Keep the dialog open on validation errors. Close it explicitly after a successful local save.',
  },
  {
    id: 'nested',
    file: 'Nested',
    title: 'Nested dialogs',
    description:
      'Each root owns a separate layer. Focus returns to the trigger in the parent when the nested task ends.',
  },
  {
    id: 'convenience',
    file: 'Convenience',
    title: 'Convenient wrapper',
    description:
      'Use BissDialog for the standard layout, with the same primitive behavior underneath.',
  },
] as const;

import type { Fixture } from '../fixtures';

export const fixture: Fixture = {
  props: {
    steps: ['Upload', 'Match columns', 'Review'],
    step: 2,
    description: 'grants-2026.xlsx · 48 rows',
    columns: [
      { key: 'Grant name', samples: ['Open justice', 'Courts and citizens', 'Public access'] },
      { key: 'PI', samples: ['Ada Lovelace', 'Grace Hopper', 'Alan Turing'] },
      { key: 'Funder', samples: ['NWO', 'ERC', 'Horizon Europe'] },
      { key: 'Amount (€)', samples: [240000, 1500000, 480000] },
      { key: 'Internal notes', samples: ['Check overhead', null, ''] },
    ],
    fields: [
      { key: 'title', label: 'Project title', required: true, aliases: ['Grant name', 'Name'] },
      { key: 'lead', label: 'Principal investigator', aliases: ['PI', 'Lead'] },
      { key: 'funder', label: 'Funder' },
      { key: 'budget', label: 'Budget', required: true, aliases: ['Amount'] },
      { key: 'start', label: 'Start date', required: true },
    ],
  },
  wide: true,
};

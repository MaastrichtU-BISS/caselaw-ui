import type { Fixture } from './fixtures';
const roles = [
  { value: 'viewer', label: 'Can view' },
  { value: 'editor', label: 'Can edit' },
];
const entries = [
  { id: 'ada', name: 'Ada Lovelace', email: 'ada@example.org', role: 'editor', locked: true },
  { id: 'grace', name: 'Grace Hopper', email: 'grace@example.org', role: 'viewer', editable:true },
];
const columns = [
  { key: 'name', label: 'Project', visible: true, pinned: true, width: 220 },
  { key: 'team', label: 'Team', visible: true, width: 160 },
  { key: 'status', label: 'Status', visible: true, width: 150 },
];
export const newFixtures: Record<string, Fixture> = {
  Checkbox: { props: { label: 'Notify the team', checked: true }, states: ['default', 'disabled'] },
  RadioGroup: {
    props: {
      label: 'Visibility',
      value: 'team',
      options: [
        { value: 'team', label: 'Team only' },
        { value: 'public', label: 'Public link' },
      ],
    },
  },
  SegmentedControl: {
    props: {
      label: 'View',
      value: 'list',
      options: [
        { value: 'list', label: 'List' },
        { value: 'board', label: 'Board' },
        { value: 'calendar', label: 'Calendar' },
      ],
    },
  },
  Disclosure: {
    props: { title: 'Project details', open: true },
    text: 'This project studies access to public decisions.',
  },
  Breadcrumbs: {
    props: {
      items: [
        { label: 'Workspace', href: '#' },
        { label: 'Projects', href: '#' },
        { label: 'Open justice' },
      ],
    },
  },
  DataTile: {
    props: { title: 'Research activity', note: 'Publications this quarter' },
    text: '24 publications across three teams.',
  },
  FigureHelp: {
    props: {
      title: 'About team capacity',
      paragraphs: [
        'Capacity compares allocated effort with the team’s available time.',
        'Figures update when your application supplies new values.',
      ],
    },
    state: 'open',
  },
  DocumentToc: {
    props: {
      items: [
        { id: 'overview', title: 'Overview' },
        { id: 'methods', title: 'Methods' },
        { id: 'sources', title: 'Data sources', level: 2 },
        { id: 'findings', title: 'Findings' },
      ],
    },
  },
  DocumentCallout: {
    props: { tone: 'info' },
    text: 'This draft is shared with the research team.',
  },
  Bookmark: {
    props: {
      title: 'Open research handbook',
      description: 'Methods, templates and resources for the team.',
      href: 'https://example.org/handbook',
      site: 'Research workspace',
    },
  },
  MediaFigure: {
    props: {
      src: '/example-figure.svg',
      alt: 'Three research teams connected to a shared data archive',
      caption: 'A shared archive keeps the research teams connected.',
    },
  },
  AttachmentList: {
    props: {
      items: [
        { id: 'notes', name: 'Research notes.pdf', size: '240 KB', href: '#', removable: true },
        { id: 'data', name: 'Project data.csv', size: '1.2 MB', href: '#' },
      ],
    },
  },
  FilePicker: {
    props: { label: 'Add research files', hint: 'PDF, CSV or images', multiple: true },
  },
  CommentComposer: {
    props: { label: 'Write a comment', placeholder: 'Share an update with the team.' },
  },
  CommentThread: {
    props: {
      items: [
        {
          id: 'one',
          author: 'Ada Lovelace',
          body: 'The first draft is ready for review.',
          time: '5 minutes ago',
        },
        {
          id: 'two',
          author: 'Grace Hopper',
          body: 'I’ll review the methods section today.',
          time: '2 minutes ago',
        },
      ],
    },
  },
  LabelEditor: {
    props: {
      items: [
        { id: 'research', label: 'Research', color: '#005CA9' },
        { id: 'review', label: 'In review', color: '#9B6500' },
        { id: 'done', label: 'Complete', color: '#0F7A4E', locked: true },
      ],
    },
  },
  ColumnManager: { props: { columns } },
  FilterBuilder: {
    props: {
      fields: [
        {
          key: 'name',
          label: 'Project',
          operators: [
            { value: 'contains', label: 'contains' },
            { value: 'eq', label: 'is' },
          ],
        },
        { key: 'team', label: 'Team', operators: [{ value: 'eq', label: 'is' }] },
      ],
      rules: [{ id: 'r1', field: 'name', operator: 'contains', value: 'justice' }],
      match: 'all',
    },
  },
  AccessList: { props: { entries, roles } },
  RoleEditor: {
    props: {
      permissions: [
        {
          key: 'read',
          label: 'View records',
          description: 'Read the records shared with this role.',
        },
        { key: 'edit', label: 'Edit records', description: 'Update shared records.' },
        {
          key: 'manage',
          label: 'Manage workspace',
          description: 'Invite people and change settings.',
        },
      ],
      selected: ['read', 'edit'],
    },
  },
  SharePanel: {
    props: { entries, roles, link: 'https://example.org/projects/open-justice' },
    states: ['default', 'error'],
  },
  SplitPane: { props: { size: 40 }, wide: true },
  WidgetGrid: {
    props: {
      items: [
        { id: 'capacity', title: 'Team capacity' },
        { id: 'activity', title: 'Research activity' },
      ],
    },
    wide: true,
  },
  Tooltip: {
    props: { label: 'Copy project link', text: 'Copy the link to share this project' },
    text: 'Copy link',
    state: 'open',
  },
  DataGrid: {
    props: {
      label: 'Research projects',
      columns,
      rows: [
        { id: 'open', name: 'Open justice', team: 'Research', status: 'On track' },
        { id: 'access', name: 'Public access', team: 'Data science', status: 'In review' },
      ],
      selected: [],
    },
    wide: true,
    states: ['default', 'empty'],
  },
  QuickLinks: {
    props: {
      items: [
        {
          id: 'projects',
          label: 'Research projects',
          href: '#',
          description: 'Explore the team’s work.',
        },
        { id: 'people', label: 'People', href: '#', description: 'Find collaborators.' },
      ],
    },
  },
  TaskList: {
    props: {
      items: [
        {
          id: 'draft',
          title: 'Review the methods section',
          done: false,
          owner: 'Ada Lovelace',
          due: '2026-11-20',
          status: 'In review',
        },
        { id: 'data', title: 'Upload source data', done: true, owner: 'Grace Hopper' },
      ],
    },
  },
  Agenda: {
    props: {
      items: [
        { id: 'updates', title: 'Team updates', minutes: 10, done: true },
        { id: 'review', title: 'Review the research plan', minutes: 20, done: false },
      ],
    },
  },
  ProposalCard: {
    props: {
      title: 'Update project status',
      body: 'The review is complete and the project is ready to move forward.',
      rationale: 'All required review tasks have been completed.',
      changes: [{ label: 'Status', before: 'In review', after: 'Approved' }],
    },
  },
  RecordPreview: {
    props: {
      title: 'Open justice',
      kind: 'Research project',
      description: 'Public access to decisions and research data.',
      href: '#',
    },
    states: ['default', 'restricted'],
  },
  PresenceCursor: { props: { name: 'Ada Lovelace', color: '#005CA9', x: 48, y: 32 } },
  DeadlineList: {
    props: {
      items: [
        { id: 'review', title: 'Methods review', day: '2026-11-20', context: 'Open justice' },
        { id: 'report', title: 'Quarterly report', day: '2026-11-27', context: 'Research team' },
      ],
    },
  },
  StackedBar: {
    props: {
      label: 'Projects by status',
      items: [
        { key: 'active', label: 'Active', value: 8, color: '#005CA9' },
        { key: 'review', label: 'In review', value: 3, color: '#9B6500' },
        { key: 'done', label: 'Complete', value: 5, color: '#0F7A4E' },
      ],
    },
  },
};

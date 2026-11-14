import { newFixtures } from './new-fixtures';
import { blockFixtures } from './block-fixtures';
import {
  options,
  actions,
  people,
  lanes,
  initialCards,
  series,
  calendarItems,
  timelineItems,
  searchItems,
} from '../examples/catalog-data';
export interface Fixture {
  props: Record<string, unknown>;
  text?: string;
  state?: string;
  states?: string[];
  wide?: boolean;
  note?: string;
}
export const fixtures: Record<string, Fixture> = {
  ActionCard: {
    props: { href: '#', title: 'Research projects', copy: 'Explore your team’s ongoing work.' },
  },
  ActivityList: {
    props: {
      label: 'Project activity',
      items: [
        {
          key: 'created',
          actor: 'Ada Lovelace',
          action: 'created Open justice',
          time: '5 minutes ago',
          detail: 'Research workspace',
        },
      ],
    },
  },
  AlertLine: { props: { tone: 'warning' }, text: 'Four projects need a funding review.' },
  AppShell: {
    props: {
      brand: 'Research workspace',
      mark: 'B',
      favicon: false,
      footerText: 'Research workspace',
    },
    text: 'Your team’s projects and activities.',
    wide: true,
  },
  Avatar: { props: { name: 'Ada Lovelace', size: 40 } },
  Badge: { props: { tone: 'success' }, text: 'On track' },
  BarChart: {
    props: {
      points: [
        { label: 'Mon', value: 12 },
        { label: 'Tue', value: 24 },
        { label: 'Wed', value: 18 },
        { label: 'Thu', value: 32 },
        { label: 'Fri', value: 26 },
      ],
      seriesLabel: 'Publications',
    },
  },
  BottomBar: {
    props: {
      managedBy: 'Research workspace',
      links: [
        { label: 'Help', href: '#' },
        { label: 'Privacy', href: '#' },
      ],
    },
  },
  Button: { props: { variant: 'primary' }, text: 'New project', states: ['default', 'disabled','loading'] },
  Calendar: {
    props: { month: '2026-11', items: calendarItems, label: 'Project deadlines' },
    wide: true,
  },
  Callout: {
    props: { tone: 'info', title: 'Your data stays yours' },
    text: 'Only invited teammates can open this workspace.',
  },
  CapacityBar: { props: { allocated: 0.6, available: 0.8, label: 'Allocated team capacity' } },
  Card: { props: { padded: true }, text: 'A quiet surface for a related set of information.' },
  ChartLegend: {
    props: {
      label: 'Funding sources',
      items: [
        { label: 'Secured', color: '#0F7A4E' },
        { label: 'Pipeline', color: '#E8A900', dashed: true },
      ],
    },
  },
  Checklist: {
    props: {
      label: 'Workspace setup',
      items: [
        {
          key: 'profile',
          label: 'Complete your profile',
          description: 'Help your team recognize you.',
          done: true,
        },
        { key: 'invite', label: 'Invite a teammate', done: false },
      ],
    },
  },
  CodeBlock: {
    props: {
      label: 'install.sh',
      language: 'bash',
      code: 'npm install biss-ui@next\n# Import the stylesheet once in your app.',
    },
  },
  CodeTabs: {
    props: {
      samples: [
        { label: 'Vue', language: 'js', code: "import { BissButton } from 'biss-ui/vue';" },
        { label: 'Svelte', language: 'js', code: "import { BissButton } from 'biss-ui/svelte';" },
      ],
    },
  },
  ConfirmDialog: {
    props: {
      modelValue: true,
      title: 'Delete this project?',
      copy: 'The project and its records will be removed.',
      confirmLabel: 'Delete project',
      tone: 'danger',
    },
    text: 'The project and its records will be removed.',
    state: 'open',
    states: ['open', 'busy'],
  },
  ConsoleHeader: {
    props: {
      title: 'Research projects',
      subtitle: 'The team’s ongoing work.',
      crumbs: [{ label: 'Workspace', href: '#' }, { label: 'Projects' }],
    },
  },
  ConsoleLayout: {
    props: {
      brand: 'Research workspace',
      title: 'Projects',
      subtitle: 'The team’s ongoing work.',
      mark: 'B',
      favicon: false,
      user: { name: 'Ada Lovelace', email: 'ada@example.org' },
    },
    text: 'Your projects appear here.',
    wide: true,
  },
  CopyField: { props: { value: 'https://example.org/research', label: 'Public project link' } },
  DataTable: {
    props: {
      columns: [
        { key: 'name', label: 'Project' },
        { key: 'team', label: 'Team' },
        { key: 'status', label: 'Status' },
      ],
      rows: [
        { name: 'Open justice', team: 'Research', status: 'On track' },
        { name: 'Public access', team: 'Data science', status: 'In review' },
      ],
      empty: 'No projects yet.',
    },
    states: ['default', 'empty', 'loading'],
    wide: true,
  },
  DateField: { props: { value: '2026-11-12', label: 'Due date' }, states: ['default', 'open'] },
  DatePicker: {
    props: { value: '2026-11-12', today: '2026-11-12', label: 'Due date' },
    states: ['default', 'range'],
  },
  Dialog: {
    props: {
      open: true,
      title: 'Edit research project',
      description: 'Changes apply to this project.',
    },
    state: 'open',
    states: ['open', 'busy'],
  },
  EditableText: {
    props: { value: 'Open justice', label: 'Edit project title' },
    states: ['default', 'editing'],
  },
  EmptyState: {
    props: {
      title: 'No projects yet',
      copy: 'Create a project to start organizing your team’s work.',
    },
  },
  FeatureCard: {
    props: {
      title: 'Search your research',
      copy: 'Find projects, people and records in one place.',
      icon: 'explorer',
      href: '#',
    },
  },
  Field: {
    props: { label: 'Project name', hint: 'Use a name your teammates recognize.' },
    states: ['default', 'error'],
  },
  GoalBar: {
    props: {
      value: 0.65,
      expected: 0.75,
      label: 'Publication progress: 65 percent',
      tone: 'success',
    },
  },
  GoalCard: {
    props: {
      title: 'Publish open data',
      progress: 0.65,
      expected: 0.75,
      label: 'Publication progress',
      status: 'On track',
      tone: 'success',
    },
  },
  GridShell: {
    props: {
      brand: 'Research workspace',
      mark: 'B',
      favicon: false,
      footerText: 'Research workspace',
    },
    text: 'A public page for your research tools.',
    wide: true,
  },
  GroupedBars: {
    props: { categories: ['2024', '2025', '2026'], series, label: 'Funding by year' },
    wide: true,
  },
  HeaderAction: { props: { label: 'Refresh data', icon: 'refresh' } },
  Hero: {
    props: {
      title: 'Research, together',
      subtitle: 'One place for the team’s projects and records.',
      pills: ['Open data', 'Team research'],
    },
  },
  HeroPill: { props: {}, text: 'Open data' },
  HomeCard: {
    props: {
      title: 'Team capacity',
      icon: 'people',
      note: 'Allocated effort across your team',
      count: 5,
    },
  },
  HomeSkel: { props: { rows: 4, label: 'Loading projects' } },
  Icon: { props: { name: 'folder' } },
  Input: {
    props: {
      modelValue: 'Open justice',
      placeholder: 'Project name',
      'aria-label': 'Project name',
    },
    states: ['default', 'error', 'disabled'],
  },
  Kanban: { props: { lanes, cards: initialCards, label: 'Project board' }, wide: true },
  KpiCard: { props: { label: 'Active projects', value: 12, note: 'Across three teams' } },
  LineChart: { props: { values: [12, 18, 14, 25, 32, 29], label: 'Publication trend' } },
  LiveStatus: { props: { state: 'reconnecting' } },
  Menu: {
    props: { label: 'Project actions', items: actions, searchable: true },
    state: 'open',
    states: ['open', 'filtered'],
  },
  MeterList: {
    props: {
      items: [
        { label: 'Research', value: 12 },
        { label: 'Operations', value: 8 },
        { label: 'Outreach', value: 5 },
      ],
    },
  },
  MiniChart: { props: { type: 'bar' } },
  Modal: {
    props: {
      modelValue: true,
      title: 'Project settings',
      subtitle: 'Update the details your team sees.',
    },
    state: 'open',
  },
  NavItem: { props: { label: 'Projects', href: '#', active: true, meta: '12' } },
  NavSection: { props: { heading: 'Workspace' } },
  NoAccess: {
    props: {
      title: 'Access restricted',
      description: 'Contact the project owner to request access.',
    },
  },
  NoticeRow: {
    props: {
      title: 'Ada mentioned you',
      detail: 'in Open justice',
      meta: 'Research · 5 minutes ago',
      unread: true,
    },
  },
  OnboardingChips: { props: { label: 'Team interests', options, selected: ['research'] } },
  OnboardingFrame: {
    props: {
      title: 'Set up your workspace',
      description: 'Choose the areas your team works in.',
      step: 1,
      steps: 3,
    },
  },
  PageBar: {
    wide:true,
    props: {
      title: 'Research projects',
      description: 'The team’s ongoing work.',
      meta: '12 projects',
    },
  },
  PageHeader: { props: { title: 'Research projects', subtitle: 'The team’s ongoing work.' } },
  PageHint: {
    props: { label: 'About this view', text: 'This view shows projects shared with your team.' },
    state: 'open',
  },
  PeopleCell: { props: { people, limit: 2 } },
  Popover: {
    props: { label: 'Project details' },
    text: 'Choose the people and settings for this project.',
    state: 'open',
  },
  PresenceStack: { props: { people, limit: 3, label: 'People on this page' } },
  PropertyList: {
    props: {
      label: 'Project properties',
      items: [
        { key: 'owner', label: 'Owner', value: 'Ada Lovelace' },
        { key: 'team', label: 'Team', value: 'Research' },
      ],
    },
  },
  RecordChip: { props: { label: 'Open justice', icon: 'folder', meta: 'Project', href: '#' } },
  SaveBar: {
    props: { show: true, note: 'Unsaved changes' },
    states: ['default', 'error', 'saving'],
  },
  SearchInput: {
    props: { modelValue: '', placeholder: 'Search projects', 'aria-label': 'Search projects' },
  },
  SearchPalette: {
    props: { open: true, label: 'Search workspace', items: searchItems },
    state: 'open',
    states: ['open', 'empty', 'loading'],
  },
  SectionHeader: {
    props: { title: 'Team capacity', copy: 'How much time the team has available.' },
  },
  Select: {
    props: {
      modelValue: 'research',
      options: [
        { value: 'research', label: 'Research' },
        { value: 'operations', label: 'Operations' },
      ],
      'aria-label': 'Team',
    },
  },
  SelectPicker: { props: { label: 'Choose team', value: 'research', options }, state: 'open' },
  ServiceIcon: { props: { icon: 'explorer', label: 'Research explorer' } },
  SettingsHead: {
    props: {
      title: 'Notifications',
      help: 'Choose what you hear about.',
      more: 'You can change these settings at any time.',
    },
  },
  SidePanel: {
    props: { open: true, title: 'Project record', description: 'Open justice' },
    state: 'open',
  },
  SidebarUser: { props: { name: 'Ada Lovelace', email: 'ada@example.org', signOut: true } },
  Skeleton: { props: { lines: 3 } },
  StatList: {
    props: {
      items: [
        { label: 'Active projects', value: 12 },
        { label: 'Team members', value: 8 },
        { label: 'Publications', value: 24 },
      ],
    },
  },
  StatusCell: { props: { label: 'On track', color: '#0F7A4E' } },
  Step: {
    props: {
      index: 2,
      title: 'Invite the team',
      copy: 'Add the people who work with you.',
      current: true,
    },
  },
  Steps: { props: {} },
  SummaryStrip: {
    props: {
      label: 'Project summary',
      items: [
        { label: 'Active projects', value: '12', sub: 'Across three teams', color: '#005CA9' },
        { label: 'On track', value: '8', sub: 'Four need attention', color: '#0F7A4E' },
        { label: 'Funding secured', value: '€240k', sub: 'This year' },
      ],
    },
  },
  SwatchPicker: { props: { label: 'Group color', value: 'blue' }, state: 'open' },
  Switch: { props: { modelValue: true, label: 'Email notifications' } },
  Tab: { props: { label: 'Projects', active: true } },
  TableAddRow: { props: { label: 'Add research project' } },
  TableGroup: { props: { label: 'Research projects', count: 2 } },
  TableHead: { props: { label: 'Project title', sort: 'asc' } },
  TablePager: { props: { page: 1, total: 72, pageSize: 25 } },
  TableTotal: { props: { label: 'Total', value: '€240k' } },
  TagInput: {
    props: {
      modelValue: ['Research', 'Open data'],
      placeholder: 'Add a label',
      'aria-label': 'Project labels',
    },
  },
  Textarea: {
    props: {
      modelValue: 'Prepare a first draft for the team.',
      placeholder: 'Project description',
      'aria-label': 'Project description',
    },
  },
  Timeline: {
    props: {
      from: '2026-11-01',
      to: '2026-11-30',
      items: timelineItems,
      label: 'Project timeline',
    },
    wide: true,
  },
  ToastStack: { props: {}, state: 'visible' },
  ToolButton: {
    props: { label: 'Filters', icon: 'filter', count: 2, active: true, clearable: true },
  },
  ToolNew: { props: { label: 'New project', items: actions } },
  ToolSearch: { props: { label: 'Find records', value: 'research' } },
  Toolbar: { props: { label: 'Project tools' } },
  TopBar: {
    props: {
      brand: 'Research workspace',
      mark: 'B',
      favicon: false,
      links: [
        { label: 'Projects', href: '#' },
        { label: 'Team', href: '#' },
      ],
    },
  },
  ValuePicker: {
    props: { label: 'Filter teams', options, selected: ['research'], canNegate: true },
  },
  ViewTabs: {
    props: {
      label: 'Project views',
      modelValue: 'all',
      items: [
        { key: 'all', label: 'All projects', count: 12 },
        { key: 'mine', label: 'My projects', count: 4 },
        { key: 'archived', label: 'Archived', disabled: true },
      ],
    },
  },
};
Object.assign(fixtures, newFixtures, blockFixtures);
export function fixture(name: string, state = 'default'): Fixture {
  const base = fixtures[name.replace(/^Biss/, '')];
  if (!base) throw new Error('No fixture for ' + name);
  const f = { ...base, props: structuredClone(base.props) };
  if (state === 'restricted') f.props.restricted = true;
  if (state === 'disabled') {
    f.props.disabled = true;
  }
  if (state === 'error') {
    if (name === 'BissSharePanel') f.props.error = 'Invitation could not be sent. Try again.';
    else if (name === 'BissSaveBar')
      f.props.error = 'Could not save. Check your connection and try again.';
    else if (name === 'BissField') f.props.error = 'Enter a project name.';
    else f.props.invalid = true;
  }
  if (state === 'saving') f.props.saving = true;
  if (state === 'busy') f.props.busy = true;
  if (state === 'empty') {
    if (['BissDataTable', 'BissDataGrid'].includes(name)) f.props.rows = [];
    else f.props.items = [];
  }
  if (state === 'loading') f.props.loading = true;
  if (state === 'range' && name === 'BissSlider') f.props.modelValue = [20, 80];
  else if (state === 'range')
    Object.assign(f.props, { range: true, start: '2026-11-12', end: '2026-11-20' });
  if (state === 'indeterminate') f.props.value = null;
  return f;
}

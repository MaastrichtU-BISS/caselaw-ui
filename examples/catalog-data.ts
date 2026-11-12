import type {
  BissMenuItem,
  BissPickOption,
  BissBoardCard,
  BissBoardLane,
  BissBarSeries,
} from '../src/library-types';
export const options: BissPickOption[] = [
  { value: 'research', label: 'Research', count: 12, color: '#005CA9', group: 'Teams' },
  { value: 'operations', label: 'Operations', count: 4, color: '#0F7A4E', group: 'Teams' },
  { value: 'archived', label: 'Archived', disabled: true, group: 'Other' },
];
export const actions: BissMenuItem[] = [
  {
    key: 'export',
    label: 'Export',
    icon: 'send',
    children: [
      { key: 'csv', label: 'CSV file', description: 'A spreadsheet of the visible rows' },
      { key: 'pdf', label: 'PDF document' },
    ],
  },
  { key: 'rename', label: 'Rename', icon: 'edit', hint: 'Enter' },
  { key: 'delete', label: 'Delete', icon: 'trash', danger: true, disabled: true, separator: true },
];
export const people = [
  { id: 'ada', name: 'Ada Lovelace' },
  { id: 'grace', name: 'Grace Hopper' },
  { id: 'alan', name: 'Alan Turing' },
  { id: 'mary', name: 'Mary Jackson' },
  { id: 'katherine', name: 'Katherine Johnson' },
];
export const lanes: BissBoardLane[] = [
  { id: 'todo', label: 'Planned', color: '#005CA9' },
  { id: 'doing', label: 'In progress', color: '#E8A900' },
  { id: 'done', label: 'Complete', color: '#0F7A4E' },
];
export const initialCards: BissBoardCard[] = [
  {
    id: 'review',
    title: 'Review access policy',
    lane: 'todo',
    description: 'Prepare a first draft for the team.',
    owner: 'Ada Lovelace',
    due: '2026-11-16',
  },
  {
    id: 'dataset',
    title: 'Publish dataset',
    lane: 'doing',
    owner: 'Grace Hopper',
    due: '2026-11-20',
  },
];
export const series: BissBarSeries[] = [
  { key: 'planned', label: 'Planned', color: '#005CA9', values: [30, 45, 40], ghost: true },
  { key: 'received', label: 'Received', color: '#0F7A4E', values: [20, 38, 36] },
];
export const calendarItems = [
  { id: 'review', title: 'Review access policy', day: '2026-11-16', color: '#005CA9' },
  { id: 'publish', title: 'Publish dataset', day: '2026-11-20', color: '#0F7A4E' },
];
export const timelineItems = [
  { id: 'review', title: 'Access review', start: '2026-11-03', end: '2026-11-16' },
  {
    id: 'publish',
    title: 'Data publication',
    start: '2026-11-12',
    end: '2026-11-25',
    color: '#0F7A4E',
  },
];
export const searchItems = [
  {
    key: 'open-justice',
    label: 'Open justice',
    description: 'Research project',
    group: 'Projects',
    icon: 'folder' as const,
  },
  {
    key: 'ada',
    label: 'Ada Lovelace',
    description: 'Research lead',
    group: 'People',
    icon: 'user' as const,
  },
];

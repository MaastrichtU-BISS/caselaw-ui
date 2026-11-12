import type { BissIconName } from './icon-names';
export type BissColor = 'blue' | 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'orange' | 'grey';
export interface BissPickOption {
  value: string;
  label: string;
  count?: number;
  color?: string;
  disabled?: boolean;
  group?: string;
  description?: string;
}
export interface BissMenuItem {
  key: string;
  label: string;
  icon?: BissIconName;
  description?: string;
  hint?: string;
  disabled?: boolean;
  danger?: boolean;
  checked?: boolean;
  href?: string;
  children?: BissMenuItem[];
  separator?: boolean;
}
export interface BissPerson {
  id: string;
  name: string;
  color?: string;
}
export interface BissBarSeries {
  key: string;
  label: string;
  color: string;
  values: number[];
  ghost?: boolean;
}
export interface BissSearchItem {
  key: string;
  label: string;
  description?: string;
  group?: string;
  icon?: BissIconName;
  disabled?: boolean;
}
export const bissSwatches: { value: BissColor; label: string; color: string }[] = [
  { value: 'blue', label: 'Blue', color: '#005CA9' },
  { value: 'sky', label: 'Sky', color: '#7FB2E0' },
  { value: 'yellow', label: 'Yellow', color: '#E8A900' },
  { value: 'green', label: 'Green', color: '#0F7A4E' },
  { value: 'red', label: 'Red', color: '#D4372C' },
  { value: 'violet', label: 'Violet', color: '#7A3FB8' },
  { value: 'orange', label: 'Orange', color: '#E07B2A' },
  { value: 'grey', label: 'Grey', color: '#A8A49C' },
];
export interface BissBoardCard {
  id: string;
  title: string;
  lane: string;
  description?: string;
  owner?: string;
  due?: string;
  color?: string;
}
export interface BissBoardLane {
  id: string;
  label: string;
  color?: string;
}
export interface BissCalendarItem {
  id: string;
  title: string;
  day: string;
  color?: string;
}
export interface BissTimelineItem {
  id: string;
  title: string;
  start: string;
  end: string;
  color?: string;
}

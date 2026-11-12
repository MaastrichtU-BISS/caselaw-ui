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
export interface BissLabel {
  id: string;
  label: string;
  color: string;
  count?: number;
  locked?: boolean;
}
export interface BissColumn {
  key: string;
  label: string;
  visible: boolean;
  width?: number;
  pinned?: boolean;
  locked?: boolean;
}
export interface BissFilterField {
  key: string;
  label: string;
  operators: { value: string; label: string }[];
}
export interface BissFilterRule {
  id: string;
  field: string;
  operator: string;
  value: string;
}
export interface BissAccessEntry {
  id: string;
  name: string;
  email?: string;
  role: string;
  inherited?: boolean;
  editable?: boolean;
}
export interface BissPermission {
  key: string;
  label: string;
  description?: string;
  group?: string;
  disabled?: boolean;
}
export interface BissComment {
  id: string;
  author: string;
  body: string;
  time: string;
  edited?: boolean;
}
export interface BissAttachment {
  id: string;
  name: string;
  size?: string;
  href?: string;
  type?: string;
  removable?: boolean;
}

export type BissTableColumn = {
  key: string;
  label: string;
  /** Right-aligns and tabular-aligns the column. Use for counts and amounts. */
  numeric?: boolean;
  /** Collapses the column to its content and right-aligns it. Use for row actions. */
  actions?: boolean;
  /** Columns sort by default; set false to opt out. */
  sortable?: boolean;
  width?: string;
};

export type BissTone = 'neutral' | 'success' | 'danger' | 'warning' | 'info';

export type BissOption = {
  label: string;
  value: string | number;
};

export type BissCrumb = {
  label: string;
  href?: string;
};

export type BissStat = {
  label: string;
  value: string | number;
};

export type BissChartPoint = {
  label: string;
  value: number;
  /** Secondary value drawn inside the bar, e.g. denials within total requests. */
  compare?: number;
};

export type BissMeterItem = {
  label: string;
  value: number;
  /** Overrides the printed value when it needs formatting. */
  display?: string;
};

/** The signed-in account shown at the foot of a console sidebar. */
export interface BissConsoleUser {
  name: string;
  email?: string;
  /** Two letters at most. Derived from the name when not given. */
  initials?: string;
}

/** One language's version of a code sample. */
export interface BissCodeSample {
  label: string;
  code: string;
  /** Overrides detection, which normally reads the code then the label. */
  language?: string;
}

export type BissLink = {
  label: string;
  href: string;
  /** A different origin. Affects `rel`, not where the link opens. */
  external?: boolean;
  /**
   * Open in a new tab.
   *
   * Off by default, including for `external`. Moving between Case Law Explorer
   * products is ordinary navigation, and opening each one in its own tab left
   * people managing tabs they never asked for. Reserve this for third-party
   * destinations someone is unlikely to want to leave the page for.
   */
  newTab?: boolean;
};

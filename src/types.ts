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

export type BissTone = "neutral" | "success" | "danger" | "warning" | "info";

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

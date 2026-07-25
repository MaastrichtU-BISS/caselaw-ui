export type CleTableColumn = {
  key: string;
  label: string;
  /** Right-aligns and tabular-aligns the column. Use for counts and amounts. */
  numeric?: boolean;
  /** Collapses the column to its content and right-aligns it. Use for row actions. */
  actions?: boolean;
  sortable?: boolean;
  width?: string;
};

export type CleTone = "neutral" | "success" | "danger" | "warning" | "info";

export type CleOption = {
  label: string;
  value: string | number;
};

export type CleCrumb = {
  label: string;
  href?: string;
};

export type CleStat = {
  label: string;
  value: string | number;
};

export type CleChartPoint = {
  label: string;
  value: number;
  /** Secondary value drawn inside the bar, e.g. denials within total requests. */
  compare?: number;
};

export type CleMeterItem = {
  label: string;
  value: number;
  /** Overrides the printed value when it needs formatting. */
  display?: string;
};

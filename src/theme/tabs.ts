/** Shared Bizzy tabs recipe. Behavior stays in each framework's primitive provider. */
export const bissTabsTheme = {
  slots: {
    list: 'biss-tabs-list',
    trigger: 'biss-tabs-trigger',
    count: 'biss-tabs-count',
    content: 'biss-tabs-content',
  },
  variants: ['line', 'segmented'],
  sizes: ['sm', 'md'],
} as const;
export type BissTabsVariant = (typeof bissTabsTheme.variants)[number];
export type BissTabsSize = (typeof bissTabsTheme.sizes)[number];
export type BissTabsUi = Partial<Record<keyof typeof bissTabsTheme.slots, string>>;
/** One tab in the convenient `BissTabs` wrapper. */
export interface BissTabsItem {
  value: string;
  label: string;
  disabled?: boolean;
  /** Optional count shown after the label, for example the number of records in that view. */
  count?: number;
}

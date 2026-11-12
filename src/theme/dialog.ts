/** Shared Bizzy dialog recipe. Behavior stays in each framework's primitive provider. */
export const bissDialogTheme = {
  slots: {
    overlay: 'biss-dialog-overlay',
    content: 'biss-dialog-content',
    header: 'biss-dialog-header',
    title: 'biss-dialog-title',
    description: 'biss-dialog-description',
    body: 'biss-dialog-body',
    footer: 'biss-dialog-footer',
    close: 'biss-dialog-close',
  },
  sizes: { sm: 360, md: 520, lg: 720 },
} as const;
export type BissDialogSize = keyof typeof bissDialogTheme.sizes;
export type BissDialogUi = Partial<Record<keyof typeof bissDialogTheme.slots, string>>;

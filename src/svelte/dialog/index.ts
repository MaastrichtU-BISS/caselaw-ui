import { Dialog } from 'bits-ui';
export const Root = Dialog.Root,
  Trigger = Dialog.Trigger,
  Close = Dialog.Close,
  Portal = Dialog.Portal;
export { default as Content } from './DialogContent.svelte';
export { default as Overlay } from './DialogOverlay.svelte';
export type RootProps = Dialog.RootProps;
export type TriggerProps = Dialog.TriggerProps;
export type ContentProps = import('svelte').ComponentProps<
  typeof import('./DialogContent.svelte').default
>;
export type TitleProps = Dialog.TitleProps;
export type DescriptionProps = Dialog.DescriptionProps;
export type CloseProps = Dialog.CloseProps;
export type PortalProps = Dialog.PortalProps;

export { default as Title } from './DialogTitle.svelte';
export { default as Description } from './DialogDescription.svelte';
export type OverlayProps = Dialog.OverlayProps;

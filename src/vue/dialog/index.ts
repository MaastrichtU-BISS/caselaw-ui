export {
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogClose as Close,
  DialogPortal as Portal,
} from 'reka-ui';
export { default as Content } from './DialogContent.vue';
export { default as Overlay } from './DialogOverlay.vue';
export type {
  DialogRootProps as RootProps,
  DialogTriggerProps as TriggerProps,
  DialogCloseProps as CloseProps,
  DialogTitleProps as TitleProps,
  DialogDescriptionProps as DescriptionProps,
  DialogPortalProps as PortalProps,
} from 'reka-ui';

export { default as Title } from './DialogTitle.vue';
export { default as Description } from './DialogDescription.vue';
export type ContentProps = InstanceType<typeof import('./DialogContent.vue').default>['$props'];
export type OverlayProps = InstanceType<typeof import('./DialogOverlay.vue').default>['$props'];

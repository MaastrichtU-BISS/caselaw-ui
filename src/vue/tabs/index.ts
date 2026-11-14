export { TabsRoot as Root } from 'reka-ui';
export { default as List } from './TabsList.vue';
export { default as Trigger } from './TabsTrigger.vue';
export { default as Content } from './TabsContent.vue';
export type {
  TabsRootProps as RootProps,
  TabsRootEmits as RootEmits,
  TabsTriggerProps as TriggerProps,
  TabsContentProps as ContentProps,
} from 'reka-ui';
export type ListProps = InstanceType<typeof import('./TabsList.vue').default>['$props'];
export type {
  BissTabsItem as Item,
  BissTabsSize as Size,
  BissTabsVariant as Variant,
  BissTabsUi as Ui,
} from '../../theme/tabs';

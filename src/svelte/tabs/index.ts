import { Tabs } from 'bits-ui';
export const Root = Tabs.Root;
export { default as List } from './TabsList.svelte';
export { default as Trigger } from './TabsTrigger.svelte';
export { default as Content } from './TabsContent.svelte';
export type RootProps = Tabs.RootProps;
export type ListProps = import('svelte').ComponentProps<typeof import('./TabsList.svelte').default>;
export type TriggerProps = Tabs.TriggerProps;
export type ContentProps = Tabs.ContentProps;
export type {
  BissTabsItem as Item,
  BissTabsSize as Size,
  BissTabsVariant as Variant,
  BissTabsUi as Ui,
} from '../../theme/tabs';

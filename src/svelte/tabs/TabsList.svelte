<script lang="ts">
  import { Tabs } from 'bits-ui';
  import { bissTabsTheme, type BissTabsSize, type BissTabsVariant } from '../../theme/tabs';
  let {
    variant = 'line',
    size = 'md',
    class: className,
    ref = $bindable(null),
    ...rest
  }: Tabs.ListProps & { variant?: BissTabsVariant; size?: BissTabsSize } = $props();
</script>

<Tabs.List
  {...rest}
  bind:ref
  class={[bissTabsTheme.slots.list, className]}
  data-variant={variant}
  data-size={size}
/>

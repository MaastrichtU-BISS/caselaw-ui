<script lang="ts">
  import { Tabs } from 'bits-ui';
  import { bissTabsTheme } from '../../theme/tabs';
  let { class: className, ref = $bindable(null), ...rest }: Tabs.ContentProps = $props();
</script>

<Tabs.Content {...rest} bind:ref class={[bissTabsTheme.slots.content, className]} />

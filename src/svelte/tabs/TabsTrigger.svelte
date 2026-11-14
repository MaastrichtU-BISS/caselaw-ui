<script lang="ts">
  import { Tabs } from 'bits-ui';
  import { bissTabsTheme } from '../../theme/tabs';
  let { class: className, ref = $bindable(null), ...rest }: Tabs.TriggerProps = $props();
</script>

<Tabs.Trigger {...rest} bind:ref class={[bissTabsTheme.slots.trigger, className]} />

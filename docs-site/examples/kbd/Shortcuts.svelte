<script lang="ts">
  import { BissKbd } from 'biss-ui/svelte';
</script>

<span>Search <BissKbd keys={['⌘', 'K']} label="Command K" /></span>
<span>Close <BissKbd keys="Esc" label="Escape" /></span>
<span>Next <BissKbd keys={['Shift', 'Tab']} separator="+" size="sm" /></span>

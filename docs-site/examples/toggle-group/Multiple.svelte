<script lang="ts">
  import { BissToggleGroup } from 'biss-ui/svelte';

  let marks = $state<string[]>(['bold']);
  const items = [
    { value: 'bold', label: 'Bold', icon: 'bold' as const },
    { value: 'italic', label: 'Italic', icon: 'italic' as const },
    { value: 'strike', label: 'Strikethrough', icon: 'strike' as const },
  ];
</script>

<BissToggleGroup bind:value={marks} {items} label="Text style" type="multiple" iconOnly size="sm" />

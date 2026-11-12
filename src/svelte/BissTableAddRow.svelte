<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../icon-names';
  let {
    label,
    disabled = false,
    onadd,
  }: { label: string; disabled?: boolean; onadd?: () => void } = $props();
  type Events = { add: [] };
  const handlers = {
    get add() {
      return onadd;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<button class="biss-table-add" type="button" {disabled} onclick={() => emit('add')}
  ><BissIcon name="plus" />{label}</button
>

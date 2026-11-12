<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissIcon from './BissIcon.svelte';
  import type { BissIconName } from '../core/icon-names';
  import type { BissAttachment } from '../core/types';
  let {
    items,
    label = 'Attachments',
    removeLabel = 'Remove',
    onremove,
  }: {
    items: BissAttachment[];
    label?: string;
    removeLabel?: string;
    onremove?: (id: string) => void;
  } = $props();
  type Events = { remove: [id: string] };
  const handlers = {
    get remove() {
      return onremove;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<ul class="biss-attachment-list" aria-label={label}>
  {#each items as item (item.id)}<li>
      <BissIcon name="paperclip" />
      <div class="biss-grow">
        {#if item.href}<a href={item.href}>{item.name}</a>{:else}<span>{item.name}</span
          >{/if}{#if item.size}<small>{item.size}</small>{/if}
      </div>
      {#if item.removable}<button
          type="button"
          class="biss-header-action"
          aria-label={removeLabel + ' ' + item.name}
          onclick={() => emit('remove', item.id)}><BissIcon name="x" /></button
        >{/if}
    </li>{/each}
</ul>

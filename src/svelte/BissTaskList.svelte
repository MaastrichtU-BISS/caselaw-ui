<script lang="ts">
  import type { Snippet } from 'svelte';
  import BissAvatar from './BissAvatar.svelte';
  let {
    items,
    label = 'Tasks',
    completeLabel = 'Complete',
    oncomplete,
    onopen,
  }: {
    items: {
      id: string;
      title: string;
      done: boolean;
      owner?: string;
      due?: string;
      status?: string;
      readonly?: boolean;
    }[];
    label?: string;
    completeLabel?: string;
    oncomplete?: (value: { id: string; done: boolean }) => void;
    onopen?: (id: string) => void;
  } = $props();
  type Events = { complete: [value: { id: string; done: boolean }]; open: [id: string] };
  const handlers = {
    get complete() {
      return oncomplete;
    },
    get open() {
      return onopen;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<section class="biss-task-list" aria-label={label}>
  {#each items as item (item.id)}<div data-done={item.done}>
      <input
        type="checkbox"
        checked={item.done}
        disabled={item.readonly}
        aria-label={completeLabel + ' ' + item.title}
        onchange={() => emit('complete', { id: item.id, done: !item.done })}
      /><button type="button" class="biss-task-title" onclick={() => emit('open', item.id)}
        >{item.title}</button
      >{#if item.status}<small>{item.status}</small>{/if}{#if item.owner}<BissAvatar
          name={item.owner}
          size={22}
        />{/if}{#if item.due}<time datetime={item.due}>{item.due}</time>{/if}
    </div>{/each}
</section>

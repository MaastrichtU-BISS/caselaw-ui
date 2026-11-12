<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BissTimelineItem } from '../library-types';
  import { timelineSpan } from '../portable';
  let {
    from,
    to,
    items,
    label,
    onopen,
  }: {
    from: string;
    to: string;
    items: BissTimelineItem[];
    label: string;
    onopen?: (id: string) => void;
  } = $props();
  type Events = { open: [id: string] };
  const handlers = {
    get open() {
      return onopen;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
  const span = (item: BissTimelineItem) => timelineSpan(from, to, item.start, item.end);
</script>

<div class="biss-timeline" role="group" aria-label={label}>
  <div class="biss-timeline-axis"><span>{from}</span><span>{to}</span></div>
  {#each items as item (item.id)}<div class="biss-timeline-row">
      <span>{item.title}</span>
      <div>
        <button
          type="button"
          aria-label={item.title + ': ' + item.start + ' – ' + item.end}
          style:left={span(item).left + '%'}
          style:width={span(item).width + '%'}
          style:background={item.color ?? 'var(--biss-primary)'}
          onclick={() => emit('open', item.id)}>{item.title}</button
        >
      </div>
    </div>{/each}
</div>

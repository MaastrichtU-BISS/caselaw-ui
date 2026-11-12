<script lang="ts">
  import type { Snippet } from 'svelte';
  import { resizeHandle } from '../core/dom';
  let {
    size = 40,
    min = 20,
    max = 80,
    label = 'Resize panels',
    onresize,
    start,
    end,
  }: {
    size?: number;
    min?: number;
    max?: number;
    label?: string;
    onresize?: (value: number) => void;
    start?: Snippet;
    end?: Snippet;
  } = $props();
  type Events = { resize: [value: number] };
  const handlers = {
    get resize() {
      return onresize;
    },
  };
  function emit<K extends keyof Events>(name: K, ...args: Events[K]) {
    (handlers[name] as ((...args: Events[K]) => void) | undefined)?.(...args);
  }
</script>

<div class="biss-split-pane" style:--split-size={Math.max(min, Math.min(max, size)) + '%'}>
  <div>
    {#if start}{@render start()}{/if}
  </div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (A window splitter is a keyboard-focusable ARIA separator with range values.) -->
  <div
    tabindex="0"
    role="separator"
    aria-orientation="vertical"
    aria-label={label}
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={size}
    class="biss-split-handle"
    use:resizeHandle={{
      value: size,
      min,
      max,
      percent: true,
      onchange: (value: number) => emit('resize', value),
    }}
  ></div>
  <div>
    {#if end}{@render end()}{/if}
  </div>
</div>

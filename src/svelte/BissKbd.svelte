<script lang="ts">
  import type { Snippet } from 'svelte';
  let {
    keys,
    label,
    separator = '',
    size = 'md',
    children,
  }: {
    /** One key, or a combination such as `['⌘', 'K']`. */
    keys?: string | string[];
    /** Spoken name, for example "Command K", since symbols like ⌘ read poorly. */
    label?: string;
    /** Text between keys of a combination; empty by default. */
    separator?: string;
    size?: 'sm' | 'md';
    children?: Snippet;
  } = $props();
  const list = $derived(keys === undefined ? [] : Array.isArray(keys) ? keys : [keys]);
</script>

<span class="biss-kbd-combo" data-size={size}
  >{#if label}<span class="biss-visually-hidden">{label}</span>{/if}<span
    class="biss-kbd-keys"
    aria-hidden={label ? 'true' : undefined}
    >{#if list.length}{#each list as key, index (index)}{#if index && separator}<span
            class="biss-kbd-separator">{separator}</span
          >{/if}<kbd class="biss-kbd">{key}</kbd>{/each}{:else}<kbd class="biss-kbd"
        >{@render children?.()}</kbd
      >{/if}</span
  ></span
>

<script lang="ts">
  interface Props {
    items: { key: string; label: string; count?: number; disabled?: boolean }[];
    value: string;
    label: string;
    end?: import('svelte').Snippet;
    onchange?: (value: string) => void;
  }

  let { items, value = $bindable(), label, end, onchange }: Props = $props();
</script>

<nav class="biss-view-tabs" aria-label={label}>
  {#each items as item}<button
      type="button"
      disabled={item.disabled}
      aria-pressed={value === item.key}
      onclick={() => {
        value = item.key;
        onchange?.(value);
      }}
      >{item.label}{#if item.count !== undefined}<small>{item.count}</small>{/if}</button
    >{/each}{@render end?.()}
</nav>

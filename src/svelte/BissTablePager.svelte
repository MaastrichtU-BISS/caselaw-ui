<script lang="ts">
  interface Props {
    page: number;
    total: number;
    pageSize?: number;
    label?: string;
    previousLabel?: string;
    nextLabel?: string;
    children?: import('svelte').Snippet;
    onchange?: (value: number) => void;
  }

  let {
    page = $bindable(),
    total,
    pageSize = 25,
    label = 'Pagination',
    previousLabel = 'Previous',
    nextLabel = 'Next',
    children,
    onchange,
  }: Props = $props();
  let pages = $derived(Math.max(1, Math.ceil(total / Math.max(1, pageSize))));
  function go(n: number) {
    page = n;
    onchange?.(n);
  }
</script>

<nav class="biss-pager" aria-label={label}>
  <span aria-live="polite">{Math.min(page, pages)} / {pages}</span><button
    class="biss-button biss-button-ghost"
    type="button"
    disabled={page <= 1}
    onclick={() => go(Math.max(1, page - 1))}>{previousLabel}</button
  ><button
    class="biss-button biss-button-ghost"
    type="button"
    disabled={page >= pages}
    onclick={() => go(Math.min(pages, page + 1))}>{nextLabel}</button
  >{@render children?.()}
</nav>

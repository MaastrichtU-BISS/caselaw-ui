<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let page: number;
  export let total: number;
  export let pageSize = 25;
  export let label = 'Pagination';
  export let previousLabel = 'Previous';
  export let nextLabel = 'Next';
  const dispatch = createEventDispatcher();
  $: pages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  function go(n: number) {
    page = n;
    dispatch('change', n);
  }
</script>

<nav class="biss-pager" aria-label={label}>
  <span aria-live="polite">{Math.min(page, pages)} / {pages}</span><button
    class="biss-button biss-button-ghost"
    type="button"
    disabled={page <= 1}
    on:click={() => go(Math.max(1, page - 1))}>{previousLabel}</button
  ><button
    class="biss-button biss-button-ghost"
    type="button"
    disabled={page >= pages}
    on:click={() => go(Math.min(pages, page + 1))}>{nextLabel}</button
  ><slot />
</nav>

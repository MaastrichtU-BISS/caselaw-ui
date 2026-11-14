<script lang="ts">
  import BissIcon from './BissIcon.svelte';
  import { clampPage, pageCount, pageRange, paginationRange } from '../core/pagination';
  let {
    page = $bindable(1),
    pageSize = $bindable(25),
    total,
    pages,
    pageSizes,
    siblings = 1,
    boundaries = 1,
    label = 'Pagination',
    previousLabel = 'Previous page',
    nextLabel = 'Next page',
    pageLabel = 'Page {page}',
    pageSizeLabel = 'Rows per page',
    rangeLabel = '{start}–{end} of {total}',
    disabled = false,
    onchange,
    onpagesize,
  }: {
    page?: number;
    pageSize?: number;
    /** Total number of records; use `pages` instead when only the page count is known. */
    total?: number;
    /** Number of pages, overriding the count derived from `total` and `pageSize`. */
    pages?: number;
    /** Offer these page sizes in a select. Omit to hide the page-size control. */
    pageSizes?: number[];
    /** Pages shown on each side of the current page. */
    siblings?: number;
    /** Pages always shown at the start and end. */
    boundaries?: number;
    label?: string;
    previousLabel?: string;
    nextLabel?: string;
    /** Accessible name of each page button; `{page}` is replaced. */
    pageLabel?: string;
    pageSizeLabel?: string;
    /** Visible record range when `total` is known; `{start}`, `{end}` and `{total}` are replaced. */
    rangeLabel?: string;
    disabled?: boolean;
    /** Called with the newly selected page. */
    onchange?: (page: number) => void;
    /** Called with the newly selected page size. */
    onpagesize?: (size: number) => void;
  } = $props();
  const count = $derived(
    pages !== undefined ? Math.max(1, pages) : pageCount(total ?? 0, pageSize),
  );
  const current = $derived(clampPage(page, count));
  const items = $derived(paginationRange(current, count, { siblings, boundaries }));
  const summary = $derived.by(() => {
    if (total === undefined) return '';
    const r = pageRange(current, pageSize, total);
    return rangeLabel
      .replace('{start}', String(r.start))
      .replace('{end}', String(r.end))
      .replace('{total}', String(r.total));
  });
  function go(next: number) {
    const target = clampPage(next, count);
    if (target === current) return;
    page = target;
    onchange?.(target);
  }
  function resize(event: Event & { currentTarget: HTMLSelectElement }) {
    const size = Number(event.currentTarget.value);
    const first = (current - 1) * pageSize;
    pageSize = size;
    onpagesize?.(size);
    const target = Math.floor(first / size) + 1;
    if (target !== page) {
      page = target;
      onchange?.(target);
    }
  }
</script>

<nav class="biss-pagination" aria-label={label}>
  {#if summary}<p class="biss-pagination-summary" aria-live="polite">{summary}</p>{/if}
  {#if pageSizes?.length}<label class="biss-pagination-size"
      ><span>{pageSizeLabel}</span><select
        class="biss-select"
        value={pageSize}
        {disabled}
        onchange={resize}
        >{#each pageSizes as size (size)}<option value={size}>{size}</option>{/each}</select
      ></label
    >{/if}
  <ul class="biss-pagination-list">
    <li>
      <button
        type="button"
        class="biss-pagination-button"
        aria-label={previousLabel}
        disabled={disabled || current <= 1}
        onclick={() => go(current - 1)}><BissIcon name="chevLeft" /></button
      >
    </li>
    {#each items as item (item.type === 'page' ? item.page : item.key)}<li>
        {#if item.type === 'page'}<button
            type="button"
            class="biss-pagination-button"
            aria-label={pageLabel.replace('{page}', String(item.page))}
            aria-current={item.page === current ? 'page' : undefined}
            {disabled}
            onclick={() => go(item.page)}>{item.page}</button
          >{:else}<span class="biss-pagination-ellipsis" aria-hidden="true">…</span>{/if}
      </li>{/each}
    <li>
      <button
        type="button"
        class="biss-pagination-button"
        aria-label={nextLabel}
        disabled={disabled || current >= count}
        onclick={() => go(current + 1)}><BissIcon name="chev" /></button
      >
    </li>
  </ul>
</nav>

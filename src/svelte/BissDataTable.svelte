<script lang="ts">
  import type { BissTableColumn } from "../types";

  let {
    columns,
    rows,
    empty = "No rows",
  }: {
    columns: BissTableColumn[];
    rows: Record<string, unknown>[];
    empty?: string;
  } = $props();
</script>

<div class="biss-table-wrap">
  <table class="biss-table">
    <thead>
      <tr>
        {#each columns as column}
          <th>{column.label}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if rows.length === 0}
        <tr><td colspan={columns.length}>{empty}</td></tr>
      {:else}
        {#each rows as row}
          <tr>
            {#each columns as column}
              <td>{row[column.key] ?? ""}</td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

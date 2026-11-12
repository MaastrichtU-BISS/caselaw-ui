<script lang="ts">
  export let items: { label: string; value: string; sub?: string; color?: string }[];
  export let label: string;
</script>

<dl class="biss-summary-strip" aria-label={label}>
  {#each items as item}<div>
      <dt>
        {#if item.color}<i style:background={item.color}></i>{/if}{item.label}
      </dt>
      <dd>
        {item.value}{#if item.sub}<small>{item.sub}</small>{/if}
      </dd>
    </div>{/each}
</dl>

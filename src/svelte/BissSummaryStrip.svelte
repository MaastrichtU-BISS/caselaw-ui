<script lang="ts">
  interface Props {
    items: { label: string; value: string; sub?: string; color?: string }[];
    label: string;
  }

  let { items, label }: Props = $props();
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

<script lang="ts">
  let {
    label,
    value,
    note,
  }: {
    label: string;
    value: string | number;
    note?: string;
  } = $props();
</script>

<article class="biss-card biss-kpi-card">
  <div class="biss-kpi-label">{label}</div>
  <div class="biss-kpi-value">{value}</div>
  {#if note}<div class="biss-kpi-note">{note}</div>{/if}
</article>

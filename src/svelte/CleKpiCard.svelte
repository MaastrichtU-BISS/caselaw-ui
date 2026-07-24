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

<article class="cle-card cle-kpi-card">
  <div class="cle-kpi-label">{label}</div>
  <div class="cle-kpi-value">{value}</div>
  {#if note}<div class="cle-kpi-note">{note}</div>{/if}
</article>

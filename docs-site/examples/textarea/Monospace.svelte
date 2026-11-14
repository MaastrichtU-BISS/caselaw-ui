<script lang="ts">
  import { BissField, BissTextarea } from 'biss-ui/svelte';

  let citation = $state(`@article{vandenberg2026citations,
  title   = {Citation Networks of the CJEU},
  author  = {van den Berg, Anouk and Rossi, Marco},
  journal = {Maastricht Journal},
  year    = {2026}
}`);
</script>

<div style="width: min(100%, 32rem)">
  <BissField label="BibTeX entry" hint="Paste the entry exported from your reference manager.">
    <BissTextarea bind:value={citation} rows={6} mono spellcheck="false" />
  </BissField>
</div>

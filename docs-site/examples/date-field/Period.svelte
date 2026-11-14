<script lang="ts">
  import { BissDateField } from 'biss-ui/svelte';

  let start = $state<string | null>('2027-01-11');
  let end = $state<string | null>('2027-03-26');
</script>

<div class="biss-form-row" style="align-items: center">
  Runs from
  <BissDateField label="Project start" value={start} onchange={(day) => (start = day)} />
  to
  <BissDateField
    label="Project end"
    value={end}
    min={start ?? undefined}
    onchange={(day) => (end = day)}
  />
</div>

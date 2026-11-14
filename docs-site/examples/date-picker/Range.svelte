<script lang="ts">
  import { BissDatePicker } from 'biss-ui/svelte';

  let fieldwork = $state<{ start: string | null; end: string | null }>({
    start: '2026-12-07',
    end: '2026-12-18',
  });
</script>

<div class="biss-stack biss-stack-sm" style="width: min(100%, 18rem)">
  <BissDatePicker
    range
    start={fieldwork.start}
    end={fieldwork.end}
    label="Fieldwork period"
    onrange={(next) => (fieldwork = next)}
  />
  <p role="status">Fieldwork: {fieldwork.start ?? '…'} to {fieldwork.end ?? '…'}</p>
</div>

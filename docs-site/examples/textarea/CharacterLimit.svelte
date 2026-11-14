<script lang="ts">
  import { BissField, BissTextarea } from 'biss-ui/svelte';

  const limit = 280;
  let abstract = $state(
    'We trace how the Court of Justice cites its own judgments, using network analysis over 40 years of case law.',
  );
  let left = $derived(limit - abstract.length);
</script>

<div style="width: min(100%, 28rem)">
  <BissField
    label="Public abstract"
    hint={`${left} characters left`}
    error={left < 0 ? `${-left} characters over the limit` : undefined}
  >
    <BissTextarea bind:value={abstract} rows={4} />
  </BissField>
</div>

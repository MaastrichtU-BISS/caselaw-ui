<script lang="ts">
  import { BissField, BissInput } from 'biss-ui/svelte';

  let orcid = $state('');
  let institution = $state('Maastricht University');
</script>

<div class="biss-stack biss-stack-sm" style="width: min(100%, 24rem)">
  <BissField label="ORCID iD" hint="Links your publications to this project." optional>
    <BissInput bind:value={orcid} placeholder="0000-0002-1825-0097" mono />
  </BissField>
  <BissField label="Institution" hint="Managed by your workspace administrator." disabled>
    <BissInput bind:value={institution} />
  </BissField>
</div>

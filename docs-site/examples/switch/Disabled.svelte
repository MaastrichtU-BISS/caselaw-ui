<script lang="ts">
  import { BissSwitch } from 'biss-ui/svelte';

  let sync = $state(false);
  let autoArchive = $state(false);
</script>

<div class="biss-stack biss-stack-sm" style="width: min(100%, 26rem)">
  <BissSwitch bind:modelValue={sync} label="Sync with Pure" hint="Import publications every night." />
  <BissSwitch
    bind:modelValue={autoArchive}
    label="Archive superseded versions"
    hint={sync ? 'Keeps only the newest record per DOI.' : 'Turn on Pure sync first.'}
    disabled={!sync}
  />
</div>

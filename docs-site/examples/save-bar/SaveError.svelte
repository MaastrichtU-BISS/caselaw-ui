<script lang="ts">
  import { BissField, BissInput, BissSaveBar } from 'biss-ui/svelte';

  const CEILING = 250_000;
  let saved = $state(180_000);
  let budget = $state<string | number | null>(275_000);
  let saving = $state(false);
  let error = $state('');

  async function save() {
    saving = true;
    error = '';
    await new Promise((resolve) => setTimeout(resolve, 900)); // Your request goes here.
    if (Number(budget) > CEILING) {
      error = 'Not saved: the budget is above the €250,000 grant ceiling.';
    } else {
      saved = Number(budget);
    }
    saving = false;
  }

  function discard() {
    budget = saved;
    error = '';
  }
</script>

<div class="biss-stack" style="width: min(100%, 30rem)">
  <BissField label="Total budget (€)" hint="Personnel, equipment and travel for WP2.">
    <BissInput bind:value={budget} type="number" min="0" step="1000" />
  </BissField>
  <BissSaveBar show={Number(budget) !== saved} {saving} {error} onsave={save} ondiscard={discard} />
</div>

<script lang="ts">
  import { BissTagInput } from 'biss-ui/svelte';

  let partners = $state(['Maastricht University', 'KU Leuven']);
</script>

<div style="width: min(100%, 26rem)">
  <BissTagInput bind:modelValue={partners} allowSpaces placeholder="Add partner institution" />
</div>

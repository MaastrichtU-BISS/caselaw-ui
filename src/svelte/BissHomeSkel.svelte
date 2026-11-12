<script lang="ts">
  export let rows = 4;
  export let label = 'Loading';
  export let shape = 'list';
</script>

<div class="biss-home-skel" data-shape={shape} role="status" aria-busy="true" aria-label={label}>
  {#each Array(Math.max(0, Math.min(50, rows))) as _}<i></i>{/each}
</div>

<script lang="ts">
  interface Props {
    rows?: number;
    label?: string;
    shape?: string;
  }

  let { rows = 4, label = 'Loading', shape = 'list' }: Props = $props();
</script>

<div class="biss-home-skel" data-shape={shape} role="status" aria-busy="true" aria-label={label}>
  {#each Array(Math.max(0, Math.min(50, rows))) as _}<i></i>{/each}
</div>

<script lang="ts">
  export let tone = 'info';
  export let label: string | undefined = undefined;
</script>

<div class="biss-alert-line" data-tone={tone} role="status" aria-label={label}>
  <span class="biss-status-dot" aria-hidden="true"></span><span class="biss-grow"><slot /></span
  ><slot name="actions" />
</div>

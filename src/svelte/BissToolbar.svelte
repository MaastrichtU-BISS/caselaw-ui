<script lang="ts">
  export let label: string;
</script>

<div class="biss-toolbar" role="group" aria-label={label}>
  <slot />
  <div class="biss-toolbar-end"><slot name="end" /></div>
</div>

<script lang="ts">
  import { BissDialog, BissButton } from 'biss-ui/svelte';
  let open = $state(false);
</script>

<BissButton variant="secondary" onclick={() => (open = true)}>Open quick dialog</BissButton
><BissDialog
  bind:open
  title="Quick dialog"
  description="The convenient wrapper uses the same compound foundation."
  size="sm"
  ><p>Use the wrapper when the default header, body and footer fit your task.</p>
  {#snippet actions()}<BissButton onclick={() => (open = false)}>Done</BissButton
    >{/snippet}</BissDialog
>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import CleButton from "./CleButton.svelte";
  import CleModal from "./CleModal.svelte";

  export let title: string;
  export let confirmLabel = "Confirm";
  export let cancelLabel = "Cancel";
  export let tone: "danger" | "primary" = "danger";
  export let busy = false;
  export let open = false;

  const dispatch = createEventDispatcher<{ confirm: void }>();
</script>

<CleModal bind:open {title} size="sm" {busy} footer={true}>
  <slot />
  <svelte:fragment slot="footer">
    <CleButton variant="secondary" data-cle-autofocus disabled={busy} on:click={() => (open = false)}>
      {cancelLabel}
    </CleButton>
    <CleButton variant={tone === "danger" ? "danger" : "primary"} disabled={busy} on:click={() => dispatch("confirm")}>
      {busy ? "Working..." : confirmLabel}
    </CleButton>
  </svelte:fragment>
</CleModal>

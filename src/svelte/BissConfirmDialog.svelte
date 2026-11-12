<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import BissButton from "./BissButton.svelte";
  import BissModal from "./BissModal.svelte";

  export let title: string;
  export let confirmLabel = "Confirm";
  export let cancelLabel = "Cancel";
  export let tone: "danger" | "primary" = "danger";
  export let busy = false;
  export let open = false;

  const dispatch = createEventDispatcher<{ confirm: void }>();
</script>

<BissModal bind:open {title} size="sm" {busy} footer={true}>
  <slot />
  <svelte:fragment slot="footer">
    <BissButton variant="secondary" data-biss-autofocus disabled={busy} on:click={() => (open = false)}>
      {cancelLabel}
    </BissButton>
    <BissButton variant={tone === "danger" ? "danger" : "primary"} disabled={busy} on:click={() => dispatch("confirm")}>
      {busy ? "Working..." : confirmLabel}
    </BissButton>
  </svelte:fragment>
</BissModal>

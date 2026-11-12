<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { bissDialogTheme } from '../../theme/dialog';
  let { class: className, ref = $bindable(null), ...rest }: Dialog.OverlayProps = $props();
</script>

<Dialog.Overlay {...rest} bind:ref class={[bissDialogTheme.slots.overlay, className]} />

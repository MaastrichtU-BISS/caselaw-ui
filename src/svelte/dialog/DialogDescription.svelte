<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { bissDialogTheme } from '../../theme/dialog';
  let { class: className, ref = $bindable(null), ...rest }: Dialog.DescriptionProps = $props();
</script>

<Dialog.Description {...rest} bind:ref class={[bissDialogTheme.slots.description, className]} />

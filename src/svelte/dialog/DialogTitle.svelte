<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { bissDialogTheme } from '../../theme/dialog';
  let { class: className, ref = $bindable(null), ...rest }: Dialog.TitleProps = $props();
</script>

<Dialog.Title {...rest} bind:ref class={[bissDialogTheme.slots.title, className]} />

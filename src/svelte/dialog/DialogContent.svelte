<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { bissDialogTheme, type BissDialogSize } from '../../theme/dialog';
  let {
    size = 'md',
    width,
    class: className,
    style,
    ref = $bindable(null),
    ...rest
  }: Dialog.ContentProps & { size?: BissDialogSize; width?: number } = $props();
</script>

<Dialog.Content
  {...rest}
  bind:ref
  class={[bissDialogTheme.slots.content, className]}
  style={`--dialog-width:${width ?? bissDialogTheme.sizes[size]}px;${style ?? ''}`}
/>

<script lang="ts">
  import { avatarHue, initials } from '../core/format';
  interface Props {
    name: string;
    size?: number;
    label?: string | undefined;
  }

  let { name, size = 32, label = undefined }: Props = $props();
  let hue = $derived(avatarHue(name));
  let text = $derived(initials(name));
</script>

<span
  class="biss-avatar"
  role="img"
  aria-label={label ?? name}
  style:width="{size}px"
  style:height="{size}px"
  style:font-size="{size * 0.38}px"
  style:--h={hue}>{text}</span
>

<script lang="ts">
  import { avatarHue, initials } from '../portable';
  export let name: string;
  export let size = 32;
  export let label: string | undefined = undefined;
  $: hue = avatarHue(name);
  $: text = initials(name);
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

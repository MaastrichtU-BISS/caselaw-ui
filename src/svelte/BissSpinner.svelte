<script lang="ts">
  let {
    label = 'Loading',
    size = 'md',
    decorative = false,
  }: {
    /** Announced to assistive technology while the spinner is visible. */
    label?: string;
    size?: 'sm' | 'md';
    /** Hide from assistive technology when nearby text already explains the wait. */
    decorative?: boolean;
  } = $props();
</script>

<span
  class="biss-spinner"
  data-size={size}
  role={decorative ? undefined : 'status'}
  aria-hidden={decorative || undefined}
  ><svg class="biss-spinner-icon" viewBox="0 0 24 24" aria-hidden="true"
    ><circle class="biss-spinner-track" cx="12" cy="12" r="9" /><path
      class="biss-spinner-arc"
      d="M12 3a9 9 0 0 1 9 9"
    /></svg
  >{#if !decorative}<span class="biss-visually-hidden">{label}</span>{/if}</span
>

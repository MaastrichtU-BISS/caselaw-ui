<script lang="ts">
  let {
    orientation = 'horizontal',
    label,
    decorative = false,
  }: {
    orientation?: 'horizontal' | 'vertical';
    /** Short text centered on a horizontal rule, such as "or". */
    label?: string;
    /** Purely visual: removes the separator from the accessibility tree. */
    decorative?: boolean;
  } = $props();
</script>

<div
  class="biss-separator"
  data-orientation={orientation}
  data-labelled={label ? true : undefined}
  role={decorative ? 'none' : 'separator'}
  aria-orientation={decorative ? undefined : orientation}
>
  {#if label && orientation === 'horizontal'}<span class="biss-separator-label">{label}</span>{/if}
</div>

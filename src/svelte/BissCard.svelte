<script lang="ts">
  interface Props {
    padded?: boolean;
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let { padded = true, children, ...rest }: Props = $props();
</script>

<section class="biss-card" class:biss-card-padded={padded} {...rest}>
  {@render children?.()}
</section>

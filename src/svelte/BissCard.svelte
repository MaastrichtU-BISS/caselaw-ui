<script lang="ts">
  export let padded = true;
</script>

<section class="biss-card" class:biss-card-padded={padded} {...$$restProps}>
  <slot />
</section>

<style>
  .biss-card-padded {
    padding: 24px;
  }
</style>

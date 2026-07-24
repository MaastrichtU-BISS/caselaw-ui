<script lang="ts">
  export let padded = true;
</script>

<section class="cle-card" class:cle-card-padded={padded} {...$$restProps}>
  <slot />
</section>

<style>
  .cle-card-padded {
    padding: 24px;
  }
</style>

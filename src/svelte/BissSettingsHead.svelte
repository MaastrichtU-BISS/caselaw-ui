<script lang="ts">
  export let title: string;
  export let help: string | undefined = undefined;
  export let more: string | undefined = undefined;
</script>

<div class="biss-settings-head">
  <div>
    <h2>
      {title}
      {#if more}<button type="button" class="biss-help" title={more} aria-label={more}>?</button
        >{/if}
    </h2>
    {#if help}<p>{help}</p>{/if}
  </div>
  <slot />
</div>

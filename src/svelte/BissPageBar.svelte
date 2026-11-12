<script lang="ts">
  export let title: string;
  export let description: string | undefined = undefined;
  export let meta: string | undefined = undefined;
</script>

<header class="biss-pagebar">
  <div class="biss-pagebar-row">
    <slot name="lead" />
    <h1>{title}</h1>
    <span class="biss-muted">{meta ?? ''}</span>
    <div class="biss-pagebar-actions"><slot name="actions" /></div>
  </div>
  {#if description}<p>{description}</p>{/if}<slot name="tabs" />
</header>

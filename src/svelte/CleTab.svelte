<script lang="ts">
  export let href: string | undefined = undefined;
  export let label: string;
  export let active = false;
</script>

<a
  class="cle-tab"
  class:is-active={active}
  {href}
  aria-current={active ? "page" : undefined}
  {...$$restProps}
>
  {label}
</a>

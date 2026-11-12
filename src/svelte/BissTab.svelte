<script lang="ts">
  interface Props {
    href?: string | undefined;
    label: string;
    active?: boolean;
    [key: string]: any;
  }

  let { href = undefined, label, active = false, ...rest }: Props = $props();
</script>

<a
  class="biss-tab"
  class:is-active={active}
  {href}
  aria-current={active ? 'page' : undefined}
  {...rest}
>
  {label}
</a>

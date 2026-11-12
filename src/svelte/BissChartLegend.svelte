<script lang="ts">
  export let items: { label: string; color: string; dashed?: boolean }[];
  export let label: string;
</script>

<ul class="biss-chart-legend" aria-label={label}>
  {#each items as item}<li>
      <i
        style:border-color={item.color}
        style:background={item.dashed ? 'transparent' : item.color}
        style:border-style={item.dashed ? 'dashed' : 'solid'}
      ></i>{item.label}
    </li>{/each}
</ul>

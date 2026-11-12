<script lang="ts">
  import { progressPercent } from '../portable';
  export let value: number | null;
  export let expected: number | undefined = undefined;
  export let label: string;
  export let tone = 'primary';
  export let height = 8;
  $: fill = progressPercent(value);
</script>

<div
  class="biss-goal-bar"
  data-tone={tone}
  role="progressbar"
  aria-label={label}
  aria-valuenow={value === null ? undefined : fill}
  aria-valuemin="0"
  aria-valuemax="100"
  style:height="{height}px"
>
  <i style:width="{fill}%"></i>{#if expected !== undefined}<em
      style:left="{progressPercent(expected)}%"
    ></em>{/if}
</div>

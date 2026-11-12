<script lang="ts">
  import { progressPercent } from '../core/format';
  interface Props {
    value: number | null;
    expected?: number | undefined;
    label: string;
    tone?: string;
    height?: number;
  }

  let { value, expected = undefined, label, tone = 'primary', height = 8 }: Props = $props();
  let fill = $derived(progressPercent(value));
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

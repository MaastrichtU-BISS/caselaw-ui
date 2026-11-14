<script lang="ts">
  import { BissProgress } from 'biss-ui/svelte';
</script>

<BissProgress value={62} label="Budget spent" showLabel showValue />
<BissProgress
  value={3}
  max={8}
  label="Files uploaded"
  valueText="3 of 8 files"
  showLabel
  showValue
  tone="success"
/>
<BissProgress value={94} label="Storage used" showLabel showValue tone="danger" size="sm" />

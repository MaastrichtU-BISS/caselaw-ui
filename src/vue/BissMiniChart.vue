<script setup lang="ts">
const { type = 'bar' } = defineProps<{
  type?: 'kpi' | 'bar' | 'column' | 'stacked' | 'line' | 'table' | 'text';
}>();
</script>
<template>
  <svg class="biss-mini-chart" viewBox="0 0 60 36" aria-hidden="true">
    <g v-if="type === 'kpi'">
      <rect x="8" y="9" width="30" height="9" rx="2" class="a" />
      <rect x="8" y="22" width="18" height="4" rx="2" class="m" />
    </g>
    <g v-else-if="type === 'bar'">
      <rect x="8" y="7" width="40" height="5" rx="1.5" class="a" />
      <rect x="8" y="15" width="28" height="5" rx="1.5" class="a" />
      <rect x="8" y="23" width="18" height="5" rx="1.5" class="a o" />
    </g>
    <g v-else-if="type === 'column'">
      <rect x="10" y="17" width="7" height="12" rx="1.5" class="a" />
      <rect x="21" y="9" width="7" height="20" rx="1.5" class="a" />
      <rect x="32" y="13" width="7" height="16" rx="1.5" class="a" />
      <rect x="43" y="20" width="7" height="9" rx="1.5" class="a o" />
    </g>
    <g v-else-if="type === 'stacked'">
      <rect x="11" y="18" width="8" height="11" class="a" />
      <rect x="11" y="12" width="8" height="6" class="y" />
      <rect x="26" y="13" width="8" height="16" class="a" />
      <rect x="26" y="7" width="8" height="6" class="y" />
      <rect x="41" y="16" width="8" height="13" class="a" />
      <rect x="41" y="10" width="8" height="6" class="y" />
    </g>
    <g v-else-if="type === 'line'">
      <path d="M8 26L20 18L30 21L41 10L52 13" class="ln" />
      <circle cx="41" cy="10" r="2.2" class="a" />
    </g>
    <g v-else-if="type === 'table'">
      <rect x="8" y="7" width="44" height="4" rx="1" class="m" />
      <rect x="8" y="14" width="30" height="3" rx="1" class="a o" />
      <rect x="42" y="14" width="10" height="3" rx="1" class="a" />
      <rect x="8" y="20" width="26" height="3" rx="1" class="a o" />
      <rect x="42" y="20" width="10" height="3" rx="1" class="a" />
      <rect x="8" y="26" width="32" height="3" rx="1" class="a o" />
      <rect x="42" y="26" width="10" height="3" rx="1" class="a" />
    </g>
    <g v-else>
      <rect x="8" y="8" width="26" height="5" rx="2" class="a" />
      <rect x="8" y="17" width="44" height="3" rx="1.5" class="m" />
      <rect x="8" y="23" width="36" height="3" rx="1.5" class="m" />
    </g>
  </svg>
</template>

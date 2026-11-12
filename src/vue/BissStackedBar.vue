<script setup lang="ts">
const { items, label } = defineProps<{
  items: { key: string; label: string; value: number; color: string; display?: string }[];
  label: string;
}>();
const emit = defineEmits<{ pick: [key: string] }>();
</script>
<template>
  <section class="biss-stacked-bar" :aria-label="label">
    <div
      class="biss-stacked-track"
      role="img"
      :aria-label="items.map((i) => i.label + ': ' + (i.display ?? i.value)).join(', ')"
    >
      <span
        v-for="item in items"
        :key="item.key"
        :style="{
          flex: Math.max(0, Number.isFinite(item.value) ? item.value : 0),
          background: item.color,
        }"
      />
    </div>
    <ul>
      <li v-for="item in items" :key="item.key">
        <button type="button" @click="emit('pick', item.key)">
          <i class="biss-color-dot" :style="{ background: item.color }" /><span>{{
            item.label
          }}</span
          ><b>{{ item.display ?? item.value }}</b>
        </button>
      </li>
    </ul>
  </section>
</template>

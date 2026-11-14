<script setup lang="ts">
import { ref } from 'vue';
import { BissCalendar, type BissCalendarItem } from 'biss-ui/vue';

const items: BissCalendarItem[] = [
  { id: 's1', day: '2027-01-12', title: 'Lab meeting' },
  { id: 's2', day: '2027-01-19', title: 'Lab meeting' },
  { id: 's3', day: '2027-01-21', title: 'Writing retreat', color: '#7A3FB8' },
  { id: 's4', day: '2027-01-26', title: 'Lab meeting' },
  { id: 's5', day: '2027-01-29', title: 'Grant office hours', color: '#0F7A4E' },
];

const opened = ref<BissCalendarItem>();
</script>

<template>
  <div class="biss-stack biss-stack-sm">
    <BissCalendar
      label="Group schedule, January 2027"
      month="2027-01"
      readonly
      :items="items"
      @open="opened = items.find((item) => item.id === $event)"
    />
    <p role="status">{{ opened ? `${opened.title} on ${opened.day}` : 'Select an event for details' }}</p>
  </div>
</template>

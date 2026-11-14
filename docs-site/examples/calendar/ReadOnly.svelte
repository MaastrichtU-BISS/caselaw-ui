<script lang="ts">
  import { BissCalendar, type BissCalendarItem } from 'biss-ui/svelte';

  const items: BissCalendarItem[] = [
    { id: 's1', day: '2027-01-12', title: 'Lab meeting' },
    { id: 's2', day: '2027-01-19', title: 'Lab meeting' },
    { id: 's3', day: '2027-01-21', title: 'Writing retreat', color: '#7A3FB8' },
    { id: 's4', day: '2027-01-26', title: 'Lab meeting' },
    { id: 's5', day: '2027-01-29', title: 'Grant office hours', color: '#0F7A4E' },
  ];

  let opened = $state<BissCalendarItem>();
</script>

<div class="biss-stack biss-stack-sm">
  <BissCalendar
    label="Group schedule, January 2027"
    month="2027-01"
    readonly
    {items}
    onopen={(id) => (opened = items.find((item) => item.id === id))}
  />
  <p role="status">{opened ? `${opened.title} on ${opened.day}` : 'Select an event for details'}</p>
</div>

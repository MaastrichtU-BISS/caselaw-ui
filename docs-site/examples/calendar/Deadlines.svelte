<script lang="ts">
  import {
    BissButton,
    BissCalendar,
    BissIcon,
    BissSectionHeader,
    type BissCalendarItem,
  } from 'biss-ui/svelte';

  let month = $state('2026-12');
  let items = $state<BissCalendarItem[]>([
    { id: 'd1', day: '2026-12-01', title: 'NWO Vidi pre-proposal', color: '#D4372C' },
    { id: 'd2', day: '2026-12-08', title: 'Ethics committee', color: '#7A3FB8' },
    { id: 'd3', day: '2026-12-10', title: 'Progress report WP2' },
    { id: 'd4', day: '2026-12-15', title: 'PhD defence: S. Peeters', color: '#0F7A4E' },
    { id: 'd5', day: '2026-12-18', title: 'Budget close', color: '#E07B2A' },
  ]);
  let next = 6;

  const title = $derived(
    new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(
      new Date(month + '-01T12:00:00Z'),
    ),
  );

  function shift(delta: number) {
    const [year, index] = month.split('-').map(Number);
    month = new Date(Date.UTC(year!, index! - 1 + delta, 1)).toISOString().slice(0, 7);
  }

  function add(day: string) {
    items = [...items, { id: `d${next++}`, day, title: 'New deadline' }];
  }
</script>

<div class="biss-stack biss-stack-sm">
  <BissSectionHeader {title}>
    {#snippet actions()}
      <BissButton icon size="sm" variant="secondary" aria-label="Previous month" onclick={() => shift(-1)}>
        <BissIcon name="chevLeft" />
      </BissButton>
      <BissButton icon size="sm" variant="secondary" aria-label="Next month" onclick={() => shift(1)}>
        <BissIcon name="chev" />
      </BissButton>
    {/snippet}
  </BissSectionHeader>
  <BissCalendar label="Faculty deadlines" {month} {items} onadd={add} />
</div>

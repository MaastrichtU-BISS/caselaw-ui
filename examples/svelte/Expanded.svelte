<script lang="ts">
  import {
    BissActivityList,
    BissButton,
    BissCalendar,
    BissCapacityBar,
    BissChecklist,
    BissDateField,
    BissDatePicker,
    BissDialog,
    BissEditableText,
    BissGoalCard,
    BissGroupedBars,
    BissHeaderAction,
    BissHomeCard,
    BissKanban,
    BissLineChart,
    BissLiveStatus,
    BissMenu,
    BissMiniChart,
    BissNoAccess,
    BissOnboardingChips,
    BissOnboardingFrame,
    BissPageHint,
    BissPeopleCell,
    BissPopover,
    BissPresenceStack,
    BissPropertyList,
    BissRecordChip,
    BissSearchPalette,
    BissSelectPicker,
    BissSidePanel,
    BissStatusCell,
    BissSwatchPicker,
    BissTableAddRow,
    BissTableGroup,
    BissTableHead,
    BissTableTotal,
    BissTimeline,
    BissToolButton,
    BissToolNew,
    BissToolSearch,
    BissValuePicker,
  } from '../../src/svelte';
  import {
    options,
    actions as menuActions,
    people,
    lanes,
    initialCards,
    series,
    calendarItems,
    timelineItems,
    searchItems,
  } from '../catalog-data';
  import type { BissBoardCard } from '../../src/library-types';
  const chartTypes = ['kpi', 'bar', 'column', 'stacked', 'line', 'table', 'text'] as const;
  let dialog = $state(false),
    panel = $state(false),
    search = $state(false),
    result = $state('Ready'),
    team = $state('research'),
    color = $state('blue'),
    day = $state<string | null>('2026-11-12'),
    selected = $state<string[]>(['research']),
    negate = $state(false),
    query = $state(''),
    title = $state('Open justice'),
    collapsed = $state(false),
    sort = $state<'asc' | 'desc' | null>(null),
    range = $state<{ start: string | null; end: string | null }>({ start: null, end: null }),
    cards = $state<BissBoardCard[]>([...initialCards]),
    checklist = $state([
      { key: 'profile', label: 'Complete your profile', done: true },
      { key: 'invite', label: 'Invite a teammate', done: false },
    ]);
  function move(v: { id: string; lane: string }) {
    cards = cards.map((c) => (c.id === v.id ? { ...c, lane: v.lane } : c));
    result = 'moved:' + v.lane;
  }
</script>

<div class="expanded-catalog">
  <h2>Portable Bizzy component catalog</h2>
  <p data-result role="status">{result}</p>
  <section class="demo-section" data-demo="Overlays and menus">
    <h3>Overlays and menus</h3>
    <div class="demo-row">
      <BissMenu
        label="Project actions"
        items={menuActions}
        searchable
        onpick={(item) => (result = item.key)}
      /><BissPopover label="Project details"
        ><p>Popovers stay within the viewport.</p>
        <BissButton variant="ghost">A focusable action</BissButton></BissPopover
      ><BissButton variant="secondary" on:click={() => (dialog = true)}>Open dialog</BissButton
      ><BissButton variant="secondary" on:click={() => (panel = true)}>Open side panel</BissButton
      ><BissButton variant="secondary" on:click={() => (search = true)}>Open search</BissButton>
    </div>
    <BissDialog open={dialog} title="Edit research project" onclose={() => (dialog = false)}
      ><label>Project name<input class="biss-picker-search" value="Open justice" autofocus /></label
      ><BissMenu
        label="Nested dialog actions"
        items={menuActions}
        onpick={(item) => (result = item.key)}
      />{#snippet actions()}<BissButton on:click={() => (dialog = false)}>Done</BissButton
        >{/snippet}</BissDialog
    ><BissSidePanel open={panel} title="Project record" onclose={() => (panel = false)}
      ><p>Details and activities share a focused panel.</p></BissSidePanel
    ><BissSearchPalette
      open={search}
      items={searchItems}
      onclose={() => (search = false)}
      onpick={(item) => {
        result = item.key;
        search = false;
      }}
    />
  </section>
  <section class="demo-section" data-demo="Pickers and filters">
    <h3>Pickers and filters</h3>
    <div class="demo-row">
      <BissSelectPicker
        label="Choose team"
        value={team}
        {options}
        onchange={(v) => (team = v)}
      /><BissSwatchPicker
        label="Group color"
        value={color}
        onchange={(v) => (color = v)}
      /><BissDateField label="Due date" value={day} onchange={(v) => (day = v)} /><BissStatusCell
        label="On track"
        color="#0F7A4E"
      />
    </div>
    <p>Team: {team} · Color: {color} · Due: {day}</p>
    <BissValuePicker
      {options}
      {selected}
      label="Filter teams"
      canNegate
      {negate}
      onchange={(v) => (selected = v)}
      onnegate={(v) => (negate = v)}
    />
    <p>Selected: {selected.join(', ')} · Negate: {negate}</p>
  </section>
  <section class="demo-section" data-demo="Dates and ranges">
    <h3>Dates and ranges</h3>
    <div class="demo-columns">
      <BissDatePicker
        value={day}
        today="2026-11-12"
        min="2026-11-01"
        max="2026-12-31"
        onchange={(v) => (day = v)}
      />
      <div>
        <BissDatePicker
          range
          start={range.start}
          end={range.end}
          today="2026-11-12"
          label="Project date range"
          onrange={(v) => (range = v)}
        />
        <p>Range: {range.start} → {range.end}</p>
      </div>
    </div>
  </section>
  <section class="demo-section" data-demo="Toolbar and inline editing">
    <h3>Toolbar and inline editing</h3>
    <div class="demo-row">
      <BissHeaderAction
        label="Refresh data"
        icon="refresh"
        onclick={() => (result = 'refreshed')}
      /><BissToolButton
        label="Filters"
        icon="filter"
        count={selected.length}
        clearable
        onclear={() => (selected = [])}
      /><BissToolNew
        label="New record"
        items={menuActions}
        onadd={() => (result = 'new')}
        onpick={(item) => (result = item.key)}
      /><BissToolSearch
        label="Find records"
        value={query}
        onchange={(v) => (query = v)}
      /><BissEditableText label="Edit project title" value={title} onchange={(v) => (title = v)} />
    </div>
    <p>Query: {query} · Title: {title}</p>
    <BissPageHint
      label="About this view"
      text="Each toolbar control is independent of the host application."
    />
  </section>
  <section class="demo-section" data-demo="People, records and widgets">
    <h3>People, records and widgets</h3>
    <div class="demo-row">
      <BissPresenceStack {people} limit={3} /><BissPeopleCell {people} limit={2} /><BissRecordChip
        label="Open justice"
        icon="folder"
        meta="Project"
      /><BissLiveStatus state="reconnecting" />
    </div>
    <div class="demo-columns">
      <BissHomeCard
        title="Team capacity"
        icon="people"
        note="Allocated effort across the team"
        count={5}
        ><BissCapacityBar
          allocated={0.9}
          available={0.8}
          label="Over capacity"
        />{#snippet footer()}Updated a moment ago{/snippet}</BissHomeCard
      ><BissGoalCard
        title="Publish open data"
        label="Publication progress"
        progress={0.65}
        expected={0.75}
        status="On track"
        tone="success"
      />
    </div>
    <BissPropertyList
      label="Record properties"
      items={[
        { key: 'owner', label: 'Owner', value: 'Ada Lovelace' },
        { key: 'team', label: 'Team', value: 'Research' },
      ]}
    /><BissActivityList
      label="Recent changes"
      items={[
        {
          key: 'created',
          actor: 'Ada Lovelace',
          action: 'created the project',
          time: '5 minutes ago',
          detail: 'Open justice',
        },
      ]}
    />
  </section>
  <section class="demo-section" data-demo="Table building blocks">
    <h3>Table building blocks</h3>
    <BissTableGroup
      label="Research projects"
      count={2}
      {collapsed}
      ontoggle={(v) => (collapsed = v)}
      ><table class="demo-table">
        <thead
          ><tr
            ><th aria-sort={sort === 'asc' ? 'ascending' : sort === 'desc' ? 'descending' : 'none'}
              ><BissTableHead label="Project title" {sort} onsort={(v) => (sort = v)} /></th
            ><th>Summary</th></tr
          ></thead
        ><tbody
          ><tr><td>Open justice</td><td><BissTableTotal label="Total" value="€240k" /></td></tr
          ></tbody
        >
      </table>
      <BissTableAddRow
        label="Add research project"
        onadd={() => (result = 'added row')}
      /></BissTableGroup
    >
  </section>
  <section class="demo-section" data-demo="Charts">
    <h3>Charts</h3>
    <BissGroupedBars
      categories={['2024', '2025', '2026']}
      {series}
      label="Funding by year"
      onpick={(v) => (result = v.series + ':' + v.index)}
    /><BissLineChart values={[12, 18, 14, 25, 32, 29]} label="Funding trend" />
    <div class="demo-row">
      {#each chartTypes as type}<BissMiniChart {type} />{/each}
    </div>
  </section>
  <section class="demo-section" data-demo="Kanban">
    <h3>Kanban</h3>
    <BissKanban
      {lanes}
      {cards}
      label="Project kanban"
      onmove={move}
      onopen={(v) => (result = v)}
      onadd={(v) => (result = 'add:' + v)}
    />
  </section>
  <section class="demo-section" data-demo="Calendar">
    <h3>Calendar</h3>
    <BissCalendar
      month="2026-11"
      items={calendarItems}
      label="Project calendar"
      onopen={(v) => (result = v)}
      onadd={(v) => (result = 'day:' + v)}
    />
  </section>
  <section class="demo-section" data-demo="Timeline">
    <h3>Timeline</h3>
    <BissTimeline
      from="2026-11-01"
      to="2026-11-30"
      items={timelineItems}
      label="Project timeline"
      onopen={(v) => (result = v)}
    />
  </section>
  <section class="demo-section" data-demo="Onboarding and access">
    <h3>Onboarding and access</h3>
    <BissOnboardingFrame
      title="Set up your workspace"
      description="Choose the areas your team works in."
      step={1}
      steps={3}
      ><BissOnboardingChips
        {options}
        {selected}
        label="Workspace interests"
        onchange={(v) => (selected = v)}
      /><BissChecklist
        items={checklist}
        label="Setup checklist"
        onchange={(v) =>
          (checklist = checklist.map((i) => (i.key === v.key ? { ...i, done: v.done } : i)))}
      /></BissOnboardingFrame
    ><BissNoAccess />
  </section>
</div>

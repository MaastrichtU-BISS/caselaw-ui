<script setup lang="ts">
import { ref } from 'vue';
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
} from '../../src/vue';
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
const dialog = ref(false),
  panel = ref(false),
  search = ref(false),
  result = ref('Ready'),
  team = ref('research'),
  color = ref('blue'),
  day = ref<string | null>('2026-11-12'),
  selected = ref<string[]>(['research']),
  negate = ref(false),
  query = ref(''),
  title = ref('Open justice'),
  collapsed = ref(false),
  sort = ref<'asc' | 'desc' | null>(null),
  range = ref<{ start: string | null; end: string | null }>({ start: null, end: null }),
  cards = ref<BissBoardCard[]>([...initialCards]),
  checklist = ref([
    { key: 'profile', label: 'Complete your profile', done: true },
    { key: 'invite', label: 'Invite a teammate', done: false },
  ]);
function move(v: { id: string; lane: string }) {
  cards.value = cards.value.map((c) => (c.id === v.id ? { ...c, lane: v.lane } : c));
  result.value = 'moved:' + v.lane;
}
</script>
<template>
  <div class="expanded-catalog">
    <h2>Portable Bizzy component catalog</h2>
    <p data-result role="status">{{ result }}</p>
    <section class="demo-section" data-demo="Overlays and menus">
      <h3>Overlays and menus</h3>
      <div class="demo-row">
        <BissMenu
          label="Project actions"
          :items="menuActions"
          searchable
          @pick="result = $event.key"
        /><BissPopover label="Project details"
          ><p>Popovers stay within the viewport.</p>
          <BissButton variant="ghost">A focusable action</BissButton></BissPopover
        ><BissButton variant="secondary" @click="dialog = true">Open dialog</BissButton
        ><BissButton variant="secondary" @click="panel = true">Open side panel</BissButton
        ><BissButton variant="secondary" @click="search = true">Open search</BissButton>
      </div>
      <BissDialog :open="dialog" title="Edit research project" @close="dialog = false"
        ><label
          >Project name<input class="biss-picker-search" value="Open justice" autofocus /></label
        ><BissMenu
          label="Nested dialog actions"
          :items="menuActions"
          @pick="result = $event.key"
        /><template #actions
          ><BissButton @click="dialog = false">Done</BissButton></template
        ></BissDialog
      ><BissSidePanel :open="panel" title="Project record" @close="panel = false"
        ><p>Details and activities share a focused panel.</p></BissSidePanel
      ><BissSearchPalette
        :open="search"
        :items="searchItems"
        @close="search = false"
        @pick="
          result = $event.key;
          search = false;
        "
      />
    </section>
    <section class="demo-section" data-demo="Pickers and filters">
      <h3>Pickers and filters</h3>
      <div class="demo-row">
        <BissSelectPicker
          label="Choose team"
          :value="team"
          :options="options"
          @change="team = $event"
        /><BissSwatchPicker
          label="Group color"
          :value="color"
          @change="color = $event"
        /><BissDateField label="Due date" :value="day" @change="day = $event" /><BissStatusCell
          label="On track"
          color="#0F7A4E"
        />
      </div>
      <p>Team: {{ team }} · Color: {{ color }} · Due: {{ day }}</p>
      <BissValuePicker
        :options="options"
        :selected="selected"
        label="Filter teams"
        can-negate
        :negate="negate"
        @change="selected = $event"
        @negate="negate = $event"
      />
      <p>Selected: {{ selected.join(', ') }} · Negate: {{ negate }}</p>
    </section>
    <section class="demo-section" data-demo="Dates and ranges">
      <h3>Dates and ranges</h3>
      <div class="demo-columns">
        <BissDatePicker
          :value="day"
          today="2026-11-12"
          min="2026-11-01"
          max="2026-12-31"
          @change="day = $event"
        />
        <div>
          <BissDatePicker
            range
            :start="range.start"
            :end="range.end"
            today="2026-11-12"
            label="Project date range"
            @range="range = $event"
          />
          <p>Range: {{ range.start }} → {{ range.end }}</p>
        </div>
      </div>
    </section>
    <section class="demo-section" data-demo="Toolbar and inline editing">
      <h3>Toolbar and inline editing</h3>
      <div class="demo-row">
        <BissHeaderAction
          label="Refresh data"
          icon="refresh"
          @click="result = 'refreshed'"
        /><BissToolButton
          label="Filters"
          icon="filter"
          :count="selected.length"
          clearable
          @clear="selected = []"
        /><BissToolNew
          label="New record"
          :items="menuActions"
          @add="result = 'new'"
          @pick="result = $event.key"
        /><BissToolSearch
          label="Find records"
          :value="query"
          @change="query = $event"
        /><BissEditableText label="Edit project title" :value="title" @change="title = $event" />
      </div>
      <p>Query: {{ query }} · Title: {{ title }}</p>
      <BissPageHint
        label="About this view"
        text="Each toolbar control is independent of the host application."
      />
    </section>
    <section class="demo-section" data-demo="People, records and widgets">
      <h3>People, records and widgets</h3>
      <div class="demo-row">
        <BissPresenceStack :people="people" :limit="3" /><BissPeopleCell
          :people="people"
          :limit="2"
        /><BissRecordChip label="Open justice" icon="folder" meta="Project" /><BissLiveStatus
          state="reconnecting"
        />
      </div>
      <div class="demo-columns">
        <BissHomeCard
          title="Team capacity"
          icon="people"
          note="Allocated effort across the team"
          :count="5"
          ><BissCapacityBar :allocated="0.9" :available="0.8" label="Over capacity" /><template
            #footer
            >Updated a moment ago</template
          ></BissHomeCard
        ><BissGoalCard
          title="Publish open data"
          label="Publication progress"
          :progress="0.65"
          :expected="0.75"
          status="On track"
          tone="success"
        />
      </div>
      <BissPropertyList
        label="Record properties"
        :items="[
          { key: 'owner', label: 'Owner', value: 'Ada Lovelace' },
          { key: 'team', label: 'Team', value: 'Research' },
        ]"
      /><BissActivityList
        label="Recent changes"
        :items="[
          {
            key: 'created',
            actor: 'Ada Lovelace',
            action: 'created the project',
            time: '5 minutes ago',
            detail: 'Open justice',
          },
        ]"
      />
    </section>
    <section class="demo-section" data-demo="Table building blocks">
      <h3>Table building blocks</h3>
      <BissTableGroup
        label="Research projects"
        :count="2"
        :collapsed="collapsed"
        @toggle="collapsed = $event"
        ><table class="demo-table">
          <thead>
            <tr>
              <th
                :aria-sort="sort === 'asc' ? 'ascending' : sort === 'desc' ? 'descending' : 'none'"
              >
                <BissTableHead label="Project title" :sort="sort" @sort="sort = $event" />
              </th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Open justice</td>
              <td><BissTableTotal label="Total" value="€240k" /></td>
            </tr>
          </tbody>
        </table>
        <BissTableAddRow label="Add research project" @add="result = 'added row'"
      /></BissTableGroup>
    </section>
    <section class="demo-section" data-demo="Charts">
      <h3>Charts</h3>
      <BissGroupedBars
        :categories="['2024', '2025', '2026']"
        :series="series"
        label="Funding by year"
        @pick="result = $event.series + ':' + $event.index"
      /><BissLineChart :values="[12, 18, 14, 25, 32, 29]" label="Funding trend" />
      <div class="demo-row">
        <BissMiniChart v-for="type in chartTypes" :key="type" :type="type" />
      </div>
    </section>
    <section class="demo-section" data-demo="Kanban">
      <h3>Kanban</h3>
      <BissKanban
        :lanes="lanes"
        :cards="cards"
        label="Project kanban"
        @move="move"
        @open="result = $event"
        @add="result = 'add:' + $event"
      />
    </section>
    <section class="demo-section" data-demo="Calendar">
      <h3>Calendar</h3>
      <BissCalendar
        month="2026-11"
        :items="calendarItems"
        label="Project calendar"
        @open="result = $event"
        @add="result = 'day:' + $event"
      />
    </section>
    <section class="demo-section" data-demo="Timeline">
      <h3>Timeline</h3>
      <BissTimeline
        from="2026-11-01"
        to="2026-11-30"
        :items="timelineItems"
        label="Project timeline"
        @open="result = $event"
      />
    </section>
    <section class="demo-section" data-demo="Onboarding and access">
      <h3>Onboarding and access</h3>
      <BissOnboardingFrame
        title="Set up your workspace"
        description="Choose the areas your team works in."
        :step="1"
        :steps="3"
        ><BissOnboardingChips
          :options="options"
          :selected="selected"
          label="Workspace interests"
          @change="selected = $event" /><BissChecklist
          :items="checklist"
          label="Setup checklist"
          @change="
            checklist = checklist.map((i) =>
              i.key === $event.key ? { ...i, done: $event.done } : i,
            )
          " /></BissOnboardingFrame
      ><BissNoAccess />
    </section>
  </div>
</template>

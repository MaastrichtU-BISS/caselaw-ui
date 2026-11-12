# Portable Bizzy components

54 components are available in both Vue and Svelte. This includes 40 added in
the expanded extraction, beyond the original 14. The inherited library remains
available as well: **96 Vue components and 81 Svelte components in total**.

See the [visual reference](visual-reference.md) for screenshots of every component,
or run `npm run docs:dev` for the searchable documentation site.

## Overlays and navigation

[BissDialog](api.md#bissdialog), [BissSidePanel](api.md#bisssidepanel), [BissPopover](api.md#bisspopover), [BissMenu](api.md#bissmenu), [BissSearchPalette](api.md#bisssearchpalette), [BissViewTabs](api.md#bissviewtabs), [BissPageHint](api.md#bisspagehint).

## Forms, filters and editing

[BissSelectPicker](api.md#bissselectpicker), [BissValuePicker](api.md#bissvaluepicker), [BissSwatchPicker](api.md#bissswatchpicker), [BissDatePicker](api.md#bissdatepicker), [BissDateField](api.md#bissdatefield), [BissEditableText](api.md#bisseditabletext), [BissToolSearch](api.md#bisstoolsearch), [BissOnboardingChips](api.md#bissonboardingchips).

## Page and toolbar composition

[BissPageBar](api.md#bisspagebar), [BissToolbar](api.md#bisstoolbar), [BissHeaderAction](api.md#bissheaderaction), [BissToolButton](api.md#bisstoolbutton), [BissToolNew](api.md#bisstoolnew), [BissSettingsHead](api.md#bisssettingshead), [BissSaveBar](api.md#bisssavebar), [BissOnboardingFrame](api.md#bissonboardingframe).

## Identity and records

[BissAvatar](api.md#bissavatar), [BissPresenceStack](api.md#bisspresencestack), [BissPeopleCell](api.md#bisspeoplecell), [BissRecordChip](api.md#bissrecordchip), [BissStatusCell](api.md#bissstatuscell), [BissPropertyList](api.md#bisspropertylist), [BissActivityList](api.md#bissactivitylist), [BissNoticeRow](api.md#bissnoticerow).

## Tables and boards

[BissTableHead](api.md#bisstablehead), [BissTableGroup](api.md#bisstablegroup), [BissTableTotal](api.md#bisstabletotal), [BissTableAddRow](api.md#bisstableaddrow), [BissTablePager](api.md#bisstablepager), [BissKanban](api.md#bisskanban), [BissCalendar](api.md#bisscalendar), [BissTimeline](api.md#bisstimeline).

## Widgets and charts

[BissHomeCard](api.md#bisshomecard), [BissGoalCard](api.md#bissgoalcard), [BissGoalBar](api.md#bissgoalbar), [BissCapacityBar](api.md#bisscapacitybar), [BissChartLegend](api.md#bisschartlegend), [BissGroupedBars](api.md#bissgroupedbars), [BissLineChart](api.md#bisslinechart), [BissMiniChart](api.md#bissminichart), [BissSummaryStrip](api.md#bisssummarystrip).

## Feedback and states

[BissAlertLine](api.md#bissalertline), [BissHomeSkel](api.md#bisshomeskel), [BissNoAccess](api.md#bissnoaccess), [BissLiveStatus](api.md#bisslivestatus), [BissChecklist](api.md#bisschecklist).

## Iconography

[BissIcon](api.md#bissicon).

## Framework contracts

Vue uses normal events: `@change`, `@pick`, `@close`, and named slots. The new
40 Svelte components use Svelte 5 callback props (`onchange`, `onpick`, `onclose`)
and snippets (`children`, `actions`, `footer`). The initial 14 and inherited
Svelte components retain their existing `on:…` and named-slot conventions.
The reference source links make the distinction explicit; do not mix them.

All components expose public `BissNameProps` types in their framework entry
point. Shared records such as `BissMenuItem`, `BissPickOption`, `BissPerson`,
`BissBoardCard`, `BissBoardLane`, `BissCalendarItem` and `BissTimelineItem`
are exported from both framework entry points.

```vue
<script setup lang="ts">
import {ref} from 'vue';
import {BissDatePicker, BissMenu} from 'biss-ui/vue';
const day = ref<string|null>(null);
</script>
<template>
  <BissDatePicker :value="day" @change="day=$event" label="Due date" />
  <BissMenu label="Actions" :items="[{key:'export',label:'Export'}]"
    @pick="item => console.log(item.key)" />
</template>
```

```svelte
<script lang="ts">
import {BissDatePicker, BissMenu} from 'biss-ui/svelte';
let day=$state<string|null>(null);
</script>
<BissDatePicker value={day} onchange={value=>day=value} label="Due date" />
<BissMenu label="Actions" items={[{key:'export',label:'Export'}]}
  onpick={item=>console.log(item.key)} />
```

## Customization and host responsibilities

Text, labels, options, data, dates, colors, dimensions, disabled/read-only state,
and composition are props. Both frameworks inherit semantic CSS tokens from a
wrapper. Menus and popovers remain in that wrapper's DOM and use the browser's
top layer, including inside dialogs. They need native Popover API support;
dialogs use `showModal`. There is no body teleport that loses theme inheritance.
Svelte requires version 5.20 or newer (`$props.id()` for SSR-safe identifiers).

Dialogs manage inertness, focus wrapping, focus restoration and shared scroll
locking. Popovers handle Escape, outside dismissal, viewport placement and
arrow/Home/End navigation through enabled choices. Searchable selection and
nested menus support keyboard operation. Menus emit selected records; the host
handles application actions. `href` menu items use ordinary browser navigation.

Date values are ISO calendar days. The picker supports English/Dutch natural
language input, locale-based display, minimum/maximum dates, range selection,
month/year keyboard navigation, clear and today actions. Replace control labels
through props; typed language parsing is currently English and Dutch. Supply
`today` explicitly when SSR spans time zones or when deterministic dates matter.

Kanban emits `move`, `add` and `open`; it does not persist. Dragging and keyboard
selection use the same move event. Calendar emits `add` and `open`, with an agenda
layout on phones. Timeline renders clipped inclusive spans and emits `open`;
drag resizing and dependency scheduling remain host features. These are portable
view components, not copies of Bizzy's database or board engine.

GroupedBars emits `pick` from pointer or keyboard and supports negative values,
empty series and outlined bars. LineChart renders supplied values; MiniChart is
a decorative chart-type schematic. Hosts supply formatted monetary summaries
and any underlying record navigation. None of these components fetch data.

The catalogs in `examples/vue/Expanded.vue` and `examples/svelte/Expanded.svelte`
show every new component with working host state. `npm run test:browser` checks
both built catalogs at 1440 and 390 pixels, including accessibility scans of the
menu, dialog and full expanded catalog.

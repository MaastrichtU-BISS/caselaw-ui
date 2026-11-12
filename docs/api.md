# Component API reference

These 54 components adapt Bizzy components and repeated interface patterns.
They are exported by both `biss-ui/vue` and `biss-ui/svelte`. Source types are
also exported as `BissNameProps` from the corresponding framework entry point.
The inherited components are described in [legacy-api.md](legacy-api.md).

## BissActivityList

[Vue source](../src/vue/BissActivityList.vue) · [Svelte source](../src/svelte/BissActivityList.svelte)

```ts
items: {key:string;actor:string;action:string;time:string;detail?:string}[]; label: string
```

## BissAlertLine

[Vue source](../src/vue/BissAlertLine.vue) · [Svelte source](../src/svelte/BissAlertLine.svelte)

```ts
tone?: "danger" | "warning" | "info"; label?: string
```

## BissAvatar

[Vue source](../src/vue/BissAvatar.vue) · [Svelte source](../src/svelte/BissAvatar.svelte)

```ts
name: string; size?: number; label?: string
```

## BissCalendar

[Vue source](../src/vue/BissCalendar.vue) · [Svelte source](../src/svelte/BissCalendar.svelte)

```ts
month: string; items: BissCalendarItem[]; label: string; locale?: string; readonly?: boolean; addLabel?: string
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'open': [id:string];'add': [day:string]
```

## BissCapacityBar

[Vue source](../src/vue/BissCapacityBar.vue) · [Svelte source](../src/svelte/BissCapacityBar.svelte)

```ts
allocated: number; available: number|null; label: string; locale?: string
```

## BissChartLegend

[Vue source](../src/vue/BissChartLegend.vue) · [Svelte source](../src/svelte/BissChartLegend.svelte)

```ts
items: {label:string; color:string; dashed?:boolean}[]; label: string
```

## BissChecklist

[Vue source](../src/vue/BissChecklist.vue) · [Svelte source](../src/svelte/BissChecklist.svelte)

```ts
items: {key:string;label:string;description?:string;done:boolean;disabled?:boolean}[]; label: string
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'change': [item:{key:string;done:boolean}]
```

## BissDateField

[Vue source](../src/vue/BissDateField.vue) · [Svelte source](../src/svelte/BissDateField.svelte)

```ts
label: string; value?: string|null; placeholder?: string; min?: string|undefined; max?: string|undefined; locale?: string; disabled?: boolean; width?: number
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'change': [value:string|null]
```

## BissDatePicker

[Vue source](../src/vue/BissDatePicker.vue) · [Svelte source](../src/svelte/BissDatePicker.svelte)

```ts
value?: string|null; range?: boolean; start?: string|null; end?: string|null; min?: string|undefined; max?: string|undefined; label?: string; locale?: string; today?: string; previousLabel?: string; nextLabel?: string; clearLabel?: string; todayLabel?: string; typeLabel?: string; invalidLabel?: string
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'change': [value:string|null];'range': [value:{start:string|null;end:string|null}]
```

## BissDialog

[Vue source](../src/vue/BissDialog.vue) · [Svelte source](../src/svelte/BissDialog.svelte)

```ts
open?: boolean; title: string; description?: string|undefined; width?: number; closeLabel?: string; busy?: boolean
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'close': []
```

Slots / Svelte snippets: `default / children`, `actions`.

## BissEditableText

[Vue source](../src/vue/BissEditableText.vue) · [Svelte source](../src/svelte/BissEditableText.svelte)

```ts
value?: string; label: string; placeholder?: string; readonly?: boolean; multiline?: boolean
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'change': [value:string]
```

## BissGoalBar

[Vue source](../src/vue/BissGoalBar.vue) · [Svelte source](../src/svelte/BissGoalBar.svelte)

```ts
value: number | null; expected?: number; label: string; tone?: "primary" | "success" | "danger" | "warning"; height?: number
```

## BissGoalCard

[Vue source](../src/vue/BissGoalCard.vue) · [Svelte source](../src/svelte/BissGoalCard.svelte)

```ts
title: string; progress: number|null; label: string; expected?: number|undefined; status?: string|undefined; tone?: "primary"|"success"|"danger"|"warning"; href?: string|undefined
```

Slots / Svelte snippets: `actions`, `default / children`.

## BissGroupedBars

[Vue source](../src/vue/BissGroupedBars.vue) · [Svelte source](../src/svelte/BissGroupedBars.svelte)

```ts
categories: string[]; series: BissBarSeries[]; label: string; height?: number; locale?: string
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'pick': [value:{series:string;index:number}]
```

## BissHeaderAction

[Vue source](../src/vue/BissHeaderAction.vue) · [Svelte source](../src/svelte/BissHeaderAction.svelte)

```ts
label: string; icon?: BissIconName|undefined; href?: string|undefined; pressed?: boolean|undefined; disabled?: boolean; shortcut?: string|undefined
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'click': [event:MouseEvent]
```

Slots / Svelte snippets: `default / children`.

## BissHomeCard

[Vue source](../src/vue/BissHomeCard.vue) · [Svelte source](../src/svelte/BissHomeCard.svelte)

```ts
title: string; note?: string|undefined; icon?: BissIconName|undefined; count?: number|undefined; busy?: boolean; flush?: boolean
```

Slots / Svelte snippets: `actions`, `default / children`, `footer`.

## BissHomeSkel

[Vue source](../src/vue/BissHomeSkel.vue) · [Svelte source](../src/svelte/BissHomeSkel.svelte)

```ts
rows?: number; label?: string; shape?: "list" | "figure" | "chips"
```

## BissIcon

[Vue source](../src/vue/BissIcon.vue) · [Svelte source](../src/svelte/BissIcon.svelte)

```ts
name: BissIconName
```

## BissKanban

[Vue source](../src/vue/BissKanban.vue) · [Svelte source](../src/svelte/BissKanban.svelte)

```ts
lanes: BissBoardLane[]; cards: BissBoardCard[]; label: string; readonly?: boolean; addLabel?: string; moveLabel?: string
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'open': [id:string];'move': [value:{id:string;lane:string}];'add': [lane:string]
```

## BissLineChart

[Vue source](../src/vue/BissLineChart.vue) · [Svelte source](../src/svelte/BissLineChart.svelte)

```ts
values: number[]; label: string; height?: number; color?: string
```

## BissLiveStatus

[Vue source](../src/vue/BissLiveStatus.vue) · [Svelte source](../src/svelte/BissLiveStatus.svelte)

```ts
state?: "live"|"reconnecting"|"offline"; reconnectingLabel?: string; offlineLabel?: string
```

## BissMenu

[Vue source](../src/vue/BissMenu.vue) · [Svelte source](../src/svelte/BissMenu.svelte)

```ts
label: string; items: BissMenuItem[]; searchable?: boolean; searchLabel?: string; backLabel?: string; emptyLabel?: string; disabled?: boolean; width?: number
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'pick': [item:BissMenuItem]
```

## BissMiniChart

[Vue source](../src/vue/BissMiniChart.vue) · [Svelte source](../src/svelte/BissMiniChart.svelte)

```ts
type?: "kpi"|"bar"|"column"|"stacked"|"line"|"table"|"text"
```

## BissNoAccess

[Vue source](../src/vue/BissNoAccess.vue) · [Svelte source](../src/svelte/BissNoAccess.svelte)

```ts
title?: string; description?: string
```

Slots / Svelte snippets: `actions`.

## BissNoticeRow

[Vue source](../src/vue/BissNoticeRow.vue) · [Svelte source](../src/svelte/BissNoticeRow.svelte)

```ts
title: string; detail?: string; meta?: string; unread?: boolean; unreadLabel?: string
```

## BissOnboardingChips

[Vue source](../src/vue/BissOnboardingChips.vue) · [Svelte source](../src/svelte/BissOnboardingChips.svelte)

```ts
options: BissPickOption[]; selected?: string[]; label: string
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'change': [value:string[]]
```

## BissOnboardingFrame

[Vue source](../src/vue/BissOnboardingFrame.vue) · [Svelte source](../src/svelte/BissOnboardingFrame.svelte)

```ts
title: string; description?: string|undefined; step?: number|undefined; steps?: number|undefined
```

Slots / Svelte snippets: `default / children`, `actions`.

## BissPageBar

[Vue source](../src/vue/BissPageBar.vue) · [Svelte source](../src/svelte/BissPageBar.svelte)

```ts
title: string; description?: string; meta?: string
```

## BissPageHint

[Vue source](../src/vue/BissPageHint.vue) · [Svelte source](../src/svelte/BissPageHint.svelte)

```ts
label: string; text: string
```

Slots / Svelte snippets: `default / children`.

## BissPeopleCell

[Vue source](../src/vue/BissPeopleCell.vue) · [Svelte source](../src/svelte/BissPeopleCell.svelte)

```ts
people: BissPerson[]; empty?: string; limit?: number
```

## BissPopover

[Vue source](../src/vue/BissPopover.vue) · [Svelte source](../src/svelte/BissPopover.svelte)

```ts
label: string; disabled?: boolean; width?: number
```

Slots / Svelte snippets: `default / children`.

## BissPresenceStack

[Vue source](../src/vue/BissPresenceStack.vue) · [Svelte source](../src/svelte/BissPresenceStack.svelte)

```ts
people: BissPerson[]; limit?: number; size?: number; label?: string; selfId?: string|undefined
```

Slots / Svelte snippets: `default / children`.

## BissPropertyList

[Vue source](../src/vue/BissPropertyList.vue) · [Svelte source](../src/svelte/BissPropertyList.svelte)

```ts
items: {key:string;label:string;value:string;href?:string}[]; label: string
```

Slots / Svelte snippets: `default / children`.

## BissRecordChip

[Vue source](../src/vue/BissRecordChip.vue) · [Svelte source](../src/svelte/BissRecordChip.svelte)

```ts
label: string; href?: string|undefined; icon?: BissIconName; meta?: string|undefined
```

## BissSaveBar

[Vue source](../src/vue/BissSaveBar.vue) · [Svelte source](../src/svelte/BissSaveBar.svelte)

```ts
show: boolean; saving?: boolean; error?: string; note?: string; saveLabel?: string; discardLabel?: string
```

## BissSearchPalette

[Vue source](../src/vue/BissSearchPalette.vue) · [Svelte source](../src/svelte/BissSearchPalette.svelte)

```ts
open?: boolean; label?: string; items: BissSearchItem[]; placeholder?: string; emptyLabel?: string; loading?: boolean; loadingLabel?: string
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'close': [];'query': [value:string];'pick': [item:BissSearchItem]
```

## BissSelectPicker

[Vue source](../src/vue/BissSelectPicker.vue) · [Svelte source](../src/svelte/BissSelectPicker.svelte)

```ts
label: string; options: BissPickOption[]; value?: string; placeholder?: string; searchable?: boolean; searchLabel?: string; emptyLabel?: string; disabled?: boolean; width?: number
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'change': [value:string]
```

## BissSettingsHead

[Vue source](../src/vue/BissSettingsHead.vue) · [Svelte source](../src/svelte/BissSettingsHead.svelte)

```ts
title: string; help?: string; more?: string
```

## BissSidePanel

[Vue source](../src/vue/BissSidePanel.vue) · [Svelte source](../src/svelte/BissSidePanel.svelte)

```ts
open?: boolean; title: string; description?: string|undefined; width?: number; closeLabel?: string; busy?: boolean
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'close': []
```

Slots / Svelte snippets: `default / children`, `actions`.

## BissStatusCell

[Vue source](../src/vue/BissStatusCell.vue) · [Svelte source](../src/svelte/BissStatusCell.svelte)

```ts
label: string; color?: string; soft?: boolean
```

## BissSummaryStrip

[Vue source](../src/vue/BissSummaryStrip.vue) · [Svelte source](../src/svelte/BissSummaryStrip.svelte)

```ts
items: { label:string; value:string; sub?:string; color?:string }[]; label: string
```

## BissSwatchPicker

[Vue source](../src/vue/BissSwatchPicker.vue) · [Svelte source](../src/svelte/BissSwatchPicker.svelte)

```ts
label: string; value?: string; colors?: {value:string;label:string;color:string}[]; disabled?: boolean; width?: number
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'change': [value:string]
```

## BissTableAddRow

[Vue source](../src/vue/BissTableAddRow.vue) · [Svelte source](../src/svelte/BissTableAddRow.svelte)

```ts
label: string; disabled?: boolean
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'add': []
```

## BissTableGroup

[Vue source](../src/vue/BissTableGroup.vue) · [Svelte source](../src/svelte/BissTableGroup.svelte)

```ts
label: string; count?: number|undefined; color?: string; collapsed?: boolean
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'toggle': [collapsed:boolean]
```

Slots / Svelte snippets: `actions`, `default / children`.

## BissTableHead

[Vue source](../src/vue/BissTableHead.vue) · [Svelte source](../src/svelte/BissTableHead.svelte)

```ts
label: string; sort?: "asc"|"desc"|null; sortable?: boolean; align?: "start"|"end"
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'sort': [direction:"asc"|"desc"|null]
```

Slots / Svelte snippets: `default / children`.

## BissTablePager

[Vue source](../src/vue/BissTablePager.vue) · [Svelte source](../src/svelte/BissTablePager.svelte)

```ts
page: number; total: number; pageSize?: number; label?: string; previousLabel?:string; nextLabel?:string
```

## BissTableTotal

[Vue source](../src/vue/BissTableTotal.vue) · [Svelte source](../src/svelte/BissTableTotal.svelte)

```ts
label: string; value: string|number; note?: string|undefined
```

## BissTimeline

[Vue source](../src/vue/BissTimeline.vue) · [Svelte source](../src/svelte/BissTimeline.svelte)

```ts
from: string; to: string; items: BissTimelineItem[]; label: string
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'open': [id:string]
```

## BissToolButton

[Vue source](../src/vue/BissToolButton.vue) · [Svelte source](../src/svelte/BissToolButton.svelte)

```ts
label: string; icon?: BissIconName|undefined; active?: boolean; count?: number|undefined; clearable?: boolean; clearLabel?: string; disabled?: boolean
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'click': [event:MouseEvent];'clear': []
```

## BissToolNew

[Vue source](../src/vue/BissToolNew.vue) · [Svelte source](../src/svelte/BissToolNew.svelte)

```ts
label: string; items?: BissMenuItem[]; disabled?: boolean; moreLabel?: string
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'add': [];'pick': [item:BissMenuItem]
```

## BissToolSearch

[Vue source](../src/vue/BissToolSearch.vue) · [Svelte source](../src/svelte/BissToolSearch.svelte)

```ts
value?: string; label?: string; placeholder?: string; clearLabel?: string; shortcut?: boolean
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'change': [value:string]
```

## BissToolbar

[Vue source](../src/vue/BissToolbar.vue) · [Svelte source](../src/svelte/BissToolbar.svelte)

```ts
label: string
```

## BissValuePicker

[Vue source](../src/vue/BissValuePicker.vue) · [Svelte source](../src/svelte/BissValuePicker.svelte)

```ts
options: BissPickOption[]; selected?: string[]; label: string; negate?: boolean; canNegate?: boolean; searchLabel?: string; clearLabel?: string; isLabel?: string; isNotLabel?: string; emptyLabel?: string
```

Events (Vue) and callbacks (Svelte, prefixed `on`):

```ts
'change': [value:string[]];'negate': [value:boolean]
```

## BissViewTabs

[Vue source](../src/vue/BissViewTabs.vue) · [Svelte source](../src/svelte/BissViewTabs.svelte)

```ts
items: {key:string;label:string;count?:number;disabled?:boolean}[]; modelValue: string; label: string
```

# Component API reference

All 130 components are available in Vue and Svelte with one Bizzy design language. This file is generated from the same source-derived contracts as the documentation site. Import components and their `BissNameProps` types from the matching framework entry point. Native attributes supported by the framework also apply; tables list authored component props.

## BissAccessList

Access List for the team’s everyday work.

[Vue source](../src/vue/BissAccessList.vue) · [Svelte source](../src/svelte/BissAccessList.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `roleLabel` | `string` | No | `'Role: {name}'` |
| `entries` | `BissAccessEntry[]` | Yes | — |
| `roles` | `BissPickOption[]` | Yes | — |
| `label` | `string` | No | `'Who has access'` |
| `inheritedLabel` | `string` | No | `'From workspace'` |
| `removeLabel` | `string` | No | `'Remove access'` |

Events:

- `role`: `[value: { id: string; role: string }]`
- `remove`: `[id: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `roleLabel` | `string` | No | `'Role: {name}'` |
| `entries` | `BissAccessEntry[]` | Yes | — |
| `roles` | `BissPickOption[]` | Yes | — |
| `label` | `string` | No | `'Who has access'` |
| `inheritedLabel` | `string` | No | `'From workspace'` |
| `removeLabel` | `string` | No | `'Remove access'` |
| `onrole` | `(value: { id: string; role: string }) => void` | No | — |
| `onremove` | `(id: string) => void` | No | — |

Callbacks:

- `onrole`: `(value: { id: string; role: string }) => void`
- `onremove`: `(id: string) => void`

## BissActionCard

A linked surface for choosing a destination, available in both frameworks.

[Vue source](../src/vue/BissActionCard.vue) · [Svelte source](../src/svelte/BissActionCard.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `href` | `string` | Yes | — |
| `title` | `string` | Yes | — |
| `copy` | `string` | No | `''` |
| `active` | `boolean` | No | `false` |

Slots: `icon`, `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `href` | `string` | Yes | — |
| `title` | `string` | Yes | — |
| `copy` | `string` | No | `''` |
| `active` | `boolean` | No | `false` |
| `icon` | `import('svelte').Snippet` | No | — |
| `children` | `import('svelte').Snippet` | No | — |

Snippets: `icon`, `children`.

## BissActivityList

Activity List for the team’s everyday work.

[Vue source](../src/vue/BissActivityList.vue) · [Svelte source](../src/svelte/BissActivityList.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ key: string; actor: string; action: string; time: string; detail?: string }[]` | Yes | — |
| `label` | `string` | Yes | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ key: string; actor: string; action: string; time: string; detail?: string }[]` | Yes | — |
| `label` | `string` | Yes | — |

## BissAgenda

Agenda for the team’s everyday work.

[Vue source](../src/vue/BissAgenda.vue) · [Svelte source](../src/svelte/BissAgenda.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ id: string; title: string; minutes?: number; done: boolean }[]` | Yes | — |
| `label` | `string` | No | `'Meeting agenda'` |
| `readonly` | `boolean` | No | `false` |
| `addLabel` | `string` | No | `'Add agenda item'` |
| `completeLabel` | `string` | No | `'Covered'` |
| `moveUpLabel` | `string` | No | `'Move earlier'` |
| `moveDownLabel` | `string` | No | `'Move later'` |

Events:

- `change`: `[items: { id: string; title: string; minutes?: number; done: boolean }[]]`
- `add`: `[title: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ id: string; title: string; minutes?: number; done: boolean }[]` | Yes | — |
| `label` | `string` | No | `'Meeting agenda'` |
| `readonly` | `boolean` | No | `false` |
| `addLabel` | `string` | No | `'Add agenda item'` |
| `completeLabel` | `string` | No | `'Covered'` |
| `moveUpLabel` | `string` | No | `'Move earlier'` |
| `moveDownLabel` | `string` | No | `'Move later'` |
| `onchange` | `(items: { id: string; title: string; minutes?: number; done: boolean }[]) => void` | No | — |
| `onadd` | `(title: string) => void` | No | — |

Callbacks:

- `onchange`: `(items: { id: string; title: string; minutes?: number; done: boolean }[]) => void`
- `onadd`: `(title: string) => void`

## BissAlertLine

One quiet line that names a concern and points toward a useful action.

[Vue source](../src/vue/BissAlertLine.vue) · [Svelte source](../src/svelte/BissAlertLine.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `tone` | `'danger' \| 'warning' \| 'info'` | No | `'info'` |
| `label` | `string` | No | — |

Slots: `default`, `actions`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `tone` | `string` | No | `'info'` |
| `label` | `string \| undefined` | No | `undefined` |
| `children` | `import('svelte').Snippet` | No | — |
| `actions` | `import('svelte').Snippet` | No | — |

Snippets: `children`, `actions`.

## BissAppShell

An application frame with navigation, a working area and optional account furniture.

[Vue source](../src/vue/BissAppShell.vue) · [Svelte source](../src/svelte/BissAppShell.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `brand` | `string` | No | `'Workspace'` |
| `mark` | `string` | No | `'B'` |
| `icon` | `BissServiceIconName` | No | — |
| `iconLabel` | `string` | No | — |
| `favicon` | `boolean` | No | `true` |
| `href` | `string` | No | `'/'` |
| `topLinks` | `BissLink[]` | No | `() => []` |
| `footer` | `boolean` | No | `false` |
| `footerText` | `string` | No | `'Managed by BISS Institute.'` |
| `footerLinks` | `BissLink[]` | No | `() => []` |
| `fluid` | `boolean` | No | `false` |

Slots: `icon`, `topbar-actions`, `sidebar`, `sidebar-footer`, `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `brand` | `string` | No | `'Workspace'` |
| `mark` | `string` | No | `'B'` |
| `icon` | `BissServiceIconName` | No | — |
| `iconLabel` | `string` | No | — |
| `href` | `string` | No | `'/'` |
| `favicon` | `boolean` | No | `true` |
| `topLinks` | `BissLink[]` | No | `[]` |
| `footer` | `boolean` | No | `false` |
| `footerText` | `string` | No | `'Managed by BISS Institute.'` |
| `footerLinks` | `BissLink[]` | No | `[]` |
| `fluid` | `boolean` | No | `false` |
| `children` | `Snippet` | No | — |
| `sidebar` | `Snippet` | No | — |
| `sidebarFooter` | `Snippet` | No | — |
| `topbarActions` | `Snippet` | No | — |
| `footerContent` | `Snippet` | No | — |

Snippets: `children`, `sidebar`, `sidebarFooter`, `topbarActions`, `footerContent`.

## BissAttachmentList

Attachment List for the team’s everyday work.

[Vue source](../src/vue/BissAttachmentList.vue) · [Svelte source](../src/svelte/BissAttachmentList.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `BissAttachment[]` | Yes | — |
| `label` | `string` | No | `'Attachments'` |
| `removeLabel` | `string` | No | `'Remove'` |

Events:

- `remove`: `[id: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `BissAttachment[]` | Yes | — |
| `label` | `string` | No | `'Attachments'` |
| `removeLabel` | `string` | No | `'Remove'` |
| `onremove` | `(id: string) => void` | No | — |

Callbacks:

- `onremove`: `(id: string) => void`

## BissAvatar

Initials on a stable color derived from a person’s name.

[Vue source](../src/vue/BissAvatar.vue) · [Svelte source](../src/svelte/BissAvatar.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `name` | `string` | Yes | — |
| `size` | `number` | No | `32` |
| `label` | `string` | No | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `name` | `string` | Yes | — |
| `size` | `number` | No | `32` |
| `label` | `string \| undefined` | No | `undefined` |

## BissBadge

A compact status or category label with optional dot and tone.

[Vue source](../src/vue/BissBadge.vue) · [Svelte source](../src/svelte/BissBadge.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `tone` | `BissTone` | No | `'neutral'` |
| `dot` | `boolean` | No | `false` |
| `mono` | `boolean` | No | `false` |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `tone` | `BissTone` | No | `'neutral'` |
| `dot` | `boolean` | No | `false` |
| `mono` | `boolean` | No | `false` |
| `children` | `Snippet` | No | — |

Snippets: `children`.

## BissBarChart

A compact request-style bar chart with an optional highlighted sub-series.

[Vue source](../src/vue/BissBarChart.vue) · [Svelte source](../src/svelte/BissBarChart.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `points` | `BissChartPoint[]` | Yes | — |
| `seriesLabel` | `string` | No | `'Requests'` |
| `compareLabel` | `string` | No | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `points` | `BissChartPoint[]` | Yes | — |
| `seriesLabel` | `string` | No | `'Requests'` |
| `compareLabel` | `string` | No | `'Flagged'` |

## BissBookmark

Bookmark for the team’s everyday work.

[Vue source](../src/vue/BissBookmark.vue) · [Svelte source](../src/svelte/BissBookmark.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `href` | `string` | Yes | — |
| `title` | `string` | Yes | — |
| `description` | `string \| undefined` | No | `undefined` |
| `site` | `string \| undefined` | No | `undefined` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `href` | `string` | Yes | — |
| `title` | `string` | Yes | — |
| `description` | `string \| undefined` | No | `undefined` |
| `site` | `string \| undefined` | No | `undefined` |

## BissBottomBar

A shared footer for ownership, help and policy links.

[Vue source](../src/vue/BissBottomBar.vue) · [Svelte source](../src/svelte/BissBottomBar.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `managedBy` | `string` | No | `'Managed by BISS Institute.'` |
| `links` | `BissLink[]` | No | `() => []` |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `managedBy` | `string` | No | `'Managed by BISS Institute.'` |
| `links` | `BissLink[]` | No | `[]` |
| `children` | `import('svelte').Snippet` | No | — |

Snippets: `children`.

## BissBreadcrumbs

Breadcrumbs for the team’s everyday work.

[Vue source](../src/vue/BissBreadcrumbs.vue) · [Svelte source](../src/svelte/BissBreadcrumbs.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ label: string; href?: string }[]` | Yes | — |
| `label` | `string` | No | `'Breadcrumbs'` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ label: string; href?: string }[]` | Yes | — |
| `label` | `string` | No | `'Breadcrumbs'` |

## BissButton

A clear action with an explicit visual priority.

[Vue source](../src/vue/BissButton.vue) · [Svelte source](../src/svelte/BissButton.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `href` | `string` | No | — |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'danger-quiet'` | No | `'primary'` |
| `size` | `'md' \| 'sm'` | No | `'md'` |
| `type` | `'button' \| 'submit' \| 'reset'` | No | `'button'` |
| `disabled` | `boolean` | No | `false` |
| `loading` | `boolean` | No | `false` |
| `block` | `boolean` | No | `false` |
| `icon` | `boolean` | No | `false` |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `loading` | `boolean` | No | `false` |
| `href` | `string` | No | — |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'danger-quiet'` | No | `'primary'` |
| `size` | `'md' \| 'sm'` | No | `'md'` |
| `type` | `'button' \| 'submit' \| 'reset'` | No | `'button'` |
| `block` | `boolean` | No | `false` |
| `icon` | `boolean` | No | `false` |
| `children` | `Snippet` | No | — |

Snippets: `children`.

## BissCalendar

Dates and deadlines in a month grid, with an agenda on phones.

[Vue source](../src/vue/BissCalendar.vue) · [Svelte source](../src/svelte/BissCalendar.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `month` | `string` | Yes | — |
| `items` | `BissCalendarItem[]` | Yes | — |
| `label` | `string` | Yes | — |
| `locale` | `string` | No | `'en-GB'` |
| `readonly` | `boolean` | No | `false` |
| `addLabel` | `string` | No | `'Add on'` |

Events:

- `open`: `[id: string]`
- `add`: `[day: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `month` | `string` | Yes | — |
| `items` | `BissCalendarItem[]` | Yes | — |
| `label` | `string` | Yes | — |
| `locale` | `string` | No | `'en-GB'` |
| `readonly` | `boolean` | No | `false` |
| `addLabel` | `string` | No | `'Add on'` |
| `onopen` | `(id: string) => void` | No | — |
| `onadd` | `(day: string) => void` | No | — |

Callbacks:

- `onopen`: `(id: string) => void`
- `onadd`: `(day: string) => void`

## BissCallout

Callout for the team’s everyday work.

[Vue source](../src/vue/BissCallout.vue) · [Svelte source](../src/svelte/BissCallout.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `tone` | `BissTone` | No | `'info'` |
| `title` | `string` | No | — |

Slots: `default`, `actions`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `tone` | `BissTone` | No | `'info'` |
| `title` | `string` | No | — |
| `children` | `Snippet` | No | — |
| `actions` | `Snippet` | No | — |

Snippets: `children`, `actions`.

## BissCapacityBar

Allocated capacity against availability, with explicit overload feedback.

[Vue source](../src/vue/BissCapacityBar.vue) · [Svelte source](../src/svelte/BissCapacityBar.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `allocated` | `number` | Yes | — |
| `available` | `number \| null` | Yes | — |
| `label` | `string` | Yes | — |
| `locale` | `string` | No | `'en-GB'` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `allocated` | `number` | Yes | — |
| `available` | `number \| null` | Yes | — |
| `label` | `string` | Yes | — |
| `locale` | `string` | No | `'en-GB'` |

## BissCard

A quiet surface that groups one related set of content.

[Vue source](../src/vue/BissCard.vue) · [Svelte source](../src/svelte/BissCard.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `padded` | `boolean` | No | `true` |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `padded` | `boolean` | No | `true` |
| `children` | `import('svelte').Snippet` | No | — |

Snippets: `children`.

## BissChartLegend

Name the colors and line treatments used by a chart.

[Vue source](../src/vue/BissChartLegend.vue) · [Svelte source](../src/svelte/BissChartLegend.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ label: string; color: string; dashed?: boolean }[]` | Yes | — |
| `label` | `string` | Yes | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ label: string; color: string; dashed?: boolean }[]` | Yes | — |
| `label` | `string` | Yes | — |

## BissCheckbox

Checkbox for the team’s everyday work.

[Vue source](../src/vue/BissCheckbox.vue) · [Svelte source](../src/svelte/BissCheckbox.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `checked` | `boolean` | No | `false` |
| `label` | `string` | Yes | — |
| `description` | `string \| undefined` | No | `undefined` |
| `disabled` | `boolean` | No | `false` |

Events:

- `change`: `[value: boolean]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `checked` | `boolean` | No | `$bindable(false)` |
| `label` | `string` | Yes | — |
| `description` | `string \| undefined` | No | `undefined` |
| `disabled` | `boolean` | No | `false` |
| `onchange` | `(value: boolean) => void` | No | — |

Callbacks:

- `onchange`: `(value: boolean) => void`

## BissChecklist

A labelled set of completion steps controlled by the host application.

[Vue source](../src/vue/BissChecklist.vue) · [Svelte source](../src/svelte/BissChecklist.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ key: string; label: string; description?: string; done: boolean; disabled?: boolean }[]` | Yes | — |
| `label` | `string` | Yes | — |

Events:

- `change`: `[item: { key: string; done: boolean }]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ key: string; label: string; description?: string; done: boolean; disabled?: boolean; }[]` | Yes | — |
| `label` | `string` | Yes | — |
| `onchange` | `(item: { key: string; done: boolean }) => void` | No | — |

Callbacks:

- `onchange`: `(item: { key: string; done: boolean }) => void`

## BissCodeBlock

Readable highlighted code with a copy action.

[Vue source](../src/vue/BissCodeBlock.vue) · [Svelte source](../src/svelte/BissCodeBlock.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `code` | `string` | Yes | — |
| `label` | `string` | No | — |
| `copyable` | `boolean` | No | `true` |
| `language` | `BissCodeLanguage \| string` | No | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `code` | `string` | Yes | — |
| `label` | `string \| undefined` | No | `undefined` |
| `copyable` | `boolean` | No | `true` |
| `language` | `string \| undefined` | No | `undefined` |

## BissCodeTabs

Keep related language samples together and copy the active one.

[Vue source](../src/vue/BissCodeTabs.vue) · [Svelte source](../src/svelte/BissCodeTabs.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `samples` | `BissCodeSample[]` | Yes | — |
| `activeIndex` | `number` | No | `0` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `samples` | `BissCodeSample[]` | No | `[]` |
| `activeIndex` | `number` | No | `$bindable(0)` |

## BissColumnManager

Column Manager for the team’s everyday work.

[Vue source](../src/vue/BissColumnManager.vue) · [Svelte source](../src/svelte/BissColumnManager.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `columns` | `BissColumn[]` | Yes | — |
| `label` | `string` | No | `'Columns'` |
| `showLabel` | `string` | No | `'Show'` |
| `pinLabel` | `string` | No | `'Pin'` |
| `widthLabel` | `string` | No | `'Width'` |
| `upLabel` | `string` | No | `'Move up'` |
| `downLabel` | `string` | No | `'Move down'` |

Events:

- `change`: `[columns: BissColumn[]]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `columns` | `BissColumn[]` | Yes | — |
| `label` | `string` | No | `'Columns'` |
| `showLabel` | `string` | No | `'Show'` |
| `pinLabel` | `string` | No | `'Pin'` |
| `widthLabel` | `string` | No | `'Width'` |
| `upLabel` | `string` | No | `'Move up'` |
| `downLabel` | `string` | No | `'Move down'` |
| `onchange` | `(columns: BissColumn[]) => void` | No | — |

Callbacks:

- `onchange`: `(columns: BissColumn[]) => void`

## BissCommentComposer

Comment Composer for the team’s everyday work.

[Vue source](../src/vue/BissCommentComposer.vue) · [Svelte source](../src/svelte/BissCommentComposer.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | No | `'Write a comment'` |
| `submitLabel` | `string` | No | `'Post comment'` |
| `busy` | `boolean` | No | `false` |
| `error` | `string \| undefined` | No | `undefined` |

Events:

- `submit`: `[body: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | No | `'Write a comment'` |
| `submitLabel` | `string` | No | `'Post comment'` |
| `busy` | `boolean` | No | `false` |
| `error` | `string \| undefined` | No | `undefined` |
| `onsubmit` | `(body: string) => void` | No | — |

Callbacks:

- `onsubmit`: `(body: string) => void`

## BissCommentThread

Comment Thread for the team’s everyday work.

[Vue source](../src/vue/BissCommentThread.vue) · [Svelte source](../src/svelte/BissCommentThread.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `composerLabel` | `string` | No | `'Write a comment'` |
| `submitLabel` | `string` | No | `'Post comment'` |
| `items` | `BissComment[]` | Yes | — |
| `label` | `string` | No | `'Discussion'` |
| `resolved` | `boolean` | No | `false` |
| `readonly` | `boolean` | No | `false` |
| `resolveLabel` | `string` | No | `'Resolve'` |
| `reopenLabel` | `string` | No | `'Reopen'` |

Events:

- `resolve`: `[value: boolean]`
- `comment`: `[body: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `composerLabel` | `string` | No | `'Write a comment'` |
| `submitLabel` | `string` | No | `'Post comment'` |
| `items` | `BissComment[]` | Yes | — |
| `label` | `string` | No | `'Discussion'` |
| `resolved` | `boolean` | No | `false` |
| `readonly` | `boolean` | No | `false` |
| `resolveLabel` | `string` | No | `'Resolve'` |
| `reopenLabel` | `string` | No | `'Reopen'` |
| `onresolve` | `(value: boolean) => void` | No | — |
| `oncomment` | `(body: string) => void` | No | — |

Callbacks:

- `onresolve`: `(value: boolean) => void`
- `oncomment`: `(body: string) => void`

## BissConfirmDialog

An explicit confirmation before a consequential action.

[Vue source](../src/vue/BissConfirmDialog.vue) · [Svelte source](../src/svelte/BissConfirmDialog.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `confirmLabel` | `string` | No | `'Confirm'` |
| `cancelLabel` | `string` | No | `'Cancel'` |
| `tone` | `'danger' \| 'primary'` | No | `'danger'` |
| `busy` | `boolean` | No | `false` |
| `modelValue` | `boolean` | No | `false` |

Events:

- `confirm`: `[]`

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `open` | `boolean` | No | `$bindable(false)` |
| `title` | `string` | Yes | — |
| `confirmLabel` | `string` | No | `'Confirm'` |
| `cancelLabel` | `string` | No | `'Cancel'` |
| `tone` | `'danger' \| 'primary'` | No | `'danger'` |
| `busy` | `boolean` | No | `false` |
| `children` | `Snippet` | No | — |
| `onconfirm` | `() => void` | No | — |

Callbacks:

- `onconfirm`: `() => void`

Snippets: `children`.

## BissConsoleHeader

A compact console heading with breadcrumbs, context and actions.

[Vue source](../src/vue/BissConsoleHeader.vue) · [Svelte source](../src/svelte/BissConsoleHeader.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `subtitle` | `string` | No | — |
| `crumbs` | `BissCrumb[]` | No | — |

Slots: `actions`, `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `subtitle` | `string` | No | — |
| `crumbs` | `BissCrumb[]` | No | `[]` |
| `actions` | `Snippet` | No | — |
| `children` | `Snippet` | No | — |

Snippets: `actions`, `children`.

## BissConsoleLayout

A ready-made console frame with sidebar, page heading and account area.

[Vue source](../src/vue/BissConsoleLayout.vue) · [Svelte source](../src/svelte/BissConsoleLayout.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `brand` | `string` | No | `'Workspace'` |
| `mark` | `string` | No | `'B'` |
| `icon` | `BissServiceIconName` | No | — |
| `iconLabel` | `string` | No | — |
| `favicon` | `boolean` | No | `true` |
| `href` | `string` | No | `'/'` |
| `topLinks` | `BissLink[]` | No | `() => []` |
| `footer` | `boolean` | No | `false` |
| `footerText` | `string` | No | `'Managed by BISS Institute.'` |
| `footerLinks` | `BissLink[]` | No | `() => []` |
| `fluid` | `boolean` | No | `false` |
| `title` | `string` | No | — |
| `subtitle` | `string` | No | — |
| `crumbs` | `BissCrumb[]` | No | — |
| `user` | `BissConsoleUser` | No | — |
| `accountHref` | `string` | No | — |
| `signOut` | `boolean` | No | `false` |
| `signOutLabel` | `string` | No | `'Sign out'` |
| `confirmSignOut` | `boolean` | No | `true` |
| `signOutTitle` | `string` | No | `'Sign out?'` |
| `signOutCopy` | `string` | No | — |
| `busy` | `boolean` | No | `false` |

Events:

- `signOut`: `[]`

Slots: `icon`, `topbar-actions`, `default`, `nav`, `nav-footer`, `user-actions`, `footer`, `actions`, `tabs`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `brand` | `string` | No | `'Workspace'` |
| `mark` | `string` | No | `'B'` |
| `icon` | `BissServiceIconName` | No | — |
| `iconLabel` | `string` | No | — |
| `favicon` | `boolean` | No | `true` |
| `href` | `string` | No | `'/'` |
| `topLinks` | `BissLink[]` | No | `[]` |
| `footer` | `boolean` | No | `false` |
| `footerText` | `string` | No | `'Managed by BISS Institute.'` |
| `footerLinks` | `BissLink[]` | No | `[]` |
| `fluid` | `boolean` | No | `false` |
| `title` | `string` | No | — |
| `subtitle` | `string` | No | — |
| `crumbs` | `BissCrumb[]` | No | `[]` |
| `user` | `BissConsoleUser` | No | — |
| `accountHref` | `string` | No | — |
| `signOut` | `boolean` | No | `false` |
| `signOutLabel` | `string` | No | `'Sign out'` |
| `confirmSignOut` | `boolean` | No | `true` |
| `signOutTitle` | `string` | No | `'Sign out?'` |
| `signOutCopy` | `string` | No | — |
| `busy` | `boolean` | No | `false` |
| `children` | `Snippet` | No | — |
| `nav` | `Snippet` | No | — |
| `navFooter` | `Snippet` | No | — |
| `userActions` | `Snippet` | No | — |
| `topbarActions` | `Snippet` | No | — |
| `actions` | `Snippet` | No | — |
| `tabs` | `Snippet` | No | — |
| `onsignOut` | `() => void` | No | — |

Callbacks:

- `onsignOut`: `() => void`

Snippets: `children`, `nav`, `navFooter`, `userActions`, `topbarActions`, `actions`, `tabs`.

## BissCopyField

A value that can be read, selected and copied without changing it.

[Vue source](../src/vue/BissCopyField.vue) · [Svelte source](../src/svelte/BissCopyField.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `string` | Yes | — |
| `copyLabel` | `string` | No | `'Copy'` |
| `copiedLabel` | `string` | No | `'Copied'` |
| `label` | `string` | No | — |
| `multiline` | `boolean` | No | `false` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `copyLabel` | `string` | No | `'Copy'` |
| `copiedLabel` | `string` | No | `'Copied'` |
| `value` | `string` | Yes | — |
| `label` | `string` | No | `'Copy value'` |
| `multiline` | `boolean` | No | `false` |

## BissDataGrid

Data Grid for the team’s everyday work.

[Vue source](../src/vue/BissDataGrid.vue) · [Svelte source](../src/svelte/BissDataGrid.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `selectedLabel` | `string` | No | `'{count} selected'` |
| `rowLabel` | `string` | No | `'Select {id}'` |
| `resizeLabel` | `string` | No | `'Resize {label}'` |
| `columnLabels` | `{ label?: string; showLabel?: string; pinLabel?: string; widthLabel?: string; upLabel?: string; downLabel?: string; }` | No | `{}` |
| `rows` | `({ id: string } & Record<string, unknown>)[]` | Yes | — |
| `columns` | `BissColumn[]` | Yes | — |
| `selected` | `string[]` | No | `[]` |
| `sortKey` | `string` | No | `''` |
| `sortDirection` | `'asc' \| 'desc'` | No | `'asc'` |
| `label` | `string` | Yes | — |
| `emptyLabel` | `string` | No | `'No records'` |
| `columnsLabel` | `string` | No | `'Customize columns'` |
| `selectAllLabel` | `string` | No | `'Select all rows'` |

Events:

- `columns`: `[columns: BissColumn[]]`
- `select`: `[ids: string[]]`
- `sort`: `[value: { key: string; direction: 'asc' \| 'desc' }]`

Slots: `cell`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `selectedLabel` | `string` | No | `'{count} selected'` |
| `rowLabel` | `string` | No | `'Select {id}'` |
| `resizeLabel` | `string` | No | `'Resize {label}'` |
| `columnLabels` | `{ label?: string; showLabel?: string; pinLabel?: string; widthLabel?: string; upLabel?: string; downLabel?: string; }` | No | `{}` |
| `rows` | `({ id: string } & Record<string, unknown>)[]` | Yes | — |
| `columns` | `BissColumn[]` | Yes | — |
| `selected` | `string[]` | No | `[]` |
| `sortKey` | `string` | No | `''` |
| `sortDirection` | `'asc' \| 'desc'` | No | `'asc'` |
| `label` | `string` | Yes | — |
| `emptyLabel` | `string` | No | `'No records'` |
| `columnsLabel` | `string` | No | `'Customize columns'` |
| `selectAllLabel` | `string` | No | `'Select all rows'` |
| `oncolumns` | `(columns: BissColumn[]) => void` | No | — |
| `onselect` | `(ids: string[]) => void` | No | — |
| `onsort` | `(value: { key: string; direction: 'asc' \| 'desc' }) => void` | No | — |
| `cell` | `Snippet< [{ row: { id: string } & Record<string, unknown>; column: BissColumn; value: unknown }] >` | No | — |

Callbacks:

- `oncolumns`: `(columns: BissColumn[]) => void`
- `onselect`: `(ids: string[]) => void`
- `onsort`: `(value: { key: string; direction: 'asc' \| 'desc' }) => void`

Snippets: `cell`.

## BissDataTable

Sortable columns, pagination and explicit loading and empty states.

[Vue source](../src/vue/BissDataTable.vue) · [Svelte source](../src/svelte/BissDataTable.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `columns` | `BissTableColumn[]` | Yes | — |
| `rows` | `Record<string, any>[]` | Yes | — |
| `empty` | `string` | No | — |
| `loading` | `boolean` | No | `false` |
| `loadingRows` | `number` | No | `4` |
| `pageSize` | `number` | No | `0` |

Slots: `empty`, `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `columns` | `BissTableColumn[]` | Yes | — |
| `rows` | `Record<string, unknown>[]` | Yes | — |
| `empty` | `string` | No | `'No rows'` |

## BissDataTile

Data Tile for the team’s everyday work.

[Vue source](../src/vue/BissDataTile.vue) · [Svelte source](../src/svelte/BissDataTile.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `note` | `string \| undefined` | No | `undefined` |
| `accent` | `string` | No | `'var(--biss-primary)'` |
| `source` | `string \| undefined` | No | `undefined` |
| `sourceLabel` | `string` | No | `'View records'` |

Slots: `actions`, `default`, `footer`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `note` | `string \| undefined` | No | `undefined` |
| `accent` | `string` | No | `'var(--biss-primary)'` |
| `source` | `string \| undefined` | No | `undefined` |
| `sourceLabel` | `string` | No | `'View records'` |
| `children` | `Snippet` | No | — |
| `actions` | `Snippet` | No | — |
| `footer` | `Snippet` | No | — |

Snippets: `children`, `actions`, `footer`.

## BissDateField

A compact date trigger with a calendar in a floating panel.

[Vue source](../src/vue/BissDateField.vue) · [Svelte source](../src/svelte/BissDateField.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `value` | `string \| null` | No | `null` |
| `placeholder` | `string` | No | `'Choose date'` |
| `min` | `string \| undefined` | No | `undefined` |
| `max` | `string \| undefined` | No | `undefined` |
| `locale` | `string` | No | `'en-GB'` |
| `disabled` | `boolean` | No | `false` |
| `width` | `number` | No | `300` |

Events:

- `change`: `[value: string \| null]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `value` | `string \| null` | No | `null` |
| `placeholder` | `string` | No | `'Choose date'` |
| `min` | `string \| undefined` | No | `undefined` |
| `max` | `string \| undefined` | No | `undefined` |
| `locale` | `string` | No | `'en-GB'` |
| `disabled` | `boolean` | No | `false` |
| `width` | `number` | No | `300` |
| `onchange` | `(value: string \| null) => void` | No | — |

Callbacks:

- `onchange`: `(value: string \| null) => void`

## BissDatePicker

Select a day or a range, type a date, or navigate the calendar by keyboard.

[Vue source](../src/vue/BissDatePicker.vue) · [Svelte source](../src/svelte/BissDatePicker.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `string \| null` | No | `null` |
| `range` | `boolean` | No | `false` |
| `start` | `string \| null` | No | `null` |
| `end` | `string \| null` | No | `null` |
| `min` | `string \| undefined` | No | `undefined` |
| `max` | `string \| undefined` | No | `undefined` |
| `label` | `string` | No | `'Choose date'` |
| `locale` | `string` | No | `'en-GB'` |
| `today` | `string` | No | `todayDay()` |
| `previousLabel` | `string` | No | `'Previous month'` |
| `nextLabel` | `string` | No | `'Next month'` |
| `clearLabel` | `string` | No | `'Clear'` |
| `todayLabel` | `string` | No | `'Today'` |
| `typeLabel` | `string` | No | `'Type a date'` |
| `invalidLabel` | `string` | No | `'Enter a valid date'` |

Events:

- `change`: `[value: string \| null]`
- `range`: `[value: { start: string \| null; end: string \| null }]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `string \| null` | No | `null` |
| `range` | `boolean` | No | `false` |
| `start` | `string \| null` | No | `null` |
| `end` | `string \| null` | No | `null` |
| `min` | `string \| undefined` | No | `undefined` |
| `max` | `string \| undefined` | No | `undefined` |
| `label` | `string` | No | `'Choose date'` |
| `locale` | `string` | No | `'en-GB'` |
| `today` | `string` | No | `todayDay()` |
| `previousLabel` | `string` | No | `'Previous month'` |
| `nextLabel` | `string` | No | `'Next month'` |
| `clearLabel` | `string` | No | `'Clear'` |
| `todayLabel` | `string` | No | `'Today'` |
| `typeLabel` | `string` | No | `'Type a date'` |
| `invalidLabel` | `string` | No | `'Enter a valid date'` |
| `onchange` | `(value: string \| null) => void` | No | — |
| `onrange` | `(value: { start: string \| null; end: string \| null }) => void` | No | — |

Callbacks:

- `onchange`: `(value: string \| null) => void`
- `onrange`: `(value: { start: string \| null; end: string \| null }) => void`

## BissDeadlineList

Deadline List for the team’s everyday work.

[Vue source](../src/vue/BissDeadlineList.vue) · [Svelte source](../src/svelte/BissDeadlineList.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ id: string; title: string; day: string; context?: string; overdue?: boolean }[]` | Yes | — |
| `label` | `string` | No | `'Upcoming deadlines'` |
| `locale` | `string` | No | `'en-GB'` |

Events:

- `open`: `[id: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ id: string; title: string; day: string; context?: string; overdue?: boolean }[]` | Yes | — |
| `label` | `string` | No | `'Upcoming deadlines'` |
| `locale` | `string` | No | `'en-GB'` |
| `onopen` | `(id: string) => void` | No | — |

Callbacks:

- `onopen`: `(id: string) => void`

## BissDialog

Connected dialog parts with managed focus, nested layers and a shared visual recipe.

[Vue source](../src/vue/BissDialog.vue) · [Svelte source](../src/svelte/BissDialog.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `open` | `boolean` | No | `false` |
| `title` | `string` | Yes | — |
| `description` | `string` | No | — |
| `width` | `number` | No | — |
| `size` | `BissDialogSize` | No | `'md'` |
| `closeLabel` | `string` | No | `'Close'` |
| `busy` | `boolean` | No | `false` |
| `portal` | `boolean` | No | `false` |
| `ui` | `BissDialogUi` | No | — |

Events:

- `close`: `[]`
- `update:open`: `[open: boolean]`

Slots: `default`, `actions`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `open` | `boolean` | No | `$bindable(false)` |
| `title` | `string` | Yes | — |
| `description` | `string` | No | — |
| `width` | `number` | No | — |
| `size` | `BissDialogSize` | No | `'md'` |
| `closeLabel` | `string` | No | `'Close'` |
| `busy` | `boolean` | No | `false` |
| `portal` | `boolean` | No | `false` |
| `ui` | `BissDialogUi` | No | — |
| `onclose` | `() => void` | No | — |
| `onOpenChange` | `(open: boolean) => void` | No | — |
| `children` | `Snippet` | No | — |
| `actions` | `Snippet` | No | — |

Callbacks:

- `onclose`: `() => void`
- `onOpenChange`: `(open: boolean) => void`

Snippets: `children`, `actions`.

## BissDisclosure

Disclosure for the team’s everyday work.

[Vue source](../src/vue/BissDisclosure.vue) · [Svelte source](../src/svelte/BissDisclosure.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `open` | `boolean` | No | `false` |

Events:

- `change`: `[value: boolean]`

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `open` | `boolean` | No | `$bindable(false)` |
| `onchange` | `(value: boolean) => void` | No | — |
| `children` | `Snippet` | No | — |

Callbacks:

- `onchange`: `(value: boolean) => void`

Snippets: `children`.

## BissDocumentCallout

Document Callout for the team’s everyday work.

[Vue source](../src/vue/BissDocumentCallout.vue) · [Svelte source](../src/svelte/BissDocumentCallout.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `tone` | `'neutral' \| 'info' \| 'warning' \| 'danger' \| 'success'` | No | `'info'` |
| `title` | `string \| undefined` | No | `undefined` |
| `icon` | `BissIconName` | No | `'info'` |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `tone` | `'neutral' \| 'info' \| 'warning' \| 'danger' \| 'success'` | No | `'info'` |
| `title` | `string \| undefined` | No | `undefined` |
| `icon` | `BissIconName` | No | `'info'` |
| `children` | `Snippet` | No | — |

Snippets: `children`.

## BissDocumentToc

Document Toc for the team’s everyday work.

[Vue source](../src/vue/BissDocumentToc.vue) · [Svelte source](../src/svelte/BissDocumentToc.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ id: string; title: string; level?: number; disabled?: boolean }[]` | Yes | — |
| `label` | `string` | No | `'On this page'` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ id: string; title: string; level?: number; disabled?: boolean }[]` | Yes | — |
| `label` | `string` | No | `'On this page'` |

## BissEditableText

Edit a value where it stands, with Enter to save and Escape to cancel.

[Vue source](../src/vue/BissEditableText.vue) · [Svelte source](../src/svelte/BissEditableText.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `string` | No | `''` |
| `label` | `string` | Yes | — |
| `placeholder` | `string` | No | `'Add text…'` |
| `readonly` | `boolean` | No | `false` |
| `multiline` | `boolean` | No | `false` |

Events:

- `change`: `[value: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `string` | No | `$bindable('')` |
| `label` | `string` | Yes | — |
| `placeholder` | `string` | No | `'Add text…'` |
| `readonly` | `boolean` | No | `false` |
| `multiline` | `boolean` | No | `false` |
| `onchange` | `(value: string) => void` | No | — |

Callbacks:

- `onchange`: `(value: string) => void`

## BissEmptyState

Explain why the area is empty and what someone can do next.

[Vue source](../src/vue/BissEmptyState.vue) · [Svelte source](../src/svelte/BissEmptyState.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | No | — |
| `copy` | `string` | No | — |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | No | — |
| `copy` | `string` | No | — |
| `children` | `Snippet` | No | — |

Snippets: `children`.

## BissFeatureCard

Describe one capability, using the service mark and supporting copy.

[Vue source](../src/vue/BissFeatureCard.vue) · [Svelte source](../src/svelte/BissFeatureCard.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `icon` | `BissServiceIconName` | No | — |
| `title` | `string` | Yes | — |
| `copy` | `string` | No | — |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `icon` | `BissServiceIconName \| undefined` | No | `undefined` |
| `title` | `string` | Yes | — |
| `copy` | `string` | No | `''` |
| `children` | `import('svelte').Snippet` | No | — |

Snippets: `children`.

## BissField

A label, hint or error around a control, with a scoped identifier.

[Vue source](../src/vue/BissField.vue) · [Svelte source](../src/svelte/BissField.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `id` | `string` | No | — |
| `label` | `string` | No | — |
| `hint` | `string` | No | — |
| `error` | `string` | No | — |
| `optional` | `boolean` | No | `false` |
| `optionalLabel` | `string` | No | `'optional'` |
| `required` | `boolean` | No | `false` |
| `disabled` | `boolean` | No | `false` |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `id` | `string` | No | — |
| `label` | `string` | No | — |
| `hint` | `string` | No | — |
| `error` | `string` | No | — |
| `optional` | `boolean` | No | `false` |
| `optionalLabel` | `string` | No | `'optional'` |
| `required` | `boolean` | No | `false` |
| `disabled` | `boolean` | No | `false` |
| `children` | `Snippet< [{ id: string; invalid: boolean; control: ReturnType<typeof fieldControl> }] >` | No | — |

Snippets: `children`.

## BissFigureHelp

Figure Help for the team’s everyday work.

[Vue source](../src/vue/BissFigureHelp.vue) · [Svelte source](../src/svelte/BissFigureHelp.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `paragraphs` | `string[]` | Yes | — |
| `href` | `string \| undefined` | No | `undefined` |
| `linkLabel` | `string` | No | `'View records'` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `paragraphs` | `string[]` | Yes | — |
| `href` | `string \| undefined` | No | `undefined` |
| `linkLabel` | `string` | No | `'View records'` |

## BissFilePicker

File Picker for the team’s everyday work.

[Vue source](../src/vue/BissFilePicker.vue) · [Svelte source](../src/svelte/BissFilePicker.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | No | `'Add files'` |
| `hint` | `string` | No | `'Choose files or drop them here.'` |
| `accept` | `string` | No | `''` |
| `multiple` | `boolean` | No | `true` |
| `disabled` | `boolean` | No | `false` |

Events:

- `pick`: `[files: File[]]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | No | `'Add files'` |
| `hint` | `string` | No | `'Choose files or drop them here.'` |
| `accept` | `string` | No | `''` |
| `multiple` | `boolean` | No | `true` |
| `disabled` | `boolean` | No | `false` |
| `onpick` | `(files: File[]) => void` | No | — |

Callbacks:

- `onpick`: `(files: File[]) => void`

## BissFilterBuilder

Filter Builder for the team’s everyday work.

[Vue source](../src/vue/BissFilterBuilder.vue) · [Svelte source](../src/svelte/BissFilterBuilder.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `fields` | `BissFilterField[]` | Yes | — |
| `rules` | `BissFilterRule[]` | No | `[]` |
| `match` | `'all' \| 'any'` | No | `'all'` |
| `label` | `string` | No | `'Filters'` |
| `addLabel` | `string` | No | `'Add filter'` |
| `removeLabel` | `string` | No | `'Remove filter'` |
| `allLabel` | `string` | No | `'Match all'` |
| `anyLabel` | `string` | No | `'Match any'` |

Events:

- `change`: `[rules: BissFilterRule[]]`
- `match`: `[value: 'all' \| 'any']`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `fields` | `BissFilterField[]` | Yes | — |
| `rules` | `BissFilterRule[]` | No | `[]` |
| `match` | `'all' \| 'any'` | No | `'all'` |
| `label` | `string` | No | `'Filters'` |
| `addLabel` | `string` | No | `'Add filter'` |
| `removeLabel` | `string` | No | `'Remove filter'` |
| `allLabel` | `string` | No | `'Match all'` |
| `anyLabel` | `string` | No | `'Match any'` |
| `onchange` | `(rules: BissFilterRule[]) => void` | No | — |
| `onmatch` | `(value: 'all' \| 'any') => void` | No | — |

Callbacks:

- `onchange`: `(rules: BissFilterRule[]) => void`
- `onmatch`: `(value: 'all' \| 'any') => void`

## BissGoalBar

A progress track with an optional expected-progress marker.

[Vue source](../src/vue/BissGoalBar.vue) · [Svelte source](../src/svelte/BissGoalBar.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `number \| null` | Yes | — |
| `expected` | `number` | No | — |
| `label` | `string` | Yes | — |
| `tone` | `'primary' \| 'success' \| 'danger' \| 'warning'` | No | `'primary'` |
| `height` | `number` | No | `8` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `number \| null` | Yes | — |
| `expected` | `number \| undefined` | No | `undefined` |
| `label` | `string` | Yes | — |
| `tone` | `string` | No | `'primary'` |
| `height` | `number` | No | `8` |

## BissGoalCard

Goal Card for the team’s everyday work.

[Vue source](../src/vue/BissGoalCard.vue) · [Svelte source](../src/svelte/BissGoalCard.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `progress` | `number \| null` | Yes | — |
| `label` | `string` | Yes | — |
| `expected` | `number \| undefined` | No | `undefined` |
| `status` | `string \| undefined` | No | `undefined` |
| `tone` | `'primary' \| 'success' \| 'danger' \| 'warning'` | No | `'primary'` |
| `href` | `string \| undefined` | No | `undefined` |

Slots: `actions`, `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `progress` | `number \| null` | Yes | — |
| `label` | `string` | Yes | — |
| `expected` | `number \| undefined` | No | `undefined` |
| `status` | `string \| undefined` | No | `undefined` |
| `tone` | `'primary' \| 'success' \| 'danger' \| 'warning'` | No | `'primary'` |
| `href` | `string \| undefined` | No | `undefined` |
| `children` | `Snippet` | No | — |
| `actions` | `Snippet` | No | — |

Snippets: `children`, `actions`.

## BissGridShell

The public-page frame with a shared top bar and footer.

[Vue source](../src/vue/BissGridShell.vue) · [Svelte source](../src/svelte/BissGridShell.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `brand` | `string` | No | `'Workspace'` |
| `mark` | `string` | No | `'B'` |
| `icon` | `BissServiceIconName` | No | — |
| `iconLabel` | `string` | No | — |
| `favicon` | `boolean` | No | `true` |
| `href` | `string` | No | `'/'` |
| `topLinks` | `BissLink[]` | No | `() => []` |
| `footerText` | `string` | No | `'Managed by BISS Institute.'` |
| `footerLinks` | `BissLink[]` | No | `() => []` |

Slots: `icon`, `topbar-actions`, `topbar`, `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `brand` | `string` | No | `'Workspace'` |
| `mark` | `string` | No | `'B'` |
| `icon` | `BissServiceIconName` | No | — |
| `iconLabel` | `string` | No | — |
| `href` | `string` | No | `'/'` |
| `favicon` | `boolean` | No | `true` |
| `topLinks` | `BissLink[]` | No | `[]` |
| `footerText` | `string` | No | `'Managed by BISS Institute.'` |
| `footerLinks` | `BissLink[]` | No | `[]` |
| `children` | `Snippet` | No | — |
| `actions` | `Snippet` | No | — |

Snippets: `children`, `actions`.

## BissGroupedBars

Compare series within categories and open the records behind each bar.

[Vue source](../src/vue/BissGroupedBars.vue) · [Svelte source](../src/svelte/BissGroupedBars.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `categories` | `string[]` | Yes | — |
| `series` | `BissBarSeries[]` | Yes | — |
| `label` | `string` | Yes | — |
| `height` | `number` | No | `240` |
| `locale` | `string` | No | `'en-GB'` |

Events:

- `pick`: `[value: { series: string; index: number }]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `categories` | `string[]` | Yes | — |
| `series` | `BissBarSeries[]` | Yes | — |
| `label` | `string` | Yes | — |
| `height` | `number` | No | `240` |
| `locale` | `string` | No | `'en-GB'` |
| `onpick` | `(value: { series: string; index: number }) => void` | No | — |

Callbacks:

- `onpick`: `(value: { series: string; index: number }) => void`

## BissHeaderAction

One labelled icon action in a page header.

[Vue source](../src/vue/BissHeaderAction.vue) · [Svelte source](../src/svelte/BissHeaderAction.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `icon` | `BissIconName \| undefined` | No | `undefined` |
| `href` | `string \| undefined` | No | `undefined` |
| `pressed` | `boolean \| undefined` | No | `undefined` |
| `disabled` | `boolean` | No | `false` |
| `shortcut` | `string \| undefined` | No | `undefined` |

Events:

- `click`: `[event: MouseEvent]`

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `icon` | `BissIconName \| undefined` | No | `undefined` |
| `href` | `string \| undefined` | No | `undefined` |
| `pressed` | `boolean \| undefined` | No | `undefined` |
| `disabled` | `boolean` | No | `false` |
| `shortcut` | `string \| undefined` | No | `undefined` |
| `onclick` | `(event: MouseEvent) => void` | No | — |
| `children` | `Snippet` | No | — |

Callbacks:

- `onclick`: `(event: MouseEvent) => void`

Snippets: `children`.

## BissHero

The public-page heading with supporting copy and optional actions.

[Vue source](../src/vue/BissHero.vue) · [Svelte source](../src/svelte/BissHero.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `eyebrow` | `string` | No | — |
| `title` | `string` | Yes | — |
| `subtitle` | `string` | No | — |
| `pills` | `string[]` | No | — |
| `align` | `'center' \| 'start'` | No | `'center'` |

Slots: `pills`, `actions`, `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `subtitle` | `string` | No | — |
| `eyebrow` | `string` | No | — |
| `pills` | `string[]` | No | `[]` |
| `align` | `'center' \| 'start'` | No | `'center'` |
| `actions` | `Snippet` | No | — |
| `pillsContent` | `Snippet` | No | — |
| `children` | `Snippet` | No | — |

Snippets: `actions`, `pillsContent`, `children`.

## BissHeroPill

A small piece of supporting context in a public-page heading.

[Vue source](../src/vue/BissHeroPill.vue) · [Svelte source](../src/svelte/BissHeroPill.svelte)

### Vue

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `children` | `import('svelte').Snippet` | No | — |

Snippets: `children`.

## BissHomeCard

The shared widget anatomy: name, explanation, content and one action.

[Vue source](../src/vue/BissHomeCard.vue) · [Svelte source](../src/svelte/BissHomeCard.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `note` | `string \| undefined` | No | `undefined` |
| `icon` | `BissIconName \| undefined` | No | `undefined` |
| `count` | `number \| undefined` | No | `undefined` |
| `busy` | `boolean` | No | `false` |
| `flush` | `boolean` | No | `false` |

Slots: `actions`, `default`, `footer`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `note` | `string \| undefined` | No | `undefined` |
| `icon` | `BissIconName \| undefined` | No | `undefined` |
| `count` | `number \| undefined` | No | `undefined` |
| `busy` | `boolean` | No | `false` |
| `flush` | `boolean` | No | `false` |
| `children` | `Snippet` | No | — |
| `actions` | `Snippet` | No | — |
| `footer` | `Snippet` | No | — |

Snippets: `children`, `actions`, `footer`.

## BissHomeSkel

Quiet loading placeholders shaped like the content that is coming.

[Vue source](../src/vue/BissHomeSkel.vue) · [Svelte source](../src/svelte/BissHomeSkel.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `rows` | `number` | No | `4` |
| `label` | `string` | No | `'Loading'` |
| `shape` | `'list' \| 'figure' \| 'chips'` | No | `'list'` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `rows` | `number` | No | `4` |
| `label` | `string` | No | `'Loading'` |
| `shape` | `string` | No | `'list'` |

## BissIcon

Bizzy’s authored SVG vocabulary, sized and stroked consistently.

[Vue source](../src/vue/BissIcon.vue) · [Svelte source](../src/svelte/BissIcon.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `name` | `BissIconName` | Yes | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `name` | `BissIconName` | Yes | — |

## BissInput

A single-line value with normal form attributes and validation styling.

[Vue source](../src/vue/BissInput.vue) · [Svelte source](../src/svelte/BissInput.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `type` | `string` | No | `'text'` |
| `placeholder` | `string` | No | — |
| `disabled` | `boolean` | No | `false` |
| `required` | `boolean` | No | `false` |
| `invalid` | `boolean` | No | `false` |
| `mono` | `boolean` | No | `false` |
| `min` | `number \| string` | No | — |
| `max` | `number \| string` | No | — |
| `autocomplete` | `string` | No | — |
| `modelValue` | `string \| number \| null` | No | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `string \| number \| null` | No | `$bindable<string \| number \| null \| undefined>(undefined)` |
| `modelValue` | `string \| number \| null` | No | `$bindable<string \| number \| null \| undefined>(undefined)` |
| `invalid` | `boolean` | No | `false` |
| `mono` | `boolean` | No | `false` |
| `onchange` | `(value: string \| number \| null) => void` | No | — |

Callbacks:

- `onchange`: `(value: string \| number \| null) => void`

## BissKanban

Group cards into lanes and move them by dragging or keyboard selection.

[Vue source](../src/vue/BissKanban.vue) · [Svelte source](../src/svelte/BissKanban.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `lanes` | `BissBoardLane[]` | Yes | — |
| `cards` | `BissBoardCard[]` | Yes | — |
| `label` | `string` | Yes | — |
| `readonly` | `boolean` | No | `false` |
| `addLabel` | `string` | No | `'Add item'` |
| `moveLabel` | `string` | No | `'Move to lane'` |

Events:

- `open`: `[id: string]`
- `move`: `[value: { id: string; lane: string }]`
- `add`: `[lane: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `lanes` | `BissBoardLane[]` | Yes | — |
| `cards` | `BissBoardCard[]` | Yes | — |
| `label` | `string` | Yes | — |
| `readonly` | `boolean` | No | `false` |
| `addLabel` | `string` | No | `'Add item'` |
| `moveLabel` | `string` | No | `'Move to lane'` |
| `onopen` | `(id: string) => void` | No | — |
| `onmove` | `(value: { id: string; lane: string }) => void` | No | — |
| `onadd` | `(lane: string) => void` | No | — |

Callbacks:

- `onopen`: `(id: string) => void`
- `onmove`: `(value: { id: string; lane: string }) => void`
- `onadd`: `(lane: string) => void`

## BissKpiCard

One headline figure with the label and note needed to interpret it.

[Vue source](../src/vue/BissKpiCard.vue) · [Svelte source](../src/svelte/BissKpiCard.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `value` | `string \| number` | Yes | — |
| `note` | `string` | No | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `value` | `string \| number` | Yes | — |
| `note` | `string` | No | — |

## BissLabelEditor

Label Editor for the team’s everyday work.

[Vue source](../src/vue/BissLabelEditor.vue) · [Svelte source](../src/svelte/BissLabelEditor.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `colorLabel` | `string` | No | `'Color: {label}'` |
| `nameLabel` | `string` | No | `'Name: {label}'` |
| `requiredLabel` | `string` | No | `'Enter a label name.'` |
| `duplicateLabel` | `string` | No | `'Choose a unique label name.'` |
| `items` | `BissLabel[]` | Yes | — |
| `label` | `string` | No | `'Edit labels'` |
| `addLabel` | `string` | No | `'Add label'` |
| `newLabel` | `string` | No | `'New label'` |
| `removeLabel` | `string` | No | `'Remove'` |
| `upLabel` | `string` | No | `'Move up'` |
| `downLabel` | `string` | No | `'Move down'` |

Events:

- `change`: `[items: BissLabel[]]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `colorLabel` | `string` | No | `'Color: {label}'` |
| `nameLabel` | `string` | No | `'Name: {label}'` |
| `requiredLabel` | `string` | No | `'Enter a label name.'` |
| `duplicateLabel` | `string` | No | `'Choose a unique label name.'` |
| `items` | `BissLabel[]` | Yes | — |
| `label` | `string` | No | `'Edit labels'` |
| `addLabel` | `string` | No | `'Add label'` |
| `newLabel` | `string` | No | `'New label'` |
| `removeLabel` | `string` | No | `'Remove'` |
| `upLabel` | `string` | No | `'Move up'` |
| `downLabel` | `string` | No | `'Move down'` |
| `onchange` | `(items: BissLabel[]) => void` | No | — |

Callbacks:

- `onchange`: `(items: BissLabel[]) => void`

## BissLineChart

A compact trend from host-provided numeric values.

[Vue source](../src/vue/BissLineChart.vue) · [Svelte source](../src/svelte/BissLineChart.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `values` | `number[]` | Yes | — |
| `label` | `string` | Yes | — |
| `height` | `number` | No | `160` |
| `color` | `string` | No | `'var(--biss-primary)'` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `values` | `number[]` | Yes | — |
| `label` | `string` | Yes | — |
| `height` | `number` | No | `160` |
| `color` | `string` | No | `'var(--biss-primary)'` |

## BissLiveStatus

Quiet connection feedback only when the application is reconnecting or offline.

[Vue source](../src/vue/BissLiveStatus.vue) · [Svelte source](../src/svelte/BissLiveStatus.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `state` | `'live' \| 'reconnecting' \| 'offline'` | No | `'live'` |
| `reconnectingLabel` | `string` | No | `'Reconnecting…'` |
| `offlineLabel` | `string` | No | `'Offline'` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `state` | `'live' \| 'reconnecting' \| 'offline'` | No | `'live'` |
| `reconnectingLabel` | `string` | No | `'Reconnecting…'` |
| `offlineLabel` | `string` | No | `'Offline'` |

## BissMediaFigure

Media Figure for the team’s everyday work.

[Vue source](../src/vue/BissMediaFigure.vue) · [Svelte source](../src/svelte/BissMediaFigure.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `src` | `string` | Yes | — |
| `alt` | `string` | Yes | — |
| `caption` | `string \| undefined` | No | `undefined` |
| `width` | `number \| undefined` | No | `undefined` |
| `height` | `number \| undefined` | No | `undefined` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `src` | `string` | Yes | — |
| `alt` | `string` | Yes | — |
| `caption` | `string \| undefined` | No | `undefined` |
| `width` | `number \| undefined` | No | `undefined` |
| `height` | `number \| undefined` | No | `undefined` |

## BissMenu

Searchable actions, checked choices and nested groups in a floating panel.

[Vue source](../src/vue/BissMenu.vue) · [Svelte source](../src/svelte/BissMenu.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `items` | `BissMenuItem[]` | Yes | — |
| `searchable` | `boolean` | No | `false` |
| `searchLabel` | `string` | No | `'Search actions'` |
| `backLabel` | `string` | No | `'Back'` |
| `emptyLabel` | `string` | No | `'No matching actions'` |
| `disabled` | `boolean` | No | `false` |
| `width` | `number` | No | `280` |

Events:

- `pick`: `[item: BissMenuItem]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `items` | `BissMenuItem[]` | Yes | — |
| `searchable` | `boolean` | No | `false` |
| `searchLabel` | `string` | No | `'Search actions'` |
| `backLabel` | `string` | No | `'Back'` |
| `emptyLabel` | `string` | No | `'No matching actions'` |
| `disabled` | `boolean` | No | `false` |
| `width` | `number` | No | `280` |
| `onpick` | `(item: BissMenuItem) => void` | No | — |

Callbacks:

- `onpick`: `(item: BissMenuItem) => void`

## BissMeterList

Compare labelled values on a shared horizontal scale.

[Vue source](../src/vue/BissMeterList.vue) · [Svelte source](../src/svelte/BissMeterList.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `BissMeterItem[]` | Yes | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `BissMeterItem[]` | Yes | — |

## BissMiniChart

A decorative schematic for choosing a chart type.

[Vue source](../src/vue/BissMiniChart.vue) · [Svelte source](../src/svelte/BissMiniChart.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `type` | `'kpi' \| 'bar' \| 'column' \| 'stacked' \| 'line' \| 'table' \| 'text'` | No | `'bar'` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `type` | `'kpi' \| 'bar' \| 'column' \| 'stacked' \| 'line' \| 'table' \| 'text'` | No | `'bar'` |

## BissModal

The modal API, for consumers migrating an existing dialog.

[Vue source](../src/vue/BissModal.vue) · [Svelte source](../src/svelte/BissModal.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `subtitle` | `string` | No | — |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` |
| `busy` | `boolean` | No | `false` |
| `modelValue` | `boolean` | No | `false` |

Slots: `default`, `footer`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `open` | `boolean` | No | `$bindable(false)` |
| `title` | `string` | Yes | — |
| `subtitle` | `string` | No | — |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` |
| `busy` | `boolean` | No | `false` |
| `children` | `Snippet` | No | — |
| `footer` | `Snippet` | No | — |
| `onclose` | `() => void` | No | — |

Callbacks:

- `onclose`: `() => void`

Snippets: `children`, `footer`.

## BissNavItem

A navigation destination with optional active state and metadata.

[Vue source](../src/vue/BissNavItem.vue) · [Svelte source](../src/svelte/BissNavItem.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `as` | `string \| Component` | No | `'a'` |
| `label` | `string` | Yes | — |
| `meta` | `string \| number` | No | — |
| `active` | `boolean` | No | `false` |

Slots: `icon`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `href` | `string \| undefined` | No | `undefined` |
| `label` | `string` | Yes | — |
| `meta` | `string \| number \| undefined` | No | `undefined` |
| `active` | `boolean` | No | `false` |
| `icon` | `import('svelte').Snippet` | No | — |

Callbacks:

- `click`: `MouseEvent`

Snippets: `icon`.

## BissNavSection

Group related navigation destinations under a small heading.

[Vue source](../src/vue/BissNavSection.vue) · [Svelte source](../src/svelte/BissNavSection.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `heading` | `string` | No | — |
| `empty` | `string` | No | — |

Slots: `action`, `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `heading` | `string \| undefined` | No | `undefined` |
| `empty` | `string \| undefined` | No | `undefined` |
| `action` | `import('svelte').Snippet` | No | — |
| `children` | `import('svelte').Snippet` | No | — |

Snippets: `action`, `children`.

## BissNoAccess

Explain restricted access and provide a useful next step.

[Vue source](../src/vue/BissNoAccess.vue) · [Svelte source](../src/svelte/BissNoAccess.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | No | `'Access restricted'` |
| `description` | `string` | No | `'Contact the owner to request access.'` |

Slots: `actions`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | No | `'Access restricted'` |
| `description` | `string` | No | `'Contact the owner to request access.'` |
| `actions` | `Snippet` | No | — |

Snippets: `actions`.

## BissNoticeRow

A notification row with unread state, context and a host-owned action.

[Vue source](../src/vue/BissNoticeRow.vue) · [Svelte source](../src/svelte/BissNoticeRow.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `detail` | `string` | No | — |
| `meta` | `string` | No | — |
| `unread` | `boolean` | No | — |
| `unreadLabel` | `string` | No | — |

Slots: `icon`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `detail` | `string \| undefined` | No | `undefined` |
| `meta` | `string \| undefined` | No | `undefined` |
| `unread` | `boolean` | No | `false` |
| `unreadLabel` | `string` | No | `'Unread'` |
| `icon` | `import('svelte').Snippet` | No | — |
| `onclick` | `(event: MouseEvent) => void` | No | — |

Callbacks:

- `onclick`: `(event: MouseEvent) => void`

Snippets: `icon`.

## BissOnboardingChips

Choose several interests or areas during workspace setup.

[Vue source](../src/vue/BissOnboardingChips.vue) · [Svelte source](../src/svelte/BissOnboardingChips.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `options` | `BissPickOption[]` | Yes | — |
| `selected` | `string[]` | No | `[]` |
| `label` | `string` | Yes | — |

Events:

- `change`: `[value: string[]]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `options` | `BissPickOption[]` | Yes | — |
| `selected` | `string[]` | No | `$bindable([])` |
| `label` | `string` | Yes | — |
| `onchange` | `(value: string[]) => void` | No | — |

Callbacks:

- `onchange`: `(value: string[]) => void`

## BissOnboardingFrame

A compact setup task with a title, progress and actions.

[Vue source](../src/vue/BissOnboardingFrame.vue) · [Svelte source](../src/svelte/BissOnboardingFrame.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `description` | `string \| undefined` | No | `undefined` |
| `step` | `number \| undefined` | No | `undefined` |
| `steps` | `number \| undefined` | No | `undefined` |

Slots: `default`, `actions`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `description` | `string \| undefined` | No | `undefined` |
| `step` | `number \| undefined` | No | `undefined` |
| `steps` | `number \| undefined` | No | `undefined` |
| `children` | `Snippet` | No | — |
| `actions` | `Snippet` | No | — |

Snippets: `children`, `actions`.

## BissPageBar

A page title, context, actions and view navigation in one compact header.

[Vue source](../src/vue/BissPageBar.vue) · [Svelte source](../src/svelte/BissPageBar.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `heading` | `'h1' \| 'h2' \| 'h3'` | No | `'h1'` |
| `title` | `string` | Yes | — |
| `description` | `string` | No | — |
| `meta` | `string` | No | — |

Slots: `lead`, `actions`, `tabs`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `heading` | `'h1' \| 'h2' \| 'h3'` | No | `'h1'` |
| `title` | `string` | Yes | — |
| `description` | `string \| undefined` | No | `undefined` |
| `meta` | `string \| undefined` | No | `undefined` |
| `lead` | `import('svelte').Snippet` | No | — |
| `actions` | `import('svelte').Snippet` | No | — |
| `tabs` | `import('svelte').Snippet` | No | — |

Snippets: `lead`, `actions`, `tabs`.

## BissPageHeader

The page title and subtitle, with an actions slot.

[Vue source](../src/vue/BissPageHeader.vue) · [Svelte source](../src/svelte/BissPageHeader.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `eyebrow` | `string` | No | — |
| `title` | `string` | Yes | — |
| `subtitle` | `string` | No | — |

Slots: `actions`, `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `eyebrow` | `string` | No | — |
| `title` | `string` | Yes | — |
| `subtitle` | `string` | No | — |
| `actions` | `Snippet` | No | — |
| `children` | `Snippet` | No | — |

Snippets: `actions`, `children`.

## BissPageHint

A keyboard-accessible explanation that stays out of the page’s main reading path.

[Vue source](../src/vue/BissPageHint.vue) · [Svelte source](../src/svelte/BissPageHint.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `text` | `string` | Yes | — |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `text` | `string` | Yes | — |
| `children` | `Snippet` | No | — |

Snippets: `children`.

## BissPeopleCell

Show a small set of assigned people, with overflow summarized by count.

[Vue source](../src/vue/BissPeopleCell.vue) · [Svelte source](../src/svelte/BissPeopleCell.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `people` | `BissPerson[]` | Yes | — |
| `empty` | `string` | No | `'Unassigned'` |
| `limit` | `number` | No | `3` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `people` | `BissPerson[]` | Yes | — |
| `empty` | `string` | No | `'Unassigned'` |
| `limit` | `number` | No | `3` |

## BissPopover

A small panel for a choice that needs more room than a menu.

[Vue source](../src/vue/BissPopover.vue) · [Svelte source](../src/svelte/BissPopover.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `disabled` | `boolean` | No | `false` |
| `width` | `number` | No | `280` |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `disabled` | `boolean` | No | `false` |
| `width` | `number` | No | `280` |
| `children` | `Snippet` | No | — |

Snippets: `children`.

## BissPresenceCursor

Presence Cursor for the team’s everyday work.

[Vue source](../src/vue/BissPresenceCursor.vue) · [Svelte source](../src/svelte/BissPresenceCursor.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `name` | `string` | Yes | — |
| `color` | `string` | No | `'#005CA9'` |
| `x` | `number` | No | `0` |
| `y` | `number` | No | `0` |
| `height` | `number` | No | `20` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `name` | `string` | Yes | — |
| `color` | `string` | No | `'#005CA9'` |
| `x` | `number` | No | `0` |
| `y` | `number` | No | `0` |
| `height` | `number` | No | `20` |

## BissPresenceStack

A quiet, overlapping group of people currently on a page.

[Vue source](../src/vue/BissPresenceStack.vue) · [Svelte source](../src/svelte/BissPresenceStack.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `people` | `BissPerson[]` | Yes | — |
| `limit` | `number` | No | `4` |
| `size` | `number` | No | `22` |
| `label` | `string` | No | `'People here'` |
| `selfId` | `string \| undefined` | No | `undefined` |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `people` | `BissPerson[]` | Yes | — |
| `limit` | `number` | No | `4` |
| `size` | `number` | No | `22` |
| `label` | `string` | No | `'People here'` |
| `selfId` | `string \| undefined` | No | `undefined` |
| `children` | `Snippet` | No | — |

Snippets: `children`.

## BissPropertyList

Display a record’s labelled properties in a compact description list.

[Vue source](../src/vue/BissPropertyList.vue) · [Svelte source](../src/svelte/BissPropertyList.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ key: string; label: string; value: string; href?: string }[]` | Yes | — |
| `label` | `string` | Yes | — |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ key: string; label: string; value: string; href?: string }[]` | Yes | — |
| `label` | `string` | Yes | — |

## BissProposalCard

Proposal Card for the team’s everyday work.

[Vue source](../src/vue/BissProposalCard.vue) · [Svelte source](../src/svelte/BissProposalCard.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `body` | `string` | Yes | — |
| `rationale` | `string \| undefined` | No | `undefined` |
| `changes` | `{ label: string; before: string; after: string }[]` | No | `[]` |
| `busy` | `boolean` | No | `false` |
| `approveLabel` | `string` | No | `'Apply change'` |
| `dismissLabel` | `string` | No | `'Dismiss'` |

Events:

- `approve`: `[]`
- `dismiss`: `[]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `body` | `string` | Yes | — |
| `rationale` | `string \| undefined` | No | `undefined` |
| `changes` | `{ label: string; before: string; after: string }[]` | No | `[]` |
| `busy` | `boolean` | No | `false` |
| `approveLabel` | `string` | No | `'Apply change'` |
| `dismissLabel` | `string` | No | `'Dismiss'` |
| `onapprove` | `() => void` | No | — |
| `ondismiss` | `() => void` | No | — |

Callbacks:

- `onapprove`: `() => void`
- `ondismiss`: `() => void`

## BissQuickLinks

Quick Links for the team’s everyday work.

[Vue source](../src/vue/BissQuickLinks.vue) · [Svelte source](../src/svelte/BissQuickLinks.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ id: string; label: string; href: string; description?: string; external?: boolean }[]` | Yes | — |
| `label` | `string` | No | `'Quick links'` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ id: string; label: string; href: string; description?: string; external?: boolean }[]` | Yes | — |
| `label` | `string` | No | `'Quick links'` |

## BissRadioGroup

Radio Group for the team’s everyday work.

[Vue source](../src/vue/BissRadioGroup.vue) · [Svelte source](../src/svelte/BissRadioGroup.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `options` | `BissPickOption[]` | Yes | — |
| `value` | `string` | No | `''` |
| `label` | `string` | Yes | — |
| `disabled` | `boolean` | No | `false` |

Events:

- `change`: `[value: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `options` | `BissPickOption[]` | Yes | — |
| `value` | `string` | No | `$bindable('')` |
| `label` | `string` | Yes | — |
| `disabled` | `boolean` | No | `false` |
| `onchange` | `(value: string) => void` | No | — |

Callbacks:

- `onchange`: `(value: string) => void`

## BissRecordChip

A small labelled reference to a record, optionally linked.

[Vue source](../src/vue/BissRecordChip.vue) · [Svelte source](../src/svelte/BissRecordChip.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `href` | `string \| undefined` | No | `undefined` |
| `icon` | `BissIconName` | No | `'file'` |
| `meta` | `string \| undefined` | No | `undefined` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `href` | `string \| undefined` | No | `undefined` |
| `icon` | `BissIconName` | No | `'file'` |
| `meta` | `string \| undefined` | No | `undefined` |

## BissRecordPreview

Record Preview for the team’s everyday work.

[Vue source](../src/vue/BissRecordPreview.vue) · [Svelte source](../src/svelte/BissRecordPreview.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `kind` | `string` | Yes | — |
| `description` | `string \| undefined` | No | `undefined` |
| `href` | `string \| undefined` | No | `undefined` |
| `restricted` | `boolean` | No | `false` |
| `restrictedLabel` | `string` | No | `'A record you cannot access'` |
| `icon` | `BissIconName` | No | `'file'` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `kind` | `string` | Yes | — |
| `description` | `string \| undefined` | No | `undefined` |
| `href` | `string \| undefined` | No | `undefined` |
| `restricted` | `boolean` | No | `false` |
| `restrictedLabel` | `string` | No | `'A record you cannot access'` |
| `icon` | `BissIconName` | No | `'file'` |

## BissRoleEditor

Role Editor for the team’s everyday work.

[Vue source](../src/vue/BissRoleEditor.vue) · [Svelte source](../src/svelte/BissRoleEditor.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `permissions` | `BissPermission[]` | Yes | — |
| `selected` | `string[]` | No | `[]` |
| `label` | `string` | No | `'Role permissions'` |
| `readonly` | `boolean` | No | `false` |

Events:

- `change`: `[permissions: string[]]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `permissions` | `BissPermission[]` | Yes | — |
| `selected` | `string[]` | No | `[]` |
| `label` | `string` | No | `'Role permissions'` |
| `readonly` | `boolean` | No | `false` |
| `onchange` | `(permissions: string[]) => void` | No | — |

Callbacks:

- `onchange`: `(permissions: string[]) => void`

## BissSaveBar

Bring unsaved changes, recovery and save actions into one place.

[Vue source](../src/vue/BissSaveBar.vue) · [Svelte source](../src/svelte/BissSaveBar.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `show` | `boolean` | Yes | — |
| `saving` | `boolean` | No | — |
| `error` | `string` | No | — |
| `note` | `string` | No | `'Unsaved changes'` |
| `saveLabel` | `string` | No | `'Save'` |
| `discardLabel` | `string` | No | `'Discard'` |

Events:

- `save`: `[]`
- `discard`: `[]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `show` | `boolean` | Yes | — |
| `saving` | `boolean` | No | `false` |
| `error` | `string \| undefined` | No | `undefined` |
| `note` | `string` | No | `'Unsaved changes'` |
| `saveLabel` | `string` | No | `'Save'` |
| `discardLabel` | `string` | No | `'Discard'` |
| `onsave` | `() => void` | No | — |
| `ondiscard` | `() => void` | No | — |

Callbacks:

- `onsave`: `() => void`
- `ondiscard`: `() => void`

## BissSearchInput

A search field with the input contract and search treatment.

[Vue source](../src/vue/BissSearchInput.vue) · [Svelte source](../src/svelte/BissSearchInput.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `placeholder` | `string` | No | `'Search'` |
| `disabled` | `boolean` | No | `false` |
| `label` | `string` | No | `'Search'` |
| `modelValue` | `string` | No | `''` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `modelValue` | `string` | No | `$bindable('')` |
| `onchange` | `(value: string) => void` | No | — |

Callbacks:

- `onchange`: `(value: string) => void`

## BissSearchPalette

Find a record or action in a focused, searchable dialog.

[Vue source](../src/vue/BissSearchPalette.vue) · [Svelte source](../src/svelte/BissSearchPalette.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `open` | `boolean` | No | `false` |
| `label` | `string` | No | `'Search'` |
| `items` | `BissSearchItem[]` | Yes | — |
| `placeholder` | `string` | No | `'Search…'` |
| `emptyLabel` | `string` | No | `'No results'` |
| `loading` | `boolean` | No | `false` |
| `loadingLabel` | `string` | No | `'Searching…'` |

Events:

- `close`: `[]`
- `query`: `[value: string]`
- `pick`: `[item: BissSearchItem]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `open` | `boolean` | No | `false` |
| `label` | `string` | No | `'Search'` |
| `items` | `BissSearchItem[]` | Yes | — |
| `placeholder` | `string` | No | `'Search…'` |
| `emptyLabel` | `string` | No | `'No results'` |
| `loading` | `boolean` | No | `false` |
| `loadingLabel` | `string` | No | `'Searching…'` |
| `onclose` | `() => void` | No | — |
| `onquery` | `(value: string) => void` | No | — |
| `onpick` | `(item: BissSearchItem) => void` | No | — |

Callbacks:

- `onclose`: `() => void`
- `onquery`: `(value: string) => void`
- `onpick`: `(item: BissSearchItem) => void`

## BissSectionHeader

Introduce a content section and place its actions alongside the title.

[Vue source](../src/vue/BissSectionHeader.vue) · [Svelte source](../src/svelte/BissSectionHeader.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `copy` | `string` | No | — |

Slots: `actions`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `copy` | `string` | No | — |
| `actions` | `Snippet` | No | — |

Snippets: `actions`.

## BissSegmentedControl

Segmented Control for the team’s everyday work.

[Vue source](../src/vue/BissSegmentedControl.vue) · [Svelte source](../src/svelte/BissSegmentedControl.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `options` | `BissPickOption[]` | Yes | — |
| `value` | `string` | No | `''` |
| `label` | `string` | Yes | — |

Events:

- `change`: `[value: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `options` | `BissPickOption[]` | Yes | — |
| `value` | `string` | No | `$bindable('')` |
| `label` | `string` | Yes | — |
| `onchange` | `(value: string) => void` | No | — |

Callbacks:

- `onchange`: `(value: string) => void`

## BissSelect

The native select for simple browser-driven choice.

[Vue source](../src/vue/BissSelect.vue) · [Svelte source](../src/svelte/BissSelect.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `options` | `BissOption[]` | No | — |
| `placeholder` | `string` | No | — |
| `disabled` | `boolean` | No | `false` |
| `required` | `boolean` | No | `false` |
| `invalid` | `boolean` | No | `false` |
| `modelValue` | `string \| number \| null` | No | — |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `string \| number` | No | `$bindable<string \| number \| undefined>(undefined)` |
| `modelValue` | `string \| number` | No | `$bindable<string \| number \| undefined>(undefined)` |
| `options` | `BissOption[]` | Yes | — |
| `onchange` | `(value: string \| number) => void` | No | — |

Callbacks:

- `onchange`: `(value: string \| number) => void`

## BissSelectPicker

A searchable dropdown with groups, disabled choices and keyboard navigation.

[Vue source](../src/vue/BissSelectPicker.vue) · [Svelte source](../src/svelte/BissSelectPicker.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `options` | `BissPickOption[]` | Yes | — |
| `value` | `string` | No | `''` |
| `placeholder` | `string` | No | `'Choose…'` |
| `searchable` | `boolean` | No | `true` |
| `searchLabel` | `string` | No | `'Search options'` |
| `emptyLabel` | `string` | No | `'No matching options'` |
| `disabled` | `boolean` | No | `false` |
| `width` | `number` | No | `280` |

Events:

- `change`: `[value: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `options` | `BissPickOption[]` | Yes | — |
| `value` | `string` | No | `''` |
| `placeholder` | `string` | No | `'Choose…'` |
| `searchable` | `boolean` | No | `true` |
| `searchLabel` | `string` | No | `'Search options'` |
| `emptyLabel` | `string` | No | `'No matching options'` |
| `disabled` | `boolean` | No | `false` |
| `width` | `number` | No | `280` |
| `onchange` | `(value: string) => void` | No | — |

Callbacks:

- `onchange`: `(value: string) => void`

## BissServiceIcon

The product marks, or a short text mark supplied by the host.

[Vue source](../src/vue/BissServiceIcon.vue) · [Svelte source](../src/svelte/BissServiceIcon.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `icon` | `BissServiceIconName` | No | — |
| `mark` | `string` | No | `'B'` |
| `label` | `string` | No | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `icon` | `BissServiceIconName \| undefined` | No | `undefined` |
| `mark` | `string` | No | `'B'` |
| `label` | `string \| undefined` | No | `undefined` |

## BissSettingsHead

A settings section’s title, one-line explanation and optional extra detail.

[Vue source](../src/vue/BissSettingsHead.vue) · [Svelte source](../src/svelte/BissSettingsHead.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `help` | `string` | No | — |
| `more` | `string` | No | — |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `title` | `string` | Yes | — |
| `help` | `string \| undefined` | No | `undefined` |
| `more` | `string \| undefined` | No | `undefined` |
| `children` | `import('svelte').Snippet` | No | — |

Snippets: `children`.

## BissSharePanel

Share Panel for the team’s everyday work.

[Vue source](../src/vue/BissSharePanel.vue) · [Svelte source](../src/svelte/BissSharePanel.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `roleLabel` | `string` | No | `'Invitation role'` |
| `linkLabel` | `string` | No | `'Copy shared link'` |
| `accessLabels` | `{ label?: string; inheritedLabel?: string; removeLabel?: string; roleLabel?: string; }` | No | `{}` |
| `copyLabel` | `string` | No | `'Copy'` |
| `copiedLabel` | `string` | No | `'Copied'` |
| `entries` | `BissAccessEntry[]` | Yes | — |
| `roles` | `BissPickOption[]` | Yes | — |
| `label` | `string` | No | `'Share project'` |
| `inviteLabel` | `string` | No | `'Invite'` |
| `emailLabel` | `string` | No | `'Email address'` |
| `busy` | `boolean` | No | `false` |
| `error` | `string \| undefined` | No | `undefined` |
| `link` | `string \| undefined` | No | `undefined` |

Events:

- `invite`: `[value: { email: string; role: string }]`
- `role`: `[value: { id: string; role: string }]`
- `remove`: `[id: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `roleLabel` | `string` | No | `'Invitation role'` |
| `linkLabel` | `string` | No | `'Copy shared link'` |
| `accessLabels` | `{ label?: string; inheritedLabel?: string; removeLabel?: string; roleLabel?: string; }` | No | `{}` |
| `copyLabel` | `string` | No | `'Copy'` |
| `copiedLabel` | `string` | No | `'Copied'` |
| `entries` | `BissAccessEntry[]` | Yes | — |
| `roles` | `BissPickOption[]` | Yes | — |
| `label` | `string` | No | `'Share project'` |
| `inviteLabel` | `string` | No | `'Invite'` |
| `emailLabel` | `string` | No | `'Email address'` |
| `busy` | `boolean` | No | `false` |
| `error` | `string \| undefined` | No | `undefined` |
| `link` | `string \| undefined` | No | `undefined` |
| `oninvite` | `(value: { email: string; role: string }) => void` | No | — |
| `onrole` | `(value: { id: string; role: string }) => void` | No | — |
| `onremove` | `(id: string) => void` | No | — |

Callbacks:

- `oninvite`: `(value: { email: string; role: string }) => void`
- `onrole`: `(value: { id: string; role: string }) => void`
- `onremove`: `(id: string) => void`

## BissSidePanel

Keep a record’s details in view without leaving the surrounding work.

[Vue source](../src/vue/BissSidePanel.vue) · [Svelte source](../src/svelte/BissSidePanel.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `open` | `boolean` | No | `false` |
| `title` | `string` | Yes | — |
| `description` | `string \| undefined` | No | `undefined` |
| `width` | `number` | No | `640` |
| `closeLabel` | `string` | No | `'Close'` |
| `busy` | `boolean` | No | `false` |

Events:

- `close`: `[]`

Slots: `default`, `actions`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `open` | `boolean` | No | `$bindable(false)` |
| `title` | `string` | Yes | — |
| `description` | `string \| undefined` | No | `undefined` |
| `width` | `number` | No | `640` |
| `closeLabel` | `string` | No | `'Close'` |
| `busy` | `boolean` | No | `false` |
| `onclose` | `() => void` | No | — |
| `children` | `Snippet` | No | — |
| `actions` | `Snippet` | No | — |

Callbacks:

- `onclose`: `() => void`

Snippets: `children`, `actions`.

## BissSidebarUser

The signed-in identity with account navigation and sign-out actions.

[Vue source](../src/vue/BissSidebarUser.vue) · [Svelte source](../src/svelte/BissSidebarUser.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `name` | `string` | Yes | — |
| `email` | `string` | No | — |
| `initials` | `string` | No | — |
| `accountHref` | `string` | No | — |
| `accountLabel` | `string` | No | — |
| `signOut` | `boolean` | No | `false` |
| `signOutLabel` | `string` | No | `'Sign out'` |
| `confirmSignOut` | `boolean` | No | `true` |
| `signOutTitle` | `string` | No | `'Sign out?'` |
| `signOutCopy` | `string` | No | — |
| `busy` | `boolean` | No | `false` |

Events:

- `signOut`: `[]`

Slots: `menu`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `name` | `string` | Yes | — |
| `email` | `string` | No | — |
| `initials` | `string` | No | — |
| `accountHref` | `string` | No | — |
| `accountLabel` | `string` | No | `'Your account'` |
| `signOut` | `boolean` | No | `false` |
| `signOutLabel` | `string` | No | `'Sign out'` |
| `confirmSignOut` | `boolean` | No | `true` |
| `signOutTitle` | `string` | No | `'Sign out?'` |
| `signOutCopy` | `string` | No | — |
| `busy` | `boolean` | No | `false` |
| `menu` | `Snippet` | No | — |
| `onsignOut` | `() => void` | No | — |

Callbacks:

- `onsignOut`: `() => void`

Snippets: `menu`.

## BissSkeleton

Simple content-shaped bars for loading layouts.

[Vue source](../src/vue/BissSkeleton.vue) · [Svelte source](../src/svelte/BissSkeleton.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `lines` | `number` | No | `1` |
| `height` | `string` | No | `'14px'` |
| `width` | `string` | No | `'100%'` |
| `gap` | `string` | No | `'10px'` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `lines` | `number` | No | `1` |
| `height` | `string` | No | `'14px'` |
| `width` | `string` | No | `'100%'` |
| `gap` | `string` | No | `'10px'` |

## BissSplitPane

Split Pane for the team’s everyday work.

[Vue source](../src/vue/BissSplitPane.vue) · [Svelte source](../src/svelte/BissSplitPane.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `size` | `number` | No | `40` |
| `min` | `number` | No | `20` |
| `max` | `number` | No | `80` |
| `label` | `string` | No | `'Resize panels'` |

Events:

- `resize`: `[value: number]`

Slots: `start`, `end`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `size` | `number` | No | `40` |
| `min` | `number` | No | `20` |
| `max` | `number` | No | `80` |
| `label` | `string` | No | `'Resize panels'` |
| `onresize` | `(value: number) => void` | No | — |
| `start` | `Snippet` | No | — |
| `end` | `Snippet` | No | — |

Callbacks:

- `onresize`: `(value: number) => void`

Snippets: `start`, `end`.

## BissStackedBar

Stacked Bar for the team’s everyday work.

[Vue source](../src/vue/BissStackedBar.vue) · [Svelte source](../src/svelte/BissStackedBar.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ key: string; label: string; value: number; color: string; display?: string }[]` | Yes | — |
| `label` | `string` | Yes | — |

Events:

- `pick`: `[key: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ key: string; label: string; value: number; color: string; display?: string }[]` | Yes | — |
| `label` | `string` | Yes | — |
| `onpick` | `(key: string) => void` | No | — |

Callbacks:

- `onpick`: `(key: string) => void`

## BissStatList

A compact list of labelled counts or formatted values.

[Vue source](../src/vue/BissStatList.vue) · [Svelte source](../src/svelte/BissStatList.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `stats` | `BissStat[]` | Yes | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `BissStat[]` | Yes | — |

## BissStatusCell

A written status reinforced by a colored dot or soft tint.

[Vue source](../src/vue/BissStatusCell.vue) · [Svelte source](../src/svelte/BissStatusCell.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `color` | `string` | No | `'var(--biss-primary)'` |
| `soft` | `boolean` | No | `true` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `color` | `string` | No | `'var(--biss-primary)'` |
| `soft` | `boolean` | No | `true` |

## BissStep

One completed, current or upcoming step in an ordered setup flow.

[Vue source](../src/vue/BissStep.vue) · [Svelte source](../src/svelte/BissStep.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `index` | `number \| string` | Yes | — |
| `title` | `string` | Yes | — |
| `copy` | `string` | No | — |
| `done` | `boolean` | No | `false` |
| `current` | `boolean` | No | `false` |

Slots: `marker`, `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `index` | `number \| string` | Yes | — |
| `title` | `string` | Yes | — |
| `copy` | `string \| undefined` | No | `undefined` |
| `done` | `boolean` | No | `false` |
| `current` | `boolean` | No | `false` |
| `marker` | `import('svelte').Snippet` | No | — |
| `children` | `import('svelte').Snippet` | No | — |

Snippets: `marker`, `children`.

## BissSteps

An ordered container that gives setup steps a shared reading rhythm.

[Vue source](../src/vue/BissSteps.vue) · [Svelte source](../src/svelte/BissSteps.svelte)

### Vue

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `children` | `import('svelte').Snippet` | No | — |

Snippets: `children`.

## BissSummaryStrip

A row of labelled figures, with supporting notes and optional color markers.

[Vue source](../src/vue/BissSummaryStrip.vue) · [Svelte source](../src/svelte/BissSummaryStrip.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ label: string; value: string; sub?: string; color?: string }[]` | Yes | — |
| `label` | `string` | Yes | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ label: string; value: string; sub?: string; color?: string }[]` | Yes | — |
| `label` | `string` | Yes | — |

## BissSwatchPicker

Choose a named color from the workspace palette.

[Vue source](../src/vue/BissSwatchPicker.vue) · [Svelte source](../src/svelte/BissSwatchPicker.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `value` | `string` | No | `'blue'` |
| `colors` | `{ value: string; label: string; color: string }[]` | No | `bissSwatches` |
| `disabled` | `boolean` | No | `false` |
| `width` | `number` | No | `160` |

Events:

- `change`: `[value: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `value` | `string` | No | `'blue'` |
| `colors` | `{ value: string; label: string; color: string }[]` | No | `bissSwatches` |
| `disabled` | `boolean` | No | `false` |
| `width` | `number` | No | `160` |
| `onchange` | `(value: string) => void` | No | — |

Callbacks:

- `onchange`: `(value: string) => void`

## BissSwitch

A labelled on/off setting using the model contract.

[Vue source](../src/vue/BissSwitch.vue) · [Svelte source](../src/svelte/BissSwitch.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `hint` | `string` | No | — |
| `disabled` | `boolean` | No | — |
| `modelValue` | `boolean` | No | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `modelValue` | `boolean` | No | `$bindable(false)` |
| `label` | `string` | Yes | — |
| `hint` | `string` | No | — |
| `disabled` | `boolean` | No | `false` |
| `onchange` | `(value: boolean) => void` | No | — |

Callbacks:

- `onchange`: `(value: boolean) => void`

## BissTab

A navigation tab that can render as a native button or a router link.

[Vue source](../src/vue/BissTab.vue) · [Svelte source](../src/svelte/BissTab.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `as` | `string \| Component` | No | `'button'` |
| `label` | `string` | Yes | — |
| `active` | `boolean` | No | `false` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `href` | `string \| undefined` | No | `undefined` |
| `label` | `string` | Yes | — |
| `active` | `boolean` | No | `false` |

## BissTableAddRow

A quiet row-level action for adding a record to the current group.

[Vue source](../src/vue/BissTableAddRow.vue) · [Svelte source](../src/svelte/BissTableAddRow.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `disabled` | `boolean` | No | `false` |

Events:

- `add`: `[]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `disabled` | `boolean` | No | `false` |
| `onadd` | `() => void` | No | — |

Callbacks:

- `onadd`: `() => void`

## BissTableGroup

A collapsible group with a name, count and actions around table content.

[Vue source](../src/vue/BissTableGroup.vue) · [Svelte source](../src/svelte/BissTableGroup.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `count` | `number \| undefined` | No | `undefined` |
| `color` | `string` | No | `'var(--biss-primary)'` |
| `collapsed` | `boolean` | No | `false` |

Events:

- `toggle`: `[collapsed: boolean]`

Slots: `actions`, `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `count` | `number \| undefined` | No | `undefined` |
| `color` | `string` | No | `'var(--biss-primary)'` |
| `collapsed` | `boolean` | No | `$bindable(false)` |
| `ontoggle` | `(collapsed: boolean) => void` | No | — |
| `children` | `Snippet` | No | — |
| `actions` | `Snippet` | No | — |

Callbacks:

- `ontoggle`: `(collapsed: boolean) => void`

Snippets: `children`, `actions`.

## BissTableHead

A column heading with a host-owned three-state sort action.

[Vue source](../src/vue/BissTableHead.vue) · [Svelte source](../src/svelte/BissTableHead.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `sort` | `'asc' \| 'desc' \| null` | No | `null` |
| `sortable` | `boolean` | No | `true` |
| `align` | `'start' \| 'end'` | No | `'start'` |

Events:

- `sort`: `[direction: 'asc' \| 'desc' \| null]`

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `sort` | `'asc' \| 'desc' \| null` | No | `null` |
| `sortable` | `boolean` | No | `true` |
| `align` | `'start' \| 'end'` | No | `'start'` |
| `onsort` | `(direction: 'asc' \| 'desc' \| null) => void` | No | — |
| `children` | `Snippet` | No | — |

Callbacks:

- `onsort`: `(direction: 'asc' \| 'desc' \| null) => void`

Snippets: `children`.

## BissTablePager

Previous and next page controls with a live range announcement.

[Vue source](../src/vue/BissTablePager.vue) · [Svelte source](../src/svelte/BissTablePager.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `page` | `number` | Yes | — |
| `total` | `number` | Yes | — |
| `pageSize` | `number` | No | `25` |
| `label` | `string` | No | `'Pagination'` |
| `previousLabel` | `string` | No | `'Previous'` |
| `nextLabel` | `string` | No | `'Next'` |

Events:

- `update:page`: `[number]`

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `page` | `number` | No | `$bindable()` |
| `total` | `number` | Yes | — |
| `pageSize` | `number` | No | `25` |
| `label` | `string` | No | `'Pagination'` |
| `previousLabel` | `string` | No | `'Previous'` |
| `nextLabel` | `string` | No | `'Next'` |
| `children` | `import('svelte').Snippet` | No | — |
| `onchange` | `(value: number) => void` | No | — |

Callbacks:

- `onchange`: `(value: number) => void`

Snippets: `children`.

## BissTableTotal

A compact label and formatted total for a table footer or group summary.

[Vue source](../src/vue/BissTableTotal.vue) · [Svelte source](../src/svelte/BissTableTotal.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `value` | `string \| number` | Yes | — |
| `note` | `string \| undefined` | No | `undefined` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `value` | `string \| number` | Yes | — |
| `note` | `string \| undefined` | No | `undefined` |

## BissTagInput

Add and remove short labels using the model contract.

[Vue source](../src/vue/BissTagInput.vue) · [Svelte source](../src/svelte/BissTagInput.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `placeholder` | `string` | No | — |
| `disabled` | `boolean` | No | `false` |
| `suggestions` | `string[]` | No | — |
| `allowSpaces` | `boolean` | No | `false` |
| `modelValue` | `string[]` | No | `() => []` |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `modelValue` | `string[]` | No | `$bindable<string[]>([])` |
| `placeholder` | `string` | No | `'Add label'` |
| `disabled` | `boolean` | No | `false` |
| `suggestions` | `string[]` | No | `[]` |
| `allowSpaces` | `boolean` | No | `false` |
| `removeLabel` | `string` | No | `'Remove'` |
| `onchange` | `(value: string[]) => void` | No | — |

Callbacks:

- `onchange`: `(value: string[]) => void`

## BissTaskList

Task List for the team’s everyday work.

[Vue source](../src/vue/BissTaskList.vue) · [Svelte source](../src/svelte/BissTaskList.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ id: string; title: string; done: boolean; owner?: string; due?: string; status?: string; readonly?: boolean; }[]` | Yes | — |
| `label` | `string` | No | `'Tasks'` |
| `completeLabel` | `string` | No | `'Complete'` |

Events:

- `complete`: `[value: { id: string; done: boolean }]`
- `open`: `[id: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ id: string; title: string; done: boolean; owner?: string; due?: string; status?: string; readonly?: boolean; }[]` | Yes | — |
| `label` | `string` | No | `'Tasks'` |
| `completeLabel` | `string` | No | `'Complete'` |
| `oncomplete` | `(value: { id: string; done: boolean }) => void` | No | — |
| `onopen` | `(id: string) => void` | No | — |

Callbacks:

- `oncomplete`: `(value: { id: string; done: boolean }) => void`
- `onopen`: `(id: string) => void`

## BissTextarea

A multiline form value with normal field attributes and validation styling.

[Vue source](../src/vue/BissTextarea.vue) · [Svelte source](../src/svelte/BissTextarea.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `placeholder` | `string` | No | — |
| `disabled` | `boolean` | No | `false` |
| `required` | `boolean` | No | `false` |
| `invalid` | `boolean` | No | `false` |
| `rows` | `number` | No | `3` |
| `mono` | `boolean` | No | `false` |
| `modelValue` | `string` | No | — |

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `string` | No | `$bindable<string \| undefined>(undefined)` |
| `modelValue` | `string` | No | `$bindable<string \| undefined>(undefined)` |
| `invalid` | `boolean` | No | `false` |
| `mono` | `boolean` | No | `false` |
| `onchange` | `(value: string) => void` | No | — |

Callbacks:

- `onchange`: `(value: string) => void`

## BissTimeline

Show inclusive date spans clipped to the visible time window.

[Vue source](../src/vue/BissTimeline.vue) · [Svelte source](../src/svelte/BissTimeline.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `from` | `string` | Yes | — |
| `to` | `string` | Yes | — |
| `items` | `BissTimelineItem[]` | Yes | — |
| `label` | `string` | Yes | — |

Events:

- `open`: `[id: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `from` | `string` | Yes | — |
| `to` | `string` | Yes | — |
| `items` | `BissTimelineItem[]` | Yes | — |
| `label` | `string` | Yes | — |
| `onopen` | `(id: string) => void` | No | — |

Callbacks:

- `onopen`: `(id: string) => void`

## BissToastStack

Render the application-wide toast queue after an action.

[Vue source](../src/vue/BissToastStack.vue) · [Svelte source](../src/svelte/BissToastStack.svelte)

### Vue

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `queue` | `BissToastQueue` | Yes | — |
| `label` | `string` | No | `'Notifications'` |
| `dismissLabel` | `string` | No | `'Dismiss'` |

## BissToolButton

A quiet toolbar control with active state, count and a separate clear action.

[Vue source](../src/vue/BissToolButton.vue) · [Svelte source](../src/svelte/BissToolButton.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `icon` | `BissIconName \| undefined` | No | `undefined` |
| `active` | `boolean` | No | `false` |
| `count` | `number \| undefined` | No | `undefined` |
| `clearable` | `boolean` | No | `false` |
| `clearLabel` | `string` | No | `'Clear'` |
| `disabled` | `boolean` | No | `false` |

Events:

- `click`: `[event: MouseEvent]`
- `clear`: `[]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `icon` | `BissIconName \| undefined` | No | `undefined` |
| `active` | `boolean` | No | `false` |
| `count` | `number \| undefined` | No | `undefined` |
| `clearable` | `boolean` | No | `false` |
| `clearLabel` | `string` | No | `'Clear'` |
| `disabled` | `boolean` | No | `false` |
| `onclick` | `(event: MouseEvent) => void` | No | — |
| `onclear` | `() => void` | No | — |

Callbacks:

- `onclick`: `(event: MouseEvent) => void`
- `onclear`: `() => void`

## BissToolNew

A primary create action with a menu for other ways to add.

[Vue source](../src/vue/BissToolNew.vue) · [Svelte source](../src/svelte/BissToolNew.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `items` | `BissMenuItem[]` | No | `[]` |
| `disabled` | `boolean` | No | `false` |
| `moreLabel` | `string` | No | `'More ways to add'` |

Events:

- `add`: `[]`
- `pick`: `[item: BissMenuItem]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `items` | `BissMenuItem[]` | No | `[]` |
| `disabled` | `boolean` | No | `false` |
| `moreLabel` | `string` | No | `'More ways to add'` |
| `onadd` | `() => void` | No | — |
| `onpick` | `(item: BissMenuItem) => void` | No | — |

Callbacks:

- `onadd`: `() => void`
- `onpick`: `(item: BissMenuItem) => void`

## BissToolSearch

A compact toolbar search that expands into an editable query.

[Vue source](../src/vue/BissToolSearch.vue) · [Svelte source](../src/svelte/BissToolSearch.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `string` | No | `''` |
| `label` | `string` | No | `'Search'` |
| `placeholder` | `string` | No | `'Search…'` |
| `clearLabel` | `string` | No | `'Clear search'` |
| `shortcut` | `boolean` | No | `false` |

Events:

- `change`: `[value: string]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `value` | `string` | No | `$bindable('')` |
| `label` | `string` | No | `'Search'` |
| `placeholder` | `string` | No | `'Search…'` |
| `clearLabel` | `string` | No | `'Clear search'` |
| `shortcut` | `boolean` | No | `false` |
| `onchange` | `(value: string) => void` | No | — |

Callbacks:

- `onchange`: `(value: string) => void`

## BissToolbar

A wrapping row for related page tools and trailing controls.

[Vue source](../src/vue/BissToolbar.vue) · [Svelte source](../src/svelte/BissToolbar.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |

Slots: `default`, `end`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `children` | `import('svelte').Snippet` | No | — |
| `end` | `import('svelte').Snippet` | No | — |

Snippets: `children`, `end`.

## BissTooltip

Tooltip for the team’s everyday work.

[Vue source](../src/vue/BissTooltip.vue) · [Svelte source](../src/svelte/BissTooltip.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `text` | `string` | Yes | — |

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `label` | `string` | Yes | — |
| `text` | `string` | Yes | — |
| `children` | `Snippet` | No | — |

Snippets: `children`.

## BissTopBar

The shared brand and primary navigation bar.

[Vue source](../src/vue/BissTopBar.vue) · [Svelte source](../src/svelte/BissTopBar.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `brand` | `string` | No | `'Workspace'` |
| `mark` | `string` | No | `'B'` |
| `icon` | `BissServiceIconName` | No | — |
| `iconLabel` | `string` | No | — |
| `href` | `string` | No | `'/'` |
| `links` | `BissLink[]` | No | `() => []` |

Slots: `icon`, `actions`, `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `brand` | `string` | No | `'Workspace'` |
| `mark` | `string` | No | `'B'` |
| `icon` | `BissServiceIconName` | No | — |
| `iconLabel` | `string` | No | — |
| `href` | `string` | No | `'/'` |
| `links` | `BissLink[]` | No | `[]` |
| `iconContent` | `Snippet` | No | — |
| `actions` | `Snippet` | No | — |
| `children` | `Snippet` | No | — |

Snippets: `iconContent`, `actions`, `children`.

## BissValuePicker

Search and select multiple filter values, with optional negation.

[Vue source](../src/vue/BissValuePicker.vue) · [Svelte source](../src/svelte/BissValuePicker.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `options` | `BissPickOption[]` | Yes | — |
| `selected` | `string[]` | No | `[]` |
| `label` | `string` | Yes | — |
| `negate` | `boolean` | No | `false` |
| `canNegate` | `boolean` | No | `false` |
| `searchLabel` | `string` | No | `'Search values'` |
| `clearLabel` | `string` | No | `'Clear'` |
| `isLabel` | `string` | No | `'Is'` |
| `isNotLabel` | `string` | No | `'Is not'` |
| `emptyLabel` | `string` | No | `'No matching values'` |

Events:

- `change`: `[value: string[]]`
- `negate`: `[value: boolean]`

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `options` | `BissPickOption[]` | Yes | — |
| `selected` | `string[]` | No | `$bindable([])` |
| `label` | `string` | Yes | — |
| `negate` | `boolean` | No | `$bindable(false)` |
| `canNegate` | `boolean` | No | `false` |
| `searchLabel` | `string` | No | `'Search values'` |
| `clearLabel` | `string` | No | `'Clear'` |
| `isLabel` | `string` | No | `'Is'` |
| `isNotLabel` | `string` | No | `'Is not'` |
| `emptyLabel` | `string` | No | `'No matching values'` |
| `onchange` | `(value: string[]) => void` | No | — |
| `onnegate` | `(value: boolean) => void` | No | — |

Callbacks:

- `onchange`: `(value: string[]) => void`
- `onnegate`: `(value: boolean) => void`

## BissViewTabs

Switch a page’s view while keeping labels, counts and disabled states consistent.

[Vue source](../src/vue/BissViewTabs.vue) · [Svelte source](../src/svelte/BissViewTabs.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ key: string; label: string; count?: number; disabled?: boolean }[]` | Yes | — |
| `modelValue` | `string` | Yes | — |
| `label` | `string` | Yes | — |

Events:

- `update:modelValue`: `[string]`

Slots: `end`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ key: string; label: string; count?: number; disabled?: boolean }[]` | Yes | — |
| `value` | `string` | No | `$bindable()` |
| `label` | `string` | Yes | — |
| `end` | `import('svelte').Snippet` | No | — |
| `onchange` | `(value: string) => void` | No | — |

Callbacks:

- `onchange`: `(value: string) => void`

Snippets: `end`.

## BissWidgetGrid

Widget Grid for the team’s everyday work.

[Vue source](../src/vue/BissWidgetGrid.vue) · [Svelte source](../src/svelte/BissWidgetGrid.svelte)

### Vue

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ id: string; title: string; span?: number }[]` | Yes | — |
| `label` | `string` | No | `'Dashboard widgets'` |
| `editable` | `boolean` | No | `true` |
| `upLabel` | `string` | No | `'Move earlier'` |
| `downLabel` | `string` | No | `'Move later'` |

Events:

- `change`: `[items: { id: string; title: string; span?: number }[]]`

Slots: `default`.

### Svelte

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `{ id: string; title: string; span?: number }[]` | Yes | — |
| `label` | `string` | No | `'Dashboard widgets'` |
| `editable` | `boolean` | No | `true` |
| `upLabel` | `string` | No | `'Move earlier'` |
| `downLabel` | `string` | No | `'Move later'` |
| `onchange` | `(items: { id: string; title: string; span?: number }[]) => void` | No | — |
| `children` | `Snippet<[{ item: { id: string; title: string; span?: number }; index: number }]>` | No | — |

Callbacks:

- `onchange`: `(items: { id: string; title: string; span?: number }[]) => void`

Snippets: `children`.

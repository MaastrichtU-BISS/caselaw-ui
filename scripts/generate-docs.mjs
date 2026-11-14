/** Extract the reference from shipped SFCs; do not maintain a second handwritten API. */
import ts from 'typescript';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { parse } from '@vue/compiler-sfc';
/*
 * Two tiers, as in docs/reference-architecture.md:
 * - Components are reusable controls and displays with no application state.
 * - Blocks are compositions of components for a recurring application task;
 *   the host supplies their data and handles their actions.
 * Each group belongs to exactly one tier. Every shipped component must be listed.
 */
const tiers = {
  Components: ['Actions', 'Forms', 'Overlays', 'Navigation', 'Data display', 'Charts', 'Feedback'],
  Blocks: [
    'Application shells',
    'Page headers',
    'Data views',
    'Sharing and collaboration',
    'Dashboards',
    'Documents',
    'Onboarding',
    'Marketing',
  ],
};
const groups = {
  Actions: ['Button', 'HeaderAction', 'ToolButton', 'ToolNew', 'ToolSearch', 'Toolbar', 'EditableText'],
  Forms: [
    'Field',
    'Input',
    'Textarea',
    'Select',
    'SelectPicker',
    'ValuePicker',
    'SwatchPicker',
    'SearchInput',
    'CopyField',
    'Checkbox',
    'RadioGroup',
    'Switch',
    'SegmentedControl',
    'TagInput',
    'DatePicker',
    'DateField',
    'FilePicker',
  ],
  Overlays: [
    'Dialog',
    'Modal',
    'ConfirmDialog',
    'SidePanel',
    'Popover',
    'Menu',
    'Tooltip',
    'FigureHelp',
    'SearchPalette',
  ],
  Navigation: ['ViewTabs', 'Tab', 'Breadcrumbs', 'NavItem', 'NavSection', 'Disclosure', 'TablePager'],
  'Data display': [
    'Avatar',
    'PresenceStack',
    'PeopleCell',
    'RecordChip',
    'StatusCell',
    'Badge',
    'Card',
    'PropertyList',
    'Icon',
    'ServiceIcon',
    'DataTable',
    'TableHead',
    'TableGroup',
    'TableTotal',
    'TableAddRow',
    'CodeBlock',
    'CodeTabs',
  ],
  Charts: [
    'GoalBar',
    'CapacityBar',
    'MeterList',
    'BarChart',
    'GroupedBars',
    'StackedBar',
    'LineChart',
    'MiniChart',
    'ChartLegend',
  ],
  Feedback: [
    'AlertLine',
    'Callout',
    'EmptyState',
    'NoAccess',
    'Skeleton',
    'HomeSkel',
    'LiveStatus',
    'ToastStack',
    'SaveBar',
    'PageHint',
  ],
  'Application shells': [
    'AppShell',
    'ConsoleLayout',
    'GridShell',
    'TopBar',
    'BottomBar',
    'SidebarUser',
    'SplitPane',
  ],
  'Page headers': ['PageBar', 'PageHeader', 'ConsoleHeader', 'SectionHeader', 'SettingsHead'],
  'Data views': [
    'DataGrid',
    'ColumnManager',
    'FilterBuilder',
    'LabelEditor',
    'Kanban',
    'Calendar',
    'Timeline',
    'TaskList',
    'Agenda',
  ],
  'Sharing and collaboration': [
    'SharePanel',
    'AccessList',
    'RoleEditor',
    'CommentThread',
    'CommentComposer',
    'PresenceCursor',
    'ActivityList',
    'NoticeRow',
    'RecordPreview',
  ],
  Dashboards: [
    'WidgetGrid',
    'HomeCard',
    'GoalCard',
    'KpiCard',
    'DataTile',
    'StatList',
    'SummaryStrip',
    'QuickLinks',
    'DeadlineList',
  ],
  Documents: [
    'DocumentToc',
    'DocumentCallout',
    'Bookmark',
    'MediaFigure',
    'AttachmentList',
    'ProposalCard',
  ],
  Onboarding: ['OnboardingFrame', 'OnboardingChips', 'Checklist', 'Steps', 'Step'],
  Marketing: ['Hero', 'HeroPill', 'FeatureCard', 'ActionCard'],
};
const descriptions = {
  Button: 'A clear action with an explicit visual priority.',
  Menu: 'Searchable actions, checked choices and nested groups in a floating panel.',
  Dialog: 'Connected dialog parts with managed focus, nested layers and a shared visual recipe.',
  Modal: 'The modal API, for consumers migrating an existing dialog.',
  ConfirmDialog: 'An explicit confirmation before a consequential action.',
  SidePanel: 'Keep a record’s details in view without leaving the surrounding work.',
  Popover: 'A small panel for a choice that needs more room than a menu.',
  SelectPicker: 'A searchable dropdown with groups, disabled choices and keyboard navigation.',
  Select: 'The native select for simple browser-driven choice.',
  ValuePicker: 'Search and select multiple filter values, with optional negation.',
  SwatchPicker: 'Choose a named color from the workspace palette.',
  DatePicker: 'Select a day or a range, type a date, or navigate the calendar by keyboard.',
  DateField: 'A compact date trigger with a calendar in a floating panel.',
  SearchPalette: 'Find a record or action in a focused, searchable dialog.',
  Kanban: 'Group cards into lanes and move them by dragging or keyboard selection.',
  Calendar: 'Dates and deadlines in a month grid, with an agenda on phones.',
  Timeline: 'Show inclusive date spans clipped to the visible time window.',
  DataTable: 'Sortable columns, pagination and explicit loading and empty states.',
  Avatar: 'Initials on a stable color derived from a person’s name.',
  PresenceStack: 'A quiet, overlapping group of people currently on a page.',
  HomeCard: 'The shared widget anatomy: name, explanation, content and one action.',
  GoalBar: 'A progress track with an optional expected-progress marker.',
  GroupedBars: 'Compare series within categories and open the records behind each bar.',
  LineChart: 'A compact trend from host-provided numeric values.',
  MiniChart: 'A decorative schematic for choosing a chart type.',
  PageBar: 'A page title, context, actions and view navigation in one compact header.',
  SaveBar: 'Bring unsaved changes, recovery and save actions into one place.',
  EditableText: 'Edit a value where it stands, with Enter to save and Escape to cancel.',
  NoAccess: 'Explain restricted access and provide a useful next step.',
  EmptyState: 'Explain why the area is empty and what someone can do next.',
  HomeSkel: 'Quiet loading placeholders shaped like the content that is coming.',
  Icon: 'Bizzy’s authored SVG vocabulary, sized and stroked consistently.',
  OnboardingFrame: 'A compact setup task with a title, progress and actions.',
  Checklist: 'Track setup steps with host-owned completion state.',
  CodeBlock: 'Readable highlighted code with a copy action.',
  CodeTabs: 'Keep related language samples together and copy the active one.',
};
Object.assign(descriptions, {
  ActionCard: 'A linked surface for choosing a destination, available in both frameworks.',
  AlertLine: 'One quiet line that names a concern and points toward a useful action.',
  AppShell: 'An application frame with navigation, a working area and optional account furniture.',
  Badge: 'A compact status or category label with optional dot and tone.',
  BarChart: 'A compact request-style bar chart with an optional highlighted sub-series.',
  BottomBar: 'A shared footer for ownership, help and policy links.',
  CapacityBar: 'Allocated capacity against availability, with explicit overload feedback.',
  Card: 'A quiet surface that groups one related set of content.',
  ChartLegend: 'Name the colors and line treatments used by a chart.',
  Checklist: 'A labelled set of completion steps controlled by the host application.',
  ConsoleHeader: 'A compact console heading with breadcrumbs, context and actions.',
  ConsoleLayout: 'A ready-made console frame with sidebar, page heading and account area.',
  CopyField: 'A value that can be read, selected and copied without changing it.',
  Field: 'A label, hint or error around a control, with a scoped identifier.',
  FeatureCard: 'Describe one capability, using the service mark and supporting copy.',
  GridShell: 'The public-page frame with a shared top bar and footer.',
  HeaderAction: 'One labelled icon action in a page header.',
  Hero: 'The public-page heading with supporting copy and optional actions.',
  HeroPill: 'A small piece of supporting context in a public-page heading.',
  Input: 'A single-line value with normal form attributes and validation styling.',
  KpiCard: 'One headline figure with the label and note needed to interpret it.',
  LiveStatus: 'Quiet connection feedback only when the application is reconnecting or offline.',
  MeterList: 'Compare labelled values on a shared horizontal scale.',
  NavItem: 'A navigation destination with optional active state and metadata.',
  NavSection: 'Group related navigation destinations under a small heading.',
  NoticeRow: 'A notification row with unread state, context and a host-owned action.',
  OnboardingChips: 'Choose several interests or areas during workspace setup.',
  PageHeader: 'The page title and subtitle, with an actions slot.',
  PageHint: 'A keyboard-accessible explanation that stays out of the page’s main reading path.',
  PeopleCell: 'Show a small set of assigned people, with overflow summarized by count.',
  PropertyList: 'Display a record’s labelled properties in a compact description list.',
  RecordChip: 'A small labelled reference to a record, optionally linked.',
  SearchInput: 'A search field with the input contract and search treatment.',
  SectionHeader: 'Introduce a content section and place its actions alongside the title.',
  ServiceIcon: 'The product marks, or a short text mark supplied by the host.',
  SettingsHead: 'A settings section’s title, one-line explanation and optional extra detail.',
  SidebarUser: 'The signed-in identity with account navigation and sign-out actions.',
  Skeleton: 'Simple content-shaped bars for loading layouts.',
  StatList: 'A compact list of labelled counts or formatted values.',
  StatusCell: 'A written status reinforced by a colored dot or soft tint.',
  Step: 'One completed, current or upcoming step in an ordered setup flow.',
  Steps: 'An ordered container that gives setup steps a shared reading rhythm.',
  SummaryStrip: 'A row of labelled figures, with supporting notes and optional color markers.',
  Switch: 'A labelled on/off setting using the model contract.',
  Tab: 'A navigation tab that can render as a native button or a router link.',
  TableAddRow: 'A quiet row-level action for adding a record to the current group.',
  TableGroup: 'A collapsible group with a name, count and actions around table content.',
  TableHead: 'A column heading with a host-owned three-state sort action.',
  TablePager: 'Previous and next page controls with a live range announcement.',
  TableTotal: 'A compact label and formatted total for a table footer or group summary.',
  TagInput: 'Add and remove short labels using the model contract.',
  Textarea: 'A multiline form value with normal field attributes and validation styling.',
  ToastStack: 'Render the application-wide toast queue after an action.',
  ToolButton: 'A quiet toolbar control with active state, count and a separate clear action.',
  ToolNew: 'A primary create action with a menu for other ways to add.',
  ToolSearch: 'A compact toolbar search that expands into an editable query.',
  Toolbar: 'A wrapping row for related page tools and trailing controls.',
  TopBar: 'The shared brand and primary navigation bar.',
  ViewTabs: 'Switch a page’s view while keeping labels, counts and disabled states consistent.',
});
Object.assign(descriptions, {
  AccessList: 'Who can open a record, with their role and how they got access.',
  ActivityList: 'A chronological list of who changed what, with optional detail.',
  Agenda: 'A meeting agenda: timed items to add, reorder and tick off.',
  AttachmentList: 'Files attached to a record, with links and a remove action.',
  Bookmark: 'A rich link preview with title, description and source.',
  Breadcrumbs: 'Show where a page sits in the hierarchy and link back up.',
  Callout: 'A highlighted note that explains context or a consequence.',
  Checkbox: 'A labelled checkbox with optional description text.',
  ColumnManager: 'Show, hide, pin, reorder and resize the columns of a table.',
  CommentComposer: 'Write a comment, mention people and submit with the keyboard.',
  CommentThread: 'A discussion on a record, with a composer and resolve state.',
  DataGrid: 'A spreadsheet-like table with selection, pinning, sorting and resizable columns.',
  DataTile: 'A dashboard tile that frames a figure, a chart or a list.',
  DeadlineList: 'Dated items ordered by urgency, with overdue items called out.',
  Disclosure: 'Hide secondary detail behind a labelled toggle.',
  DocumentCallout: 'A tinted note block inside a document.',
  DocumentToc: 'A document outline that tracks the heading in view.',
  FigureHelp: 'Explain how a figure is calculated, next to the figure.',
  FilePicker: 'Choose files or drop them onto the field.',
  FilterBuilder: 'Compose filter rules with fields, operators and values.',
  GoalCard: 'A goal with its progress, expected pace and owner.',
  LabelEditor: 'Create, rename, recolor and remove the labels of a field.',
  MediaFigure: 'An image or video with caption and credit.',
  PresenceCursor: 'Another person’s cursor, labelled with their name and color.',
  ProposalCard: 'A suggested change that someone can review before applying.',
  QuickLinks: 'A compact grid of frequent destinations.',
  RadioGroup: 'Choose one option from a short, visible list.',
  RecordPreview: 'A compact preview of a linked record, or a notice when it is restricted.',
  RoleEditor: 'Define roles and the permissions each one grants.',
  SegmentedControl: 'Switch between a few mutually exclusive views or modes.',
  SharePanel: 'Invite people, set their role and manage a public link.',
  SplitPane: 'Two resizable panes, such as a list beside its detail.',
  StackedBar: 'Parts of a whole in one horizontal bar, with a legend.',
  TaskList: 'Tasks with completion, owner, due date and status.',
  Tooltip: 'A short label for a control, shown on hover and focus.',
  WidgetGrid: 'Arrange dashboard widgets in a grid that people can reorder by drag or keyboard.',
});
// Core primitives.
groups.Forms.push('Slider', 'NumberField', 'ToggleGroup');
groups.Navigation.push('Tabs', 'Accordion', 'Pagination');
groups.Feedback.push('Progress', 'Spinner');
groups['Data display'].push('Kbd', 'Separator');
const groupAdvice = {
  Actions:
    'Keep one primary action per task. Use quiet controls for secondary work, and provide a specific accessible name for every icon-only action.',
  Forms:
    'Give every control a visible label. Keep values in host state, validate before saving, and put recovery text beside the field.',
  Overlays:
    'Use an overlay for a focused choice or task. Provide a clear title, preserve keyboard focus and return focus when the task ends.',
  Navigation:
    'Keep navigation in a predictable order and let the host router own destinations and permissions.',
  'Data display':
    'Use display-ready names and values. Display components do not fetch records or decide who may see them.',
  Charts:
    'State what a figure means. Include labels and units in nearby copy, and use color as reinforcement rather than the only signal.',
  Feedback:
    'Keep messages calm, specific and actionable. Distinguish loading, empty, error and access states instead of presenting a generic blank panel.',
  'Application shells':
    'The shell frames the page; the host router owns navigation, the signed-in account and permissions.',
  'Page headers':
    'Keep the page title, context, view navigation and actions in a predictable order across pages.',
  'Data views':
    'Pass only the records the person may see. The host owns persistence, permissions and domain calculations; these blocks render data and emit intent.',
  'Sharing and collaboration':
    'These blocks show and edit who can do what. The host resolves identities, checks permissions and persists every change.',
  Dashboards:
    'Each widget answers one question. Name the figure, explain it in a line, and offer one next action.',
  Documents:
    'Document blocks render host-provided content. Sanitize rich text before passing it in and keep links explicit.',
  Onboarding:
    'Ask for the smallest useful choice at each step. Completion and progress belong to the application, so people can leave and return safely.',
  Marketing:
    'Public-page compositions: keep copy short and specific, and give each section one clear action.',
};
function api(source, vue) {
  const script = vue
    ? (parse(source).descriptor.scriptSetup?.content ??
      parse(source).descriptor.script?.content ??
      '')
    : (source.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? '');
  const sf = ts.createSourceFile(
    'component.ts',
    script,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const props = [],
    events = [],
    models = [];
  const defaults = {};
  let svelteType;
  function members(type,seen=new Set()){
    if(!type)return [];
    if(ts.isTypeLiteralNode(type)||ts.isInterfaceDeclaration(type))return [...type.members];
    if(ts.isIntersectionTypeNode(type))return type.types.flatMap(t=>members(t,seen));
    if(ts.isTypeReferenceNode(type)){
      const name=type.typeName.getText(sf);if(seen.has(name))return [];seen.add(name);
      const declaration=sf.statements.find(s=>(ts.isInterfaceDeclaration(s)||ts.isTypeAliasDeclaration(s))&&s.name.text===name);
      if(declaration)return members(ts.isTypeAliasDeclaration(declaration)?declaration.type:declaration,seen);
    }
    return [];
  }
  const property = (m) => ({
    name: m.name?.getText(sf).replace(/['"]/g, ''),
    type: m.type?.getText(sf) ?? 'unknown',
    required: !m.questionToken,
    description: (m.jsDoc ?? [])
      .map((d) => (typeof d.comment === 'string' ? d.comment : ''))
      .join(' '),
  });
  const visit = (node) => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      const fn = node.expression.text;
      if (
        fn === 'defineProps' &&
        node.typeArguments?.[0] &&
        ts.isTypeLiteralNode(node.typeArguments[0])
      )
        props.push(...node.typeArguments[0].members.map(property));
      if (
        !vue &&
        fn === 'createEventDispatcher' &&
        node.typeArguments?.[0] &&
        ts.isTypeLiteralNode(node.typeArguments[0])
      )
        events.push(...node.typeArguments[0].members.map(property));
      if (!vue && fn === 'dispatch' && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) {
        const name = node.arguments[0].text;
        if (!events.some((e) => e.name === name))
          events.push({
            name,
            type: node.arguments[1] ? 'payload' : 'void',
            required: false,
            description: 'Dispatched component event.',
          });
      }
      if (
        fn === 'defineEmits' &&
        node.typeArguments?.[0] &&
        ts.isTypeLiteralNode(node.typeArguments[0])
      )
        events.push(...node.typeArguments[0].members.map(property));
      if (fn === 'defineModel') {
        const arg = node.arguments[0];
        const name = arg && ts.isStringLiteral(arg) ? arg.text : 'modelValue';
        const opts = node.arguments[name === 'modelValue' ? 0 : 1];
        const d =
          opts && ts.isObjectLiteralExpression(opts)
            ? opts.properties.find((p) => p.name?.getText(sf) === 'default')
            : null;
        models.push({
          name,
          type: node.typeArguments?.[0]?.getText(sf) ?? 'unknown',
          required: false,
          description:
            'Controlled model. Bind with v-model' + (name === 'modelValue' ? '' : ':' + name) + '.',
          default: d?.initializer?.getText(sf),
        });
      }
      if (
        fn === 'withDefaults' &&
        node.arguments[1] &&
        ts.isObjectLiteralExpression(node.arguments[1])
      )
        for (const prop of node.arguments[1].properties)
          if (ts.isPropertyAssignment(prop))
            defaults[prop.name.getText(sf).replace(/['"]/g, '')] = prop.initializer.getText(sf);
    }
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name)) {
      for (const binding of node.name.elements)
        if (binding.initializer)
          defaults[binding.name.getText(sf)] = binding.initializer.getText(sf);
      if(node.type)svelteType=node.type;
    }
    if (
      !vue &&
      ts.isVariableStatement(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    )
      for (const decl of node.declarationList.declarations)
        if (ts.isIdentifier(decl.name))
          props.push({
            name: decl.name.text,
            type: decl.type?.getText(sf) ?? (decl.initializer ? 'inferred' : 'unknown'),
            required: !decl.initializer,
            default: decl.initializer?.getText(sf),
            description: '',
          });
    ts.forEachChild(node, visit);
  };
  visit(sf);
  if (!vue && svelteType)
    props.push(...members(svelteType).filter(ts.isPropertySignature).map(property));
  if (!vue)
    for (const match of source.matchAll(/on:(\w+)(?=\s|>)/g)) {
      if (!events.some((e) => e.name === match[1]))
        events.push({
          name: match[1],
          type: match[1] === 'click' ? 'MouseEvent' : 'Event',
          required: false,
          description: 'Forwarded native event.',
        });
    }
  return {
    props: [...props, ...models].map((p) => ({
      ...p,
      ...(defaults[p.name] !== undefined ? { default: defaults[p.name] } : {}),
    })),
    events: [
      ...events,
      ...(!vue
        ? props
            .filter((p) => /^on[a-zA-Z]/.test(p.name))
            .map((p) => ({ ...p, description: 'Callback prop.' }))
        : []),
    ],
    slots: [
      ...new Set(
        [...source.matchAll(/<slot(?:\s+name="([^"]+)")?/g)]
          .map((m) => m[1] ?? 'default')
          .concat(!vue ? props.filter((p) => p.type.includes('Snippet')).map((p) => p.name) : []),
      ),
    ],
  };
}
const vueNames = readdirSync('src/vue')
  .filter((f) => f.endsWith('.vue'))
  .map((f) => f.slice(0, -4));
const svelteNames = readdirSync('src/svelte')
  .filter((f) => f.endsWith('.svelte'))
  .map((f) => f.slice(0, -7));
const names = [...new Set([...vueNames, ...svelteNames])].sort();
for (const group of Object.keys(groups))
  if (!Object.values(tiers).flat().includes(group)) throw Error('Group without tier ' + group);
const components = names.map((name) => {
  const short = name.slice(4),
    category = Object.keys(groups).find((g) => groups[g].includes(short));
  if (!category) throw Error('Uncategorized ' + name);
  const vue = vueNames.includes(name)
    ? api(readFileSync('src/vue/' + name + '.vue', 'utf8'), true)
    : null;
  const svelte = svelteNames.includes(name)
    ? api(readFileSync('src/svelte/' + name + '.svelte', 'utf8'), false)
    : null;
  return {
    name,
    tier: Object.keys(tiers).find((t) => tiers[t].includes(category)),
    slug: short.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
    short,
    category,
    description:
      descriptions[short] ??
      `${short.replace(/([a-z])([A-Z])/g, '$1 $2')} for the team’s everyday work.`,
    guidance: groupAdvice[category],
    vue,
    svelte,
    modern: !!svelte && readFileSync('src/svelte/' + name + '.svelte', 'utf8').includes('$props()'),
  };
});
writeFileSync(
  'docs-site/generated/components.json',
  JSON.stringify({ tiers, groups: Object.keys(groups), components }, null, 2) + '\n',
);
console.log(
  `Generated docs for ${components.length} components (${vueNames.length} Vue, ${svelteNames.length} Svelte).`,
);
// The Markdown component guide follows the same taxonomy as the site.
const guide = [
  '# Component guide',
  '',
  `Generated by scripts/generate-docs.mjs. BISS UI ships ${components.length} components in each framework, in two tiers.`,
  'See [architecture](architecture.md) for package boundaries and state ownership, and the',
  '[documentation site](https://bissui.wicker.life) for live examples and source-derived APIs.',
  '',
];
for (const [tier, tierGroups] of Object.entries(tiers)) {
  guide.push(`## ${tier}`, '');
  for (const group of tierGroups) {
    const members = components.filter((c) => c.category === group);
    if (!members.length) continue;
    guide.push(`### ${group}`, '', groupAdvice[group], '');
    for (const c of members) guide.push(`- [${c.name}](api.md#${c.name.toLowerCase()}): ${c.description}`);
    guide.push('');
  }
}
writeFileSync('docs/components.md', guide.join('\n').trimEnd() + '\n');

/** Extract the reference from shipped SFCs; do not maintain a second handwritten API. */
import ts from 'typescript';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { parse } from '@vue/compiler-sfc';
const groups = {
  'Getting things done': [
    'Button',
    'HeaderAction',
    'ToolButton',
    'ToolNew',
    'ToolSearch',
    'Toolbar',
    'SaveBar',
    'EditableText',
  ],
  'Forms and selection': [
    'Field',
    'Input',
    'Textarea',
    'Select',
    'SelectPicker',
    'ValuePicker',
    'SwatchPicker',
    'SearchInput',
    'CopyField',
    'Switch',
    'TagInput',
    'DatePicker',
    'DateField',
  ],
  'Overlays and search': [
    'Dialog',
    'Modal',
    'ConfirmDialog',
    'SidePanel',
    'Popover',
    'Menu',
    'SearchPalette',
  ],
  'Pages and navigation': [
    'PageBar',
    'PageHeader',
    'ConsoleHeader',
    'SectionHeader',
    'SettingsHead',
    'PageHint',
    'ViewTabs',
    'Tab',
    'NavItem',
    'NavSection',
    'AppShell',
    'ConsoleLayout',
    'GridShell',
    'TopBar',
    'BottomBar',
    'SidebarUser',
  ],
  'People and records': [
    'Avatar',
    'PresenceStack',
    'PeopleCell',
    'RecordChip',
    'StatusCell',
    'PropertyList',
    'ActivityList',
    'NoticeRow',
    'ServiceIcon',
    'Icon',
  ],
  'Tables and boards': [
    'DataTable',
    'TableHead',
    'TableGroup',
    'TableTotal',
    'TableAddRow',
    'TablePager',
    'Kanban',
    'Calendar',
    'Timeline',
  ],
  'Widgets and charts': [
    'HomeCard',
    'GoalCard',
    'GoalBar',
    'CapacityBar',
    'ChartLegend',
    'GroupedBars',
    'LineChart',
    'MiniChart',
    'KpiCard',
    'StatList',
    'MeterList',
    'BarChart',
    'SummaryStrip',
  ],
  'Content and feedback': [
    'AlertLine',
    'Card',
    'Badge',
    'Callout',
    'EmptyState',
    'NoAccess',
    'HomeSkel',
    'Skeleton',
    'LiveStatus',
    'ToastStack',
    'Hero',
    'HeroPill',
    'FeatureCard',
    'ActionCard',
    'CodeBlock',
    'CodeTabs',
  ],
  Onboarding: ['OnboardingFrame', 'OnboardingChips', 'Checklist', 'Step', 'Steps'],
};
const descriptions = {
  Button: 'A clear action with an explicit visual priority.',
  Menu: 'Searchable actions, checked choices and nested groups in a floating panel.',
  Dialog: 'A focused task with native modal behavior, a title and an action row.',
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
groups['Forms and selection'].push('Checkbox', 'RadioGroup', 'SegmentedControl', 'FilePicker');
groups['Overlays and search'].push('Tooltip', 'FigureHelp');
groups['Pages and navigation'].push('Breadcrumbs', 'Disclosure', 'SplitPane', 'DocumentToc');
groups['People and records'].push(
  'AccessList',
  'RoleEditor',
  'SharePanel',
  'CommentComposer',
  'CommentThread',
  'RecordPreview',
  'PresenceCursor',
);
groups['Tables and boards'].push(
  'DataGrid',
  'ColumnManager',
  'FilterBuilder',
  'LabelEditor',
  'TaskList',
  'Agenda',
);
groups['Widgets and charts'].push(
  'DataTile',
  'WidgetGrid',
  'QuickLinks',
  'DeadlineList',
  'StackedBar',
);
groups['Content and feedback'].push(
  'DocumentCallout',
  'Bookmark',
  'MediaFigure',
  'AttachmentList',
  'ProposalCard',
);
const groupAdvice = {
  'Getting things done':
    'Keep one primary action per task. Use quiet controls for secondary work, and provide a specific accessible name for every icon-only action.',
  'Forms and selection':
    'Give every control a visible label. Keep values in host state, validate before saving, and put recovery text beside the field.',
  'Overlays and search':
    'Use an overlay for a focused choice or task. Provide a clear title, preserve keyboard focus and return focus when the task ends.',
  'Pages and navigation':
    'Keep the page title, view navigation and toolbar in a predictable order. Let the host router own navigation and permissions.',
  'People and records':
    'Use display-ready names and values. Identity components do not fetch accounts or decide who may see a record.',
  'Tables and boards':
    'Pass only the records the person may see. The host owns persistence, permissions and domain calculations; these components render data and emit intent.',
  'Widgets and charts':
    'State what a figure means. Include labels and units in nearby copy, and use color as reinforcement rather than the only signal.',
  'Content and feedback':
    'Keep messages calm, specific and actionable. Distinguish loading, empty, error and access states instead of presenting a generic blank panel.',
  Onboarding:
    'Ask for the smallest useful choice at each step. Completion and progress belong to the application, so people can leave and return safely.',
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
  JSON.stringify({ groups: Object.keys(groups), components }, null, 2) + '\n',
);
console.log(
  `Generated docs for ${components.length} components (${vueNames.length} Vue, ${svelteNames.length} Svelte).`,
);

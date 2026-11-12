export const guides = [
  {
    slug: 'getting-started',
    title: 'Getting started',
    description: 'Install the package, import the stylesheet, and render your first component.',
    sections: [
      {
        title: 'A separate package',
        body: 'BISS UI brings Bizzy’s warm surfaces, compact controls and quiet feedback into Vue and Svelte applications. It is a new package: installing it does not upgrade caselaw-ui or change another application. The branch is a release candidate; no npm publication is implied by these docs.',
      },
      {
        title: 'Install the preview release',
        body: 'After the first publication, install the next tag in the application that is ready to migrate. Until then, create a local tarball with npm pack and install that file in a test consumer.',
        code: 'npm install biss-ui@next\n# Local development before publication:\n# npm install /path/to/biss-ui-0.1.0-next.0.tgz',
      },
      {
        title: 'Vue',
        body: 'Import the stylesheet once in your application entry point. Use Vue 3.5 or newer, and a bundler that compiles Vue single-file components.',
        code: "import 'biss-ui/styles.css';\nimport { BissButton, BissPageBar } from 'biss-ui/vue';",
      },
      {
        title: 'Svelte',
        body: 'Use Svelte 5.20 or newer. The expanded components use callback props and snippets. Earlier components retain their existing events and slots; each component page shows its actual contract.',
        code: "import 'biss-ui/styles.css';\nimport { BissButton, BissDatePicker } from 'biss-ui/svelte';",
      },
      {
        title: 'Keep the application in charge',
        body: 'The host owns data fetching, permission checks, translations and persistence. Pass display-ready data to components and handle their events. No Nuxt globals, account store or server connection is required.',
      },
    ],
  },
  {
    slug: 'theming',
    title: 'Theming',
    description: 'Use the same visual grammar with your product’s colors, type and density.',
    sections: [
      {
        title: 'Start with semantic tokens',
        body: 'All component styles and custom properties use the biss- prefix. Override tokens on a wrapper to theme one area, or on :root to theme the application. Components do not reset the page’s HTML styles.',
        code: '.research-tool {\n  --biss-primary: #005ca9;\n  --biss-primary-hover: #004a8a;\n  --biss-bg: #faf9f7;\n  --biss-card: #ffffff;\n  --biss-text: #1d1c1a;\n  --biss-muted: #5e5c57;\n  --biss-border: #e7e5e0;\n  --biss-radius-sm: 7px;\n  --biss-radius-md: 10px;\n  --biss-control-height: 32px;\n}',
      },
      {
        title: 'Typography',
        body: 'Supply your own font. Inter fits the reference design, with system sans as a fallback. The package makes no font network requests. Page titles are compact; labels and tabular numbers carry the working interface.',
        code: ".research-tool {\n  --biss-font-family: 'Inter', system-ui, sans-serif;\n  --biss-row-height: 36px;\n}",
      },
      {
        title: 'Overlay inheritance',
        body: 'The new menus and popovers stay inside the wrapper’s DOM while using the browser’s top layer. They keep the surrounding theme, including when opened from a dialog. The inherited Modal uses a body portal; put its theme overrides on :root.',
      },
      {
        title: 'State colors',
        body: 'Blue marks primary actions, green success, red errors and amber attention. Keep a written label alongside state colors. A complete dark theme needs a complete semantic palette; there is no prebuilt dark theme in this release.',
      },
    ],
  },
  {
    slug: 'accessibility',
    title: 'Accessibility',
    description: 'Labels, keyboard use, focus, state and motion belong to every component.',
    sections: [
      {
        title: 'Name the action',
        body: 'Give icon buttons a specific label such as “Refresh projects”. Use a visible label for form fields. Decorative icons are hidden from assistive technology and need a labelled parent when they are the only content.',
      },
      {
        title: 'Keyboard and focus',
        body: 'Menus and pickers support arrows, Home and End through enabled choices. Native dialogs make the background inert, wrap focus and return focus to the invoking control. Escape and outside interaction dismiss floating choices; busy dialogs block dismissal while work is in flight.',
      },
      {
        title: 'Dates and ranges',
        body: 'Arrow keys move by day or week. Page Up and Page Down change month; Shift changes year. Home and End move to the ends of the week. The calendar exposes selected and disabled states, and accepts typed dates as an alternative.',
      },
      {
        title: 'Motion and contrast',
        body: 'Nonessential animation respects prefers-reduced-motion. If you override the palette, check foreground/background contrast and focus rings in the host application. Accessible defaults cannot guarantee arbitrary custom themes.',
      },
      {
        title: 'Verification scope',
        body: 'The desktop and phone browser suites exercise both framework catalogs. Automated WCAG scans cover the expanded catalog, menus and dialogs. They supplement keyboard and assistive-technology testing in the consuming application. Documentation screenshots are visual references, not accessibility certification.',
      },
    ],
  },
  {
    slug: 'migration',
    title: 'Migrating from caselaw-ui',
    description: 'Move one consumer at a time while leaving the existing package available.',
    sections: [
      {
        title: 'Opt in independently',
        body: 'Keep existing applications on caselaw-ui until they are ready. BISS UI uses a separate npm identity and release tag namespace. The repository name can stay unchanged while both release lines are maintained.',
      },
      {
        title: 'Update imports and tokens',
        body: 'Change the dependency, framework imports, stylesheet and Cle-prefixed component names. Rename custom-property overrides from --cle-* to --biss-*. Run the application and review its real states before rollout.',
        code: "// Before\nimport { CleButton } from 'caselaw-ui/vue';\nimport 'caselaw-ui/styles.css';\n\n// After\nimport { BissButton } from 'biss-ui/vue';\nimport 'biss-ui/styles.css';",
      },
      {
        title: 'Choose the right component',
        body: 'The inherited API remains available alongside the Bizzy-derived components. Prefer PageBar for compact application headers, Dialog for the native modal contract, and SelectPicker for a searchable choice. Modal and Select keep the inherited contracts for migration.',
      },
      {
        title: 'Respect the host boundary',
        body: 'Kanban emits move, add and open; Calendar emits add and open; Timeline renders date spans and emits open. Persistence, drag resizing, dependency scheduling and collaborative editing remain host features. These views do not bundle Bizzy’s board engine.',
      },
    ],
  },
];

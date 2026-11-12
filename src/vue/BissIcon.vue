<script setup lang="ts">
import type { BissIconName } from '../core/icon-names';
defineProps<{ name: BissIconName }>();
</script>
<template>
  <svg class="biss-icon" viewBox="0 0 24 24" aria-hidden="true">
    <template v-if="name === 'search'">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </template>
    <path v-else-if="name === 'plus'" d="M12 5v14M5 12h14" />
    <path v-else-if="name === 'down'" d="M12 4v12m-5-5 5 5 5-5M5 20h14" />
    <path v-else-if="name === 'up'" d="M12 16V4m-5 5 5-5 5 5M5 20h14" />
    <path
      v-else-if="name === 'spark'"
      d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"
    />
    <path v-else-if="name === 'filter'" d="M4 5h16l-6 8v5l-4 2v-7z" />
    <template v-else-if="name === 'grip'">
      <circle cx="9" cy="6" r="1" />
      <circle cx="15" cy="6" r="1" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="9" cy="18" r="1" />
      <circle cx="15" cy="18" r="1" />
    </template>
    <template v-else-if="name === 'cal'">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </template>
    <path v-else-if="name === 'play'" d="M8 5.5v13l10.5-6.5z" />
    <path
      v-else-if="name === 'bell'"
      d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15zM10 20.5a2.2 2.2 0 0 0 4 0"
    />
    <template v-else-if="name === 'info'">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5v.5" />
    </template>
    <template v-else-if="name === 'alert'">
      <path d="M12 4 2.8 19.5h18.4z" />
      <path d="M12 10v4.5M12 17v.5" />
    </template>
    <template v-else-if="name === 'columns'">
      <rect x="3.5" y="5" width="7" height="14" rx="1.5" />
      <rect x="13.5" y="5" width="7" height="14" rx="1.5" />
    </template>
    <path v-else-if="name === 'toggle'" d="m8 7 5 5-5 5M15 17h5" />
    <path v-else-if="name === 'chev'" d="m9 6 6 6-6 6" />
    <path v-else-if="name === 'chevLeft'" d="m15 6-6 6 6 6" />
    <path v-else-if="name === 'arrowUp'" d="M12 19V5m-6 6 6-6 6 6" />
    <path v-else-if="name === 'arrowDown'" d="M12 5v14m-6-6 6 6 6-6" />
    <path v-else-if="name === 'moveTo'" d="M4 12h12m-4-5 5 5-5 5M20 5v14" />
    <path v-else-if="name === 'x'" d="M6 6l12 12M18 6 6 18" />
    <template v-else-if="name === 'lock'">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </template>
    <path v-else-if="name === 'undo'" d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3" />
    <path
      v-else-if="name === 'home'"
      d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"
    />
    <template v-else-if="name === 'deals'">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </template>
    <path v-else-if="name === 'chart'" d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3" />
    <path v-else-if="name === 'sigma'" d="M17.5 5h-11l6.5 7-6.5 7h11" />
    <path
      v-else-if="name === 'pie'"
      d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5H12zM15 3.8V9h5.2A8.5 8.5 0 0 0 15 3.8z"
    />
    <template v-else-if="name === 'people'">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5M16 4.5a3 3 0 0 1 0 6M18 15c1.6.6 2.7 2.3 3 5" />
    </template>
    <template v-else-if="name === 'grid'">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </template>
    <path v-else-if="name === 'send'" d="M5 12h13M13 6l6 6-6 6" />
    <path v-else-if="name === 'edit'" d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4" />
    <path v-else-if="name === 'trash'" d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
    <template v-else-if="name === 'copy'">
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </template>
    <template v-else-if="name === 'more'">
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </template>
    <path v-else-if="name === 'check'" d="m5 12 5 5 9-10" />
    <template v-else-if="name === 'user'">
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20c1.2-3.6 4.1-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
    </template>
    <template v-else-if="name === 'users'">
      <circle cx="9" cy="8.5" r="3.5" />
      <path
        d="M2.5 19.5c1-3 3.6-4.7 6.5-4.7s5.5 1.7 6.5 4.7M15.5 5.2a3.5 3.5 0 0 1 0 6.6M18 14.9c1.8.6 3 2.2 3.5 4.6"
      />
    </template>
    <template v-else-if="name === 'gear'">
      <circle cx="12" cy="12" r="3" />
      <path
        d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5"
      />
    </template>
    <path
      v-else-if="name === 'logout'"
      d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l-4-4 4-4M6 12h10"
    />
    <template v-else-if="name === 'mail'">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </template>
    <path
      v-else-if="name === 'link'"
      d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"
    />
    <path v-else-if="name === 'pin'" d="M9 3.5h6l-1 6 3.5 3.5H6.5L10 9.5zM12 13v7.5" />
    <template v-else-if="name === 'eye'">
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </template>
    <template v-else-if="name === 'palette'">
      <path
        d="M12 3.5a8.5 8.5 0 0 0 0 17c1.3 0 1.9-.9 1.9-1.9 0-1.4-1.2-1.7-1.2-2.9 0-1 .8-1.7 1.8-1.7h2.2a4.3 4.3 0 0 0 4.3-4.3C21 6.6 17 3.5 12 3.5z"
      />
      <circle cx="7.8" cy="11" r="1" />
      <circle cx="10.5" cy="7.3" r="1" />
      <circle cx="15" cy="7.6" r="1" />
    </template>
    <path v-else-if="name === 'text'" d="M5 6V4.5h14V6M12 4.5v15M9 19.5h6" />
    <template v-else-if="name === 'layout'">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M3.5 9.5h17M10 9.5v11" />
    </template>
    <path v-else-if="name === 'refresh'" d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4.5h-4.5" />
    <template v-else-if="name === 'globe'">
      <circle cx="12" cy="12" r="8.5" />
      <path
        d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5s1.1-6.1 3.4-8.5z"
      />
    </template>
    <path v-else-if="name === 'sliders'" d="M4 7h10M18 7h2M4 17h4M12 17h8M14 4.5v5M8 14.5v5" />
    <template v-else-if="name === 'drag'">
      <circle cx="9" cy="6" r="1.2" />
      <circle cx="15" cy="6" r="1.2" />
      <circle cx="9" cy="12" r="1.2" />
      <circle cx="15" cy="12" r="1.2" />
      <circle cx="9" cy="18" r="1.2" />
      <circle cx="15" cy="18" r="1.2" />
    </template>
    <path v-else-if="name === 'flag'" d="M5 21V4.5M5 5h11.5l-2.5 4 2.5 4H5" />
    <template v-else-if="name === 'target'">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r=".9" style="fill: currentColor" />
    </template>
    <path v-else-if="name === 'expand'" d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
    <template v-else-if="name === 'collapse'">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M14 4v16" />
    </template>
    <rect
      v-else-if="name === 'stop'"
      x="7"
      y="7"
      width="10"
      height="10"
      rx="2"
      style="fill: currentColor"
    />
    <template v-else-if="name === 'history'">
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5" />
      <path d="M3.5 4v4.5H8M12 8v4.5l3 2" />
    </template>
    <path v-else-if="name === 'menu'" d="M4 7h16M4 12h16M4 17h16" />
    <template v-else-if="name === 'panel'">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M9 4.5v15" />
    </template>
    <template v-else-if="name === 'key'">
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 8.5-8.5M16 7l2.5 2.5M14 9l2 2" />
    </template>
    <template v-else-if="name === 'file'">
      <path d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20z" />
      <path d="M14 3.5V8h4M9 12.5h6M9 16h6" />
    </template>
    <template v-else-if="name === 'print'">
      <path d="M7 9V3.5h10V9M7 17H4.5V9.5h15V17H17" />
      <rect x="7" y="14" width="10" height="6.5" rx="1" />
    </template>
    <path
      v-else-if="name === 'plug'"
      d="M9 3.5v5M15 3.5v5M6.5 8.5h11V12a5.5 5.5 0 0 1-11 0zM12 17.5v3"
    />
    <path
      v-else-if="name === 'chat'"
      d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-7l-4 3.5V16H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
    />
    <template v-else-if="name === 'kanban'">
      <rect x="3.5" y="4" width="5" height="16" rx="1.5" />
      <rect x="9.5" y="4" width="5" height="10" rx="1.5" />
      <rect x="15.5" y="4" width="5" height="13" rx="1.5" />
    </template>
    <path v-else-if="name === 'gantt'" d="M4 4v16M7 7h7M10 12h8M8 17h6" />
    <path
      v-else-if="name === 'inbox'"
      d="M4 13h4.5l1.5 2.5h4L15.5 13H20M4 13l2.5-7.5h11L20 13v5.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"
    />
    <path
      v-else-if="name === 'star'"
      d="m12 3.8 2.5 5.2 5.6.7-4.1 3.9 1 5.6L12 16.5l-5 2.7 1-5.6-4.1-3.9 5.6-.7z"
    />
    <path
      v-else-if="name === 'folder'"
      d="M3.5 6.5a1 1 0 0 1 1-1h4.8l2 2.2h8.2a1 1 0 0 1 1 1v9.8a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z"
    />
    <template v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </template>
    <path v-else-if="name === 'list'" d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
    <template v-else-if="name === 'checkbox'">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="m8 12 3 3 5-6" />
    </template>
    <path
      v-else-if="name === 'paperclip'"
      d="m19 11.5-7.2 7.2a4.5 4.5 0 0 1-6.4-6.4l7.6-7.6a3 3 0 0 1 4.3 4.3l-7.4 7.4a1.5 1.5 0 0 1-2.1-2.1l6.7-6.7"
    />
    <template v-else-if="name === 'at'">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M15.5 12v1.5a2.5 2.5 0 0 0 5 0V12a8.5 8.5 0 1 0-3.4 6.8" />
    </template>
    <path v-else-if="name === 'bold'" d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" />
    <path v-else-if="name === 'italic'" d="M10 5h8M6 19h8M14 5l-4 14" />
    <path
      v-else-if="name === 'strike'"
      d="M5 12h14M16 7.5C15.4 6 13.9 5 12 5c-2.5 0-4 1.4-4 3.2 0 1.4 1 2.3 2.6 2.8M8 16.5c.6 1.5 2.1 2.5 4 2.5 2.5 0 4-1.4 4-3.2 0-.6-.2-1.2-.5-1.6"
    />
    <path v-else-if="name === 'code'" d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    <path v-else-if="name === 'quote'" d="M5 7h5v5c0 3-1.5 5-4 5M14 7h5v5c0 3-1.5 5-4 5" />
    <path v-else-if="name === 'heading'" d="M6 5v14M16 5v14M6 12h10" />
    <path
      v-else-if="name === 'listOl'"
      d="M10 6h10M10 12h10M10 18h10M4 5l1.5-1v5M3.5 14.2c.3-.6.9-1 1.6-1 1 0 1.6.6 1.6 1.3 0 1.2-3.2 2.1-3.2 3.5h3.3"
    />
    <template v-else-if="name === 'image'">
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5" />
    </template>
    <template v-else-if="name === 'smile'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 14.5c.9 1.2 2.1 1.8 3.5 1.8s2.6-.6 3.5-1.8M9 9.5v.5M15 9.5v.5" />
    </template>
    <path v-else-if="name === 'reply'" d="M10 8 5 12.5l5 4.5M5.5 12.5H14a5 5 0 0 1 5 5v1" />
    <path v-else-if="name === 'minus'" d="M5 12h14" />
    <template v-else-if="name === 'codeBlock'">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="m10 10-2 2 2 2M14 10l2 2-2 2" />
    </template>
    <template v-else-if="name === 'building'">
      <path d="M4 20.5h16M6 20.5V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15.5M15 9h3a1 1 0 0 1 1 1v10.5" />
      <path d="M9 8h2M9 12h2M9 16h2" />
    </template>
  </svg>
</template>

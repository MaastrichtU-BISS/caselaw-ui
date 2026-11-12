<script setup lang="ts">
import type { BissCrumb } from "../types";

defineProps<{
  title: string;
  subtitle?: string;
  crumbs?: BissCrumb[];
}>();
</script>

<template>
  <header>
    <nav v-if="crumbs?.length" class="biss-breadcrumbs" aria-label="Breadcrumb">
      <template v-for="(crumb, index) in crumbs" :key="crumb.label">
        <span v-if="index > 0" class="biss-breadcrumb-sep" aria-hidden="true">/</span>
        <a v-if="crumb.href" :href="crumb.href">{{ crumb.label }}</a>
        <span v-else aria-current="page">{{ crumb.label }}</span>
      </template>
    </nav>
    <div class="biss-console-header">
      <div>
        <h1 class="biss-console-title">{{ title }}</h1>
        <p v-if="subtitle" class="biss-console-subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="biss-console-header-actions">
        <slot name="actions" />
      </div>
    </div>
    <slot />
  </header>
</template>

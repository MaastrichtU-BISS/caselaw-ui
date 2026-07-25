<script setup lang="ts">
import type { CleCrumb } from "../types";

defineProps<{
  title: string;
  subtitle?: string;
  crumbs?: CleCrumb[];
}>();
</script>

<template>
  <header>
    <nav v-if="crumbs?.length" class="cle-breadcrumbs" aria-label="Breadcrumb">
      <template v-for="(crumb, index) in crumbs" :key="crumb.label">
        <span v-if="index > 0" class="cle-breadcrumb-sep" aria-hidden="true">/</span>
        <a v-if="crumb.href" :href="crumb.href">{{ crumb.label }}</a>
        <span v-else aria-current="page">{{ crumb.label }}</span>
      </template>
    </nav>
    <div class="cle-console-header">
      <div>
        <h1 class="cle-console-title">{{ title }}</h1>
        <p v-if="subtitle" class="cle-console-subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="cle-console-header-actions">
        <slot name="actions" />
      </div>
    </div>
    <slot />
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'reka-ui';
import BissIcon from './BissIcon.vue';
import type { BissAccordionItem } from '../core/types';
const props = withDefaults(
  defineProps<{
    items: BissAccordionItem[];
    /** `single` keeps one section open; `multiple` lets several stay open. */
    type?: 'single' | 'multiple';
    /** In single mode, allow closing the open section again. */
    collapsible?: boolean;
    disabled?: boolean;
    /** Heading level of each section title, to fit the page outline. */
    headingLevel?: 2 | 3 | 4 | 5 | 6;
  }>(),
  { type: 'single', collapsible: true, disabled: false, headingLevel: 3 },
);
const model = defineModel<string | string[]>();
const root = computed(
  () =>
    ({
      type: props.type,
      collapsible: props.collapsible,
      disabled: props.disabled,
      modelValue: model.value,
    }) as Record<string, unknown>,
);
function update(value: string | string[] | undefined) {
  model.value = value ?? (props.type === 'multiple' ? [] : '');
}
</script>
<template>
  <AccordionRoot class="biss-accordion" v-bind="root" @update:model-value="update">
    <AccordionItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      class="biss-accordion-item"
    >
      <AccordionHeader :as="'h' + headingLevel" class="biss-accordion-header">
        <AccordionTrigger class="biss-accordion-trigger"
          ><span class="biss-accordion-title"
            >{{ item.title
            }}<small v-if="item.description" class="biss-accordion-description">{{
              item.description
            }}</small></span
          ><BissIcon name="chev"
        /></AccordionTrigger>
      </AccordionHeader>
      <AccordionContent class="biss-accordion-content"
        ><div class="biss-accordion-body">
          <slot :name="item.value" :item="item"
            ><slot :item="item">{{ item.content }}</slot></slot
          >
        </div></AccordionContent
      >
    </AccordionItem>
  </AccordionRoot>
</template>

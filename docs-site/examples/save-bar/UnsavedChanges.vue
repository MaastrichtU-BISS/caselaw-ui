<script setup lang="ts">
import { computed, ref } from 'vue';
import { BissField, BissInput, BissSaveBar } from 'biss-ui/vue';

const loaded = { title: 'Digital Legal Studies', acronym: 'DLS' }; // From your API.
const saved = ref(loaded);
const draft = ref({ ...loaded });
const saving = ref(false);

const dirty = computed(
  () => draft.value.title !== saved.value.title || draft.value.acronym !== saved.value.acronym,
);

async function save() {
  saving.value = true;
  await new Promise((resolve) => setTimeout(resolve, 900)); // Your request goes here.
  saved.value = { ...draft.value };
  saving.value = false;
}

function discard() {
  draft.value = { ...saved.value };
}
</script>

<template>
  <div class="biss-stack" style="width: min(100%, 30rem)">
    <BissField label="Project title">
      <BissInput v-model="draft.title" />
    </BissField>
    <BissField label="Acronym" hint="Shown in reports and the project list.">
      <BissInput v-model="draft.acronym" />
    </BissField>
    <BissSaveBar
      :show="dirty"
      :saving="saving"
      save-label="Save project"
      @save="save"
      @discard="discard"
    />
  </div>
</template>

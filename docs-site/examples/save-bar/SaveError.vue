<script setup lang="ts">
import { ref } from 'vue';
import { BissField, BissInput, BissSaveBar } from 'biss-ui/vue';

const CEILING = 250_000;
const saved = ref(180_000);
const budget = ref<string | number | null>(275_000);
const saving = ref(false);
const error = ref('');

async function save() {
  saving.value = true;
  error.value = '';
  await new Promise((resolve) => setTimeout(resolve, 900)); // Your request goes here.
  if (Number(budget.value) > CEILING) {
    error.value = 'Not saved: the budget is above the €250,000 grant ceiling.';
  } else {
    saved.value = Number(budget.value);
  }
  saving.value = false;
}

function discard() {
  budget.value = saved.value;
  error.value = '';
}
</script>

<template>
  <div class="biss-stack" style="width: min(100%, 30rem)">
    <BissField label="Total budget (€)" hint="Personnel, equipment and travel for WP2.">
      <BissInput v-model="budget" type="number" min="0" step="1000" />
    </BissField>
    <BissSaveBar
      :show="Number(budget) !== saved"
      :saving="saving"
      :error="error"
      @save="save"
      @discard="discard"
    />
  </div>
</template>

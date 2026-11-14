<script setup lang="ts">
import { BissCallout } from 'biss-ui/vue';
</script>

<template>
  <div class="biss-stack biss-stack-sm" style="width: min(100%, 520px)">
    <BissCallout tone="success" title="Data management plan approved">
      The data steward signed off on 4 November. You can start collecting data.
    </BissCallout>
    <BissCallout tone="warning" title="Consent forms expire soon">
      Twelve participants signed the 2024 consent form, which expires on 31 December.
    </BissCallout>
    <BissCallout tone="danger" title="Budget upload failed">
      The spreadsheet has no personnel costs column. Add it and upload the file again.
    </BissCallout>
  </div>
</template>

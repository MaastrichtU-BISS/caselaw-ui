<script setup lang="ts">
import { BissRingGauge } from 'biss-ui/vue';
</script>

<template>
  <BissRingGauge
    label="Grant success rate"
    :value="14"
    :max="23"
    :target="11.5"
    caption="14 of 23 decided since 2022"
    tone="success"
  />
  <BissRingGauge
    label="Travel budget used"
    :value="5600"
    :max="5000"
    caption="€5,600 of €5,000"
    tone="danger"
  />
  <BissRingGauge
    label="Open access share"
    :value="0.71"
    caption="Publications this year"
  />
  <BissRingGauge label="Survey response" :value="null" caption="Fieldwork starts in March" tone="neutral" />
</template>

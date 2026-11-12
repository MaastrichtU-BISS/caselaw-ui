<script setup lang="ts">
import {onMounted,onBeforeUnmount,ref} from 'vue';
import {mount,unmount} from 'svelte';
import ActionCard from '../src/svelte/BissActionCard.svelte';
const root=ref<HTMLElement>();let instance:ReturnType<typeof mount>|undefined;
onMounted(()=>{if(root.value)instance=mount(ActionCard,{target:root.value,props:{href:'#',title:'Research projects',copy:'Explore your team’s ongoing work.'}});});
onBeforeUnmount(()=>{if(instance)void unmount(instance);});
</script>
<template><div ref="root"/></template>

<script setup lang="ts">
import Expanded from "./Expanded.vue";
import {ref} from 'vue';
import {BissPageBar,BissViewTabs,BissToolbar,BissButton,BissAvatar,BissGoalBar,BissSettingsHead,BissAlertLine,BissSaveBar,BissHomeSkel,BissChartLegend,BissNoticeRow,BissSummaryStrip,BissTablePager,BissIcon,BissDataTable,BissEmptyState,BissInput} from '../../src/vue';
const tab=ref('all'), page=ref(1), dirty=ref(true), saved=ref(false), read=ref(false), query=ref('');
</script>
<template>
<main>
<BissPageBar title="Research workspace" description="Bizzy’s interface, ready for your product." meta="Component workbench"><template #actions><BissAvatar name="Ada Lovelace"/><BissButton @click="dirty=true">New project</BissButton></template><template #tabs><BissViewTabs v-model="tab" label="Project views" :items="[{key:'all',label:'All projects',count:12},{key:'mine',label:'My projects',count:0},{key:'archived',label:'Archived',disabled:true}]"/></template></BissPageBar>
<BissToolbar label="Project tools"><BissButton variant="secondary"><BissIcon name="filter"/> Filter</BissButton><span>View: {{tab}}</span><template #end><BissInput v-model="query" placeholder="Search projects" aria-label="Search projects"/></template></BissToolbar>
<BissSummaryStrip label="Project summary" :items="[{label:'Active projects',value:'12',sub:'Across three teams',color:'#005CA9'},{label:'On track',value:'8',sub:'Four need attention',color:'#0F7A4E'},{label:'Funding secured',value:'€240k',sub:'This year'}]"/>
<section><BissSettingsHead title="Team capacity" help="A shared track, with a marker for the expected progress." more="Progress values and markers accept fractions."/><div class="people"><BissAvatar name="Ada Lovelace"/><span>Ada Lovelace</span><BissGoalBar :value=".62" :expected=".75" label="Ada capacity: 62 percent" tone="success"/></div><BissChartLegend label="Capacity legend" :items="[{label:'Allocated',color:'#0F7A4E'},{label:'Expected',color:'#1D1C1A',dashed:true}]"/></section>
<BissAlertLine tone="warning">Four projects need a funding review.<template #actions><BissButton variant="ghost" @click="tab='mine'">Review projects</BissButton></template></BissAlertLine>
<BissDataTable :columns="[{key:'name',label:'Project'},{key:'team',label:'Team'},{key:'status',label:'Status'}]" :rows="[{name:'Open justice',team:'Legal research',status:'On track'},{name:'Public access',team:'Data science',status:'Review funding'}]"/>
<BissTablePager v-model:page="page" :total="72" :page-size="25"/>
<section><BissSettingsHead title="Activity" help="The host application handles navigation and read state."/><BissNoticeRow title="Ada mentioned you" detail="in Open justice" meta="Research · 5 minutes ago" :unread="!read" @click="read=true"><template #icon><BissIcon name="at"/></template></BissNoticeRow></section>
<div class="states"><section><BissSettingsHead title="Empty"/><BissEmptyState title="No archived projects" copy="Completed projects appear here."/></section><section><BissSettingsHead title="Loading"/><BissHomeSkel label="Loading projects" :rows="3"/></section></div>
<BissSaveBar :show="dirty" @save="dirty=false;saved=true" @discard="dirty=false"/><p v-if="saved" role="status">Changes saved</p>
<BissSaveBar show error="Could not save. Check your connection and try again." save-label="Retry" @save="saved=true" @discard="saved=false"/>
<Expanded/></main>
</template>
<style>
body{margin:0;background:var(--biss-bg);color:var(--biss-text);font:14px/1.55 var(--biss-font-family)}main{max-width:1080px;margin:32px auto;padding:24px;background:var(--biss-card);border:1px solid var(--biss-border);border-radius:12px}section{margin:24px 0}.people{display:flex;align-items:center;gap:12px;margin-top:20px}.people .biss-goal-bar{flex:1}.states{display:grid;grid-template-columns:1fr 1fr;gap:24px}.biss-savebar{margin-top:16px}@media(max-width:640px){main{margin:0;padding:20px;border:0;border-radius:0}.states{grid-template-columns:1fr}.people{flex-wrap:wrap}.people .biss-goal-bar{min-width:120px}}
</style>

<script lang="ts">
import Expanded from "./Expanded.svelte";
import {BissPageBar,BissViewTabs,BissToolbar,BissButton,BissAvatar,BissGoalBar,BissSettingsHead,BissAlertLine,BissSaveBar,BissHomeSkel,BissChartLegend,BissNoticeRow,BissSummaryStrip,BissTablePager,BissIcon} from '../../src/svelte';
let tab='all',page=1,dirty=true,saved=false,read=false;
</script>
<main>
<BissPageBar title="Research workspace" description="Bizzy’s interface, ready for your product."><div slot="actions"><BissAvatar name="Ada Lovelace"/><BissButton on:click={()=>dirty=true}>New project</BissButton></div><div slot="tabs"><BissViewTabs bind:value={tab} label="Project views" items={[{key:'all',label:'All projects',count:12},{key:'mine',label:'My projects',count:0},{key:'archived',label:'Archived',disabled:true}]}/></div></BissPageBar>
<BissToolbar label="Project tools"><BissButton variant="secondary"><BissIcon name="filter"/> Filter</BissButton><span>View: {tab}</span></BissToolbar>
<BissSummaryStrip label="Project summary" items={[{label:'Active projects',value:'12',sub:'Across three teams',color:'#005CA9'},{label:'On track',value:'8',sub:'Four need attention',color:'#0F7A4E'}]}/>
<section><BissSettingsHead title="Team capacity" help="Expected progress is marked on the track." more="Values use fractions."/><BissGoalBar value={.62} expected={.75} label="Ada capacity: 62 percent" tone="success"/><BissChartLegend label="Capacity legend" items={[{label:'Allocated',color:'#0F7A4E'}]}/></section>
<BissAlertLine tone="warning">Four projects need a funding review.</BissAlertLine>
<BissTablePager bind:page total={72}/>
<BissNoticeRow title="Ada mentioned you" detail="in Open justice" meta="5 minutes ago" unread={!read} on:click={()=>read=true}><span slot="icon"><BissIcon name="at"/></span></BissNoticeRow>
<section><BissSettingsHead title="Loading"/><BissHomeSkel rows={3}/></section>
<BissSaveBar show={dirty} on:save={()=>{dirty=false;saved=true;}} on:discard={()=>dirty=false}/>
{#if saved}<p role="status">Changes saved</p>{/if}
<BissSaveBar show error="Could not save. Try again." saveLabel="Retry"/>
<Expanded/></main>
<style> :global(body){margin:0;background:var(--biss-bg);font:14px/1.55 var(--biss-font-family)}main{max-width:1080px;margin:32px auto;padding:24px;background:var(--biss-card)}section{margin:24px 0} @media(max-width:640px){main{margin:0;padding:20px}}</style>

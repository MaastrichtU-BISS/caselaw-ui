<script setup lang="ts">
import {computed,defineComponent,h,onMounted,ref,watch,type Component} from 'vue';
import ActionCardBridge from './ActionCardBridge.vue';
import * as UI from '../src/vue';
import {fixture} from './fixtures';
const props=withDefaults(defineProps<{name:string;state?:string}>(),{state:'default'});
const data=ref(fixture(props.name,props.state));
const message=ref('');
watch(()=>[props.name,props.state],()=>{data.value=fixture(props.name,props.state);message.value='';});
const H=(name:string,p:Record<string,unknown>={},children?:unknown)=>h((UI as Record<string,unknown>)[name] as Component,p,children as never);
const content=()=>H('BissInput',{modelValue:'Open justice','aria-label':'Project name'});
const table=()=>H('BissDataTable',fixture('BissDataTable').props);
const Demo=defineComponent({setup(){return()=>{
 const name=props.name;
 if(name==='BissActionCard')return h(ActionCardBridge);
 const f=data.value;
 const state=f.props;
 const callbacks={onChange:(v:unknown)=>{if(['BissValuePicker','BissOnboardingChips'].includes(name))state.selected=v;else if(name==='BissChecklist'){const item=v as {key:string;done:boolean};state.items=(state.items as {key:string;done:boolean}[]).map(i=>i.key===item.key?{...i,done:item.done}:i);}else state.value=v;message.value='Updated';},'onUpdate:modelValue':(v:unknown)=>{state.modelValue=v;},onNegate:(v:boolean)=>{state.negate=v;},'onUpdate:page':(v:number)=>{state.page=v;},onClick:()=>{message.value='Action selected';},onPick:()=>{message.value='Selected';},onClose:()=>{if('open'in state)state.open=false;else state.modelValue=false;},onSave:()=>message.value='Changes saved',onDiscard:()=>message.value='Changes discarded',onAdd:()=>message.value='Added',onClear:()=>{state.count=0;},onSort:(v:unknown)=>{state.sort=v;},onToggle:(v:unknown)=>{state.collapsed=v;},onRange:(v:unknown)=>Object.assign(state,v),onMove:(v:{id:string;lane:string})=>{state.cards=(state.cards as {id:string;lane:string}[]).map(c=>c.id===v.id?{...c,lane:v.lane}:c);}};
 const slots:Record<string,(...args:any[])=>unknown>={};
 if(f.text)slots.default=()=>f.text;
 if(['BissDialog','BissModal','BissSidePanel','BissConfirmDialog'].includes(name)&&name!=='BissConfirmDialog'){slots.default=()=>[h('label',{},['Project name',content()]),h('p',{class:'preview-note'},'Keep the name clear and recognizable.')];slots[name==='BissModal'?'footer':'actions']=()=>H('BissButton',{onClick:callbacks.onClose},()=> 'Done');}
 if(name==='BissHomeCard')slots.default=()=>H('BissCapacityBar',{allocated:.6,available:.8,label:'Team capacity'});
 if(name==='BissOnboardingFrame')slots.default=()=>H('BissOnboardingChips',fixture('BissOnboardingChips').props);
 if(name==='BissNavSection')slots.default=()=>[H('BissNavItem',{label:'Projects',active:true,href:'#'}),H('BissNavItem',{label:'People',href:'#'})];
 if(name==='BissSteps'||name==='BissStep'){const steps=()=>[H('BissStep',{index:1,title:'Name the workspace',done:true}),H('BissStep',{index:2,title:'Invite the team',current:true}),H('BissStep',{index:3,title:'Start a project'})];if(name==='BissStep')return H('BissSteps',{},()=>H(name,state));slots.default=steps;}
 if(name==='BissField')slots.default=({id,invalid})=>H('BissInput',{id,invalid,placeholder:'Project name','aria-label':'Project name'});
 if(name==='BissTableHead')return h('table',{class:'preview-table'},[h('thead',[h('tr',[h('th',{'aria-sort':'ascending'},[H(name,{...state,...callbacks})])])]),h('tbody',[h('tr',[h('td','Open justice')])])]);
 if(name==='BissTableGroup')slots.default=table;
 if(name==='BissToolbar')slots.default=()=>[H('BissToolNew',{label:'New project'}),H('BissToolButton',{label:'Filter',icon:'filter'}),H('BissToolSearch',{label:'Find records',value:'research'})];
 if(['BissPageBar','BissPageHeader','BissConsoleHeader'].includes(name))slots.actions=()=>H('BissButton',{},()=> 'New project');
 if(['BissAppShell','BissConsoleLayout','BissGridShell'].includes(name)){
  slots.default=()=>h('div',{style:'padding:24px'},[H('BissPageBar',{title:'Research projects',description:'The team’s ongoing work.'}),h('div',{style:'margin-top:24px'},[table()])]);
  slots.nav=slots.sidebar=()=>H('BissNavSection',{heading:'Workspace'},()=>[H('BissNavItem',{label:'Projects',active:true,href:'#'}),H('BissNavItem',{label:'People',href:'#'})]);
 }
 return H(name,{...state,...callbacks},slots);
};}});
onMounted(()=>{
 if(props.name==='BissToastStack')UI.useBissToasts().success('Changes saved','Your team sees the latest version.');
});
</script>
<template><div class="preview-frame" :class="{'preview-wide':data.wide,'preview-shell':['BissAppShell','BissConsoleLayout','BissGridShell'].includes(name)}" :data-component="name"><Demo/><p v-if="message" class="preview-feedback" role="status">{{message}}</p></div></template>
<style>
.preview-frame{padding:32px;min-height:240px;box-sizing:border-box;background:var(--biss-card);color:var(--biss-text);font:14px/1.55 var(--biss-font-family);display:flex;flex-direction:column;justify-content:center;align-items:center;gap:16px;max-width:100%;overflow-x:auto}.preview-frame>*{max-width:100%}.preview-frame:not(.preview-wide)>:first-child{max-width:min(100%,520px)}.preview-frame .biss-date-picker{width:280px}.preview-frame .biss-home-card,.preview-frame .biss-property-list,.preview-frame .biss-value-picker,.preview-frame .biss-goal-card,.preview-frame .biss-table-group{width:min(100%,520px)}.preview-frame:not(.preview-wide)>.biss-avatar,.preview-frame:not(.preview-wide)>.biss-icon,.preview-frame:not(.preview-wide)>.biss-mini-chart{width:auto}.preview-frame .biss-goal-bar{width:100%}.preview-shell{padding:0;min-height:640px;display:block}.preview-shell>*{width:100%;max-width:none}.preview-note{font-size:13px;color:var(--biss-muted);margin:12px 0 0}.preview-feedback{font-size:13px;color:var(--biss-success);margin:12px 0 0}.preview-table{width:100%;border-collapse:collapse;text-align:start}.preview-table th,.preview-table td{padding:12px;border-bottom:1px solid var(--biss-border)}@media(max-width:640px){.preview-frame{padding:24px 16px}.preview-shell{padding:0}}
</style>

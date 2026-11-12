import {createApp,nextTick} from 'vue';
import ComponentPreview from './ComponentPreview.vue';
import '../src/styles/index.css';
const params=new URLSearchParams(location.search),name=params.get('component')??'BissButton',state=params.get('state')??'default';
createApp(ComponentPreview,{name,state}).mount('#app');
await nextTick();
if(['BissMenu','BissPopover','BissSelectPicker','BissSwatchPicker','BissDateField'].includes(name)&&['open','filtered'].includes(state)){
 document.querySelector<HTMLButtonElement>('.biss-picker-trigger')?.click();await nextTick();
 if(state==='filtered'){const input=document.querySelector<HTMLInputElement>('.biss-floating input');if(input){input.value='export';input.dispatchEvent(new Event('input',{bubbles:true}));}}
}
if(name==='BissPageHint')document.querySelector('details')?.setAttribute('open','');
if(name==='BissEditableText'&&state==='editing')document.querySelector<HTMLButtonElement>('.biss-editable button')?.click();
await nextTick();
document.documentElement.dataset.ready='true';

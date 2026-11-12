import { createApp, nextTick } from 'vue';
import ComponentPreview from './ComponentPreview.vue';
import {dialogExamples} from './examples/dialog/manifest';
import '../src/styles/index.css';
const params = new URLSearchParams(location.search),
  name = params.get('component') ?? 'BissButton',
  state = params.get('state') ?? 'default';
document.documentElement.dataset.bissDensity = params.get('density') ?? 'standard';
const example=dialogExamples.find(item=>item.id===params.get('example'));
if(example){
 const isSvelte=params.get('framework')==='svelte';
 const modules=isSvelte?import.meta.glob('./examples/dialog/*.svelte'):import.meta.glob('./examples/dialog/*.vue');
 const loader=modules['./examples/dialog/'+example.file+(isSvelte?'.svelte':'.vue')];
 const component=(await loader!()) as {default:any};
 const frame=document.createElement('div');frame.className='preview-frame dialog-example-frame';frame.dataset.example=example.id;frame.dataset.component='BissDialog';frame.dataset.framework=isSvelte?'svelte':'vue';document.querySelector('#app')!.append(frame);
 if(isSvelte){const {mount,tick}=await import('svelte');mount(component.default,{target:frame});await tick();}
 else{createApp(component.default).mount(frame);await nextTick();}
}else if (params.get('framework') === 'svelte') {
  const [{ mount, tick }, { default: SveltePreview }] = await Promise.all([
    import('svelte'),
    import('./SveltePreview.svelte'),
  ]);
  mount(SveltePreview, { target: document.querySelector('#app')!, props: { name, state } });
  await tick();
} else {
  createApp(ComponentPreview, { name, state }).mount('#app');
  await nextTick();
}
if (
  [
    'BissMenu',
    'BissPopover',
    'BissSelectPicker',
    'BissSwatchPicker',
    'BissDateField',
    'BissFigureHelp',
  ].includes(name) &&
  ['open', 'filtered'].includes(state)
) {
  document.querySelector<HTMLButtonElement>('.biss-picker-trigger')?.click();
  await nextTick();
  if (state === 'filtered') {
    const input = document.querySelector<HTMLInputElement>('.biss-floating input');
    if (input) {
      input.value = 'export';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
if (name === 'BissTooltip' && state === 'open') {
  document.querySelector<HTMLElement>('.biss-tooltip>button')?.focus();
}
if (name === 'BissPageHint') document.querySelector('details')?.setAttribute('open', '');
if (name === 'BissEditableText' && state === 'editing')
  document.querySelector<HTMLButtonElement>('.biss-editable button')?.click();
await nextTick();
document.documentElement.dataset.ready = 'true';

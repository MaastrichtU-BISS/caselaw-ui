/** Markdown and the website share the same extracted contracts. */
import {readFileSync,writeFileSync} from 'node:fs';
const {components}=JSON.parse(readFileSync('docs-site/generated/components.json','utf8'));
const inline=value=>'`'+String(value??'').replace(/\s+/g,' ').replace(/`/g,'′').replace(/\|/g,'\\|')+'`';
let text='# Component API reference\n\nAll '+components.length+' components are available in Vue and Svelte with one Bizzy design language. This file is generated from the same source-derived contracts as the documentation site. Import components and their `BissNameProps` types from the matching framework entry point. Native attributes supported by the framework also apply; tables list authored component props.\n\n';
for(const c of components){
 text+=`## ${c.name}\n\n${c.description}\n\n[Vue source](../src/vue/${c.name}.vue) · [Svelte source](../src/svelte/${c.name}.svelte)\n\n`;
 for(const framework of ['vue','svelte']){
  const api=c[framework];text+=`### ${framework==='vue'?'Vue':'Svelte'}\n\n`;
  if(api.props.length){text+='| Prop | Type | Required | Default |\n|---|---|---|---|\n';for(const p of api.props)text+=`| ${inline(p.name)} | ${inline(p.type)} | ${p.required&&p.default===undefined?'Yes':'No'} | ${p.default===undefined?'—':inline(p.default)} |\n`;text+='\n';}
  if(api.events.length){text+=(framework==='vue'?'Events':'Callbacks')+':\n\n';for(const e of api.events)text+=`- ${inline(e.name)}: ${inline(e.type)}\n`;text+='\n';}
  if(api.slots.length)text+=(framework==='vue'?'Slots':'Snippets')+': '+api.slots.map(inline).join(', ')+'.\n\n';
 }
}
writeFileSync('docs/api.md',text.trimEnd()+'\n');

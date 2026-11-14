/** Exercise the actual tarball in an isolated consumer, including server rendering. */
import assert from 'node:assert/strict';
import ts from 'typescript';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, symlink, writeFile, rm, readdir, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { createServer, build } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fixtures } from '../docs-site/fixtures';
const root = process.cwd(),
  consumer = await mkdtemp(join(tmpdir(), 'biss-consumer-'));
let server: Awaited<ReturnType<typeof createServer>> | undefined;
let archive = '';
try {
  const packed = JSON.parse(
    execFileSync('npm', ['pack', '--ignore-scripts', '--json'], { encoding: 'utf8' }),
  );
  archive = resolve(packed[0].filename);
  await mkdir(join(consumer, 'node_modules/biss-ui'), { recursive: true });
  execFileSync('tar', [
    '-xzf',
    archive,
    '--strip-components=1',
    '-C',
    join(consumer, 'node_modules/biss-ui'),
  ]);
  for (const dependency of ['vue', 'svelte', '@vue','reka-ui','bits-ui','vue-component-type-helpers'])
    await symlink(
      join(root, 'node_modules', dependency),
      join(consumer, 'node_modules', dependency),
      'dir',
    );
  await writeFile(join(consumer, 'package.json'), JSON.stringify({ type: 'module' }));
  const packaged = join(consumer, 'node_modules/biss-ui');
  const core = await import(pathToFileURL(join(packaged, 'dist/index.js')).href);
  assert.equal(core.bissCssTokens['--biss-primary'], '#005CA9');
  const vue = await import(pathToFileURL(join(packaged, 'dist/vue/index.js')).href);
  const names = Object.keys(vue).filter((n) => n.startsWith('Biss') && fixtures[n.slice(4)]);
  assert.equal(names.length, 140);
  for (const name of names) {
    const props = structuredClone(fixtures[name.slice(4)]!.props);
    const html = await renderToString(createSSRApp({ render: () => h(vue[name], props) }));
    assert.ok(html.length > 0, `${name} renders on the server`);
  }
  await writeFile(join(consumer,'consumer.ts'),`
import type {BissButtonProps as VueButtonProps,BissDataGridProps as VueGridProps} from 'biss-ui/vue';
import type {BissButtonProps as SvelteButtonProps,BissDataGridProps as SvelteGridProps} from 'biss-ui/svelte';
import {createBissToasts} from 'biss-ui';
import type {RootProps as VueDialogRootProps,ContentProps as VueDialogContentProps} from 'biss-ui/vue/dialog';
import type {RootProps as SvelteDialogRootProps,ContentProps as SvelteDialogContentProps} from 'biss-ui/svelte/dialog';
const vueDialog:VueDialogRootProps={open:true};
const svelteDialog:SvelteDialogRootProps={open:false};
const vueDialogContent:VueDialogContentProps={size:'lg'};
const svelteDialogContent:SvelteDialogContentProps={size:'sm'};
// @ts-expect-error Reject invalid compound state.
const badVueDialog:VueDialogRootProps={open:'bad'};
// @ts-expect-error Reject invalid compound width variants.
const badSvelteContent:SvelteDialogContentProps={size:'huge'};
import type {RootProps as VueTabsRootProps,ListProps as VueTabsListProps} from 'biss-ui/vue/tabs';
import type {RootProps as SvelteTabsRootProps,ListProps as SvelteTabsListProps} from 'biss-ui/svelte/tabs';
const vueTabs:VueTabsRootProps={modelValue:'overview',activationMode:'manual'};
const svelteTabs:SvelteTabsRootProps={value:'overview'};
const vueTabsList:VueTabsListProps={variant:'segmented',size:'sm'};
const svelteTabsList:SvelteTabsListProps={variant:'line'};
// @ts-expect-error Reject unknown tab list variants.
const badTabsList:VueTabsListProps={variant:'pill'};
import {paginationRange} from 'biss-ui/core';
paginationRange(5,10);
import type {BissColumn} from 'biss-ui/core';
const button:VueButtonProps={variant:'primary',disabled:true};
const other:SvelteButtonProps={onclick:()=>{},disabled:true};
const columns:BissColumn[]=[{key:'name',label:'Name',visible:true}];
const grid:VueGridProps={rows:[],columns,label:'Records'};
const svelteGrid:SvelteGridProps={rows:[],columns,label:'Records',onselect:(ids:string[])=>{}};
// @ts-expect-error Reject unsupported variants in installed Vue declarations.
const badVue:VueButtonProps={variant:'unsupported'};
// @ts-expect-error Reject unsupported variants in installed Svelte declarations.
const badSvelte:SvelteButtonProps={variant:'unsupported'};
createBissToasts().push('Saved');
`);
  const program=ts.createProgram([join(consumer,'consumer.ts')],{strict:true,noEmit:true,target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,moduleResolution:ts.ModuleResolutionKind.Bundler,types:[],skipLibCheck:true});
  const diagnostics=ts.getPreEmitDiagnostics(program);
  assert.equal(diagnostics.length,0,ts.formatDiagnosticsWithColorAndContext(diagnostics,{getCurrentDirectory:()=>consumer,getCanonicalFileName:f=>f,getNewLine:()=> '\n'}));
  // A real consumer entry builds without a Vue compiler plugin.
  await writeFile(
    join(consumer, 'vue-entry.js'),
    "import {BissButton} from 'biss-ui/vue'; export {BissButton};",
  );
  await build({
    configFile: false,
    root: consumer,
    logLevel: 'error',
    build: {
      outDir: 'output',
      lib: { entry: join(consumer, 'vue-entry.js'), formats: ['es'] },
      rollupOptions: { external: ['vue'] },
    },
  });
  await writeFile(
    join(consumer, 'svelte-entry.js'),
    "export * from 'biss-ui/svelte'; export {render} from 'svelte/server';",
  );
  server = await createServer({
    configFile: false,
    root: consumer,
    logLevel: 'error',
    plugins: [svelte()],
    ssr: { noExternal: ['biss-ui','bits-ui','svelte-toolbelt','runed'] },
    server: { middlewareMode: true, fs: { allow: [consumer, root] } },
  });
  const sv = await server.ssrLoadModule('/svelte-entry.js');
  for (const name of names) {
    const props = structuredClone(fixtures[name.slice(4)]!.props);
    if ('modelValue' in props) {
      props.open = props.modelValue;
      props.value = props.modelValue;
    }
    const result = sv.render(sv[name], { props });
    assert.ok(result.body.length > 0, `${name} Svelte SSR`);
  }
  const localized:Record<string,{props:Record<string,unknown>;expected:string[]}>={
    BissDataGrid:{props:{selectedLabel:'{count} gekozen',rowLabel:'Kies {id}',resizeLabel:'Breedte {label}'},expected:['0 gekozen','Kies open','Breedte Project']},
    BissSharePanel:{props:{roleLabel:'Uitnodigingsrol',linkLabel:'Deel link',copyLabel:'Kopieer',accessLabels:{label:'Toegang',roleLabel:'Rol {name}',removeLabel:'Verwijder'}},expected:['Uitnodigingsrol','Toegang','Kopieer','Rol Grace Hopper']},
    BissCommentThread:{props:{composerLabel:'Schrijf een reactie',submitLabel:'Plaatsen'},expected:['Schrijf een reactie','Plaatsen']},
    BissCopyField:{props:{copyLabel:'Kopieer'},expected:['Kopieer']}
  };
  for(const [name,test] of Object.entries(localized)){
    const props={...structuredClone(fixtures[name.slice(4)]!.props),...test.props};
    const html=await renderToString(createSSRApp({render:()=>h(vue[name],props)}));
    const rendered=sv.render(sv[name],{props}).body;
    for(const text of test.expected){assert.ok(html.includes(text),name+' Vue translates '+text);assert.ok(rendered.includes(text),name+' Svelte translates '+text);}
  }
  // Request-local services must not share notifications during SSR.
  const outputs = [];
  for (const title of ['Request A', 'Request B']) {
    const app = createSSRApp({
      setup() {
        const toast = vue.useBissToasts();
        toast.success(title);
        return () => h('p', toast.toasts.value.map((t: { title: string }) => t.title).join(','));
      },
    });
    app.use(vue.createBissUI());
    outputs.push(await renderToString(app));
  }
  assert.deepEqual(outputs, ['<p>Request A</p>', '<p>Request B</p>']);
  console.log(
    'Tarball consumer passed: 140 Vue and 140 Svelte SSR renders, installed TypeScript contracts, Vue without SFC plugin, localized composites and isolated request state.',
  );
} finally {
  await server?.close();
  await rm(consumer, { recursive: true, force: true });
  if (archive) await rm(archive, { force: true });
}

<script lang="ts">
  import * as UI from '../../src/svelte';
  import { newFixtures } from '../../docs-site/new-fixtures';
  let states = $state<Record<string, any>>(
    Object.fromEntries(
      Object.entries(newFixtures).map(([key, f]) => [key, structuredClone(f.props)]),
    ),
  );
  let message = $state('');
  function change(name: string, value: unknown) {
    const key = ['LabelEditor', 'Agenda', 'WidgetGrid'].includes(name)
      ? 'items'
      : name === 'ColumnManager'
        ? 'columns'
        : name === 'FilterBuilder'
          ? 'rules'
          : name === 'Checkbox'
            ? 'checked'
            : name === 'RoleEditor'
              ? 'selected'
              : 'value';
    states[name][key] = value;
  }
</script>

<div class="library-examples">
  {#each Object.entries(states) as [name, props] (name)}{@const C = (UI as Record<string, any>)[
      'Biss' + name
    ]}
    <article data-library={name}>
      <h2>{name}</h2>
      <div class="library-preview">
        <C
          {...props}
          onchange={(v: unknown) => change(name, v)}
          oncolumns={(v: unknown) => (states[name].columns = v)}
          onselect={(v: unknown) => (states[name].selected = v)}
          onsort={(v: { key: string; direction: string }) => {
            states[name].sortKey = v.key;
            states[name].sortDirection = v.direction;
          }}
          onresize={(v: number) => (states[name].size = v)}
          onmatch={(v: string) => (states[name].match = v)}
          onrole={(v:{id:string;role:string})=>states[name].entries=states[name].entries.map((i:any)=>i.id===v.id?{...i,role:v.role}:i)}
            onremove={(id:string)=>{const key=name==='AttachmentList'?'items':'entries';states[name][key]=states[name][key].filter((i:any)=>i.id!==id);}}
            onresolve={(v:boolean)=>states[name].resolved=v}
            oncomment={(body:string)=>states[name].items=[...states[name].items,{id:'reply-'+Date.now(),author:'You',body,time:'Just now'}]}
            oninvite={() => (message = 'Invitation requested')}
          onsubmit={() => (message = 'Comment submitted')}
          onapprove={() => (message = 'Change requested')}
          oncomplete={(v: { id: string; done: boolean }) =>
            (states[name].items = states[name].items.map((i: any) =>
              i.id === v.id ? { ...i, done: v.done } : i,
            ))}
        >
          {#snippet children()}<p>
              {newFixtures[name]?.text ?? 'Connect your application’s data here.'}
            </p>{/snippet}
          {#snippet start()}<p>Project navigation</p>{/snippet}{#snippet end()}<p>
              Your project content
            </p>{/snippet}
        </C>
      </div>
    </article>{/each}{#if message}<p role="status">{message}</p>{/if}
</div>

<style>
  .library-examples {
    display: grid;
    gap: 24px;
  }
  article {
    min-width: 0;
    border-top: 1px solid var(--biss-border);
    padding-top: 20px;
  }
  h2 {
    font-size: 15px;
    font-weight: 600;
  }
  .library-preview {
    position: relative;
    padding: 24px;
    min-height: 120px;
    max-width: 100%;
    overflow-x: auto;
  }
</style>

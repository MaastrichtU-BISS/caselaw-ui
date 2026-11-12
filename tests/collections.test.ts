import {test} from 'node:test';
import assert from 'node:assert/strict';
import {moveItem,validateLabel,matchesFilters,sortRows,safeLink} from '../src/core/collections';
import {createBissToasts} from '../src/core/toasts';
test('editing and reordering preserve caller state and reject invalid labels',()=>{
 const labels=[{id:'a',label:'Research',color:'blue'},{id:'b',label:'Review',color:'green'}];
 assert.deepEqual(moveItem(labels,0,1).map(i=>i.id),['b','a']);
 assert.deepEqual(moveItem(labels,0,-1),labels);
 assert.ok(validateLabel(labels,'a',' REVIEW ').error);
 assert.ok(validateLabel(labels,'a',' ').error);
 assert.equal(validateLabel(labels,'a',' Funding ').items?.[0]?.label,'Funding');
 assert.equal(labels[0]?.label,'Research');
});
test('filters combine rules, compare numbers and fail closed for unknown operators',()=>{
 const row={name:'Open Justice',funding:12};
 const rules=[{id:'a',field:'name',operator:'contains',value:'justice'},{id:'b',field:'funding',operator:'gt',value:'10'}];
 assert.equal(matchesFilters(row,rules,'all'),true);
 assert.equal(matchesFilters(row,[...rules,{id:'c',field:'name',operator:'unknown',value:''}],'all'),false);
 assert.equal(matchesFilters(row,[{...rules[0]!,value:'missing'},rules[1]!],'any'),true);
 assert.equal(matchesFilters({funding:'oops'},[rules[1]!],'all'),false);
});
test('sorting retains missing values at the end and never mutates records',()=>{
 const rows=[{v:12},{v:2},{v:null},{v:4}];
 assert.deepEqual(sortRows(rows,'v','desc').map(r=>r.v),[12,4,2,null]);
 assert.deepEqual(rows.map(r=>r.v),[12,2,null,4]);
 for(const link of ['javascript:alert(1)','//evil.example','data:text/html,hello'])assert.equal(safeLink(link),undefined);
 assert.equal(safeLink('/projects'),' /projects'.trim());
});
test('toast queues isolate requests, unsubscribe and dispose without server timers',()=>{
 const a=createBissToasts(),b=createBissToasts();let first:string[]=[],second:string[]=[];
 const unsubscribe=a.subscribe(items=>first=items.map(i=>i.title));b.subscribe(items=>second=items.map(i=>i.title));
 a.push('Saved');assert.deepEqual(first,['Saved']);assert.deepEqual(second,[]);
 a.clear();assert.deepEqual(first,[]);unsubscribe();a.push('Later');assert.deepEqual(first,[]);
 a.destroy();b.destroy();
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getContainerInfo } from '../src/workzone-info.js';
const sample=JSON.parse(await readFile(new URL('../examples/workzone.json',import.meta.url),'utf8'));
test('all 48 diagram containers resolve to curated context',()=>{
  assert.equal(sample.length,48);
  for(const item of sample){const info=getContainerInfo(item);assert.ok(info.role,item.name);assert.ok(info.sources.length,item.name);for(const source of info.sources)assert.ok(source.url.startsWith('https://docs.workzone.kmd.net/2026_1/en-us/'));}
});
test('duplicate names resolve using image identity',()=>{
  const clients=sample.filter(x=>x.name==='client').map(getContainerInfo);
  assert.equal(clients[0].role,'Browser client');assert.match(clients[1].note,/Removed in 2025.1/);
  const office=sample.filter(x=>x.name==='office').map(getContainerInfo);
  assert.notEqual(office[0].role,office[1].role);
  const init=sample.filter(x=>x.name==='init').map(getContainerInfo);
  assert.equal(new Set(init.map(x=>x.role)).size,init.length);
});
test('unknown and custom containers do not acquire unsupported WorkZone identities',()=>{
  for(const item of [{name:'client',text:'My own client',group:'UI containers'},{name:'office',text:'workzone/unknown',group:'Other'},{name:'kmdtxtapi',text:'',group:'Custom'}]){
    const info=getContainerInfo(item);assert.equal(info.basis,'Inferred');assert.equal(info.sources.length,0);
  }
});
test('release changes and inferred roles remain explicit',()=>{
  assert.match(getContainerInfo(sample.find(x=>x.name==='oauth2')).note,/deprecated|deprecates/);
  assert.equal(getContainerInfo(sample.find(x=>x.name==='kmdtxtapi')).basis,'Inferred');
  assert.equal(getContainerInfo(sample.find(x=>x.name==='agentadw')).basis,'Inferred');
});

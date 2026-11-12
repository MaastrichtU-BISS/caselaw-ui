import {test} from 'node:test';
import assert from 'node:assert/strict';
import {avatarHue, initials, progressPercent} from '../src/portable';
test('avatar identity handles blank, multiword and unicode names deterministically',()=>{assert.equal(initials('  Ada  Lovelace '),'AL');assert.equal(initials(''),'');assert.equal(initials('Éva 王'),'É王');assert.equal(avatarHue('Ada'),avatarHue('Ada'));});
test('progress never leaks invalid widths for missing, unbounded or nonfinite values',()=>{for(const [v,result] of [[null,0],[-2,0],[2,100],[.65,65],[NaN,0],[Infinity,0]] as const) assert.equal(progressPercent(v),result);});

import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {parseAmount,validVolume,nextVolume,estimate,validMix,validAffected} from '../lib/estimator.ts';
test('currency parsing and bounds',()=>{
 assert.equal(parseAmount('$25,000'),25000);
 assert.equal(parseAmount(''),null);
 assert.equal(parseAmount('25oops'),null);
 assert.equal(validVolume(2500000),false);
 assert.equal(validMix(25),true);
 assert.equal(validMix(101),false);
 assert.equal(validAffected(0),true);
});
test('step sequence reverses across boundaries',()=>{
 assert.equal(nextVolume(40000,1),50000);
 assert.equal(nextVolume(50000,1),70000);
 assert.equal(nextVolume(70000,-1),50000);
 assert.equal(nextVolume(990000,1),1000000);
 assert.equal(nextVolume(1000000,-1),990000);
 assert.equal(nextVolume(10000,-1),10000);
});
test('scenario uses affected share and 70 basis points',()=>{
 assert.equal(estimate(100000,50,20).annual,840);
 assert.equal(estimate(100000,50,0).annual,0);
});

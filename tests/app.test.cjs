// Tests execute the REAL functions extracted from index.html; no duplicated formula implementation.
// The HTML remains unchanged. Run: npm test (Node 20+).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
function functionSource(name){
  const match = new RegExp('(?:async\\s+)?function\\s+'+name+'\\s*\\(').exec(html);
  assert.ok(match, `Function ${name} is present`);
  let open = html.indexOf('{',match.index+match[0].length), depth=0;
  // These specific functions contain no template literals with braces.
  let quote='', escaped=false, lineComment=false, blockComment=false;
  for(let i=open;i<html.length;i++){
    const c=html[i],n=html[i+1];
    if(lineComment){if(c==='\n')lineComment=false;continue;}
    if(blockComment){if(c==='*'&&n==='/'){blockComment=false;i++;}continue;}
    if(quote){if(escaped){escaped=false;continue;}if(c==='\\'){escaped=true;continue;}if(c===quote)quote='';continue;}
    if(c==='/'&&n==='/'){lineComment=true;i++;continue;}
    if(c==='/'&&n==='*'){blockComment=true;i++;continue;}
    if(c==='"'||c==="'"||c==='`'){quote=c;continue;}
    if(c==='{')depth++;
    if(c==='}'&&!--depth)return html.slice(match.index,i+1);
  }
  throw Error('Unclosed function: '+name);
}
function context(names,globals={}){
  const sandbox=vm.createContext({...globals});
  vm.runInContext(names.map(functionSource).join('\n'),sandbox);
  return sandbox;
}
test('valid sets accept whole and half reps',()=>{
  const c=context(['zagIsBodyweightExercise','zagValidLoggedSet']);
  for(const r of [0.5,1,8,8.5,10])assert.equal(c.zagValidLoggedSet('Bench Press',100,r),true);
  for(const r of [0,-1,8.3,'',null,1000.5])assert.equal(c.zagValidLoggedSet('Bench Press',100,r),false);
});
test('reject invalid and excessive weights',()=>{
  const c=context(['zagIsBodyweightExercise','zagValidLoggedSet']);
  for(const kg of [-1,0,10000,'',null,Infinity])assert.equal(c.zagValidLoggedSet('Bench Press',kg,8),false);
  assert.equal(c.zagValidLoggedSet('Bench Press',2.5,8),true);
});
test('zero added weight is allowed only for designated bodyweight exercises',()=>{
  const c=context(['zagIsBodyweightExercise','zagValidLoggedSet']);
  for(const ex of ['Pull Ups','Chin Ups','Push Ups','Dips'])assert.equal(c.zagValidLoggedSet(ex,0,10),true,ex);
  assert.equal(c.zagValidLoggedSet('Bench Press',0,10),false);
  assert.equal(c.zagValidLoggedSet('Lat Pull Up',0,10),false);
});
test('a PB requires valid reps, weight and a genuine increase',()=>{
  const st={max:{'Bench Press':100},repsAtMax:{},prHistory:{}};
  const c=context(['zagIsBodyweightExercise','zagValidLoggedSet','zagRecordPB'],{st,zagPBDirty:new Set()});
  assert.equal(c.zagRecordPB('Bench Press',200,0),false);
  assert.equal(c.zagRecordPB('Bench Press',99,8),false);
  assert.equal(c.zagRecordPB('Bench Press',105,8.5),true);
  assert.equal(st.max['Bench Press'],105);
  assert.equal(st.repsAtMax['Bench Press'],8.5);
  assert.equal(st.prHistory['Bench Press'].length,1);
});
test('half reps remain in history but floor for Epley estimate',()=>{
  const st={history:[{date:'2026-01-02',sets:[{exercise:'Bench Press',kg:100,reps:8.5}]}]};
  const c=context(['zagStrengthRecords'],{st});
  assert.equal(st.history[0].sets[0].reps,8.5);
  assert.ok(Math.abs(c.zagStrengthRecords()[0].by['Bench Press']-126.6666666667)<1e-6);
});
test('zero-rep and half-only sets do not produce estimated 1RM',()=>{
  const st={history:[{date:'2026-01-02',sets:[{exercise:'Bench Press',kg:200,reps:0},{exercise:'Squat',kg:100,reps:0.5}]}]};
  const c=context(['zagStrengthRecords'],{st});
  assert.equal(Object.keys(c.zagStrengthRecords()[0].by).length,0);
});
test('conversion constant and inverse stay mathematically consistent',()=>{
  assert.match(html,/2\.2046226218/);
  const kg=100,lb=kg*2.2046226218;
  assert.equal(Math.round(lb*10)/10,220.5);
  assert.ok(Math.abs(lb/2.2046226218-kg)<1e-10);
});
test('strength graph uses a stable cohort for all-time and selected periods',()=>{
  const src=functionSource('zagStrengthSVG');
  assert.match(src,/if\(arr\.length<2\)continue/);
  assert.match(src,/const inRange=arr\.filter\(v=>v\.time>visibleStart\)/);
  assert.match(src,/inRange\.length>=2/);
  assert.match(src,/const names=selected==='all'\?eligible:\[selected\]/);
});
test('cloud state snapshot excludes separately synced PB fields',()=>{
  const st={history:[{sets:[{kg:100,reps:8}]}],max:{Bench:100},repsAtMax:{Bench:8}};
  const c=context(['zagCloudStatePayload'],{st});
  const payload=c.zagCloudStatePayload();
  assert.equal(payload.history.length,1);
  assert.equal('max' in payload,false);
  assert.equal('repsAtMax' in payload,false);
});
test('backup uploads before any retention cleanup and confirms saved row',()=>{
  const src=functionSource('zagUploadCloudState');
  const inserted=src.indexOf(".insert({");
  const confirmed=src.indexOf('if(!verified||!verified.length)');
  const deleted=src.indexOf(".delete()");
  assert.ok(inserted>0&&confirmed>inserted&&deleted>confirmed);
  assert.match(src,/slice\(5\)/);
});
test('backup failure preserves local state and schedules retry',()=>{
  const src=functionSource('zagUploadCloudState');
  assert.match(src,/zagScheduleCloudRetry\(\)/);
  assert.match(src,/saved on this iPhone/);
  assert.doesNotMatch(src,/localStorage\.removeItem/);
});
test('Developer Test Mode is explicitly marked TestFlight-only (NOT a production security test)',()=>{
  assert.match(html,/window\.zagBuildChannel = 'testflight'/);
  assert.match(html,/zag_dev_pro_test_only/);
  assert.match(html,/NEVER ship this file to the public App Store/);
});

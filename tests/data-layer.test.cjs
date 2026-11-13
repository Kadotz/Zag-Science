// Data layer v4: exercise-name merging, per-position weeks and temporary swaps.
// Runs the REAL code block from index.html in a sandbox. Run: npm test
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const html = fs.readFileSync(require('node:path').join(__dirname, '../index.html'), 'utf8');
const START = '// ===== ZAG data layer v4', END = '// ===== end of ZAG data layer v4 =====';
const block = html.slice(html.indexOf(START), html.indexOf(END));
assert.ok(block.length > 1000, 'data layer block found');
const base = JSON.parse(/const base=(\[\[.*?\]\]\]);\n/s.exec(html)[1]);
const clone = x => JSON.parse(JSON.stringify(x));
function sandbox(st, stored = {}) {
  const store = { ...stored };
  const localStorage = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };
  // Same realm as the test (so deepEqual compares plain objects), private scope per sandbox.
  const make = new Function('st', 'localStorage', 'console', 'zagValidLoggedSet', block + '\nreturn {zagCanon,zagCanonList,zagCanonVals,zagEnsureDaySlots,zagPruneTempSwaps,zagConvertLegacySwaps,zagMigrateExerciseNames,zagFixChest1Swap,zagTopUpAlternatives,zagRunDataMigrations,zagEffectiveMains,zagEffectiveExtras,zagSlotWeek,zagAdvanceDayWeeks,zagClearDaySwaps,zagOrphanDraftEntries,zagDraftKey,zagSlotOcc,ZAG_NAME_MAP,ZAG_EXERCISE_MERGES,ZAG_LEGACY_RENAMES};');
  const fns = make(st, localStorage, console, (ex, kg, r) => kg !== '' && kg != null && r !== '' && r != null && Number(kg) >= 0 && Number(r) >= 0.5);
  return { ...fns, store };

}
const api = sandbox({});
const weeksOf = (st, i) => st.days[i][3].s.map(x => x.w);
// The split exactly as shipped before this change (old names), for "existing install" tests.
const OLD = { 'Deadlift': 'Deadlifts', 'Pin Machine Chest Fly': 'Pin Machine Cable Fly' };
function oldGoatDays() {
  const d = clone(base).map(x => [x[0], x[1], x[2]]);
  d[3][1][0] = 'Deadlifts'; d[10][1][0] = 'Deadlifts'; d[1][1][3] = 'Pin Machine Cable Fly';
  d[5][2].push('Pin Machine Cable Fly', 'Dumbbell Flat Press'); d[1][2].push('Dumbbell Flat Press');
  return d;
}
function oldState(extra = {}) {
  const days = oldGoatDays(), weeks = {}; let n = 0; const seen = new Set();
  days.forEach(d => d[1].forEach(ex => { if (!seen.has(ex)) { seen.add(ex); weeks[ex] = (n++ % 8) + 1; } }));
  return { day: 0, weeks, max: {}, repsAtMax: {}, prHistory: {}, draft: {}, history: [], days, plannedDays: clone(days), splitName: 'The Goat Split', customSplits: {}, ...extra };
}

test('default library matches the approved exercise lists', () => {
  const mains = Object.fromEntries(base.map((d, i) => [i + 1, d[1]]));
  assert.deepEqual(base.map(d => d[0]), ['Pull 1', 'Push 1', 'Arms', 'Legs', 'Pull 2', 'Chest 1', 'Shoulders 1', 'Pull 1', 'Push 2', 'Arms', 'Legs', 'Pull 2', 'Shoulders 2', 'Chest 2']);
  assert.deepEqual(mains[2], ['Smith Shoulder Press', 'Pin Machine Decline Chest Press', 'Pin Machine Lateral Raise', 'Pin Machine Chest Fly', 'Pin Machine Shoulder Press Blue', 'Cable Front Raise']);
  assert.deepEqual(mains[4], ['Deadlift', 'Sitting Hamstring Curl', 'Leg Extension', 'Unilateral Leg Press', 'Squats', 'Sitting Calf Raises']);
  assert.deepEqual(mains[6], ['Dumbbell Flat Chest Press', 'Smith Incline Chest Press', 'Cable Chest Fly', 'Cable Upward Chest Fly', 'Pin Machine Decline Chest Press']);
  assert.deepEqual(mains[7], ['Smith Shoulder Press', 'Dumbbell Seated Side Raise', 'Pin Machine Shoulder Press Blue', 'Cable Front Raise', 'Pin Machine Rear Deltoids', 'Shrugs']);
  assert.deepEqual(mains[9], ['Smith Flat Chest Press', 'Pin Machine Chest Fly', 'Pin Machine Lateral Raise', 'Pin Machine Decline Chest Press', 'Cable Front Raise', 'Cable Upward Chest Fly']);
  assert.deepEqual(mains[13], ['Smith Shoulder Press', 'Dumbbell Side Raise', 'Pin Machine Shoulder Press Blue', 'Cable Front Raise', 'Pin Machine Rear Deltoids', 'Shrugs']);
  assert.deepEqual(mains[14], ['Dumbbell Flat Chest Press', 'Smith Incline Chest Press', 'Cable Chest Fly', 'Cable Upward Chest Fly', 'Pin Machine Incline Chest Press']);
  assert.deepEqual(mains[8], mains[1]); assert.deepEqual(mains[10], mains[3]); assert.deepEqual(mains[11], mains[4]); assert.deepEqual(mains[12], mains[5]);
  const all = new Set(base.flatMap(d => [...d[1], ...d[2]]));
  for (const old of Object.keys(api.ZAG_EXERCISE_MERGES)) assert.equal(all.has(old), false, old + ' removed from library');
  base.forEach(d => { const names = [...d[1], ...d[2]]; assert.equal(new Set(names).size, names.length, 'no duplicate inside ' + d[0]); });
  assert.ok(base[6][2].includes('Dumbbell Side Raise') && base[6][2].includes('Cable Side Raise'));
  assert.ok(base[12][2].includes('Dumbbell Seated Side Raise') && base[12][2].includes('Cable Side Raise'));
});
test('exercises that must stay separate are never mapped', () => {
  for (const n of ['Cable Side Raise', 'Dumbbell Seated Side Raise', 'Dumbbell Side Raise', 'Cable Chest Fly', 'Cable Upward Chest Fly', 'Straight Arm Pulldown', 'Plate Loaded Straight Arm Pulldown', 'Pin Machine Lateral Raise', 'Cable Lateral Raise', 'Pin Machine Lat Pulldown Close Grip B', 'Pin Machine Lat Pulldown Close Grip Red', 'Pin Machine Lat Pulldown Wide Grip B', 'Pin Machine Lat Pulldown Wide Grip Red', 'Free Weight Row', 'Single Lat Raise Pin', 'Chest pin red / blue / incline', 'Front raise db / plate', 'DB Press'])
    assert.equal(api.zagCanon(n), n, n);
  const targets = new Set(Object.values(api.ZAG_NAME_MAP)), library = new Set(base.flatMap(d => [...d[1], ...d[2]]));
  for (const t of targets) { assert.ok(library.has(t), 'target in library: ' + t); assert.equal(api.zagCanon(t), t); }
  assert.equal(api.zagCanon('Deadlifts'), 'Deadlift'); assert.equal(api.zagCanon('Cable Fly Pin'), 'Pin Machine Chest Fly');
});
test('conflicting PBs: the stronger record wins and nothing is lost', () => {
  const st = oldState({ max: { Deadlift: 160, Deadlifts: 180, 'Dumbbell Flat Press': 40, 'Dumbbell Flat Chest Press': 45 }, repsAtMax: { Deadlift: 3, Deadlifts: 1, 'Dumbbell Flat Press': 8, 'Dumbbell Flat Chest Press': 6 },
    prHistory: { Deadlift: [{ date: '01/10/2026', from: 150, to: 160, reps: 3 }], Deadlifts: [{ date: '20/10/2026', from: 170, to: 180, reps: 1 }, { date: '05/09/2026', from: 0, to: 170, reps: 2 }] } });
  const r = api.zagMigrateExerciseNames(st, {});
  assert.equal(st.max.Deadlift, 180); assert.equal(st.repsAtMax.Deadlift, 1); assert.equal('Deadlifts' in st.max, false);
  assert.equal(st.max['Dumbbell Flat Chest Press'], 45); assert.equal(st.repsAtMax['Dumbbell Flat Chest Press'], 6);
  assert.deepEqual(st.prHistory.Deadlift.map(e => e.to), [180, 160, 170]); assert.equal('Deadlifts' in st.prHistory, false);
  assert.equal(r.journal.maps.Deadlift.Deadlifts.max, 180); assert.equal(r.journal.maps.Deadlift.Deadlift.max, 160);
  const st2 = oldState({ max: { Deadlift: 190, Deadlifts: 180 }, repsAtMax: { Deadlift: 2, Deadlifts: 5 } });
  api.zagMigrateExerciseNames(st2, {}); assert.equal(st2.max.Deadlift, 190); assert.equal(st2.repsAtMax.Deadlift, 2);
  const st3 = oldState({ max: { Deadlift: 180, Deadlifts: 180 }, repsAtMax: { Deadlift: 2, Deadlifts: 5 } });
  api.zagMigrateExerciseNames(st3, {}); assert.equal(st3.repsAtMax.Deadlift, 5, 'equal weight: more reps wins');
  const st4 = oldState({ max: { Deadlifts: 175 }, repsAtMax: { Deadlifts: 4 } });
  api.zagMigrateExerciseNames(st4, {}); assert.equal(st4.max.Deadlift, 175); assert.equal(st4.repsAtMax.Deadlift, 4);
});
test('manual maximum edits follow the winning record', () => {
  const st = oldState({ max: { Deadlift: 150, Deadlifts: 180 } }), ov = { Deadlift: { kg: 150, reps: 2, at: 5 } };
  api.zagMigrateExerciseNames(st, ov);
  assert.equal(st.max.Deadlift, 180); assert.deepEqual(ov, {}, 'a manual value on the weaker record must not force it back');
  const st2 = oldState({ max: { Deadlift: 100, Deadlifts: 200 } }), ov2 = { Deadlifts: { kg: 170, reps: 3, at: 9 } };
  api.zagMigrateExerciseNames(st2, ov2);
  assert.equal(st2.max.Deadlift, 170, 'the manual edit is the effective value of the old name'); assert.deepEqual(ov2, { Deadlift: { kg: 170, reps: 3, at: 9 } });
});
test('a retired pre-September name never overrides the current name', () => {
  const cur = 'Pin Machine Lat Pulldown Close Grip B';
  const st = oldState({ max: { 'Close Pulldown B': 225, [cur]: 200 }, repsAtMax: { 'Close Pulldown B': 8, [cur]: 6 } });
  api.zagMigrateExerciseNames(st, {});
  assert.equal(st.max[cur], 200); assert.equal(st.repsAtMax[cur], 6); assert.equal('Close Pulldown B' in st.max, false);
  const st2 = oldState({ max: { 'Close Pulldown B': 225 }, repsAtMax: { 'Close Pulldown B': 8 } });
  api.zagMigrateExerciseNames(st2, {}); assert.equal(st2.max[cur], 225, 'used when the current name has no maximum');
  const st3 = oldState({ max: { 'Close Pulldown B': 225, [cur]: 200 }, customSplits: { Mine: [['Back', ['Close Pulldown B'], []]] } });
  api.zagMigrateExerciseNames(st3, {}); assert.equal(st3.max[cur], 225, 'still in use in a split: stronger record wins');
  assert.deepEqual(st3.customSplits.Mine[0][1], [cur]);
});
test('ambiguous old names keep their own data', () => {
  const st = oldState({ max: { 'Cable Side Raise': 20, 'Dumbbell Seated Side Raise': 20, 'Free Weight Row': 100, 'Plate Loaded Row': 120 }, history: [{ date: '01/08/2026, 10:00:00', day: 'Pull', sets: [{ exercise: 'Free Weight Row', kg: 100, reps: 8 }, { exercise: 'Cable Side Raise', kg: 20, reps: 10 }] }] });
  const before = clone(st); const r = api.zagMigrateExerciseNames(st, {});
  assert.deepEqual(st.max, before.max); assert.deepEqual(st.history, before.history); assert.equal(r.historySets, 0);
});
test('history keeps dates, weights and reps; only the label changes', () => {
  const history = [{ date: '03/11/2026, 18:00:00', day: 'Legs', sets: [{ exercise: 'Deadlifts', kg: 180, reps: 1 }, { exercise: 'Squats', kg: 100, reps: 5 }] }, { date: '01/08/2026, 09:00:00', day: 'Pull', sets: [{ exercise: 'Close Pulldown B', kg: 90, reps: 8.5 }, { exercise: 'Deadlift', kg: 150, reps: 3 }, { exercise: 'Cable Fly', kg: 30, reps: 0.5 }] }];
  const st = oldState({ history: clone(history) }); const r = api.zagMigrateExerciseNames(st, {});
  assert.deepEqual(st.history.map(h => [h.date, h.day, h.sets.map(v => [v.kg, v.reps])]), history.map(h => [h.date, h.day, h.sets.map(v => [v.kg, v.reps])]));
  assert.deepEqual(st.history.flatMap(h => h.sets.map(v => v.exercise)), ['Deadlift', 'Squats', 'Pin Machine Lat Pulldown Close Grip B', 'Deadlift', 'Cable Chest Fly']);
  assert.equal(r.historySets, 3);
  assert.deepEqual(r.journal.history, [['03/11/2026, 18:00:00', 0, 'Deadlifts'], ['01/08/2026, 09:00:00', 0, 'Close Pulldown B'], ['01/08/2026, 09:00:00', 2, 'Cable Fly']]);
});
test('drafts and splits are renamed; only rename-made duplicates are removed', () => {
  const st = oldState({ draft: { '3|Deadlifts|5': { kg: 100, r: 5, done: true }, '3|Deadlift|6': { kg: 90, r: 5 }, '3|Squats|0': { kg: 20, r: 20 }, '5|Dumbbell Flat Press|0|#2': { kg: 1, r: 1 } } });
  st.days[2][2].push('Hack Squat', 'Hack Squat');
  const extrasBefore = clone(st.days[0][2]);
  api.zagMigrateExerciseNames(st, {});
  assert.deepEqual(Object.keys(st.draft).sort(), ['3|Deadlift|5', '3|Deadlift|6', '3|Squats|0', '5|Dumbbell Flat Chest Press|0|#2']);
  assert.equal(st.days[3][1][0], 'Deadlift'); assert.equal(st.days[1][1][3], 'Pin Machine Chest Fly');
  assert.equal(st.days[1][2].filter(x => x === 'Pin Machine Chest Fly').length, 0, 'now a main, so not also an alternative');
  assert.equal(st.days[1][2].filter(x => x === 'Dumbbell Flat Chest Press').length, 1);
  assert.equal(st.days[5][2].filter(x => x === 'Pin Machine Chest Fly').length, 1);
  assert.equal(st.days[2][2].filter(x => x === 'Hack Squat').length, 2, 'an unrelated duplicate is left alone');
  assert.deepEqual(st.days[0][2], extrasBefore); assert.deepEqual(st.plannedDays[3][1][0], 'Deadlift');
});
test('group data: names fold and totals cannot double count', () => {
  assert.deepEqual(api.zagCanonVals({ Deadlifts: 180, Deadlift: 170, Squats: 100 }), { Deadlift: 180, Squats: 100 });
  assert.deepEqual(api.zagCanonList(['Deadlifts', 'Squats', 'Deadlift']), ['Deadlift', 'Squats']);
  const st = oldState({ groupExercise: 'Deadlifts', onlineGroupConfigs: { g1: { exercises: ['Squats', 'Deadlifts', 'Deadlift'] } } });
  api.zagMigrateExerciseNames(st, {}); assert.equal(st.groupExercise, 'Deadlift'); assert.deepEqual(st.onlineGroupConfigs.g1.exercises, ['Squats', 'Deadlift']);
});
test('existing installs keep exactly the weeks they show today', () => {
  const st = oldState(), shown = st.days.map(d => d[1].map(ex => st.weeks[ex] || 1));
  api.zagEnsureDaySlots(st); api.zagMigrateExerciseNames(st, {}); api.zagEnsureDaySlots(st);
  assert.deepEqual(st.days.map((d, i) => weeksOf(st, i)), shown);
  assert.equal(new Set(st.days.map(d => d[3].id)).size, 14); assert.equal(new Set(st.days.flatMap(d => d[3].s.map(x => x.id))).size, st.days.reduce((n, d) => n + d[1].length, 0));
  assert.deepEqual(st.days[3][3].s.map(x => x.x), st.days[3][1]);
});
test('finishing a day advances only that day, and Week 8 wraps to Week 1', () => {
  const st = oldState(); const s = sandbox(st); s.zagEnsureDaySlots(st);
  st.days[0][3].s.forEach((x, j) => { x.w = 3 + j; });
  const others = st.days.map((d, i) => weeksOf(st, i));
  s.zagAdvanceDayWeeks(0); assert.deepEqual(weeksOf(st, 0), [4, 5, 6, 7, 8]);
  s.zagAdvanceDayWeeks(0); assert.deepEqual(weeksOf(st, 0), [5, 6, 7, 8, 1]);
  for (let i = 1; i < 14; i++) assert.deepEqual(weeksOf(st, i), others[i], 'day ' + (i + 1) + ' untouched (Pull 2 and the second Pull 1 share exercises)');
});
test('editing a split keeps each position\'s week', () => {
  const st = oldState(); api.zagEnsureDaySlots(st);
  st.days[0][3].s.forEach((x, j) => { x.w = j + 2; });
  const ids = st.days[0][3].s.map(x => x.id), dayId = st.days[0][3].id;
  st.days[0][1] = [st.days[0][1][2], st.days[0][1][0], st.days[0][1][1], st.days[0][1][4], st.days[0][1][3]];
  api.zagEnsureDaySlots(st);
  assert.deepEqual(weeksOf(st, 0), [4, 2, 3, 6, 5]); assert.deepEqual(st.days[0][3].s.map(x => x.id), [ids[2], ids[0], ids[1], ids[4], ids[3]]);
  [st.days[0], st.days[4]] = [st.days[4], st.days[0]]; api.zagEnsureDaySlots(st);
  assert.equal(st.days[4][3].id, dayId); assert.deepEqual(weeksOf(st, 4), [4, 2, 3, 6, 5]);
  st.days.splice(5, 0, clone(st.days[4])); api.zagEnsureDaySlots(st);
  assert.notEqual(st.days[5][3].id, dayId); assert.deepEqual(weeksOf(st, 5), [4, 2, 3, 6, 5]);
  assert.equal(new Set(st.days.flatMap(d => d[3].s.map(x => x.id))).size, st.days.reduce((n, d) => n + d[1].length, 0));
  const removed = st.days[4][1].splice(1, 1)[0]; api.zagEnsureDaySlots(st);
  assert.deepEqual(weeksOf(st, 4), [4, 3, 6, 5]); st.days[4][1].push(removed); api.zagEnsureDaySlots(st);
  assert.deepEqual(weeksOf(st, 4), [4, 3, 6, 5, 2], 're-added exercise gets its week back');
  st.days.push(['New', ['Squats', 'Squats', 'Brand New Lift'], []]); api.zagEnsureDaySlots(st);
  assert.equal(st.days[st.days.length - 1][3].s.length, 3); assert.equal(st.days[st.days.length - 1][3].s[2].w, 1);
  const again = clone(st); assert.equal(api.zagEnsureDaySlots(st), false, 'idempotent'); assert.deepEqual(st, again);
});
test('a swap left in flight by an older build becomes temporary', () => {
  const st = oldState(); const planned = st.days[5][1][2];
  const j = st.days[5][2].indexOf('Dumbbell Incline Chest Press'); st.days[5][1][2] = 'Dumbbell Incline Chest Press'; st.days[5][2][j] = planned;
  const s = sandbox(st); const r = s.zagRunDataMigrations('test');
  assert.equal(r.swaps, 1); assert.equal(st.days[5][1][2], 'Cable Chest Fly'); assert.deepEqual(st.plannedDays, st.days);
  assert.equal(s.zagEffectiveMains(5)[2], 'Dumbbell Incline Chest Press'); assert.ok(s.zagEffectiveExtras(5).includes('Cable Chest Fly')); assert.ok(!s.zagEffectiveExtras(5).includes('Dumbbell Incline Chest Press'));
  assert.equal(s.zagSlotWeek(5, 2), st.weeks['Cable Chest Fly'], 'the position keeps the planned exercise\'s week');
  s.zagClearDaySwaps(5); assert.equal(s.zagEffectiveMains(5)[2], 'Cable Chest Fly');
});
test('Chest 1 exercise 3 is restored once, and only on The Goat Split', () => {
  const stuck = () => { const st = oldState(); const j = st.days[5][2].indexOf('Dumbbell Incline Chest Press'); st.days[5][2][j] = st.days[5][1][2]; st.days[5][1][2] = 'Dumbbell Incline Chest Press'; st.plannedDays = clone(st.days); return st; };
  const st = stuck(), other = clone(st.days.filter((d, i) => i !== 5)); const s = sandbox(st); const r = s.zagRunDataMigrations('test');
  assert.equal(r.chest1, true); assert.equal(st.days[5][1][2], 'Cable Chest Fly'); assert.ok(st.days[5][2].includes('Dumbbell Incline Chest Press')); assert.equal(st.days[5][3].s[2].x, 'Cable Chest Fly');
  assert.deepEqual(st.days.filter((d, i) => i !== 5 && ![1, 3, 6, 8, 10, 12].includes(i)).map(d => d[1]), other.filter((d, i) => ![1, 3, 6, 8, 10, 12].includes(i >= 5 ? i + 1 : i)).map(d => d[1]));
  const j = st.days[5][2].indexOf('Dumbbell Incline Chest Press'); st.days[5][2][j] = 'Cable Chest Fly'; st.days[5][1][2] = 'Dumbbell Incline Chest Press';
  assert.equal(s.zagRunDataMigrations('again').chest1, false, 'a later deliberate edit is respected');
  const custom = stuck(); custom.splitName = 'Custom Split 1'; const c = sandbox(custom); assert.equal(c.zagRunDataMigrations('test').chest1, false); assert.equal(custom.days[5][1][2], 'Dumbbell Incline Chest Press');
});
test('full migration of an old install is complete, loses nothing and is repeatable', () => {
  const st = oldState({ day: 3, max: { Deadlift: 160, Deadlifts: 180, Squats: 100, 'Pin Machine Cable Fly': 60 }, repsAtMax: { Deadlift: 3, Deadlifts: 1, Squats: 5 },
    prHistory: { Deadlifts: [{ date: '20/10/2026', from: 170, to: 180, reps: 1 }] }, draft: { '3|Deadlifts|5': { kg: 126, r: 8, done: true } },
    history: [{ date: '03/11/2026, 18:00:00', day: 'Legs', sets: [{ exercise: 'Deadlifts', kg: 180, reps: 1 }] }, { date: '01/11/2026, 18:00:00', day: 'Pull 1', sets: [{ exercise: 'Deadlift', kg: 160, reps: 3 }] }] });
  const setsBefore = st.history.flatMap(h => h.sets.map(v => [h.date, v.kg, v.reps])), shown = st.days.map(d => d[1].map(ex => st.weeks[ex] || 1));
  const s = sandbox(st, { zagManualPBOverridesV288: JSON.stringify({ Deadlifts: { kg: 180, reps: 1, at: 1 } }) });
  const r = s.zagRunDataMigrations('startup');
  assert.equal(r.error, ''); assert.equal(st.zagMig.v, 4);
  assert.equal(st.max.Deadlift, 180); assert.equal(st.max['Pin Machine Chest Fly'], 60); assert.equal(st.max.Squats, 100);
  assert.deepEqual(JSON.parse(s.store.zagManualPBOverridesV288), { Deadlift: { kg: 180, reps: 1, at: 1 } });
  assert.deepEqual(st.history.flatMap(h => h.sets.map(v => [h.date, v.kg, v.reps])), setsBefore); assert.ok(st.history.every(h => h.sets.every(v => v.exercise === 'Deadlift')));
  assert.deepEqual(st.days.map((d, i) => weeksOf(st, i)), shown); assert.deepEqual(st.plannedDays, st.days);
  assert.ok(st.days[6][2].includes('Dumbbell Side Raise') && st.days[12][2].includes('Dumbbell Seated Side Raise') && st.days[6][2].includes('Cable Side Raise'));
  const text = JSON.stringify({ ...st, zagMigLog: null }); for (const old of ['"Deadlifts"', '|Deadlifts|', 'Pin Machine Cable Fly', 'Dumbbell Flat Press"']) assert.equal(text.includes(old), false, old + ' gone from live data: ' + text.slice(Math.max(0, text.indexOf(old) - 80), text.indexOf(old) + 30));
  const snapshot = clone(st), stored = { ...s.store };
  const r2 = s.zagRunDataMigrations('startup'); assert.equal(r2.names.changed, false); assert.deepEqual(st, snapshot); assert.deepEqual(s.store, stored);
});
test('sets logged before a mid-workout swap are still recorded', () => {
  const st = oldState({ day: 5 }); const s = sandbox(st); s.zagRunDataMigrations('t');
  st.draft = { '5|Cable Chest Fly|5': { kg: 30, r: 8, done: true }, '5|Cable Chest Fly|6': { kg: '', r: '' }, '4|Barbell Row|5': { kg: 60, r: 8 }, '5|Smith Incline Chest Press|5': { kg: 50, r: 5 } };
  const meta = st.days[5][3]; st.tempSwaps = { [meta.id]: { [meta.s[2].id]: 'Dumbbell Incline Chest Press' } };
  assert.deepEqual(clone(s.zagOrphanDraftEntries(5, s.zagEffectiveMains(5))), [{ exercise: 'Cable Chest Fly', kg: 30, reps: 8 }]);
});

// End-to-end check of the real app in a phone-sized headless browser, offline.
// NOT part of `npm test` (needs Playwright):  node tests/e2e/phase2.e2e.cjs
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '../..');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((req, res) => { let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html'; const f = path.join(root, p); if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); });
let pass = 0, fail = 0;
const ok = (cond, label, detail) => { if (cond) pass++; else { fail++; console.log('  FAIL: ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); } };
const same = (a, b, label) => ok(JSON.stringify(a) === JSON.stringify(b), label, { got: a, want: b });

// The Goat Split exactly as shipped before this change (old names), built from the current library.
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const base = JSON.parse(/const base=(\[\[.*?\]\]\]);\n/s.exec(html)[1]);
function oldInstall() {
  const days = JSON.parse(JSON.stringify(base)).map(d => [d[0], d[1], d[2].filter(x => !['Cable Side Raise'].includes(x))]);
  days[3][1][0] = 'Deadlifts'; days[10][1][0] = 'Deadlifts'; days[1][1][3] = 'Pin Machine Cable Fly';
  days[6][2] = days[6][2].filter(x => x !== 'Dumbbell Side Raise'); days[12][2] = days[12][2].filter(x => x !== 'Dumbbell Seated Side Raise');
  days[1][2].push('Dumbbell Flat Press'); days[5][2].push('Dumbbell Flat Press', 'Pin Machine Cable Fly');
  const weeks = {}; let n = 0; const seen = new Set();
  days.forEach(d => d[1].forEach(ex => { if (!seen.has(ex)) { seen.add(ex); weeks[ex] = (n++ % 8) + 1; } }));
  // Chest 1 exercise 3 stuck on a swap (present in both the live and the planned split).
  let j = days[5][2].indexOf('Dumbbell Incline Chest Press'); days[5][2][j] = 'Cable Chest Fly'; days[5][1][2] = 'Dumbbell Incline Chest Press';
  const plannedDays = JSON.parse(JSON.stringify(days));
  // A swap still in flight on Arms (live split differs from the plan).
  j = days[2][2].indexOf('Dumbbell Spider Bicep Curl'); days[2][2][j] = days[2][1][1]; days[2][1][1] = 'Dumbbell Spider Bicep Curl';
  return { day: 3, weeks, sound: false, units: 'kg', splitName: 'The Goat Split', customSplits: {}, days, plannedDays, groupsOnboardingBuild: 1,
    max: { Deadlift: 160, Deadlifts: 180, Squats: 100, 'Close Pulldown B': 225, 'Pin Machine Lat Pulldown Close Grip B': 200, 'Cable Side Raise': 20, 'Dumbbell Seated Side Raise': 20, 'Barbell Row': 80 },
    repsAtMax: { Deadlift: 3, Deadlifts: 1, Squats: 5, 'Barbell Row': 8 },
    prHistory: { Deadlifts: [{ date: '20/10/2026', from: 170, to: 180, reps: 1 }], Deadlift: [{ date: '01/10/2026', from: 150, to: 160, reps: 3 }] },
    draft: { '3|Deadlifts|5': { kg: 126, r: 8, done: true } },
    history: [{ date: '03/11/2026, 18:00:00', day: 'Legs', sets: [{ exercise: 'Deadlifts', kg: 180, reps: 1 }, { exercise: 'Squats', kg: 90, reps: 5 }] },
              { date: '01/11/2026, 18:00:00', day: 'Pull 1', sets: [{ exercise: 'Deadlift', kg: 160, reps: 3 }, { exercise: 'Barbell Row', kg: 70, reps: 8 }] },
              { date: '01/08/2026, 09:00:00', day: 'Pull', sets: [{ exercise: 'Close Pulldown B', kg: 90, reps: 8.5 }, { exercise: 'Cable Side Raise', kg: 15, reps: 12 }] }],
    streak: { count: 3, lastWorkout: '', lastProcessed: '', weekKey: '', restUsed: 0, lastPopup: '', weekRest: {}, justLost: false } };
}

(async () => {
  await new Promise(r => server.listen(8766, '127.0.0.1', r));
  const browser = await chromium.launch();
  const url = 'http://127.0.0.1:8766/';
  async function open(seed, extra = {}) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
    await ctx.route('**/*', r => r.request().url().startsWith('http://127.0.0.1') ? r.continue() : r.abort());
    const page = await ctx.newPage(); const errors = []; const dialogs = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('dialog', d => { dialogs.push(d.message().slice(0, 60)); d.accept().catch(() => {}); });
    await page.goto(url + 'tests/e2e/blank.html').catch(() => {}); await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.evaluate(([seed, extra]) => { localStorage.clear(); sessionStorage.clear(); localStorage.setItem('zagAccountGuideV2724', 'shown'); localStorage.setItem('zag_dev_pro_test_only', '1'); if (seed) { localStorage.setItem('zagScienceV2', JSON.stringify(seed)); localStorage.setItem('zagExerciseLibraryV3', '1'); localStorage.setItem('zagPush2SmithFlatV1', '1'); } for (const k in extra) localStorage.setItem(k, extra[k]); }, [seed, extra]);
    await page.reload({ waitUntil: 'load' }); await page.waitForTimeout(500);
    return { ctx, page, errors, dialogs };
  }
  const S = (page, fn, arg) => page.evaluate(fn, arg);
  const weeks = page => S(page, () => st.days.map(d => d[3].s.map(x => x.w)));
  const shownWeeks = page => S(page, () => [...document.querySelectorAll('#screen select.week')].map(x => +x.value));
  const names = page => S(page, () => [...document.querySelectorAll('#screen .exercise .name')].map(x => x.textContent));
  async function closePopup(page) { await page.waitForTimeout(250); await S(page, () => { const b = document.querySelector('.streakOverlay button'); if (b) b.click(); }); await page.waitForTimeout(450); }

  console.log('A. Fresh install');
  { const { ctx, page, errors } = await open(null);
    same(errors, [], 'no script errors on first launch');
    const w = await weeks(page);
    same(w[0], [1, 2, 3, 4, 5], 'Pull 1 starts Week 1-5'); same(w[1], [6, 7, 8, 1, 2, 3], 'Push 1 continues the sequence');
    same(w[4], w[0], 'Pull 2 starts on the same weeks as Pull 1'); same(w[13], w[5], 'Chest 2 starts on the same weeks as Chest 1'); same(w[12], w[6], 'Shoulders 2 starts on the same weeks as Shoulders 1');
    await S(page, () => { st.day = 0; workout(); });
    same(await shownWeeks(page), [1, 2, 3, 4, 5], 'Workout page shows each position\'s week');
    ok((await names(page))[0] === 'Weighted Lat Pull Up', 'first card is the planned exercise');
    await S(page, () => { zagSetMax('Weighted Lat Pull Up', '40', 1); zagSetMax('Barbell Row', '100', 1); });
    await S(page, () => workout());
    const t = await S(page, () => [...document.querySelectorAll('#exercise-1 table tr')].slice(1).map(r => [r.cells[1].textContent, r.cells[2].textContent, r.cells[3].textContent]));
    same(t, [['20%', '20', '20'], ['40%', '40', '8'], ['60%', '60', '5'], ['75%', '75', '3'], ['90%', '90', '2'], ['72.5%', '72.5', '8'], ['75%', '75', '7'], ['77.5%', '77.5', '6'], ['72.5%', '72.5', '8'], ['70%', '70', '10']], 'Week 2 targets for a 100 kg max');
    await S(page, () => { toggleExerciseCard(1); document.querySelector('#exercise-1 .allSetsBtn').click(); });
    await page.waitForTimeout(200);
    ok(await S(page, () => Object.keys(st.draft).length === 10 && st.draft['0|Barbell Row|5'].done === true && st.draft['0|Barbell Row|5'].kg === 72.5), 'ALL fills the ten empty sets with targets');
    await S(page, () => { const inp = document.querySelectorAll('#exercise-1 table tr')[6].querySelectorAll('input'); st.draft['0|Barbell Row|5'] = { kg: 80, r: 6, done: true }; document.querySelector('#exercise-1 .allSetsBtn').click(); });
    ok(await S(page, () => st.draft['0|Barbell Row|5'].kg === 80 && st.draft['0|Barbell Row|5'].r === 6), 'ALL never overwrites a completed set');
    const before = await weeks(page);
    await S(page, () => { document.querySelector('#nav-maxes').click(); document.querySelector('#nav-history').click(); document.querySelector('#nav-workout').click(); move(1); move(1); move(-2); });
    same(await weeks(page), before, 'opening tabs and other days does not advance any week');
    ok(await S(page, () => Object.keys(st.draft).length === 10), 'drafts survive tab and day changes');
    await S(page, () => finish()); await closePopup(page);
    const after = await weeks(page);
    same(after[0], [2, 3, 4, 5, 6], 'finishing Pull 1 advances Pull 1 by one week');
    same(after[7], after[0], 'the second Pull 1 day moves with it');
    same(after[4], [1, 3, 4, 4, 6], 'Pull 2: shared exercises 2, 3, 5 move; its own exercises 1 and 4 do not'); same(after[11], after[4], 'both Pull 2 days alike');
    for (const i of [1, 2, 3, 5, 6, 8, 9, 10, 12, 13]) same(after[i], before[i], 'day ' + (i + 1) + ' unchanged by Pull 1');
    ok(await S(page, () => st.history.length === 1 && st.history[0].day === 'Pull 1' && st.history[0].sets.length === 10 && st.history[0].sets.every(v => v.exercise === 'Barbell Row') && st.day === 1), 'workout saved once, app moved to the next day');
    await S(page, () => finish()); await page.waitForTimeout(200);
    same(await weeks(page), after, 'a second Finish with nothing logged does not advance again');
    ok(await S(page, () => st.history.length === 1), 'no duplicate workout');
    await page.reload({ waitUntil: 'load' }); await page.waitForTimeout(400);
    same(await weeks(page), after, 'weeks survive closing and reopening');
    // Week 8 wraps, manual selector, realign prompt (dialog auto-accepted = Yes)
    await S(page, () => { st.day = 4; workout(); const sel = document.querySelectorAll('#screen select.week')[2]; sel.value = '8'; sel.dispatchEvent(new Event('change')); });
    same((await weeks(page))[4], [1, 3, 8, 4, 6], 'manual week change affects that position'); same((await weeks(page))[0][2], 8, 'and the same exercise in the same position on Pull 1');
    await S(page, () => { const sel = document.querySelectorAll('#screen select.week')[0]; sel.value = '6'; sel.dispatchEvent(new Event('change')); });
    same((await weeks(page))[4], [6, 7, 8, 1, 2], 'changing the first exercise realigns this day (after confirmation)');
    same((await weeks(page))[11], [6, 7, 8, 1, 2], 'the other Pull 2 day follows'); same((await weeks(page))[0], [2, 7, 8, 5, 2], 'Pull 1 follows only at the shared exercises');
    await S(page, () => { one(0, 5, null); }); // fill one set without a row -> uses targets
    await S(page, () => { st.draft['4|Barbell Row|5'] = { kg: 60, r: 8, done: true }; save(); finish(); }); await closePopup(page);
    same((await weeks(page))[4], [7, 8, 1, 2, 3], 'Week 8 wraps to Week 1');
    const pb = await weeks(page);
    await S(page, () => { st.day = 1; workout(); st.draft[k('Smith Shoulder Press', 5)] = { kg: 40, r: 8, done: true }; save(); finish(); }); await closePopup(page);
    const pw = await weeks(page);
    same(pw[8][2], pw[1][2], 'Push 2 exercise 3 (Pin Machine Lateral Raise on both) follows Push 1'); same([pw[8][0], pw[8][1], pw[8][3]], [pb[8][0], pb[8][1], pb[8][3]], 'other Push 2 exercises keep their own weeks');
    same(errors, [], 'no script errors during the fresh-install run');
    await ctx.close(); }

  console.log('B. Existing install with old names, conflicting PBs and swaps');
  { const seed = oldInstall(); const shown = seed.plannedDays.map(d => d[1].map(ex => seed.weeks[ex] || 1));
    shown[12][1] = shown[6][1]; shown[5][2] = seed.weeks['Cable Chest Fly']; // Shoulders 2 #2 now matches Shoulders 1; Chest 1 #3 restored to Cable Chest Fly
    const { ctx, page, errors } = await open(seed, { zagManualPBOverridesV288: JSON.stringify({ Deadlifts: { kg: 180, reps: 1, at: 1 } }) });
    same(errors, [], 'no script errors on upgrade');
    const r = await S(page, () => ({ mig: st.zagMig, max: st.max, reps: st.repsAtMax, pr: st.prHistory.Deadlift.map(e => e.to), hist: st.history.map(h => [h.date, h.day, h.sets.map(v => [v.exercise, v.kg, v.reps])]), draft: Object.keys(st.draft), legs: st.days[3][1], push: st.days[1][1], chest: st.days[5][1], chestExtras: st.days[5][2], arms: st.days[2][1], sh1: st.days[6][2], sh2: st.days[12][2], sh2m: st.days[12][1], planned: JSON.stringify(st.plannedDays) === JSON.stringify(st.days), report: window.zagLastDataMigration, ov: localStorage.getItem('zagManualPBOverridesV288'), backup: JSON.parse(localStorage.getItem('zagScienceBackupBeforeDataV4') || 'null'), eff: zagEffectiveMains(2) }));
    ok(r.mig && r.mig.v === 4 && r.report.error === '', 'data layer v4 applied without error');
    ok(r.max.Deadlift === 180 && r.reps.Deadlift === 1 && !('Deadlifts' in r.max), 'Deadlift max is the stronger 180 x 1', r.max);
    same(r.pr, [180, 160], 'PB events from both names kept, newest first');
    ok(r.max['Pin Machine Lat Pulldown Close Grip B'] === 200 && !('Close Pulldown B' in r.max), 'retired name does not override the current max');
    ok(r.max['Cable Side Raise'] === 20 && r.max['Dumbbell Seated Side Raise'] === 20, 'Cable Side Raise stays a separate exercise');
    same(r.hist, [['03/11/2026, 18:00:00', 'Legs', [['Deadlift', 180, 1], ['Squats', 90, 5]]], ['01/11/2026, 18:00:00', 'Pull 1', [['Deadlift', 160, 3], ['Barbell Row', 70, 8]]], ['01/08/2026, 09:00:00', 'Pull', [['Pin Machine Lat Pulldown Close Grip B', 90, 8.5], ['Cable Side Raise', 15, 12]]]], 'history: same dates, weights and reps under canonical names');
    same(r.draft, ['3|Deadlift|5'], 'unfinished draft follows the rename');
    ok(r.legs[0] === 'Deadlift' && r.push[3] === 'Pin Machine Chest Fly', 'split uses canonical names');
    ok(r.chest[2] === 'Cable Chest Fly' && r.chestExtras.includes('Dumbbell Incline Chest Press'), 'Chest 1 exercise 3 restored to Cable Chest Fly');
    ok(r.arms[1] === 'Dumbbell Preacher Curl' && r.eff[1] === 'Dumbbell Spider Bicep Curl' && r.report.swaps === 1, 'in-flight swap kept for this workout but removed from the plan');
    ok(r.sh1.includes('Dumbbell Side Raise') && r.sh1.includes('Cable Side Raise') && r.sh2.includes('Dumbbell Side Raise') && r.sh2m[1] === 'Dumbbell Seated Side Raise' && JSON.stringify(r.sh2m) === JSON.stringify(seed.plannedDays[6][1]), 'Shoulders 2 now matches Shoulders 1; standing side raise kept as an alternative');
    ok(r.planned, 'planned split mirrors the split');
    same(JSON.parse(r.ov), { Deadlift: { kg: 180, reps: 1, at: 1 } }, 'manual max edit moved to the canonical name');
    ok(r.backup && JSON.parse(r.backup.state).max.Deadlifts === 180 && JSON.parse(r.backup.state).days[3][1][0] === 'Deadlifts', 'untouched safety copy of the old data kept on the device');
    same(await weeks(page), shown, 'every day shows exactly the weeks it showed before the update');
    await S(page, () => { st.day = 3; workout(); });
    ok(await S(page, () => document.querySelector('#exercise-0 .name').textContent === 'Deadlift' && document.querySelector('#exercise-0 .titleMaxTop').textContent.includes('180') && document.querySelectorAll('#exercise-0 .fist.done').length === 1), 'Legs shows Deadlift, max 180, with the draft set still ticked');
    ok(await S(page, () => document.querySelectorAll('#exercise-0 table tr')[1].querySelector('input').placeholder === '180'), 'previous-session placeholder comes from the renamed history');
    await S(page, () => maxes());
    ok(await S(page, () => { const rows = [...document.querySelectorAll('.maxrow')].filter(x => x.querySelector('span').textContent === 'Deadlift'); return rows.length >= 1 && rows.every(x => x.querySelector('[data-zag-max-ex]').value === '180'); }), 'Max page shows Deadlift 180');
    ok(await S(page, () => ![...document.querySelectorAll('.maxrow span')].some(x => ['Deadlifts', 'Dumbbell Flat Press', 'Pin Machine Cable Fly'].includes(x.textContent))), 'no old names on the Max page');
    await S(page, () => historyPage());
    const opts = await S(page, () => [...document.querySelectorAll('.zagStrengthSelect')[0].options].map(o => o.value));
    ok(opts.includes('Deadlift') && !opts.includes('Deadlifts') && opts.includes('Cable Side Raise') && opts.includes('Leg Extension'), 'history selector lists canonical names, separate legacy data and exercises with no data');
    same(await S(page, () => zagStrengthRecords().map(x => Object.keys(x.by).sort())), [['Cable Side Raise', 'Pin Machine Lat Pulldown Close Grip B'], ['Barbell Row', 'Deadlift'], ['Deadlift', 'Squats']], 'graph data is keyed by canonical names');
    await S(page, () => home()); // (reloading while on History hits a separate, older start-up bug that is logged for the logic audit)
    const snap = await S(page, () => localStorage.getItem('zagScienceV2'));
    await page.reload({ waitUntil: 'load' }); await page.waitForTimeout(400);
    ok(await S(page, () => window.zagLastDataMigration.names.changed === false && window.zagLastDataMigration.swaps === 0), 'second launch changes nothing');
    same(JSON.parse(await S(page, () => localStorage.getItem('zagScienceV2'))).history, JSON.parse(snap).history, 'history identical after relaunch');
    // finish Legs: draft recorded as Deadlift, PB logic intact, only Legs (day 4) advances
    const before = await weeks(page);
    await S(page, () => { st.day = 3; workout(); finish(); }); await closePopup(page);
    const after = await weeks(page);
    same(after[3], before[3].map(w => w >= 8 ? 1 : w + 1), 'Legs advanced'); same(after[10], after[3], 'the other Legs day moves with it');
    ok(await S(page, () => st.history[0].sets.length === 1 && st.history[0].sets[0].exercise === 'Deadlift' && st.max.Deadlift === 180), 'set recorded as Deadlift; lighter set is not a PB');
    same(errors, [], 'no script errors during the upgrade run');
    await ctx.close(); }

  console.log('C. Temporary swap lifecycle');
  { const { ctx, page, errors } = await open(null);
    await S(page, () => { st.day = 5; zagSetMax('Cable Chest Fly', '50', 1); zagSetMax('Dumbbell Incline Chest Press', '30', 1); workout(); });
    const plan = await S(page, () => JSON.stringify(st.days)); const wk = (await weeks(page))[5][2];
    await S(page, () => chooseExtraForMain(2)); await S(page, () => [...document.querySelectorAll('#modalRoot .pick')].find(b => b.textContent === 'Dumbbell Incline Chest Press').click());
    ok((await names(page))[2] === 'Dumbbell Incline Chest Press', 'card shows the substitute');
    ok(await S(page, () => document.querySelector('#exercise-2 .titleMaxTop').textContent.includes('30')), 'substitute uses its own max');
    ok((await shownWeeks(page))[2] === wk, 'substitute uses the position\'s week');
    same(await S(page, () => JSON.stringify(st.days)), plan, 'the planned split is not edited by a swap');
    ok(await S(page, () => { const x = [...document.querySelectorAll('#workoutExtras .extra span')].map(s => s.textContent); return x.includes('Cable Chest Fly') && !x.includes('Dumbbell Incline Chest Press'); }), 'alternatives list shows the planned exercise in the substitute\'s place');
    await S(page, () => { document.querySelector('#nav-home').click(); document.querySelector('#nav-settings').click(); st.day = 2; save(); workout(); move(1); st.day = 5; save(); workout(); });
    ok((await names(page))[2] === 'Dumbbell Incline Chest Press', 'swap survives tabs and viewing other days');
    await S(page, () => { editSplit(); renameDay(0, 'Pull 1'); closeModal(); });
    same(await S(page, () => JSON.stringify(st.days)), plan, 'an Edit Split action does not make the swap permanent'); same(await S(page, () => JSON.stringify(st.plannedDays)), plan, 'planned copy unchanged too');
    await page.reload({ waitUntil: 'load' }); await page.waitForTimeout(400); await S(page, () => { st.day = 5; workout(); });
    ok((await names(page))[2] === 'Dumbbell Incline Chest Press', 'swap survives an app restart mid-workout');
    await S(page, () => { toggleExerciseCard(2); document.querySelector('#exercise-2 .allSetsBtn').click(); }); await page.waitForTimeout(150);
    await S(page, () => finish()); await closePopup(page);
    ok(await S(page, () => st.history[0].day === 'Chest 1' && st.history[0].sets.length > 0 && st.history[0].sets.every(v => v.exercise === 'Dumbbell Incline Chest Press')), 'sets recorded under the exercise actually performed');
    ok(await S(page, () => Object.keys(st.tempSwaps).length === 0 && zagEffectiveMains(5)[2] === 'Cable Chest Fly'), 'planned exercise is back for the next workout');
    ok((await weeks(page))[5][2] === (wk >= 8 ? 1 : wk + 1), 'the position advanced one week');
    same(await S(page, () => JSON.stringify(st.days.map(d => [d[0], d[1], d[2]]))), JSON.stringify(JSON.parse(plan).map(d => [d[0], d[1], d[2]])), 'split identical after the workout');
    // swap, then swap back by hand; free users get the paywall and no change
    await S(page, () => { st.day = 5; workout(); doSwap('Bench Press Flat', 0); });
    ok((await names(page))[0] === 'Bench Press Flat', 'second swap applied');
    await S(page, () => chooseExtraForMain(0)); ok(await S(page, () => /Back to planned: Dumbbell Flat Chest Press/.test(document.querySelector('#modalRoot .pick').textContent)), 'Replace dialog offers the planned exercise');
    await S(page, () => document.querySelector('#modalRoot .pick').click()); ok((await names(page))[0] === 'Dumbbell Flat Chest Press', 'restored by hand');
    await S(page, () => { zagSetDevPro(false); st.day = 5; workout(); doSwap('Bench Press Flat', 0); });
    ok(await S(page, () => zagEffectiveMains(5)[0] === 'Dumbbell Flat Chest Press'), 'free users cannot swap (paywall shown instead)');
    same(errors, [], 'no script errors during the swap run');
    await ctx.close(); }

  console.log('D. Split editing keeps weeks with their positions');
  { const { ctx, page, errors } = await open(null);
    const w0 = await weeks(page);
    await S(page, () => { moveDay(0, 1); dupDay(1); });
    let w = await weeks(page); same(w[1], w0[0], 'moved day keeps its weeks'); same(w[2], w0[0], 'duplicated day starts with the same weeks');
    await S(page, () => { st.day = 2; workout(); st.draft[k('Barbell Row', 5)] = { kg: 50, r: 8, done: true }; save(); finish(); }); await closePopup(page);
    w = await weeks(page); same(w[2], w0[0].map(x => x >= 8 ? 1 : x + 1), 'the copy advances'); same(w[1], w[2], 'the original moves with its copy (same day)');
    await S(page, () => { saveAsSplit(); loadOriginal(); });
    ok(await S(page, () => st.days.length === 14 && st.days.every(d => d[3] && d[3].s.length === d[1].length) && st.splitName === 'The Goat Split'), 'loading the original split rebuilds every position');
    await S(page, () => { loadSplit('Custom Split 1'); });
    same((await weeks(page))[2], w[2], 'a saved custom split keeps its own weeks');
    await S(page, () => { deleteSplitDay(0); addExerciseTo; st.days[0][1].push('Hack Squat'); syncPlannedDays(); save(); workout(); });
    ok(await S(page, () => st.days.length === 14 && st.days[0][3].s.length === st.days[0][1].length), 'deleting a day and adding an exercise stay consistent');
    same(errors, [], 'no script errors during split editing');
    await ctx.close(); }

  await browser.close(); server.close();
  console.log(`\n${pass} checks passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS FAILURE', e); process.exit(2); });

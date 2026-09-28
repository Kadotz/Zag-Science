
const warm=[[.2,20],[.4,8],[.6,5],[.75,3],[.9,2]];
const plans={1:[[.7,8],[.725,8],[.75,8],[.725,8],[.7,10]],2:[[.725,8],[.75,7],[.775,6],[.725,8],[.7,10]],3:[[.75,6],[.8,5],[.825,4],[.75,6],[.7,10]],4:[[.775,5],[.825,4],[.85,3],[.775,5],[.725,8]],5:[[.8,5],[.85,3],[.875,3],[.8,5],[.75,8]],6:[[.825,4],[.875,2],[.9,2],[.8,5]],7:[[.6,8],[.65,6],[.7,5]],8:[[.8,3],[.9,1],[.95,1],[1,1],[1.05,1]]};
const base=[["Pull 1",["Weighted Lat Pull Up","Barbell Row","Plate Loaded Row","Pin Machine Lat Pulldown Close Grip B","Straight Arm Pulldown"],["Pin Machine Lat Pulldown Close Grip Red","Pin Machine Lat Pulldown Wide Grip B","Pin Machine Lat Pulldown Wide Grip Red","Advanced Lat Pulldown","Plate Loaded Lat Pulldown Wide","Plate Loaded Lat Pulldown Close","Plate Loaded Straight Arm Pulldown","Dumbbell Rear Deltoids","Deadlift","Pin Machine Cable Row Close","Pin Machine Cable Row Wide","Pin Machine Lower Back","Dumbbell Row","Rack Pulls","Shrugs","Smith Shrug","Cable Shrug","Seated Rope High Row","Single Arm Low Cable Row","Laydown T-Bar Row","T-Bar Chest Pad Row"]],["Push 1",["Smith Shoulder Press","Pin Machine Decline Chest Press","Pin Machine Lateral Raise","Pin Machine Cable Fly","Pin Machine Shoulder Press Blue","Cable Front Raise"],["Dumbbell Incline Chest Press","Barbell Incline Chest Press","Barbell Decline Chest Press","Pin Machine Shoulder Press Red","Pin Machine Flat Chest Press","Pin Machine Incline Chest Press","Plate Loaded Incline Chest Press","Plate Loaded Flat Chest Press","Plate Loaded Decline Chest Press","Cable Face Pulls","Landmine Shoulder Press","Cable Single Arm Rear Deltoid","Plate Front Raise","Dumbbell Front Raise","Dumbbell Side Raise","Square Barbell Shoulder Press","Dumbbell Arnold Press","Cable Lateral Raise","Smith Incline Chest Press","Bench Press Flat","Dumbbell Flat Press","Log Press","Single Arm Dumbbell Raise","Cable Chest Fly","Cable Upward Chest Fly","Dumbbell Flat Chest Press","Pin Machine Chest Fly","Pin Machine Rear Deltoids","Dumbbell Seated Side Raise","Shrugs","Smith Shrug","Cable Shrug"]],["Arms",["Weighted Tricep Dips","Dumbbell Preacher Curl","Cable EZ Bar Tricep Extension","Cable Rope Bicep Curl","Cable Single Arm Tricep Extension","Pin Machine Bicep Curl"],["Cable Single Arm Bicep Curl","Dumbbell Spider Bicep Curl","Cable Double Rope Tricep Extension","Barbell Preacher Bicep Curl","Barbell Standing Bicep Curl","Dumbbell Standing Bicep Curl","Dumbbell Standing Bicep Hammer Curl","Cable Overhead Tricep Extension","Barbell Tricep Skull Crusher","Dumbbell Tricep Skull Crusher","Close Grip Bench Press","Cable Overhand Bicep Curl","Barbell Overhand Bicep Curl","Plate Loaded Bicep Curl","Plate Loaded Tricep Press","Pin Machine Tricep Press","Seated Dumbbell Bicep Curl"]],["Legs",["Deadlifts","Sitting Hamstring Curl","Leg Extension","Unilateral Leg Press","Squats","Sitting Calf Raises"],["Hack Squat","Single Leg Press","Donkey Calf Raise","Romanian Deadlifts","Lying Hamstring Curl","Plate Loaded Leg Press","Pin Machine Leg Press","Plate Loaded Leg Extension","Plate Loaded Hamstring Curl","Safety Bar Squat","Hip Abductor","Hip Adductor","Pendulum Squat","Split Squat","Weighted Lunges"]],["Pull 2",["Pin Machine Lat Pulldown Wide Grip B","Barbell Row","Plate Loaded Row","Advanced Lat Pulldown","Straight Arm Pulldown"],["Weighted Lat Pull Up","Pin Machine Lat Pulldown Close Grip B","Pin Machine Lat Pulldown Close Grip Red","Pin Machine Lat Pulldown Wide Grip Red","Plate Loaded Lat Pulldown Wide","Plate Loaded Lat Pulldown Close","Plate Loaded Straight Arm Pulldown","Dumbbell Rear Deltoids","Deadlift","Pin Machine Cable Row Close","Pin Machine Cable Row Wide","Pin Machine Lower Back","Dumbbell Row","Rack Pulls","Shrugs","Smith Shrug","Cable Shrug","Seated Rope High Row","Single Arm Low Cable Row","Laydown T-Bar Row","T-Bar Chest Pad Row"]],["Chest 1",["Dumbbell Flat Chest Press","Smith Incline Chest Press","Cable Chest Fly","Cable Upward Chest Fly","Pin Machine Decline Chest Press"],["Dumbbell Incline Chest Press","Barbell Incline Chest Press","Barbell Decline Chest Press","Pin Machine Flat Chest Press","Pin Machine Incline Chest Press","Plate Loaded Incline Chest Press","Plate Loaded Flat Chest Press","Plate Loaded Decline Chest Press","Pin Machine Cable Fly","Bench Press Flat","Dumbbell Flat Press","Pin Machine Chest Fly"]],["Shoulders 1",["Smith Shoulder Press","Dumbbell Seated Side Raise","Pin Machine Shoulder Press Blue","Cable Front Raise","Pin Machine Rear Deltoids","Shrugs"],["Pin Machine Shoulder Press Red","Cable Face Pulls","Landmine Shoulder Press","Cable Single Arm Rear Deltoid","Plate Front Raise","Dumbbell Front Raise","Pin Machine Lateral Raise","Square Barbell Shoulder Press","Dumbbell Arnold Press","Cable Lateral Raise","Log Press","Smith Shrug","Cable Shrug"]],["Pull 1",["Weighted Lat Pull Up","Barbell Row","Plate Loaded Row","Pin Machine Lat Pulldown Close Grip B","Straight Arm Pulldown"],["Pin Machine Lat Pulldown Close Grip Red","Pin Machine Lat Pulldown Wide Grip B","Pin Machine Lat Pulldown Wide Grip Red","Advanced Lat Pulldown","Plate Loaded Lat Pulldown Wide","Plate Loaded Lat Pulldown Close","Plate Loaded Straight Arm Pulldown","Dumbbell Rear Deltoids","Deadlift","Pin Machine Cable Row Close","Pin Machine Cable Row Wide","Pin Machine Lower Back","Dumbbell Row","Rack Pulls","Shrugs","Smith Shrug","Cable Shrug","Seated Rope High Row","Single Arm Low Cable Row","Laydown T-Bar Row","T-Bar Chest Pad Row"]],["Push 2",["Smith Flat Chest Press","Pin Machine Chest Fly","Pin Machine Lateral Raise","Pin Machine Decline Chest Press","Cable Front Raise","Cable Upward Chest Fly"],["Dumbbell Incline Chest Press","Barbell Incline Chest Press","Barbell Decline Chest Press","Pin Machine Shoulder Press Red","Pin Machine Flat Chest Press","Pin Machine Incline Chest Press","Plate Loaded Incline Chest Press","Plate Loaded Flat Chest Press","Plate Loaded Decline Chest Press","Cable Face Pulls","Landmine Shoulder Press","Cable Single Arm Rear Deltoid","Plate Front Raise","Dumbbell Front Raise","Dumbbell Side Raise","Smith Shoulder Press","Pin Machine Cable Fly","Pin Machine Shoulder Press Blue","Square Barbell Shoulder Press","Dumbbell Arnold Press","Cable Lateral Raise","Smith Incline Chest Press","Bench Press Flat","Dumbbell Flat Press","Log Press","Single Arm Dumbbell Raise","Cable Chest Fly","Pin Machine Rear Deltoids","Dumbbell Seated Side Raise","Shrugs","Smith Shrug","Cable Shrug"]],["Arms",["Weighted Tricep Dips","Dumbbell Preacher Curl","Cable EZ Bar Tricep Extension","Cable Rope Bicep Curl","Cable Single Arm Tricep Extension","Pin Machine Bicep Curl"],["Cable Single Arm Bicep Curl","Dumbbell Spider Bicep Curl","Cable Double Rope Tricep Extension","Barbell Preacher Bicep Curl","Barbell Standing Bicep Curl","Dumbbell Standing Bicep Curl","Dumbbell Standing Bicep Hammer Curl","Cable Overhead Tricep Extension","Barbell Tricep Skull Crusher","Dumbbell Tricep Skull Crusher","Close Grip Bench Press","Cable Overhand Bicep Curl","Barbell Overhand Bicep Curl","Plate Loaded Bicep Curl","Plate Loaded Tricep Press","Pin Machine Tricep Press","Seated Dumbbell Bicep Curl"]],["Legs",["Deadlifts","Sitting Hamstring Curl","Leg Extension","Unilateral Leg Press","Squats","Sitting Calf Raises"],["Hack Squat","Single Leg Press","Donkey Calf Raise","Romanian Deadlifts","Lying Hamstring Curl","Plate Loaded Leg Press","Pin Machine Leg Press","Plate Loaded Leg Extension","Plate Loaded Hamstring Curl","Safety Bar Squat","Hip Abductor","Hip Adductor","Pendulum Squat","Split Squat","Weighted Lunges"]],["Pull 2",["Pin Machine Lat Pulldown Wide Grip B","Barbell Row","Plate Loaded Row","Advanced Lat Pulldown","Straight Arm Pulldown"],["Weighted Lat Pull Up","Pin Machine Lat Pulldown Close Grip B","Pin Machine Lat Pulldown Close Grip Red","Pin Machine Lat Pulldown Wide Grip Red","Plate Loaded Lat Pulldown Wide","Plate Loaded Lat Pulldown Close","Plate Loaded Straight Arm Pulldown","Dumbbell Rear Deltoids","Deadlift","Pin Machine Cable Row Close","Pin Machine Cable Row Wide","Pin Machine Lower Back","Dumbbell Row","Rack Pulls","Shrugs","Smith Shrug","Cable Shrug","Seated Rope High Row","Single Arm Low Cable Row","Laydown T-Bar Row","T-Bar Chest Pad Row"]],["Shoulders 2",["Smith Shoulder Press","Dumbbell Side Raise","Pin Machine Shoulder Press Blue","Cable Front Raise","Pin Machine Rear Deltoids","Shrugs"],["Pin Machine Shoulder Press Red","Cable Face Pulls","Landmine Shoulder Press","Cable Single Arm Rear Deltoid","Plate Front Raise","Dumbbell Front Raise","Pin Machine Lateral Raise","Square Barbell Shoulder Press","Dumbbell Arnold Press","Cable Lateral Raise","Log Press","Smith Shrug","Cable Shrug"]],["Chest 2",["Dumbbell Flat Chest Press","Smith Incline Chest Press","Cable Chest Fly","Cable Upward Chest Fly","Pin Machine Incline Chest Press"],["Dumbbell Incline Chest Press","Barbell Incline Chest Press","Barbell Decline Chest Press","Pin Machine Flat Chest Press","Plate Loaded Incline Chest Press","Plate Loaded Flat Chest Press","Plate Loaded Decline Chest Press","Pin Machine Decline Chest Press","Pin Machine Cable Fly","Bench Press Flat","Dumbbell Flat Press","Pin Machine Chest Fly"]]];


const ORIGINAL=JSON.parse(JSON.stringify(base));
const FLAME="assets/images/asset-013-52cfb6a3c90e.png";
const seed={"Weighted Lat Pull Up":25,"Wide Pulldown B":250,"Wide Pulldown R":275,"Barbell Row":170,"Free Weight Row":100,"Close Pulldown B":225,"Close Pulldown R":230,"Advanced Lat Pull Down":150,"Straight Arm Pulldown":90,"Shoulder Smyth Press":100,"Lateral Raise Pin":70,"Cable Fly Pin":100,"Tri Dips":129,"DB Preacher Curl":60,"Tri EZ Extension":105,"Rope Curl":90,"Single Rope Extension":40,"Bicep Machine":175,"Deadlifts":170,"Siting Hammy Curl":132,"Leg Extension":40,"Leg Extension (R)":40,"Squats":100,"Sitting Calfs":100};
let raw=JSON.parse(localStorage.getItem("zagScienceV2")||"null");
let st=raw||{day:0,weeks:{},max:{...seed},draft:{},history:[],sound:true,days:JSON.parse(JSON.stringify(base)),splitName:"The Goat Split",customSplits:{},prHistory:{},repsAtMax:{}};

// First-ever launch only: stagger exercise weeks in ascending order.
// Exercise 1 = Week 1, Exercise 2 = Week 2 ... Exercise 8 = Week 8,
// then the sequence repeats 1–8 for later exercises.
// Because this only runs when `raw` is empty, reopening the app never resets progression.
if(!raw){
  let ordered=[],seen=new Set();
  st.days.forEach(day=>{
    (day[1]||[]).forEach(ex=>{
      if(!seen.has(ex)){seen.add(ex);ordered.push(ex)}
    });
  });
  ordered.forEach((ex,i)=>st.weeks[ex]=(i%8)+1);
}

st.max={...seed,...(st.max||{})}; st.days=st.days||JSON.parse(JSON.stringify(base)); st.splitName=st.splitName||"The Goat Split"; st.customSplits=st.customSplits||{}; st.prHistory=st.prHistory||{}; st.repsAtMax=st.repsAtMax||{}; st.history=st.history||[]; st.draft=st.draft||{}; st.weeks=st.weeks||{}; st.units=st.units||"kg"; st.groups=st.groups||[]; st.groupView=st.groupView||"total"; st.groupExercise=st.groupExercise||"Bench Press";
if(st.groupsOnboardingBuild!==1){st.demoGroup=null;st.groupsOnboardingBuild=1;save&&save();}
st.notifications=st.notifications||{};
if(st.notifications.workoutReminder===undefined)st.notifications.workoutReminder=true;
if(st.notifications.leaderboardChanges===undefined)st.notifications.leaderboardChanges=true;
if(st.notifications.groupPRs===undefined)st.notifications.groupPRs=true;
if(st.notifications.streakScore===undefined)st.notifications.streakScore=true;
if(st.streakRestDays===undefined)st.streakRestDays=2;
if(st.streakReminderTime===undefined)st.streakReminderTime="19:00";
if(st.stickWeek===undefined)st.stickWeek=false;
st.streak=st.streak||{count:0,lastWorkout:"",weekKey:"",restUsed:0,lastPopup:""};

st.plannedDays=st.plannedDays||JSON.parse(JSON.stringify(st.days));
function syncPlannedDays(){st.plannedDays=JSON.parse(JSON.stringify(st.days))}


// ZAG exercise-library migration v3: preserve historical/max/week data under renamed exercises.
(function(){
 if(localStorage.getItem("zagExerciseLibraryV3")) return;
 const aliases={"Free Weight Row":"Plate Loaded Row","Close Pulldown B":"Pin Machine Lat Pulldown Close Grip B","Close Pulldown R":"Pin Machine Lat Pulldown Close Grip Red","Wide Pulldown B":"Pin Machine Lat Pulldown Wide Grip B","Wide Pulldown R":"Pin Machine Lat Pulldown Wide Grip Red","Shoulder Smyth Press":"Smith Shoulder Press","Shoulder Smyth Machine":"Smith Shoulder Press","Decline Machine Press":"Pin Machine Decline Chest Press","Decline Chest Machine":"Pin Machine Decline Chest Press","Lateral Raise Pin":"Pin Machine Lateral Raise","Cable Fly Pin":"Pin Machine Cable Fly","Pin Shoulder Blue":"Pin Machine Shoulder Press Blue","Front Raise Cable":"Cable Front Raise","Stand Square BB Shoulder":"Square Barbell Shoulder Press","Arnold DB":"Dumbbell Arnold Press","Single Lat Raise Pin":"Cable Lateral Raise","Incline Smith":"Smith Incline Chest Press","Incline Smyth":"Smith Incline Chest Press","Bench":"Bench Press Flat","DB Press":"Dumbbell Flat Press","Db press / bench":"Dumbbell Flat Chest Press","Cable Fly / pin":"Pin Machine Chest Fly","Lateral Raise / pin":"Pin Machine Lateral Raise","Chest pin red / blue / incline":"Pin Machine Decline Chest Press","Front raise db / plate":"Cable Front Raise","Upward cable fly":"Cable Upward Chest Fly","Dumbell Flat":"Dumbbell Flat Chest Press","Cable Fly":"Cable Chest Fly","Upward Cable Fly":"Cable Upward Chest Fly","Incline Chest Machine":"Pin Machine Incline Chest Press","Close Grip Shoulder Machine Blue":"Pin Machine Shoulder Press Blue","Close Grip Shoulder Red":"Pin Machine Shoulder Press Red","Rear Delt Machine":"Pin Machine Rear Deltoids","Cable Side Raise":"Dumbbell Seated Side Raise","Dumbell Side Raise":"Dumbbell Side Raise","Tri Dips":"Weighted Tricep Dips","DB Preacher Curl":"Dumbbell Preacher Curl","Tri EZ Extension":"Cable EZ Bar Tricep Extension","Rope Curl":"Cable Rope Bicep Curl","Single Rope Extension":"Cable Single Arm Tricep Extension","Bicep Machine":"Pin Machine Bicep Curl","Single Cable Curl":"Cable Single Arm Bicep Curl","Single Spider":"Dumbbell Spider Bicep Curl","Double Rope Extension":"Cable Double Rope Tricep Extension","Uni Press / Leg Press":"Unilateral Leg Press","Sitting Calfs":"Sitting Calf Raises","Press Calf":"Donkey Calf Raise","Stiff Deads":"Romanian Deadlifts","Lying Curl":"Lying Hamstring Curl","Siting Hammy Curl":"Sitting Hamstring Curl","Sitting Hammy Curl":"Sitting Hamstring Curl"};
 function moveMap(obj){
   if(!obj) return;
   Object.keys(aliases).forEach(old=>{
     const neu=aliases[old];
     if(obj[old]!==undefined && obj[neu]===undefined) obj[neu]=obj[old];
   });
 }
 moveMap(st.max); moveMap(st.weeks); moveMap(st.prHistory); moveMap(st.repsAtMax);
 if(st.splitName==="The Goat Split" || !st.splitName){
   st.days=JSON.parse(JSON.stringify(base));
   st.plannedDays=JSON.parse(JSON.stringify(base));
 }
 localStorage.setItem("zagExerciseLibraryV3","1");
 save();
})();


// Push 2 exercise 1 migration: update existing saved installs as well as fresh installs.
(function(){
 if(localStorage.getItem("zagPush2SmithFlatV1")) return;
 [st.days,st.plannedDays].forEach(days=>{
   if(!Array.isArray(days)) return;
   days.forEach(day=>{
     if(day && day[0]==="Push 2" && Array.isArray(day[1]) && day[1][0]==="Dumbbell Flat Chest Press") day[1][0]="Smith Flat Chest Press";
   });
 });
 localStorage.setItem("zagPush2SmithFlatV1","1");
 save();
})();

function save(){localStorage.setItem("zagScienceV2",JSON.stringify(st))}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function q(s){return String(s).replaceAll("\\","\\\\").replaceAll("'","\\'")}
function sets(ex){
 let m=+st.max[ex]||0,w=st.stickWeek?"stick":(st.weeks[ex]||1);
 if(w==="stick"){
   let prescribed=warm.slice(0,4).concat(plans[8]).map(x=>({p:x[0],r:x[1],kg:Math.round(m*x[0]*10)/10}));
   return prescribed.concat(Array.from({length:4},()=>({p:"",r:"",kg:"",backoff:true})));
 }
 let wu=w===8?warm.slice(0,4):warm;
 return wu.concat(plans[w]).map(x=>({p:x[0],r:x[1],kg:Math.round(m*x[0]*10)/10}))
}
function k(ex,i){return st.day+"|"+ex+"|"+i}
function setActiveNav(name){document.querySelectorAll(".nav button").forEach(b=>b.classList.remove("active"));document.getElementById("nav-"+name)?.classList.add("active")}
function audioCtx(){window._zagAudio=window._zagAudio||new(window.AudioContext||window.webkitAudioContext)();if(window._zagAudio.state==="suspended")window._zagAudio.resume();return window._zagAudio}
function noise(duration=.025,gain=.07,filter=2400,delay=0){if(!st.sound)return;let a=audioCtx(),n=Math.floor(a.sampleRate*duration),b=a.createBuffer(1,n,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);let s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain(),t=a.currentTime+delay;s.buffer=b;f.type="bandpass";f.frequency.value=filter;g.gain.value=gain;s.connect(f);f.connect(g);g.connect(a.destination);s.start(t)}
function tone(freq,dur,gain=.03,type="sine",delay=0){if(!st.sound)return;let a=audioCtx(),o=a.createOscillator(),g=a.createGain(),t=a.currentTime+delay;o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(gain,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+dur)}
function clickSound(){noise(.025,.07,2400);tone(160,.025,.018,"square")}
function slide(strength=.025,start=.12,len=.22){if(!st.sound)return;let a=audioCtx(),o=a.createOscillator(),g=a.createGain(),t=a.currentTime+start;o.type="sawtooth";o.frequency.setValueAtTime(115,t);o.frequency.exponentialRampToValueAtTime(55,t+len);g.gain.setValueAtTime(strength,t);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+len);noise(len,.035,700,start)}
function returnSound(){noise(.045,.11,1700);tone(125,.04,.03,"square");tone(280,.025,.012,"triangle",.012);tone(1320,.18,.055,"sine",.055);tone(1760,.11,.025,"sine",.07);slide()}
const streakArmAsset='assets/images/asset-014-8ca036600628.png';
const streakRestArmAsset='assets/images/asset-015-721cec02884e.png';
const streakLostArmAsset='assets/images/asset-016-641d13316926.png';
function streakDayKey(d=new Date()){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function parseStreakDay(k){let [y,m,d]=k.split("-").map(Number);return new Date(y,m-1,d)}
function streakWeekKey(d=new Date()){let x=new Date(d);x.setHours(0,0,0,0);let day=(x.getDay()+6)%7;x.setDate(x.getDate()-day);return streakDayKey(x)}
function daysBetween(a,b){return Math.round((parseStreakDay(b)-parseStreakDay(a))/86400000)}
function ensureStreakState(){
 st.streak=st.streak||{};
 st.streak.count=Number(st.streak.count||0);
 st.streak.lastWorkout=st.streak.lastWorkout||"";
 st.streak.lastProcessed=st.streak.lastProcessed||"";
 st.streak.weekKey=st.streak.weekKey||streakWeekKey();
 st.streak.restUsed=Number(st.streak.restUsed||0);
 st.streak.lastPopup=st.streak.lastPopup||"";
 st.streak.weekRest=st.streak.weekRest||{};
 st.streak.justLost=!!st.streak.justLost;
}
function processStreakCalendar(){
 ensureStreakState();
 let today=streakDayKey(), todayDate=parseStreakDay(today);
 // Start processing from the day after the last processed day. For existing installs,
 // don't retroactively punish days before this feature was installed.
 if(!st.streak.lastProcessed){st.streak.lastProcessed=today;save();return}
 let cursor=parseStreakDay(st.streak.lastProcessed);cursor.setDate(cursor.getDate()+1);
 let changed=false;
 while(cursor<todayDate){
   let key=streakDayKey(cursor), wk=streakWeekKey(cursor);
   st.streak.weekRest[wk]=Number(st.streak.weekRest[wk]||0);
   let trained=(st.streak.lastWorkout===key) || (Array.isArray(st.history)&&st.history.some(h=>{
     let raw=h.date||h.when||h.timestamp||h.time;
     if(!raw)return false;
     let d=new Date(raw);return !isNaN(d)&&streakDayKey(d)===key;
   }));
   if(!trained){
     if(st.streak.weekRest[wk] < Number(st.streakRestDays||0)){
       st.streak.weekRest[wk]++; // protected rest day
       st.streak.lastRestDay=key;
     }else{
       if((st.streak.count||0)>0) st.streak.justLost=true;
       st.streak.count=0; // allowance exceeded
     }
   }
   st.streak.lastProcessed=key;changed=true;cursor.setDate(cursor.getDate()+1);
 }
 let wk=streakWeekKey();
 st.streak.weekKey=wk;
 st.streak.restUsed=Number(st.streak.weekRest[wk]||0);
 if(changed)save();
}
function ensureStreakWeek(){processStreakCalendar()}
function recordStreakWorkout(){
 processStreakCalendar();const k=streakDayKey();
 const alreadyToday=st.streak.lastWorkout===k;
 if(!alreadyToday) st.streak.count=(st.streak.count||0)+1;
 st.streak.justLost=false;
 zagBrokenZeroPreview=false;
 zagRestDayCheckPreview=false;
 st.streak.lastWorkout=k;
 st.streak.lastPopup="";
 st.streak.lastProcessed=k;
 save();
}
function streakReminderDue(){
 if(!st.notifications.streakScore)return false;
 processStreakCalendar();
 if(st.streak.lastWorkout===streakDayKey())return false;
 let [hh,mm]=(st.streakReminderTime||"19:00").split(":").map(Number), now=new Date();
 return now.getHours()>hh || (now.getHours()===hh && now.getMinutes()>=mm);
}
function maybeBrowserStreakReminder(){
 if(!streakReminderDue())return;
 let key="zagStreakReminder:"+streakDayKey();
 if(sessionStorage.getItem(key))return;
 sessionStorage.setItem(key,"1");
 if("Notification" in window && Notification.permission==="granted"){
   try{new Notification("ZAG SCIENCE — Don't lose your streak",{body:`Keep your ${st.streak.count||0}-day streak going. Get today's workout in.`})}catch(e){}
 }
}
// One-time demo: begin at a broken 0-day streak, then return to real streak logic after a completed workout.
let zagBrokenZeroPreview=false;
let zagRestDayCheckPreview=false;
function streakWidgetHTML(){
 processStreakCalendar();
 if(zagRestDayCheckPreview){
  const arm=streakRestArmAsset;
  const shownCount=Math.max(1,Number(st.streak.count||0));
  const shownRest=Math.max(1,Number(st.streak.restUsed||0));
  const dots=[0,1,2,3,4,5,6].map((_,i)=>`<span class="streakDot ${i<Math.min(7,shownCount%8)?'on':''}">${i<Math.min(7,shownCount%8)?'✓':''}</span>`).join("");
  return `<div class="streakWidget"><div class=streakArmWrap><img id=homeStreakStateArm src="${arm}" alt="Rest day arm"></div><div class=grow><div><span class=streakNum>${shownCount}</span> <b>Day Streak</b></div><div class=note>🛡️ Rest day used — streak saved</div><div class=streakWeek>${dots}</div><div class=note style="margin-top:6px">${shownRest}/${st.streakRestDays} rest days used this week</div></div></div>`;
 }
 if(zagBrokenZeroPreview){
  const arm=streakLostArmAsset;
  const dots=[0,1,2,3,4,5,6].map(()=>`<span class="streakDot"></span>`).join("");
  return `<div class="streakWidget streakLost"><div class=streakArmWrap><img id=homeStreakStateArm src="${arm}" alt="Broken streak arm"></div><div class=grow><div><span class=streakNum>0</span> <b>Day Streak</b></div><div class=note>Streak lost — complete a workout to start again.</div><div class=streakWeek>${dots}</div><div class=note style="margin-top:6px">${Number(st.streak.restUsed||0)}/${st.streakRestDays} rest days used this week</div></div></div>`;
 }
 const today=streakDayKey();
 const historyDone=Array.isArray(st.history)&&st.history.some(h=>{let raw=h.date||h.when||h.timestamp||h.time;if(!raw)return false;let d=new Date(raw);return !isNaN(d)&&streakDayKey(d)===today;});
 const done=(st.streak.lastWorkout===today)||historyDone;
 if(done && st.streak.lastWorkout!==today){st.streak.lastWorkout=today;st.streak.justLost=false;save();}
 // Rest is a real recorded state, never inferred just because rest days were used earlier this week.
 const restSaved=!done && !st.streak.justLost && !!st.streak.lastRestDay && st.streak.lastRestDay===st.streak.lastProcessed;
 const arm=st.streak.justLost?streakLostArmAsset:(done?streakArmAsset:(restSaved?streakRestArmAsset:streakRestArmAsset));
 const status=st.streak.justLost?"Streak lost — start again today.":(done?"Workout complete — streak extended ⚡":(restSaved?"🛡️ Rest day used — streak saved":"Keep your streak alive today."));
 let dots=[0,1,2,3,4,5,6].map((_,i)=>`<span class="streakDot ${i<Math.min(7,(st.streak.count||0)%8)?'on':''}">${i<Math.min(7,(st.streak.count||0)%8)?'✓':''}</span>`).join("");
 return `<div class="streakWidget ${st.streak.justLost?'streakLost':''}"><div class=streakArmWrap><img id=homeStreakStateArm src="${arm}" alt="Streak state arm"></div><div class=grow><div><span class=streakNum>${st.streak.count||0}</span> <b>Day Streak</b></div><div class=note>${status}</div><div class=streakWeek>${dots}</div><div class=note style="margin-top:6px">${Number(st.streak.restUsed||0)}/${st.streakRestDays} rest days used this week</div></div></div>`;
}
let zagFinishAdvancePending=false;
function showStreakPopup(force=false){
 if(!force&&!st.notifications.streakScore)return;ensureStreakWeek();let k=streakDayKey();
 if(!force&&st.streak.lastPopup===k)return;
 const historyDone=Array.isArray(st.history)&&st.history.some(h=>{let raw=h.date||h.when||h.timestamp||h.time;if(!raw)return false;let d=new Date(raw);return !isNaN(d)&&streakDayKey(d)===k;});
 let done=(zagBrokenZeroPreview||zagRestDayCheckPreview)?false:(st.streak.lastWorkout===k)||historyDone;
 let lost=zagBrokenZeroPreview?true:(zagRestDayCheckPreview?false:!!st.streak.justLost);
 let restSaved=zagRestDayCheckPreview||(!done&&!lost&&!!st.streak.lastRestDay&&st.streak.lastRestDay===st.streak.lastProcessed);
 // Don't show a REST DAY popup merely because today has no workout yet.
 if(!force&&!done&&!lost&&!restSaved)return;
 let title=lost?"STREAK LOST":(done?"WORKOUT COMPLETE":"REST DAY");
 let msg=lost?"Start again today and build it back up.":(done?"Workout complete. Your streak has been extended.":`Streak protected. Rest day ${Number(st.streak.restUsed||0)} of ${st.streakRestDays} used.`);
 let arm=lost?streakLostArmAsset:(done?streakArmAsset:streakRestArmAsset);
 let o=document.createElement("div");o.className="streakOverlay";o.innerHTML=`<div class=streakPopup><div class="streakHero ${lost?'streakLost':''}"><div class=streakArmWrap><img class=streakPopupStateArm src="${arm}" alt="Streak state arm"></div><div class=big>${st.streak.count||0}</div></div><h2>${title}</h2><div style="font-size:18px;font-weight:900;color:#ef9cff">DAY STREAK</div><p>${msg}</p><button class=pick onclick="zagStreakPopupContinue(this)">LET'S GO</button></div>`;
 document.body.appendChild(o);st.streak.lastPopup=k;save();
}
function workout(){setActiveNav("workout");let d=st.days[st.day],s=`<div class=top><button class=btn onclick="move(-1)">‹ Back</button><div class=title><h1>${esc(d[0])}</h1><p>${esc(st.splitName)} • Day ${st.day+1}/${st.days.length}</p></div><button class=btn onclick="move(1)">Next ›</button></div>`;
d[1].forEach((ex,e)=>{let ts=sets(ex),w=st.stickWeek?"stick":(st.weeks[ex]||1);s+=`<section class=exercise><div class=head><div class=n>${e+1}</div><div class=name>${esc(ex)}</div><select class=week style="position:absolute;left:4px;right:4px;top:4px;width:${st.stickWeek?'64':'68'}px;padding:3px 1px;font-size:8px" onchange="setExerciseWeek('${q(ex)}',this.value)">${st.stickWeek?`<option value="stick" selected>Stick Week</option>`:[1,2,3,4,5,6,7,8].map(n=>`<option value="${n}" ${n==w?'selected':''}>Week ${n}</option>`).join("")}</select><button class="btn editMain" onclick="chooseExtraForMain(${e})">Edit</button></div><div class=maxbox><span>↗</span> Max: ${st.max[ex]||0}kg</div><table><tr><th>Set</th><th>%</th><th>Target<br>Weight</th><th>Target<br>Reps</th><th>Actual<br>Weight</th><th>Actual<br>Reps</th><th>Quick</th></tr>`;
ts.forEach((t,i)=>{let v=st.draft[k(ex,i)]||{},stick=st.stickWeek,workStart=stick?4:5,setLabel=t.backoff?"B"+(i-8):(i<workStart?"W"+(i+1):i-workStart+1),pct=t.backoff?"":(Math.round(t.p*1000)/10+"%");s+=`<tr><td>${setLabel}</td><td>${pct}</td><td>${t.backoff?"":t.kg}</td><td>${t.backoff?"":t.r}</td><td><input class=cell type=number inputmode=decimal value="${v.kg??""}" onchange="field('${q(k(ex,i))}','kg',this.value)"></td><td><input class=cell type=number inputmode=numeric value="${v.r??""}" onchange="field('${q(k(ex,i))}','r',this.value)"></td><td><button class="fist ${v.done?'done':''}" onclick="one('${q(ex)}',${i})">&nbsp;</button></td></tr>`});s+=`</table><button class=exComplete onclick="allExercise('${q(ex)}')"><img class=flameimg src="assets/images/asset-017-fa0e2ca33314.png">COMPLETE<br>ALL SETS</button></section>`});
s+=`<button class=finish onclick=finish()>✓ FINISH WORKOUT</button><section class=extras><h2>Extras / Replacements</h2>${d[2].map(x=>`<div class=extra><span>${esc(x)}</span><input class=cell type=number value="${st.max[x]||""}" placeholder="Max" onchange="st.max['${q(x)}']=+this.value;save()"><button class=btn onclick="openSwap('${q(x)}')">Swap</button></div>`).join("")}<button class=btn style="margin-top:6px" onclick=addEx()>+ Add Exercise</button></section>`;document.getElementById("screen").innerHTML=s}
function setExerciseWeek(ex,w){if(st.stickWeek)return;st.weeks[ex]=+w||1;save();workout()}
function toggleStickWeek(){st.stickWeek=!st.stickWeek;save();settings()}
function field(key,f,v){st.draft[key]=st.draft[key]||{};st.draft[key][f]=v;save()}
function one(ex,i){let key=k(ex,i),t=sets(ex)[i];if(st.draft[key]?.done)delete st.draft[key];else st.draft[key]={kg:t.kg,r:t.r,done:true};clickSound();save();workout()}
function allExercise(ex){sets(ex).forEach((t,i)=>st.draft[k(ex,i)]={kg:t.kg,r:t.r,done:true});clickSound();save();workout()}
function move(n){st.day=(st.day+n+st.days.length)%st.days.length;save();workout()}
function closeModal(){document.getElementById("modalRoot").innerHTML=""}
function modal(title,body){document.getElementById("modalRoot").innerHTML=`<div class=modal onclick="if(event.target===this)closeModal()"><div class=modalbox><button class="btn close" onclick=closeModal()>×</button><h2>${title}</h2>${body}</div></div>`}
function openSwap(extra){let mains=st.days[st.day][1];modal("Swap "+esc(extra),`<p class=small>Tap the current exercise you want to replace.</p>${mains.map((x,i)=>`<button class=pick onclick="doSwap('${q(extra)}',${i})">${i+1}. ${esc(x)}</button>`).join("")}`)}
function doSwap(extra,i){let d=st.days[st.day],j=d[2].indexOf(extra);if(j<0)return;let old=d[1][i];d[1][i]=extra;d[2][j]=old;save();closeModal();workout()}
function chooseExtraForMain(i){let extras=st.days[st.day][2];modal("Replace "+esc(st.days[st.day][1][i]),`<p class=small>Choose an extra exercise.</p>${extras.map(x=>`<button class=pick onclick="doSwap('${q(x)}',${i})">${esc(x)}</button>`).join("")}`)}
function addEx(){let x=prompt("New exercise name:");if(!x)return;st.days[st.day][2].push(x.trim());st.max[x.trim()]=+(prompt("Max weight (kg):")||0);save();workout()}
function finish(){let d=st.days[st.day],rec={date:new Date().toLocaleString(),day:d[0],sets:[]},prs=[];d[1].forEach(ex=>sets(ex).forEach((t,i)=>{let v=st.draft[k(ex,i)];if(v&&v.kg!==""&&v.r!==""){rec.sets.push({exercise:ex,kg:+v.kg,reps:+v.r});if(+v.r>=t.r&&+v.kg>(st.max[ex]||0)){let old=st.max[ex]||0;st.prHistory[ex]=st.prHistory[ex]||[];st.prHistory[ex].unshift({date:new Date().toLocaleDateString(),from:old,to:+v.kg,reps:+v.r});st.max[ex]=+v.kg;st.repsAtMax[ex]=+v.r;prs.push(ex+" "+v.kg+"kg")}}}));st.history.unshift(rec);
d[1].forEach(ex=>{
 let w=Number(st.weeks[ex]||1);
 st.weeks[ex]=w>=8?1:w+1;
});
st.draft={};
if(st.plannedDays&&st.plannedDays[st.day]) st.days[st.day]=JSON.parse(JSON.stringify(st.plannedDays[st.day]));
recordStreakWorkout();save();returnSound();zagFinishAdvancePending=true;showStreakPopup(true)}
function zagStreakPopupContinue(btn){if(btn&&btn.closest)btn.closest('.streakOverlay')?.remove();if(zagFinishAdvancePending){zagFinishAdvancePending=false;st.day=(st.day+1)%st.days.length;save();workout();requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:"instant"}));}}
function home(){setActiveNav("home");let s=`<div class=title><h1>${esc(st.splitName)}</h1><p>${st.days.length}-day rotation</p></div><div class="zagHomeCards"><button id="zagPersistentInfo" class="zagHomeCard" type="button"><b>ⓘ Information</b><span>How Zag Science works</span></button><button class="zagHomeCard zagProCard" type="button" onclick="openZagPro(event)"><b><img class="zagNeedle" src="assets/images/asset-018-3833c5169ef7.png" alt=""></b><span>Unlock the full app</span></button></div>${streakWidgetHTML()}<div class=section><div class=row><b class=grow>Workout Split</b><button class=btn onclick=editSplit()>Edit Split</button></div></div>${st.days.map((d,i)=>`<button class=btn style="width:100%;margin:3px 0;text-align:left;font-size:11px" onclick="st.day=${i};save();workout()">Day ${i+1} — ${esc(d[0])} <span style="float:right">›</span></button>`).join("")}`;if(Object.keys(st.customSplits).length)s+=`<div class=section><h2>Saved Splits</h2>${Object.keys(st.customSplits).map(n=>`<button class=pick onclick="loadSplit('${q(n)}')">${esc(n)}</button>`).join("")}</div>`;document.getElementById("screen").innerHTML=s;setTimeout(()=>showStreakPopup(),120)}
function editSplit(){
  let saved=Object.keys(st.customSplits||{});
  let savedHtml=saved.length?`<div class=extraslabel style="margin-top:12px">CUSTOM SPLITS</div>${saved.map(n=>`<div class=extra><button type="button" class=pick style="margin:0;flex:1;text-align:left" onclick="loadSplitFromEditor('${q(n)}')">${esc(n)}</button><button type="button" class=btn onclick="renameSavedSplit('${q(n)}')">Rename</button><button type="button" class="btn danger" onclick="deleteSavedSplit('${q(n)}')">×</button></div>`).join("")}`:"";
  let body=`<p class=small>Edit day names/order, duplicate or delete days, then save it as your own split.</p>
  <div id=dayEditor>${st.days.map((d,i)=>dayEditRow(d,i)).join("")}</div>
  <button type="button" class=pick onclick="openAddDay()">+ Add Day</button>
  <button type="button" class=pick onclick="editDayExercises()">Edit exercises in a day</button>
  <button type="button" class=pick onclick="saveAsSplit()">Save as New Split</button>
  <button type="button" class=pick onclick="loadOriginal()">Load Original Goat Split</button>${savedHtml}`;
  modal("Edit Split",body)
}
function dayEditRow(d,i){return `<div class=dayedit><b>${i+1}</b><input value="${esc(d[0])}" onchange="renameDay(${i},this.value)"><span><button type="button" class=btn onclick="moveDay(${i},-1)">↑</button><button type="button" class=btn onclick="moveDay(${i},1)">↓</button><button type="button" class=btn onclick="dupDay(${i})">＋</button><button type="button" class="btn danger" onclick="event.preventDefault();event.stopPropagation();deleteSplitDay(${i});return false;">×</button></span></div>`}
function renameDay(i,v){st.days[i][0]=v.trim()||st.days[i][0];syncPlannedDays();save()}
function moveDay(i,n){let j=i+n;if(j<0||j>=st.days.length)return;[st.days[i],st.days[j]]=[st.days[j],st.days[i]];syncPlannedDays();save();editSplit()}
function dupDay(i){st.days.splice(i+1,0,JSON.parse(JSON.stringify(st.days[i])));syncPlannedDays();save();editSplit()}
function deleteSplitDay(i){if(!Number.isInteger(i)||i<0||i>=st.days.length)return;if(st.days.length<=1){alert("A split needs at least one day.");return;}st.days.splice(i,1);st.day=Math.min(st.day,st.days.length-1);syncPlannedDays();save();editSplit()}
function textEntryModal(title,label,value,onSave){
  modal(title,`<p class=small>${esc(label)}</p><input id=textEntryInput class=cell style="width:100%;box-sizing:border-box;font-size:16px" value="${esc(value||"")}" autocomplete=off><button type="button" class=pick id=textEntrySave>Save</button>`);
  let inp=document.getElementById("textEntryInput"),btn=document.getElementById("textEntrySave");
  btn.onclick=()=>{let v=inp.value.trim();if(!v)return;onSave(v)};
  inp.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();btn.click()}};
  setTimeout(()=>inp.focus(),50)
}
function openAddDay(){textEntryModal("Add Day","Day name","",n=>{st.days.push([n,[],[]]);syncPlannedDays();save();editSplit()})}
function addDay(){openAddDay()}
function editDayExercises(){modal("Choose Day",st.days.map((d,i)=>`<button type="button" class=pick onclick="dayExerciseEditor(${i})">${i+1}. ${esc(d[0])}</button>`).join(""))}
function dayExerciseEditor(i){
 let d=st.days[i];
 const row=(x,j,type)=>`<div class="extra splitDragExercise" draggable="true" data-day="${i}" data-type="${type}" data-index="${j}">
   <span class=splitDragHandle aria-hidden=true>⋮⋮</span><span class=splitDragName>${esc(x)}</span>
   <button type="button" class="btn danger" onclick="event.stopPropagation();removeExercise(${i},${type},${j})">×</button>
 </div>`;
 modal("Edit "+esc(d[0]),`
   <p class="small splitDragHelp">Drag exercises between Main Exercises and Extras, or drag within a section to change the order.</p>
   <div class="extraslabel">MAIN EXERCISES</div>
   <div class="splitDropZone" data-day="${i}" data-type="0">${d[1].map((x,j)=>row(x,j,0)).join("")}<div class="splitEmptyHint">Drop exercises here</div></div>
   <button type="button" class=pick onclick="addExerciseTo(${i},0)">+ Main Exercise</button>
   <div class="extraslabel">EXTRAS</div>
   <div class="splitDropZone" data-day="${i}" data-type="1">${d[2].map((x,j)=>row(x,j,1)).join("")}<div class="splitEmptyHint">Drop exercises here</div></div>
   <button type="button" class=pick onclick="addExerciseTo(${i},1)">+ Extra Exercise</button>`);
 setTimeout(initSplitExerciseDrag,0);
}
function renameExercise(di,type,j){let arr=st.days[di][type?2:1];textEntryModal("Edit Exercise","Exercise name",arr[j],n=>{arr[j]=n;syncPlannedDays();save();dayExerciseEditor(di)})}

let splitExerciseDrag=null;
function splitDragTargetIndex(zone,y){
 const rows=[...zone.querySelectorAll(".splitDragExercise:not(.dragging)")];
 for(let n=0;n<rows.length;n++){
   const r=rows[n].getBoundingClientRect();
   if(y<r.top+r.height/2)return n;
 }
 return rows.length;
}
function initSplitExerciseDrag(){
 document.querySelectorAll(".splitDragExercise").forEach(row=>{
   row.addEventListener("dragstart",e=>{
     splitExerciseDrag={day:+row.dataset.day,type:+row.dataset.type,index:+row.dataset.index};
     row.classList.add("dragging");
     if(e.dataTransfer){e.dataTransfer.effectAllowed="move";try{e.dataTransfer.setData("text/plain","move")}catch(_){}}
   });
   row.addEventListener("dragend",()=>{row.classList.remove("dragging");document.querySelectorAll(".splitDropZone").forEach(z=>z.classList.remove("dragOver"))});
 });
 document.querySelectorAll(".splitDropZone").forEach(zone=>{
   zone.addEventListener("dragover",e=>{e.preventDefault();zone.classList.add("dragOver");if(e.dataTransfer)e.dataTransfer.dropEffect="move"});
   zone.addEventListener("dragleave",e=>{if(!zone.contains(e.relatedTarget))zone.classList.remove("dragOver")});
   zone.addEventListener("drop",e=>{
     e.preventDefault();e.stopPropagation();zone.classList.remove("dragOver");
     if(!splitExerciseDrag)return;
     const di=splitExerciseDrag.day, fromType=splitExerciseDrag.type, fromIndex=splitExerciseDrag.index;
     const toType=+zone.dataset.type;
     if(+zone.dataset.day!==di)return;
     const from=st.days[di][fromType?2:1], to=st.days[di][toType?2:1];
     if(!from || !to || fromIndex<0 || fromIndex>=from.length)return;
     let target=splitDragTargetIndex(zone,e.clientY);
     const [exercise]=from.splice(fromIndex,1);
     if(from===to && target>fromIndex)target--;
     target=Math.max(0,Math.min(target,to.length));
     to.splice(target,0,exercise);
     syncPlannedDays();save();splitExerciseDrag=null;dayExerciseEditor(di);
   });
 });
}

function removeExercise(di,type,j){st.days[di][type?2:1].splice(j,1);syncPlannedDays();save();dayExerciseEditor(di)}
function addExerciseTo(di,type){textEntryModal(type?"Add Extra Exercise":"Add Main Exercise","Exercise name","",n=>{st.days[di][type?2:1].push(n);syncPlannedDays();save();dayExerciseEditor(di)})}
function nextCustomSplitName(){let i=1;while(st.customSplits["Custom Split "+i])i++;return "Custom Split "+i}
function saveAsSplit(){let n=nextCustomSplitName();st.splitName=n;st.customSplits[n]=JSON.parse(JSON.stringify(st.days));save();editSplit()}
function loadSplit(n){st.days=JSON.parse(JSON.stringify(st.customSplits[n]));st.plannedDays=JSON.parse(JSON.stringify(st.days));st.splitName=n;st.day=0;save();home()}
function loadSplitFromEditor(n){st.days=JSON.parse(JSON.stringify(st.customSplits[n]));st.plannedDays=JSON.parse(JSON.stringify(st.days));st.splitName=n;st.day=0;save();editSplit()}
function renameSavedSplit(n){textEntryModal("Rename Split","Split name",n,v=>{if(v!==n&&st.customSplits[v]){alert("A split with that name already exists.");return;}let data=st.customSplits[n];delete st.customSplits[n];st.customSplits[v]=data;if(st.splitName===n)st.splitName=v;save();editSplit()})}
function deleteSavedSplit(n){delete st.customSplits[n];if(st.splitName===n)st.splitName="The Goat Split";save();editSplit()}
function loadOriginal(){st.days=JSON.parse(JSON.stringify(ORIGINAL));st.plannedDays=JSON.parse(JSON.stringify(st.days));st.splitName="The Goat Split";st.day=0;save();editSplit()}
function uniqueSections(){let seen=new Set(),out=[];st.days.forEach((d,i)=>{let key=d[0]+"|"+JSON.stringify(d[1])+"|"+JSON.stringify(d[2]);if(!seen.has(key)){seen.add(key);out.push({name:d[0],mains:d[1],extras:d[2],day:i})}});return out}
function maxRow(x){return `<div class=maxrow><span>${esc(x)}</span><input class=cell type=number value="${st.max[x]||0}" onchange="st.max['${q(x)}']=+this.value;save()"><button class=btn onclick="showPR('${q(x)}')">›</button></div>`}
function maxes(){setActiveNav("maxes");let s=`<div class=title><h1>Max & History</h1><p>${esc(st.splitName)}</p></div>`;uniqueSections().forEach(sec=>{s+=`<section class=maxsection><h2>${esc(sec.name)}</h2>${sec.mains.map(maxRow).join("")}<div class=extraslabel>${esc(sec.name)} EXTRAS</div>${sec.extras.map(maxRow).join("")}</section>`});document.getElementById("screen").innerHTML=s}
function showPR(ex){let hist=st.prHistory[ex]||[];modal(esc(ex),`<p><b>Current max:</b> ${st.max[ex]||0}kg &nbsp; <b>Reps:</b> ${st.repsAtMax[ex]||"—"}</p>${hist.length?hist.map(x=>`<div class=pagecard>${esc(x.date)} — ${x.from}kg → <b>${x.to}kg</b> × ${x.reps}</div>`).join(""):"<p class=small>No recorded PR changes yet.</p>"}`)}
function historyPage(){setActiveNav("history");document.getElementById("screen").innerHTML=`<div class=title><h1>Workout History</h1></div>${st.history.length?st.history.map(h=>`<div class=pagecard><b>${esc(h.day)}</b><div class=note>${esc(h.date)}</div>${h.sets.length} completed sets</div>`).join(""):"<p>No workouts saved yet.</p>"}`}
function groupMembers(){let all=[{name:"Kieron",vals:{"Squats":200,"Bench Press":170,"Deadlifts":220,"Weighted Lat Pull Up":50,"Barbell Row":115},bw:90,streak:12,prs:4,trend:1},{name:"James",vals:{"Squats":180,"Bench Press":165,"Deadlifts":210,"Weighted Lat Pull Up":45,"Barbell Row":110},bw:84,streak:8,prs:2,trend:-1},{name:"Bill",vals:{"Squats":160,"Bench Press":150,"Deadlifts":200,"Weighted Lat Pull Up":40,"Barbell Row":120},bw:82,streak:16,prs:3,trend:2},{name:"Keelan",vals:{"Squats":150,"Bench Press":140,"Deadlifts":190,"Weighted Lat Pull Up":60,"Barbell Row":110},bw:78,streak:6,prs:1,trend:0},{name:"Anna",vals:{"Squats":120,"Bench Press":125,"Deadlifts":160,"Weighted Lat Pull Up":25,"Barbell Row":80},bw:65,streak:10,prs:3,trend:1},{name:"Betsy",vals:{"Squats":100,"Bench Press":90,"Deadlifts":140,"Weighted Lat Pull Up":20,"Barbell Row":70},bw:60,streak:5,prs:2,trend:-1}];if(!st.demoGroup)return all;let allowed=new Set(["Kieron",...(st.demoGroup.members||[])]);return all.filter(x=>allowed.has(x.name))}
const groupMedalGold="assets/images/asset-019-0fc6b1a3a3fd.png",groupMedalSilver="assets/images/asset-020-2917b7c7c0fc.png",groupMedalBronze="assets/images/asset-021-b50a93b7ce16.png";
function medalImg(i,cls='rankMedalImg'){let a=[groupMedalGold,groupMedalSilver,groupMedalBronze];return i<3?`<img class="${cls}" src="${a[i]}" alt="${i+1} place medal">`:String(i+1)}
function rankBadge(i){return medalImg(i)}
function groupScore(m){let total=m.vals["Squats"]+m.vals["Bench Press"]+m.vals["Deadlifts"];return Math.round((total/m.bw)*100)}
function memberCard(m,i,metric){let tr=m.trend>0?`<span style="color:#e969ff">↑${m.trend}</span>`:m.trend<0?`<span style="opacity:.65">↓${Math.abs(m.trend)}</span>`:`<span style="opacity:.45">—</span>`;return `<div class="pagecard" style="padding:12px;margin:8px 0"><div class=row><div style="font-size:24px;width:42px;text-align:center">${rankBadge(i)}</div><div class=grow><b>${esc(m.name)}${m.name==='Kieron'?' <span class=small>(You)</span>':''}</b><div class=small>${m.prs} PRs this month • ⚡ ${m.streak} day streak</div></div><div style="text-align:right"><b style="font-size:19px">${metric(m)}</b><div class=small>${tr}</div></div></div></div>`}
function showcaseSecondGroup(){let ms=groupMembers().slice().sort((a,b)=>(b.vals['Deadlifts']||0)-(a.vals['Deadlifts']||0));return `<div class="groupSectionBox"><div class=groupSectionLabel>Group 2</div><div class="pagecard groupHero"><div class=groupBadge>👥</div><div class=grow><div class=groupTitle>Strength Crew</div><div class=small>${ms.length} Members • Push each other</div><div class=showcaseNote>Demo group for layout testing</div></div><button class=btn onclick="inviteMembers()">+ Invite</button></div><div class=groupMainTabs><button class="groupMainTab">Total</button><button class="groupMainTab">Bodyweight</button><button class="groupMainTab sel">Individual Exercises</button></div><div class=exerciseTabStrip><button class="exerciseTab sel">Deadlifts</button><button class=exerciseTab>Bench Press</button><button class=exerciseTab>Squats</button></div>${groupPodium(ms,m=>(m.vals['Deadlifts']||0)+' kg')}${groupTable('Deadlifts Leaderboard',ms,m=>(m.vals['Deadlifts']||0)+' kg','Best Lift')}</div>`}function groupsPage(view){setActiveNav("groups");st.groupView=view||st.groupView||"overall";save();if(!st.demoGroup){document.getElementById("screen").innerHTML=`<div class=title><h1>Groups</h1><p>Compete • improve • celebrate PRs</p></div><div class=pagecard style="text-align:center;padding:28px 18px"><div class="groupEmptyFigurine"><img src="assets/images/asset-022-b4c075f797de.png" alt="Zag Science trophy figurine"></div><h2 style="margin:0 0 6px">No groups yet</h2><div class=small style="margin-bottom:18px">Create a group to start a leaderboard with friends.</div><button class=pick style="width:100%" onclick=createGroup()>＋ Create Group</button></div>`;window.scrollTo(0,0);return}let tabs=[['total','Total'],['bodyweight','Bodyweight'],['exercises','Individual Exercises']];if(!view&&(!st.groupView||!['total','bodyweight','exercises'].includes(st.groupView)))st.groupView='total';let inner=`<div class="pagecard groupHero"><div class=groupBadge>👥</div><div class=grow><div class=groupTitle>${esc(st.demoGroup.name||'The Lads')}</div><div class=small>${groupMembers().length} Members • Train harder together</div></div><button class=btn onclick="inviteMembers()">+ Invite</button></div><div class=groupMainTabs>${tabs.map(t=>`<button class="groupMainTab ${st.groupView===t[0]?'sel':''}" onclick="groupsPage('${t[0]}')">${t[1]}</button>`).join('')}</div>`;if(st.groupView==='exercises')inner+=groupExercises();else if(st.groupView==='bodyweight')inner+=groupBodyweightLayout();else inner+=groupTotalLayout();let s=`<div class=title><h1>Groups</h1><p>Friendly competition • train harder together</p></div><div class="groupSectionBox"><div class=groupSectionLabel>Group 1</div>${inner}</div>${showcaseSecondGroup()}<button class="pick createAnotherGroup" onclick="createGroup()">＋ Create Group</button>`;document.getElementById("screen").innerHTML=s;window.scrollTo(0,0)}
function groupOverall(){let ms=groupMembers().sort((a,b)=>groupScore(b)-groupScore(a));return `<div class=pagecard><h2 style="margin:0 0 4px">⚡ Zag Score</h2><div class=small>Preview score based on the group's selected lifts relative to bodyweight. We can refine the formula before cloud launch.</div></div>${ms.map((m,i)=>memberCard(m,i,x=>groupScore(x)+' pts')).join('')}`}
function groupStreaks(){let ms=groupMembers().sort((a,b)=>b.streak-a.streak);return `<div class=pagecard><h2 style="margin:0">🔥 Streak Leaderboard</h2><div class=small>Current workout streaks</div></div>${ms.map((m,i)=>memberCard(m,i,x=>x.streak+' days')).join('')}`}
function groupPodium(ms,metric){let top=ms.slice(0,3), order=[1,0,2].filter(i=>top[i]);return `<div class=groupPodium>${order.map(i=>{let m=top[i];return `<div class=podiumCard ${i===0?'winner':''}><div class=podiumMedal>${medalImg(i,'podiumMedalImg')}</div><b>${esc(m.name)}</b><div class=small>${metric(m)}</div></div>`}).join('')}</div>`}
function groupTable(title,ms,metric,label){return `<div class=pagecard groupBoard><h2> ${esc(title)}</h2><div class=boardHead><span>#</span><span>Member</span><span>${esc(label)}</span></div>${ms.map((m,i)=>`<div class=boardRow><span>${rankBadge(i)}</span><b>${esc(m.name)}</b><b>${metric(m)}</b></div>`).join('')}</div>`}
function combinedValue(m){let ex=(st.demoGroup?.exercises||[]);if(!ex.length)ex=['Squats','Bench Press','Deadlifts'];return ex.reduce((n,x)=>n+(m.vals[x]||0),0)}
function groupTotalLayout(){let ms=groupMembers().sort((a,b)=>combinedValue(b)-combinedValue(a));return groupPodium(ms,m=>combinedValue(m)+' kg')+groupTable('Combined Weight Leaderboard',ms,m=>combinedValue(m)+' kg','Combined')}
function groupBodyweightLayout(){let ms=groupMembers().sort((a,b)=>(combinedValue(b)/b.bw)-(combinedValue(a)/a.bw));return groupPodium(ms,m=>(combinedValue(m)/m.bw).toFixed(2)+'×')+groupTable('Bodyweight Ratio Leaderboard',ms,m=>(combinedValue(m)/m.bw).toFixed(2)+'×','Ratio')}
function groupExercises(){let opts=(st.demoGroup?.exercises||[]).filter(Boolean);if(!opts.length)opts=['Squats','Bench Press','Deadlifts','Weighted Lat Pull Up','Barbell Row'];if(!opts.includes(st.groupExercise))st.groupExercise=opts[0];let ex=st.groupExercise;let ms=groupMembers().sort((a,b)=>(b.vals[ex]||0)-(a.vals[ex]||0));return `<div class=exerciseTabStrip>${opts.map(x=>`<button class="exerciseTab ${x===ex?'sel':''}" onclick="st.groupExercise='${q(x)}';save();groupsPage('exercises')">${esc(x)}</button>`).join('')}</div>${groupPodium(ms,m=>(m.vals[ex]||0)+' kg')}${groupTable(ex+' Leaderboard',ms,m=>(m.vals[ex]||0)+' kg','Best Lift')}`}
function groupActivity(){let a=[['Kieron','Bench Press','170 kg','New group #1'],['Anna','Deadlifts','160 kg','+5 kg PR'],['Bill','Barbell Row','120 kg','+2.5 kg PR'],['James','Squats','180 kg','Matched PR'],['Betsy','Bench Press','90 kg','+5 kg PR']];return `<div class=pagecard><h2 style="margin:0">🏅 Recent PRs</h2><div class=small>Mock activity for testing the future live group feed</div></div>${a.map((x,i)=>`<div class=pagecard style="padding:13px;margin:8px 0"><div class=row><div style="font-size:24px">${i===0?'⚡':'🏋️'}</div><div class=grow><b>${x[0]}</b><div class=small>${x[1]} • ${x[3]}</div></div><b>${x[2]}</b></div></div>`).join('')}`}
function groupTotal(){return groupOverall()}
function groupBody(){let ms=groupMembers().sort((a,b)=>groupScore(b)-groupScore(a));return `<div class=pagecard><h2>⚖️ Bodyweight Ranking</h2></div>${ms.map((m,i)=>memberCard(m,i,x=>(groupScore(x)/100).toFixed(2)+'×')).join('')}`}
let groupCreateState={combined:false,bodyweight:false,individual:false,ratioCombined:false,ratioIndividual:false,selectedExercises:new Set()};
function allGroupExerciseNames(){let a=[];(st.days||base).forEach(d=>{(d[1]||[]).forEach(x=>a.push(x));(d[2]||[]).forEach(x=>a.push(x))});return [...new Set(a)].sort((a,b)=>a.localeCompare(b))}
function groupExerciseSections(){return uniqueSections()}
function syncGroupCreateUI(){let set=(id,on)=>document.getElementById(id)?.classList.toggle('selected',!!on);set('gCombinedBox',groupCreateState.combined);set('gIndividualBox',groupCreateState.individual);set('gRatioCombined',groupCreateState.ratioCombined);set('gRatioIndividual',groupCreateState.ratioIndividual);set('gRatioOuter',groupCreateState.ratioCombined||groupCreateState.ratioIndividual);let n=groupCreateState.selectedExercises?.size||0;let c=document.getElementById('gExerciseCount');if(c)c.textContent=n?`${n} selected`:'None selected'}
function toggleGroupMode(k){groupCreateState[k]=!groupCreateState[k];syncGroupCreateUI()}
function toggleExerciseChooser(){document.getElementById('gExerciseList')?.classList.toggle('open');document.getElementById('gExerciseArrow').textContent=document.getElementById('gExerciseList')?.classList.contains('open')?'⌃':'⌄'}
function toggleGroupExercise(name){let set=groupCreateState.selectedExercises||(groupCreateState.selectedExercises=new Set());set.has(name)?set.delete(name):set.add(name);renderGroupExercisePicker();syncGroupCreateUI()}
function groupExerciseButton(x,selected=false){return `<button type="button" class="groupExercisePill ${selected?'selected':''}" onclick="toggleGroupExercise('${q(x)}')">${esc(x)}</button>`}
function renderGroupExercisePicker(){let host=document.getElementById('gExerciseList');if(!host)return;let selected=groupCreateState.selectedExercises||new Set();let selectedHTML=[...selected].map(x=>groupExerciseButton(x,true)).join('');let seen=new Set();let sections=groupExerciseSections().map(sec=>{let mains=(sec.mains||[]).filter(x=>!selected.has(x)&&!seen.has(x));mains.forEach(x=>seen.add(x));let extras=(sec.extras||[]).filter(x=>!selected.has(x)&&!seen.has(x));extras.forEach(x=>seen.add(x));if(!mains.length&&!extras.length)return '';return `<div class=groupExerciseSection><div class=groupExerciseSectionTitle>${esc(sec.name)}</div>${mains.map(x=>groupExerciseButton(x)).join('')}${extras.length?`<div class="groupExerciseSectionTitle extras">${esc(sec.name)} EXTRAS</div>${extras.map(x=>groupExerciseButton(x)).join('')}`:''}</div>`}).join('');host.innerHTML=`<div class=groupSelectedBlock><div class=groupSelectedTitle>Selected</div>${selectedHTML||'<div class=groupEmptySelected>No exercises selected yet.</div>'}</div>${sections}`}
function createGroup(){groupCreateState={combined:false,bodyweight:false,individual:false,ratioCombined:false,ratioIndividual:false,selectedExercises:new Set()};modal("Create Group",`<p class=small>Set up your group, then you can add the test accounts.</p><input id=gname class="cell groupCreateTop" style="width:100%;padding:10px;font-size:13px" placeholder="Group name"><div class=groupModeGrid><div id=gCombinedBox class=groupSelectBox onclick="toggleGroupMode('combined')">Combined Weight</div><div id=gIndividualBox class=groupSelectBox onclick="toggleGroupMode('individual')">Individual Exercise</div></div><div id=gRatioOuter class=bodyRatioBox onclick="toggleGroupMode('bodyweight')"><div class=bodyRatioTitle>Bodyweight Ratio</div><div class=ratioMiniGrid><div id=gRatioCombined class=ratioMini onclick="event.stopPropagation();toggleGroupMode('ratioCombined')">Combined Weight</div><div id=gRatioIndividual class=ratioMini onclick="event.stopPropagation();toggleGroupMode('ratioIndividual')">Individual Exercise</div></div></div><div class=exerciseChooser><div class=exerciseChooserHead onclick="toggleExerciseChooser()"><span>Exercises <span id=gExerciseCount class=exerciseCount>None selected</span></span><span id=gExerciseArrow>⌄</span></div><div id=gExerciseList class="exerciseChooserList"></div></div><button class="pick createGroupAction" onclick="finishCreateGroup()">Create Group</button>`);renderGroupExercisePicker();syncGroupCreateUI()}
function finishCreateGroup(){let n=(document.getElementById('gname')?.value||'').trim();if(!n){alert('Give your group a name first.');return}let exercises=[...(groupCreateState.selectedExercises||new Set())];st.demoGroup={name:n,members:[],exercises:exercises,leaderboards:{combined:groupCreateState.combined,bodyweight:groupCreateState.bodyweight,individual:groupCreateState.individual,bodyweightCombined:groupCreateState.ratioCombined,bodyweightIndividual:groupCreateState.ratioIndividual}};st.groupView='total';save();closeModal();groupsPage();setTimeout(inviteMembers,180)}
function inviteMembers(){let chosen=new Set((st.demoGroup&&st.demoGroup.members)||[]);let people=groupMembers().filter(x=>x.name!=='Kieron');modal("Add Members",`<p class=small>Test accounts are available so you can try the group setup before real accounts are connected.</p><div class=createChoices>${people.map(p=>`<label><input class=demoMember type=checkbox value="${esc(p.name)}" ${chosen.has(p.name)?'checked':''}><b>${esc(p.name)}</b><span class=small> • ⚡ ${p.streak} day streak</span></label>`).join('')}</div><button class=pick onclick="saveDemoMembers()">Add to Group</button>`)}
function saveDemoMembers(){if(!st.demoGroup)return;st.demoGroup.members=[...document.querySelectorAll('.demoMember:checked')].map(x=>x.value);save();closeModal();groupsPage()}
function notificationToggle(key,label,desc){
  const on=!!st.notifications[key];
  return `<div class=settingLine style="align-items:center;gap:14px"><div class=grow><b style="font-size:15px">${label}</b><div class=note style="margin-top:4px">${desc}</div></div><button class=btn onclick="st.notifications.${key}=!st.notifications.${key};save();settings()">${on?"On":"Off"}</button></div>`;
}
function streakRestSelector(){
  return `<div class=settingLine><div class=grow><b style="font-size:15px">Allowed rest days</b><div class=note style="margin-top:4px">Rest days available each week without breaking your streak.</div></div><select class=week onchange="st.streakRestDays=Number(this.value);save();settings()">${[1,2,3,4,5].map(n=>`<option value="${n}" ${st.streakRestDays===n?'selected':''}>${n}</option>`).join('')}</select></div>`;
}
async function requestZagNotifications(){
 if(!("Notification" in window)){alert("This browser does not support web notifications.");return}
 try{let p=await Notification.requestPermission();alert(p==="granted"?"Notifications enabled.":"Notification permission was not enabled.");settings()}catch(e){alert("Notifications could not be enabled in this browser.")}
}
setInterval(()=>{try{maybeBrowserStreakReminder()}catch(e){}},60000);
document.addEventListener("visibilitychange",()=>{if(!document.hidden)try{processStreakCalendar();maybeBrowserStreakReminder()}catch(e){}});
function streakReminderTimeSetting(){
  return `<div class=settingLine><div class=grow><b style="font-size:15px">Streak reminder time</b><div class=note style="margin-top:4px">If you have not trained that day, remind you at this time.</div></div><input type="time" class=week value="${st.streakReminderTime}" onchange="st.streakReminderTime=this.value;save();settings()" style="min-width:110px"></div>`;
}
function settings(){setActiveNav("settings");document.getElementById("screen").innerHTML=`<div class=title><h1>Settings</h1></div><div class=pagecard><div class=accountRow><div class=accountIcon>👤</div><div class=grow><b>Account & Cloud</b><div class=coming>Accounts & Cloud Sync — Coming Soon</div></div><button class=btn onclick="alert('Sign in and cloud sync will be connected when the Zag Science account backend is ready.')">Account</button></div></div><div class=pagecard><b>Training</b>
<div class=settingLine><div class=grow><b style="font-size:15px">Stick Week</b><div class=note style="margin-top:4px">Locks every exercise to Stick Week: the Week 8 PB sets through 105%, followed by 4 empty back-off set slots.</div></div><button class="btn stickWeekSwitch ${st.stickWeek?'on':''}" onclick="toggleStickWeek()">${st.stickWeek?"On":"Off"}</button></div>
<div class=settingLine><span>Weight Units</span><select class=week onchange="st.units=this.value;save();settings()"><option value=kg ${st.units==='kg'?'selected':''}>kg</option><option value=lb ${st.units==='lb'?'selected':''}>lb</option></select></div><div class=note>Unit preference is saved now. Existing programme values remain unchanged until full unit conversion is enabled.</div></div><div class=pagecard><b>Notifications</b>
<div class=note style="margin:6px 0 4px">Choose which Zag Science notifications you want to receive.</div>
${notificationToggle("workoutReminder","Workout reminder","Reminders for your scheduled workouts.")}
${notificationToggle("leaderboardChanges","Leaderboard changes","Group alerts when leaderboard positions change.")}
${notificationToggle("groupPRs","Group PRs","Alerts when a group member sets a new personal record.")}
${notificationToggle("streakScore","Streak score","Daily streak reminders and streak-status alerts.")}
${streakRestSelector()}
${streakReminderTimeSetting()}
<div class=settingLine><div class=grow><b style="font-size:15px">Browser notification permission</b><div class=note style="margin-top:4px">Enable browser alerts while testing the GitHub-hosted app.</div></div><button class=btn onclick="requestZagNotifications()">Enable</button></div>
<div class=note style="margin-top:10px">Streak rest days preserve your streak rather than adding to it. Phone push delivery can be connected when push notifications are enabled in the packaged app.</div>
</div><div class=pagecard><b>Sounds</b><div class=settingLine><span>Workout sounds</span><button class=btn onclick="st.sound=!st.sound;save();settings()">${st.sound?"On":"Off"}</button></div></div><div class=pagecard><b>Data & Cloud Backup</b><div class=settingLine><span>Cloud Backup</span><span class=coming>Coming Soon</span></div><button class=btn onclick=backup()>Export Backup</button> <label class=btn>Import Backup<input hidden type=file accept=.json onchange=restore(this)></label></div><div class=pagecard><b>Danger Zone</b><div style="margin-top:8px"><button class="btn danger" onclick="if(confirm('Reset all Zag Science data?')){localStorage.removeItem('zagScienceV2');location.reload()}">Reset All Data</button></div></div>`}
function backup(){let a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(st,null,2)],{type:"application/json"}));a.download="zag-science-backup.json";a.click()}
function restore(x){let r=new FileReader();r.onload=()=>{try{st=JSON.parse(r.result);save();alert("Backup imported");location.reload()}catch(e){alert("Invalid backup file")}};r.readAsText(x.files[0])}
processStreakCalendar();save();workout();setTimeout(()=>{try{maybeBrowserStreakReminder()}catch(e){}},1200);



(function(){
 const overlay=document.getElementById("zagInfoOverlayV6");
 function closeInfo(e){
   if(e){e.preventDefault();e.stopPropagation();}
   overlay.classList.remove("open");
   overlay.setAttribute("aria-hidden","true");
 }
 window.openZagInfo=function(e){
   if(e){e.preventDefault();e.stopPropagation();}
   overlay.classList.add("open");
   overlay.setAttribute("aria-hidden","false");
 };
 window.closeZagInfo=closeInfo;
 document.getElementById("zagInfoCloseTop").addEventListener("click",closeInfo);document.getElementById("zagInfoGoV6").addEventListener("click",closeInfo);
 document.getElementById("zagInfoGoV6").addEventListener("pointerup",closeInfo);
 overlay.addEventListener("click",function(e){if(e.target===overlay)closeInfo(e)});

 // Make every existing Home info control open THIS popup, regardless of old handlers.
 document.addEventListener("click",function(e){
   const b=e.target.closest("#zagPersistentInfo,.zagSplitInfoButton,.zagInfoBtn");
   if(b) window.openZagInfo(e);
 },true);

 // Migrate persisted state names too, not just the HTML defaults.
 try {
   const seen=new Set();
   for(let i=0;i<localStorage.length;i++){
     const key=localStorage.key(i);
     const val=localStorage.getItem(key);
     if(!val || seen.has(key)) continue;
     seen.add(key);
     if(/Latissimus\s+Dorsi/i.test(val)){
       localStorage.setItem(key,val.replace(/Latissimus\s+Dorsi/gi,"Lat"));
     }
   }
 } catch(err) {}

 // Also fix any currently-rendered text immediately.
 function fixRenderedLat(){
   const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
   let n;
   while(n=walker.nextNode()){
     if(/Latissimus\s+Dorsi/i.test(n.nodeValue))
       n.nodeValue=n.nodeValue.replace(/Latissimus\s+Dorsi/gi,"Lat");
   }
 }
 document.addEventListener("DOMContentLoaded",fixRenderedLat);
 new MutationObserver(fixRenderedLat).observe(document.documentElement,{childList:true,subtree:true});
})();



(function(){
 const btn=document.getElementById('zagHomeInfoV7');

 function onHome(){
   // The Home page uniquely shows the split heading + Workout Split card.
   const bodyText=document.body.innerText||'';
   return bodyText.includes('Workout Split') &&
          (bodyText.includes('The Goat Split') || bodyText.includes('day rotation'));
 }

 function sync(){
   btn.style.display=onHome()?'flex':'none';
 }

 function open(e){
   if(e){e.preventDefault();e.stopPropagation();}
   if(typeof window.openZagInfo==='function') window.openZagInfo(e);
 }

 btn.addEventListener('click',open);
 btn.addEventListener('pointerup',open);

 document.addEventListener('DOMContentLoaded',sync);
 new MutationObserver(sync).observe(document.body,{
   subtree:true,childList:true,attributes:true,attributeFilter:['class','style']
 });
 setTimeout(sync,50);
 setTimeout(sync,300);
 setTimeout(sync,1000);
})();



(function(){
 const btn=document.getElementById('zagHomeInfoV7');
 if(!btn) return;

 function anchorToHome(){
   const candidates=[...document.querySelectorAll('h1,h2,h3,div,span')];
   const title=candidates.find(el=>{
     if(el.offsetParent===null) return false;
     const t=(el.textContent||'').trim();
     return t==='The Goat Split' || (window.st && t===st.splitName);
   });
   if(!title) return;

   // Find the local Home header block containing the split title and rotation.
   let host=title.parentElement;
   while(host && host!==document.body){
     const txt=(host.innerText||'');
     if(/day rotation/i.test(txt) && host.getBoundingClientRect().height < 220) break;
     host=host.parentElement;
   }
   if(!host || host===document.body) host=title.parentElement;

   if(getComputedStyle(host).position==='static') host.style.position='relative';

   // Move the existing button into the Home header itself.
   if(btn.parentElement!==host) host.appendChild(btn);

   btn.style.setProperty('position','absolute','important');
   btn.style.setProperty('right','18px','important');
   btn.style.setProperty('top','50%','important');
   btn.style.setProperty('transform','translateY(-50%)','important');
   btn.style.setProperty('display','flex','important');
 }

 document.addEventListener('DOMContentLoaded',()=>setTimeout(anchorToHome,50));
 window.addEventListener('load',()=>setTimeout(anchorToHome,100));

 // Re-anchor after the app redraws Home, but never use viewport-fixed positioning.
 new MutationObserver(()=>{
   if(document.body.innerText.includes('Workout Split')) anchorToHome();
 }).observe(document.body,{subtree:true,childList:true});

 setTimeout(anchorToHome,300);
})();



function openZagPro(e){if(e){e.preventDefault();e.stopPropagation()}const o=document.getElementById('zagProOverlay');o.classList.add('open');o.setAttribute('aria-hidden','false')}
function closeZagPro(e){if(e){e.preventDefault();e.stopPropagation()}const o=document.getElementById('zagProOverlay');o.classList.remove('open');o.setAttribute('aria-hidden','true')}
function zagPurchase(plan){alert(plan==='monthly'?'Zag Pro monthly purchasing will connect here when the App Store / payment checkout is enabled.':'Zag Pro lifetime purchasing will connect here when the App Store / payment checkout is enabled.')}
document.getElementById('zagProOverlay').addEventListener('click',function(e){if(e.target===this)closeZagPro(e)});


window.zagEmblemNames=["statue","dumbbell","skateboard","bike","alien","frog","lion","wolf","bear","swordshield","battleaxe","viking","r8","chopper","heart","bones","arm","lightning","bodybuilder","wizard"];window.zagEmblemAssets={"statue":"assets/images/asset-024-3520940f5461.webp","dumbbell":"assets/images/asset-025-dcd50be4b527.webp","skateboard":"assets/images/asset-026-9c6e69fe68fe.webp","bike":"assets/images/asset-027-81c213660c0c.webp","alien":"assets/images/asset-028-f872a685b99a.webp","frog":"assets/images/asset-029-4b85bb1b6ee4.webp","lion":"assets/images/asset-030-258be848446a.webp","wolf":"assets/images/asset-031-c58258ebaf27.webp","bear":"assets/images/asset-032-1d4f80e76fb0.webp","swordshield":"assets/images/asset-033-2b5544cdaf16.webp","battleaxe":"assets/images/asset-034-7f0bab3f9ffb.webp","viking":"assets/images/asset-035-e742bb50873c.webp","r8":"assets/images/asset-036-4533dec9d880.webp","chopper":"assets/images/asset-037-c1893cabbba1.webp","heart":"assets/images/asset-038-2fab05e24f8f.webp","bones":"assets/images/asset-039-67bb1158f60b.webp","arm":"assets/images/asset-040-2e7f2c8e3f34.webp","lightning":"assets/images/asset-041-8ab5580a42e5.webp","bodybuilder":"assets/images/asset-042-6c2ffd9ba0fb.webp","wizard":"assets/images/asset-043-068f1c27f082.webp"};window.zagEmblemSrc=function(id){return window.zagEmblemAssets[id]||""};


(function(){
  window.zagInviteOpen=false;
  window.zagBodyMode="combined";

  window.zagAllGroupPeople=function(){
    return [
      {name:"Kieron",vals:{"Squats":200,"Bench Press":170,"Deadlifts":220,"Weighted Lat Pull Up":50,"Barbell Row":115},bw:90,streak:12,prs:4,trend:1,username:"kieron"},
      {name:"James",vals:{"Squats":180,"Bench Press":165,"Deadlifts":210,"Weighted Lat Pull Up":45,"Barbell Row":110},bw:84,streak:8,prs:2,trend:-1,username:"jamesfit"},
      {name:"Bill",vals:{"Squats":160,"Bench Press":150,"Deadlifts":200,"Weighted Lat Pull Up":40,"Barbell Row":120},bw:82,streak:16,prs:3,trend:2,username:"billlifts"},
      {name:"Keelan",vals:{"Squats":150,"Bench Press":140,"Deadlifts":190,"Weighted Lat Pull Up":60,"Barbell Row":110},bw:78,streak:6,prs:1,trend:0,username:"keelanstrong"},
      {name:"Anna",vals:{"Squats":120,"Bench Press":125,"Deadlifts":160,"Weighted Lat Pull Up":25,"Barbell Row":80},bw:65,streak:10,prs:3,trend:1,username:"annatrains"},
      {name:"Betsy",vals:{"Squats":100,"Bench Press":90,"Deadlifts":140,"Weighted Lat Pull Up":20,"Barbell Row":70},bw:60,streak:5,prs:2,trend:-1,username:"betsyfit"}
    ];
  };

  window.groupMembers=function(){
    let all=zagAllGroupPeople();
    if(!st.demoGroup)return all;
    let allowed=new Set(["Kieron",...(st.demoGroup.members||[])]);
    return all.filter(x=>allowed.has(x.name));
  };

  function config(){
    if(!st.demoGroup.leaderboards){
      st.demoGroup.leaderboards={combined:true,bodyweight:true,individual:true,bodyweightCombined:true,bodyweightIndividual:true};
    }
    if(typeof st.demoGroup.leaderboards.bodyweight!=="boolean"){
      st.demoGroup.leaderboards.bodyweight=!!(st.demoGroup.leaderboards.bodyweightCombined||st.demoGroup.leaderboards.bodyweightIndividual);
    }
    return st.demoGroup.leaderboards;
  }

  function visibleMainTabs(){
    let c=config(), out=[];
    if(c.combined)out.push(["total","Total"]);
    if(c.bodyweight)out.push(["bodyweight","Bodyweight"]);
    if(c.individual)out.push(["exercises","Individual Exercises"]);
    return out;
  }

  function ensureValidView(){
    let allowed=visibleMainTabs().map(x=>x[0]);
    if(!allowed.includes(st.groupView))st.groupView=allowed[0]||"none";
  }

  window.zagToggleInvite=function(){
    zagInviteOpen=!zagInviteOpen;
    groupsPage(st.groupView);
  };

  window.zagFilterFriends=function(v){
    let q=(v||"").trim().toLowerCase();
    document.querySelectorAll(".groupFriendRow").forEach(r=>{
      r.style.display=!q||r.dataset.search.includes(q)?"grid":"none";
    });
  };

  window.zagAddFriend=function(name){
    if(!st.demoGroup)return;
    st.demoGroup.members=st.demoGroup.members||[];
    if(!st.demoGroup.members.includes(name))st.demoGroup.members.push(name);
    save();
    groupsPage(st.groupView);
  };

  window.zagRemoveFriend=function(name){
    if(!st.demoGroup)return;
    st.demoGroup.members=(st.demoGroup.members||[]).filter(x=>x!==name);
    save();
    groupsPage(st.groupView);
  };

  function inviteHTML(){
    let chosen=new Set(st.demoGroup.members||[]);
    let people=zagAllGroupPeople().filter(x=>x.name!=="Kieron");
    return `<div class=groupInviteInline>
      <input class=groupInviteSearch placeholder="Search username" oninput="zagFilterFriends(this.value)">
      <div class=groupInviteTitle>Friends List</div>
      ${people.map(p=>`<div class=groupFriendRow data-search="${esc((p.name+" "+p.username).toLowerCase())}">
        <div class=groupFriendAvatar>${esc(p.name.charAt(0))}</div>
        <div><b>${esc(p.name)}</b><small>@${esc(p.username)} · ${p.bw} kg</small></div>
        <button class=groupFriendAdd ${chosen.has(p.name)?"disabled":""} onclick="event.stopPropagation();zagAddFriend('${q(p.name)}')">${chosen.has(p.name)?"Added":"Add"}</button>
      </div>`).join("")}
    </div>`;
  }

  window.editGroup=function(){
    let c=config();
    groupCreateState={
      combined:!!c.combined,
      individual:!!c.individual,
      bodyweight:!!c.bodyweight,
      ratioCombined:!!c.bodyweightCombined,
      ratioIndividual:!!c.bodyweightIndividual,
      emblem:st.demoGroup.emblem||"",
      selectedExercises:new Set(st.demoGroup.exercises||[])
    };
    modal("Edit Group",`
      <div class="zagEditGroupTopRow">
        <button type="button" class="zagGroupImageBox" onclick="zagChooseGroupImage()" aria-label="Change group image">
          ${st.demoGroup.emblem?`<img class="zagGroupImagePreview" src="${zagEmblemSrc(st.demoGroup.emblem)}" alt="">`:`<span class="zagGroupImagePlaceholder"></span>`}
        </button>
        <input id=gname class="cell groupCreateTop" style="width:100%;padding:10px;font-size:13px" value="${esc(st.demoGroup.name||"")}" placeholder="Group name">
      </div>
      <div class=groupModeGrid>
        <div id=gCombinedBox class=groupSelectBox onclick="toggleGroupMode('combined')">Combined Weight</div>
        <div id=gIndividualBox class=groupSelectBox onclick="toggleGroupMode('individual')">Individual Exercise</div>
      </div>
      <div id=gRatioOuter class=bodyRatioBox onclick="toggleGroupMode('bodyweight')">
        <div class=bodyRatioTitle>Bodyweight Ratio</div>
        <div class=ratioMiniGrid>
          <div id=gRatioCombined class=ratioMini onclick="event.stopPropagation();toggleGroupMode('ratioCombined')">Combined Weight</div>
          <div id=gRatioIndividual class=ratioMini onclick="event.stopPropagation();toggleGroupMode('ratioIndividual')">Individual Exercise</div>
        </div>
      </div>
      <div class=exerciseChooser>
        <div class=exerciseChooserHead onclick="toggleExerciseChooser()"><span>Exercises <span id=gExerciseCount class=exerciseCount></span></span><span id=gExerciseArrow>⌄</span></div>
        <div id=gExerciseList class=exerciseChooserList></div>
      </div>
      <button class="pick createGroupAction" onclick="saveEditedGroup()">Save Group</button>`);
    renderGroupExercisePicker();
    syncGroupCreateUI();
  };

  window.saveEditedGroup=function(){
    let name=(document.getElementById("gname")?.value||"").trim();
    if(!name){alert("Give your group a name first.");return}
    const g=st.demoGroup;
    g.name=name;
    g.emblem=groupCreateState.emblem||g.emblem||"";
    g.exercises=[...(groupCreateState.selectedExercises||new Set())];
    g.leaderboards={
      combined:!!groupCreateState.combined,
      bodyweight:!!groupCreateState.bodyweight,
      individual:!!groupCreateState.individual,
      bodyweightCombined:!!groupCreateState.ratioCombined,
      bodyweightIndividual:!!groupCreateState.ratioIndividual
    };
    const allowed=[];
    if(g.leaderboards.combined)allowed.push("total");
    if(g.leaderboards.bodyweight)allowed.push("bodyweight");
    if(g.leaderboards.individual)allowed.push("exercises");
    g._groupView=allowed.includes(g._groupView)?g._groupView:(allowed[0]||"none");
    st.groupView=g._groupView;
    save();closeModal();groupsPage();
  };

  window.zagSetBodyMode=function(mode){
    zagBodyMode=mode;
    groupsPage("bodyweight");
  };

  function bodyweightIndividual(){
    let opts=(st.demoGroup.exercises||[]).filter(Boolean);
    if(!opts.length)opts=["Squats","Bench Press","Deadlifts","Weighted Lat Pull Up","Barbell Row"];
    if(!opts.includes(st.groupExercise))st.groupExercise=opts[0];
    let ex=st.groupExercise;
    let ms=groupMembers().sort((a,b)=>((b.vals[ex]||0)/b.bw)-((a.vals[ex]||0)/a.bw));
    return `<div class=exerciseTabStrip>${opts.map(x=>`<button class="exerciseTab ${x===ex?'sel':''}" onclick="st.groupExercise='${q(x)}';save();groupsPage('bodyweight')">${esc(x)}</button>`).join("")}</div>
      ${groupPodium(ms,m=>((m.vals[ex]||0)/m.bw).toFixed(2)+"×")}
      ${groupTable(ex+" Bodyweight Leaderboard",ms,m=>((m.vals[ex]||0)/m.bw).toFixed(2)+"×","Ratio")}`;
  }

  function bodyweightContent(){
    let c=config(), modes=[];
    if(c.bodyweight && !c.bodyweightCombined && !c.bodyweightIndividual)c.bodyweightCombined=true;
    if(c.bodyweightCombined)modes.push(["combined","Combined Exercises"]);
    if(c.bodyweightIndividual)modes.push(["individual","Individual Exercises"]);
    if(!modes.some(x=>x[0]===zagBodyMode))zagBodyMode=modes[0]?.[0]||"none";
    if(!modes.length)return `<div class=groupNoLeaderboard>No bodyweight leaderboard is enabled.</div>`;
    let subs=`<div class=groupBodySubtabs style="--sub-count:${modes.length}">${modes.map(m=>`<button class="groupBodySubtab ${zagBodyMode===m[0]?'sel':''}" onclick="zagSetBodyMode('${m[0]}')">${m[1]}</button>`).join("")}</div>`;
    return subs+(zagBodyMode==="combined"?groupBodyweightLayout():bodyweightIndividual());
  }

  window.groupsPage=function(view){
    setActiveNav("groups");
    if(!st.demoGroup){
      document.getElementById("screen").innerHTML=`<div class=title><h1>Groups</h1><p>Friendly competition · train harder together</p></div>
      <div class=pagecard style="text-align:center;padding:28px 18px"><h2 style="margin-top:0">No groups yet</h2><div class=small style="margin-bottom:18px">Create a group to start a leaderboard with friends.</div><button class=pick style="width:100%" onclick=createGroup()>Create Group</button></div>`;
      window.scrollTo(0,0);return;
    }

    if(view)st.groupView=view;
    ensureValidView();save();
    let tabs=visibleMainTabs();

    let content="";
    if(st.groupView==="total"&&config().combined)content=groupTotalLayout();
    else if(st.groupView==="bodyweight")content=bodyweightContent();
    else if(st.groupView==="exercises"&&config().individual)content=groupExercises();
    else content=`<div class=groupNoLeaderboard>No leaderboard selections are enabled. Use Edit Group to choose which leaderboards this group shows.</div>`;

    let hero=`<div class="pagecard groupHero">
      <div class=groupBadgeNoEmoji>${st.demoGroup.emblem?`<img class="zagSavedGroupEmblem" src="${zagEmblemSrc(st.demoGroup.emblem)}" alt="">`:""}</div>
      <div class=grow><div class=groupTitle>${esc(st.demoGroup.name||"Group")}</div><div class=small>${groupMembers().length} Members · Train harder together</div></div>
      <div class=groupHeroActions><button class=btn onclick="zagToggleInvite()">Invite</button><button class=btn onclick="editGroup()">Edit Group</button></div>
      ${zagInviteOpen?inviteHTML():""}
    </div>`;

    let tabHTML=tabs.length?`<div class="groupMainTabs dynamic" style="--tab-count:${tabs.length}">${tabs.map(t=>`<button class="groupMainTab ${st.groupView===t[0]?'sel':''}" onclick="groupsPage('${t[0]}')">${t[1]}</button>`).join("")}</div>`:"";

    document.getElementById("screen").innerHTML=`<div class=title><h1>Groups</h1><p>Friendly competition · train harder together</p></div>
      <div class=groupSectionBox><div class=groupSectionLabel>Group 1</div>${hero}${tabHTML}${content}</div>
      <button class="pick createAnotherGroup" onclick=createGroup()>Create Group</button>`;
    window.scrollTo(0,0);
  };

  // Make new groups open on a valid selected leaderboard instead of forcing Total.
  window.finishCreateGroup=function(){
    let n=(document.getElementById("gname")?.value||"").trim();
    if(!n){alert("Give your group a name first.");return}
    let exercises=[...(groupCreateState.selectedExercises||new Set())];
    st.demoGroup={name:n,members:[],exercises:exercises,leaderboards:{
      combined:groupCreateState.combined,
      bodyweight:groupCreateState.bodyweight,
      individual:groupCreateState.individual,
      bodyweightCombined:groupCreateState.ratioCombined,
      bodyweightIndividual:groupCreateState.ratioIndividual
    }};
    st.groupView=groupCreateState.combined?"total":(groupCreateState.bodyweight?"bodyweight":(groupCreateState.individual?"exercises":"none"));
    save();closeModal();groupsPage(st.groupView);
  };
})();



(function(){
  function migrateGroups(){
    if(!Array.isArray(st.demoGroups)) st.demoGroups=[];
    if(st.demoGroup){
      const exists=st.demoGroups.some(g=>g && g.id && st.demoGroup.id && g.id===st.demoGroup.id);
      if(!exists) st.demoGroups.push(st.demoGroup);
    }
    st.demoGroups.forEach((g,i)=>{ if(g && !g.id) g.id="zag-group-"+Date.now()+"-"+i; });
    if(st.demoGroups.length && !st.demoGroup) st.demoGroup=st.demoGroups[0];
  }
  migrateGroups();

  const originalSave=window.save;
  window.save=function(){
    migrateGroups();
    if(st.demoGroup){
      const i=st.demoGroups.findIndex(g=>g.id===st.demoGroup.id);
      if(i>=0) st.demoGroups[i]=st.demoGroup;
    }
    return originalSave.apply(this,arguments);
  };

  const originalFinish=window.finishCreateGroup;
  window.finishCreateGroup=function(){
    const previousGroups=Array.isArray(st.demoGroups)?st.demoGroups.slice():[];
    const previousActive=st.demoGroup;

    /* Let the app create the new group once. */
    originalFinish.apply(this,arguments);
    const created=st.demoGroup;
    if(!created || created===previousActive)return;

    if(!created.id)created.id="zag-group-"+Date.now()+"-"+Math.random().toString(36).slice(2,8);

    /* originalFinish calls save(), and the multi-group save wrapper may already
       have inserted the new active group. Rebuild the array by ID/reference so
       the new group can exist exactly once. */
    const candidates=[...previousGroups, ...(Array.isArray(st.demoGroups)?st.demoGroups:[]), created];
    const unique=[];
    const seenIds=new Set();
    const seenRefs=new Set();

    candidates.forEach(g=>{
      if(!g)return;
      if(g.id){
        if(seenIds.has(g.id))return;
        seenIds.add(g.id);
      }else{
        if(seenRefs.has(g))return;
        seenRefs.add(g);
      }
      unique.push(g);
    });

    st.demoGroups=unique;
    st.demoGroup=created;
    save();
    groupsPage();
  };

  const originalGroupsPage=window.groupsPage;
  window.groupsPage=function(view){
    migrateGroups();
    if(!st.demoGroups.length) return originalGroupsPage.call(this,view);

    const screen=document.getElementById("screen");
    if(!screen) return originalGroupsPage.call(this,view);

    let rendered=[];
    const activeId=st.demoGroup&&st.demoGroup.id;
    const activeView=st.groupView;

    for(const g of st.demoGroups){
      st.demoGroup=g;
      let allowed=(typeof visibleMainTabs==="function"?visibleMainTabs():[]).map(x=>x[0]);
      /* A clicked tab calls groupsPage(view). Apply that requested view only
         to the group that was activated by the box's capture listener. */
      let requested=(g.id===activeId && view && allowed.includes(view))?view:null;
      let v=requested || ((g._groupView && allowed.includes(g._groupView))?g._groupView:(allowed[0]||"none"));
      g._groupView=v;
      st.groupView=v;
      originalGroupsPage.call(this,v);
      const section=screen.querySelector(".groupSectionBox");
      let content=section ? section.outerHTML : "";
      rendered.push(`<div class="zagPersistentGroup" data-group-id="${g.id}">${content}</div>`);
      g._groupView=st.groupView;
    }

    st.demoGroup=st.demoGroups.find(g=>g.id===activeId)||st.demoGroups[0];
    st.groupView=(st.demoGroup&&st.demoGroup._groupView)||activeView||"total";
    screen.innerHTML=`<div class="title"><h1>Groups</h1><p>Friendly competition · train harder together</p></div>`+
      rendered.join("")+
      `<button class="pick createAnotherGroup" onclick="createGroup()">+ Create Group</button>`;

    /* Make controls inside each rendered group activate that group before their normal action. */
    screen.querySelectorAll(".zagPersistentGroup").forEach(box=>{
      box.addEventListener("click",function(e){
        const id=this.dataset.groupId;
        const g=st.demoGroups.find(x=>x.id===id);
        if(g) st.demoGroup=g;
      },true);
    });
  };

  /* Keep each group's selected leaderboard view independently. */
  document.addEventListener("click",function(e){
    const box=e.target.closest&&e.target.closest(".zagPersistentGroup");
    if(!box)return;
    const g=st.demoGroups&&st.demoGroups.find(x=>x.id===box.dataset.groupId);
    if(!g)return;
    const t=(e.target.textContent||"").trim();
    if(t==="Total") g._groupView="total";
    else if(t==="Bodyweight") g._groupView="bodyweight";
    else if(t==="Individual Exercises") g._groupView="exercises";
  },true);

  setTimeout(()=>{try{migrateGroups();save()}catch(e){}},50);
})();



(function(){
 const previousEdit=window.editGroup;

 window.editGroup=function(){
   previousEdit.apply(this,arguments);
   setTimeout(function(){
     const saveBtn=[...document.querySelectorAll("button")].find(b=>(b.textContent||"").trim()==="Save Group");
     if(!saveBtn)return;
     const panel=saveBtn.parentElement;
     if(panel.querySelector(".exileGroupBtn"))return;
     const b=document.createElement("button");
     b.type="button"; b.className="exileGroupBtn"; b.textContent="Exile Group";
     b.onclick=function(e){
       e.preventDefault();e.stopPropagation();
       let old=panel.querySelector(".exileConfirmBox");
       if(old){old.remove();return;}
       const box=document.createElement("div");
       box.className="exileConfirmBox";
       box.innerHTML='<b>Exile this group?</b><div class="small">This will permanently delete this group.</div><div class="exileConfirmActions"><button type="button" class="exileCancel">Cancel</button><button type="button" class="exileConfirm">Exile Group</button></div>';
       box.querySelector(".exileCancel").onclick=function(){box.remove()};
       box.querySelector(".exileConfirm").onclick=function(ev){
         ev.preventDefault();ev.stopPropagation();deleteActiveZagGroup();
       };
       b.insertAdjacentElement("afterend",box);
     };
     saveBtn.insertAdjacentElement("afterend",b);
   },0);
 };

 window.deleteActiveZagGroup=function(){
   const doomed=st.demoGroup;
   if(!doomed)return;
   const id=doomed.id;

   if(Array.isArray(st.demoGroups)){
     st.demoGroups=st.demoGroups.filter(g=>g && (id ? g.id!==id : g!==doomed));
   }else st.demoGroups=[];

   st.demoGroup=st.demoGroups[0]||null;
   st.groupView=st.demoGroup ? (st.demoGroup._groupView||"total") : "none";

   try{
     if(typeof KEY!=="undefined")localStorage.setItem(KEY,JSON.stringify(st));
   }catch(e){}

   try{closeModal()}catch(e){}
   setTimeout(function(){
     try{groupsPage(st.groupView)}catch(e){}
   },20);
 };
})();



(function(){
  function clean(){
    const root=document.getElementById("screen");
    if(!root)return;
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let n;
    while(n=w.nextNode()){
      n.nodeValue=n.nodeValue.replace(/(?:🏻|🏼|🏽|🏾|🏿)?/gu,"").replace(/\s{2,}/g," ");
    }
  }
  const gp=window.groupsPage;
  window.groupsPage=function(){
    const r=gp.apply(this,arguments);
    clean();
    return r;
  };
  clean();
})();



(function(){
  function groupForBox(box){
    if(!box || !Array.isArray(st.demoGroups))return null;
    return st.demoGroups.find(g=>g && String(g.id)===String(box.dataset.groupId))||null;
  }

  function renderView(g,view){
    const prev=st.demoGroup, prevView=st.groupView;
    st.demoGroup=g;
    st.groupView=view;
    let result="";
    try{
      if(view==="total") result=groupTotalLayout();
      else if(view==="bodyweight"){
        const lb=g.leaderboards||{};
        const available=[];
        if(lb.bodyweightCombined)available.push(["combined","Combined Weight"]);
        if(lb.bodyweightIndividual)available.push(["individual","Individual Exercise"]);
        if(!available.length)available.push(["combined","Combined Weight"],["individual","Individual Exercise"]);
        if(!available.some(x=>x[0]===g._bodyweightMode))g._bodyweightMode=available[0][0];

        let body="";
        if(g._bodyweightMode==="individual"){
          let opts=(g.exercises||[]).filter(Boolean);
          if(!opts.length)opts=["Squats","Bench Press","Deadlifts","Weighted Lat Pull Up","Barbell Row"];
          if(!opts.includes(g._bodyweightExercise))g._bodyweightExercise=opts[0];
          const ex=g._bodyweightExercise;
          const ms=groupMembers().sort((a,b)=>((b.vals[ex]||0)/b.bw)-((a.vals[ex]||0)/a.bw));
          body=`<div class="exerciseTabStrip zagBwExerciseTabs">${opts.map(x=>`<button type="button" data-exercise="${esc(x)}" class="exerciseTab zagBwExerciseTab ${x===ex?'sel':''}">${esc(x)}</button>`).join("")}</div>
            ${groupPodium(ms,m=>((m.vals[ex]||0)/m.bw).toFixed(2)+"×")}
            ${groupTable(ex+" Bodyweight Ratio Leaderboard",ms,m=>((m.vals[ex]||0)/m.bw).toFixed(2)+"×","Ratio")}`;
        }else{
          body=groupBodyweightLayout();
        }

        result=`<div class="zagBwSubTabs">${available.map(([mode,label])=>`<button type="button" class="zagBwSubTab ${g._bodyweightMode===mode?'sel':''}" data-bw-mode="${mode}">${label}</button>`).join("")}</div>${body}`;
      }
      else if(view==="exercises") result=groupExercises();
    }finally{
      st.demoGroup=prev;
      st.groupView=prevView;
    }
    return result;
  }

  function prepareBoxes(){
    document.querySelectorAll(".zagPersistentGroup").forEach(function(box){
      const g=groupForBox(box);
      if(!g)return;

      const tabs=[...box.querySelectorAll(".groupMainTab")];
      if(!tabs.length)return;

      /* Identify the leaderboard content as everything after the main tab row
         inside this group's groupSectionBox, and put it in one replaceable host. */
      const tabRow=tabs[0].parentElement;
      const section=tabRow && tabRow.parentElement;
      if(!section)return;

      let host=section.querySelector(":scope > .zagLeaderboardHost");
      if(!host){
        host=document.createElement("div");
        host.className="zagLeaderboardHost";
        let node=tabRow.nextSibling;
        while(node){
          const next=node.nextSibling;
          host.appendChild(node);
          node=next;
        }
        section.appendChild(host);
      }

      tabs.forEach(function(b){
        const text=(b.textContent||"").replace(/\s+/g," ").trim();
        if(text==="Total")b.dataset.zagView="total";
        else if(text==="Bodyweight")b.dataset.zagView="bodyweight";
        else if(text==="Individual Exercises")b.dataset.zagView="exercises";
        b.removeAttribute("onclick");
        b.type="button";
      });
    });
  }

  document.addEventListener("click",function(e){
    const b=e.target.closest && e.target.closest(".zagPersistentGroup .groupMainTab[data-zag-view]");
    if(!b)return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const box=b.closest(".zagPersistentGroup");
    const g=groupForBox(box);
    if(!g)return;

    const view=b.dataset.zagView;
    const section=b.parentElement.parentElement;
    const host=section.querySelector(":scope > .zagLeaderboardHost");
    if(!host)return;

    g._groupView=view;
    st.demoGroup=g;
    st.groupView=view;

    [...b.parentElement.querySelectorAll(".groupMainTab")].forEach(x=>x.classList.toggle("sel",x===b));

    /* Replace only this leaderboard's content. The whole page is not rebuilt,
       so the scroll position cannot jump to the top. */
    host.innerHTML=renderView(g,view);

    try{
      if(typeof KEY!=="undefined")localStorage.setItem(KEY,JSON.stringify(st));
    }catch(err){}
  },true);

  const existing=window.groupsPage;
  window.groupsPage=function(){
    const y=window.scrollY;
    const r=existing.apply(this,arguments);
    prepareBoxes();
    requestAnimationFrame(()=>window.scrollTo(0,y));
    return r;
  };

  prepareBoxes();
})();



(function(){
  window.syncGroupCreateUI=function(){
    const c=groupCreateState||{};
    const set=(id,on)=>document.getElementById(id)?.classList.toggle("selected",!!on);
    set("gCombinedBox",c.combined);
    set("gIndividualBox",c.individual);
    set("gRatioOuter",c.bodyweight);
    set("gRatioCombined",c.ratioCombined);
    set("gRatioIndividual",c.ratioIndividual);
    const count=document.getElementById("gExerciseCount");
    if(count)count.textContent=(c.selectedExercises?.size||0)?`${c.selectedExercises.size} selected`:"None selected";
  };
  window.toggleGroupMode=function(k){
    if(!groupCreateState)return;
    groupCreateState[k]=!groupCreateState[k];
    if((k==="ratioCombined"||k==="ratioIndividual") && groupCreateState[k])groupCreateState.bodyweight=true;
    syncGroupCreateUI();
  };
})();



(function(){
  function findGroup(box){
    if(!box||!Array.isArray(st.demoGroups))return null;
    return st.demoGroups.find(g=>g&&String(g.id)===String(box.dataset.groupId))||null;
  }
  function persist(){
    try{ if(typeof KEY!=="undefined") localStorage.setItem(KEY,JSON.stringify(st)); }catch(e){}
  }
  function renderBodyweightIndividual(g){
    let opts=(g.exercises||[]).filter(Boolean);
    if(!opts.length)opts=["Squats","Bench Press","Deadlifts","Weighted Lat Pull Up","Barbell Row"];
    if(!opts.includes(g._bodyweightExercise))g._bodyweightExercise=opts[0];
    const ex=g._bodyweightExercise;
    const ms=groupMembers().sort((a,b)=>((b.vals[ex]||0)/b.bw)-((a.vals[ex]||0)/a.bw));
    return `<div class="exerciseTabStrip zagBwExerciseTabs">${opts.map(x=>`<button type="button" data-exercise="${esc(x)}" class="exerciseTab zagBwExerciseTab ${x===ex?'sel':''}">${esc(x)}</button>`).join("")}</div>
      ${groupPodium(ms,m=>((m.vals[ex]||0)/m.bw).toFixed(2)+"×")}
      ${groupTable(ex+" Bodyweight Ratio Leaderboard",ms,m=>((m.vals[ex]||0)/m.bw).toFixed(2)+"×","Ratio")}`;
  }

  function renderFor(g,view){
    const oldG=st.demoGroup, oldV=st.groupView;
    st.demoGroup=g; st.groupView=view;
    let s="";
    if(view==="total")s=groupTotalLayout();
    else if(view==="bodyweight"){
      s=(g._bodyweightMode==="individual")?renderBodyweightIndividual(g):groupBodyweightLayout();
    }
    else if(view==="exercises")s=groupExercises();
    st.demoGroup=oldG; st.groupView=oldV;
    return s;
  }

  /* Bodyweight gets its own two-option switch inside the Bodyweight page. */
  function installBodyweightSubtabs(box,g){
    if(!box||!g||g._groupView!=="bodyweight")return;
    const host=box.querySelector(".zagLeaderboardHost");
    if(!host)return;
    if(host.querySelector(".zagBwSubTabs"))return;

    const lb=g.leaderboards||{};
    const available=[];
    if(lb.bodyweightCombined)available.push(["combined","Combined Weight"]);
    if(lb.bodyweightIndividual)available.push(["individual","Individual Exercise"]);
    /* If an older group has Bodyweight enabled but neither child stored,
       expose both choices rather than an empty Bodyweight page. */
    if(!available.length){
      available.push(["combined","Combined Weight"],["individual","Individual Exercise"]);
    }
    g._bodyweightMode=g._bodyweightMode||available[0][0];

    const row=document.createElement("div");
    row.className="zagBwSubTabs";
    available.forEach(([mode,label])=>{
      const b=document.createElement("button");
      b.type="button";
      b.className="zagBwSubTab"+(g._bodyweightMode===mode?" sel":"");
      b.dataset.bwMode=mode;
      b.textContent=label;
      row.appendChild(b);
    });
    host.prepend(row);
  }

  function prepare(){
    document.querySelectorAll(".zagPersistentGroup").forEach(box=>{
      const g=findGroup(box);
      if(g)installBodyweightSubtabs(box,g);
    });
  }

  /* Save Edit Group from the actual current controls and rebuild the page once.
     This is capture-phase so no older Save Group handler can overwrite it. */
  document.addEventListener("click",function(e){
    const b=e.target.closest?.("button");
    if(!b || (b.textContent||"").trim()!=="Save Group")return;
    if(typeof groupCreateState==="undefined" || !groupCreateState || !document.getElementById("gname"))return;
    const g=st.demoGroup;
    if(!g)return;

    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();

    const name=(document.getElementById("gname").value||"").trim();
    if(!name){alert("Give your group a name first.");return}

    g.name=name;
    g.emblem=groupCreateState.emblem||g.emblem||"";
    g.exercises=[...(groupCreateState.selectedExercises||new Set())];
    g.leaderboards={
      combined:!!groupCreateState.combined,
      bodyweight:!!groupCreateState.bodyweight,
      individual:!!groupCreateState.individual,
      bodyweightCombined:!!groupCreateState.ratioCombined,
      bodyweightIndividual:!!groupCreateState.ratioIndividual
    };

    const allowed=[];
    if(g.leaderboards.combined)allowed.push("total");
    if(g.leaderboards.bodyweight)allowed.push("bodyweight");
    if(g.leaderboards.individual)allowed.push("exercises");
    if(!allowed.includes(g._groupView))g._groupView=allowed[0]||"none";

    const i=Array.isArray(st.demoGroups)?st.demoGroups.findIndex(x=>x&&String(x.id)===String(g.id)):-1;
    if(i>=0)st.demoGroups[i]=g;
    st.demoGroup=g; st.groupView=g._groupView;
    persist();
    try{closeModal()}catch(err){}
    const y=window.scrollY;
    groupsPage();
    requestAnimationFrame(()=>{window.scrollTo(0,y);prepare()});
  },true);

  /* Bodyweight sub-option: change only the content under the two boxes. */
  document.addEventListener("click",function(e){
    const b=e.target.closest?.(".zagBwSubTab");
    if(!b)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    const box=b.closest(".zagPersistentGroup"), g=findGroup(box);
    if(!g)return;
    g._bodyweightMode=b.dataset.bwMode;
    persist();

    const host=box.querySelector(".zagLeaderboardHost");
    if(!host)return;
    /* Let the app's bodyweight renderer use its existing mode variable too. */
    window.zgBodyMode=g._bodyweightMode;
    host.innerHTML=renderFor(g,"bodyweight");
    installBodyweightSubtabs(box,g);
  },true);

  /* Inside Bodyweight > Individual Exercise, switch between the selected
     exercises without leaving Bodyweight or rebuilding the whole Groups page. */
  document.addEventListener("click",function(e){
    const b=e.target.closest?.(".zagBwExerciseTab");
    if(!b)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();

    const box=b.closest(".zagPersistentGroup"), g=findGroup(box);
    if(!g)return;
    g._bodyweightMode="individual";
    g._bodyweightExercise=b.dataset.exercise || (b.textContent||"").trim();
    persist();

    const host=box.querySelector(".zagLeaderboardHost");
    if(!host)return;
    host.innerHTML=renderFor(g,"bodyweight");
    installBodyweightSubtabs(box,g);
  },true);

  /* Individual-exercise selector buttons must stay inside Exercises.
     Stop their old handler from causing groupsPage() to restore Total. */
  document.addEventListener("click",function(e){
    const box=e.target.closest?.(".zagPersistentGroup");
    if(!box)return;
    const g=findGroup(box);
    if(!g || g._groupView!=="exercises")return;

    const target=e.target.closest("button");
    if(!target)return;
    const main=target.closest(".groupMainTabs");
    if(main)return;

    /* Exercise choice controls in groupExercises carry exercise text/data.
       Preserve the chosen exercise, then rerender only Exercises. */
    const ex=target.dataset.exercise || target.dataset.ex || target.getAttribute("data-exercise");
    if(!ex)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    g._exerciseView=ex;
    st.demoGroup=g; st.groupView="exercises";
    window.groupExerciseView=ex;
    persist();
    const host=box.querySelector(".zagLeaderboardHost");
    if(host)host.innerHTML=renderFor(g,"exercises");
  },true);

  const oldGP=window.groupsPage;
  window.groupsPage=function(){
    const r=oldGP.apply(this,arguments);
    prepare();
    return r;
  };
  prepare();
})();



(function(){
  document.addEventListener("click",function(e){
    const btn=e.target.closest?.(".zagPersistentGroup .exerciseTab");
    if(!btn)return;

    const box=btn.closest(".zagPersistentGroup");
    if(!box || !Array.isArray(st.demoGroups))return;
    const g=st.demoGroups.find(x=>x && String(x.id)===String(box.dataset.groupId));
    if(!g)return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const exercise=(btn.textContent||"").trim();

    /* groupExercises() reads st.groupExercise. This was the missing piece in
       the previous fix: changing a separate custom variable did nothing. */
    g._groupView="exercises";
    g._groupExercise=exercise;
    st.demoGroup=g;
    st.groupView="exercises";
    st.groupExercise=exercise;

    try{
      if(typeof KEY!=="undefined")localStorage.setItem(KEY,JSON.stringify(st));
    }catch(err){}

    const host=box.querySelector(".zagLeaderboardHost");
    if(host){
      host.innerHTML=groupExercises();
    }

    /* Keep the main Individual Exercises tab visibly selected. */
    box.querySelectorAll(".groupMainTab").forEach(function(t){
      const label=(t.textContent||"").replace(/\s+/g," ").trim();
      t.classList.toggle("sel",label==="Individual Exercises");
    });
  },true);
})();



window.zagChooseGroupImage=function(){
  const existing=document.getElementById("zagEmblemPickerOnly");
  if(existing){existing.remove();return}
  const row=document.querySelector(".zagEditGroupTopRow");
  if(!row)return;
  const current=(window.groupCreateState&&groupCreateState.emblem)||st.demoGroup?.emblem||"";
  const picker=document.createElement("div");
  picker.id="zagEmblemPickerOnly";
  picker.className="zagEmblemPickerOnly";
  picker.innerHTML='<div class="zagEmblemPickerOnlyTitle">Select Group Emblem</div><div class="zagEmblemPickerOnlyGrid">'+
    zagEmblemNames.map(function(id){
      return '<button type="button" class="zagEmblemPickerOnlyChoice '+(id===current?'selected':'')+'" data-emblem="'+id+'" onclick="zagSelectGroupEmblem(\''+id+'\')"><img src="'+zagEmblemSrc(id)+'" alt=""></button>';
    }).join("")+'</div>';
  row.insertAdjacentElement("afterend",picker);
};
window.zagSelectGroupEmblem=function(id){
  if(typeof groupCreateState==="undefined" || !groupCreateState)return;
  groupCreateState.emblem=id;
  const btn=document.querySelector(".zagGroupImageBox");
  if(btn)btn.innerHTML='<img class="zagGroupImagePreview" src="'+zagEmblemSrc(id)+'" alt="">';
  document.querySelectorAll(".zagEmblemPickerOnlyChoice").forEach(function(b){
    b.classList.toggle("selected",b.dataset.emblem===id);
  });
};



(function(){
  function targetIndex(zone,y,dragging){
    const rows=[...zone.querySelectorAll(".splitDragExercise")].filter(r=>r!==dragging);
    for(let i=0;i<rows.length;i++){
      const b=rows[i].getBoundingClientRect();
      if(y<b.top+b.height/2)return i;
    }
    return rows.length;
  }
  function move(di,fromType,fromIndex,toType,target){
    const from=st.days[di][fromType?2:1],to=st.days[di][toType?2:1];
    if(!from||!to||fromIndex<0||fromIndex>=from.length)return;
    const item=from[fromIndex];
    from.splice(fromIndex,1);
    if(from===to&&target>fromIndex)target--;
    target=Math.max(0,Math.min(target,to.length));
    to.splice(target,0,item);
    syncPlannedDays();save();dayExerciseEditor(di);
  }

  /* Replace the earlier initializer so desktop and iPhone dragging both work. */
  window.initSplitExerciseDrag=function(){
    document.querySelectorAll(".splitDragExercise").forEach(row=>{
      row.ondragstart=e=>{
        splitExerciseDrag={day:+row.dataset.day,type:+row.dataset.type,index:+row.dataset.index};
        row.classList.add("dragging");
        if(e.dataTransfer){e.dataTransfer.effectAllowed="move";try{e.dataTransfer.setData("text/plain","move")}catch(_){}}
      };
      row.ondragend=()=>{row.classList.remove("dragging");document.querySelectorAll(".splitDropZone").forEach(z=>z.classList.remove("dragOver"))};

      const handle=row.querySelector(".splitDragHandle");
      if(!handle)return;
      handle.onpointerdown=e=>{
        if(e.pointerType==="mouse")return;
        e.preventDefault();e.stopPropagation();
        const di=+row.dataset.day,fromType=+row.dataset.type,fromIndex=+row.dataset.index;
        row.classList.add("dragging");
        try{handle.setPointerCapture(e.pointerId)}catch(_){}
        const ghost=document.createElement("div");
        ghost.className="splitTouchGhost";
        ghost.textContent=row.querySelector(".splitDragName")?.textContent||"Exercise";
        document.body.appendChild(ghost);
        const place=(x,y)=>{ghost.style.left=(x+12)+"px";ghost.style.top=(y-24)+"px"};
        place(e.clientX,e.clientY);
        const clear=()=>document.querySelectorAll(".splitDropZone").forEach(z=>z.classList.remove("dragOver"));
        handle.onpointermove=ev=>{
          place(ev.clientX,ev.clientY);clear();
          document.elementFromPoint(ev.clientX,ev.clientY)?.closest?.(".splitDropZone")?.classList.add("dragOver");
        };
        const finish=ev=>{
          clear();row.classList.remove("dragging");ghost.remove();
          const zone=document.elementFromPoint(ev.clientX,ev.clientY)?.closest?.(".splitDropZone");
          handle.onpointermove=handle.onpointerup=handle.onpointercancel=null;
          if(zone&&+zone.dataset.day===di)move(di,fromType,fromIndex,+zone.dataset.type,targetIndex(zone,ev.clientY,row));
        };
        handle.onpointerup=finish;
        handle.onpointercancel=()=>{clear();row.classList.remove("dragging");ghost.remove();handle.onpointermove=handle.onpointerup=handle.onpointercancel=null};
      };
    });

    document.querySelectorAll(".splitDropZone").forEach(zone=>{
      zone.ondragover=e=>{e.preventDefault();zone.classList.add("dragOver");if(e.dataTransfer)e.dataTransfer.dropEffect="move"};
      zone.ondragleave=e=>{if(!zone.contains(e.relatedTarget))zone.classList.remove("dragOver")};
      zone.ondrop=e=>{
        e.preventDefault();e.stopPropagation();zone.classList.remove("dragOver");
        if(!splitExerciseDrag)return;
        const d=splitExerciseDrag;splitExerciseDrag=null;
        if(+zone.dataset.day!==d.day)return;
        const dragging=document.querySelector(".splitDragExercise.dragging");
        move(d.day,d.type,d.index,+zone.dataset.type,targetIndex(zone,e.clientY,dragging));
      };
    });
  };
})();



(function(){
  let marker=null;

  function removeMarker(){
    if(marker){marker.remove();marker=null}
  }
  function rowsFor(zone,dragging){
    return [...zone.querySelectorAll(".splitDragExercise")].filter(r=>r!==dragging);
  }
  function showMarker(zone,y,dragging){
    removeMarker();
    marker=document.createElement("div");
    marker.className="splitDropMarker";
    const rows=rowsFor(zone,dragging);
    let before=null;
    for(const r of rows){
      const b=r.getBoundingClientRect();
      if(y < b.top+b.height/2){before=r;break}
    }
    zone.insertBefore(marker,before);
  }
  function markerIndex(zone){
    if(!marker||marker.parentElement!==zone)return rowsFor(zone,document.querySelector(".splitDragExercise.dragging")).length;
    let n=0;
    for(const child of zone.children){
      if(child===marker)return n;
      if(child.classList&&child.classList.contains("splitDragExercise")&&!child.classList.contains("dragging"))n++;
    }
    return n;
  }
  function moveItem(di,fromType,fromIndex,toType,target){
    const from=st.days[di][fromType?2:1],to=st.days[di][toType?2:1];
    if(!from||!to||fromIndex<0||fromIndex>=from.length)return;
    const item=from.splice(fromIndex,1)[0];
    if(from===to&&target>fromIndex)target--;
    target=Math.max(0,Math.min(target,to.length));
    to.splice(target,0,item);
    syncPlannedDays();save();dayExerciseEditor(di);
  }

  window.initSplitExerciseDrag=function(){
    document.querySelectorAll(".splitDragExercise").forEach(row=>{
      row.draggable=true;

      row.ondragstart=e=>{
        splitExerciseDrag={day:+row.dataset.day,type:+row.dataset.type,index:+row.dataset.index};
        row.classList.add("dragging");
        if(e.dataTransfer){
          e.dataTransfer.effectAllowed="move";
          try{e.dataTransfer.setData("text/plain","move")}catch(_){}
        }
      };
      row.ondragend=()=>{
        row.classList.remove("dragging");
        document.querySelectorAll(".splitDropZone").forEach(z=>z.classList.remove("dragOver"));
        removeMarker();
      };

      const handle=row.querySelector(".splitDragHandle");
      if(!handle)return;

      /* On touch screens ONLY the handle starts a drag. The rest of every row scrolls normally. */
      handle.onpointerdown=e=>{
        if(e.pointerType==="mouse")return;
        e.preventDefault();e.stopPropagation();

        const di=+row.dataset.day,fromType=+row.dataset.type,fromIndex=+row.dataset.index;
        row.classList.add("dragging");
        try{handle.setPointerCapture(e.pointerId)}catch(_){}

        const ghost=document.createElement("div");
        ghost.className="splitTouchGhost";
        ghost.textContent=row.querySelector(".splitDragName")?.textContent||"Exercise";
        document.body.appendChild(ghost);
        const place=(x,y)=>{ghost.style.left=(x+12)+"px";ghost.style.top=(y-24)+"px"};
        place(e.clientX,e.clientY);

        const clearZones=()=>document.querySelectorAll(".splitDropZone").forEach(z=>z.classList.remove("dragOver"));

        handle.onpointermove=ev=>{
          ev.preventDefault();
          place(ev.clientX,ev.clientY);
          clearZones();

          /* Hide the floating label briefly so elementFromPoint sees what's underneath it. */
          ghost.style.display="none";
          const under=document.elementFromPoint(ev.clientX,ev.clientY);
          ghost.style.display="";
          const zone=under?.closest?.(".splitDropZone");

          if(zone&&+zone.dataset.day===di){
            zone.classList.add("dragOver");
            showMarker(zone,ev.clientY,row);

            /* Auto-scroll the modal/page when dragging near the viewport edges. */
            const edge=90;
            if(ev.clientY<edge) window.scrollBy(0,-12);
            else if(ev.clientY>window.innerHeight-edge) window.scrollBy(0,12);
          }else removeMarker();
        };

        const finish=ev=>{
          clearZones();
          row.classList.remove("dragging");
          ghost.style.display="none";
          const under=document.elementFromPoint(ev.clientX,ev.clientY);
          const zone=under?.closest?.(".splitDropZone") || marker?.parentElement;
          ghost.remove();

          const target=zone&&+zone.dataset.day===di ? markerIndex(zone) : -1;
          removeMarker();
          handle.onpointermove=handle.onpointerup=handle.onpointercancel=null;

          if(zone&&+zone.dataset.day===di&&target>=0)
            moveItem(di,fromType,fromIndex,+zone.dataset.type,target);
        };
        handle.onpointerup=finish;
        handle.onpointercancel=()=>{
          clearZones();row.classList.remove("dragging");ghost.remove();removeMarker();
          handle.onpointermove=handle.onpointerup=handle.onpointercancel=null;
        };
      };
    });

    document.querySelectorAll(".splitDropZone").forEach(zone=>{
      zone.ondragover=e=>{
        e.preventDefault();
        zone.classList.add("dragOver");
        if(e.dataTransfer)e.dataTransfer.dropEffect="move";
        showMarker(zone,e.clientY,document.querySelector(".splitDragExercise.dragging"));
      };
      zone.ondragleave=e=>{
        if(!zone.contains(e.relatedTarget)){zone.classList.remove("dragOver");removeMarker()}
      };
      zone.ondrop=e=>{
        e.preventDefault();e.stopPropagation();
        zone.classList.remove("dragOver");
        if(!splitExerciseDrag){removeMarker();return}
        const d=splitExerciseDrag;splitExerciseDrag=null;
        if(+zone.dataset.day!==d.day){removeMarker();return}
        const target=markerIndex(zone);
        removeMarker();
        moveItem(d.day,d.type,d.index,+zone.dataset.type,target);
      };
    });
  };
})();

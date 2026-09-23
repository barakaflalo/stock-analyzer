/* StockAI · app-value.js — Fair-value calculator and thesis journal
   AppNest © 2026 · load order matters: see <script> tags in stock-analyzer.html */
/* ══════════════════════════════════════════════════════════════
   PHASE 3 — שווי הוגן (AI Berkshire terminal_value, MIT) · יומן תזה (thesis-drift)
══════════════════════════════════════════════════════════════ */
var P3_T={
he:{tabValue:"שווי",tabThesis:"התזה שלי",
valT:"💎 שווי הוגן — 3 תרחישים",vBear:"פסימי",vBase:"בסיס",vBull:"אופטימי",vsPrice:"מול המחיר",
implied:"המחיר הנוכחי מגלם צמיחת רווח של {g} בשנה ל-{n} שנים",impliedNA:"לא ניתן לחשב צמיחה גלומה בטווח הסביר",
sGrowth:"צמיחת רווח שנתית",sROIC:"תשואה על ההון (ROIC)",sR:"תשואה נדרשת (היוון)",sGT:"צמיחה לטווח ארוך",sYears:"שנות צמיחה",reset:"↺ ברירת מחדל",
spreadWarn:"⚠️ הפער בין התשואה הנדרשת לצמיחה לטווח ארוך קטן מ-5 נקודות — המודל רגיש מאוד ולא אמין.",
valNA:"המחשבון דורש רווח למניה חיובי — לא רלוונטי למניה זו כרגע.",
valNote:"מודל: רווח שצומח N שנים ואז מכפיל רווח סופי = (1 − g/ROIC) / (r − g), מהוון להיום. שיטה: AI Berkshire. זהו כלי לחשיבה, לא המלצה — שנה את ההנחות וראה כמה התוצאה רגישה.",
thT:"📝 התזה שלי",thWhy:"למה אני מחזיק / עוקב אחרי המניה?",thWhyPh:"למשל: צמיחה בהכנסות מ-AI, הנהלה חזקה, מחיר נמוך ביחס למתחרים…",thKill:"אמכור / אוותר אם…",thKillPh:"למשל: שולי הרווח יורדים מתחת ל-20%, מנכ״ל עוזב, הצמיחה נעצרת 2 רבעונים…",thEntry:"מחיר בעת כתיבת התזה",
thSave:"💾 שמור תזה",thEdit:"✏️ ערוך",thDel:"🗑 מחק",thDelQ:"למחוק את התזה למניה זו?",thSince:"מאז הכתיבה",thDays:"לפני {n} ימים",thWritten:"נכתבה",
thCheck:"🔍 בדוק סטייה מהתזה עם AI",thChecking:"בודק את התזה מול הנתונים העדכניים…",thNoAI:"צריך לחבר AI כדי לבדוק סטייה (הגדרות ⚙).",
stINTACT:"✅ התזה שרירה",stWEAKENING:"⚠️ התזה נחלשת",stBROKEN:"❌ התזה נשברה",thTrig:"תנאי יציאה שהתקיימו",thLast:"בדיקה אחרונה",
thEmpty:"כתוב כאן למה אתה מחזיק במניה ומתי תמכור. בפעם הבאה תוכל לבדוק עם AI אם הסיבה עדיין תקפה — כך לא מתאהבים במניה."},
en:{tabValue:"Value",tabThesis:"My Thesis",
valT:"💎 Fair value — 3 scenarios",vBear:"Bear",vBase:"Base",vBull:"Bull",vsPrice:"vs price",
implied:"The current price implies {g} annual earnings growth for {n} years",impliedNA:"Implied growth is outside the reasonable range",
sGrowth:"Annual earnings growth",sROIC:"Return on capital (ROIC)",sR:"Required return (discount)",sGT:"Long-term growth",sYears:"Growth years",reset:"↺ Defaults",
spreadWarn:"⚠️ Required return minus long-term growth is under 5 points — the model becomes extremely sensitive and unreliable.",
valNA:"The calculator needs positive EPS — not applicable to this stock right now.",
valNote:"Model: earnings grow for N years, then terminal P/E = (1 − g/ROIC) / (r − g), discounted to today. Method: AI Berkshire. A thinking tool, not a recommendation — change the assumptions and see how sensitive the result is.",
thT:"📝 My thesis",thWhy:"Why do I own / watch this stock?",thWhyPh:"e.g. AI revenue growth, strong management, cheap vs peers…",thKill:"I will sell / give up if…",thKillPh:"e.g. margins fall below 20%, CEO leaves, growth stalls for 2 quarters…",thEntry:"Price when thesis was written",
thSave:"💾 Save thesis",thEdit:"✏️ Edit",thDel:"🗑 Delete",thDelQ:"Delete the thesis for this stock?",thSince:"Since written",thDays:"{n} days ago",thWritten:"Written",
thCheck:"🔍 Check thesis drift with AI",thChecking:"Checking your thesis against current data…",thNoAI:"Connect an AI to check drift (settings ⚙).",
stINTACT:"✅ Thesis intact",stWEAKENING:"⚠️ Thesis weakening",stBROKEN:"❌ Thesis broken",thTrig:"Exit conditions met",thLast:"Last check",
thEmpty:"Write why you hold this stock and when you'd sell. Later you can check with AI whether the reason still holds — so you don't fall in love with a stock."},
ru:{tabValue:"Стоимость",tabThesis:"Мой тезис",
valT:"💎 Справедливая стоимость — 3 сценария",vBear:"Пессимист.",vBase:"Базовый",vBull:"Оптимист.",vsPrice:"к цене",
implied:"Текущая цена предполагает рост прибыли {g} в год в течение {n} лет",impliedNA:"Подразумеваемый рост вне разумного диапазона",
sGrowth:"Годовой рост прибыли",sROIC:"Доходность капитала (ROIC)",sR:"Требуемая доходность",sGT:"Долгосрочный рост",sYears:"Лет роста",reset:"↺ По умолчанию",
spreadWarn:"⚠️ Разница между требуемой доходностью и долгосрочным ростом меньше 5 пунктов — модель очень чувствительна и ненадёжна.",
valNA:"Калькулятору нужна положительная EPS — сейчас неприменимо.",
valNote:"Модель: прибыль растёт N лет, затем конечный P/E = (1 − g/ROIC) / (r − g), с дисконтированием. Метод: AI Berkshire. Инструмент для размышлений, не рекомендация.",
thT:"📝 Мой тезис",thWhy:"Почему я держу / слежу за акцией?",thWhyPh:"напр.: рост выручки от ИИ, сильное руководство, дёшево к конкурентам…",thKill:"Продам / откажусь, если…",thKillPh:"напр.: маржа ниже 20%, уход CEO, рост стоит 2 квартала…",thEntry:"Цена при написании тезиса",
thSave:"💾 Сохранить",thEdit:"✏️ Изменить",thDel:"🗑 Удалить",thDelQ:"Удалить тезис по этой акции?",thSince:"С момента написания",thDays:"{n} дн. назад",thWritten:"Написан",
thCheck:"🔍 Проверить отклонение с ИИ",thChecking:"Сверяю тезис с актуальными данными…",thNoAI:"Подключите ИИ для проверки (настройки ⚙).",
stINTACT:"✅ Тезис в силе",stWEAKENING:"⚠️ Тезис ослабевает",stBROKEN:"❌ Тезис сломан",thTrig:"Сработавшие условия выхода",thLast:"Последняя проверка",
thEmpty:"Запишите, почему держите акцию и когда продадите. Потом ИИ проверит, актуальна ли причина — чтобы не влюбиться в акцию."},
es:{tabValue:"Valor",tabThesis:"Mi tesis",
valT:"💎 Valor razonable — 3 escenarios",vBear:"Pesimista",vBase:"Base",vBull:"Optimista",vsPrice:"vs precio",
implied:"El precio actual implica un crecimiento de beneficios del {g} anual durante {n} años",impliedNA:"El crecimiento implícito está fuera de un rango razonable",
sGrowth:"Crecimiento anual del beneficio",sROIC:"Retorno del capital (ROIC)",sR:"Rentabilidad exigida",sGT:"Crecimiento a largo plazo",sYears:"Años de crecimiento",reset:"↺ Valores por defecto",
spreadWarn:"⚠️ La rentabilidad exigida menos el crecimiento a largo plazo es menor a 5 puntos — el modelo es muy sensible y poco fiable.",
valNA:"La calculadora necesita un BPA positivo — no aplica a esta acción ahora.",
valNote:"Modelo: el beneficio crece N años y luego P/E terminal = (1 − g/ROIC) / (r − g), descontado a hoy. Método: AI Berkshire. Herramienta para pensar, no una recomendación.",
thT:"📝 Mi tesis",thWhy:"¿Por qué tengo / sigo esta acción?",thWhyPh:"ej.: crecimiento por IA, buena dirección, barata vs competidores…",thKill:"Venderé / la dejaré si…",thKillPh:"ej.: márgenes bajo 20%, se va el CEO, crecimiento frenado 2 trimestres…",thEntry:"Precio al escribir la tesis",
thSave:"💾 Guardar tesis",thEdit:"✏️ Editar",thDel:"🗑 Borrar",thDelQ:"¿Borrar la tesis de esta acción?",thSince:"Desde que se escribió",thDays:"hace {n} días",thWritten:"Escrita",
thCheck:"🔍 Revisar desvío con IA",thChecking:"Comparando tu tesis con los datos actuales…",thNoAI:"Conecta una IA para revisar (ajustes ⚙).",
stINTACT:"✅ Tesis intacta",stWEAKENING:"⚠️ Tesis debilitándose",stBROKEN:"❌ Tesis rota",thTrig:"Condiciones de salida cumplidas",thLast:"Última revisión",
thEmpty:"Escribe por qué tienes la acción y cuándo venderías. Luego la IA revisará si el motivo sigue vigente — para no enamorarte de una acción."},
ar:{tabValue:"القيمة",tabThesis:"أطروحتي",
valT:"💎 القيمة العادلة — 3 سيناريوهات",vBear:"متشائم",vBase:"أساسي",vBull:"متفائل",vsPrice:"مقابل السعر",
implied:"السعر الحالي يفترض نمواً في الأرباح بنسبة {g} سنوياً لمدة {n} سنوات",impliedNA:"النمو الضمني خارج النطاق المعقول",
sGrowth:"نمو الأرباح السنوي",sROIC:"العائد على رأس المال (ROIC)",sR:"العائد المطلوب (الخصم)",sGT:"النمو طويل الأجل",sYears:"سنوات النمو",reset:"↺ الافتراضي",
spreadWarn:"⚠️ الفرق بين العائد المطلوب والنمو طويل الأجل أقل من 5 نقاط — النموذج حساس جداً وغير موثوق.",
valNA:"تحتاج الحاسبة ربحية سهم موجبة — غير منطبقة حالياً.",
valNote:"النموذج: تنمو الأرباح N سنوات ثم مكرر الربحية النهائي = (1 − g/ROIC) / (r − g)، مخصوماً لليوم. المنهجية: AI Berkshire. أداة للتفكير وليست توصية.",
thT:"📝 أطروحتي",thWhy:"لماذا أملك / أتابع هذا السهم؟",thWhyPh:"مثلاً: نمو إيرادات الذكاء الاصطناعي، إدارة قوية، رخيص مقارنة بالمنافسين…",thKill:"سأبيع / أتخلى إذا…",thKillPh:"مثلاً: تراجع الهامش تحت 20%، رحيل الرئيس التنفيذي، توقف النمو ربعين…",thEntry:"السعر عند كتابة الأطروحة",
thSave:"💾 حفظ الأطروحة",thEdit:"✏️ تعديل",thDel:"🗑 حذف",thDelQ:"حذف الأطروحة لهذا السهم؟",thSince:"منذ الكتابة",thDays:"قبل {n} أيام",thWritten:"كُتبت",
thCheck:"🔍 فحص انحراف الأطروحة بالذكاء الاصطناعي",thChecking:"جارٍ مقارنة أطروحتك بالبيانات الحالية…",thNoAI:"اربط ذكاءً اصطناعياً للفحص (الإعدادات ⚙).",
stINTACT:"✅ الأطروحة قائمة",stWEAKENING:"⚠️ الأطروحة تضعف",stBROKEN:"❌ الأطروحة انهارت",thTrig:"شروط الخروج المتحققة",thLast:"آخر فحص",
thEmpty:"اكتب لماذا تملك السهم ومتى ستبيع. لاحقاً يفحص الذكاء الاصطناعي إن كان السبب ما زال قائماً — كي لا تقع في حب سهم."}
};
function P3(k){var l=P3_T[curLang]||P3_T.en;return (l[k]!=null)?l[k]:(P3_T.en[k]!=null?P3_T.en[k]:k);}
function P3f(k,o){var s=P3(k);for(var x in o)s=s.split('{'+x+'}').join(o[x]);return s;}

/* ══ FAIR VALUE ENGINE ══ */
function fvValue(st,g1){
  var E0=st.E0,R=st.R,r=st.r,gT=st.gT,N=st.N;
  if(r-gT<=0.005)return null;
  var p1=Math.max(0,Math.min(1,1-g1/R)),pT=Math.max(0.05,Math.min(1,1-gT/R));
  var peT=pT/(r-gT),v=0,e=E0;
  for(var t=1;t<=N;t++){e=e*(1+g1);v+=e*p1/Math.pow(1+r,t);}
  v+=peT*e*(1+gT)/Math.pow(1+r,N);
  return v;
}
function fvImplied(st){
  var lo=-0.3,hi=1.0,flo=fvValue(st,lo)-st.P,fhi=fvValue(st,hi)-st.P;
  if(flo==null||fhi==null||flo*fhi>0)return null;
  for(var i=0;i<60;i++){var m=(lo+hi)/2,fm=fvValue(st,m)-st.P;if(fm*flo>0){lo=m;flo=fm;}else hi=m;}
  return (lo+hi)/2;
}
function fvDefaults(q){
  var qr=window.__qualityResult&&window.__qualityResult.symbol===q.symbol?window.__qualityResult:null;
  var roe=null,g=null;
  if(qr){var m=qr.res.metrics[0];roe=m.v;g=qr.res.epsCagr;}
  if(roe==null)roe=q.returnOnEquity;
  if(g==null)g=q.revenueGrowth;
  return {R:Math.max(0.05,Math.min(0.40,roe!=null?roe:0.12)),g1:Math.max(-0.05,Math.min(0.30,g!=null?g:0.05)),r:0.10,gT:0.025,N:5};
}
function renderValuation(symbol,q){
  var el=document.getElementById('lvValue');if(!el||!q)return;
  if(!(q.eps>0)||!(q.regularPrice>0)||q.currency==='ILA'){el.innerHTML='<div class="rec-trend-title">'+P3('valT')+'</div><div class="ta-small">'+P3('valNA')+'</div>';renderLiveTabs();applyLiveTabs();window.__fvState=null;return;}
  var d=fvDefaults(q);
  window.__fvState={symbol:symbol,P:q.regularPrice,E0:q.eps,cur:q.currency,R:d.R,g1:d.g1,r:d.r,gT:d.gT,N:d.N,def:d};
  function sl(id,lbl,min,max,step,val){return '<div class="fv-sl"><label>'+lbl+' <strong id="fvv-'+id+'"></strong></label><input type="range" id="fvs-'+id+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'" oninput="fvInput()"></div>';}
  var st=window.__fvState;
  el.innerHTML='<div class="rec-trend-title">'+P3('valT')+'</div><div id="fvOut"></div>'
    +'<div class="fv-sliders">'
    +sl('g1',P3('sGrowth'),-5,30,0.5,(st.g1*100).toFixed(1))
    +sl('R',P3('sROIC'),5,40,1,Math.round(st.R*100))
    +sl('r',P3('sR'),6,15,0.5,(st.r*100).toFixed(1))
    +sl('gT',P3('sGT'),0,4,0.25,(st.gT*100).toFixed(2))
    +'<div class="fv-sl"><label>'+P3('sYears')+'</label><div class="fv-years"><button id="fvy5" onclick="fvYears(5)">5</button><button id="fvy10" onclick="fvYears(10)">10</button></div></div>'
    +'<button class="fv-reset" onclick="fvReset()">'+P3('reset')+'</button></div>'
    +'<div class="ta-note">'+P3('valNote')+'</div>';
  fvDraw();renderLiveTabs();applyLiveTabs();
}
function fvInput(){var st=window.__fvState;if(!st)return;
  st.g1=+document.getElementById('fvs-g1').value/100;st.R=+document.getElementById('fvs-R').value/100;
  st.r=+document.getElementById('fvs-r').value/100;st.gT=+document.getElementById('fvs-gT').value/100;fvDraw();}
function fvYears(n){if(window.__fvState){window.__fvState.N=n;fvDraw();}}
function fvReset(){var st=window.__fvState;if(!st)return;var d=st.def;
  st.g1=d.g1;st.R=d.R;st.r=d.r;st.gT=d.gT;st.N=d.N;
  document.getElementById('fvs-g1').value=(d.g1*100).toFixed(1);document.getElementById('fvs-R').value=Math.round(d.R*100);
  document.getElementById('fvs-r').value=(d.r*100).toFixed(1);document.getElementById('fvs-gT').value=(d.gT*100).toFixed(2);fvDraw();}
function fvScen(st){
  var g=st.g1,bear=g>0?g*0.5:g*1.5,bull=Math.min(0.40,g>0?g*1.5:g*0.5);
  return [['vBear',bear],['vBase',g],['vBull',bull]].map(function(s){return {k:s[0],g:s[1],v:fvValue(st,s[1])};});
}
function fvDraw(){
  var st=window.__fvState,out=document.getElementById('fvOut');if(!st||!out)return;
  document.getElementById('fvv-g1').textContent=(st.g1*100).toFixed(1)+'%';document.getElementById('fvv-R').textContent=Math.round(st.R*100)+'%';
  document.getElementById('fvv-r').textContent=(st.r*100).toFixed(1)+'%';document.getElementById('fvv-gT').textContent=(st.gT*100).toFixed(2)+'%';
  ['5','10'].forEach(function(n){var b=document.getElementById('fvy'+n);if(b)b.className=(String(st.N)===n)?'active':'';});
  var cards='';
  fvScen(st).forEach(function(s){
    if(s.v==null){cards+='<div class="fv-card"><div class="profile-name">'+P3(s.k)+'</div><div class="fv-val">—</div></div>';return;}
    var mos=(s.v/st.P-1)*100,col=mos>=15?'var(--green)':mos>=-10?'var(--gold)':'var(--red)';
    cards+='<div class="fv-card" style="border-top-color:'+col+'"><div class="profile-name">'+P3(s.k)+' · '+(s.g*100).toFixed(1)+'%</div>'
      +'<div class="fv-val">'+fmtPrice(s.v,st.cur)+'</div><div class="fv-mos" style="color:'+col+'">'+fmtPct(mos)+' '+P3('vsPrice')+'</div></div>';
  });
  var ig=fvImplied(st);
  var impl=ig!=null?P3f('implied',{g:'<strong>'+(ig*100).toFixed(1)+'%</strong>',n:st.N}):P3('impliedNA');
  out.innerHTML='<div class="fv-cards">'+cards+'</div><div class="fv-implied">'+impl+'</div>'
    +((st.r-st.gT)<0.05?'<div class="fv-warn">'+P3('spreadWarn')+'</div>':'');
}

/* ══ THESIS JOURNAL (AI Berkshire thesis-tracker / thesis-drift) ══ */
function thLoad(){try{return JSON.parse(localStorage.getItem('stockai_thesis'))||{};}catch(e){return {};}}
function thSaveAll(o){try{localStorage.setItem('stockai_thesis',JSON.stringify(o));}catch(e){}}
function renderThesis(symbol){
  var el=document.getElementById('lvThesis');if(!el)return;
  var all=thLoad(),t=all[symbol],q=window.__lastLiveQuote,price=q&&q.symbol===symbol?q.regularPrice:null,cur=q&&q.currency;
  var h='<div class="rec-trend-title">'+P3('thT')+'</div>';
  if(!t||t.editing){
    var e=t||{};
    h+='<div class="ta-small" style="margin-bottom:10px">'+P3('thEmpty')+'</div>'
      +'<label class="th-lbl">'+P3('thWhy')+'</label><textarea class="key-input th-ta" id="thWhy" rows="3" placeholder="'+escHtml(P3('thWhyPh'))+'">'+escHtml(e.why||'')+'</textarea>'
      +'<label class="th-lbl">'+P3('thKill')+'</label><textarea class="key-input th-ta" id="thKill" rows="2" placeholder="'+escHtml(P3('thKillPh'))+'">'+escHtml(e.kill||'')+'</textarea>'
      +'<label class="th-lbl">'+P3('thEntry')+'</label><input class="key-input" id="thEntry" type="number" step="any" value="'+(e.entry!=null?e.entry:(price!=null?price:''))+'">'
      +'<button class="btn-ai-analyze" style="margin-top:10px;width:100%" onclick="thSave(\''+symbol+'\')">'+P3('thSave')+'</button>';
  }else{
    var days=Math.floor((Date.now()-new Date(t.date).getTime())/86400000);
    var chg=(price!=null&&t.entry)?(price/t.entry-1)*100:null;
    h+='<div class="th-card"><div class="th-meta">'+P3('thWritten')+': '+escHtml(t.date.slice(0,10))+' · '+P3f('thDays',{n:days})
      +(t.entry?' · '+fmtPrice(t.entry,cur):'')+(chg!=null?' · '+P3('thSince')+': <strong style="color:'+(chg>=0?'var(--green)':'var(--red)')+'">'+fmtPct(chg)+'</strong>':'')+'</div>'
      +'<div class="th-why">'+escHtml(t.why).replace(/\n/g,'<br>')+'</div>'
      +(t.kill?'<div class="th-kill"><strong>'+P3('thKill')+'</strong> '+escHtml(t.kill).replace(/\n/g,'<br>')+'</div>':'')
      +'<div class="th-btns"><button onclick="thEdit(\''+symbol+'\')">'+P3('thEdit')+'</button><button onclick="thDelete(\''+symbol+'\')">'+P3('thDel')+'</button></div></div>'
      +'<button class="btn-ai-analyze" id="thCheckBtn" style="margin-top:10px;width:100%" onclick="thCheck(\''+symbol+'\')">'+P3('thCheck')+'</button>'
      +'<div id="thResult">'+(t.check?thResultHtml(t.check):'')+'</div>';
  }
  el.innerHTML=h;
}
function thSave(symbol){
  var why=(document.getElementById('thWhy').value||'').trim();if(!why)return;
  var all=thLoad(),old=all[symbol]||{};
  var entry=parseFloat(document.getElementById('thEntry').value);
  all[symbol]={why:why,kill:(document.getElementById('thKill').value||'').trim(),entry:isFinite(entry)?entry:null,date:old.date||new Date().toISOString(),check:old.check||null};
  thSaveAll(all);renderThesis(symbol);
}
function thEdit(symbol){var all=thLoad();if(all[symbol]){all[symbol].editing=true;thSaveAll(all);renderThesis(symbol);delete all[symbol].editing;thSaveAll(all);}}
function thDelete(symbol){if(!confirm(P3('thDelQ')))return;var all=thLoad();delete all[symbol];thSaveAll(all);renderThesis(symbol);}
function thResultHtml(c){
  var col=c.status==='INTACT'?'var(--green)':c.status==='BROKEN'?'var(--red)':'var(--gold)';
  return '<div class="th-res" style="border-color:'+col+'"><div class="th-res-st" style="color:'+col+'">'+P3('st'+c.status)+'</div>'
    +'<div class="th-res-sum">'+escHtml(c.summary||'')+'</div>'
    +(c.triggered&&c.triggered.length?'<div class="th-res-trig"><strong>'+P3('thTrig')+':</strong>'+c.triggered.map(function(x){return '<div>• '+escHtml(x)+'</div>';}).join('')+'</div>':'')
    +(c.points&&c.points.length?'<ul class="th-res-pts">'+c.points.map(function(x){return '<li>'+escHtml(x)+'</li>';}).join('')+'</ul>':'')
    +'<div class="ta-small">'+P3('thLast')+': '+escHtml((c.ts||'').slice(0,16).replace('T',' '))+'</div></div>';
}

/* Generic AI JSON call — uses the user's own provider & keys */
async function aiCompleteJSON(system,user){
  return parseAIResponse(await aiText(system,user,{maxTokens:2000}));
}

async function thCheck(symbol){
  var box=document.getElementById('thResult'),btn=document.getElementById('thCheckBtn');
  if(!loadAIConfig().provider){box.innerHTML='<div class="fv-warn">'+P3('thNoAI')+'</div>';return;}
  var t=thLoad()[symbol];if(!t)return;
  btn.disabled=true;box.innerHTML='<div class="ta-small">⏳ '+P3('thChecking')+'</div>';
  var lang=AI_LANG_NAMES[curLang]||'English';
  var system='You are a disciplined investment reviewer using the AI-Berkshire thesis-drift method. Compare the investor\'s ORIGINAL thesis and exit (kill) criteria against CURRENT facts. Be honest, specific and unsentimental — the goal is to stop the investor from falling in love with a stock. Return ONLY a JSON object (no markdown): {"status":"INTACT","summary":"2 sentences","triggered":["kill criteria that are now met"],"points":["evidence 1","evidence 2","evidence 3"]}. status must be INTACT, WEAKENING or BROKEN. triggered is an empty array if none. Write summary, triggered and points in '+lang+'.';
  var user='STOCK: '+symbol+'\nTHESIS written '+t.date.slice(0,10)+(t.entry?' at price '+t.entry:'')+':\n'+t.why+'\nEXIT CRITERIA: '+(t.kill||'(none stated)')+'\n\nCURRENT DATA:\n'+buildLiveContext(symbol);
  try{
    var res=await aiCompleteJSON(system,user);
    var st=String(res.status||'').toUpperCase();if(['INTACT','WEAKENING','BROKEN'].indexOf(st)<0)st='WEAKENING';
    var c={status:st,summary:res.summary||'',triggered:res.triggered||[],points:res.points||[],ts:new Date().toISOString()};
    var all=thLoad();if(all[symbol]){all[symbol].check=c;thSaveAll(all);}
    box.innerHTML=thResultHtml(c);
  }catch(err){
    var em=String(err.message||'');
    box.innerHTML='<div class="fv-warn">'+(/quota|429|exhaust|rate.?limit|overload|503/i.test(em)?(QUOTA_T[curLang]||QUOTA_T.en):escHtml(em))+'</div>';
  }finally{btn.disabled=false;}
}

/* Extra AI context: fair value + the investor's thesis */
function buildPhase3Context(symbol){
  var out=[],st=window.__fvState;
  if(st&&st.symbol===symbol){var base=fvValue(st,st.g1),ig=fvImplied(st);
    if(base)out.push('FAIR VALUE (code-computed, base case, EPS growth '+(st.g1*100).toFixed(1)+'%, ROIC '+Math.round(st.R*100)+'%, r '+(st.r*100)+'%): '+base.toFixed(2)+' vs price '+st.P+(ig!=null?'; the price implies '+(ig*100).toFixed(1)+'% annual EPS growth for '+st.N+' years':''));}
  var t=thLoad()[symbol];
  if(t)out.push('INVESTOR THESIS: '+t.why+(t.kill?' | EXIT IF: '+t.kill:''));
  return out.length?'\n'+out.join('\n')+'\n':'';
}

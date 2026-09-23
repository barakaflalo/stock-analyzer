/* StockAI · app-init.js — Onboarding tour, language re-render, startup (window.onload)
   AppNest © 2026 · load order matters: see <script> tags in stock-analyzer.html */
/* ══ ONBOARDING TOUR — סיור היכרות קצר למשתמש חדש (6 שלבים, אפשר לדלג) ══ */
var TOUR_T={
he:{skip:"דלג",next:"הבא ←",back:"→ הקודם",done:"בוא נתחיל! 🚀",replay:"🎓 סיור היכרות",
s:[["👋","ברוך הבא ל-StockAI","ניתוח מניות מארה\"ב ומישראל — נתונים חיים, גרפים, ניתוח טכני, מבחן איכות ושווי הוגן. הכל בחינם, בלי הרשמה ובלי מפתח."],
["🔍","חפש מניה","הקלד סימול או שם חברה — גם בעברית (\"טבע\", \"אפל\") — ובחר מהרשימה. או לחץ על אחד הכפתורים המהירים."],
["📑","כרטיס המניה","לכל מניה יש טאבים: סקירה, טכני, אנליסטים, איכות, שווי, דוחות, אירועים, חדשות — ו\"התזה שלי\" שבה כותבים למה מחזיקים. בארה\"ב המחירים זזים בזמן אמת (● חי)."],
["🤖","ניתוח AI — אופציונלי","רוצה ניתוח חכם? חבר מפתח AI משלך (Gemini חינמי, 2 דקות). ועדה של 4 \"מאסטרים\" תנתח את המניה על בסיס הנתונים האמיתיים."],
["🔥","שוק · ניקוד · מעקב","🔥 מה זז היום בארה\"ב ובישראל + יומן כלכלי ודוחות. 📊 כמה פעמים ה-AI צדק. ◈ רשימת המעקב שלך."],
["⚠️","חשוב לדעת","הכל למטרות מידע ולימוד — לא ייעוץ השקעות. הנתונים שלך נשמרים רק על המכשיר. ℹ️ אודות ← מדיניות פרטיות ודוח אבחון."]]},
en:{skip:"Skip",next:"Next →",back:"← Back",done:"Let's go! 🚀",replay:"🎓 Quick tour",
s:[["👋","Welcome to StockAI","Stock analysis for US and Israeli markets — live data, charts, technical analysis, a quality test and fair value. All free, no sign-up, no key."],
["🔍","Find a stock","Type a symbol or company name and pick from the list. Or tap one of the quick buttons."],
["📑","The stock card","Each stock has tabs: Overview, Technical, Analysts, Quality, Value, Financials, Events, News — and \"My Thesis\" where you write why you hold it. US prices move in real time (● LIVE)."],
["🤖","AI analysis — optional","Want a smart analysis? Connect your own AI key (Gemini is free, 2 minutes). A committee of 4 \"masters\" analyzes the stock from the real data."],
["🔥","Market · Score · Watchlist","🔥 What's moving today in the US and Israel + economic and earnings calendars. 📊 How often the AI was right. ◈ Your watchlist."],
["⚠️","Good to know","Everything is for information and learning — not investment advice. Your data stays on your device only. ℹ️ About → privacy policy and diagnostics."]]},
ru:{skip:"Пропустить",next:"Далее →",back:"← Назад",done:"Начнём! 🚀",replay:"🎓 Обзор приложения",
s:[["👋","Добро пожаловать в StockAI","Анализ акций США и Израиля — данные в реальном времени, графики, технический анализ, тест качества и справедливая стоимость. Бесплатно, без регистрации и ключа."],
["🔍","Найдите акцию","Введите тикер или название компании и выберите из списка. Или нажмите одну из быстрых кнопок."],
["📑","Карточка акции","У каждой акции есть вкладки: Обзор, Техника, Аналитики, Качество, Стоимость, Финансы, События, Новости — и «Мой тезис», где вы пишете, почему держите её. Цены в США обновляются в реальном времени (● LIVE)."],
["🤖","Анализ ИИ — по желанию","Хотите умный анализ? Подключите свой ключ ИИ (Gemini бесплатно, 2 минуты). Комитет из 4 «мастеров» проанализирует акцию на основе реальных данных."],
["🔥","Рынок · Счёт · Избранное","🔥 Что движется сегодня в США и Израиле + экономический календарь и отчёты. 📊 Как часто ИИ был прав. ◈ Ваш список."],
["⚠️","Важно знать","Всё для информации и обучения — не инвестиционный совет. Ваши данные хранятся только на устройстве. ℹ️ О приложении → конфиденциальность и диагностика."]]},
es:{skip:"Saltar",next:"Siguiente →",back:"← Atrás",done:"¡Empecemos! 🚀",replay:"🎓 Recorrido rápido",
s:[["👋","Bienvenido a StockAI","Análisis de acciones de EE. UU. e Israel — datos en vivo, gráficos, análisis técnico, test de calidad y valor razonable. Todo gratis, sin registro ni clave."],
["🔍","Busca una acción","Escribe un símbolo o el nombre de la empresa y elige de la lista. O toca uno de los botones rápidos."],
["📑","La ficha de la acción","Cada acción tiene pestañas: Resumen, Técnico, Analistas, Calidad, Valor, Finanzas, Eventos, Noticias — y \"Mi tesis\" donde escribes por qué la tienes. Los precios de EE. UU. se mueven en tiempo real (● EN VIVO)."],
["🤖","Análisis IA — opcional","¿Quieres un análisis inteligente? Conecta tu propia clave de IA (Gemini es gratis, 2 minutos). Un comité de 4 \"maestros\" analiza la acción con datos reales."],
["🔥","Mercado · Marcador · Seguimiento","🔥 Qué se mueve hoy en EE. UU. e Israel + calendarios económico y de resultados. 📊 Cuánto acierta la IA. ◈ Tu lista."],
["⚠️","Importante","Todo es informativo y educativo — no es asesoramiento de inversión. Tus datos solo quedan en tu dispositivo. ℹ️ Acerca de → privacidad y diagnóstico."]]},
ar:{skip:"تخطي",next:"التالي ←",back:"→ السابق",done:"لنبدأ! 🚀",replay:"🎓 جولة تعريفية",
s:[["👋","مرحباً بك في StockAI","تحليل أسهم أمريكا وإسرائيل — بيانات مباشرة ورسوم وتحليل فني واختبار جودة وقيمة عادلة. كل ذلك مجاناً، بلا تسجيل وبلا مفتاح."],
["🔍","ابحث عن سهم","اكتب الرمز أو اسم الشركة واختر من القائمة. أو اضغط أحد الأزرار السريعة."],
["📑","بطاقة السهم","لكل سهم تبويبات: نظرة عامة، فني، المحللون، الجودة، القيمة، المالية، الأحداث، الأخبار — و\"أطروحتي\" حيث تكتب لماذا تملكه. أسعار أمريكا تتحرك مباشرة (● مباشر)."],
["🤖","تحليل الذكاء الاصطناعي — اختياري","تريد تحليلاً ذكياً؟ اربط مفتاحك (Gemini مجاني، دقيقتان). لجنة من 4 \"أساتذة\" تحلل السهم من البيانات الحقيقية."],
["🔥","السوق · النتيجة · المتابعة","🔥 ما يتحرك اليوم في أمريكا وإسرائيل + التقويم الاقتصادي والنتائج. 📊 كم مرة أصاب الذكاء الاصطناعي. ◈ قائمتك."],
["⚠️","مهم أن تعرف","كل شيء للمعلومات والتعلم — ليس نصيحة استثمارية. بياناتك تبقى على جهازك فقط. ℹ️ حول ← الخصوصية والتشخيص."]]}
};
var TOUR_TARGETS=[null,'.search-card',null,'#aiStatusBtn','.header-bottom-row',null],__tourStep=0;
function TT(){return TOUR_T[curLang]||TOUR_T.en;}
function startTour(){__tourStep=0;renderTour();openModal('tourOverlay');}
function tourHl(sel){document.querySelectorAll('.tour-hl').forEach(function(e){e.classList.remove('tour-hl');});
  if(!sel)return;var el=document.querySelector(sel);if(el){el.classList.add('tour-hl');try{el.scrollIntoView({behavior:'smooth',block:'center'});}catch(e){}}}
function renderTour(){
  var t=TT(),s=t.s[__tourStep],last=__tourStep===t.s.length-1,el=document.getElementById('tourBody');if(!el)return;
  el.innerHTML='<div class="tour-emoji">'+s[0]+'</div><div class="tour-title">'+s[1]+'</div><div class="tour-text">'+s[2]+'</div>'
    +'<div class="tour-dots">'+t.s.map(function(_,i){return '<span class="'+(i===__tourStep?'on':'')+'"></span>';}).join('')+'</div>'
    +'<div class="tour-btns"><button class="tour-skip" onclick="endTour()">'+t.skip+'</button><span>'
    +(__tourStep>0?'<button class="tour-back" onclick="tourGo(-1)">'+t.back+'</button>':'')
    +'<button class="btn-ai-analyze" onclick="'+(last?'endTour()':'tourGo(1)')+'">'+(last?t.done:t.next)+'</button></span></div>';
  tourHl(TOUR_TARGETS[__tourStep]);
}
function tourGo(d){__tourStep=Math.max(0,Math.min(TT().s.length-1,__tourStep+d));renderTour();}
function endTour(){try{localStorage.setItem('stockai_tour_done','1');}catch(e){}tourHl(null);closeModal('tourOverlay');}
function maybeStartTour(){
  if(localStorage.getItem('stockai_tour_done'))return;
  // משתמש קיים (יש לו כבר נתונים) — לא מציגים אוטומטית; זמין באודות
  var existing=loadAIConfig().provider||loadWatchlist().length||sbLoad().length||(analysisHistory&&analysisHistory.length);
  if(existing){try{localStorage.setItem('stockai_tour_done','1');}catch(e){}return;}
  setTimeout(startTour,600);
}

/* החלפת שפה — מרנדרים מחדש את כל מה שמוצג, כדי ששום דבר לא יישאר בשפה הקודמת */
var __origRenderResult=renderResult;
renderResult=function(r,s){window.__lastRR=[r,s];return __origRenderResult(r,s);};
function rerenderForLanguage(){
  renderDataDisclaimer();renderChartRanges();
  try{renderFx();}catch(e){}
  if(currentLiveSymbol){var keepTab=currentLiveTab;loadLiveData(currentLiveSymbol).then(function(){if(keepTab&&keepTab!=='overview'){switchLiveTab(keepTab);}});}
  if(window.__lastRR&&document.getElementById('resultCard').classList.contains('visible')){window.__noScroll=true;try{__origRenderResult(window.__lastRR[0],window.__lastRR[1]);}finally{window.__noScroll=false;}}
  try{renderHistory();}catch(e){}
}
buildAssistantConfig();
var __origSetLang=setLang;setLang=function(l){__origSetLang(l);try{document.documentElement.lang=l;document.documentElement.dir=(l==='he'||l==='ar')?'rtl':'ltr';}catch(e){}try{rerenderForLanguage();}catch(e){}try{a11yLabels();p5Labels();p7Labels();lsBadge();if(document.getElementById('marketOverlay').classList.contains('open'))renderMarket();if(document.getElementById('tourOverlay').classList.contains('open'))renderTour();buildAssistantConfig();if(document.getElementById('scoreOverlay').classList.contains('open'))renderScoreboard();}catch(e){}};

/* בדיקה עצמית — אם קובץ לא נטען (למשל גרסאות מעורבבות מהמטמון), מציגים פס רענון במקום כפתורים מתים */
var APP_MODULES=['app-i18n','app-core','app-ai','app-ui','app-market','app-engines','app-value','app-platform','app-live','app-insights','app-portfolio','app-init'];
function moduleCheck(){
  var miss=APP_MODULES.filter(function(m){return !(window.__MODS&&window.__MODS[m]);});
  if(!miss.length)return;
  try{var a=JSON.parse(localStorage.getItem('stockai_errlog')||'[]');a.push({t:new Date().toISOString(),m:'Missing modules: '+miss.join(', '),s:'moduleCheck',l:0});localStorage.setItem('stockai_errlog',JSON.stringify(a.slice(-10)));}catch(e){}
  var he=(typeof curLang!=='undefined'&&curLang==='he'),b=document.createElement('div');b.className='file-warn';b.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:99999;margin:0;border-radius:0;text-align:center;cursor:pointer';
  b.textContent=he?'⚠️ העדכון לא נטען במלואו — לחץ כאן לרענון':'⚠️ The update did not fully load — tap here to refresh';
  b.onclick=function(){var go=function(){location.replace(location.pathname+'?r='+Date.now());};
    if(navigator.serviceWorker&&navigator.serviceWorker.getRegistrations)navigator.serviceWorker.getRegistrations().then(function(rs){return Promise.all(rs.map(function(r){return r.unregister();}));}).then(go,go);else go();};
  document.body.appendChild(b);
}
window.onload=function(){
  moduleCheck();
  startupChecks();
  try{var tk=localStorage.getItem('stockai_snap_ticker');if(tk){var tr=document.getElementById('tickerTrack');tr.innerHTML=tk+tk;}}catch(e){}
  applyTheme();
  setLang(curLang);
  updateWatchCount();
  updateAIStatus();
  renderText();
  renderDataDisclaimer();
  renderChartRanges();
  renderHistory();
  a11yLabels();
  p5Labels();
  p7Labels();
  setTimeout(lsConnect,2500);
  setTimeout(maybeStartTour,2400);
  // Live market data — loads immediately, no AI needed
  loadLiveTicker();
  loadFxData();
  // Refresh ticker every 60s, fx every 5min
  setInterval(loadLiveTicker,60000);
  setInterval(loadFxData,300000);
  // Splash: 1.8s then hide
  setTimeout(function(){
    var splash=document.getElementById('splash');
    splash.classList.add('hide');
    setTimeout(function(){splash.style.display='none';},600);
  },1800);
};
;(window.__MODS=window.__MODS||{})['app-init']=1;

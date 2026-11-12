/* StockAI · app-nav.js — bottom navigation bar · phone back button (one step back, "press again to exit") ·
   "More" screen · undo instead of "are you sure?" · in-app confirm · ghost-click guard after a window opens
   Per AppNest requirements: mandatory requirement 1 (back button), requirement 2 (bottom bar — decided: YES,
   StockAI is an app you return to many times a day and move between 4 fixed areas), part 41 §5 (undo), part 31 (ghost click).
   AppNest © 2026 · load order: after app-portfolio.js, before app-decide.js / app-init.js */
var NAV_T={
he:{assistant:"עוזר",home:"בית",watch:"מעקב",market:"שוק",pf:"תיק",more:"עוד",moreT:"☰ עוד",
  gTools:"כלים",gSettings:"הגדרות",gInfo:"מידע",
  mScore:"📊 כרטיס ניקוד",mScoreS:"{n} תחזיות נשמרו",mAlerts:"🔔 התראות מחיר",mAlertsS:"{n} פעילות",mAi:"🤖 חיבור בינה (AI)",mAiOn:"מחובר: {p}",mAiOff:"לא מחובר — האפליקציה עובדת גם בלי",
  mTheme:"🌗 מצב יום / לילה",mThemeD:"כרגע: לילה",mThemeL:"כרגע: יום",mExport:"⬇ גיבוי לקובץ",mExportS:"רשימת מעקב, תיק, התראות, תזות וניקוד — בלי מפתחות",mImport:"⬆ שחזור מגיבוי",
  mGuide:"❓ מדריך",mTour:"🎓 סיור היכרות",mAbout:"ℹ️ אודות, פרטיות ואבחון",mShare:"📤 שתף את האפליקציה",mApps:"🧩 עוד אפליקציות AppNest",
  pressAgainExit:"לחץ שוב כדי לצאת",undo:"↩ בטל",deleted:"נמחק",cleared:"נוקה",restored:"שוחזר",yes:"כן",cancel:"ביטול"},
en:{assistant:"Assistant",home:"Home",watch:"Watchlist",market:"Market",pf:"Portfolio",more:"More",moreT:"☰ More",
  gTools:"Tools",gSettings:"Settings",gInfo:"Info",
  mScore:"📊 Scoreboard",mScoreS:"{n} predictions saved",mAlerts:"🔔 Price alerts",mAlertsS:"{n} active",mAi:"🤖 AI connection",mAiOn:"Connected: {p}",mAiOff:"Not connected — the app works without it",
  mTheme:"🌗 Day / night mode",mThemeD:"Now: night",mThemeL:"Now: day",mExport:"⬇ Back up to a file",mExportS:"Watchlist, portfolio, alerts, theses and scoreboard — no keys",mImport:"⬆ Restore from backup",
  mGuide:"❓ Guide",mTour:"🎓 Quick tour",mAbout:"ℹ️ About, privacy and diagnostics",mShare:"📤 Share the app",mApps:"🧩 More AppNest apps",
  pressAgainExit:"Press back again to exit",undo:"↩ Undo",deleted:"Deleted",cleared:"Cleared",restored:"Restored",yes:"Yes",cancel:"Cancel"},
ru:{assistant:"Помощник",home:"Главная",watch:"Избранное",market:"Рынок",pf:"Портфель",more:"Ещё",moreT:"☰ Ещё",
  gTools:"Инструменты",gSettings:"Настройки",gInfo:"Информация",
  mScore:"📊 Табло точности",mScoreS:"Сохранено прогнозов: {n}",mAlerts:"🔔 Ценовые оповещения",mAlertsS:"Активных: {n}",mAi:"🤖 Подключение ИИ",mAiOn:"Подключено: {p}",mAiOff:"Не подключено — приложение работает и без него",
  mTheme:"🌗 Дневной / ночной режим",mThemeD:"Сейчас: ночь",mThemeL:"Сейчас: день",mExport:"⬇ Резервная копия в файл",mExportS:"Избранное, портфель, оповещения, тезисы и табло — без ключей",mImport:"⬆ Восстановить из копии",
  mGuide:"❓ Руководство",mTour:"🎓 Обзор приложения",mAbout:"ℹ️ О приложении, конфиденциальность, диагностика",mShare:"📤 Поделиться приложением",mApps:"🧩 Другие приложения AppNest",
  pressAgainExit:"Нажмите «назад» ещё раз для выхода",undo:"↩ Отменить",deleted:"Удалено",cleared:"Очищено",restored:"Восстановлено",yes:"Да",cancel:"Отмена"},
es:{assistant:"Asistente",home:"Inicio",watch:"Seguimiento",market:"Mercado",pf:"Cartera",more:"Más",moreT:"☰ Más",
  gTools:"Herramientas",gSettings:"Ajustes",gInfo:"Información",
  mScore:"📊 Marcador",mScoreS:"{n} predicciones guardadas",mAlerts:"🔔 Alertas de precio",mAlertsS:"{n} activas",mAi:"🤖 Conexión de IA",mAiOn:"Conectado: {p}",mAiOff:"Sin conexión — la app funciona sin ella",
  mTheme:"🌗 Modo día / noche",mThemeD:"Ahora: noche",mThemeL:"Ahora: día",mExport:"⬇ Copia de seguridad a un archivo",mExportS:"Seguimiento, cartera, alertas, tesis y marcador — sin claves",mImport:"⬆ Restaurar copia",
  mGuide:"❓ Guía",mTour:"🎓 Recorrido rápido",mAbout:"ℹ️ Acerca de, privacidad y diagnóstico",mShare:"📤 Compartir la app",mApps:"🧩 Más apps de AppNest",
  pressAgainExit:"Pulsa atrás otra vez para salir",undo:"↩ Deshacer",deleted:"Eliminado",cleared:"Borrado",restored:"Restaurado",yes:"Sí",cancel:"Cancelar"},
ar:{assistant:"المساعد",home:"الرئيسية",watch:"المتابعة",market:"السوق",pf:"المحفظة",more:"المزيد",moreT:"☰ المزيد",
  gTools:"أدوات",gSettings:"الإعدادات",gInfo:"معلومات",
  mScore:"📊 لوحة النتائج",mScoreS:"{n} توقعات محفوظة",mAlerts:"🔔 تنبيهات السعر",mAlertsS:"{n} نشطة",mAi:"🤖 ربط الذكاء الاصطناعي",mAiOn:"متصل: {p}",mAiOff:"غير متصل — التطبيق يعمل بدونه",
  mTheme:"🌗 الوضع النهاري / الليلي",mThemeD:"الآن: ليلي",mThemeL:"الآن: نهاري",mExport:"⬇ نسخة احتياطية إلى ملف",mExportS:"المتابعة والمحفظة والتنبيهات والأطروحات واللوحة — بدون مفاتيح",mImport:"⬆ استعادة من نسخة",
  mGuide:"❓ الدليل",mTour:"🎓 جولة تعريفية",mAbout:"ℹ️ حول التطبيق والخصوصية والتشخيص",mShare:"📤 شارك التطبيق",mApps:"🧩 تطبيقات AppNest أخرى",
  pressAgainExit:"اضغط رجوع مرة أخرى للخروج",undo:"↩ تراجع",deleted:"تم الحذف",cleared:"تم المسح",restored:"تمت الاستعادة",yes:"نعم",cancel:"إلغاء"}
};
function NT(k,o){var l=NAV_T[curLang]||NAV_T.en,s=l[k]!=null?l[k]:(NAV_T.en[k]!=null?NAV_T.en[k]:k);for(var x in (o||{}))s=s.split('{'+x+'}').join(o[x]);return s;}

/* ══ 1. Which window is open — one place that knows ══ */
function navOpenOverlays(){return [].slice.call(document.querySelectorAll('.modal-overlay.open'));}
function navWatchOpen(){var p=document.getElementById('watchPanel');return !!(p&&p.classList.contains('open'));}
function navAssistantPanel(){
  // the shared assistant engine has no id on its panel — it is the fixed div above its button
  var kids=document.body?document.body.children:[];
  for(var i=0;i<kids.length;i++){var e=kids[i];if(e.tagName==='DIV'&&e.style&&e.style.zIndex==='100000'&&e.style.display==='flex')return e;}
  return null;
}
function navCloseOverlay(o){
  if(!o)return;
  if(o.id==='tourOverlay'){if(typeof endTour==='function')endTour();else closeModal(o.id);}
  else if(o.id==='setupOverlay')closeSetup();
  else if(o.id==='guideOverlay')closeGuide();
  else if(o.id==='confirmOverlay')cfAnswer(false);
  else closeModal(o.id);
}
function navCloseAll(){
  navOpenOverlays().forEach(function(o){if(o.id!=='confirmOverlay')navCloseOverlay(o);});
  if(navWatchOpen())closeWatchPanel();
}

/* ══ 2. Bottom bar ══ */
var NAV_ITEMS=[['home','🏠'],['watch','⭐'],['market','🔥'],['pf','💼'],['more','☰']];
function navActive(){
  var ids=navOpenOverlays().map(function(o){return o.id;});
  if(ids.indexOf('moreOverlay')>-1||ids.indexOf('scoreOverlay')>-1||ids.indexOf('aboutOverlay')>-1||ids.indexOf('setupOverlay')>-1||ids.indexOf('guideOverlay')>-1)return 'more';
  if(ids.indexOf('pfOverlay')>-1)return 'pf';
  if(ids.indexOf('marketOverlay')>-1)return 'market';
  if(navWatchOpen())return 'watch';
  return 'home';
}
function navSync(){
  var a=navActive();
  NAV_ITEMS.forEach(function(it){var b=document.getElementById('bn-'+it[0]);if(!b)return;var on=it[0]===a;b.classList.toggle('on',on);if(on)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
}
function navLabels(){
  NAV_ITEMS.forEach(function(it){var l=document.getElementById('bnl-'+it[0]);if(l)l.textContent=NT(it[0]);var b=document.getElementById('bn-'+it[0]);if(b)b.setAttribute('aria-label',NT(it[0]));});
  var mt=document.getElementById('moreTitle');if(mt)mt.textContent=NT('moreT');
  if(document.getElementById('moreOverlay')&&document.getElementById('moreOverlay').classList.contains('open'))renderMore();
  navBadge();
  // the shared assistant engine writes its button label in Hebrew — label it in the current language
  var ab=document.getElementById('appnest-assistant-btn');if(ab)ab.textContent='🪄 '+NT('assistant');
}
function navBadge(){
  var b=document.getElementById('bnWatchCount');if(!b)return;
  var n=0;try{n=loadWatchlist().length;}catch(e){}
  b.textContent=n?String(n):'';b.style.display=n?'':'none';
}
function navGo(t){
  var cur=navActive();
  if(t==='home'){
    if(cur==='home'){ // tapping the active tab scrolls to the top (requirement 2)
      if(window.scrollY>40)window.scrollTo({top:0,behavior:'smooth'});
      else{var i=document.getElementById('stockInput');if(i)i.focus();}
      return;
    }
    navCloseAll();navSync();return;
  }
  if(t===cur&&t!=='more'){var ov=t==='watch'?document.querySelector('.watch-body'):document.querySelector('.modal-overlay.open .modal-box');if(ov)ov.scrollTo({top:0,behavior:'smooth'});return;}
  navCloseAll();
  if(t==='watch')openWatchPanel();
  else if(t==='market')openMarket();
  else if(t==='pf')openPortfolio();
  else if(t==='more')openMore();
  navSync();
}

/* ══ 3. "More" screen — groups, each row with a status line (part 41 §4) ══ */
function openMore(){renderMore();openModal('moreOverlay');}
function moreRow(icon,title,sub,fn){return '<button class="mr-row" onclick="'+fn+'"><span class="mr-t">'+title+'</span>'+(sub?'<span class="mr-s">'+sub+'</span>':'')+'</button>';}
function renderMore(){
  var el=document.getElementById('moreBody');if(!el)return;
  var nSb=0,nAl=0,prov='';
  try{nSb=sbLoad().length;}catch(e){}
  try{nAl=alLoad().filter(function(a){return a.active!==false&&!a.done;}).length;}catch(e){}
  try{prov=loadAIConfig().provider||'';}catch(e){}
  var provName=prov?(document.getElementById('aiStatusName')&&document.getElementById('aiStatusName').textContent)||prov:'';
  var h='<div class="mr-group">'+NT('gTools')+'</div>'
    +moreRow('',NT('mScore'),NT('mScoreS',{n:nSb}),"navFrom('more');openScoreboard()")
    +moreRow('',NT('mAlerts'),NT('mAlertsS',{n:nAl}),"navFrom('more');openPortfolio('al')")
    +'<div class="mr-group">'+NT('gSettings')+'</div>'
    +moreRow('',NT('mAi'),prov?NT('mAiOn',{p:escHtml(provName)}):NT('mAiOff'),"navFrom('more');openSetup()")
    +moreRow('',NT('mTheme'),(typeof isDark!=='undefined'&&isDark)?NT('mThemeD'):NT('mThemeL'),"toggleTheme();renderMore()")
    +moreRow('',NT('mExport'),NT('mExportS'),"exportWatchlist()")
    +moreRow('',NT('mImport'),'',"importWatchlist()")
    +'<div class="mr-group">'+NT('gInfo')+'</div>'
    +moreRow('',NT('mGuide'),'',"navFrom('more');openGuide()")
    +moreRow('',NT('mTour'),'',"closeModal('moreOverlay');startTour()")
    +moreRow('',NT('mAbout'),'v'+(typeof APP_VERSION!=='undefined'?APP_VERSION:''),"navFrom('more');openAbout()")
    +moreRow('',NT('mShare'),'',"shareApp()")
    +'<a class="mr-row" href="https://appnest-store.pages.dev" target="_blank" rel="noopener"><span class="mr-t">'+NT('mApps')+'</span></a>';
  el.innerHTML=h;
}
/* a window opened from "More" returns to "More" on back / ✕ (inner screen → where we came from) */
var __navFromMore=null;
function navFrom(src){closeModal('moreOverlay');__navFromMore=src;}

/* ══ 4. Phone back button — one guard entry + one popstate listener (mandatory requirement 1) ══ */
var NAV_H={guard:false,ignore:0},__navExitArm=0;
function syncHistory(){
  var need=!__navExitArm;
  try{
    if(need&&!NAV_H.guard){history.pushState({stockaiGuard:1},'');NAV_H.guard=true;}
    else if(!need&&NAV_H.guard){NAV_H.guard=false;NAV_H.ignore++;history.back();}
  }catch(e){}
}
function navBackOne(){
  // (1) in-app confirm → cancel
  var cf=document.getElementById('confirmOverlay');if(cf&&cf.classList.contains('open')){cfAnswer(false);return true;}
  // (2) a price-alert popup
  var pops=document.querySelectorAll('.al-pop');if(pops.length){pops[pops.length-1].remove();return true;}
  // (3) autocomplete list
  var ac=document.getElementById('acList');if(ac&&ac.style.display&&ac.style.display!=='none'){if(typeof acHide==='function')acHide();else ac.style.display='none';return true;}
  // (4) AppNest assistant panel
  var ap=navAssistantPanel();if(ap){var ab=document.getElementById('appnest-assistant-btn');if(ab)ab.click();else ap.style.display='none';return true;}
  // (5) top window — a form inside a window goes back to the window's list first
  var open=navOpenOverlays();
  if(open.length){
    var top=open[open.length-1];
    if(top.id==='pfOverlay'&&(document.getElementById('pfSym')||document.getElementById('alSym'))){renderPortfolio();return true;}
    var fromMore=__navFromMore;
    navCloseOverlay(top);
    if(fromMore&&top.id!=='moreOverlay'&&!navOpenOverlays().length){__navFromMore=null;openMore();}
    return true;
  }
  // (6) watchlist panel
  if(navWatchOpen()){closeWatchPanel();return true;}
  // (7) a stock-card tab other than Overview → Overview
  if(typeof currentLiveTab!=='undefined'&&currentLiveTab!=='overview'&&document.getElementById('liveCard')&&document.getElementById('liveCard').classList.contains('visible')){
    switchLiveTab('overview');var c=document.getElementById('liveCard');if(c)try{c.scrollIntoView({behavior:'smooth',block:'start'});}catch(e){}return true;
  }
  // (8) far down the home page → back to the top
  if(window.scrollY>600){window.scrollTo({top:0,behavior:'smooth'});return true;}
  return false;
}
window.addEventListener('popstate',function(){
  if(NAV_H.ignore>0){NAV_H.ignore--;return;}
  NAV_H.guard=false;
  if(navBackOne()){navSync();syncHistory();return;}
  // Home: arm exit for 2 seconds — only a second press leaves the app
  showToastMsg(NT('pressAgainExit'));
  __navExitArm=setTimeout(function(){__navExitArm=0;syncHistory();},2000);
});
// Chrome ignores history entries created without a user gesture — create the guard on the first touch
(function(){var done=false;function first(){if(done)return;done=true;syncHistory();}
  ['pointerdown','keydown','touchstart'].forEach(function(ev){document.addEventListener(ev,first,{capture:true,once:true,passive:true});});})();

/* ══ 5. Ghost click — swallow clicks inside a window during its first 450ms (part 31) ══ */
var __ovOpenedAt=0;
document.addEventListener('click',function(e){
  if(Date.now()-__ovOpenedAt>=450)return;
  var t=e.target;if(!t||!t.closest)return;
  if(t.closest('.modal-overlay.open')||t.closest('.watch-panel.open')||t.closest('.watch-overlay.open')){e.preventDefault();e.stopPropagation();}
},true);

/* ══ 6. Wrap the openers/closers so the bar, the guard and the ghost-click stamp stay in sync ══ */
(function(){
  function wrapOpen(name){var f=window[name];if(typeof f!=='function')return;window[name]=function(){__ovOpenedAt=Date.now();var r=f.apply(this,arguments);try{navSync();}catch(e){}return r;};}
  function wrapClose(name){var f=window[name];if(typeof f!=='function')return;window[name]=function(){var r=f.apply(this,arguments);try{navSync();}catch(e){}
    // closed with ✕ or by opening a stock: forget "came from More" (only the back button returns there)
    if(!navOpenOverlays().length&&!navWatchOpen())__navFromMore=null;
    return r;};}
  ['openModal','openWatchPanel','openSetup','openGuide'].forEach(wrapOpen);
  ['closeModal','closeWatchPanel','closeSetup','closeGuide'].forEach(wrapClose);
  var uw=window.updateWatchCount;if(typeof uw==='function')window.updateWatchCount=function(){var r=uw.apply(this,arguments);try{navBadge();}catch(e){}return r;};
})();
// a tab tap from the bar must not bounce back to "More"
var __navGoOrig=navGo;navGo=function(t){__navFromMore=null;return __navGoOrig(t);};

/* ══ 7. Undo bar instead of "are you sure?" (part 41 §5) — one toast at a time, toast rises above the bar ══ */
var __undo=null;
function undoToast(msg,undoFn){
  undoCommit();
  var bar=document.getElementById('undoBar');if(!bar){if(msg)showToastMsg(msg);return;}
  document.getElementById('undoMsg').textContent=msg;
  var b=document.getElementById('undoBtn');b.textContent=NT('undo');
  b.onclick=function(){var u=__undo;undoHide();if(u&&u.fn){try{u.fn();}catch(e){}showToastMsg(NT('restored'));}};
  bar.classList.add('show');document.body.classList.add('undo-on');
  __undo={fn:undoFn,t:setTimeout(undoHide,6000)};
}
function undoHide(){if(__undo&&__undo.t)clearTimeout(__undo.t);__undo=null;var bar=document.getElementById('undoBar');if(bar)bar.classList.remove('show');document.body.classList.remove('undo-on');}
function undoCommit(){undoHide();}

/* ══ 8. In-app confirm — only for actions that cannot be undone (never the browser's confirm()) ══ */
var __cf=null;
function showConfirm(msg,okLabel,onOk){
  var o=document.getElementById('confirmOverlay');if(!o){if(window.confirm(msg))onOk();return;}
  document.getElementById('cfMsg').textContent=msg;
  var ok=document.getElementById('cfOk'),no=document.getElementById('cfCancel');
  ok.textContent=okLabel||NT('yes');no.textContent=NT('cancel');
  __cf=onOk;ok.onclick=function(){cfAnswer(true);};no.onclick=function(){cfAnswer(false);};
  openModal('confirmOverlay');
}
function cfAnswer(yes){var f=__cf;__cf=null;closeModal('confirmOverlay');if(yes&&f)f();}

/* ══ 9. Deletes with undo — portfolio, alerts, thesis; AI disconnect with an in-app confirm ══ */
function _undoRemove(loadFn,saveFn,pred,after){
  var all=loadFn(),idx=-1,item=null;
  all.forEach(function(x,i){if(idx<0&&pred(x)){idx=i;item=x;}});
  if(idx<0)return;
  all.splice(idx,1);saveFn(all);after();
  undoToast(NT('deleted'),function(){var a=loadFn();a.splice(Math.min(idx,a.length),0,item);saveFn(a);after();});
}
pfDelete=function(id){_undoRemove(pfLoad,pfSave,function(x){return x.id===id;},function(){PF.tab='pf';renderPortfolio();});};
alDelete=function(id){_undoRemove(alLoad,alSave,function(x){return x.id===id;},function(){PF.tab='al';renderPortfolio();});};
thDelete=function(symbol){
  var all=thLoad(),item=all[symbol];if(!item)return;
  delete all[symbol];thSaveAll(all);renderThesis(symbol);
  undoToast(NT('deleted'),function(){var a=thLoad();a[symbol]=item;thSaveAll(a);renderThesis(symbol);});
};
disconnectAI=function(){
  var p=loadAIConfig().provider;if(!p)return;
  showConfirm(AT('disconnectQ'),NT('yes'),function(){
    delKey(p);
    ['stockai_ai_provider','stockai_key_'+p,'stockai_model_'+p,'stockai_models_'+p,'stockai_worked_'+p].forEach(function(k){localStorage.removeItem(k);});
    if(p==='device')localStorage.removeItem('stockai_device_url');
    if(p==='custom')localStorage.removeItem('stockai_custom_url');
    selectedAI=null;updateAIStatus();closeSetup();showToastMsg(AT('disconnected'));
  });
};

/* turn the bar on */
(function(){try{document.body.classList.add('tabs-on');}catch(e){}})();
;(window.__MODS=window.__MODS||{})['app-nav']=1;

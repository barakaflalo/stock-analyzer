/* StockAI · app-platform.js — Key encryption, scoreboard, autocomplete, cache-first, about, diagnostics, accessibility, assistant map
   AppNest © 2026 · load order matters: see <script> tags in stock-analyzer.html */
/* ══════════════════════════════════════════════════════════════
   PHASE 4 — לפי מסמך הדרישות AppNest v10
   כרטיס ניקוד · השלמה אוטומטית · מטמון מיידי · הצפנת מפתחות · אודות · אבחון · נגישות
══════════════════════════════════════════════════════════════ */
var APP_VERSION='2.2.0';
var P4_T={
he:{sbBtn:"📊 ניקוד AI",sbT:"📊 כרטיס ניקוד — כמה ה-AI צודק?",sbSummary:"ה-AI צדק ב-{h} מתוך {n} תחזיות שנבדקו",sbRate:"שיעור הצלחה",sbTotal:"תחזיות",sbPending:"ממתינות",sbAvgBuy:"תשואה ממוצעת להמלצות קנייה",sbEmpty:"עדיין אין תחזיות. כל ניתוח AI נשמר כאן אוטומטית עם המחיר והתאריך — ואחרי שבוע אפשר לראות אם צדק.",sbRule:"כלל הבדיקה (אחרי 7 ימים לפחות): קנייה = המחיר עלה · מכירה = המחיר ירד · החזקה = שינוי קטן מ-5%.",sbSince:"מאז",sbEntry:"מחיר בעת התחזית",sbNow:"עכשיו",sbHit:"✓ צדק",sbMiss:"✗ טעה",sbWait:"⏳ {n} ימים לבדיקה",sbTarget:"🎯 הגיע ליעד",sbRefresh:"🔄 רענן מחירים",sbCsv:"⬇ ייצוא CSV",sbClear:"🗑 נקה הכל",sbClearQ:"למחוק את כל היסטוריית התחזיות?",sbDelQ:"למחוק את התחזית הזו?",sbNote:"תחזית אחת לכל מניה ביום (ניתוח חוזר באותו יום מעדכן אותה). ביצועי עבר אינם מבטיחים ביצועים עתידיים.",
recBUY:"קנייה",recSELL:"מכירה",recHOLD:"החזקה",
acNone:"לא נמצאו מניות",acLocal:"מהרשימה שלך",cached:"📦 נתונים שמורים מ-{t} — מתעדכן…",offline:"📴 אין חיבור — מוצגים נתונים שמורים מ-{t}",
aboutBtn:"אודות",aboutT:"ℹ️ אודות StockAI",abVersion:"גרסה",abDev:"פותח",abPlatform:"פלטפורמה",abStorage:"אחסון",abStorageV:"על המכשיר בלבד",abSources:"מקורות נתונים",abLicense:"רישיון",abUser:"השם שלך (יופיע בשיתוף ובייצוא)",abUserPh:"שם / כינוי",abStore:"🏪 חנות AppNest",abShare:"📤 שתף את האפליקציה",abFeedback:"✉️ שלח משוב",abGuide:"❓ מדריך",abPrivacy:"🔒 מדיניות פרטיות",abDiag:"🩺 דוח אבחון",abPersist:"אחסון מתמשך",abPersistOk:"מאושר ✓",abPersistNo:"לא אושר (הדפדפן עלול לנקות בלחץ מקום)",abKeys:"מפתח ה-AI",abKeysEnc:"מוצפן ונשמר מקומית במכשיר ואינו נכלל בגיבויים",abKeysPlain:"נשמר מקומית (הדפדפן לא תומך בהצפנה)",abKeysNone:"לא חובר",
diagT:"🩺 דוח אבחון",diagNote:"הדוח לא כולל מפתחות, תזות או נתונים אישיים — רק מידע טכני. אפשר להעתיק ולשלוח במשוב.",diagCopy:"📋 העתק דוח",diagCopied:"הדוח הועתק ✓",diagRun:"בודק…",
fileWarn:"⚠️ האפליקציה נפתחה מקובץ מקומי (או מתוך ZIP). במצב הזה אין התקנה, אין עבודה בלי אינטרנט ועלולות להיות תקלות. פתח אותה מהכתובת:",
skip:"דלג לתוכן",shareBy:"שותף ע\"י {u}"},
en:{sbBtn:"📊 AI Score",sbT:"📊 Scoreboard — how often is the AI right?",sbSummary:"The AI was right in {h} of {n} checked predictions",sbRate:"Hit rate",sbTotal:"Predictions",sbPending:"Pending",sbAvgBuy:"Average return of BUY calls",sbEmpty:"No predictions yet. Every AI analysis is saved here automatically with price and date — after a week you can see if it was right.",sbRule:"Scoring rule (after at least 7 days): BUY = price went up · SELL = price went down · HOLD = move under 5%.",sbSince:"Since",sbEntry:"Price at prediction",sbNow:"Now",sbHit:"✓ Right",sbMiss:"✗ Wrong",sbWait:"⏳ {n} days to check",sbTarget:"🎯 Target reached",sbRefresh:"🔄 Refresh prices",sbCsv:"⬇ Export CSV",sbClear:"🗑 Clear all",sbClearQ:"Delete the whole prediction history?",sbDelQ:"Delete this prediction?",sbNote:"One prediction per stock per day (re-analyzing the same day updates it). Past performance does not guarantee future results.",
recBUY:"BUY",recSELL:"SELL",recHOLD:"HOLD",
acNone:"No stocks found",acLocal:"From your list",cached:"📦 Saved data from {t} — updating…",offline:"📴 Offline — showing saved data from {t}",
aboutBtn:"About",aboutT:"ℹ️ About StockAI",abVersion:"Version",abDev:"Developer",abPlatform:"Platform",abStorage:"Storage",abStorageV:"On this device only",abSources:"Data sources",abLicense:"License",abUser:"Your name (shown in shares and exports)",abUserPh:"Name / nickname",abStore:"🏪 AppNest store",abShare:"📤 Share the app",abFeedback:"✉️ Send feedback",abGuide:"❓ Guide",abPrivacy:"🔒 Privacy policy",abDiag:"🩺 Diagnostics report",abPersist:"Persistent storage",abPersistOk:"Granted ✓",abPersistNo:"Not granted (browser may clear it when low on space)",abKeys:"AI key",abKeysEnc:"Encrypted and stored locally on the device, not included in backups",abKeysPlain:"Stored locally (browser does not support encryption)",abKeysNone:"Not connected",
diagT:"🩺 Diagnostics report",diagNote:"The report contains no keys, theses or personal data — only technical info. You can copy it and send it as feedback.",diagCopy:"📋 Copy report",diagCopied:"Report copied ✓",diagRun:"Checking…",
fileWarn:"⚠️ The app was opened from a local file (or from inside a ZIP). In this mode there is no install, no offline use and things may break. Open it from:",
skip:"Skip to content",shareBy:"Shared by {u}"},
ru:{sbBtn:"📊 Счёт ИИ",sbT:"📊 Табло — как часто ИИ прав?",sbSummary:"ИИ был прав в {h} из {n} проверенных прогнозов",sbRate:"Точность",sbTotal:"Прогнозы",sbPending:"Ожидают",sbAvgBuy:"Средняя доходность рекомендаций «покупать»",sbEmpty:"Прогнозов пока нет. Каждый анализ ИИ сохраняется здесь с ценой и датой — через неделю видно, был ли он прав.",sbRule:"Правило (через 7+ дней): ПОКУПАТЬ = цена выросла · ПРОДАВАТЬ = упала · ДЕРЖАТЬ = изменение меньше 5%.",sbSince:"С",sbEntry:"Цена при прогнозе",sbNow:"Сейчас",sbHit:"✓ Прав",sbMiss:"✗ Ошибся",sbWait:"⏳ проверка через {n} дн.",sbTarget:"🎯 Цель достигнута",sbRefresh:"🔄 Обновить цены",sbCsv:"⬇ Экспорт CSV",sbClear:"🗑 Очистить",sbClearQ:"Удалить всю историю прогнозов?",sbDelQ:"Удалить этот прогноз?",sbNote:"Один прогноз на акцию в день (повторный анализ в тот же день обновляет его). Прошлые результаты не гарантируют будущих.",
recBUY:"Покупать",recSELL:"Продавать",recHOLD:"Держать",
acNone:"Акции не найдены",acLocal:"Из вашего списка",cached:"📦 Сохранённые данные от {t} — обновление…",offline:"📴 Нет сети — сохранённые данные от {t}",
aboutBtn:"О приложении",aboutT:"ℹ️ О StockAI",abVersion:"Версия",abDev:"Разработчик",abPlatform:"Платформа",abStorage:"Хранение",abStorageV:"Только на устройстве",abSources:"Источники данных",abLicense:"Лицензия",abUser:"Ваше имя (в публикациях и экспорте)",abUserPh:"Имя / ник",abStore:"🏪 Магазин AppNest",abShare:"📤 Поделиться",abFeedback:"✉️ Отзыв",abGuide:"❓ Руководство",abPrivacy:"🔒 Политика конфиденциальности",abDiag:"🩺 Диагностика",abPersist:"Постоянное хранилище",abPersistOk:"Разрешено ✓",abPersistNo:"Не разрешено (браузер может очистить данные)",abKeys:"Ключ ИИ",abKeysEnc:"Зашифрован, хранится только на устройстве, не входит в резервные копии",abKeysPlain:"Хранится локально (браузер не поддерживает шифрование)",abKeysNone:"Не подключён",
diagT:"🩺 Диагностика",diagNote:"В отчёте нет ключей, тезисов и личных данных — только техническая информация.",diagCopy:"📋 Копировать",diagCopied:"Отчёт скопирован ✓",diagRun:"Проверка…",
fileWarn:"⚠️ Приложение открыто из локального файла (или ZIP). Так не работает установка и офлайн-режим. Откройте его по адресу:",
skip:"К содержимому",shareBy:"Поделился {u}"},
es:{sbBtn:"📊 Marcador IA",sbT:"📊 Marcador — ¿cuánto acierta la IA?",sbSummary:"La IA acertó {h} de {n} predicciones evaluadas",sbRate:"Acierto",sbTotal:"Predicciones",sbPending:"Pendientes",sbAvgBuy:"Rentabilidad media de las compras",sbEmpty:"Aún no hay predicciones. Cada análisis de IA se guarda aquí con precio y fecha — tras una semana verás si acertó.",sbRule:"Regla (tras 7+ días): COMPRAR = subió · VENDER = bajó · MANTENER = movimiento menor al 5%.",sbSince:"Desde",sbEntry:"Precio al predecir",sbNow:"Ahora",sbHit:"✓ Acertó",sbMiss:"✗ Falló",sbWait:"⏳ {n} días para evaluar",sbTarget:"🎯 Objetivo alcanzado",sbRefresh:"🔄 Actualizar precios",sbCsv:"⬇ Exportar CSV",sbClear:"🗑 Borrar todo",sbClearQ:"¿Borrar todo el historial de predicciones?",sbDelQ:"¿Borrar esta predicción?",sbNote:"Una predicción por acción y día (repetir el análisis el mismo día la actualiza). El rendimiento pasado no garantiza el futuro.",
recBUY:"Comprar",recSELL:"Vender",recHOLD:"Mantener",
acNone:"No se encontraron acciones",acLocal:"De tu lista",cached:"📦 Datos guardados de {t} — actualizando…",offline:"📴 Sin conexión — datos guardados de {t}",
aboutBtn:"Acerca de",aboutT:"ℹ️ Acerca de StockAI",abVersion:"Versión",abDev:"Desarrollador",abPlatform:"Plataforma",abStorage:"Almacenamiento",abStorageV:"Solo en este dispositivo",abSources:"Fuentes de datos",abLicense:"Licencia",abUser:"Tu nombre (aparece al compartir y exportar)",abUserPh:"Nombre / apodo",abStore:"🏪 Tienda AppNest",abShare:"📤 Compartir la app",abFeedback:"✉️ Enviar comentarios",abGuide:"❓ Guía",abPrivacy:"🔒 Política de privacidad",abDiag:"🩺 Informe de diagnóstico",abPersist:"Almacenamiento persistente",abPersistOk:"Concedido ✓",abPersistNo:"No concedido (el navegador podría borrarlo)",abKeys:"Clave de IA",abKeysEnc:"Cifrada y guardada localmente, no se incluye en copias de seguridad",abKeysPlain:"Guardada localmente (el navegador no admite cifrado)",abKeysNone:"No conectada",
diagT:"🩺 Informe de diagnóstico",diagNote:"El informe no incluye claves, tesis ni datos personales — solo información técnica.",diagCopy:"📋 Copiar informe",diagCopied:"Informe copiado ✓",diagRun:"Comprobando…",
fileWarn:"⚠️ La app se abrió desde un archivo local (o dentro de un ZIP). Así no hay instalación ni modo sin conexión. Ábrela desde:",
skip:"Saltar al contenido",shareBy:"Compartido por {u}"},
ar:{sbBtn:"📊 نتيجة الذكاء",sbT:"📊 لوحة النتائج — كم مرة يصيب الذكاء الاصطناعي؟",sbSummary:"أصاب الذكاء الاصطناعي في {h} من {n} توقعات تم فحصها",sbRate:"نسبة الإصابة",sbTotal:"التوقعات",sbPending:"قيد الانتظار",sbAvgBuy:"متوسط عائد توصيات الشراء",sbEmpty:"لا توجد توقعات بعد. يُحفظ كل تحليل هنا تلقائياً مع السعر والتاريخ — وبعد أسبوع ترى إن كان صائباً.",sbRule:"قاعدة الفحص (بعد 7 أيام على الأقل): شراء = ارتفع السعر · بيع = انخفض · احتفاظ = تغير أقل من 5%.",sbSince:"منذ",sbEntry:"السعر عند التوقع",sbNow:"الآن",sbHit:"✓ أصاب",sbMiss:"✗ أخطأ",sbWait:"⏳ {n} أيام للفحص",sbTarget:"🎯 وصل للهدف",sbRefresh:"🔄 تحديث الأسعار",sbCsv:"⬇ تصدير CSV",sbClear:"🗑 مسح الكل",sbClearQ:"حذف كل سجل التوقعات؟",sbDelQ:"حذف هذا التوقع؟",sbNote:"توقع واحد لكل سهم يومياً (إعادة التحليل في اليوم نفسه تحدّثه). الأداء السابق لا يضمن المستقبل.",
recBUY:"شراء",recSELL:"بيع",recHOLD:"احتفاظ",
acNone:"لم يُعثر على أسهم",acLocal:"من قائمتك",cached:"📦 بيانات محفوظة من {t} — جارٍ التحديث…",offline:"📴 لا اتصال — بيانات محفوظة من {t}",
aboutBtn:"حول",aboutT:"ℹ️ حول StockAI",abVersion:"الإصدار",abDev:"المطور",abPlatform:"المنصة",abStorage:"التخزين",abStorageV:"على الجهاز فقط",abSources:"مصادر البيانات",abLicense:"الترخيص",abUser:"اسمك (يظهر في المشاركة والتصدير)",abUserPh:"الاسم / اللقب",abStore:"🏪 متجر AppNest",abShare:"📤 شارك التطبيق",abFeedback:"✉️ أرسل ملاحظات",abGuide:"❓ الدليل",abPrivacy:"🔒 سياسة الخصوصية",abDiag:"🩺 تقرير التشخيص",abPersist:"التخزين الدائم",abPersistOk:"ممنوح ✓",abPersistNo:"غير ممنوح (قد يمسحه المتصفح عند نقص المساحة)",abKeys:"مفتاح الذكاء الاصطناعي",abKeysEnc:"مشفر ومحفوظ محلياً على الجهاز ولا يُضمَّن في النسخ الاحتياطية",abKeysPlain:"محفوظ محلياً (المتصفح لا يدعم التشفير)",abKeysNone:"غير مربوط",
diagT:"🩺 تقرير التشخيص",diagNote:"لا يحتوي التقرير على مفاتيح أو أطروحات أو بيانات شخصية — معلومات تقنية فقط.",diagCopy:"📋 نسخ التقرير",diagCopied:"تم نسخ التقرير ✓",diagRun:"جارٍ الفحص…",
fileWarn:"⚠️ فُتح التطبيق من ملف محلي (أو من داخل ZIP). بهذا الوضع لا تثبيت ولا عمل دون اتصال. افتحه من العنوان:",
skip:"تخطَّ إلى المحتوى",shareBy:"شاركه {u}"}
};
function P4(k,o){var l=P4_T[curLang]||P4_T.en,s=l[k]!=null?l[k]:(P4_T.en[k]!=null?P4_T.en[k]:k);for(var x in (o||{}))s=s.split('{'+x+'}').join(o[x]);return s;}
function getUsername(){return (localStorage.getItem('stockai_username')||'').trim();}
function fmtTime(ts){var d=new Date(ts);return d.toLocaleDateString()+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}

/* ══ 1. KEY ENCRYPTION — AES-GCM 256, CryptoKey לא-ניתן-לייצוא ב-IndexedDB ══ */
var __keyCache={},__secureMode='none',KEY_PROVIDERS=['claude','openai','gemini','custom'];
function _idb(){return new Promise(function(res,rej){try{var r=indexedDB.open('stockai_secure',1);r.onupgradeneeded=function(){r.result.createObjectStore('keys');};r.onsuccess=function(){res(r.result);};r.onerror=function(){rej(r.error);};}catch(e){rej(e);}});}
function _idbGet(db,k){return new Promise(function(res,rej){var q=db.transaction('keys','readonly').objectStore('keys').get(k);q.onsuccess=function(){res(q.result);};q.onerror=function(){rej(q.error);};});}
function _idbPut(db,k,v){return new Promise(function(res,rej){var tx=db.transaction('keys','readwrite');tx.objectStore('keys').put(v,k);tx.oncomplete=function(){res();};tx.onerror=function(){rej(tx.error);};});}
var __cryptoKeyP=null;
function _cryptoKey(){
  if(!__cryptoKeyP)__cryptoKeyP=(async function(){var db=await _idb(),k=await _idbGet(db,'aes');
    if(!k){k=await crypto.subtle.generateKey({name:'AES-GCM',length:256},false,['encrypt','decrypt']);await _idbPut(db,'aes',k);}return k;})();
  return __cryptoKeyP;
}
function _b64(buf){var b=new Uint8Array(buf),s='';for(var i=0;i<b.length;i++)s+=String.fromCharCode(b[i]);return btoa(s);}
function _unb64(s){var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
async function _enc(txt){var k=await _cryptoKey(),iv=crypto.getRandomValues(new Uint8Array(12));var ct=await crypto.subtle.encrypt({name:'AES-GCM',iv:iv},k,new TextEncoder().encode(txt));return JSON.stringify({iv:_b64(iv),ct:_b64(ct)});}
async function _dec(j){var o=JSON.parse(j),k=await _cryptoKey();var pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:_unb64(o.iv)},k,_unb64(o.ct));return new TextDecoder().decode(pt);}
function secureAvailable(){return !!(window.crypto&&crypto.subtle&&window.indexedDB&&window.isSecureContext!==false);}
async function secureInit(){
  if(!secureAvailable()){__secureMode='plain';return;}
  try{
    for(var i=0;i<KEY_PROVIDERS.length;i++){
      var p=KEY_PROVIDERS[i],enc=localStorage.getItem('stockai_enc_'+p),plain=localStorage.getItem('stockai_key_'+p);
      if(enc){try{__keyCache[p]=await _dec(enc);}catch(e){}}
      if(plain){ // מיגרציה: מוחקים את הטקסט הגלוי רק אחרי שההצפנה אומתה
        var e2=await _enc(plain);if((await _dec(e2))===plain){localStorage.setItem('stockai_enc_'+p,e2);__keyCache[p]=plain;localStorage.removeItem('stockai_key_'+p);}
      }
    }
    __secureMode='enc';
  }catch(e){__secureMode='plain';}
}
window.__securePromise=secureInit();
function getKey(p){return __keyCache[p]!=null?__keyCache[p]:localStorage.getItem('stockai_key_'+p);}
async function setKey(p,val){
  __keyCache[p]=val;
  if(secureAvailable()){try{var e=await _enc(val);localStorage.setItem('stockai_enc_'+p,e);localStorage.removeItem('stockai_key_'+p);__secureMode='enc';return;}catch(er){}}
  localStorage.setItem('stockai_key_'+p,val);
}
function delKey(p){delete __keyCache[p];localStorage.removeItem('stockai_key_'+p);localStorage.removeItem('stockai_enc_'+p);}

/* ══ 2. SCOREBOARD — שמירת כל תחזית ובדיקה מול המחיר בפועל ══ */
function sbLoad(){try{return JSON.parse(localStorage.getItem('stockai_scoreboard'))||[];}catch(e){return [];}}
function sbSave(a){try{localStorage.setItem('stockai_scoreboard',JSON.stringify(a.slice(-300)));}catch(e){}}
function parsePriceStr(s){var n=parseFloat(String(s||'').replace(/[^0-9.\-]/g,''));return isFinite(n)?n:null;}
function recordPrediction(symbol,r){
  var rec=String(r.recommendation||'').toUpperCase();if(['BUY','SELL','HOLD'].indexOf(rec)<0)return;
  var q=window.__lastLiveQuote,price=(q&&q.symbol===symbol&&q.regularPrice)||parsePriceStr(r.currentPrice);if(!price)return;
  var day=new Date().toISOString().slice(0,10),all=sbLoad();
  all=all.filter(function(x){return !(x.symbol===symbol&&x.date.slice(0,10)===day);});
  all.push({id:Date.now(),symbol:symbol,rec:rec,conf:r.confidenceScore||null,target:parsePriceStr(r.priceTarget),price:price,cur:(q&&q.currency)||'USD',date:new Date().toISOString(),model:localStorage.getItem('stockai_worked_'+(loadAIConfig().provider||''))||loadAIConfig().provider||''});
  sbSave(all);
}
var __sbPrices={};
function sbEval(x){
  var now=__sbPrices[x.symbol],days=Math.floor((Date.now()-new Date(x.date).getTime())/86400000);
  var chg=now?(now/x.price-1)*100:null,status='wait';
  if(days>=7&&chg!=null){status=x.rec==='BUY'?(chg>0?'hit':'miss'):x.rec==='SELL'?(chg<0?'hit':'miss'):(Math.abs(chg)<5?'hit':'miss');}
  return {days:days,chg:chg,now:now,status:status,target:x.rec==='BUY'&&x.target&&now&&now>=x.target};
}
async function sbRefreshPrices(){
  var syms=[];sbLoad().forEach(function(x){if(syms.indexOf(x.symbol)<0)syms.push(x.symbol);});
  for(var i=0;i<syms.length;i+=20){
    try{var d=await workerFetch('action=ticker&symbols='+encodeURIComponent(syms.slice(i,i+20).join(',')));(d.quotes||[]).forEach(function(q){__sbPrices[q.symbol]=q.price;});}catch(e){}
  }
  try{localStorage.setItem('stockai_sb_prices',JSON.stringify({ts:Date.now(),p:__sbPrices}));}catch(e){}
}
function openScoreboard(){
  try{var c=JSON.parse(localStorage.getItem('stockai_sb_prices'));if(c&&c.p)__sbPrices=c.p;}catch(e){}
  renderScoreboard();openModal('scoreOverlay');
  sbRefreshPrices().then(renderScoreboard);
}
function renderScoreboard(){
  var el=document.getElementById('scoreBody');if(!el)return;
  var all=sbLoad().slice().reverse();
  if(!all.length){el.innerHTML='<div class="ta-small" style="padding:10px 0">'+P4('sbEmpty')+'</div><div class="ta-note">'+P4('sbRule')+'</div>';return;}
  var ev=all.map(function(x){return {x:x,e:sbEval(x)};});
  var checked=ev.filter(function(o){return o.e.status!=='wait';}),hits=checked.filter(function(o){return o.e.status==='hit';}).length;
  var buys=ev.filter(function(o){return o.x.rec==='BUY'&&o.e.chg!=null;}),avgBuy=buys.length?buys.reduce(function(s,o){return s+o.e.chg;},0)/buys.length:null;
  var rate=checked.length?Math.round(hits/checked.length*100):null;
  var h='<div class="sb-hero">'+(checked.length?P4('sbSummary',{h:hits,n:checked.length}):P4('sbRule'))+'</div>'
    +'<div class="sb-stats"><div><span>'+P4('sbRate')+'</span><strong style="color:'+(rate==null?'var(--text-dim)':rate>=60?'var(--green)':rate>=45?'var(--gold)':'var(--red)')+'">'+(rate==null?'—':rate+'%')+'</strong></div>'
    +'<div><span>'+P4('sbTotal')+'</span><strong>'+all.length+'</strong></div>'
    +'<div><span>'+P4('sbPending')+'</span><strong>'+(all.length-checked.length)+'</strong></div>'
    +'<div><span>'+P4('sbAvgBuy')+'</span><strong style="color:'+(avgBuy==null?'var(--text-dim)':avgBuy>=0?'var(--green)':'var(--red)')+'">'+(avgBuy==null?'—':fmtPct(avgBuy))+'</strong></div></div>'
    +'<div class="sb-actions"><button onclick="sbRefreshPrices().then(renderScoreboard)">'+P4('sbRefresh')+'</button><button onclick="sbExportCsv()">'+P4('sbCsv')+'</button><button onclick="sbClearAll()">'+P4('sbClear')+'</button></div><div class="sb-list">';
  ev.forEach(function(o){var x=o.x,e=o.e;
    var rc=x.rec==='BUY'?'var(--green)':x.rec==='SELL'?'var(--red)':'var(--gold)';
    var st=e.status==='hit'?'<span style="color:var(--green)">'+P4('sbHit')+'</span>':e.status==='miss'?'<span style="color:var(--red)">'+P4('sbMiss')+'</span>':'<span style="color:var(--text-muted)">'+P4('sbWait',{n:Math.max(0,7-e.days)})+'</span>';
    h+='<div class="sb-row"><div class="sb-sym" onclick="closeModal(\'scoreOverlay\');quickLive(\''+x.symbol+'\')">'+x.symbol+'</div>'
      +'<div class="sb-rec" style="color:'+rc+';border-color:'+rc+'">'+P4('rec'+x.rec)+'</div>'
      +'<div class="sb-mid"><div>'+escHtml(x.date.slice(0,10))+' · '+fmtPrice(x.price,x.cur)+(e.now?' → '+fmtPrice(e.now,x.cur):'')+'</div>'
      +'<div>'+(e.chg!=null?'<strong style="color:'+(e.chg>=0?'var(--green)':'var(--red)')+'">'+fmtPct(e.chg)+'</strong> · ':'')+st+(e.target?' · '+P4('sbTarget'):'')+'</div></div>'
      +'<button class="sb-del" aria-label="delete" onclick="sbDelete('+x.id+')">🗑</button></div>';
  });
  h+='</div><div class="ta-note">'+P4('sbRule')+'<br>'+P4('sbNote')+'</div>';
  el.innerHTML=h;
}
function sbDelete(id){if(!confirm(P4('sbDelQ')))return;sbSave(sbLoad().filter(function(x){return x.id!==id;}));renderScoreboard();}
function sbClearAll(){if(!confirm(P4('sbClearQ')))return;sbSave([]);renderScoreboard();}
function sbExportCsv(){
  var rows=[['user','symbol','recommendation','confidence','target','price_at_prediction','price_now','change_pct','date','status','model']];
  sbLoad().forEach(function(x){var e=sbEval(x);rows.push([getUsername(),x.symbol,x.rec,x.conf||'',x.target||'',x.price,e.now||'',e.chg!=null?e.chg.toFixed(2):'',x.date.slice(0,10),e.status,x.model||'']);});
  var csv='\ufeff'+rows.map(function(r){return r.map(function(c){return '"'+String(c).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download='stockai-scoreboard-'+new Date().toISOString().slice(0,10)+'.csv';document.body.appendChild(a);a.click();a.remove();
}

/* ══ 3. AUTOCOMPLETE — בחירה מרשימה במקום הקלדה חופשית ══ */
var AC_ALIASES=[['טבע','TEVA'],['נייס','NICE'],['צק פוינט','CHKP'],["צ'ק פוינט",'CHKP'],['מאנדיי','MNDY'],['מנדיי','MNDY'],['וויקס','WIX'],['ויקס','WIX'],['אלביט','ESLT'],['סייברארק','CYBR'],['פרוטליקס','PLX'],['גלובל','GLBE'],['אפל','AAPL'],['טסלה','TSLA'],['אנבידיה','NVDA'],['אינבידיה','NVDA'],['מיקרוסופט','MSFT'],['גוגל','GOOGL'],['אלפבית','GOOGL'],['אמזון','AMZN'],['מטא','META'],['פייסבוק','META'],['נטפליקס','NFLX'],['אינטל','INTC'],['איי אם די','AMD'],['פלנטיר','PLTR'],['קוקה קולה','KO'],['ביטקוין','BTC-USD'],['איתוראן','ITRN'],['טאואר','TSEM'],['אורמת','ORA'],['סולאראדג','SEDG'],['בנק הפועלים','POLI.TA'],['לאומי','LUMI.TA'],['בזק','BEZQ.TA'],['אל על','ELAL.TA'],
  ['Тева','TEVA'],['Эппл','AAPL'],['Тесла','TSLA'],['Нвидиа','NVDA'],['Майкрософт','MSFT'],['Гугл','GOOGL'],['Амазон','AMZN'],['آبل','AAPL'],['تسلا','TSLA'],['إنفيديا','NVDA'],['مايكروسوفت','MSFT'],['جوجل','GOOGL'],['أمازون','AMZN'],['تيفا','TEVA']];
var __acTimer=null,__acIdx=-1,__acItems=[];
function acInput(){
  var q=document.getElementById('stockInput').value.trim();
  clearTimeout(__acTimer);if(!q){acHide();return;}
  var local=[],ql=q.toLowerCase();
  AC_ALIASES.forEach(function(a){if(a[0].toLowerCase().indexOf(ql)===0&&!local.some(function(x){return x.symbol===a[1];}))local.push({symbol:a[1],name:a[0],exchange:P4('acLocal')});});
  loadWatchlist().forEach(function(s){if(s.toLowerCase().indexOf(ql)===0&&!local.some(function(x){return x.symbol===s;}))local.push({symbol:s,name:'',exchange:P4('acLocal')});});
  acRender(local,true);
  if(/[\u0590-\u05FF\u0600-\u06FF\u0400-\u04FF]/.test(q))return; // יאהו לא מחפש בעברית/ערבית/רוסית
  __acTimer=setTimeout(async function(){
    try{var d=await workerFetch('action=search&q='+encodeURIComponent(q));
      if(document.getElementById('stockInput').value.trim()!==q)return;
      var merged=local.slice();(d.results||[]).forEach(function(r){if(!merged.some(function(x){return x.symbol===r.symbol;}))merged.push(r);});
      acRender(merged.slice(0,8),false);
    }catch(e){}
  },300);
}
function acRender(items,partial){
  var box=document.getElementById('acList');if(!box)return;
  __acItems=items;__acIdx=-1;
  if(!items.length){if(partial){box.style.display='none';return;}box.innerHTML='<div class="ac-empty">'+P4('acNone')+'</div>';box.style.display='block';return;}
  box.innerHTML=items.map(function(it,i){return '<div class="ac-item" role="option" id="ac-'+i+'" onmousedown="acPick('+i+')"><strong>'+escHtml(it.symbol)+'</strong><span>'+escHtml(it.name||'')+'</span><em>'+escHtml(it.exchange||'')+'</em></div>';}).join('');
  box.style.display='block';
}
function acHide(){var b=document.getElementById('acList');if(b)b.style.display='none';__acIdx=-1;}
function acPick(i){var it=__acItems[i];if(!it)return;document.getElementById('stockInput').value=it.symbol;acHide();loadLiveData(it.symbol);}
function acKey(e){
  var box=document.getElementById('acList'),open=box&&box.style.display==='block'&&__acItems.length;
  if(e.key==='ArrowDown'&&open){e.preventDefault();__acIdx=Math.min(__acItems.length-1,__acIdx+1);acMark();}
  else if(e.key==='ArrowUp'&&open){e.preventDefault();__acIdx=Math.max(0,__acIdx-1);acMark();}
  else if(e.key==='Escape'){acHide();}
  else if(e.key==='Enter'){if(open&&__acIdx>=0){e.preventDefault();acPick(__acIdx);}else{acHide();analyzeStock();}}
}
function acMark(){__acItems.forEach(function(_,i){var el=document.getElementById('ac-'+i);if(el)el.classList.toggle('active',i===__acIdx);});}

/* ══ 4. CACHE-FIRST — מציגים מיד את השמור, מרעננים ברקע ══ */
function snapLoad(){try{return JSON.parse(localStorage.getItem('stockai_snaps'))||{};}catch(e){return {};}}
function snapSave(q){
  if(!q||!q.symbol)return;var s=snapLoad();s[q.symbol]={q:q,ts:Date.now()};
  var keys=Object.keys(s).sort(function(a,b){return s[b].ts-s[a].ts;});keys.slice(25).forEach(function(k){delete s[k];});
  try{localStorage.setItem('stockai_snaps',JSON.stringify(s));}catch(e){}
}
function snapGet(sym){return snapLoad()[sym]||null;}

/* ══ 5. ABOUT + DIAGNOSTICS ══ */
function openAbout(){renderAbout();openModal('aboutOverlay');}
function renderAbout(){
  var el=document.getElementById('aboutBody');if(!el)return;
  var p=loadAIConfig().provider,keyState=!p?P4('abKeysNone'):__secureMode==='enc'?P4('abKeysEnc'):P4('abKeysPlain');
  el.innerHTML='<div class="ab-hero"><div class="ab-logo">StockAI</div><div class="ab-ver">v'+APP_VERSION+' · AppNest</div></div>'
    +'<div class="ab-card">'
    +abRow(P4('abVersion'),APP_VERSION)+abRow(P4('abDev'),'Barak Aflalo')+abRow(P4('abPlatform'),'PWA · HTML5')
    +abRow(P4('abStorage'),P4('abStorageV'))+abRow(P4('abSources'),'Yahoo Finance · SEC EDGAR · ECB')
    +abRow(P4('abKeys'),keyState)+abRow(P4('abPersist'),'<span id="abPersistVal">…</span>')+abRow(P4('abLicense'),'© AppNest 2026')+'</div>'
    +'<label class="th-lbl">'+P4('abUser')+'</label><input class="key-input" id="abUser" maxlength="40" placeholder="'+escHtml(P4('abUserPh'))+'" value="'+escHtml(getUsername())+'" oninput="localStorage.setItem(\'stockai_username\',this.value)">'
    +'<div class="ab-btns">'
    +'<a href="https://barakaflalo.github.io/appnest" target="_blank" rel="noopener">'+P4('abStore')+'</a>'
    +'<button onclick="shareApp()">'+P4('abShare')+'</button>'
    +'<a href="mailto:appnest55@gmail.com?subject='+encodeURIComponent('StockAI v'+APP_VERSION+' feedback')+'">'+P4('abFeedback')+'</a>'
    +'<button onclick="closeModal(\'aboutOverlay\');openGuide()">'+P4('abGuide')+'</button>'
    +'<a href="privacy_policy.html" target="_blank" rel="noopener">'+P4('abPrivacy')+'</a>'
    +'<button onclick="runDiagnostics()">'+P4('abDiag')+'</button>'
    +'<button onclick="closeModal(\'aboutOverlay\');startTour()">'+TT().replay+'</button></div>'
    +'<div id="diagBox"></div>'
    +'<div class="ta-note">'+escHtml(LT('disclaimer'))+'</div>';
  if(navigator.storage&&navigator.storage.persisted)navigator.storage.persisted().then(function(ok){var s=document.getElementById('abPersistVal');if(s)s.textContent=ok?P4('abPersistOk'):P4('abPersistNo');});
  else{var s=document.getElementById('abPersistVal');if(s)s.textContent='—';}
}
function abRow(k,v){return '<div class="ab-row"><span>'+k+'</span><strong>'+v+'</strong></div>';}
async function runDiagnostics(){
  var box=document.getElementById('diagBox');box.innerHTML='<div class="ta-small">'+P4('diagRun')+'</div>';
  var cfg=loadAIConfig(),lines=[],t0=Date.now(),worker='fail';
  try{var r=await fetch(DATA_WORKER_URL+'/?t='+Date.now());worker=r.ok?('ok '+(Date.now()-t0)+'ms'):('HTTP '+r.status);}catch(e){worker='error: '+e.message;}
  var persisted='n/a',usage='n/a';
  try{if(navigator.storage&&navigator.storage.persisted)persisted=String(await navigator.storage.persisted());}catch(e){}
  try{if(navigator.storage&&navigator.storage.estimate){var es=await navigator.storage.estimate();usage=Math.round((es.usage||0)/1024)+'KB / '+Math.round((es.quota||0)/1048576)+'MB';}}catch(e){}
  lines.push('StockAI v'+APP_VERSION+' · '+new Date().toISOString());
  lines.push('URL: '+location.origin+location.pathname+' · protocol '+location.protocol);
  lines.push('Language: '+curLang+' · Theme: '+(document.documentElement.getAttribute('data-theme')||'?'));
  lines.push('Browser: '+navigator.userAgent);
  lines.push('Screen: '+screen.width+'x'+screen.height+' · viewport '+innerWidth+'x'+innerHeight+' · DPR '+(window.devicePixelRatio||1));
  lines.push('Online: '+navigator.onLine+' · Installed (standalone): '+(matchMedia('(display-mode: standalone)').matches||navigator.standalone===true));
  lines.push('Service worker controlling: '+!!(navigator.serviceWorker&&navigator.serviceWorker.controller));
  lines.push('Storage: localStorage '+(function(){try{localStorage.setItem('__t','1');localStorage.removeItem('__t');return 'ok';}catch(e){return 'blocked';}})()+' · IndexedDB '+!!window.indexedDB+' · persisted '+persisted+' · usage '+usage);
  lines.push('Key protection: '+__secureMode+' (secure context '+(!!window.isSecureContext)+')');
  lines.push('AI provider: '+(cfg.provider||'none')+' · chosen model: '+(cfg.provider?(getChosenModel(cfg.provider)||'auto'):'-')+' · last working model: '+(cfg.provider?(localStorage.getItem('stockai_worked_'+cfg.provider)||'-'):'-')+(cfg.provider==='gemini'?' · keys: '+getGeminiKeys().length:''));
  lines.push('Data worker: '+worker);
  lines.push('Watchlist: '+loadWatchlist().length+' · Theses: '+Object.keys(thLoad()).length+' · Predictions: '+sbLoad().length+' · Cached quotes: '+Object.keys(snapLoad()).length);
  var txt=lines.join('\n');
  box.innerHTML='<div class="rec-trend-title" style="margin-top:14px">'+P4('diagT')+'</div><pre class="diag-pre">'+escHtml(txt)+'</pre>'
    +'<button class="btn-test-ai" onclick="copyDiag()">'+P4('diagCopy')+'</button><div class="ta-small">'+P4('diagNote')+'</div>';
  window.__diagText=txt;
}
function copyDiag(){var t=window.__diagText||'';(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){showToastMsg(P4('diagCopied'));}).catch(function(){var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');showToastMsg(P4('diagCopied'));}catch(e){}ta.remove();});}

/* ══ 6. ACCESSIBILITY — Escape, מלכודת מיקוד, מודאלים ══ */
var __lastFocus=null;
function openModal(id){var o=document.getElementById(id);if(!o)return;__lastFocus=document.activeElement;o.classList.add('open');document.body.style.overflow='hidden';
  setTimeout(function(){var f=o.querySelector('button,a[href],input,select,textarea');if(f)f.focus();},50);}
function closeModal(id){var o=document.getElementById(id);if(!o)return;o.classList.remove('open');document.body.style.overflow='';if(__lastFocus&&__lastFocus.focus)try{__lastFocus.focus();}catch(e){}}
document.addEventListener('keydown',function(e){
  var open=[].slice.call(document.querySelectorAll('.modal-overlay.open'));
  if(e.key==='Escape'){
    if(open.length){var top=open[open.length-1];if(top.id==='tourOverlay'){endTour();e.preventDefault();return;}if(top.id==='setupOverlay')closeSetup();else if(top.id==='guideOverlay')closeGuide();else closeModal(top.id);e.preventDefault();return;}
    var wp=document.getElementById('watchPanel');if(wp&&wp.classList.contains('open')){closeWatchPanel();return;}
    acHide();
  }
  if(e.key==='Tab'&&open.length){
    var box=open[open.length-1].querySelector('.modal-box');if(!box)return;
    var f=[].slice.call(box.querySelectorAll('button:not([disabled]),a[href],input,select,textarea')).filter(function(x){return x.offsetParent!==null;});
    if(!f.length)return;var first=f[0],last=f[f.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }
});
document.addEventListener('click',function(e){if(!e.target.closest||!e.target.closest('.search-row'))acHide();});
function a11yLabels(){
  [['themeBtn',null],['btnAbout',P4('aboutBtn')]].forEach(function(x){var el=document.getElementById(x[0]);if(el&&x[1])el.setAttribute('aria-label',x[1]);});
  document.querySelectorAll('.modal-close,.watch-close').forEach(function(b){b.setAttribute('aria-label','Close');});
  document.querySelectorAll('.modal-box').forEach(function(b){b.setAttribute('role','dialog');b.setAttribute('aria-modal','true');});
  var sk=document.getElementById('skipLink');if(sk)sk.textContent=P4('skip');
  var sb=document.getElementById('btnScore');if(sb)sb.textContent=P4('sbBtn');
  var st=document.getElementById('scoreTitle');if(st)st.textContent=P4('sbT');
  var at=document.getElementById('aboutTitle');if(at)at.textContent=P4('aboutT');
  var fv=document.getElementById('footVer');if(fv)fv.textContent='StockAI v'+APP_VERSION+' · '+P4('aboutBtn');
}

/* ══ 7. STARTUP CHECKS — קובץ מקומי/ZIP, אחסון מתמשך ══ */
function startupChecks(){
  if(location.protocol==='file:'){var b=document.createElement('div');b.className='file-warn';b.innerHTML=P4('fileWarn')+' <a href="https://barakaflalo.github.io/stock-analyzer/">barakaflalo.github.io/stock-analyzer</a>';var m=document.querySelector('main');if(m)m.insertBefore(b,m.firstChild);}
  try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist();}catch(e){}
  try{localStorage.removeItem('stockai_gemini_model');}catch(e){}
}

/* ══ 8. APPNEST ASSISTANT — המפה של StockAI (המנוע עצמו: appnest-assistant.js) ══ */
function assistantSym(a){var s=typeof a==='string'?a:(a&&(a.symbol||a.value||a.arg||a.ticker))||'';return String(s).toUpperCase().trim();}
var ASSIST_SUGG={
  he:['נתח לי את PLX','מה אומר הטאב הטכני על המניה הזו?','מה זה מבחן האיכות?','כמה ה-AI צדק עד עכשיו?'],
  en:['Analyze PLX for me','What does the technical tab say about this stock?','What is the quality test?','How often has the AI been right?'],
  ru:['Проанализируй PLX','Что говорит технический анализ?','Что такое тест качества?','Как часто ИИ прав?'],
  es:['Analiza PLX','¿Qué dice el análisis técnico?','¿Qué es el test de calidad?','¿Cuánto acierta la IA?'],
  ar:['حلل لي سهم PLX','ماذا يقول التحليل الفني؟','ما هو اختبار الجودة؟','كم مرة أصاب الذكاء الاصطناعي؟']
};
function buildAssistantConfig(){
  window.APPNEST_ASSISTANT_CONFIG={
    appName:'StockAI',
    appDescription:'StockAI is a stock-analysis app for US and Israeli markets. Typing a symbol loads a free live data card with tabs: Overview (chart, metrics), Technical (composite signal, RSI/ADX/Bollinger/OBV, candlestick patterns, volatility, seasonality), Analysts, Quality (7-metric screen), Value (fair-value calculator with scenarios and implied growth), Financials, Events (SEC filings, next earnings), Company, News, and My Thesis (a personal thesis journal with AI drift check). AI analysis (user\'s own key) runs a 4-masters committee and every prediction is tracked on a Scoreboard. Help the user understand the data and navigate. IMPORTANT: everything is informational only, not investment advice — say so when giving opinions and suggest verifying with an authorized source. Answer in the user\'s language.',
    tabs:[{name:'Overview',screen:'overview'},{name:'Technical',screen:'technical'},{name:'Analysts',screen:'analysts'},{name:'Quality',screen:'quality'},{name:'Value',screen:'value'},{name:'Financials',screen:'finance'},{name:'Events',screen:'events'},{name:'Company',screen:'company'},{name:'News',screen:'news'},{name:'My Thesis',screen:'thesis'},{name:'Scoreboard',screen:'scoreboard'},{name:'Watchlist',screen:'watchlist'},{name:'AI settings',screen:'settings'},{name:'Guide',screen:'guide'},{name:'About',screen:'about'}],
    fields:[],
    readAiConfig:function(){var c=loadAIConfig();return {provider:c.provider,keys:{gemini:c.geminiKey||'',claude:c.claudeKey||'',openai:c.openaiKey||'',custom:c.customKey||''},deviceUrl:c.deviceUrl,customUrl:c.customUrl};},
    navigate:function(t){var s=String((t&&(t.screen||t.name))||t||'').toLowerCase();
      if(s==='scoreboard')return openScoreboard();if(s==='watchlist')return openWatchPanel();if(s==='settings')return openSetup();if(s==='guide')return openGuide();if(s==='about')return openAbout();
      if(LIVE_TAB_DEFS.some(function(d){return d[0]===s;})){switchLiveTab(s);var c=document.getElementById('liveCard');if(c)c.scrollIntoView({behavior:'smooth',block:'start'});}},
    readState:function(){var q=window.__lastLiveQuote,out=[];
      if(q)out.push('Current stock: '+q.symbol+' ('+(q.name||'')+') price '+q.regularPrice+' '+(q.currency||'')+', today '+fmtPct(q.regularChangePct)+'. Open tab: '+currentLiveTab+'.');
      var t=window.__techResult;if(t&&t.tech&&q&&t.symbol===q.symbol)out.push('Technical composite: '+P1_T.en[t.tech.label]+', RSI '+t.tech.rsi+'.');
      var qr=window.__qualityResult;if(qr&&q&&qr.symbol===q.symbol)out.push('Quality screen: '+qr.res.verdict+'.');
      var sb=sbLoad();out.push('Scoreboard: '+sb.length+' saved AI predictions. Watchlist: '+loadWatchlist().join(', ')+'.');
      return out.join(' ');},
    actions:{
      loadStock:{desc:'Load the free live data card for a stock symbol (arg: symbol, e.g. "AAPL")',run:function(a){var s=assistantSym(a);if(s){document.getElementById('stockInput').value=s;loadLiveData(s);}}},
      analyzeStock:{desc:'Run the full AI analysis for a symbol (arg: symbol)',run:function(a){var s=assistantSym(a);if(s){document.getElementById('stockInput').value=s;analyzeStock(s);}}},
      addToWatchlist:{desc:'Add a symbol to the watchlist (arg: symbol)',run:function(a){var s=assistantSym(a);if(s)addToWatchlist(s);}},
      openScoreboard:{desc:'Open the AI prediction scoreboard',run:function(){openScoreboard();}}
    },
    suggestions:ASSIST_SUGG[curLang]||ASSIST_SUGG.en
  };
}

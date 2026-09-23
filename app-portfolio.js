/* StockAI · app-portfolio.js — live quote store · watchlist live prices (pre/post) · portfolio · price alerts · dividends · holders · bond yields
   AppNest © 2026 · load order: after app-insights.js, before app-init.js */
var P7_T={
he:{pfBtn:"💼 תיק",pfT:"💼 התיק שלי",tabPf:"💼 תיק השקעות",tabAl:"🔔 התראות מחיר",pfValue:"שווי התיק",pfTotal:"רווח/הפסד כולל",pfDay:"היום",pfEmpty:"עדיין אין אחזקות. הוסף את המניות שאתה מחזיק — כמות ומחיר קנייה — ותראה רווח והפסד בזמן אמת.",pfAdd:"+ הוסף אחזקה",pfCsv:"⬇ CSV",pfAlloc:"פיזור התיק",pfQty:"כמות מניות",pfBuy:"מחיר קנייה ממוצע ($)",pfBuyIL:"מחיר קנייה ממוצע (₪)",pfDate:"תאריך קנייה (לא חובה)",pfSym:"סימול",pfSave:"💾 שמור",pfDel:"🗑 מחק אחזקה",pfDelQ:"למחוק את האחזקה מהתיק?",pfCancel:"ביטול",pfFx:"המרה לפי {r} ₪ לדולר",pfNote:"המחירים מתעדכנים חי כשהשוק פתוח. רווח/הפסד לפני מס ועמלות. אינו ייעוץ השקעות.",pfInvalid:"מלא סימול, כמות ומחיר קנייה",pfAdded:"נשמר בתיק ✓",pfCost:"עלות",
alEmpty:"אין התראות. צור התראה — למשל: \"תודיע לי כש-PLX יורדת מתחת ל-2.5$\".",alAdd:"+ התראה חדשה",alAbove:"המחיר עולה מעל",alBelow:"המחיר יורד מתחת",alChgUp:"עלייה יומית של לפחות %",alChgDown:"ירידה יומית של לפחות %",alType:"תנאי",alValue:"ערך",alActive:"פעילות",alDone:"הופעלו",alRearm:"↺ הפעל שוב",alHit:"🔔 התראת מחיר — {s}",alOpen:"פתח מניה",alClose:"סגור",alNote:"ההתראות נבדקות כל עוד האפליקציה פתוחה (גם ברקע, אם הטלפון לא עצר אותה). התראה כשהאפליקציה סגורה לגמרי תדרוש שרת — אפשר להוסיף בעתיד.",alSaved:"ההתראה נשמרה ✓",alNow:"עכשיו",alFor:"התראה עבור {s}",alDelQ:"למחוק את ההתראה?",alDel:"🗑 מחק התראה",alTriggered:"הופעלה {d}",alInvalid:"מלא סימול וערך",
wqPre:"טרום מסחר",wqPost:"אחרי המסחר",wqClosed:"השוק סגור",wqDelayed:"מעוכב",wqLoading:"…",
lvBell:"צור התראת מחיר",lvAddPf:"הוסף לתיק",
divT:"💵 היסטוריית דיבידנדים",divAnnual:"סכום שנתי למניה",divLast:"תשלומים אחרונים",divYield:"תשואה נוכחית",divNote:"לפי תאריך האקס-דיבידנד · סכום למניה, לפני מס.",
hT:"🏛️ בעלי המניות",hIns:"בעלי עניין",hInst:"מוסדיים",hCount:"מספר גופים מוסדיים",hTop:"המוסדיים הגדולים",hNote:"לפי דיווחים רבעוניים (13F) — עשוי להיות בעיכוב של עד 3 חודשים.",
fxRates:"📉 ריביות",r13w:"אג\"ח 3 חודשים",r5y:"אג\"ח 5 שנים",r10y:"אג\"ח 10 שנים",r30y:"אג\"ח 30 שנים",rCurve:"עקום התשואות (10 שנים פחות 3 חודשים)",rInverted:"⚠️ הפוך — היסטורית סימן אזהרה למיתון",rNormal:"✅ רגיל",rNote:"תשואות אג\"ח ממשלת ארה\"ב — הן משפיעות על כל שוק המניות: ריבית עולה לוחצת בדרך כלל על מניות צמיחה."},
en:{pfBtn:"💼 Portfolio",pfT:"💼 My portfolio",tabPf:"💼 Portfolio",tabAl:"🔔 Price alerts",pfValue:"Portfolio value",pfTotal:"Total gain/loss",pfDay:"Today",pfEmpty:"No holdings yet. Add the stocks you own — quantity and buy price — and see gain/loss in real time.",pfAdd:"+ Add holding",pfCsv:"⬇ CSV",pfAlloc:"Allocation",pfQty:"Shares",pfBuy:"Average buy price ($)",pfBuyIL:"Average buy price (₪)",pfDate:"Buy date (optional)",pfSym:"Symbol",pfSave:"💾 Save",pfDel:"🗑 Delete holding",pfDelQ:"Delete this holding from the portfolio?",pfCancel:"Cancel",pfFx:"Converted at {r} ₪ per $",pfNote:"Prices update live while the market is open. Gain/loss before taxes and fees. Not investment advice.",pfInvalid:"Fill in symbol, shares and buy price",pfAdded:"Saved to portfolio ✓",pfCost:"Cost",
alEmpty:"No alerts. Create one — e.g. \"tell me when PLX drops below $2.5\".",alAdd:"+ New alert",alAbove:"Price rises above",alBelow:"Price falls below",alChgUp:"Daily gain of at least %",alChgDown:"Daily drop of at least %",alType:"Condition",alValue:"Value",alActive:"Active",alDone:"Triggered",alRearm:"↺ Re-arm",alHit:"🔔 Price alert — {s}",alOpen:"Open stock",alClose:"Close",alNote:"Alerts are checked while the app is open (also in the background, if the phone hasn't paused it). Alerts with the app fully closed would need a server — possible later.",alSaved:"Alert saved ✓",alNow:"Now",alFor:"Alert for {s}",alDelQ:"Delete this alert?",alDel:"🗑 Delete alert",alTriggered:"Triggered {d}",alInvalid:"Fill in symbol and value",
wqPre:"Pre-market",wqPost:"After hours",wqClosed:"Market closed",wqDelayed:"Delayed",wqLoading:"…",
lvBell:"Create a price alert",lvAddPf:"Add to portfolio",
divT:"💵 Dividend history",divAnnual:"Annual total per share",divLast:"Recent payments",divYield:"Current yield",divNote:"By ex-dividend date · amount per share, before tax.",
hT:"🏛️ Shareholders",hIns:"Insiders",hInst:"Institutions",hCount:"Number of institutions",hTop:"Largest institutions",hNote:"From quarterly 13F filings — may be up to 3 months old.",
fxRates:"📉 Rates",r13w:"3-month bill",r5y:"5-year note",r10y:"10-year note",r30y:"30-year bond",rCurve:"Yield curve (10Y minus 3M)",rInverted:"⚠️ Inverted — historically a recession warning",rNormal:"✅ Normal",rNote:"US Treasury yields — they affect the whole stock market: rising rates usually pressure growth stocks."},
ru:{pfBtn:"💼 Портфель",pfT:"💼 Мой портфель",tabPf:"💼 Портфель",tabAl:"🔔 Ценовые оповещения",pfValue:"Стоимость портфеля",pfTotal:"Общая прибыль/убыток",pfDay:"Сегодня",pfEmpty:"Пока нет позиций. Добавьте акции — количество и цену покупки — и смотрите прибыль в реальном времени.",pfAdd:"+ Добавить позицию",pfCsv:"⬇ CSV",pfAlloc:"Распределение",pfQty:"Количество",pfBuy:"Средняя цена покупки ($)",pfBuyIL:"Средняя цена покупки (₪)",pfDate:"Дата покупки (необяз.)",pfSym:"Тикер",pfSave:"💾 Сохранить",pfDel:"🗑 Удалить позицию",pfDelQ:"Удалить позицию из портфеля?",pfCancel:"Отмена",pfFx:"Курс {r} ₪ за $",pfNote:"Цены обновляются в реальном времени при открытом рынке. До налогов и комиссий. Не инвестиционный совет.",pfInvalid:"Заполните тикер, количество и цену",pfAdded:"Сохранено в портфеле ✓",pfCost:"Затраты",
alEmpty:"Оповещений нет. Создайте: например, «сообщи, когда PLX упадёт ниже $2.5».",alAdd:"+ Новое оповещение",alAbove:"Цена выше",alBelow:"Цена ниже",alChgUp:"Рост за день не менее %",alChgDown:"Падение за день не менее %",alType:"Условие",alValue:"Значение",alActive:"Активные",alDone:"Сработали",alRearm:"↺ Включить снова",alHit:"🔔 Оповещение — {s}",alOpen:"Открыть акцию",alClose:"Закрыть",alNote:"Оповещения проверяются, пока приложение открыто (и в фоне, если телефон его не приостановил). При полностью закрытом приложении нужен сервер — возможно позже.",alSaved:"Оповещение сохранено ✓",alNow:"Сейчас",alFor:"Оповещение для {s}",alDelQ:"Удалить оповещение?",alDel:"🗑 Удалить",alTriggered:"Сработало {d}",alInvalid:"Заполните тикер и значение",
wqPre:"Премаркет",wqPost:"Постмаркет",wqClosed:"Рынок закрыт",wqDelayed:"Задержка",wqLoading:"…",
lvBell:"Создать ценовое оповещение",lvAddPf:"Добавить в портфель",
divT:"💵 История дивидендов",divAnnual:"Сумма за год на акцию",divLast:"Последние выплаты",divYield:"Текущая доходность",divNote:"По экс-дивидендной дате · на акцию, до налога.",
hT:"🏛️ Акционеры",hIns:"Инсайдеры",hInst:"Институционалы",hCount:"Число институционалов",hTop:"Крупнейшие институционалы",hNote:"По квартальным отчётам 13F — может отставать до 3 месяцев.",
fxRates:"📉 Ставки",r13w:"Облигации 3 мес.",r5y:"Облигации 5 лет",r10y:"Облигации 10 лет",r30y:"Облигации 30 лет",rCurve:"Кривая доходности (10 лет минус 3 мес.)",rInverted:"⚠️ Инвертирована — исторически сигнал рецессии",rNormal:"✅ Нормальная",rNote:"Доходности казначейских облигаций США влияют на весь рынок: рост ставок обычно давит на акции роста."},
es:{pfBtn:"💼 Cartera",pfT:"💼 Mi cartera",tabPf:"💼 Cartera",tabAl:"🔔 Alertas de precio",pfValue:"Valor de la cartera",pfTotal:"Ganancia/pérdida total",pfDay:"Hoy",pfEmpty:"Aún no hay posiciones. Agrega tus acciones — cantidad y precio de compra — y verás ganancias en tiempo real.",pfAdd:"+ Agregar posición",pfCsv:"⬇ CSV",pfAlloc:"Distribución",pfQty:"Acciones",pfBuy:"Precio medio de compra ($)",pfBuyIL:"Precio medio de compra (₪)",pfDate:"Fecha de compra (opcional)",pfSym:"Símbolo",pfSave:"💾 Guardar",pfDel:"🗑 Eliminar posición",pfDelQ:"¿Eliminar esta posición?",pfCancel:"Cancelar",pfFx:"Convertido a {r} ₪ por $",pfNote:"Los precios se actualizan en vivo con el mercado abierto. Antes de impuestos y comisiones. No es asesoramiento.",pfInvalid:"Completa símbolo, cantidad y precio",pfAdded:"Guardado en la cartera ✓",pfCost:"Costo",
alEmpty:"No hay alertas. Crea una — p. ej. \"avísame si PLX baja de $2.5\".",alAdd:"+ Nueva alerta",alAbove:"El precio sube por encima de",alBelow:"El precio baja por debajo de",alChgUp:"Subida diaria de al menos %",alChgDown:"Caída diaria de al menos %",alType:"Condición",alValue:"Valor",alActive:"Activas",alDone:"Disparadas",alRearm:"↺ Reactivar",alHit:"🔔 Alerta de precio — {s}",alOpen:"Abrir acción",alClose:"Cerrar",alNote:"Las alertas se revisan mientras la app está abierta (también en segundo plano si el teléfono no la pausó). Con la app cerrada del todo se necesitaría un servidor — posible más adelante.",alSaved:"Alerta guardada ✓",alNow:"Ahora",alFor:"Alerta para {s}",alDelQ:"¿Eliminar la alerta?",alDel:"🗑 Eliminar alerta",alTriggered:"Disparada {d}",alInvalid:"Completa símbolo y valor",
wqPre:"Pre-mercado",wqPost:"Post-mercado",wqClosed:"Mercado cerrado",wqDelayed:"Con retraso",wqLoading:"…",
lvBell:"Crear alerta de precio",lvAddPf:"Agregar a la cartera",
divT:"💵 Historial de dividendos",divAnnual:"Total anual por acción",divLast:"Pagos recientes",divYield:"Rentabilidad actual",divNote:"Por fecha ex-dividendo · por acción, antes de impuestos.",
hT:"🏛️ Accionistas",hIns:"Insiders",hInst:"Institucionales",hCount:"Número de instituciones",hTop:"Mayores institucionales",hNote:"Según informes trimestrales 13F — pueden tener hasta 3 meses.",
fxRates:"📉 Tasas",r13w:"Letra 3 meses",r5y:"Bono 5 años",r10y:"Bono 10 años",r30y:"Bono 30 años",rCurve:"Curva de rendimiento (10A menos 3M)",rInverted:"⚠️ Invertida — históricamente aviso de recesión",rNormal:"✅ Normal",rNote:"Rendimientos del Tesoro de EE. UU. — afectan a todo el mercado: tasas al alza suelen presionar a las acciones de crecimiento."},
ar:{pfBtn:"💼 المحفظة",pfT:"💼 محفظتي",tabPf:"💼 المحفظة",tabAl:"🔔 تنبيهات السعر",pfValue:"قيمة المحفظة",pfTotal:"الربح/الخسارة الإجمالي",pfDay:"اليوم",pfEmpty:"لا توجد أسهم بعد. أضف أسهمك — الكمية وسعر الشراء — وشاهد الربح والخسارة مباشرة.",pfAdd:"+ إضافة سهم",pfCsv:"⬇ CSV",pfAlloc:"توزيع المحفظة",pfQty:"عدد الأسهم",pfBuy:"متوسط سعر الشراء ($)",pfBuyIL:"متوسط سعر الشراء (₪)",pfDate:"تاريخ الشراء (اختياري)",pfSym:"الرمز",pfSave:"💾 حفظ",pfDel:"🗑 حذف",pfDelQ:"حذف هذا السهم من المحفظة؟",pfCancel:"إلغاء",pfFx:"التحويل بسعر {r} ₪ للدولار",pfNote:"الأسعار تُحدَّث مباشرة أثناء التداول. قبل الضرائب والعمولات. ليس نصيحة استثمارية.",pfInvalid:"أدخل الرمز والكمية وسعر الشراء",pfAdded:"حُفظ في المحفظة ✓",pfCost:"التكلفة",
alEmpty:"لا تنبيهات. أنشئ تنبيهاً — مثلاً: \"أخبرني عندما ينزل PLX تحت 2.5$\".",alAdd:"+ تنبيه جديد",alAbove:"السعر يرتفع فوق",alBelow:"السعر ينخفض تحت",alChgUp:"ارتفاع يومي لا يقل عن %",alChgDown:"هبوط يومي لا يقل عن %",alType:"الشرط",alValue:"القيمة",alActive:"نشطة",alDone:"تم تفعيلها",alRearm:"↺ تفعيل مجدداً",alHit:"🔔 تنبيه سعر — {s}",alOpen:"فتح السهم",alClose:"إغلاق",alNote:"تُفحص التنبيهات ما دام التطبيق مفتوحاً (وفي الخلفية إن لم يوقفه الهاتف). التنبيه مع إغلاق التطبيق كلياً يحتاج خادماً — ممكن لاحقاً.",alSaved:"حُفظ التنبيه ✓",alNow:"الآن",alFor:"تنبيه لـ {s}",alDelQ:"حذف التنبيه؟",alDel:"🗑 حذف التنبيه",alTriggered:"فُعِّل {d}",alInvalid:"أدخل الرمز والقيمة",
wqPre:"ما قبل الافتتاح",wqPost:"ما بعد الإغلاق",wqClosed:"السوق مغلق",wqDelayed:"متأخر",wqLoading:"…",
lvBell:"إنشاء تنبيه سعر",lvAddPf:"إضافة للمحفظة",
divT:"💵 سجل التوزيعات",divAnnual:"المجموع السنوي للسهم",divLast:"آخر الدفعات",divYield:"العائد الحالي",divNote:"حسب تاريخ الاستحقاق · للسهم الواحد، قبل الضريبة.",
hT:"🏛️ المساهمون",hIns:"المطلعون",hInst:"المؤسسات",hCount:"عدد المؤسسات",hTop:"أكبر المؤسسات",hNote:"من تقارير 13F الفصلية — قد تتأخر حتى 3 أشهر.",
fxRates:"📉 الفوائد",r13w:"سندات 3 أشهر",r5y:"سندات 5 سنوات",r10y:"سندات 10 سنوات",r30y:"سندات 30 سنة",rCurve:"منحنى العائد (10 سنوات ناقص 3 أشهر)",rInverted:"⚠️ مقلوب — تاريخياً إنذار ركود",rNormal:"✅ طبيعي",rNote:"عوائد سندات الخزانة الأمريكية تؤثر على السوق كله: ارتفاع الفائدة يضغط عادة على أسهم النمو."}
};
function P7(k,o){var l=P7_T[curLang]||P7_T.en,s=l[k]!=null?l[k]:(P7_T.en[k]!=null?P7_T.en[k]:k);for(var x in (o||{}))s=s.split('{'+x+'}').join(o[x]);return s;}

/* ══ 1. QUOTE STORE — מקור אמת אחד לכל המחירים (זרם חי + רענון כל 30 שניות) ══ */
var QS={data:{}};
function qsUnit(q){return q&&q.currency==='ILA'?100:1;}
function qsCur(q){return q&&q.currency==='ILA'?'ILS':((q&&q.currency)||'USD');}
async function qsRefresh(syms){
  var u=[];(syms||[]).forEach(function(s){if(s&&u.indexOf(s)<0)u.push(s);});if(!u.length)return;
  for(var i=0;i<u.length;i+=50){
    try{var d=await workerFetch('action=quotes&symbols='+encodeURIComponent(u.slice(i,i+50).join(',')));
      (d.quotes||[]).forEach(function(q){var o=QS.data[q.symbol]||{};QS.data[q.symbol]=Object.assign({},o,q,{ts:Date.now(),live:o.live});});}catch(e){}
  }
  qsNotify();
}
function qsFromStream(d){
  if(!d||!d.id||!d.price)return;
  var q=QS.data[d.id]||(QS.data[d.id]={symbol:d.id});
  if(d.marketHours===0||d.marketHours===2||d.marketHours===3){  // 0=טרום · 2=אחרי · 3=מסחר מורחב
    var ext={price:d.price};if(q.price){ext.change=d.price-q.price;ext.changePct=(d.price/q.price-1)*100;}
    if(d.marketHours===0){q.pre=ext;q.state='PRE';}else{q.post=ext;q.state='POST';}
  }else{q.price=d.price;if(d.changePercent!=null)q.changePct=d.changePercent;if(d.change!=null)q.change=d.change;q.state='REGULAR';}
  q.live=Date.now();qsNotify();
}
function qsNow(q){ // המחיר "העדכני ביותר" — כולל טרום/אחרי מסחר
  if(!q)return null;var st=q.state||'';
  if(/PRE/.test(st)&&q.pre&&q.pre.price)return q.pre.price;
  if(/POST|CLOSED/.test(st)&&q.post&&q.post.price)return q.post.price;
  return q.price;
}
var __qsTimer=null;
function qsNotify(){if(__qsTimer)return;__qsTimer=setTimeout(function(){__qsTimer=null;try{wqUpdateAll();}catch(e){}try{pfUpdateLive();}catch(e){}try{alCheck();}catch(e){}},250);}
function qsWanted(){
  var s=[];
  if(document.getElementById('watchPanel')&&document.getElementById('watchPanel').classList.contains('open'))s=s.concat(loadWatchlist());
  if(document.getElementById('pfOverlay')&&document.getElementById('pfOverlay').classList.contains('open'))s=s.concat(pfLoad().map(function(h){return h.sym;}));
  s=s.concat(alLoad().filter(function(a){return a.active;}).map(function(a){return a.sym;}));
  return s;
}
setInterval(function(){if(!document.hidden){var w=qsWanted();if(w.length)qsRefresh(w);}},30000);
/* הזרם החי: מעדכן את המאגר, ונרשם גם למניות שבמעקב/בתיק/בהתראות */
var __p7OrigLsApply=lsApply;lsApply=function(d){__p7OrigLsApply(d);qsFromStream(d);};
var __p7OrigLsSymbols=lsSymbols;
lsSymbols=function(){
  var base=__p7OrigLsSymbols(),extra=loadWatchlist().concat(pfLoad().map(function(h){return h.sym;}),alLoad().filter(function(a){return a.active;}).map(function(a){return a.sym;}));
  extra.forEach(function(x){if(x&&base.indexOf(x)<0&&!/\.TA$/.test(x))base.push(x);});
  return base.slice(0,60);
};
function lsResubscribe(){try{lsSubscribe();}catch(e){}}

/* ══ 2. WATCHLIST — מחיר חי + טרום/אחרי מסחר לכל מניה ══ */
var __p7OrigRenderWatchlist=renderWatchlist;
renderWatchlist=function(){
  __p7OrigRenderWatchlist();
  document.querySelectorAll('#watchItemsList .watch-item').forEach(function(item){
    var symEl=item.querySelector('.watch-item-sym');if(!symEl)return;var s=symEl.textContent.trim();
    var left=item.querySelector('.watch-item-left');if(left&&!left.querySelector('.wq'))left.insertAdjacentHTML('beforeend','<div class="wq" data-wq="'+escHtml(s)+'"><span class="wq-p">'+P7('wqLoading')+'</span></div>');
    var act=item.querySelector('.watch-item-actions');if(act&&!act.querySelector('.wq-bell'))act.insertAdjacentHTML('afterbegin','<button class="wq-bell" aria-label="'+escHtml(P7('lvBell'))+'" onclick="openAlertForm(\''+escHtml(s)+'\')">🔔</button>');
  });
  wqUpdateAll();qsRefresh(loadWatchlist());lsResubscribe();
};
function extLine(q){
  var st=q.state||'',ext=null,lbl='';
  if(/PRE/.test(st)&&q.pre){ext=q.pre;lbl=P7('wqPre');}
  else if(/POST|CLOSED/.test(st)&&q.post){ext=q.post;lbl=P7('wqPost');}
  if(ext&&ext.price){var c=ext.changePct!=null?(ext.changePct>=0?'var(--green)':'var(--red)'):'var(--text-dim)';
    return '<div class="wq-ext"><span>'+lbl+':</span> <b>'+fmtPrice(ext.price,q.currency)+'</b>'+(ext.changePct!=null?' <b style="color:'+c+'">'+fmtPct(ext.changePct)+'</b>':'')+'</div>';}
  if(/CLOSED|POSTPOST|PREPRE/.test(st))return '<div class="wq-ext"><span>'+P7('wqClosed')+'</span></div>';
  return '';
}
function wqUpdateAll(){
  document.querySelectorAll('[data-wq]').forEach(function(el){
    var s=el.getAttribute('data-wq'),q=QS.data[s];if(!q||q.price==null)return;
    var c=(q.changePct||0)>=0?'var(--green)':'var(--red)',isLive=q.live&&Date.now()-q.live<20000;
    var html='<span class="wq-p">'+fmtPrice(q.price,q.currency)+'</span> <span class="wq-c" style="color:'+c+'">'+fmtPct(q.changePct||0)+'</span>'
      +(isLive?' <span class="wq-live">●</span>':'')+(/\.TA$/.test(s)?' <span class="wq-dl">⏱ '+P7('wqDelayed')+'</span>':'')+extLine(q);
    var prev=el.getAttribute('data-last');
    if(el.innerHTML!==html){el.innerHTML=html;var pNow=String(qsNow(q));if(prev&&prev!==pNow){var pe=el.querySelector('.wq-p');if(pe)lsFlash(pe,Number(pNow)>Number(prev)?1:-1);}el.setAttribute('data-last',pNow);}
  });
}

/* ══ 3. PORTFOLIO — אחזקות, רווח/הפסד כולל ויומי, פיזור, דולר/שקל ══ */
function pfLoad(){try{return JSON.parse(localStorage.getItem('stockai_portfolio'))||[];}catch(e){return [];}}
function pfSave(a){try{localStorage.setItem('stockai_portfolio',JSON.stringify(a));}catch(e){showToastMsg('⚠ Storage error');}}
var PF={tab:'pf',cur:localStorage.getItem('stockai_pf_cur')||'USD'};
function usdIls(){return (window.boiData&&boiData.rates&&boiData.rates.USD)||(window.fxData&&fxData.rates&&fxData.rates.ILS)||3.7;}
function toUSD(x,cur){if(x==null)return null;if(cur==='USD')return x;if(cur==='ILS')return x/usdIls();var r=window.fxData&&fxData.rates&&fxData.rates[cur];return r?x/r:x;}
function disp(x){return PF.cur==='ILS'?x*usdIls():x;}
function dispMoney(x){if(x==null||isNaN(x))return '—';var v=disp(x),s=PF.cur==='ILS'?'₪':'$';return (v<0?'-':'')+s+Math.abs(Math.round(v)).toLocaleString();}
function pfCalc(){
  var rows=pfLoad().map(function(h){
    var q=QS.data[h.sym],u=qsUnit(q),cur=qsCur(q),px=q&&q.price!=null?q.price/u:null;
    var value=px!=null?h.qty*px:null,cost=h.qty*h.buy,dayChg=null;
    if(q&&q.change!=null)dayChg=h.qty*q.change/u;else if(q&&q.changePct!=null&&value!=null)dayChg=value-value/(1+q.changePct/100);
    return {h:h,q:q,cur:cur,px:px,valueUSD:toUSD(value,cur),costUSD:toUSD(cost,cur),dayUSD:toUSD(dayChg,cur)};
  });
  var tv=0,tc=0,td=0,known=0;rows.forEach(function(r){if(r.valueUSD!=null){tv+=r.valueUSD;tc+=r.costUSD;td+=r.dayUSD||0;known++;}});
  return {rows:rows,value:tv,cost:tc,pl:tv-tc,plPct:tc?(tv/tc-1)*100:0,day:td,dayPct:(tv-td)?td/(tv-td)*100:0,known:known};
}
function openPortfolio(tab){PF.tab=tab||'pf';renderPortfolio();openModal('pfOverlay');qsRefresh(pfLoad().map(function(h){return h.sym;}).concat(alLoad().map(function(a){return a.sym;})));lsResubscribe();}
function pfSetCur(c){PF.cur=c;localStorage.setItem('stockai_pf_cur',c);renderPortfolio();}
var PF_COLORS=['#c9a84c','#4caf72','#5b8def','#cf4a4a','#9b6bd6','#e08a3c','#3cb4b4','#b0a07a','#7a8b99','#d66ba0'];
function renderPortfolio(){
  var el=document.getElementById('pfBody');if(!el)return;
  var h='<div class="mk-tabs">'+[['pf','tabPf'],['al','tabAl']].map(function(t){return '<button class="'+(PF.tab===t[0]?'on':'')+'" onclick="PF.tab=\''+t[0]+'\';renderPortfolio()">'+P7(t[1])+'</button>';}).join('')+'</div>';
  if(PF.tab==='al'){el.innerHTML=h+'<div id="alBody"></div>';renderAlerts();return;}
  var hold=pfLoad();
  if(!hold.length){el.innerHTML=h+'<div class="ta-small" style="padding:10px 0">'+P7('pfEmpty')+'</div><button class="btn-ai-analyze" style="width:100%" onclick="openHoldingForm()">'+P7('pfAdd')+'</button>';return;}
  el.innerHTML=h+'<div id="pfLive"></div><div class="sb-actions" style="margin-top:10px"><button onclick="openHoldingForm()">'+P7('pfAdd')+'</button><button onclick="pfExportCsv()">'+P7('pfCsv')+'</button>'
    +'<span style="flex:1"></span><button class="'+(PF.cur==='USD'?'on':'')+'" onclick="pfSetCur(\'USD\')">$</button><button class="'+(PF.cur==='ILS'?'on':'')+'" onclick="pfSetCur(\'ILS\')">₪</button></div>'
    +'<div class="ta-note">'+P7('pfNote')+' · '+P7('pfFx',{r:usdIls().toFixed(3)})+'</div>';
  pfUpdateLive();
}
function pfUpdateLive(){
  var el=document.getElementById('pfLive');if(!el)return;
  var c=pfCalc(),col=function(v){return v>=0?'var(--green)':'var(--red)';};
  var h='<div class="sb-stats" style="grid-template-columns:repeat(3,1fr)">'
    +'<div><span>'+P7('pfValue')+'</span><strong>'+dispMoney(c.value)+'</strong></div>'
    +'<div><span>'+P7('pfTotal')+'</span><strong style="color:'+col(c.pl)+'">'+dispMoney(c.pl)+'</strong><em style="color:'+col(c.pl)+'">'+fmtPct(c.plPct)+'</em></div>'
    +'<div><span>'+P7('pfDay')+'</span><strong style="color:'+col(c.day)+'">'+dispMoney(c.day)+'</strong><em style="color:'+col(c.day)+'">'+fmtPct(c.dayPct)+'</em></div></div>';
  var rows=c.rows.slice().sort(function(a,b){return (b.valueUSD||0)-(a.valueUSD||0);});
  if(c.value>0){h+='<div class="rec-trend-title" style="margin-top:12px">'+P7('pfAlloc')+'</div><div class="rec-bar">'+rows.map(function(r,i){var w=(r.valueUSD||0)/c.value*100;return w>0?'<div class="rec-seg" title="'+escHtml(r.h.sym)+'" style="width:'+w+'%;background:'+PF_COLORS[i%PF_COLORS.length]+'"></div>':'';}).join('')+'</div>';}
  h+='<div class="sb-list" style="margin-top:10px">'+rows.map(function(r,i){
    var h1=r.h,pl=r.valueUSD!=null?r.valueUSD-r.costUSD:null,plPct=h1.buy?((r.px!=null?r.px:h1.buy)/h1.buy-1)*100:0,w=c.value&&r.valueUSD?r.valueUSD/c.value*100:0;
    var dpct=r.q&&r.q.changePct!=null?r.q.changePct:null,cs=r.cur==='ILS'?'ILS':r.cur;
    return '<div class="pf-row"><span class="pf-dot" style="background:'+PF_COLORS[i%PF_COLORS.length]+'"></span>'
      +'<div class="pf-main" onclick="closeModal(\'pfOverlay\');quickLive(\''+escHtml(h1.sym)+'\')"><b>'+escHtml(h1.sym.replace(/\.TA$/,''))+'</b><em>'+h1.qty+' × '+fmtPrice(h1.buy,cs)+' · '+Math.round(w)+'%</em></div>'
      +'<div class="pf-px"><b>'+(r.px!=null?fmtPrice(r.px,cs):'…')+'</b>'+(dpct!=null?'<em style="color:'+col(dpct)+'">'+fmtPct(dpct)+'</em>':'')+'</div>'
      +'<div class="pf-val"><b>'+dispMoney(r.valueUSD)+'</b>'+(pl!=null?'<em style="color:'+col(pl)+'">'+fmtPct(plPct)+'</em>':'')+'</div>'
      +'<button class="sb-del" aria-label="edit" onclick="openHoldingForm(null,'+h1.id+')">✏️</button></div>';
  }).join('')+'</div>';
  el.innerHTML=h;
}
function openHoldingForm(sym,id){
  var hold=id?pfLoad().filter(function(x){return x.id===id;})[0]:null;
  sym=(hold&&hold.sym)||sym||'';
  var q=QS.data[sym]||(window.__lastLiveQuote&&window.__lastLiveQuote.symbol===sym?{price:window.__lastLiveQuote.regularPrice,currency:window.__lastLiveQuote.currency}:null);
  var il=/\.TA$/.test(sym)||(q&&q.currency==='ILA');
  var buy=hold?hold.buy:(q&&q.price!=null?Math.round(q.price/qsUnit(q)*100)/100:'');
  PF.tab='pf';
  if(!document.getElementById('pfOverlay').classList.contains('open'))openModal('pfOverlay');
  document.getElementById('pfBody').innerHTML='<div class="rec-trend-title">'+(hold?'✏️ ':'')+P7('pfAdd').replace('+ ','')+'</div>'
    +'<label class="th-lbl">'+P7('pfSym')+'</label><input class="key-input" id="pfSym" value="'+escHtml(sym)+'" oninput="this.value=this.value.toUpperCase();document.getElementById(\'pfBuyLbl\').textContent=/\\.TA$/.test(this.value)?\''+P7('pfBuyIL')+'\':\''+P7('pfBuy')+'\'"'+(hold?' readonly':'')+'>'
    +'<label class="th-lbl">'+P7('pfQty')+'</label><input class="key-input" id="pfQty" type="number" step="any" min="0" value="'+(hold?hold.qty:'')+'">'
    +'<label class="th-lbl" id="pfBuyLbl">'+(il?P7('pfBuyIL'):P7('pfBuy'))+'</label><input class="key-input" id="pfBuy" type="number" step="any" min="0" value="'+buy+'">'
    +'<label class="th-lbl">'+P7('pfDate')+'</label><input class="key-input" id="pfDate" type="date" value="'+(hold&&hold.date||'')+'">'
    +'<div class="sb-actions" style="margin-top:12px"><button class="btn-ai-analyze" onclick="pfSubmit('+(hold?hold.id:0)+')">'+P7('pfSave')+'</button><button onclick="renderPortfolio()">'+P7('pfCancel')+'</button>'
    +(hold?'<span style="flex:1"></span><button style="color:var(--red);border-color:var(--red)" onclick="pfDelete('+hold.id+')">'+P7('pfDel')+'</button>':'')+'</div>';
}
function pfSubmit(id){
  var sym=document.getElementById('pfSym').value.trim().toUpperCase(),qty=parseFloat(document.getElementById('pfQty').value),buy=parseFloat(document.getElementById('pfBuy').value),date=document.getElementById('pfDate').value;
  if(!sym||!(qty>0)||!(buy>0)){showToastMsg(P7('pfInvalid'));return;}
  var a=pfLoad();
  if(id){a.forEach(function(x){if(x.id===id){x.qty=qty;x.buy=buy;x.date=date;}});}
  else{var ex=a.filter(function(x){return x.sym===sym;})[0];
    if(ex){var nq=ex.qty+qty;ex.buy=Math.round((ex.qty*ex.buy+qty*buy)/nq*10000)/10000;ex.qty=nq;}   // קנייה נוספת — ממוצע משוקלל
    else a.push({id:Date.now(),sym:sym,qty:qty,buy:buy,date:date});}
  pfSave(a);showToastMsg(P7('pfAdded'));renderPortfolio();qsRefresh([sym]);lsResubscribe();
}
function pfDelete(id){if(!confirm(P7('pfDelQ')))return;pfSave(pfLoad().filter(function(x){return x.id!==id;}));renderPortfolio();}
function pfExportCsv(){
  var c=pfCalc(),rows=[['user','symbol','shares','buy_price','price_now','currency','value_usd','gain_usd','gain_pct','buy_date']];
  c.rows.forEach(function(r){rows.push([getUsername(),r.h.sym,r.h.qty,r.h.buy,r.px!=null?r.px:'',r.cur,r.valueUSD!=null?r.valueUSD.toFixed(2):'',r.valueUSD!=null?(r.valueUSD-r.costUSD).toFixed(2):'',r.px!=null?((r.px/r.h.buy-1)*100).toFixed(2):'',r.h.date||'']);});
  var csv='\ufeff'+rows.map(function(r){return r.map(function(x){return '"'+String(x).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download='stockai-portfolio-'+new Date().toISOString().slice(0,10)+'.csv';document.body.appendChild(a);a.click();a.remove();
}

/* ══ 4. PRICE ALERTS — נבדקות בכל עדכון מחיר כשהאפליקציה פתוחה ══ */
function alLoad(){try{return JSON.parse(localStorage.getItem('stockai_alerts'))||[];}catch(e){return [];}}
function alSave(a){try{localStorage.setItem('stockai_alerts',JSON.stringify(a));}catch(e){}}
var AL_TYPES=[['above','alAbove'],['below','alBelow'],['chgUp','alChgUp'],['chgDown','alChgDown']];
function alDesc(a){var t=AL_TYPES.filter(function(x){return x[0]===a.type;})[0];var money=a.type==='above'||a.type==='below';
  return P7(t?t[1]:'alAbove').replace(' %','')+' '+(money?fmtPrice(a.value,/\.TA$/.test(a.sym)?'ILS':'USD'):a.value+'%');}
function renderAlerts(){
  var el=document.getElementById('alBody');if(!el)return;
  var all=alLoad(),act=all.filter(function(a){return a.active;}),done=all.filter(function(a){return !a.active;});
  function row(a){var q=QS.data[a.sym],now=q?qsNow(q)/qsUnit(q):null;
    return '<div class="pf-row"><span class="pf-dot" style="background:'+(a.active?'var(--gold)':'var(--text-muted)')+'"></span><div class="pf-main" onclick="closeModal(\'pfOverlay\');quickLive(\''+escHtml(a.sym)+'\')"><b>'+escHtml(a.sym.replace(/\.TA$/,''))+'</b><em>'+escHtml(alDesc(a))+'</em></div>'
      +'<div class="pf-px"><b>'+(now!=null?fmtPrice(now,/\.TA$/.test(a.sym)?'ILS':'USD'):'…')+'</b><em>'+(a.active?P7('alNow'):P7('alTriggered',{d:(a.triggeredAt||'').slice(5,16).replace('T',' ')}))+'</em></div>'
      +(a.active?'':'<button class="model-refresh" onclick="alRearm('+a.id+')">'+P7('alRearm')+'</button>')
      +'<button class="sb-del" aria-label="edit" onclick="openAlertForm(null,'+a.id+')">✏️</button></div>';}
  var h='<button class="btn-ai-analyze" style="width:100%;margin-bottom:10px" onclick="openAlertForm()">'+P7('alAdd')+'</button>';
  if(!all.length)h+='<div class="ta-small">'+P7('alEmpty')+'</div>';
  if(act.length)h+='<div class="rec-trend-title">'+P7('alActive')+' ('+act.length+')</div><div class="sb-list">'+act.map(row).join('')+'</div>';
  if(done.length)h+='<div class="rec-trend-title" style="margin-top:12px">'+P7('alDone')+'</div><div class="sb-list">'+done.slice(-10).reverse().map(row).join('')+'</div>';
  el.innerHTML=h+'<div class="ta-note">'+P7('alNote')+'</div>';
}
function openAlertForm(sym,id){
  var a=id?alLoad().filter(function(x){return x.id===id;})[0]:null;sym=(a&&a.sym)||sym||'';
  var q=QS.data[sym]||(window.__lastLiveQuote&&window.__lastLiveQuote.symbol===sym?{price:window.__lastLiveQuote.regularPrice,currency:window.__lastLiveQuote.currency}:null);
  var def=a?a.value:(q&&q.price!=null?Math.round(q.price/qsUnit(q)*0.95*100)/100:'');
  PF.tab='al';
  if(!document.getElementById('pfOverlay').classList.contains('open'))openModal('pfOverlay');
  document.getElementById('pfBody').innerHTML='<div class="rec-trend-title">🔔 '+(sym?P7('alFor',{s:escHtml(sym)}):P7('alAdd').replace('+ ',''))+'</div>'
    +'<label class="th-lbl">'+P7('pfSym')+'</label><input class="key-input" id="alSym" value="'+escHtml(sym)+'" oninput="this.value=this.value.toUpperCase()"'+(a?' readonly':'')+'>'
    +'<label class="th-lbl">'+P7('alType')+'</label><select class="key-input" id="alType">'+AL_TYPES.map(function(t){return '<option value="'+t[0]+'"'+(a&&a.type===t[0]?' selected':'')+'>'+P7(t[1])+'</option>';}).join('')+'</select>'
    +'<label class="th-lbl">'+P7('alValue')+(q&&q.price!=null?' · '+P7('alNow')+': '+fmtPrice(q.price/qsUnit(q),qsCur(q)):'')+'</label><input class="key-input" id="alVal" type="number" step="any" value="'+def+'">'
    +'<div class="sb-actions" style="margin-top:12px"><button class="btn-ai-analyze" onclick="alSubmit('+(a?a.id:0)+')">'+P7('pfSave')+'</button><button onclick="PF.tab=\'al\';renderPortfolio()">'+P7('pfCancel')+'</button>'
    +(a?'<span style="flex:1"></span><button style="color:var(--red);border-color:var(--red)" onclick="alDelete('+a.id+')">'+P7('alDel')+'</button>':'')+'</div>';
}
function alSubmit(id){
  var sym=document.getElementById('alSym').value.trim().toUpperCase(),type=document.getElementById('alType').value,val=parseFloat(document.getElementById('alVal').value);
  if(!sym||!isFinite(val)){showToastMsg(P7('alInvalid'));return;}
  var a=alLoad();
  if(id)a.forEach(function(x){if(x.id===id){x.type=type;x.value=val;x.active=true;x.triggeredAt=null;}});
  else a.push({id:Date.now(),sym:sym,type:type,value:val,active:true,created:new Date().toISOString()});
  alSave(a);showToastMsg(P7('alSaved'));
  try{if(window.Notification&&Notification.permission==='default')Notification.requestPermission();}catch(e){}
  PF.tab='al';renderPortfolio();qsRefresh([sym]);lsResubscribe();
}
function alDelete(id){if(!confirm(P7('alDelQ')))return;alSave(alLoad().filter(function(x){return x.id!==id;}));PF.tab='al';renderPortfolio();}
function alRearm(id){var a=alLoad();a.forEach(function(x){if(x.id===id){x.active=true;x.triggeredAt=null;}});alSave(a);renderAlerts();}
function alCheck(){
  var all=alLoad(),changed=false;
  all.forEach(function(a){
    if(!a.active)return;var q=QS.data[a.sym];if(!q||q.price==null)return;
    var now=qsNow(q)/qsUnit(q),hit=false;
    if(a.type==='above')hit=now>=a.value;else if(a.type==='below')hit=now<=a.value;
    else if(a.type==='chgUp')hit=(q.changePct||0)>=Math.abs(a.value);else if(a.type==='chgDown')hit=(q.changePct||0)<=-Math.abs(a.value);
    if(hit){a.active=false;a.triggeredAt=new Date().toISOString();a.hitPrice=now;changed=true;alFire(a,now,q);}
  });
  if(changed){alSave(all);if(document.getElementById('alBody'))renderAlerts();}
}
function alFire(a,now,q){
  var title=P7('alHit',{s:a.sym.replace(/\.TA$/,'')}),msg=alDesc(a)+' · '+P7('alNow')+': '+fmtPrice(now,/\.TA$/.test(a.sym)?'ILS':'USD')+(q&&q.changePct!=null?' ('+fmtPct(q.changePct)+')':'');
  var b=document.createElement('div');b.className='al-pop';b.setAttribute('role','alert');
  b.innerHTML='<div class="al-pop-t">'+escHtml(title)+'</div><div class="al-pop-m">'+escHtml(msg)+'</div><div class="al-pop-b"><button class="btn-ai-analyze" onclick="this.closest(\'.al-pop\').remove();quickLive(\''+escHtml(a.sym)+'\')">'+P7('alOpen')+'</button><button onclick="this.closest(\'.al-pop\').remove()">'+P7('alClose')+'</button></div>';
  document.body.appendChild(b);
  try{var ctx=new (window.AudioContext||window.webkitAudioContext)();[0,0.18].forEach(function(t){var o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=880;o.connect(g);g.connect(ctx.destination);g.gain.setValueAtTime(0.15,ctx.currentTime+t);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+t+0.15);o.start(ctx.currentTime+t);o.stop(ctx.currentTime+t+0.16);});}catch(e){}
  try{if(navigator.vibrate)navigator.vibrate([200,100,200]);}catch(e){}
  try{if(document.hidden&&window.Notification&&Notification.permission==='granted')new Notification(title,{body:msg,icon:'icon-192.png',tag:'stockai-'+a.id});}catch(e){}
}

/* ══ 5. DIVIDENDS · HOLDERS — טאבים "פיננסים" ו"אנליסטים" ══ */
async function loadDividends(symbol){
  var el=document.getElementById('lvDividends');if(!el)return;
  try{
    var d=await workerFetch('action=dividends&symbol='+encodeURIComponent(symbol));
    if(currentLiveSymbol!==symbol||!d.dividends||!d.dividends.length){el.innerHTML='';return;}
    var cs=d.currency==='ILA'?'ILA':d.currency,byY={};d.dividends.forEach(function(x){var y=x.date.slice(0,4);byY[y]=(byY[y]||0)+x.amount;});
    var years=Object.keys(byY).sort().slice(-8),mx=Math.max.apply(null,years.map(function(y){return byY[y];}))||1,q=window.__lastLiveQuote;
    var bars=years.map(function(y){return '<div class="fin-year"><div class="fin-bar-pair"><div class="fin-bar" style="height:'+Math.max(3,Math.round(byY[y]/mx*70))+'px;background:var(--gold)" title="'+fmtPrice(byY[y],cs)+'"></div></div><div class="fin-year-lbl">'+y+'</div></div>';}).join('');
    var last=d.dividends.slice(-6).reverse().map(function(x){return '<div class="ev-up"><span>'+escHtml(x.date)+'</span><strong>'+fmtPrice(x.amount,cs)+'</strong></div>';}).join('');
    el.innerHTML='<div class="rec-trend-title">'+P7('divT')+(q&&q.symbol===symbol&&q.dividendYield?' · '+P7('divYield')+': '+(q.dividendYield*100).toFixed(2)+'%':'')+'</div>'
      +'<div class="ta-small" style="margin:0 0 4px">'+P7('divAnnual')+'</div><div class="fin-bars">'+bars+'</div>'
      +'<div class="rec-trend-title" style="margin-top:12px">'+P7('divLast')+'</div>'+last+'<div class="ta-note">'+P7('divNote')+'</div>';
    renderLiveTabs();applyLiveTabs();
  }catch(e){el.innerHTML='';}
}
function renderHolders(q){
  var el=document.getElementById('lvHolders');if(!el)return;var h=q&&q.holders;if(!h){el.innerHTML='';return;}
  function cell(l,v){return '<div class="ta-cell"><div class="live-metric-lbl">'+l+'</div><div class="live-metric-val">'+v+'</div></div>';}
  var out='<div class="rec-trend-title">'+P7('hT')+'</div><div class="ta-grid">'+(h.insidersPct!=null?cell(P7('hIns'),(h.insidersPct*100).toFixed(1)+'%'):'')+(h.institutionsPct!=null?cell(P7('hInst'),(h.institutionsPct*100).toFixed(1)+'%'):'')+(h.institutionsCount?cell(P7('hCount'),Math.round(h.institutionsCount).toLocaleString()):'')+'</div>';
  if(h.top&&h.top.length){var mx=Math.max.apply(null,h.top.map(function(t){return t.pct||0;}))||1;
    out+='<div class="rec-trend-title" style="margin-top:12px">'+P7('hTop')+'</div>'+h.top.map(function(t){return '<div class="hd-row"><span>'+escHtml(t.org)+'</span><div class="hd-bar"><i style="width:'+((t.pct||0)/mx*100)+'%"></i></div><b>'+((t.pct||0)*100).toFixed(2)+'%</b></div>';}).join('');}
  el.innerHTML=out+'<div class="ta-note">'+P7('hNote')+'</div>';
}
var __p7OrigRLQ=renderLiveQuote;renderLiveQuote=function(q){__p7OrigRLQ(q);try{renderHolders(q);renderLiveTabs();applyLiveTabs();}catch(e){}};

/* ══ 6. BOND YIELDS — לשונית "ריביות" במט"ח ══ */
var RATE_SYMS=[['^IRX','r13w'],['^FVX','r5y'],['^TNX','r10y'],['^TYX','r30y']],ratesData=null;
async function loadRates(){try{ratesData=await workerFetch('action=ticker&symbols='+encodeURIComponent(RATE_SYMS.map(function(r){return r[0];}).join(',')));}catch(e){ratesData=null;}}
var __p7OrigSwitchFx=switchFxTab;
switchFxTab=function(tab){
  if(tab==='rates'){fxTab='rates';['forex','crypto'].forEach(function(t){var b=document.getElementById('fxtab-'+t);if(b)b.classList.remove('active');});}
  else __p7OrigSwitchFx(tab);
  var rb=document.getElementById('fxtab-rates');if(rb)rb.classList.toggle('active',tab==='rates');
  renderFx();if(tab==='rates'&&!ratesData)loadRates().then(renderFx);
};
var __p7OrigRenderFx=renderFx;
renderFx=function(){
  if(fxTab!=='rates')return __p7OrigRenderFx();
  var el=document.getElementById('fxContent');if(!el)return;
  if(!ratesData||!ratesData.quotes){el.innerHTML='<div class="fx-loading">'+P5('loading')+'</div>';return;}
  var by={};ratesData.quotes.forEach(function(q){by[q.symbol]=q;});
  var cells=RATE_SYMS.filter(function(r){return by[r[0]];}).map(function(r){var q=by[r[0]],c=q.changePct>=0?'var(--red)':'var(--green)';
    return '<div class="fx-cell"><div class="fx-pair">'+P7(r[1])+'</div><div class="fx-rate">'+q.price.toFixed(2)+'%</div><div class="fx-chg" style="color:'+c+'">'+fmtPct(q.changePct)+'</div></div>';}).join('');
  var s=by['^TNX']&&by['^IRX']?by['^TNX'].price-by['^IRX'].price:null;
  el.innerHTML='<div class="fx-grid">'+cells+'</div>'+(s!=null?'<div class="boi-box"><div class="boi-head"><span>'+P7('rCurve')+'</span><em>'+(s>=0?'+':'')+s.toFixed(2)+'%</em></div><div class="ta-small" style="margin:0">'+(s<0?P7('rInverted'):P7('rNormal'))+'</div></div>':'')
    +'<div class="ta-small" style="padding:8px 12px">'+P7('rNote')+'</div>';
};

/* ══ 7. LABELS + language re-render ══ */
function p7Labels(){
  var b=document.getElementById('btnPortfolio');if(b)b.textContent=P7('pfBtn');
  var t=document.getElementById('pfTitle');if(t)t.textContent=P7('pfT');
  var r=document.getElementById('fxtab-rates');if(r)r.textContent=P7('fxRates');
  var bl=document.getElementById('lvBell');if(bl){bl.setAttribute('aria-label',P7('lvBell'));bl.title=P7('lvBell');}
  var ap=document.getElementById('lvAddPf');if(ap){ap.setAttribute('aria-label',P7('lvAddPf'));ap.title=P7('lvAddPf');}
  if(document.getElementById('pfOverlay')&&document.getElementById('pfOverlay').classList.contains('open'))renderPortfolio();
  wqUpdateAll();
}

;(window.__MODS=window.__MODS||{})['app-portfolio']=1;

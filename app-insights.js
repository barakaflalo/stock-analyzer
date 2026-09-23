/* StockAI · app-insights.js — backtest of our signal, analyst estimates, peer comparison, personal screener
   AppNest © 2026 · load order: after app-live.js, before app-init.js */
var P6_T={
he:{btT:"🧪 האם האיתות שלנו עבד? — בדיקה לאחור",btSignal:"לפי האיתות",btHold:"קנה והחזק",btTrades:"עסקאות",btWin:"עסקאות רווחיות",btDD:"ירידה מקסימלית",btExposure:"זמן בשוק",btAcc:"דיוק איתות חיובי (10 ימים)",btBetter:"✅ במניה הזו, האיתות היה עדיף על קנה-והחזק",btWorse:"➖ במניה הזו, עדיף היה פשוט להחזיק",btNote:"סימולציה על {n} ימי מסחר: נכנסים כשהאיתות חיובי ויוצאים כשהוא נחלש, ביצוע ביום שאחרי. בלי עמלות ומסים. ביצועי עבר אינם מבטיחים את העתיד.",
estT:"📈 תחזיות אנליסטים",curQ:"רבעון נוכחי",nextQ:"רבעון הבא",curY:"שנה נוכחית",nextY:"שנה הבאה",epsL:"רווח למניה",revL:"הכנסות",growthL:"צמיחה",analystsN:"{n} אנליסטים",estNote:"ממוצע תחזיות האנליסטים (Yahoo) · בסוגריים: ההערכה הנמוכה–הגבוהה.",
gSrcEst:"ברירת המחדל לצמיחה: תחזית האנליסטים לשנה הבאה",gSrcHist:"ברירת המחדל לצמיחה: קצב הצמיחה של השנים האחרונות",
peersT:"🏭 מתחרים",colMcap:"שווי",colPe:"מכפיל",colY:"שנה",colMargin:"שולי רווח",colRoe:"ROE",colRating:"טכני",colChg:"היום",median:"חציון",peersNote:"החברות הגדולות באותה {t} (TradingView, עיכוב ~15 דק') · לחיצה פותחת את המניה.",grpIndustry:"תעשייה",grpSector:"סקטור",peBelow:"המכפיל של {s} נמוך מחציון המתחרים ({m})",peAbove:"המכפיל של {s} גבוה מחציון המתחרים ({m})",
tabScreen:"🔎 סורק",scrUS:"🇺🇸 ארה\"ב",scrIL:"🇮🇱 ישראל",pOversold:"מכירת יתר",dOversold:"RSI מתחת ל-30 — ירדו חזק, אולי לקראת תיקון",pMomentum:"מומנטום",dMomentum:"מעל ממוצע 20 יום, עולות היום עם מחזור גבוה",pValue:"ערך",dValue:"מכפיל רווח עד 15 עם צמיחת רווח מעל 10%",pDividend:"דיבידנד",dDividend:"תשואת דיבידנד מעל 4%",pVolume:"מחזור חריג",dVolume:"פי 3 ויותר מהמחזור הרגיל — משהו קורה",pTechbuy:"קנייה טכנית",dTechbuy:"הדירוג הטכני של TradingView: קנייה חזקה",pGrowth:"צמיחה",dGrowth:"צמיחת רווח למניה מעל 25%",pCustom:"⚙ מותאם אישית",dCustom:"בנה סינון משלך — עד 5 תנאים",
addCond:"+ תנאי",run:"🔎 חפש",remove:"הסר",sortBy:"מיון",asc:"עולה",desc:"יורד",found:"{n} מניות נמצאו",scrNote:"מקור: סורק TradingView (עיכוב ~15 דק'). סינון ראשוני בלבד — לא המלצה. פתח כל מניה כדי לבדוק לעומק.",scrErr:"הסורק לא זמין כרגע — נסה שוב",
fPrice:"מחיר",fChange:"שינוי יומי %",fRelVol:"מחזור יחסי",fMcap:"שווי שוק (מיליונים)",fPe:"מכפיל רווח",fEpsGrowth:"צמיחת EPS %",fDivYield:"תשואת דיבידנד %",fRsi:"RSI",fRating:"דירוג טכני (‎-1 עד 1)"},
en:{btT:"🧪 Did our signal work? — Backtest",btSignal:"Following the signal",btHold:"Buy & hold",btTrades:"Trades",btWin:"Winning trades",btDD:"Max drawdown",btExposure:"Time in market",btAcc:"Bullish signal accuracy (10 days)",btBetter:"✅ For this stock, the signal beat buy-and-hold",btWorse:"➖ For this stock, simply holding was better",btNote:"Simulation over {n} trading days: enter when the signal is bullish, exit when it weakens, executed the next day. No fees or taxes. Past performance does not guarantee the future.",
estT:"📈 Analyst estimates",curQ:"Current quarter",nextQ:"Next quarter",curY:"Current year",nextY:"Next year",epsL:"EPS",revL:"Revenue",growthL:"Growth",analystsN:"{n} analysts",estNote:"Average analyst estimates (Yahoo) · in brackets: low–high estimate.",
gSrcEst:"Default growth: analysts' estimate for next year",gSrcHist:"Default growth: the pace of recent years",
peersT:"🏭 Peers",colMcap:"Mkt cap",colPe:"P/E",colY:"1Y",colMargin:"Net margin",colRoe:"ROE",colRating:"Tech",colChg:"Today",median:"Median",peersNote:"Largest companies in the same {t} (TradingView, ~15 min delay) · tap to open.",grpIndustry:"industry",grpSector:"sector",peBelow:"{s}'s P/E is below the peer median ({m})",peAbove:"{s}'s P/E is above the peer median ({m})",
tabScreen:"🔎 Screener",scrUS:"🇺🇸 US",scrIL:"🇮🇱 Israel",pOversold:"Oversold",dOversold:"RSI under 30 — fell hard, maybe due a rebound",pMomentum:"Momentum",dMomentum:"Above the 20-day average, rising today on high volume",pValue:"Value",dValue:"P/E up to 15 with earnings growth above 10%",pDividend:"Dividend",dDividend:"Dividend yield above 4%",pVolume:"Unusual volume",dVolume:"3x or more the usual volume — something is happening",pTechbuy:"Technical buy",dTechbuy:"TradingView technical rating: strong buy",pGrowth:"Growth",dGrowth:"EPS growth above 25%",pCustom:"⚙ Custom",dCustom:"Build your own filter — up to 5 conditions",
addCond:"+ Condition",run:"🔎 Search",remove:"Remove",sortBy:"Sort",asc:"Ascending",desc:"Descending",found:"{n} stocks found",scrNote:"Source: TradingView screener (~15 min delay). A first filter only — not a recommendation. Open each stock to check it in depth.",scrErr:"Screener unavailable right now — try again",
fPrice:"Price",fChange:"Daily change %",fRelVol:"Relative volume",fMcap:"Market cap (millions)",fPe:"P/E",fEpsGrowth:"EPS growth %",fDivYield:"Dividend yield %",fRsi:"RSI",fRating:"Tech rating (-1 to 1)"},
ru:{btT:"🧪 Работал ли наш сигнал? — Бэктест",btSignal:"По сигналу",btHold:"Купить и держать",btTrades:"Сделки",btWin:"Прибыльные сделки",btDD:"Макс. просадка",btExposure:"Время в рынке",btAcc:"Точность бычьего сигнала (10 дней)",btBetter:"✅ Для этой акции сигнал обыграл «купить и держать»",btWorse:"➖ Для этой акции лучше было просто держать",btNote:"Симуляция на {n} торговых днях: вход при бычьем сигнале, выход при ослаблении, исполнение на следующий день. Без комиссий и налогов. Прошлые результаты не гарантируют будущих.",
estT:"📈 Прогнозы аналитиков",curQ:"Текущий квартал",nextQ:"Следующий квартал",curY:"Текущий год",nextY:"Следующий год",epsL:"EPS",revL:"Выручка",growthL:"Рост",analystsN:"{n} аналитиков",estNote:"Средние прогнозы аналитиков (Yahoo) · в скобках: мин.–макс.",
gSrcEst:"Рост по умолчанию: прогноз аналитиков на следующий год",gSrcHist:"Рост по умолчанию: темп последних лет",
peersT:"🏭 Конкуренты",colMcap:"Капит.",colPe:"P/E",colY:"Год",colMargin:"Маржа",colRoe:"ROE",colRating:"Техн.",colChg:"Сегодня",median:"Медиана",peersNote:"Крупнейшие компании той же {t} (TradingView, задержка ~15 мин) · нажмите, чтобы открыть.",grpIndustry:"отрасли",grpSector:"сектора",peBelow:"P/E {s} ниже медианы конкурентов ({m})",peAbove:"P/E {s} выше медианы конкурентов ({m})",
tabScreen:"🔎 Скринер",scrUS:"🇺🇸 США",scrIL:"🇮🇱 Израиль",pOversold:"Перепроданность",dOversold:"RSI ниже 30 — сильно упали, возможен отскок",pMomentum:"Импульс",dMomentum:"Выше 20-дневной средней, растут сегодня на высоком объёме",pValue:"Стоимость",dValue:"P/E до 15 и рост прибыли выше 10%",pDividend:"Дивиденды",dDividend:"Дивидендная доходность выше 4%",pVolume:"Необычный объём",dVolume:"Объём в 3+ раза выше обычного — что-то происходит",pTechbuy:"Техн. покупка",dTechbuy:"Технический рейтинг TradingView: активно покупать",pGrowth:"Рост",dGrowth:"Рост EPS выше 25%",pCustom:"⚙ Свой фильтр",dCustom:"Создайте свой фильтр — до 5 условий",
addCond:"+ Условие",run:"🔎 Искать",remove:"Удалить",sortBy:"Сортировка",asc:"По возрастанию",desc:"По убыванию",found:"Найдено акций: {n}",scrNote:"Источник: скринер TradingView (задержка ~15 мин). Только первичный отбор — не рекомендация.",scrErr:"Скринер недоступен — попробуйте снова",
fPrice:"Цена",fChange:"Изменение за день %",fRelVol:"Относит. объём",fMcap:"Капитализация (млн)",fPe:"P/E",fEpsGrowth:"Рост EPS %",fDivYield:"Дивид. доходность %",fRsi:"RSI",fRating:"Техн. рейтинг (-1…1)"},
es:{btT:"🧪 ¿Funcionó nuestra señal? — Prueba histórica",btSignal:"Siguiendo la señal",btHold:"Comprar y mantener",btTrades:"Operaciones",btWin:"Operaciones ganadoras",btDD:"Caída máxima",btExposure:"Tiempo en el mercado",btAcc:"Acierto de señal alcista (10 días)",btBetter:"✅ En esta acción, la señal superó a comprar y mantener",btWorse:"➖ En esta acción, era mejor simplemente mantener",btNote:"Simulación de {n} días: entrar con señal alcista, salir cuando se debilita, ejecución al día siguiente. Sin comisiones ni impuestos. El pasado no garantiza el futuro.",
estT:"📈 Estimaciones de analistas",curQ:"Trimestre actual",nextQ:"Próximo trimestre",curY:"Año actual",nextY:"Próximo año",epsL:"BPA",revL:"Ingresos",growthL:"Crecimiento",analystsN:"{n} analistas",estNote:"Promedio de estimaciones (Yahoo) · entre paréntesis: mínima–máxima.",
gSrcEst:"Crecimiento por defecto: estimación de analistas para el próximo año",gSrcHist:"Crecimiento por defecto: ritmo de los últimos años",
peersT:"🏭 Competidores",colMcap:"Cap.",colPe:"P/E",colY:"1A",colMargin:"Margen",colRoe:"ROE",colRating:"Técn.",colChg:"Hoy",median:"Mediana",peersNote:"Las mayores empresas del mismo {t} (TradingView, ~15 min de retraso) · toca para abrir.",grpIndustry:"sector industrial",grpSector:"sector",peBelow:"El P/E de {s} está por debajo de la mediana ({m})",peAbove:"El P/E de {s} está por encima de la mediana ({m})",
tabScreen:"🔎 Filtro",scrUS:"🇺🇸 EE. UU.",scrIL:"🇮🇱 Israel",pOversold:"Sobreventa",dOversold:"RSI bajo 30 — cayeron fuerte, quizá rebote",pMomentum:"Impulso",dMomentum:"Sobre la media de 20 días, suben hoy con alto volumen",pValue:"Valor",dValue:"P/E hasta 15 con crecimiento del beneficio sobre 10%",pDividend:"Dividendo",dDividend:"Rentabilidad por dividendo sobre 4%",pVolume:"Volumen inusual",dVolume:"3 veces o más el volumen normal — algo pasa",pTechbuy:"Compra técnica",dTechbuy:"Calificación técnica de TradingView: compra fuerte",pGrowth:"Crecimiento",dGrowth:"Crecimiento del BPA sobre 25%",pCustom:"⚙ Personalizado",dCustom:"Crea tu propio filtro — hasta 5 condiciones",
addCond:"+ Condición",run:"🔎 Buscar",remove:"Quitar",sortBy:"Ordenar",asc:"Ascendente",desc:"Descendente",found:"{n} acciones encontradas",scrNote:"Fuente: filtro de TradingView (~15 min de retraso). Solo un primer filtro — no una recomendación.",scrErr:"Filtro no disponible — intenta de nuevo",
fPrice:"Precio",fChange:"Cambio diario %",fRelVol:"Volumen relativo",fMcap:"Cap. de mercado (millones)",fPe:"P/E",fEpsGrowth:"Crecimiento BPA %",fDivYield:"Rent. dividendo %",fRsi:"RSI",fRating:"Calif. técnica (-1 a 1)"},
ar:{btT:"🧪 هل نجحت إشارتنا؟ — اختبار رجعي",btSignal:"اتباع الإشارة",btHold:"الشراء والاحتفاظ",btTrades:"الصفقات",btWin:"صفقات رابحة",btDD:"أقصى تراجع",btExposure:"الوقت في السوق",btAcc:"دقة الإشارة الإيجابية (10 أيام)",btBetter:"✅ في هذا السهم، تفوقت الإشارة على الشراء والاحتفاظ",btWorse:"➖ في هذا السهم، كان الاحتفاظ ببساطة أفضل",btNote:"محاكاة على {n} يوم تداول: الدخول عند إشارة إيجابية والخروج عند ضعفها، التنفيذ في اليوم التالي. بلا عمولات أو ضرائب. الأداء السابق لا يضمن المستقبل.",
estT:"📈 توقعات المحللين",curQ:"الربع الحالي",nextQ:"الربع القادم",curY:"السنة الحالية",nextY:"السنة القادمة",epsL:"ربح السهم",revL:"الإيرادات",growthL:"النمو",analystsN:"{n} محللين",estNote:"متوسط توقعات المحللين (Yahoo) · بين القوسين: الأدنى–الأعلى.",
gSrcEst:"النمو الافتراضي: توقع المحللين للسنة القادمة",gSrcHist:"النمو الافتراضي: وتيرة السنوات الأخيرة",
peersT:"🏭 المنافسون",colMcap:"القيمة",colPe:"المكرر",colY:"سنة",colMargin:"الهامش",colRoe:"ROE",colRating:"فني",colChg:"اليوم",median:"الوسيط",peersNote:"أكبر الشركات في نفس {t} (TradingView، تأخير ~15 د) · اضغط للفتح.",grpIndustry:"الصناعة",grpSector:"القطاع",peBelow:"مكرر {s} أقل من وسيط المنافسين ({m})",peAbove:"مكرر {s} أعلى من وسيط المنافسين ({m})",
tabScreen:"🔎 الفرز",scrUS:"🇺🇸 أمريكا",scrIL:"🇮🇱 إسرائيل",pOversold:"تشبع بيعي",dOversold:"RSI تحت 30 — هبطت بقوة، ربما تقترب من ارتداد",pMomentum:"زخم",dMomentum:"فوق متوسط 20 يوماً، ترتفع اليوم بحجم مرتفع",pValue:"قيمة",dValue:"مكرر حتى 15 مع نمو أرباح فوق 10%",pDividend:"توزيعات",dDividend:"عائد توزيعات فوق 4%",pVolume:"حجم غير عادي",dVolume:"3 أضعاف الحجم المعتاد أو أكثر — شيء ما يحدث",pTechbuy:"شراء فني",dTechbuy:"تقييم TradingView الفني: شراء قوي",pGrowth:"نمو",dGrowth:"نمو ربح السهم فوق 25%",pCustom:"⚙ مخصص",dCustom:"ابنِ فلترك الخاص — حتى 5 شروط",
addCond:"+ شرط",run:"🔎 بحث",remove:"إزالة",sortBy:"ترتيب",asc:"تصاعدي",desc:"تنازلي",found:"تم العثور على {n} أسهم",scrNote:"المصدر: فارز TradingView (تأخير ~15 د). فرز أولي فقط — ليس توصية.",scrErr:"الفارز غير متاح — حاول مجدداً",
fPrice:"السعر",fChange:"التغير اليومي %",fRelVol:"الحجم النسبي",fMcap:"القيمة السوقية (ملايين)",fPe:"المكرر",fEpsGrowth:"نمو EPS %",fDivYield:"عائد التوزيعات %",fRsi:"RSI",fRating:"التقييم الفني (-1 إلى 1)"}
};
function P6(k,o){var l=P6_T[curLang]||P6_T.en,s=l[k]!=null?l[k]:(P6_T.en[k]!=null?P6_T.en[k]:k);for(var x in (o||{}))s=s.split('{'+x+'}').join(o[x]);return s;}

/* ══ 1. BACKTEST — אותה נוסחת איתות, יום אחרי יום, בלי הצצה לעתיד ══ */
function signalSeries(ohlc){
  var h=ohlc.map(function(x){return x[2];}),l=ohlc.map(function(x){return x[3];}),c=ohlc.map(function(x){return x[4];}),v=ohlc.map(function(x){return x[5]||0;}),n=c.length,i;
  var e12=_ema(c,12),e26=_ema(c,26),pdm=[0],mdm=[0],tr=[h[0]-l[0]];
  for(i=1;i<n;i++){var up=h[i]-h[i-1],dn=l[i-1]-l[i];pdm.push(up>dn&&up>0?up:0);mdm.push(dn>up&&dn>0?dn:0);tr.push(Math.max(h[i]-l[i],Math.abs(h[i]-c[i-1]),Math.abs(l[i]-c[i-1])));}
  var atr=_wild(tr,14),sp=_wild(pdm,14),sm=_wild(mdm,14),dx=[];
  for(i=0;i<n;i++){var pdi=atr[i]?100*sp[i]/atr[i]:0,mdi=atr[i]?100*sm[i]/atr[i]:0;dx.push((pdi+mdi)?100*Math.abs(pdi-mdi)/(pdi+mdi):0);}
  var adx=_wild(dx,14),g=[0],ls=[0];for(i=1;i<n;i++){var d=c[i]-c[i-1];g.push(Math.max(d,0));ls.push(Math.max(-d,0));}
  var ag=_wild(g,14),al=_wild(ls,14),obv=[0];for(i=1;i<n;i++)obv.push(obv[i-1]+(c[i]>c[i-1]?v[i]:c[i]<c[i-1]?-v[i]:0));
  var obvS=_sma(obv,20),s200=_sma(c,200),out=[];
  for(i=0;i<n;i++){
    if(i<59){out.push(null);continue;}
    var rsi=al[i]===0?100:100-100/(1+ag[i]/al[i]);
    var trendS=(e12[i]>e26[i]?1:-1)*(adx[i]>25?1:0.5),momS=rsi>70?-1:rsi<30?1:(rsi>55?0.25:rsi<45?-0.25:0);
    var flowS=obvS[i]==null?0:(obv[i]>obvS[i]?0.75:-0.75),maS=s200[i]!=null?(c[i]>s200[i]?0.5:-0.5):0;
    out.push(trendS+momS+flowS+maS);
  }
  return out;
}
function runBacktest(ohlc){
  if(!ohlc||ohlc.length<120)return null;
  var sc=signalSeries(ohlc),c=ohlc.map(function(x){return x[4];}),n=c.length,start=60;
  var eq=1,bh=1,peak=1,dd=0,inPos=false,entry=0,trades=[],days=0,eqCurve=[1],bhCurve=[1],hits=0,sigs=0;
  for(var i=start;i<n-1;i++){
    var r=c[i+1]/c[i]-1,bull=sc[i]>=0.75;
    if(bull&&!inPos){inPos=true;entry=c[i+1];}                     // נכנסים ביום שאחרי האיתות
    else if(!bull&&inPos){inPos=false;trades.push(c[i+1]/entry-1);}
    var held=sc[i-1]>=0.75;                                          // הפוזיציה שהייתה פתוחה במהלך היום i→i+1
    if(held){eq*=1+r;days++;}
    bh*=1+r;peak=Math.max(peak,eq);dd=Math.min(dd,eq/peak-1);eqCurve.push(eq);bhCurve.push(bh);
    if(bull&&i+10<n){sigs++;if(c[i+10]>c[i])hits++;}
  }
  if(inPos)trades.push(c[n-1]/entry-1);
  var steps=n-1-start;
  return {strat:(eq-1)*100,hold:(bh-1)*100,trades:trades.length,win:trades.length?trades.filter(function(t){return t>0;}).length/trades.length*100:null,
    dd:dd*100,exposure:steps?days/steps*100:0,acc:sigs?hits/sigs*100:null,days:steps,eqCurve:eqCurve,bhCurve:bhCurve};
}
function btSpark(a,b){
  var all=a.concat(b),mn=Math.min.apply(null,all),mx=Math.max.apply(null,all),W=300,H=70,rng=(mx-mn)||1;
  function pts(arr){return arr.map(function(v,i){return (i/(arr.length-1)*W).toFixed(1)+','+(H-(v-mn)/rng*H).toFixed(1);}).join(' ');}
  return '<svg class="bt-spark" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none"><polyline points="'+pts(b)+'" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="4 3"/><polyline points="'+pts(a)+'" fill="none" stroke="var(--gold)" stroke-width="2"/></svg>';
}
function renderBacktest(symbol){
  var el=document.getElementById('lvBacktest');if(!el)return;window.__btResult=null;
  var src=window.__techOhlc;if(!src||src.symbol!==symbol){el.innerHTML='';return;}
  var r=runBacktest(src.ohlc);if(!r){el.innerHTML='';return;}
  window.__btResult={symbol:symbol,r:r};
  function big(lbl,v,col){return '<div class="bt-big"><span>'+lbl+'</span><strong style="color:'+col+'">'+fmtPct(v)+'</strong></div>';}
  function cell(lbl,v){return '<div class="ta-cell"><div class="live-metric-lbl">'+lbl+'</div><div class="live-metric-val">'+v+'</div></div>';}
  var better=r.strat>r.hold;
  el.innerHTML='<div class="rec-trend-title">'+P6('btT')+'</div>'
    +'<div class="bt-bigs">'+big('<i style="background:var(--gold)"></i>'+P6('btSignal'),r.strat,r.strat>=0?'var(--green)':'var(--red)')+big('<i class="dash"></i>'+P6('btHold'),r.hold,r.hold>=0?'var(--green)':'var(--red)')+'</div>'
    +btSpark(r.eqCurve,r.bhCurve)
    +'<div class="ta-small" style="font-weight:600;color:var(--text)">'+(better?P6('btBetter'):P6('btWorse'))+'</div>'
    +'<div class="ta-grid" style="margin-top:8px">'+cell(P6('btTrades'),r.trades)+cell(P6('btWin'),r.win==null?'—':Math.round(r.win)+'%')+cell(P6('btDD'),fmtPct(r.dd))
    +cell(P6('btExposure'),Math.round(r.exposure)+'%')+cell(P6('btAcc'),r.acc==null?'—':Math.round(r.acc)+'%')+'</div>'
    +'<div class="ta-note">'+P6('btNote',{n:r.days})+'</div>';
  renderLiveTabs();applyLiveTabs();
}

/* ══ 2. ANALYST ESTIMATES — טבלת תחזיות + ברירת מחדל לצמיחה במחשבון השווי ══ */
function renderEstimates(q){
  var el=document.getElementById('lvEstimates');if(!el)return;
  var e=q&&q.estimates;if(!e){el.innerHTML='';return;}
  var cols=[['0q','curQ'],['+1q','nextQ'],['0y','curY'],['+1y','nextY']].filter(function(c){return e[c[0]];});
  if(!cols.length){el.innerHTML='';return;}
  function g(v){return v==null?'':'<div class="est-g" style="color:'+(v>=0?'var(--green)':'var(--red)')+'">'+fmtPct(v*100)+'</div>';}
  var h='<div class="rec-trend-title">'+P6('estT')+'</div><div class="est-wrap"><table class="est-tbl"><thead><tr><th></th>'+cols.map(function(c){return '<th>'+P6(c[1])+(e[c[0]].end?'<em>'+escHtml(e[c[0]].end)+'</em>':'')+'</th>';}).join('')+'</tr></thead><tbody>';
  h+='<tr><td>'+P6('epsL')+'</td>'+cols.map(function(c){var x=e[c[0]];return '<td><b>'+(x.eps!=null?(Math.round(x.eps*100)/100):'—')+'</b>'+(x.epsLow!=null&&x.epsHigh!=null?'<em>('+Math.round(x.epsLow*100)/100+'–'+Math.round(x.epsHigh*100)/100+')</em>':'')+g(x.growth!=null?x.growth:x.epsGrowth)+'</td>';}).join('')+'</tr>';
  h+='<tr><td>'+P6('revL')+'</td>'+cols.map(function(c){var x=e[c[0]];return '<td><b>'+(x.rev?fmtNum(x.rev):'—')+'</b>'+g(x.revGrowth)+'</td>';}).join('')+'</tr>';
  h+='<tr><td></td>'+cols.map(function(c){var x=e[c[0]];return '<td><em>'+(x.epsN?P6('analystsN',{n:x.epsN}):'')+'</em></td>';}).join('')+'</tr>';
  el.innerHTML=h+'</tbody></table></div><div class="ta-note">'+P6('estNote')+'</div>';
}
var __origRenderLiveQuote=renderLiveQuote;
renderLiveQuote=function(q){__origRenderLiveQuote(q);try{renderEstimates(q);renderLiveTabs();applyLiveTabs();}catch(e){}};
var __origFvDefaults=fvDefaults;
fvDefaults=function(q){
  var d=__origFvDefaults(q),e=q&&q.estimates,gs=[];
  if(e){['0y','+1y'].forEach(function(k){var x=e[k];if(x&&x.growth!=null&&isFinite(x.growth))gs.push(x.growth);});}
  if(gs.length){d.g1=Math.max(-0.05,Math.min(0.30,gs.reduce(function(a,b){return a+b;},0)/gs.length));d.src='est';}else d.src='hist';
  return d;
};
var __origRenderValuation=renderValuation;
renderValuation=function(symbol,q){
  __origRenderValuation(symbol,q);
  var st=window.__fvState,out=document.getElementById('fvOut');
  if(st&&st.def&&out&&!document.getElementById('fvSrc'))out.insertAdjacentHTML('afterend','<div class="ta-small" id="fvSrc">ⓘ '+P6(st.def.src==='est'?'gSrcEst':'gSrcHist')+'</div>');
};

/* ══ 3. PEERS — השוואת מתחרים מאותה תעשייה ══ */
async function loadPeers(symbol){
  var el=document.getElementById('lvPeers');if(!el)return;window.__peersResult=null;
  try{
    var d=await workerFetch('action=peers&symbol='+encodeURIComponent(symbol));
    if(currentLiveSymbol!==symbol||!d.peers||d.peers.length<2){el.innerHTML='';return;}
    window.__peersResult={symbol:symbol,d:d};
    var grp=d.group;try{grp=(await trTexts([d.group]))[0]||d.group;}catch(e){}
    if(currentLiveSymbol!==symbol)return;
    var has=function(k){return d.peers.some(function(p){return p[k]!=null;});};
    var cols=[['colChg','changePct',function(v){return fmtPct(v);},1],['colMcap','marketCap',function(v){return fmtNum(v);},0],['colPe','pe',function(v){return v>0?v.toFixed(1):'—';},0]];
    if(has('perfY'))cols.push(['colY','perfY',function(v){return fmtPct(v);},1]);
    if(has('netMargin'))cols.push(['colMargin','netMargin',function(v){return v.toFixed(1)+'%';},1]);
    if(has('roe'))cols.push(['colRoe','roe',function(v){return v.toFixed(1)+'%';},1]);
    cols.push(['colRating','rating',function(v){return PT(tvLabel(v));},2]);
    var pes=d.peers.map(function(p){return p.pe;}).filter(function(v){return v>0;}).sort(function(a,b){return a-b;});
    var med=pes.length?pes[Math.floor(pes.length/2)]:null,me=d.peers.filter(function(p){return p.self;})[0];
    var h='<div class="rec-trend-title">'+P6('peersT')+' — '+escHtml(grp)+'</div><div class="est-wrap"><table class="est-tbl peers-tbl"><thead><tr><th></th>'+cols.map(function(c){return '<th>'+P6(c[0])+'</th>';}).join('')+'</tr></thead><tbody>';
    d.peers.forEach(function(p){
      h+='<tr class="'+(p.self?'me':'')+'" onclick="quickLive(\''+escHtml(p.symbol)+'\')"><td><b>'+escHtml(p.symbol.replace(/\.TA$/,''))+'</b><em>'+escHtml(p.name||'')+'</em></td>'
        +cols.map(function(c){var v=p[c[1]];if(v==null)return '<td>—</td>';var col=c[3]===1?(v>=0?'var(--green)':'var(--red)'):c[3]===2?(v>=0.1?'var(--green)':v>-0.1?'var(--gold)':'var(--red)'):'';return '<td'+(col?' style="color:'+col+'"':'')+'>'+c[2](v)+'</td>';}).join('')+'</tr>';
    });
    h+='</tbody></table></div>';
    if(me&&me.pe>0&&med)h+='<div class="ta-small" style="font-weight:600;color:var(--text)">'+P6(me.pe<med?'peBelow':'peAbove',{s:escHtml(me.symbol.replace(/\.TA$/,'')),m:med.toFixed(1)})+'</div>';
    el.innerHTML=h+'<div class="ta-note">'+P6('peersNote',{t:P6(d.groupType==='industry'?'grpIndustry':'grpSector')})+'</div>';
    renderLiveTabs();applyLiveTabs();
  }catch(e){el.innerHTML='';}
}

/* ══ 4. SCREENER — סורק מניות אישי (לשונית במסך השוק) ══ */
var SCR_PRESETS=[
  {id:'oversold',n:'pOversold',d:'dOversold',f:[{f:'rsi',op:'lt',v:30},{f:'mcap',op:'gt',v:1e9}],sort:'rsi',order:'asc',show:'rsi'},
  {id:'momentum',n:'pMomentum',d:'dMomentum',f:[{f:'price',op:'gt',v:'ema20'},{f:'change',op:'gt',v:2},{f:'relVol',op:'gt',v:1.5}],sort:'change',order:'desc',show:'relVol'},
  {id:'value',n:'pValue',d:'dValue',f:[{f:'pe',op:'between',v:1,v2:15},{f:'epsGrowth',op:'gt',v:10},{f:'mcap',op:'gt',v:5e8}],sort:'pe',order:'asc',show:'pe'},
  {id:'dividend',n:'pDividend',d:'dDividend',f:[{f:'divYield',op:'gt',v:4},{f:'mcap',op:'gt',v:1e9}],sort:'divYield',order:'desc',show:'divYield'},
  {id:'volume',n:'pVolume',d:'dVolume',f:[{f:'relVol',op:'gt',v:3},{f:'mcap',op:'gt',v:3e8}],sort:'relVol',order:'desc',show:'relVol'},
  {id:'techbuy',n:'pTechbuy',d:'dTechbuy',f:[{f:'rating',op:'gt',v:0.5},{f:'mcap',op:'gt',v:2e9}],sort:'mcap',order:'desc',show:'rating'},
  {id:'growth',n:'pGrowth',d:'dGrowth',f:[{f:'epsGrowth',op:'gt',v:25},{f:'mcap',op:'gt',v:1e9}],sort:'epsGrowth',order:'desc',show:'pe'},
  {id:'custom',n:'pCustom',d:'dCustom'}
];
var SCR_FIELDS_UI=[['price','fPrice'],['change','fChange'],['relVol','fRelVol'],['mcap','fMcap'],['pe','fPe'],['epsGrowth','fEpsGrowth'],['divYield','fDivYield'],['rsi','fRsi'],['rating','fRating']];
var SCR={market:'america',preset:'oversold',cache:{}};
try{SCR.custom=JSON.parse(localStorage.getItem('stockai_screener'))||null;}catch(e){}
if(!SCR.custom)SCR.custom={f:[{f:'rsi',op:'lt',v:35},{f:'pe',op:'lt',v:20}],sort:'mcap',order:'desc'};
function scrSet(k,v){SCR[k]=v;renderScreener();}
function scrSaveCustom(){try{localStorage.setItem('stockai_screener',JSON.stringify(SCR.custom));}catch(e){}}
function scrCustomEdit(i,k,val){var c=SCR.custom.f[i];if(!c)return;c[k]=(k==='v')?val:val;scrSaveCustom();}
function scrCustomAdd(){if(SCR.custom.f.length<5){SCR.custom.f.push({f:'change',op:'gt',v:0});scrSaveCustom();renderScreener();}}
function scrCustomDel(i){SCR.custom.f.splice(i,1);scrSaveCustom();renderScreener();}
function renderScreener(){
  var box=document.getElementById('mkList');if(!box)return;
  var p=SCR_PRESETS.filter(function(x){return x.id===SCR.preset;})[0]||SCR_PRESETS[0];
  var h='<div class="scr-top"><div class="mk-sub" style="margin:0">'+[['america','scrUS'],['israel','scrIL']].map(function(m){return '<button class="'+(SCR.market===m[0]?'on':'')+'" onclick="scrSet(\'market\',\''+m[0]+'\')">'+P6(m[1])+'</button>';}).join('')+'</div></div>'
    +'<div class="scr-presets">'+SCR_PRESETS.map(function(x){return '<button class="'+(SCR.preset===x.id?'on':'')+'" onclick="scrSet(\'preset\',\''+x.id+'\')">'+P6(x.n)+'</button>';}).join('')+'</div>'
    +'<div class="ta-small" style="margin:0 0 8px">'+P6(p.d)+'</div>';
  if(p.id==='custom'){
    var fopts=function(sel){return SCR_FIELDS_UI.map(function(f){return '<option value="'+f[0]+'"'+(f[0]===sel?' selected':'')+'>'+P6(f[1])+'</option>';}).join('');};
    h+='<div class="scr-custom">'+SCR.custom.f.map(function(c,i){
      var shown=c.f==='mcap'&&typeof c.v==='number'?c.v/1e6:c.v;
      return '<div class="scr-cond"><select class="key-input" onchange="scrCustomEdit('+i+',\'f\',this.value)">'+fopts(c.f)+'</select>'
        +'<select class="key-input scr-op" onchange="scrCustomEdit('+i+',\'op\',this.value)"><option value="gt"'+(c.op==='gt'?' selected':'')+'>&gt;</option><option value="lt"'+(c.op==='lt'?' selected':'')+'>&lt;</option></select>'
        +'<input class="key-input scr-v" type="number" step="any" value="'+escHtml(String(shown))+'" onchange="scrCustomEdit('+i+',\'v\',this.value===\'\'?0:(SCR.custom.f['+i+'].f===\'mcap\'?Number(this.value)*1e6:Number(this.value)))">'
        +'<button class="sb-del" aria-label="'+P6('remove')+'" onclick="scrCustomDel('+i+')">✕</button></div>';}).join('')
      +'<div class="scr-cond"><button class="model-refresh" onclick="scrCustomAdd()"'+(SCR.custom.f.length>=5?' disabled':'')+'>'+P6('addCond')+'</button>'
      +'<select class="key-input" onchange="SCR.custom.sort=this.value;scrSaveCustom()"><option value="">'+P6('sortBy')+'…</option>'+fopts(SCR.custom.sort)+'</select>'
      +'<select class="key-input scr-op" onchange="SCR.custom.order=this.value;scrSaveCustom()"><option value="desc"'+(SCR.custom.order!=='asc'?' selected':'')+'>↓</option><option value="asc"'+(SCR.custom.order==='asc'?' selected':'')+'>↑</option></select></div>'
      +'<button class="btn-ai-analyze" style="width:100%;margin-top:6px" onclick="scrRun()">'+P6('run')+'</button></div>';
    h+='<div id="scrResults"></div>';
    box.innerHTML=h;return;
  }
  box.innerHTML=h+'<div id="scrResults"><div class="ta-small">'+P5('loading')+'</div></div>';
  scrRun();
}
async function scrRun(){
  var res=document.getElementById('scrResults');if(!res)return;
  var p=SCR_PRESETS.filter(function(x){return x.id===SCR.preset;})[0];
  var q=p.id==='custom'?{filters:SCR.custom.f,sort:SCR.custom.sort||'mcap',order:SCR.custom.order||'desc',show:'pe'}:{filters:p.f,sort:p.sort,order:p.order,show:p.show};
  var body={action:'screen',market:SCR.market,filters:q.filters,sort:q.sort,order:q.order,limit:30},key=JSON.stringify(body);
  res.innerHTML='<div class="ta-small">'+P5('loading')+'</div>';
  try{
    var c=SCR.cache[key],d;
    if(c&&Date.now()-c.ts<3*60000)d=c.d;
    else{var r=await fetch(DATA_WORKER_URL+'/',{method:'POST',headers:{'Content-Type':'application/json'},body:key});d=await r.json();if(!d.ok)throw new Error(d.error||'screen');SCR.cache[key]={ts:Date.now(),d:d};}
    if(!document.getElementById('scrResults'))return;
    if(!d.items.length){res.innerHTML='<div class="ta-small">'+P5('empty')+'</div>';return;}
    var extra=function(it){var s=q.show;
      if(s==='rsi'&&it.rsi!=null)return 'RSI '+Math.round(it.rsi);if(s==='pe'&&it.pe)return 'P/E '+it.pe.toFixed(1);
      if(s==='divYield'&&it.divYield!=null)return it.divYield.toFixed(1)+'%';if(s==='relVol'&&it.relVol!=null)return '×'+it.relVol.toFixed(1);
      if(s==='rating'&&it.rating!=null)return PT(tvLabel(it.rating));return it.marketCap?fmtNum(it.marketCap):'';};
    res.innerHTML='<div class="ta-small" style="margin:0 0 6px;font-weight:600;color:var(--text)">'+P6('found',{n:d.total>d.items.length?d.items.length+'/'+d.total:d.items.length})+'</div><div class="mk-list">'
      +d.items.map(function(it){var col=it.changePct>=0?'var(--green)':'var(--red)';
        return '<div class="mk-row" onclick="closeModal(\'marketOverlay\');quickLive(\''+escHtml(it.symbol)+'\')"><div class="mk-sym">'+escHtml(it.symbol.replace(/\.TA$/,''))+'</div><div class="mk-name">'+escHtml(it.name||'')+'</div>'
          +'<div class="mk-px">'+fmtPrice(it.price,it.currency)+'</div><div class="mk-chg" style="color:'+col+'">'+fmtPct(it.changePct)+'</div><div class="mk-vol">'+extra(it)+'</div></div>';}).join('')
      +'</div><div class="ta-note">'+P6('scrNote')+'</div>';
  }catch(e){res.innerHTML='<div class="fv-warn">'+P6('scrErr')+'</div>';}
}

/* ══ 5. AI CONTEXT — תחזיות, בדיקה לאחור ומתחרים כעובדות לניתוח ══ */
var __origExtraCtx6=buildExtraContext;
buildExtraContext=function(symbol){
  var s=__origExtraCtx6(symbol),q=window.__lastLiveQuote,bt=window.__btResult,pr=window.__peersResult;
  if(q&&q.symbol===symbol&&q.estimates){var e=q.estimates,parts=[];['0y','+1y'].forEach(function(k){var x=e[k];if(x)parts.push(k+': EPS '+x.eps+(x.growth!=null?' ('+(x.growth*100).toFixed(1)+'% growth)':'')+(x.epsN?', '+x.epsN+' analysts':''));});if(parts.length)s+='ANALYST CONSENSUS ESTIMATES: '+parts.join('; ')+'.\n';}
  if(bt&&bt.symbol===symbol){var r=bt.r;s+='BACKTEST OF OUR TECHNICAL SIGNAL ('+r.days+' days): signal '+r.strat.toFixed(1)+'% vs buy&hold '+r.hold.toFixed(1)+'%, '+r.trades+' trades, max drawdown '+r.dd.toFixed(1)+'%'+(r.acc!=null?', bullish-signal 10-day accuracy '+Math.round(r.acc)+'%':'')+'.\n';}
  if(pr&&pr.symbol===symbol){var pes=pr.d.peers.map(function(p){return p.pe;}).filter(function(v){return v>0;}).sort(function(a,b){return a-b;});
    s+='PEERS ('+pr.d.group+'): '+pr.d.peers.slice(0,8).map(function(p){return p.symbol+(p.pe?' P/E '+p.pe.toFixed(1):'');}).join(', ')+(pes.length?' — median P/E '+pes[Math.floor(pes.length/2)].toFixed(1):'')+'.\n';}
  return s;
};

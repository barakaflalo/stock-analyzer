/* StockAI · app-market.js — Live market data: ticker, stock card, chart, forex/crypto, card tabs, news, translation
   AppNest © 2026 · load order matters: see <script> tags in stock-analyzer.html */
/* ══════════════════════════════════════════════════
   LIVE MARKET DATA — טיקר, כרטיס נתונים, גרף, מט"ח
══════════════════════════════════════════════════ */
var LIVE_T={
  he:{updated:'עודכן',open:'פתיחה',high:'גבוה יומי',low:'נמוך יומי',volume:'מחזור',avgVol:'מחזור ממוצע',mcap:'שווי שוק',pe:'מכפיל רווח',eps:'רווח למניה',beta:'בטא',div:'תשואת דיבידנד',w52:'טווח 52 שבועות',target:'יעד אנליסטים',analysts:'אנליסטים',rec:'קונצנזוס',earnings:'דוח קרוב',sector:'סקטור',employees:'עובדים',aiCta:'רוצה ניתוח AI חכם של המניה?',aiCtaNoKey:'חבר AI בחינם (2 דק\') וקבל ניתוח קנה/מכור מלא',btnAnalyze:'▶ ניתוח AI',btnConnect:'⚙ חבר AI',forex:'💱 מט"ח',crypto:'₿ קריפטו',preMarket:'טרום מסחר',postMarket:'אחרי מסחר',marketOpen:'● שוק פתוח',marketClosed:'○ שוק סגור',dataErr:'שגיאה בטעינת נתונים — נסה שוב',disclaimer:'⚠ הנתונים נשאבים ממקורות חיצוניים ברשת (Yahoo Finance ואחרים) ומוצגים לנוחות בלבד. ייתכנו עיכובים, טעויות או אי-דיוקים. יש לאמת כל נתון מול מקור מוסמך לפני קבלת החלטה. האפליקציה והמפתחים אינם אחראים לכל נזק או הפסד.',newsTitle:'📰 חדשות אחרונות',tabOverview:'סקירה',tabAnalysts:'אנליסטים',tabFinance:'פיננסים',tabCompany:'חברה',tabNews:'חדשות',insiderT:'👤 עסקאות בעלי עניין',bottomLineT:'💬 השורה התחתונה',profilesT:'🎯 לפי פרופיל משקיע',profAgg:'אגרסיבי',profMod:'מאוזן',profCon:'שמרן',actBuy:'קנייה',actHold:'החזקה',actSell:'מכירה',actAvoid:'להימנע',margin:'שולי רווח',roe:'תשואה על הון',revGrowth:'צמיחת הכנסות',cash:'מזומנים',debt:'חוב',fcf:'תזרים חופשי',insiders:'פנימיים %',inst:'מוסדיים %',shortF:'שורט %',ma50:'ממוצע 50 יום',ma200:'ממוצע 200 יום',recTrendT:'פילוח המלצות אנליסטים',earnHistT:'היסטוריית דוחות EPS',finHistT:'הכנסות ורווח נקי שנתי',revenueL:'הכנסות',netIncomeL:'רווח נקי',lastActionT:'פעולת אנליסט אחרונה',sBuy:'קנייה חזקה',rBuy:'קנייה',rHold:'החזקה',rSell:'מכירה',sSell:'מכירה חזקה',rangeD:'יום',rangeW:'שבוע',rangeM:'חודש',range6M:'חצי שנה',rangeY:'שנה',range5Y:'5 שנים'},
  en:{updated:'Updated',open:'Open',high:'Day High',low:'Day Low',volume:'Volume',avgVol:'Avg Volume',mcap:'Market Cap',pe:'P/E Ratio',eps:'EPS',beta:'Beta',div:'Dividend Yield',w52:'52W Range',target:'Analyst Target',analysts:'Analysts',rec:'Consensus',earnings:'Next Earnings',sector:'Sector',employees:'Employees',aiCta:'Want a smart AI analysis of this stock?',aiCtaNoKey:'Connect AI for free (2 min) and get full BUY/SELL analysis',btnAnalyze:'▶ AI Analysis',btnConnect:'⚙ Connect AI',forex:'💱 Forex',crypto:'₿ Crypto',preMarket:'Pre-Market',postMarket:'After Hours',marketOpen:'● Market Open',marketClosed:'○ Market Closed',dataErr:'Error loading data — try again',disclaimer:'⚠ Data is sourced from external web sources (Yahoo Finance and others) and shown for convenience only. Delays, errors or inaccuracies may occur. Verify all data with an authorized source before making decisions. The app and developers bear no responsibility for any damage or loss.',newsTitle:'📰 Latest News',tabOverview:'Overview',tabAnalysts:'Analysts',tabFinance:'Financials',tabCompany:'Company',tabNews:'News',insiderT:'👤 Insider Transactions',bottomLineT:'💬 Bottom Line',profilesT:'🎯 By Investor Profile',profAgg:'Aggressive',profMod:'Moderate',profCon:'Conservative',actBuy:'BUY',actHold:'HOLD',actSell:'SELL',actAvoid:'AVOID',margin:'Profit Margin',roe:'ROE',revGrowth:'Revenue Growth',cash:'Total Cash',debt:'Total Debt',fcf:'Free Cash Flow',insiders:'Insiders %',inst:'Institutions %',shortF:'Short %',ma50:'50-Day MA',ma200:'200-Day MA',recTrendT:'Analyst Recommendations',earnHistT:'EPS Earnings History',finHistT:'Annual Revenue & Net Income',revenueL:'Revenue',netIncomeL:'Net Income',lastActionT:'Latest Analyst Action',sBuy:'Strong Buy',rBuy:'Buy',rHold:'Hold',rSell:'Sell',sSell:'Strong Sell',rangeD:'1D',rangeW:'1W',rangeM:'1M',range6M:'6M',rangeY:'1Y',range5Y:'5Y'},
  ru:{updated:'Обновлено',open:'Открытие',high:'Макс. дня',low:'Мин. дня',volume:'Объём',avgVol:'Ср. объём',mcap:'Капитализация',pe:'P/E',eps:'EPS',beta:'Бета',div:'Дивиденд',w52:'Диапазон 52 нед.',target:'Цель аналитиков',analysts:'Аналитики',rec:'Консенсус',earnings:'Ближ. отчёт',sector:'Сектор',employees:'Сотрудники',aiCta:'Хотите умный ИИ-анализ этой акции?',aiCtaNoKey:'Подключите ИИ бесплатно (2 мин) и получите полный анализ',btnAnalyze:'▶ ИИ Анализ',btnConnect:'⚙ Подключить ИИ',forex:'💱 Валюты',crypto:'₿ Крипто',preMarket:'Премаркет',postMarket:'Постмаркет',marketOpen:'● Рынок открыт',marketClosed:'○ Рынок закрыт',dataErr:'Ошибка загрузки — попробуйте снова',disclaimer:'⚠ Данные получены из внешних источников (Yahoo Finance и др.) и показаны для удобства. Возможны задержки и неточности. Проверяйте данные в официальных источниках. Приложение и разработчики не несут ответственности.',newsTitle:'📰 Последние новости',tabOverview:'Обзор',tabAnalysts:'Аналитики',tabFinance:'Финансы',tabCompany:'Компания',tabNews:'Новости',insiderT:'👤 Сделки инсайдеров',bottomLineT:'💬 Итог',profilesT:'🎯 По профилю инвестора',profAgg:'Агрессивный',profMod:'Умеренный',profCon:'Консервативный',actBuy:'Покупать',actHold:'Держать',actSell:'Продавать',actAvoid:'Избегать',margin:'Маржа прибыли',roe:'ROE',revGrowth:'Рост выручки',cash:'Денежные средства',debt:'Долг',fcf:'Свободный поток',insiders:'Инсайдеры %',inst:'Институционалы %',shortF:'Шорт %',ma50:'MA 50 дней',ma200:'MA 200 дней',recTrendT:'Рекомендации аналитиков',earnHistT:'История отчётов EPS',finHistT:'Годовая выручка и прибыль',revenueL:'Выручка',netIncomeL:'Чист. прибыль',lastActionT:'Последнее действие аналитика',sBuy:'Активно покупать',rBuy:'Покупать',rHold:'Держать',rSell:'Продавать',sSell:'Активно продавать',rangeD:'1Д',rangeW:'1Н',rangeM:'1М',range6M:'6М',rangeY:'1Г',range5Y:'5Л'},
  es:{updated:'Actualizado',open:'Apertura',high:'Máx. día',low:'Mín. día',volume:'Volumen',avgVol:'Vol. promedio',mcap:'Cap. mercado',pe:'P/E',eps:'EPS',beta:'Beta',div:'Dividendo',w52:'Rango 52 sem.',target:'Objetivo analistas',analysts:'Analistas',rec:'Consenso',earnings:'Próx. reporte',sector:'Sector',employees:'Empleados',aiCta:'¿Quieres un análisis IA inteligente?',aiCtaNoKey:'Conecta IA gratis (2 min) y obtén análisis completo',btnAnalyze:'▶ Análisis IA',btnConnect:'⚙ Conectar IA',forex:'💱 Divisas',crypto:'₿ Cripto',preMarket:'Pre-mercado',postMarket:'Post-mercado',marketOpen:'● Mercado abierto',marketClosed:'○ Mercado cerrado',dataErr:'Error al cargar — intenta de nuevo',disclaimer:'⚠ Los datos provienen de fuentes externas (Yahoo Finance y otros) y se muestran solo por conveniencia. Pueden ocurrir retrasos o errores. Verifica con fuentes autorizadas antes de decidir. La app y los desarrolladores no asumen responsabilidad.',newsTitle:'📰 Últimas noticias',tabOverview:'Resumen',tabAnalysts:'Analistas',tabFinance:'Finanzas',tabCompany:'Empresa',tabNews:'Noticias',insiderT:'👤 Transacciones de insiders',bottomLineT:'💬 Conclusión',profilesT:'🎯 Por perfil de inversor',profAgg:'Agresivo',profMod:'Moderado',profCon:'Conservador',actBuy:'Comprar',actHold:'Mantener',actSell:'Vender',actAvoid:'Evitar',margin:'Margen',roe:'ROE',revGrowth:'Crecimiento ingresos',cash:'Efectivo',debt:'Deuda',fcf:'Flujo libre',insiders:'Insiders %',inst:'Institucionales %',shortF:'Corto %',ma50:'MA 50 días',ma200:'MA 200 días',recTrendT:'Recomendaciones de analistas',earnHistT:'Historial EPS',finHistT:'Ingresos y beneficio anual',revenueL:'Ingresos',netIncomeL:'Beneficio neto',lastActionT:'Última acción de analista',sBuy:'Compra fuerte',rBuy:'Comprar',rHold:'Mantener',rSell:'Vender',sSell:'Venta fuerte',rangeD:'1D',rangeW:'1S',rangeM:'1M',range6M:'6M',rangeY:'1A',range5Y:'5A'},
  ar:{updated:'تحديث',open:'الافتتاح',high:'أعلى اليوم',low:'أدنى اليوم',volume:'الحجم',avgVol:'متوسط الحجم',mcap:'القيمة السوقية',pe:'مكرر الربحية',eps:'ربح السهم',beta:'بيتا',div:'عائد التوزيع',w52:'نطاق 52 أسبوع',target:'هدف المحللين',analysts:'محللون',rec:'الإجماع',earnings:'التقرير القادم',sector:'القطاع',employees:'موظفون',aiCta:'تريد تحليل ذكاء اصطناعي ذكي؟',aiCtaNoKey:'اربط الذكاء الاصطناعي مجاناً (دقيقتان) واحصل على تحليل كامل',btnAnalyze:'▶ تحليل AI',btnConnect:'⚙ ربط AI',forex:'💱 عملات',crypto:'₿ كريبتو',preMarket:'قبل السوق',postMarket:'بعد السوق',marketOpen:'● السوق مفتوح',marketClosed:'○ السوق مغلق',dataErr:'خطأ في التحميل — حاول مجدداً',disclaimer:'⚠ البيانات مأخوذة من مصادر خارجية (Yahoo Finance وغيرها) وتُعرض للراحة فقط. قد تحدث تأخيرات أو أخطاء. تحقق من مصدر معتمد قبل اتخاذ القرار. التطبيق والمطورون غير مسؤولين عن أي ضرر.',newsTitle:'📰 آخر الأخبار',tabOverview:'نظرة عامة',tabAnalysts:'المحللون',tabFinance:'المالية',tabCompany:'الشركة',tabNews:'الأخبار',insiderT:'👤 صفقات المطلعين',bottomLineT:'💬 الخلاصة',profilesT:'🎯 حسب ملف المستثمر',profAgg:'جريء',profMod:'متوازن',profCon:'محافظ',actBuy:'شراء',actHold:'احتفاظ',actSell:'بيع',actAvoid:'تجنّب',margin:'هامش الربح',roe:'العائد على الحقوق',revGrowth:'نمو الإيرادات',cash:'النقد',debt:'الدين',fcf:'التدفق الحر',insiders:'الداخليون %',inst:'المؤسسات %',shortF:'البيع المكشوف %',ma50:'متوسط 50 يوم',ma200:'متوسط 200 يوم',recTrendT:'توصيات المحللين',earnHistT:'سجل تقارير EPS',finHistT:'الإيرادات والربح السنوي',revenueL:'الإيرادات',netIncomeL:'صافي الربح',lastActionT:'آخر إجراء محلل',sBuy:'شراء قوي',rBuy:'شراء',rHold:'احتفاظ',rSell:'بيع',sSell:'بيع قوي',rangeD:'يوم',rangeW:'أسبوع',rangeM:'شهر',range6M:'6ش',rangeY:'سنة',range5Y:'5س'}
};
function LT(k){var l=LIVE_T[curLang]||LIVE_T.en;return l[k]||LIVE_T.en[k]||PT(k);}

var currentLiveSymbol='';
var currentChartRange='1mo';
var TICKER_SYMBOLS=['AAPL','MSFT','NVDA','TSLA','GOOGL','AMZN','META','NFLX','AMD','INTC','TEVA','CHKP','NICE','MNDY','WIX','CYBR','ESLT','GLBE','PLX','ICCM','PPBT'];

/* ── TRANSLATION — תרגום נתונים לשפת הממשק ── */
var __trCache={};
async function trTexts(texts){
  if(curLang==='en'||!texts.length)return texts;
  var need=[];
  texts.forEach(function(t){if(t&&__trCache[curLang+'|'+t]==null&&need.indexOf(t)<0)need.push(t);});
  var batches=[];for(var i=0;i<need.length;i+=15)batches.push(need.slice(i,i+15)); // ה-Worker מתרגם עד 15 טקסטים לבקשה
  await Promise.all(batches.map(async function(b){
    try{
      var res=await fetch(DATA_WORKER_URL+'/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'translate',tl:curLang,texts:b})});
      var data=await res.json();
      if(data.ok&&data.translations)b.forEach(function(t,j){if(data.translations[j])__trCache[curLang+'|'+t]=data.translations[j];});
    }catch(e){/* לא שומרים כישלון — ננסה שוב בפעם הבאה */}
  }));
  return texts.map(function(t){return (t&&__trCache[curLang+'|'+t])||t;});
}

/* קונצנזוס אנליסטים — תרגום מקומי מדויק */
var REC_T={
  he:{strong_buy:'קנייה חזקה',buy:'קנייה',hold:'החזקה',underperform:'ביצוע חסר',sell:'מכירה',none:'—'},
  en:{strong_buy:'Strong Buy',buy:'Buy',hold:'Hold',underperform:'Underperform',sell:'Sell',none:'—'},
  ru:{strong_buy:'Активно покупать',buy:'Покупать',hold:'Держать',underperform:'Ниже рынка',sell:'Продавать',none:'—'},
  es:{strong_buy:'Compra fuerte',buy:'Comprar',hold:'Mantener',underperform:'Bajo rendimiento',sell:'Vender',none:'—'},
  ar:{strong_buy:'شراء قوي',buy:'شراء',hold:'احتفاظ',underperform:'أداء ضعيف',sell:'بيع',none:'—'}
};
function recLabel(key){var m=REC_T[curLang]||REC_T.en;return m[key]||key||'—';}

/* ── Number formatting ── */
function fmtNum(n){
  if(n==null||isNaN(n))return '—';
  if(Math.abs(n)>=1e12)return (n/1e12).toFixed(2)+'T';
  if(Math.abs(n)>=1e9)return (n/1e9).toFixed(2)+'B';
  if(Math.abs(n)>=1e6)return (n/1e6).toFixed(2)+'M';
  if(Math.abs(n)>=1e3)return (n/1e3).toFixed(1)+'K';
  return String(Math.round(n*100)/100);
}
function fmtPrice(n,cur){
  if(n==null||isNaN(n))return '—';
  var sym=cur==='ILS'?'₪':cur==='EUR'?'€':cur==='GBP'?'£':'$';
  return sym+(Math.round(n*100)/100).toLocaleString();
}
function fmtPct(n){
  if(n==null||isNaN(n))return '';
  var v=Math.round(n*100)/100;
  return (v>=0?'+':'')+v+'%';
}

/* ── LIVE TICKER — מניות + מדדים, אנימציה שלא נשברת ── */
async function loadLiveTicker(){
  try{
    var results=await Promise.all([
      fetchLiveTicker(TICKER_SYMBOLS).catch(function(){return null;}),
      workerFetch('action=indices').catch(function(){return null;})
    ]);
    var tickerData=results[0],indicesData=results[1];
    var items=[];
    // Indices first (gold color, no click)
    if(indicesData&&indicesData.indices){
      indicesData.indices.forEach(function(ix){
        var color=ix.changePct>=0?'var(--green)':'var(--red)';
        items.push('<span class="ticker-item"><span style="color:var(--gold)">'+ix.name+'</span> <span data-lsp="'+ix.symbol+'" data-kind="num">'+fmtNum(ix.price)+'</span> <span data-lsc="'+ix.symbol+'" style="color:'+color+'">'+fmtPct(ix.changePct)+'</span></span>');
      });
    }
    // Stocks (clickable)
    if(tickerData&&tickerData.quotes){
      tickerData.quotes.forEach(function(q){
        var color=q.changePct>=0?'var(--green)':'var(--red)';
        items.push('<span class="ticker-item" style="cursor:pointer" onclick="quickLive(\''+q.symbol+'\')">'+q.symbol+' <span data-lsp="'+q.symbol+'">'+fmtPrice(q.price)+'</span> <span data-lsc="'+q.symbol+'" style="color:'+color+'">'+fmtPct(q.changePct)+'</span></span>');
      });
    }
    if(!items.length)return;
    // Duplicate content for seamless 50% loop, then RESTART the animation
    var track=document.getElementById('tickerTrack');
    track.style.animation='none';
    track.innerHTML=items.join('')+items.join('');
    try{localStorage.setItem('stockai_snap_ticker',items.join(''));}catch(e){}
    // Force reflow then re-apply animation — this is what keeps it running forever
    void track.offsetWidth;
    var duration=Math.max(30,items.length*4);
    track.style.animation='ticker '+duration+'s linear infinite';
  }catch(e){/* keep whatever is showing */}
}

/* ── LIVE QUOTE CARD ── */
function quickLive(sym){document.getElementById('stockInput').value=sym;loadLiveData(sym);}

/* ── LIVE CARD TABS — מנוע טאבים ── */
var LIVE_TAB_DEFS=[
  ['overview','tabOverview',['lvChartWrap','lvMetrics']],
  ['technical','tabTech',['lvTech','lvTv','lvBacktest']],
  ['analysts','tabAnalysts',['lvAnalyst','lvEstimates','lvRecTrend','lvEarnHist','lvLastAction','lvInsiders']],
  ['quality','tabQuality',['lvQuality']],
  ['value','tabValue',['lvValue']],
  ['finance','tabFinance',['lvFinHist']],
  ['events','tabEvents',['lvEvents']],
  ['company','tabCompany',['lvPeers','lvCompany']],
  ['news','tabNews',['lvNews']],
  ['thesis','tabThesis',['lvThesis']]
];
var currentLiveTab='overview';
function sectionHas(id){
  if(id==='lvChartWrap'||id==='lvMetrics')return true;
  var el=document.getElementById(id);
  return !!(el&&el.innerHTML.trim());
}
function renderLiveTabs(){
  var bar=document.getElementById('liveTabs');if(!bar)return;
  bar.innerHTML='';
  LIVE_TAB_DEFS.forEach(function(def){
    // הצג טאב רק אם יש בו תוכן
    var hasContent=def[2].some(function(id){return sectionHas(id);});
    if(!hasContent)return;
    var b=document.createElement('button');
    b.className='live-tab'+(def[0]===currentLiveTab?' active':'');
    b.id='ltab-'+def[0];
    b.textContent=LT(def[1]);
    b.onclick=(function(t){return function(){switchLiveTab(t);};})(def[0]);
    bar.appendChild(b);
  });
}
function switchLiveTab(t){currentLiveTab=t;renderLiveTabs();applyLiveTabs();}
function applyLiveTabs(){
  LIVE_TAB_DEFS.forEach(function(def){
    var active=def[0]===currentLiveTab;
    def[2].forEach(function(id){
      var el=document.getElementById(id);if(!el)return;
      var disp=(id==='lvAnalyst')?'flex':(id==='lvMetrics')?'grid':'block';
      el.style.display=(active&&sectionHas(id))?disp:'none';
    });
  });
}

async function loadLiveData(symbol){
  symbol=(symbol||'').toUpperCase().trim();
  if(!symbol)return;
  currentLiveSymbol=symbol;
  var card=document.getElementById('liveCard');
  card.classList.add('visible');
  document.getElementById('lvSym').textContent=symbol;
  document.getElementById('lvName').textContent='...';
  document.getElementById('lvPrice').textContent='...';
  document.getElementById('lvChange').textContent='';
  document.getElementById('lvMetrics').innerHTML='';
  currentLiveTab='overview';
  ['lvAnalyst','lvCompany','lvNews','lvRecTrend','lvEarnHist','lvFinHist','lvLastAction','lvInsiders','lvTech','lvTv','lvQuality','lvEvents','lvValue','lvThesis','lvBacktest','lvEstimates','lvPeers'].forEach(function(id){
    var e=document.getElementById(id);if(e){e.innerHTML='';e.style.display='none';}
  });
  var __snap=snapGet(symbol);
  if(__snap){try{renderLiveQuote(__snap.q);document.getElementById('lvUpdated').textContent=P4('cached',{t:fmtTime(__snap.ts)});}catch(e){}}
  try{
    var q=await fetchLiveQuote(symbol);
    if(currentLiveSymbol!==symbol)return;
    snapSave(q);
    renderLiveQuote(q);
    streamFocus(q);
    loadLiveChart(symbol,currentChartRange);
    loadStockNews(symbol);
    renderValuation(symbol,q);renderThesis(symbol);
    // מנועי ניתוח — טכני, איכות, אירועים (חינמי, בלי AI)
    window.__extrasPromise=Promise.allSettled([loadTechnical(symbol).then(function(){if(typeof renderBacktest==='function')renderBacktest(symbol);return typeof loadTvRating==='function'?loadTvRating(symbol):null;}),loadQuality(symbol,q),loadEvents(symbol,q),typeof loadPeers==='function'?loadPeers(symbol):null]);
  }catch(e){
    if(__snap){document.getElementById('lvUpdated').textContent=P4('offline',{t:fmtTime(__snap.ts)});}
    else{document.getElementById('lvName').textContent=LT('dataErr');document.getElementById('lvPrice').textContent='—';}
  }
}

/* ── NEWS ── */
async function loadStockNews(symbol){
  try{
    var data=await workerFetch('action=news&symbol='+encodeURIComponent(symbol));
    if(!data.news||!data.news.length)return;
    var items=data.news.slice(0,5);
    // תרגום כותרות החדשות לשפת הממשק
    if(curLang!=='en'){
      var titles=items.map(function(n){return n.title||'';});
      var translated=await trTexts(titles);
      items.forEach(function(n,i){n.title=translated[i]||n.title;});
    }
    var el=document.getElementById('lvNews');
    var h='<div class="live-news-title">'+LT('newsTitle')+'</div>';
    items.forEach(function(n){
      var timeStr='';
      if(n.time){
        var mins=Math.floor((Date.now()-new Date(n.time).getTime())/60000);
        timeStr=mins<60?mins+'m':mins<1440?Math.floor(mins/60)+'h':Math.floor(mins/1440)+'d';
      }
      h+='<a class="news-item" href="'+escHtml(n.link)+'" target="_blank" rel="noopener">'
        +'<div class="news-title">'+escHtml(n.title)+'</div>'
        +'<div class="news-meta">'+escHtml(n.publisher||'')+(timeStr?' · '+timeStr:'')+'</div></a>';
    });
    el.innerHTML=h;
    renderLiveTabs();applyLiveTabs();
  }catch(e){/* news is optional */}
}

function renderLiveQuote(q){
  document.getElementById('lvSym').textContent=q.symbol||currentLiveSymbol;
  document.getElementById('lvName').textContent=q.name||'';
  document.getElementById('lvExchange').textContent=q.exchange||'';
  document.getElementById('lvPrice').textContent=fmtPrice(q.regularPrice,q.currency);
  var chgEl=document.getElementById('lvChange');
  var chg=q.regularChange,pct=q.regularChangePct;
  if(chg!=null){
    var up=chg>=0;
    chgEl.textContent=(up?'▲ ':'▼ ')+(up?'+':'')+(Math.round(chg*100)/100)+' ('+fmtPct(pct)+')';
    chgEl.className='live-change '+(up?'up':'down');
  }else{chgEl.textContent='';}
  // Market state + pre/post
  var stateEl=document.getElementById('lvMarketState');
  var stateTxt=q.marketState==='REGULAR'?LT('marketOpen'):LT('marketClosed');
  if(q.preMarketPrice!=null&&q.marketState==='PRE')stateTxt+=' · '+LT('preMarket')+': '+fmtPrice(q.preMarketPrice,q.currency)+' ('+fmtPct(q.preMarketChangePct)+')';
  if(q.postMarketPrice!=null&&(q.marketState==='POST'||q.marketState==='POSTPOST'||q.marketState==='CLOSED'))stateTxt+=' · '+LT('postMarket')+': '+fmtPrice(q.postMarketPrice,q.currency)+' ('+fmtPct(q.postMarketChangePct)+')';
  stateEl.textContent=stateTxt;
  document.getElementById('lvUpdated').textContent=LT('updated')+': '+new Date().toLocaleTimeString();
  // Metrics grid
  var m=[];
  function metric(lbl,val){if(val!=null&&val!=='—')m.push('<div class="live-metric"><div class="live-metric-lbl">'+lbl+'</div><div class="live-metric-val">'+val+'</div></div>');}
  metric(LT('open'),fmtPrice(q.open,q.currency));
  metric(LT('high'),fmtPrice(q.dayHigh,q.currency));
  metric(LT('low'),fmtPrice(q.dayLow,q.currency));
  metric(LT('volume'),fmtNum(q.volume));
  metric(LT('avgVol'),fmtNum(q.avgVolume));
  metric(LT('mcap'),q.marketCap?fmtNum(q.marketCap):null);
  metric(LT('pe'),q.peRatio?String(Math.round(q.peRatio*100)/100):null);
  metric(LT('eps'),q.eps?String(Math.round(q.eps*100)/100):null);
  metric(LT('beta'),q.beta?String(Math.round(q.beta*100)/100):null);
  metric(LT('div'),q.dividendYield?(Math.round(q.dividendYield*10000)/100)+'%':null);
  metric(LT('w52'),q.week52Low&&q.week52High?fmtPrice(q.week52Low,q.currency)+' – '+fmtPrice(q.week52High,q.currency):null);
  metric(LT('earnings'),q.earningsDate||null);
  // מדדים מתקדמים
  metric(LT('margin'),q.profitMargins!=null?(Math.round(q.profitMargins*10000)/100)+'%':null);
  metric(LT('roe'),q.returnOnEquity!=null?(Math.round(q.returnOnEquity*10000)/100)+'%':null);
  metric(LT('revGrowth'),q.revenueGrowth!=null?(Math.round(q.revenueGrowth*10000)/100)+'%':null);
  metric(LT('cash'),q.totalCash?fmtNum(q.totalCash):null);
  metric(LT('debt'),q.totalDebt?fmtNum(q.totalDebt):null);
  metric(LT('fcf'),q.freeCashflow?fmtNum(q.freeCashflow):null);
  metric(LT('ma50'),q.ma50?fmtPrice(q.ma50,q.currency):null);
  metric(LT('ma200'),q.ma200?fmtPrice(q.ma200,q.currency):null);
  metric(LT('insiders'),q.heldInsiders!=null?(Math.round(q.heldInsiders*10000)/100)+'%':null);
  metric(LT('inst'),q.heldInstitutions!=null?(Math.round(q.heldInstitutions*10000)/100)+'%':null);
  metric(LT('shortF'),q.shortPctFloat!=null?(Math.round(q.shortPctFloat*10000)/100)+'%':null);
  document.getElementById('lvMetrics').innerHTML=m.join('');
  // ── פילוח המלצות אנליסטים ──
  var rtEl=document.getElementById('lvRecTrend');
  if(q.recTrend){
    var rt=q.recTrend;
    var total=rt.strongBuy+rt.buy+rt.hold+rt.sell+rt.strongSell;
    if(total>0){
      var segs=[[rt.strongBuy,'#2e7d4f',LT('sBuy')],[rt.buy,'#4caf72',LT('rBuy')],[rt.hold,'#c9a84c',LT('rHold')],[rt.sell,'#cf4a4a',LT('rSell')],[rt.strongSell,'#8b2020',LT('sSell')]];
      var bar='',leg='';
      segs.forEach(function(s){
        if(s[0]>0)bar+='<div class="rec-seg" style="width:'+(s[0]/total*100)+'%;background:'+s[1]+'"></div>';
        if(s[0]>0)leg+='<span><span class="rec-dot" style="background:'+s[1]+'"></span>'+s[2]+': '+s[0]+'</span>';
      });
      rtEl.innerHTML='<div class="rec-trend-title">'+LT('recTrendT')+' ('+total+')</div><div class="rec-bar">'+bar+'</div><div class="rec-legend">'+leg+'</div>';
      rtEl.style.display='block';
    }else rtEl.style.display='none';
  }else rtEl.style.display='none';
  // ── היסטוריית דוחות EPS ──
  var ehEl=document.getElementById('lvEarnHist');
  if(q.earningsHist&&q.earningsHist.length){
    var chips='';
    q.earningsHist.forEach(function(e){
      var beat=e.surprisePct!=null&&e.surprisePct>=0;
      var col=e.surprisePct==null?'var(--text-dim)':beat?'var(--green)':'var(--red)';
      chips+='<div class="earn-chip"><div class="earn-q">'+escHtml(e.q||'')+'</div>'
        +'<div class="earn-val" style="color:'+col+'">'+(e.actual!=null?e.actual:'—')+'</div>'
        +(e.surprisePct!=null?'<div class="earn-sur" style="color:'+col+'">'+(beat?'▲':'▼')+' '+Math.abs(Math.round(e.surprisePct*10000)/100)+'%</div>':'')
        +'</div>';
    });
    ehEl.innerHTML='<div class="rec-trend-title">'+LT('earnHistT')+'</div><div class="earn-chips">'+chips+'</div>';
    ehEl.style.display='block';
  }else ehEl.style.display='none';
  // ── הכנסות ורווח שנתי ──
  var fhEl=document.getElementById('lvFinHist');
  if(q.financialHist&&q.financialHist.length){
    var maxV=0;
    q.financialHist.forEach(function(y){maxV=Math.max(maxV,Math.abs(y.revenue||0),Math.abs(y.netIncome||0));});
    if(maxV>0){
      var bars='';
      q.financialHist.forEach(function(y){
        var rh=Math.max(2,Math.round((y.revenue||0)/maxV*70));
        var nv=y.netIncome||0;
        var nh=Math.max(2,Math.round(Math.abs(nv)/maxV*70));
        var nc=nv>=0?'var(--green)':'var(--red)';
        bars+='<div class="fin-year"><div class="fin-bar-pair">'
          +'<div class="fin-bar" style="height:'+rh+'px;background:var(--gold-dim)" title="'+fmtNum(y.revenue)+'"></div>'
          +'<div class="fin-bar" style="height:'+nh+'px;background:'+nc+'" title="'+fmtNum(nv)+'"></div>'
          +'</div><div class="fin-year-lbl">'+escHtml(y.year||'')+'</div></div>';
      });
      fhEl.innerHTML='<div class="rec-trend-title">'+LT('finHistT')+'</div><div class="fin-bars">'+bars+'</div>'
        +'<div class="fin-legend"><span><span class="rec-dot" style="background:var(--gold-dim)"></span>'+LT('revenueL')+'</span><span><span class="rec-dot" style="background:var(--green)"></span>'+LT('netIncomeL')+'</span></div>';
      fhEl.style.display='block';
    }else fhEl.style.display='none';
  }else fhEl.style.display='none';
  // ── פעולת אנליסט אחרונה ──
  var laEl=document.getElementById('lvLastAction');
  if(q.lastAction&&q.lastAction.firm){
    var la=q.lastAction;
    laEl.innerHTML='<strong>'+LT('lastActionT')+':</strong> '+escHtml(la.firm)+' — '+escHtml(la.toGrade||la.action)+(la.fromGrade&&la.fromGrade!==la.toGrade?' ('+escHtml(la.fromGrade)+' ← )':'')+(la.date?' · '+la.date:'');
    laEl.style.display='block';
  }else laEl.style.display='none';
  // ── עסקאות בעלי עניין ──
  var inEl=document.getElementById('lvInsiders');
  if(inEl&&q.insiderTx&&q.insiderTx.length){
    var irows='';
    q.insiderTx.forEach(function(t){
      var isBuy=/buy|purchase|acqui/i.test(t.text||'');
      var isSell=/sale|sell|dispos/i.test(t.text||'');
      var icol=isBuy?'var(--green)':isSell?'var(--red)':'var(--text-dim)';
      irows+='<div style="padding:8px 0;border-bottom:1px solid rgba(128,128,128,.08);font-size:11px;line-height:1.6;">'
        +'<strong style="color:var(--text)">'+escHtml(t.name)+'</strong>'
        +(t.relation?' <span style="color:var(--text-muted)">· '+escHtml(t.relation)+'</span>':'')
        +'<br><span style="color:'+icol+'">'+escHtml(t.text||'—')+'</span>'
        +(t.shares?' <span style="color:var(--text-dim)">· '+fmtNum(t.shares)+'</span>':'')
        +(t.value?' <span style="color:var(--text-dim)">· '+fmtPrice(t.value)+'</span>':'')
        +(t.date?' <span style="color:var(--text-muted)">· '+escHtml(t.date)+'</span>':'')
        +'</div>';
    });
    inEl.innerHTML='<div class="rec-trend-title">'+LT('insiderT')+'</div>'+irows;
  }
  // Analyst row
  var an=document.getElementById('lvAnalyst');
  if(q.targetMean||q.recommendationKey){
    var recColors={strong_buy:'var(--green)',buy:'var(--green)',hold:'var(--gold)',underperform:'var(--red)',sell:'var(--red)'};
    var recNames={strong_buy:'Strong Buy',buy:'Buy',hold:'Hold',underperform:'Underperform',sell:'Sell'};
    var h='';
    if(q.targetMean)h+='<div class="live-analyst-item"><div class="live-analyst-lbl">'+LT('target')+'</div><div class="live-analyst-val" style="color:var(--gold)">'+fmtPrice(q.targetMean,q.currency)+(q.targetLow&&q.targetHigh?' <span style="font-size:9px;color:var(--text-muted)">('+fmtPrice(q.targetLow,q.currency)+'–'+fmtPrice(q.targetHigh,q.currency)+')</span>':'')+'</div></div>';
    if(q.recommendationKey)h+='<div class="live-analyst-item"><div class="live-analyst-lbl">'+LT('rec')+'</div><div class="live-analyst-val" style="color:'+(recColors[q.recommendationKey]||'var(--text)')+'">'+recLabel(q.recommendationKey)+'</div></div>';
    if(q.numberOfAnalysts)h+='<div class="live-analyst-item"><div class="live-analyst-lbl">'+LT('analysts')+'</div><div class="live-analyst-val">'+q.numberOfAnalysts+'</div></div>';
    an.innerHTML=h;an.style.display='flex';
  }else{an.style.display='none';}
  // Company info
  var co=document.getElementById('lvCompany');
  if(q.sector||q.description){
    var renderCompany=function(sector,industry,desc){
      var ch='';
      if(sector)ch+='<strong>'+LT('sector')+':</strong> '+escHtml(sector)+(industry?' · '+escHtml(industry):'');
      if(q.employees)ch+=' · <strong>'+LT('employees')+':</strong> '+fmtNum(q.employees);
      if(desc)ch+='<br>'+escHtml(desc)+'...';
      co.innerHTML=ch;
      renderLiveTabs();applyLiveTabs();
    };
    renderCompany(q.sector,q.industry,q.description);
    // תרגום לשפת הממשק (אסינכרוני — מתעדכן כשהתרגום חוזר)
    if(curLang!=='en'){
      var toTr=[q.sector||'',q.industry||'',q.description||''];
      trTexts(toTr).then(function(tr){renderCompany(tr[0]||q.sector,tr[1]||q.industry,tr[2]||q.description);});
    }
  }else{co.style.display='none';}
  // AI CTA
  var cfg=loadAIConfig();
  document.getElementById('lvAiCtaText').textContent=cfg.provider?LT('aiCta'):LT('aiCtaNoKey');
  var btn=document.getElementById('btnAiFromLive');
  btn.textContent=cfg.provider?LT('btnAnalyze'):LT('btnConnect');
  btn.onclick=cfg.provider?function(){analyzeStock(currentLiveSymbol);}:function(){openSetup();};
  // בניית הטאבים אחרי שכל הסקציות רונדרו
  renderLiveTabs();applyLiveTabs();
  // store quote for AI injection
  window.__lastLiveQuote=q;
}

/* ── CHART ── */
var CHART_RANGES=[['1d','rangeD'],['5d','rangeW'],['1mo','rangeM'],['6mo','range6M'],['1y','rangeY'],['5y','range5Y']];
function renderChartRanges(){
  var el=document.getElementById('chartRanges');el.innerHTML='';
  CHART_RANGES.forEach(function(r){
    var b=document.createElement('button');
    b.className='chart-range-btn'+(r[0]===currentChartRange?' active':'');
    b.textContent=LT(r[1]);
    b.onclick=function(){currentChartRange=r[0];renderChartRanges();if(currentLiveSymbol)loadLiveChart(currentLiveSymbol,r[0]);};
    el.appendChild(b);
  });
}
async function loadLiveChart(symbol,range){
  var loading=document.getElementById('chartLoading');
  loading.style.display='flex';loading.textContent='◈ ...';
  try{
    var data=await fetchLiveChart(symbol,range);
    drawChart(data.points||[],data.previousClose);
    loading.style.display='none';
  }catch(e){loading.textContent=LT('dataErr');}
}
function drawChart(points,prevClose){
  var canvas=document.getElementById('liveChart');
  var wrap=canvas.parentElement;
  var dpr=window.devicePixelRatio||1;
  var W=wrap.clientWidth,H=wrap.clientHeight;
  canvas.width=W*dpr;canvas.height=H*dpr;
  var ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,W,H);
  if(!points.length)return;
  var vals=points.map(function(p){return p[1];});
  var min=Math.min.apply(null,vals),max=Math.max.apply(null,vals);
  if(min===max){min-=1;max+=1;}
  var pad=(max-min)*0.08;min-=pad;max+=pad;
  var isUp=vals[vals.length-1]>=vals[0];
  var lineColor=isUp?'#4caf72':'#cf4a4a';
  var mL=8,mR=54,mT=8,mB=18;
  var cw=W-mL-mR,chh=H-mT-mB;
  function px(i){return mL+(i/(points.length-1))*cw;}
  function py(v){return mT+(1-(v-min)/(max-min))*chh;}
  // grid lines + right axis labels
  ctx.strokeStyle='rgba(128,128,128,0.12)';ctx.fillStyle='rgba(150,140,110,0.7)';
  ctx.font='9px IBM Plex Mono,monospace';ctx.textAlign='left';
  for(var g=0;g<=3;g++){
    var gv=min+(max-min)*(g/3);var gy=py(gv);
    ctx.beginPath();ctx.moveTo(mL,gy);ctx.lineTo(mL+cw,gy);ctx.stroke();
    ctx.fillText(String(Math.round(gv*100)/100),mL+cw+5,gy+3);
  }
  // prev close dashed line
  if(prevClose!=null&&prevClose>min&&prevClose<max){
    ctx.setLineDash([4,4]);ctx.strokeStyle='rgba(201,168,76,0.4)';
    ctx.beginPath();ctx.moveTo(mL,py(prevClose));ctx.lineTo(mL+cw,py(prevClose));ctx.stroke();
    ctx.setLineDash([]);
  }
  // gradient fill
  var grad=ctx.createLinearGradient(0,mT,0,mT+chh);
  grad.addColorStop(0,isUp?'rgba(76,175,114,0.22)':'rgba(207,74,74,0.22)');
  grad.addColorStop(1,'rgba(0,0,0,0)');
  ctx.beginPath();ctx.moveTo(px(0),py(vals[0]));
  for(var i=1;i<points.length;i++)ctx.lineTo(px(i),py(vals[i]));
  ctx.lineTo(px(points.length-1),mT+chh);ctx.lineTo(px(0),mT+chh);ctx.closePath();
  ctx.fillStyle=grad;ctx.fill();
  // line
  ctx.beginPath();ctx.moveTo(px(0),py(vals[0]));
  for(var j=1;j<points.length;j++)ctx.lineTo(px(j),py(vals[j]));
  ctx.strokeStyle=lineColor;ctx.lineWidth=1.8;ctx.stroke();
  // last point dot
  ctx.beginPath();ctx.arc(px(points.length-1),py(vals[vals.length-1]),3,0,Math.PI*2);
  ctx.fillStyle=lineColor;ctx.fill();
  // time labels (first + last)
  var isIntra=(currentChartRange==='1d'||currentChartRange==='5d');
  ctx.fillStyle='rgba(150,140,110,0.6)';ctx.textAlign='left';
  var d0=new Date(points[0][0]*1000),d1=new Date(points[points.length-1][0]*1000);
  function lbl(d){return isIntra?d.getHours()+':'+String(d.getMinutes()).padStart(2,'0'):(d.getMonth()+1)+'/'+(''+d.getFullYear()).slice(2);}
  ctx.fillText(lbl(d0),mL,H-4);
  ctx.textAlign='right';ctx.fillText(lbl(d1),mL+cw,H-4);
}

/* ── FOREX + CRYPTO ── */
var fxTab='forex',fxData=null,cryptoData=null;
function switchFxTab(tab){
  fxTab=tab;
  document.getElementById('fxtab-forex').classList.toggle('active',tab==='forex');
  document.getElementById('fxtab-crypto').classList.toggle('active',tab==='crypto');
  renderFx();
}
async function loadFxData(){
  document.getElementById('fxtab-forex').textContent=LT('forex');
  document.getElementById('fxtab-crypto').textContent=LT('crypto');
  try{fxData=await fetchLiveForex();}catch(e){fxData=null;}
  try{cryptoData=await fetchLiveCrypto();}catch(e){cryptoData=null;}
  renderFx();
}
function renderFx(){
  var el=document.getElementById('fxContent');
  if(fxTab==='forex'){
    if(!fxData){el.innerHTML='<div class="fx-loading">'+LT('dataErr')+'</div>';return;}
    var r=fxData.rates||{};
    var pairs=[['USD/ILS',r.ILS],['USD/EUR',r.EUR],['USD/GBP',r.GBP],['EUR/ILS',fxData.eurIls],['USD/JPY',r.JPY],['USD/CHF',r.CHF],['USD/CAD',r.CAD],['USD/RUB',r.RUB]];
    var h='<div class="fx-grid">';
    pairs.forEach(function(p){
      if(p[1]==null)return;
      h+='<div class="fx-cell"><div class="fx-pair">'+p[0]+'</div><div class="fx-rate">'+(Math.round(p[1]*10000)/10000)+'</div></div>';
    });
    h+='</div>';
    el.innerHTML=h;
  }else{
    if(!cryptoData){el.innerHTML='<div class="fx-loading">'+LT('dataErr')+'</div>';return;}
    var h2='<div class="fx-grid">';
    (cryptoData.coins||[]).forEach(function(c){
      var color=c.change24h>=0?'var(--green)':'var(--red)';
      h2+='<div class="fx-cell"><div class="fx-pair">'+c.symbol+'/USD</div><div class="fx-rate">'+fmtPrice(c.usd)+'</div><div class="fx-chg" style="color:'+color+'">'+fmtPct(c.change24h)+'</div></div>';
    });
    h2+='</div>';
    el.innerHTML=h2;
  }
}

/* ── DATA DISCLAIMER ── */
function renderDataDisclaimer(){
  document.getElementById('dataDisclaimer').textContent=LT('disclaimer');
}
;(window.__MODS=window.__MODS||{})['app-market']=1;

/* StockAI · app-live.js — Live price stream, market screen, calendars, Bank of Israel, TradingView second opinion
   AppNest © 2026 · load order matters: see <script> tags in stock-analyzer.html */
/* ══════════════════════════════════════════════════════════════
   PHASE 5 — זרם חי · מסך שוק · יומן כלכלי ודוחות · בנק ישראל · חוות דעת שנייה
   מקורות: yfinance (Apache-2.0), TradingView-Screener (MIT), skills-il/mcps (BOI)
══════════════════════════════════════════════════════════════ */
var P5_T={
he:{mktBtn:"🔥 שוק",mktT:"🔥 השוק היום",tabUS:"🇺🇸 ארה\"ב",tabIL:"🇮🇱 ישראל",tabEcon:"📅 יומן כלכלי",tabEarn:"📊 דוחות",lGainers:"עולות",lLosers:"יורדות",lActive:"הכי פעילות",lShorted:"הכי בשורט",loading:"טוען…",empty:"אין נתונים כרגע",err:"לא ניתן לטעון — נסה שוב",ilNote:"⏱ נתוני הבורסה בתל אביב מעוכבים בכ-15 דקות (TradingView). נתוני זמן אמת בישראל הם מוצר בתשלום של הבורסה.",usNote:"מקור: Yahoo Finance",
econAll:"הכל",econNote:"שעות לפי השעון שלך · תחזית = קונצנזוס כלכלנים · בפועל מתעדכן מיד עם הפרסום",forecast:"תחזית",actual:"בפועל",prior:"קודם",earnEst:"צפי EPS",earnAct:"בפועל",bmo:"לפני הפתיחה",amc:"אחרי הסגירה",tbd:"שעה לא ידועה",today:"היום",tomorrow:"מחר",earnNote:"החברות הגדולות המדווחות ב-14 הימים הקרובים · לחיצה פותחת את המניה",
live:"חי",delayed:"⏱ מעוכב ~15-20 דק'",liveOn:"⚡ מחירים חיים",
boiT:"🏦 שער יציג — בנק ישראל",boiNote:"השער הרשמי שמתפרסם פעם ביום · השערים למטה מתעדכנים לאורך היום",
tvT:"📐 חוות דעת שנייה — TradingView",tvAgree:"✅ מסכים עם האיתות שלנו",tvDisagree:"⚠️ לא מסכים עם האיתות שלנו — שווה זהירות",tvPartial:"➖ הסכמה חלקית",tvMA:"ממוצעים נעים",tvOsc:"מתנדים",tvNote:"דירוג טכני ציבורי של TradingView (בעיכוב של עד 15 דקות). שתי שיטות חישוב שונות — כשהן מסכימות, האיתות חזק יותר."},
en:{mktBtn:"🔥 Market",mktT:"🔥 Today's market",tabUS:"🇺🇸 US",tabIL:"🇮🇱 Israel",tabEcon:"📅 Economic",tabEarn:"📊 Earnings",lGainers:"Gainers",lLosers:"Losers",lActive:"Most active",lShorted:"Most shorted",loading:"Loading…",empty:"No data right now",err:"Could not load — try again",ilNote:"⏱ Tel Aviv Stock Exchange data is delayed ~15 minutes (TradingView). Real-time TASE data is a paid exchange product.",usNote:"Source: Yahoo Finance",
econAll:"All",econNote:"Times in your time zone · Forecast = economists' consensus · Actual updates as soon as it's released",forecast:"Forecast",actual:"Actual",prior:"Prior",earnEst:"EPS est.",earnAct:"Actual",bmo:"Before open",amc:"After close",tbd:"Time TBD",today:"Today",tomorrow:"Tomorrow",earnNote:"Largest companies reporting in the next 14 days · tap to open the stock",
live:"LIVE",delayed:"⏱ Delayed ~15-20 min",liveOn:"⚡ Live prices",
boiT:"🏦 Representative rate — Bank of Israel",boiNote:"The official rate published once a day · the rates below update during the day",
tvT:"📐 Second opinion — TradingView",tvAgree:"✅ Agrees with our signal",tvDisagree:"⚠️ Disagrees with our signal — be careful",tvPartial:"➖ Partial agreement",tvMA:"Moving averages",tvOsc:"Oscillators",tvNote:"TradingView's public technical rating (delayed up to 15 min). Two different methods — when they agree, the signal is stronger."},
ru:{mktBtn:"🔥 Рынок",mktT:"🔥 Рынок сегодня",tabUS:"🇺🇸 США",tabIL:"🇮🇱 Израиль",tabEcon:"📅 Экономика",tabEarn:"📊 Отчёты",lGainers:"Растут",lLosers:"Падают",lActive:"Самые активные",lShorted:"Больше всего шортов",loading:"Загрузка…",empty:"Сейчас нет данных",err:"Не удалось загрузить — попробуйте снова",ilNote:"⏱ Данные Тель-Авивской биржи задерживаются ~15 минут (TradingView). Данные в реальном времени — платный продукт биржи.",usNote:"Источник: Yahoo Finance",
econAll:"Все",econNote:"Время по вашему часовому поясу · Прогноз = консенсус экономистов · Факт обновляется сразу после публикации",forecast:"Прогноз",actual:"Факт",prior:"Пред.",earnEst:"Прогноз EPS",earnAct:"Факт",bmo:"До открытия",amc:"После закрытия",tbd:"Время не указано",today:"Сегодня",tomorrow:"Завтра",earnNote:"Крупнейшие компании, отчитывающиеся в ближайшие 14 дней · нажмите, чтобы открыть",
live:"LIVE",delayed:"⏱ Задержка ~15-20 мин",liveOn:"⚡ Цены в реальном времени",
boiT:"🏦 Официальный курс — Банк Израиля",boiNote:"Официальный курс публикуется раз в день · курсы ниже обновляются в течение дня",
tvT:"📐 Второе мнение — TradingView",tvAgree:"✅ Совпадает с нашим сигналом",tvDisagree:"⚠️ Не совпадает с нашим сигналом — осторожно",tvPartial:"➖ Частичное совпадение",tvMA:"Скользящие средние",tvOsc:"Осцилляторы",tvNote:"Публичный технический рейтинг TradingView (задержка до 15 мин). Два разных метода — когда они совпадают, сигнал сильнее."},
es:{mktBtn:"🔥 Mercado",mktT:"🔥 El mercado hoy",tabUS:"🇺🇸 EE. UU.",tabIL:"🇮🇱 Israel",tabEcon:"📅 Economía",tabEarn:"📊 Resultados",lGainers:"Suben",lLosers:"Bajan",lActive:"Más activas",lShorted:"Más en corto",loading:"Cargando…",empty:"Sin datos ahora",err:"No se pudo cargar — intenta de nuevo",ilNote:"⏱ Los datos de la Bolsa de Tel Aviv tienen ~15 minutos de retraso (TradingView). Los datos en tiempo real son un producto de pago.",usNote:"Fuente: Yahoo Finance",
econAll:"Todo",econNote:"Horas en tu zona horaria · Previsión = consenso de economistas · El dato real se actualiza al publicarse",forecast:"Previsión",actual:"Real",prior:"Anterior",earnEst:"BPA est.",earnAct:"Real",bmo:"Antes de la apertura",amc:"Tras el cierre",tbd:"Hora por confirmar",today:"Hoy",tomorrow:"Mañana",earnNote:"Mayores empresas que reportan en los próximos 14 días · toca para abrir",
live:"EN VIVO",delayed:"⏱ Retraso ~15-20 min",liveOn:"⚡ Precios en vivo",
boiT:"🏦 Tipo oficial — Banco de Israel",boiNote:"El tipo oficial se publica una vez al día · los tipos de abajo se actualizan durante el día",
tvT:"📐 Segunda opinión — TradingView",tvAgree:"✅ Coincide con nuestra señal",tvDisagree:"⚠️ No coincide con nuestra señal — precaución",tvPartial:"➖ Coincidencia parcial",tvMA:"Medias móviles",tvOsc:"Osciladores",tvNote:"Calificación técnica pública de TradingView (retraso hasta 15 min). Dos métodos distintos — si coinciden, la señal es más fuerte."},
ar:{mktBtn:"🔥 السوق",mktT:"🔥 السوق اليوم",tabUS:"🇺🇸 أمريكا",tabIL:"🇮🇱 إسرائيل",tabEcon:"📅 الاقتصاد",tabEarn:"📊 النتائج",lGainers:"الرابحة",lLosers:"الخاسرة",lActive:"الأكثر نشاطاً",lShorted:"الأكثر بيعاً على المكشوف",loading:"جارٍ التحميل…",empty:"لا بيانات الآن",err:"تعذر التحميل — حاول مجدداً",ilNote:"⏱ بيانات بورصة تل أبيب متأخرة ~15 دقيقة (TradingView). البيانات الفورية منتج مدفوع من البورصة.",usNote:"المصدر: Yahoo Finance",
econAll:"الكل",econNote:"الأوقات حسب منطقتك الزمنية · التوقع = إجماع الاقتصاديين · القيمة الفعلية تُحدَّث فور النشر",forecast:"التوقع",actual:"الفعلي",prior:"السابق",earnEst:"توقع EPS",earnAct:"الفعلي",bmo:"قبل الافتتاح",amc:"بعد الإغلاق",tbd:"الوقت غير محدد",today:"اليوم",tomorrow:"غداً",earnNote:"أكبر الشركات التي تعلن نتائجها خلال 14 يوماً · اضغط لفتح السهم",
live:"مباشر",delayed:"⏱ متأخر ~15-20 د",liveOn:"⚡ أسعار مباشرة",
boiT:"🏦 السعر الرسمي — بنك إسرائيل",boiNote:"السعر الرسمي يُنشر مرة يومياً · الأسعار أدناه تُحدَّث خلال اليوم",
tvT:"📐 رأي ثانٍ — TradingView",tvAgree:"✅ يتفق مع إشارتنا",tvDisagree:"⚠️ لا يتفق مع إشارتنا — يستحق الحذر",tvPartial:"➖ اتفاق جزئي",tvMA:"المتوسطات المتحركة",tvOsc:"المذبذبات",tvNote:"التقييم الفني العام من TradingView (متأخر حتى 15 دقيقة). طريقتان مختلفتان — عند اتفاقهما تكون الإشارة أقوى."}
};
function P5(k){var l=P5_T[curLang]||P5_T.en;return l[k]!=null?l[k]:(P5_T.en[k]!=null?P5_T.en[k]:k);}

/* מחירים במניות ת"א מגיעים באגורות (ILA) — מציגים בשקלים */
fmtPrice=function(n,cur){
  if(n==null||isNaN(n))return '—';
  if(cur==='ILA'){n=n/100;cur='ILS';}
  var sym=cur==='ILS'?'₪':cur==='EUR'?'€':cur==='GBP'?'£':'$';
  var d=Math.abs(n)<1?4:2;
  return sym+(Math.round(n*Math.pow(10,d))/Math.pow(10,d)).toLocaleString(undefined,{maximumFractionDigits:d});
};

/* ══ 1. PROTOBUF DECODER — PricingData (לפי pricing_pb2 של yfinance) ══ */
var PB_FIELDS={1:['id','s'],2:['price','f'],3:['time','z'],4:['currency','s'],5:['exchange','s'],6:['quoteType','i'],7:['marketHours','i'],8:['changePercent','f'],9:['dayVolume','z'],10:['dayHigh','f'],11:['dayLow','f'],12:['change','f'],13:['shortName','s'],15:['openPrice','f'],16:['previousClose','f'],23:['bid','f'],25:['ask','f'],27:['priceHint','z']};
function pbDecode(b64){
  var bin=atob(b64),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  var dv=new DataView(u.buffer),p=0,out={};
  function varint(){var r=0,m=1,b;do{b=u[p++];r+=(b&0x7f)*m;m*=128;}while(b&0x80&&p<u.length);return r;}
  while(p<u.length){
    var tag=varint(),fn=Math.floor(tag/8),wt=tag%8,def=PB_FIELDS[fn],val;
    if(wt===0){val=varint();if(def&&def[1]==='z')val=(val%2)?-(val+1)/2:val/2;}
    else if(wt===5){val=dv.getFloat32(p,true);p+=4;}
    else if(wt===1){val=dv.getFloat64(p,true);p+=8;}
    else if(wt===2){var len=varint();val=new TextDecoder().decode(u.subarray(p,p+len));p+=len;}
    else break;
    if(def)out[def[0]]=val;
  }
  return out;
}

/* ══ 2. LIVE STREAM — ישיר ← דרך ה-Worker ← רענון רגיל (בלי סיכון) ══ */
var LS={ws:null,mode:0,got:false,timer:null,hb:null,retry:0,prices:{},state:'off'};
function lsUrls(){return ['wss://streamer.finance.yahoo.com/?version=2',DATA_WORKER_URL.replace(/^https/,'wss')+'/?action=stream'];}
function lsSymbols(){
  var s=['^GSPC','^IXIC','^DJI','GC=F','CL=F','^VIX','BTC-USD','ETH-USD','SOL-USD','XRP-USD'].concat(TICKER_SYMBOLS);
  if(currentLiveSymbol&&!/\.TA$/.test(currentLiveSymbol))s.unshift(currentLiveSymbol);
  var out=[];s.forEach(function(x){if(x&&out.indexOf(x)<0&&!/\.TA$/.test(x))out.push(x);});return out.slice(0,40);
}
function lsConnect(){
  if(document.hidden||!('WebSocket' in window))return;
  if(LS.ws&&(LS.ws.readyState===0||LS.ws.readyState===1))return;
  var urls=lsUrls();if(LS.mode>=urls.length){LS.state='off';lsBadge();return;}
  var ws;try{ws=new WebSocket(urls[LS.mode]);}catch(e){LS.mode++;return setTimeout(lsConnect,500);}
  LS.ws=ws;LS.got=false;LS.state='connecting';
  ws.onopen=function(){lsSubscribe();clearInterval(LS.hb);LS.hb=setInterval(lsSubscribe,15000);
    clearTimeout(LS.timer);LS.timer=setTimeout(function(){if(!LS.got){try{ws.close();}catch(e){}}},12000);};
  ws.onmessage=function(ev){
    try{var m=JSON.parse(ev.data);if(!m.message)return;var d=pbDecode(m.message);if(!d.id||!d.price)return;
      if(!LS.got){LS.got=true;LS.retry=0;LS.state='live';}lsApply(d);}catch(e){}
  };
  ws.onclose=function(){clearInterval(LS.hb);LS.ws=null;
    if(!LS.got)LS.mode++;                       // לא הגיע אף מחיר → לנסות את הדרך הבאה
    LS.state='off';lsBadge();
    if(document.hidden)return;
    var wait=LS.got?Math.min(30000,2000*Math.pow(2,LS.retry++)):800;
    setTimeout(lsConnect,wait);
  };
  ws.onerror=function(){};
}
function lsSubscribe(){if(LS.ws&&LS.ws.readyState===1)try{LS.ws.send(JSON.stringify({subscribe:lsSymbols()}));}catch(e){}}
function lsRefocus(){lsSubscribe();}
document.addEventListener('visibilitychange',function(){
  if(document.hidden){if(LS.ws)try{LS.ws.close();}catch(e){}}
  else{LS.mode=0;LS.retry=0;setTimeout(lsConnect,300);}
});
function lsApply(d){
  var sym=d.id,price=d.price,prev=LS.prices[sym];LS.prices[sym]=price;
  var dir=prev==null?0:price>prev?1:price<prev?-1:0;
  // טיקר
  document.querySelectorAll('[data-lsp="'+cssEsc(sym)+'"]').forEach(function(el){
    el.textContent=(el.getAttribute('data-kind')==='num')?fmtNum(price):fmtPrice(price);if(dir)lsFlash(el,dir);});
  if(d.changePercent!=null)document.querySelectorAll('[data-lsc="'+cssEsc(sym)+'"]').forEach(function(el){
    el.textContent=fmtPct(d.changePercent);el.style.color=d.changePercent>=0?'var(--green)':'var(--red)';});
  // כרטיס המניה
  if(sym===currentLiveSymbol){
    var q=window.__lastLiveQuote;
    var pe=document.getElementById('lvPrice');if(pe){pe.textContent=fmtPrice(price,q&&q.currency);if(dir)lsFlash(pe,dir);}
    var ce=document.getElementById('lvChange');
    if(ce&&d.change!=null&&d.changePercent!=null){var up=d.change>=0;ce.textContent=(up?'▲ +':'▼ ')+(Math.round(d.change*100)/100)+' ('+fmtPct(d.changePercent)+')';ce.className='live-change '+(up?'up':'down');}
    if(q&&q.symbol===sym){q.regularPrice=price;if(d.changePercent!=null)q.regularChangePct=d.changePercent;}
    lsBadge();
  }
}
function cssEsc(s){return String(s).replace(/["\\]/g,'\\$&');}
function lsFlash(el,dir){el.classList.remove('ls-up','ls-down');void el.offsetWidth;el.classList.add(dir>0?'ls-up':'ls-down');}
function lsBadge(){
  var b=document.getElementById('lvLive');if(!b)return;
  if(currentLiveSymbol&&/\.TA$/.test(currentLiveSymbol)){b.className='live-badge delayed';b.textContent=P5('delayed');return;}
  var isLive=LS.state==='live'&&LS.prices[currentLiveSymbol]!=null;
  b.className='live-badge'+(isLive?' on':'');b.textContent=isLive?'● '+P5('live'):'';
}
function streamFocus(q){if(q&&q.symbol===currentLiveSymbol){lsBadge();lsRefocus();}}

/* ══ 3. MARKET SCREEN — עולות/יורדות/פעילות (ארה"ב + ת"א) ══ */
var MK={tab:'us',list:'day_gainers',ilSort:'gainers',econCountry:'all',cache:{}};
function openMarket(){renderMarket();openModal('marketOverlay');}
async function mkFetch(key,params){
  var c=MK.cache[key];if(c&&Date.now()-c.ts<5*60000)return c.d;
  var d=await workerFetch(params);MK.cache[key]={ts:Date.now(),d:d};return d;
}
function mkSet(k,v){MK[k]=v;renderMarket();}
function renderMarket(){
  var el=document.getElementById('marketBody');if(!el)return;
  var tabs=[['us','tabUS'],['il','tabIL'],['screen','tabScreen'],['econ','tabEcon'],['earn','tabEarn']];
  var h='<div class="mk-tabs">'+tabs.map(function(t){return '<button class="'+(MK.tab===t[0]?'on':'')+'" onclick="mkSet(\'tab\',\''+t[0]+'\')">'+(P5_T.en[t[1]]?P5(t[1]):(typeof P6==='function'?P6(t[1]):'🔎'))+'</button>';}).join('')+'</div>';
  var sub='';
  if(MK.tab==='us')sub=[['day_gainers','lGainers'],['day_losers','lLosers'],['most_actives','lActive'],['most_shorted_stocks','lShorted']].map(function(s){return '<button class="'+(MK.list===s[0]?'on':'')+'" onclick="mkSet(\'list\',\''+s[0]+'\')">'+P5(s[1])+'</button>';}).join('');
  if(MK.tab==='il')sub=[['gainers','lGainers'],['losers','lLosers'],['active','lActive']].map(function(s){return '<button class="'+(MK.ilSort===s[0]?'on':'')+'" onclick="mkSet(\'ilSort\',\''+s[0]+'\')">'+P5(s[1])+'</button>';}).join('');
  if(MK.tab==='econ')sub=[['all','econAll'],['US','🇺🇸 US'],['IL','🇮🇱 IL'],['EU','🇪🇺 EU'],['CN','🇨🇳 CN']].map(function(s){return '<button class="'+(MK.econCountry===s[0]?'on':'')+'" onclick="mkSet(\'econCountry\',\''+s[0]+'\')">'+(s[1].indexOf(' ')>0?s[1]:P5(s[1]))+'</button>';}).join('');
  if(sub)h+='<div class="mk-sub">'+sub+'</div>';
  h+='<div id="mkList" class="mk-list"><div class="ta-small">'+P5('loading')+'</div></div>';
  el.innerHTML=h;
  if(MK.tab==='us')mkLoadMovers('us:'+MK.list,'action=movers&list='+MK.list,P5('usNote'));
  else if(MK.tab==='il')mkLoadMovers('il:'+MK.ilSort,'action=ilmovers&sort='+MK.ilSort,P5('ilNote'));
  else if(MK.tab==='econ')mkLoadEcon();
  else if(MK.tab==='screen'){if(typeof renderScreener==='function')renderScreener();}
  else mkLoadEarn();
}
async function mkLoadMovers(key,params,note){
  var box=document.getElementById('mkList');
  try{
    var d=await mkFetch(key,params);if(!document.getElementById('mkList'))return;
    if(!d.items||!d.items.length){box.innerHTML='<div class="ta-small">'+P5('empty')+'</div>';return;}
    box.innerHTML=d.items.map(function(it){
      var c=it.changePct>=0?'var(--green)':'var(--red)';
      return '<div class="mk-row" onclick="closeModal(\'marketOverlay\');quickLive(\''+escHtml(it.symbol)+'\')">'
        +'<div class="mk-sym">'+escHtml(it.symbol.replace(/\.TA$/,''))+'</div><div class="mk-name">'+escHtml(it.name||'')+'</div>'
        +'<div class="mk-px">'+fmtPrice(it.price,it.currency)+'</div><div class="mk-chg" style="color:'+c+'">'+fmtPct(it.changePct)+'</div>'
        +'<div class="mk-vol">'+(it.volume?fmtNum(it.volume):'')+'</div></div>';
    }).join('')+'<div class="ta-note">'+note+'</div>';
  }catch(e){box.innerHTML='<div class="fv-warn">'+P5('err')+'</div>';}
}
function flagOf(cc){cc=String(cc||'').toUpperCase();if(cc==='EZ'||cc==='EMU')cc='EU';if(!/^[A-Z]{2}$/.test(cc))return '🌐';return String.fromCodePoint(0x1F1E6+cc.charCodeAt(0)-65,0x1F1E6+cc.charCodeAt(1)-65);}
function dayLabel(dt){var d=new Date(dt),t=new Date();t.setHours(0,0,0,0);var x=new Date(d);x.setHours(0,0,0,0);var diff=Math.round((x-t)/86400000);
  return diff===0?P5('today'):diff===1?P5('tomorrow'):d.toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'numeric'});}
function calNum(v){if(v==null||v==='')return '—';var n=Number(v);return isFinite(n)?String(Math.round(n*1000)/1000):escHtml(String(v));}
async function mkLoadEcon(){
  var box=document.getElementById('mkList');
  try{
    var d=await mkFetch('econ','action=calendar&type=economic_event&days=7');if(!document.getElementById('mkList'))return;
    var rows=(d.rows||[]).filter(function(r){var cc=String(r.country_code||'').toUpperCase();if(MK.econCountry==='all')return true;if(MK.econCountry==='EU')return ['EU','EZ','EMU','DE','FR','IT','ES'].indexOf(cc)>-1;return cc===MK.econCountry;});
    if(!rows.length){box.innerHTML='<div class="ta-small">'+P5('empty')+'</div>';return;}
    rows.sort(function(a,b){return new Date(a.startdatetime)-new Date(b.startdatetime);});
    var names=rows.map(function(r){return r.econ_release||'';}),tr=await trTexts(names);
    var h='',lastDay='';
    rows.slice(0,80).forEach(function(r,i){
      var dl=dayLabel(r.startdatetime);if(dl!==lastDay){h+='<div class="mk-day">'+dl+'</div>';lastDay=dl;}
      var t=new Date(r.startdatetime),tm=isNaN(t)?'':String(t.getHours()).padStart(2,'0')+':'+String(t.getMinutes()).padStart(2,'0');
      var act=r.after_release_actual,est=r.consensus_estimate,beat=(act!=null&&act!==''&&est!=null&&est!=='')?(Number(act)>=Number(est)):null;
      h+='<div class="ec-row"><div class="ec-time">'+tm+'</div><div class="ec-flag">'+flagOf(r.country_code)+'</div>'
        +'<div class="ec-main"><div class="ec-name">'+escHtml(tr[i]||r.econ_release||'')+(r.period?' <em>'+escHtml(r.period)+'</em>':'')+'</div>'
        +'<div class="ec-vals"><span>'+P5('forecast')+': <b>'+calNum(est)+'</b></span><span>'+P5('actual')+': <b style="color:'+(beat==null?'var(--text)':beat?'var(--green)':'var(--red)')+'">'+calNum(act)+'</b></span><span>'+P5('prior')+': '+calNum(r.prior_release_actual)+'</span></div></div></div>';
    });
    box.innerHTML=h+'<div class="ta-note">'+P5('econNote')+'</div>';
  }catch(e){box.innerHTML='<div class="fv-warn">'+P5('err')+'</div>';}
}
async function mkLoadEarn(){
  var box=document.getElementById('mkList');
  try{
    var d=await mkFetch('earn','action=calendar&type=sp_earnings&days=14');if(!document.getElementById('mkList'))return;
    var rows=(d.rows||[]).filter(function(r){return r.ticker;});
    if(!rows.length){box.innerHTML='<div class="ta-small">'+P5('empty')+'</div>';return;}
    rows.sort(function(a,b){return new Date(a.startdatetime)-new Date(b.startdatetime)||((b.intradaymarketcap||0)-(a.intradaymarketcap||0));});
    var h='',lastDay='';
    rows.slice(0,100).forEach(function(r){
      var dl=dayLabel(r.startdatetime);if(dl!==lastDay){h+='<div class="mk-day">'+dl+'</div>';lastDay=dl;}
      var tt=String(r.startdatetimetype||'').toUpperCase(),when=tt==='BMO'?P5('bmo'):tt==='AMC'?P5('amc'):P5('tbd');
      var sp=r.epssurprisepct,spc=sp==null||sp===''?'':(Number(sp)>=0?'var(--green)':'var(--red)');
      h+='<div class="mk-row" onclick="closeModal(\'marketOverlay\');quickLive(\''+escHtml(r.ticker)+'\')">'
        +'<div class="mk-sym">'+escHtml(r.ticker)+'</div><div class="mk-name">'+escHtml(r.companyshortname||'')+'<br><em>'+when+'</em></div>'
        +'<div class="mk-px">'+P5('earnEst')+'<br><b>'+calNum(r.epsestimate)+'</b></div>'
        +'<div class="mk-chg">'+(r.epsactual!=null&&r.epsactual!==''?P5('earnAct')+'<br><b style="color:'+spc+'">'+calNum(r.epsactual)+'</b>':'')+'</div>'
        +'<div class="mk-vol">'+(r.intradaymarketcap?fmtNum(r.intradaymarketcap):'')+'</div></div>';
    });
    box.innerHTML=h+'<div class="ta-note">'+P5('earnNote')+'</div>';
  }catch(e){box.innerHTML='<div class="fv-warn">'+P5('err')+'</div>';}
}

/* ══ 4. BANK OF ISRAEL — שער יציג רשמי בטאב המט"ח ══ */
var boiData=null;
async function loadBoi(){try{boiData=await workerFetch('action=boi');}catch(e){boiData=null;}}
var __origLoadFx=loadFxData;
loadFxData=async function(){await Promise.all([__origLoadFx(),loadBoi()]);renderFx();};
var __origRenderFx=renderFx;
renderFx=function(){
  __origRenderFx();
  if(fxTab!=='forex'||!boiData||!boiData.rates)return;
  var el=document.getElementById('fxContent');if(!el)return;
  var r=boiData.rates,cells=['USD','EUR','GBP','CHF'].filter(function(k){return r[k];}).map(function(k){
    return '<div class="fx-cell"><div class="fx-pair">'+k+'/ILS</div><div class="fx-rate">'+r[k].toFixed(3)+'</div></div>';}).join('');
  el.insertAdjacentHTML('afterbegin','<div class="boi-box"><div class="boi-head"><span>'+P5('boiT')+'</span><em>'+escHtml(boiData.date||'')+'</em></div><div class="fx-grid">'+cells+'</div><div class="ta-small">'+P5('boiNote')+'</div></div>');
};

/* ══ 5. SECOND OPINION — דירוג טכני של TradingView מול האיתות שלנו ══ */
function tvLabel(v){return v>=0.5?'sigStrongBuy':v>=0.1?'sigBuy':v>-0.1?'sigNeutral':v>-0.5?'sigSell':'sigStrongSell';}
function tvDir(v){return v>=0.1?1:v<=-0.1?-1:0;}
async function loadTvRating(symbol){
  var el=document.getElementById('lvTv');if(!el)return;window.__tvResult=null;
  try{
    var d=await workerFetch('action=tvrating&symbol='+encodeURIComponent(symbol));
    if(currentLiveSymbol!==symbol||!d.ok)return;
    window.__tvResult={symbol:symbol,d:d};
    var col=d.all>=0.1?'var(--green)':d.all>-0.1?'var(--gold)':'var(--red)';
    var t=window.__techResult,agree='';
    if(t&&t.symbol===symbol&&t.tech){
      var ours=t.tech.score>=0.75?1:t.tech.score<=-0.75?-1:0,theirs=tvDir(d.all);
      agree=ours===theirs?P5('tvAgree'):(ours*theirs<0?P5('tvDisagree'):P5('tvPartial'));
    }
    function mini(lbl,v){var c=v>=0.1?'var(--green)':v>-0.1?'var(--gold)':'var(--red)';return '<div class="ta-dim"><div class="ta-dim-lbl">'+lbl+'</div><div class="ta-dim-val" style="color:'+c+'">'+PT(tvLabel(v))+'</div></div>';}
    el.innerHTML='<div class="rec-trend-title">'+P5('tvT')+'</div>'
      +'<div class="ta-verdict" style="border-color:'+col+'"><div class="ta-verdict-lbl" style="color:'+col+'">'+PT(tvLabel(d.all))+' <span style="font-size:11px;opacity:.7">('+d.all+')</span></div>'
      +(agree?'<div class="ta-small" style="margin-top:0">'+agree+'</div>':'')+'</div>'
      +'<div class="ta-dims" style="grid-template-columns:1fr 1fr">'+mini(P5('tvMA'),d.ma)+mini(P5('tvOsc'),d.osc)+'</div>'
      +'<div class="ta-note">'+P5('tvNote')+'</div>';
    renderLiveTabs();applyLiveTabs();
  }catch(e){}
}
var __origExtraCtx=buildExtraContext;
buildExtraContext=function(symbol){
  var s=__origExtraCtx(symbol),tv=window.__tvResult;
  if(tv&&tv.symbol===symbol)s+='TRADINGVIEW TECHNICAL RATING (independent method): overall '+tv.d.all+' ('+P1_T.en[tvLabel(tv.d.all)]+'), moving averages '+tv.d.ma+', oscillators '+tv.d.osc+'.\n';
  return s;
};
function p5Labels(){var b=document.getElementById('btnMarket');if(b)b.textContent=P5('mktBtn');var t=document.getElementById('marketTitle');if(t)t.textContent=P5('mktT');}
;(window.__MODS=window.__MODS||{})['app-live']=1;

/* StockAI · app-import.js — 📷 import holdings from a broker screenshot (vision AI with the user's own key) ·
   the AI only reads; every symbol is checked against live quotes, the user reviews and confirms before anything is saved.
   AppNest © 2026 · load order: after app-lens.js, before app-init.js */
var P12_T={
he:{btn:"📷 ייבוא מצילום מסך",t:"📷 ייבוא תיק מצילום מסך",intro:"צלם מסך של רשימת האחזקות באפליקציית הברוקר או הבנק, ובחר אותו כאן. הבינה תקרא את המניות, הכמויות ומחירי הקנייה — ואתה תאשר לפני שמשהו נשמר.",
  privacy:"🔐 התמונה נשלחת ישירות מהמכשיר לספק ה-AI שלך, ולא נשמרת באפליקציה. כדאי לחתוך ממנה מספר חשבון ופרטים אישיים.",
  pick:"בחר צילום מסך",noAi:"כדי לקרוא צילום מסך צריך חיבור AI (Gemini חינמי מספיק).",connect:"🤖 חבר AI",noVision:"ספק ה-AI שבחרת לא תומך בתמונות. נסה Gemini, Claude או ChatGPT.",
  reading:"קורא את התמונה…",checking:"בודק את הסימולים מול נתוני השוק…",fail:"לא הצלחתי לקרוא אחזקות מהתמונה. נסה צילום חד יותר, שבו רואים שם מניה, כמות ומחיר קנייה.",
  found:"נמצאו {n} אחזקות. בדוק ותקן לפני הייבוא:",cSym:"סימול",cQty:"כמות",cBuy:"מחיר קנייה",cNow:"עכשיו",
  okSym:"✓ נמצא",badSym:"⚠ סימול לא נמצא — תקן",guess:"⚠ ניחוש — בדוק",noBuy:"⚠ חסר מחיר קנייה",ilsNote:"מניות ת\"א: מחיר הקנייה בשקלים (לא באגורות).",
  exists:"קיים בתיק — יוחלף",doImport:"ייבא {n} אחזקות",cancel:"ביטול",imported:"יובאו {n} אחזקות",retry:"בחר תמונה אחרת",
  rule:"האחזקות שמסומנות יישמרו. אחזקה שכבר קיימת בתיק תוחלף בערכים מהתמונה (לא תתווסף פעמיים)."},
en:{btn:"📷 Import from screenshot",t:"📷 Import portfolio from a screenshot",intro:"Take a screenshot of the holdings list in your broker or bank app and pick it here. The AI reads the stocks, quantities and buy prices — and you confirm before anything is saved.",
  privacy:"🔐 The image goes directly from your device to your AI provider and is not stored in the app. Crop out your account number and personal details.",
  pick:"Pick a screenshot",noAi:"Reading a screenshot needs an AI connection (free Gemini is enough).",connect:"🤖 Connect AI",noVision:"Your AI provider does not support images. Try Gemini, Claude or ChatGPT.",
  reading:"Reading the image…",checking:"Checking the symbols against market data…",fail:"Could not read holdings from the image. Try a sharper screenshot that shows the stock name, quantity and buy price.",
  found:"Found {n} holdings. Check and fix before importing:",cSym:"Symbol",cQty:"Qty",cBuy:"Buy price",cNow:"Now",
  okSym:"✓ Found",badSym:"⚠ Symbol not found — fix it",guess:"⚠ A guess — check it",noBuy:"⚠ Buy price missing",ilsNote:"Tel Aviv stocks: buy price in shekels (not agorot).",
  exists:"Already in portfolio — will be replaced",doImport:"Import {n} holdings",cancel:"Cancel",imported:"{n} holdings imported",retry:"Pick another image",
  rule:"Checked holdings are saved. A holding already in the portfolio is replaced by the values from the image (not added twice)."},
ru:{btn:"📷 Импорт со скриншота",t:"📷 Импорт портфеля со скриншота",intro:"Сделайте скриншот списка позиций в приложении брокера или банка и выберите его здесь. ИИ прочитает акции, количество и цены покупки — а вы подтвердите перед сохранением.",
  privacy:"🔐 Изображение отправляется прямо с устройства вашему провайдеру ИИ и не хранится в приложении. Обрежьте номер счёта и личные данные.",
  pick:"Выбрать скриншот",noAi:"Для чтения скриншота нужно подключение ИИ (бесплатного Gemini достаточно).",connect:"🤖 Подключить ИИ",noVision:"Ваш провайдер ИИ не поддерживает изображения. Попробуйте Gemini, Claude или ChatGPT.",
  reading:"Читаю изображение…",checking:"Проверяю тикеры по рыночным данным…",fail:"Не удалось прочитать позиции. Попробуйте более чёткий скриншот с названием, количеством и ценой покупки.",
  found:"Найдено позиций: {n}. Проверьте и исправьте перед импортом:",cSym:"Тикер",cQty:"Кол-во",cBuy:"Цена покупки",cNow:"Сейчас",
  okSym:"✓ Найден",badSym:"⚠ Тикер не найден — исправьте",guess:"⚠ Предположение — проверьте",noBuy:"⚠ Нет цены покупки",ilsNote:"Акции Тель-Авива: цена покупки в шекелях (не в агорот).",
  exists:"Уже в портфеле — будет заменено",doImport:"Импортировать: {n}",cancel:"Отмена",imported:"Импортировано: {n}",retry:"Выбрать другое изображение",
  rule:"Отмеченные позиции сохраняются. Позиция, уже имеющаяся в портфеле, заменяется значениями из изображения (не добавляется дважды)."},
es:{btn:"📷 Importar de captura",t:"📷 Importar cartera desde una captura",intro:"Haz una captura de la lista de posiciones en la app de tu bróker o banco y elígela aquí. La IA lee las acciones, cantidades y precios de compra — y tú confirmas antes de guardar nada.",
  privacy:"🔐 La imagen va directamente de tu dispositivo a tu proveedor de IA y no se guarda en la app. Recorta el número de cuenta y los datos personales.",
  pick:"Elegir captura",noAi:"Leer una captura necesita conexión de IA (Gemini gratis basta).",connect:"🤖 Conectar IA",noVision:"Tu proveedor de IA no admite imágenes. Prueba Gemini, Claude o ChatGPT.",
  reading:"Leyendo la imagen…",checking:"Comprobando los símbolos con datos de mercado…",fail:"No pude leer posiciones de la imagen. Prueba una captura más nítida con nombre, cantidad y precio de compra.",
  found:"Se encontraron {n} posiciones. Revisa y corrige antes de importar:",cSym:"Símbolo",cQty:"Cant.",cBuy:"Precio compra",cNow:"Ahora",
  okSym:"✓ Encontrado",badSym:"⚠ Símbolo no encontrado — corrígelo",guess:"⚠ Suposición — revísalo",noBuy:"⚠ Falta precio de compra",ilsNote:"Acciones de Tel Aviv: precio de compra en séqueles (no agorot).",
  exists:"Ya está en la cartera — se reemplazará",doImport:"Importar {n} posiciones",cancel:"Cancelar",imported:"{n} posiciones importadas",retry:"Elegir otra imagen",
  rule:"Las posiciones marcadas se guardan. Una posición que ya está en la cartera se reemplaza con los valores de la imagen (no se suma dos veces)."},
ar:{btn:"📷 استيراد من لقطة شاشة",t:"📷 استيراد المحفظة من لقطة شاشة",intro:"التقط صورة لقائمة الأسهم في تطبيق الوسيط أو البنك واخترها هنا. سيقرأ الذكاء الاصطناعي الأسهم والكميات وأسعار الشراء — وأنت تؤكد قبل حفظ أي شيء.",
  privacy:"🔐 تُرسل الصورة مباشرة من جهازك إلى مزود الذكاء الاصطناعي ولا تُحفظ في التطبيق. اقطع رقم الحساب والتفاصيل الشخصية.",
  pick:"اختر لقطة شاشة",noAi:"قراءة لقطة الشاشة تحتاج اتصال ذكاء اصطناعي (Gemini المجاني يكفي).",connect:"🤖 اربط الذكاء الاصطناعي",noVision:"مزودك لا يدعم الصور. جرّب Gemini أو Claude أو ChatGPT.",
  reading:"أقرأ الصورة…",checking:"أتحقق من الرموز مقابل بيانات السوق…",fail:"تعذرت قراءة الأسهم من الصورة. جرّب لقطة أوضح تظهر الاسم والكمية وسعر الشراء.",
  found:"وُجدت {n} أسهم. راجع وصحّح قبل الاستيراد:",cSym:"الرمز",cQty:"الكمية",cBuy:"سعر الشراء",cNow:"الآن",
  okSym:"✓ موجود",badSym:"⚠ الرمز غير موجود — صحّحه",guess:"⚠ تخمين — تحقق منه",noBuy:"⚠ سعر الشراء ناقص",ilsNote:"أسهم تل أبيب: سعر الشراء بالشيكل (لا بالأغورا).",
  exists:"موجود في المحفظة — سيُستبدل",doImport:"استيراد {n} أسهم",cancel:"إلغاء",imported:"تم استيراد {n} أسهم",retry:"اختر صورة أخرى",
  rule:"الأسهم المحددة تُحفظ. السهم الموجود في المحفظة يُستبدل بقيم الصورة (لا يُضاف مرتين)."}
};
function P12(k,o){var l=P12_T[curLang]||P12_T.en,s=l[k]!=null?l[k]:(P12_T.en[k]!=null?P12_T.en[k]:k);for(var x in (o||{}))s=s.split('{'+x+'}').join(o[x]);return s;}

var IMP={rows:[]};
function impShell(inner){var el=document.getElementById('pfBody');if(!el)return null;el.innerHTML='<div class="rec-trend-title">'+P12('t')+'</div>'+inner;return el;}
function openImport(){
  PF.tab='pf';
  if(!document.getElementById('pfOverlay').classList.contains('open'))openModal('pfOverlay');
  var p=loadAIConfig().provider;
  if(!p){impShell('<div class="ta-small" style="margin:8px 0">'+P12('noAi')+'</div><div class="sb-actions"><button class="btn-ai-analyze" onclick="openSetup()">'+P12('connect')+'</button><button onclick="renderPortfolio()">'+P12('cancel')+'</button></div>');return;}
  impShell('<div class="ta-small" style="margin:8px 0;line-height:1.7">'+P12('intro')+'</div><div class="imp-priv">'+P12('privacy')+'</div>'
    +'<input type="file" id="impFile" accept="image/*" style="display:none" onchange="impFile(event)">'
    +'<div class="sb-actions" style="margin-top:12px"><button class="btn-ai-analyze" onclick="document.getElementById(\'impFile\').click()">'+P12('pick')+'</button><button onclick="renderPortfolio()">'+P12('cancel')+'</button></div><div id="impStatus"></div>');
}
/* shrink the image (fewer tokens, faster) — max 1600px, JPEG */
function impDownscale(file){
  return new Promise(function(resolve,reject){
    var fr=new FileReader();fr.onerror=reject;
    fr.onload=function(){var img=new Image();img.onerror=reject;img.onload=function(){
      var s=Math.min(1,1600/Math.max(img.width,img.height)),cv=document.createElement('canvas');cv.width=Math.round(img.width*s);cv.height=Math.round(img.height*s);
      cv.getContext('2d').drawImage(img,0,0,cv.width,cv.height);
      resolve({mime:'image/jpeg',b64:cv.toDataURL('image/jpeg',0.88).split(',')[1]});};img.src=fr.result;};
    fr.readAsDataURL(file);
  });
}
var IMP_PROMPT='This image is a screenshot from a brokerage or bank app listing stock holdings (it may be in Hebrew, English or another language).\n'
  +'Extract EVERY stock/ETF holding you can see. Return JSON only, no prose, in exactly this shape:\n'
  +'{"holdings":[{"name":"name as shown","symbol":"ticker or null","exchange":"US|TASE|OTHER","qty":number or null,"avgPrice":number or null,"currency":"USD|ILS|ILA|OTHER","confidence":"high|low"}]}\n'
  +'Rules: qty = number of shares/units. avgPrice = AVERAGE PURCHASE PRICE per share (cost basis) — NOT the current price, NOT the total value, NOT the gain. If no purchase price is visible, use null.\n'
  +'Tel Aviv (TASE) holdings: symbol = the Yahoo Finance symbol ending in .TA if you know it (e.g. TEVA.TA, LUMI.TA, POLI.TA), else null. Israeli apps often show prices in agorot (אג\') — then currency "ILA".\n'
  +'US holdings: symbol = the plain ticker (AAPL, MSFT). confidence "low" when you guessed the ticker from the name.\n'
  +'Never invent numbers: use null for anything you cannot read clearly. Skip cash, totals and bonds.';
function impParse(txt){
  var t=String(txt||'').replace(/```json|```/g,'');var a=t.indexOf('{'),b=t.lastIndexOf('}');
  if(a>=0&&b>a){try{var o=JSON.parse(t.slice(a,b+1));if(o&&Array.isArray(o.holdings))return o.holdings;}catch(e){}}
  a=t.indexOf('[');b=t.lastIndexOf(']');if(a>=0&&b>a){try{var arr=JSON.parse(t.slice(a,b+1));if(Array.isArray(arr))return arr;}catch(e){}}
  return null;
}
function impNum(x){if(x==null||x==='')return null;var n=typeof x==='number'?x:parseFloat(String(x).replace(/[^0-9.\-]/g,''));return isFinite(n)?n:null;}
async function impFile(ev){
  var f=ev.target.files&&ev.target.files[0];if(!f)return;ev.target.value='';
  var st=document.getElementById('impStatus');if(!st)return;
  var p=loadAIConfig().provider;
  st.innerHTML='<div class="ta-small" style="margin-top:10px">⏳ '+P12('reading')+'</div>';
  var list=null;
  try{
    var img=await impDownscale(f);
    var txt=await aiText('You read financial screenshots and return strict JSON.',IMP_PROMPT,{image:img,maxTokens:3000});
    list=impParse(txt);
  }catch(e){
    var m=String(e&&e.message||'');
    st.innerHTML='<div class="fv-warn" style="margin-top:10px">'+((p==='device'||p==='custom'||/image|vision|multimodal|content type/i.test(m))?P12('noVision'):P12('fail'))+'</div><button class="model-refresh" style="margin-top:8px" onclick="document.getElementById(\'impFile\').click()">'+P12('retry')+'</button>';
    return;
  }
  if(!list||!list.length){st.innerHTML='<div class="fv-warn" style="margin-top:10px">'+P12('fail')+'</div><button class="model-refresh" style="margin-top:8px" onclick="document.getElementById(\'impFile\').click()">'+P12('retry')+'</button>';return;}
  IMP.rows=list.slice(0,60).map(function(h,i){
    var sym=String(h.symbol||'').toUpperCase().replace(/[^A-Z0-9.\-]/g,'');
    var tase=/TASE|TLV|TA$/i.test(String(h.exchange||''))||h.currency==='ILA'||h.currency==='ILS';
    if(sym&&tase&&!/\.TA$/.test(sym))sym+='.TA';
    var buy=impNum(h.avgPrice);if(buy!=null&&h.currency==='ILA')buy=Math.round(buy)/100;   // agorot → shekels
    return {i:i,name:String(h.name||'').slice(0,60),sym:sym,qty:impNum(h.qty),buy:buy,low:h.confidence==='low'||!sym,found:null,now:null,cur:null,on:true};
  });
  st.innerHTML='<div class="ta-small" style="margin-top:10px">⏳ '+P12('checking')+'</div>';
  await impVerify();
  impRender();
}
async function impVerify(){
  var syms=IMP.rows.map(function(r){return r.sym;}).filter(Boolean);
  var got={};
  if(syms.length){try{var d=await workerFetch('action=quotes&symbols='+encodeURIComponent(syms.join(',')));(d.quotes||[]).forEach(function(q){if(q&&q.symbol&&q.price!=null)got[q.symbol]=q;});}catch(e){}}
  IMP.rows.forEach(function(r){var q=got[r.sym];r.found=!!q;r.now=q?q.price/qsUnit(q):null;r.cur=q?qsCur(q):null;
    r.on=r.found&&r.qty>0&&r.buy>0;});
}
function impRowOk(r){return r.found&&r.qty>0&&r.buy>0;}
function impRender(){
  var el=document.getElementById('pfBody');if(!el)return;
  var have={};pfLoad().forEach(function(x){have[x.sym]=1;});
  var n=IMP.rows.filter(function(r){return r.on&&impRowOk(r);}).length,anyTA=IMP.rows.some(function(r){return /\.TA$/.test(r.sym);});
  var h='<div class="rec-trend-title">'+P12('t')+'</div><div class="ta-small" style="margin:6px 0 10px">'+P12('found',{n:IMP.rows.length})+'</div><div class="imp-list">';
  IMP.rows.forEach(function(r){
    var flags=[];
    if(!r.found)flags.push('<span class="bad">'+P12('badSym')+'</span>');else if(r.low)flags.push('<span class="warn">'+P12('guess')+'</span>');else flags.push('<span class="ok">'+P12('okSym')+'</span>');
    if(!(r.buy>0))flags.push('<span class="warn">'+P12('noBuy')+'</span>');
    if(have[r.sym])flags.push('<span class="warn">'+P12('exists')+'</span>');
    h+='<div class="imp-row'+(r.on?'':' off')+'"><label class="imp-chk"><input type="checkbox"'+(r.on?' checked':'')+(impRowOk(r)?'':' disabled')+' onchange="IMP.rows['+r.i+'].on=this.checked;impRender()"></label>'
      +'<div class="imp-main"><div class="imp-name">'+escHtml(r.name||r.sym||'?')+'</div>'
      +'<div class="imp-fields"><label><span>'+P12('cSym')+'</span><input class="key-input" value="'+escHtml(r.sym)+'" onchange="impEdit('+r.i+',\'sym\',this.value)"></label>'
      +'<label><span>'+P12('cQty')+'</span><input class="key-input" type="number" step="any" value="'+(r.qty!=null?r.qty:'')+'" onchange="impEdit('+r.i+',\'qty\',this.value)"></label>'
      +'<label><span>'+P12('cBuy')+'</span><input class="key-input" type="number" step="any" value="'+(r.buy!=null?r.buy:'')+'" onchange="impEdit('+r.i+',\'buy\',this.value)"></label>'
      +'<label><span>'+P12('cNow')+'</span><b>'+(r.now!=null?fmtPrice(r.now,r.cur):'—')+'</b></label></div>'
      +'<div class="imp-flags">'+flags.join('')+'</div></div></div>';
  });
  h+='</div>'+(anyTA?'<div class="ta-note">'+P12('ilsNote')+'</div>':'')+'<div class="ta-note">'+P12('rule')+'</div>'
    +'<div class="sb-actions" style="margin-top:12px"><button class="btn-ai-analyze" onclick="impCommit()"'+(n?'':' disabled')+'>'+P12('doImport',{n:n})+'</button><button onclick="renderPortfolio()">'+P12('cancel')+'</button><button onclick="openImport()">'+P12('retry')+'</button></div>';
  el.innerHTML=h;
}
async function impEdit(i,k,val){
  var r=IMP.rows[i];if(!r)return;
  if(k==='sym'){r.sym=String(val||'').toUpperCase().trim();r.low=false;await impVerify();}
  else{r[k]=impNum(val);r.on=impRowOk(r);}
  impRender();
}
function impCommit(){
  var rows=IMP.rows.filter(function(r){return r.on&&impRowOk(r);});if(!rows.length)return;
  var before=pfLoad(),a=JSON.parse(JSON.stringify(before)),today=_ymd();
  rows.forEach(function(r,k){
    var ex=a.filter(function(x){return x.sym===r.sym;})[0];
    if(ex){ex.qty=r.qty;ex.buy=Math.round(r.buy*10000)/10000;}
    else a.push({id:Date.now()+k,sym:r.sym,qty:r.qty,buy:Math.round(r.buy*10000)/10000,date:''});
  });
  pfSave(a);IMP.rows=[];renderPortfolio();
  qsRefresh(rows.map(function(r){return r.sym;}));try{lsResubscribe();}catch(e){}
  undoToast(P12('imported',{n:rows.length}),function(){pfSave(before);renderPortfolio();});
}
/* the button — next to "+ Add holding", and on the empty portfolio screen */
(function(){
  var rp=renderPortfolio;
  renderPortfolio=function(){
    var r=rp.apply(this,arguments);
    try{
      if(PF.tab!=='pf')return r;
      var body=document.getElementById('pfBody');if(!body||document.getElementById('impBtn'))return r;
      var b=document.createElement('button');b.id='impBtn';b.textContent=P12('btn');b.onclick=openImport;
      var row=body.querySelector('.sb-actions');
      if(row)row.insertBefore(b,row.children[1]||null);
      else{b.className='imp-big';body.appendChild(b);}
    }catch(e){}
    return r;
  };
})();
;(window.__MODS=window.__MODS||{})['app-import']=1;

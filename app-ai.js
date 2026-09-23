/* StockAI · app-ai.js — AI layer: provider calls, model chains & live lists, key cleaning, analysis prompt
   AppNest © 2026 · load order matters: see <script> tags in stock-analyzer.html */
/* ══════════════════════════════════════════════════
   CORE AI FETCH
══════════════════════════════════════════════════ */
var analysisHistory=[];
try{analysisHistory=JSON.parse(localStorage.getItem('stockai_history'))||[];}catch(e){analysisHistory=[];}
function persistHistory(){try{localStorage.setItem('stockai_history',JSON.stringify(analysisHistory.slice(0,5)));}catch(e){}}
var currentSymbol='';
function quickAnalyze(sym){document.getElementById('stockInput').value=sym;loadLiveData(sym);}

async function analyzeStock(forceSym){
  var symbol=forceSym||(document.getElementById('stockInput').value.trim().toUpperCase());
  if(!symbol)return;
  var cfg=loadAIConfig();
  if(!cfg.provider){
    if(currentLiveSymbol!==symbol)loadLiveData(symbol);
    showError(T('errNoAI'));openSetup();return;
  }
  currentSymbol=symbol;
  setLoading(true,symbol);hideStaleBar();
  try{
    // קריטי: ממתינים לנתונים החיים לפני ה-AI — כדי שהמחיר האמיתי יוזרק לניתוח!
    if(!window.__lastLiveQuote||window.__lastLiveQuote.symbol!==symbol){
      try{await loadLiveData(symbol);}catch(e){/* נתונים חיים אופציונליים */}
    }
    if(window.__extrasPromise){try{await Promise.race([window.__extrasPromise,new Promise(function(r){setTimeout(r,8000);})]);}catch(e){}}
    var result=await fetchAnalysis(symbol);
    cacheAnalysis(symbol,result);
    renderResult(result,symbol);
    addToHistory(symbol,result);
    try{recordPrediction(symbol,result);}catch(e){}
    if(isStale(symbol)){var e=getAnalysisCache()[symbol];if(e)showStaleBar(symbol,e.ts);}
  }catch(err){
    var em=String(err.message||'');
    if(/quota|429|exhaust|rate.?limit|overload|503/i.test(em)){
      showError(QUOTA_T[curLang]||QUOTA_T.en);
    }else{
      showError(T('errGeneral')+': '+em);
    }
  }
  finally{setLoading(false,symbol);}
}

var QUOTA_T={
  he:'⏳ כל המפתחות מיצו את המכסה הרגעית (או שהשרתים עמוסים). המתן דקה ונסה שוב — זה יעבוד!',
  en:'⏳ All keys hit their per-minute quota (or servers are busy). Wait a minute and try again — it will work!',
  ru:'⏳ Все ключи исчерпали минутную квоту (или серверы перегружены). Подождите минуту и попробуйте снова!',
  es:'⏳ Todas las claves alcanzaron su cuota por minuto (o los servidores están ocupados). ¡Espera un minuto e intenta de nuevo!',
  ar:'⏳ استنفدت جميع المفاتيح حصتها الدقيقية (أو الخوادم مشغولة). انتظر دقيقة وحاول مجدداً!'
};

/* AI response language — ה-AI עונה בשפת הממשק */
var AI_LANG_NAMES={he:'Hebrew',en:'English',ru:'Russian',es:'Spanish',ar:'Arabic'};
function aiLangInstruction(){
  if(curLang==='en')return '';
  return 'IMPORTANT: Write all free-text values (summary, bottomLine, bullishFactors, bearishFactors, profiles notes, masters notes, vetoes, analystRating, sources) in '+(AI_LANG_NAMES[curLang]||'English')+'. Keep JSON keys and enum values (BUY/SELL/HOLD, POSITIVE/NEUTRAL/NEGATIVE, UP/DOWN, LOW/MEDIUM/HIGH) in English exactly as specified. ';
}

/* Build real-time data context for AI prompt injection */
function buildLiveContext(symbol){
  var q=window.__lastLiveQuote;
  if(!q||q.symbol!==symbol)return aiLangInstruction();
  var parts=['REAL-TIME MARKET DATA (from Yahoo Finance, fetched '+new Date().toLocaleString()+'):'];
  if(q.regularPrice!=null)parts.push('Current price: '+q.regularPrice+' '+(q.currency||'USD')+' ('+fmtPct(q.regularChangePct)+' today)');
  if(q.open!=null)parts.push('Open: '+q.open+', Day range: '+q.dayLow+'-'+q.dayHigh);
  if(q.week52Low!=null)parts.push('52-week range: '+q.week52Low+'-'+q.week52High);
  if(q.marketCap)parts.push('Market cap: '+fmtNum(q.marketCap));
  if(q.peRatio)parts.push('P/E: '+Math.round(q.peRatio*100)/100+(q.eps?', EPS: '+Math.round(q.eps*100)/100:''));
  if(q.volume)parts.push('Volume: '+fmtNum(q.volume)+(q.avgVolume?' (avg: '+fmtNum(q.avgVolume)+')':''));
  if(q.targetMean)parts.push('Analyst mean target: '+q.targetMean+(q.recommendationKey?', consensus: '+q.recommendationKey:'')+(q.numberOfAnalysts?' ('+q.numberOfAnalysts+' analysts)':''));
  if(q.dividendYield)parts.push('Dividend yield: '+(Math.round(q.dividendYield*10000)/100)+'%');
  if(q.beta)parts.push('Beta: '+Math.round(q.beta*100)/100);
  if(q.sector)parts.push('Sector: '+q.sector+(q.industry?' / '+q.industry:''));
  if(q.earningsDate)parts.push('Next earnings: '+q.earningsDate);
  return parts.join('\n')+buildExtraContext(symbol)+buildPhase3Context(symbol)+'\n\nUse this VERIFIED real-time data as the factual basis for prices and fundamentals. '+aiLangInstruction();
}

/* ══════════════════════════════════════════════════════════════
   AI CORE v2 — לפי מסמך הדרישות AppNest v10, "כלל הזהב":
   שמות מודלים מתיישנים → ברירת מחדל עדכנית + שרשרת גיבוי + רשימה חיה למפתח
══════════════════════════════════════════════════════════════ */
/* ניקוי מפתח — תווים נסתרים מהעתק-הדבק שוברים את הקריאה (400/401) */
function cleanKey(k){return String(k||'').replace(/[^\x21-\x7E]/g,'');}
function splitKeys(raw){return String(raw||'').split(/[\n,;\s]+/).map(cleanKey).filter(function(k){return k.length>=16;});}
function firstKey(raw){return splitKeys(raw)[0]||cleanKey(raw);}
function getGeminiKeys(){return splitKeys(loadAIConfig().geminiKey);}

var AI_DEFAULT_MODELS={
  gemini:['gemini-flash-latest','gemini-2.5-flash','gemini-flash-lite-latest','gemini-2.5-flash-lite','gemini-pro-latest'],
  claude:['claude-sonnet-5','claude-haiku-4-5-20251001','claude-opus-5-5'],
  openai:['gpt-4o-mini','gpt-4.1-mini','gpt-4o']
};
function getChosenModel(p){return localStorage.getItem('stockai_model_'+p)||'';}
function getLiveModels(p){try{return JSON.parse(localStorage.getItem('stockai_models_'+p))||[];}catch(e){return [];}}
function modelChain(p){
  var out=[];
  var ov=(window.__modelOv&&window.__modelOv.p===p)?window.__modelOv.m:null;
  [ov!=null?ov:getChosenModel(p),localStorage.getItem('stockai_worked_'+p)||''].concat(AI_DEFAULT_MODELS[p]||[]).concat(getLiveModels(p).slice(0,4))
    .forEach(function(m){if(m&&out.indexOf(m)<0)out.push(m);});
  return out;
}
function modelGone(status,msg){return status===404||(status===400&&/model|not found|not supported|deprecat|no longer|unknown/i.test(msg||''));}
function busy(status){return status===429||status===500||status===502||status===503||status===529;}
async function errMsg(res){var e=await res.json().catch(function(){return{};});return (e.error&&(e.error.message||e.error.type))||('HTTP '+res.status);}
function httpErr(status,msg){var er=new Error(msg);er.status=status;return er;}

/* ── Gemini: מודל × וריאנט (חיפוש חי → בלי חיפוש → בלי הגדרת חשיבה) ── */
async function geminiCall(apiKey,promptText,maxTokens,opts){
  opts=opts||{};
  var models=modelChain('gemini'),lastErr=null;
  for(var i=0;i<models.length;i++){
    var m=models[i],canNoThink=/flash/.test(m);
    var tries=[];
    if(opts.search)tries.push({s:true,nt:canNoThink});
    tries.push({s:false,nt:canNoThink});
    if(canNoThink)tries.push({s:false,nt:false});
    var nextModel=false;
    for(var t=0;t<tries.length&&!nextModel;t++){
      var tr=tries[t],gc={temperature:0.3,maxOutputTokens:Math.max(maxTokens||2000,8192)};
      if(tr.nt)gc.thinkingConfig={thinkingBudget:0};
      var body={contents:[{parts:[{text:promptText}]}],generationConfig:gc};
      if(tr.s)body.tools=[{google_search:{}}];
      var res;
      try{res=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+m+':generateContent?key='+encodeURIComponent(apiKey),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});}
      catch(ne){lastErr=ne;nextModel=true;break;}
      if(res.ok){
        var data=await res.json();
        var parts=(data.candidates&&data.candidates[0]&&data.candidates[0].content&&data.candidates[0].content.parts)||[];
        var text=parts.filter(function(p){return p&&p.text&&!p.thought;}).map(function(p){return p.text;}).join('\n');
        if(text){localStorage.setItem('stockai_worked_gemini',m);data.__text=text;data.__model=m;return data;}
        lastErr=new Error('Empty response ('+m+')');continue; // נשרף על חשיבה — וריאנט הבא
      }
      var msg=await errMsg(res);lastErr=httpErr(res.status,msg);
      if(res.status===401||res.status===403||/api key/i.test(msg))throw lastErr;          // בעיית מפתח → המפתח הבא
      if(modelGone(res.status,msg)){nextModel=true;break;}                             // מודל מת → המודל הבא
      if(res.status===429&&tr.s)continue;                                             // מכסת חיפוש → בלי חיפוש
      if(busy(res.status)){nextModel=true;break;}                                      // עומס/מכסה → המודל הבא
      if(res.status===400)continue;                                                   // פרמטר לא נתמך → וריאנט הבא
      throw lastErr;
    }
  }
  throw lastErr||new Error('No Gemini model available');
}
var __geminiKeyIdx=parseInt(localStorage.getItem('stockai_gemini_keyidx')||'0')||0;
async function geminiCallMulti(keys,promptText,maxTokens,opts){
  keys=(keys||[]).map(cleanKey).filter(Boolean);
  if(!keys.length)throw new Error('No Gemini API key');
  var start=__geminiKeyIdx%keys.length,lastErr=null;
  for(var k=0;k<keys.length;k++){
    var idx=(start+k)%keys.length;
    try{var r=await geminiCall(keys[idx],promptText,maxTokens,opts);__geminiKeyIdx=idx;localStorage.setItem('stockai_gemini_keyidx',String(idx));return r;}
    catch(e){lastErr=e;var msg=String(e.message||'').toLowerCase();
      if(!(e.status===429||e.status===401||e.status===403||/quota|rate|exhaust|api key|invalid|permission|model/.test(msg)))throw e;}
  }
  throw lastErr;
}

/* ── Claude: שרשרת מודלים + חיפוש אינטרנט עם נפילה חיננית ── */
async function claudeCall(key,system,user,maxTokens,opts){
  opts=opts||{};key=firstKey(key);if(!key)throw new Error('Claude API key not set');
  var hd={'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'};
  var models=modelChain('claude'),lastErr=null;
  for(var i=0;i<models.length;i++){
    var m=models[i],tries=opts.search?[true,false]:[false],nextModel=false;
    for(var t=0;t<tries.length&&!nextModel;t++){
      var msgs=[{role:'user',content:user}],body={model:m,max_tokens:maxTokens||4000,system:system,messages:msgs};
      if(tries[t])body.tools=[{type:'web_search_20250305',name:'web_search',max_uses:3}];
      var res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:hd,body:JSON.stringify(body)});
      if(res.ok){
        var data=await res.json(),guard=0;
        while(data.stop_reason==='pause_turn'&&guard++<3){ // חיפוש ארוך — ממשיכים את אותו תור
          msgs=msgs.concat([{role:'assistant',content:data.content}]);body.messages=msgs;
          var r2=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:hd,body:JSON.stringify(body)});
          if(!r2.ok)break;data=await r2.json();
        }
        var text=(data.content||[]).filter(function(b){return b.type==='text';}).map(function(b){return b.text;}).join('\n');
        if(text){localStorage.setItem('stockai_worked_claude',m);return text;}
        lastErr=new Error('Empty response ('+m+')');continue;
      }
      var msg=await errMsg(res);lastErr=httpErr(res.status,msg);
      if(res.status===401||res.status===403)throw lastErr;
      if(modelGone(res.status,msg)&&!/tool/i.test(msg)){nextModel=true;break;}
      if(res.status===400&&tries[t])continue;                 // כלי החיפוש לא זמין → בלי חיפוש
      if(busy(res.status)){nextModel=true;break;}
      throw lastErr;
    }
  }
  throw lastErr||new Error('No Claude model available');
}

/* ── תואם-OpenAI (ChatGPT / מקומי / מותאם) ── */
async function openaiCall(ep,key,system,user,maxTokens,provider){
  if(!ep)throw new Error('No API endpoint configured');
  key=key&&key!=='none'?firstKey(key):'';
  var hd={'Content-Type':'application/json'};if(key)hd['Authorization']='Bearer '+key;
  var models=provider==='openai'?modelChain('openai'):[getChosenModel(provider)||(provider==='device'?'llama3':'gpt-4o-mini')];
  var lastErr=null;
  for(var i=0;i<models.length;i++){
    var m=models[i];
    for(var v=0;v<2;v++){ // מודלים חדשים דורשים max_completion_tokens במקום max_tokens
      var body={model:m,messages:[{role:'system',content:system},{role:'user',content:user}]};
      if(v===0)body.max_tokens=maxTokens||4000;else body.max_completion_tokens=maxTokens||4000;
      var res=await fetch(ep,{method:'POST',headers:hd,body:JSON.stringify(body)});
      if(res.ok){var d=await res.json();var text=(d.choices&&d.choices[0]&&d.choices[0].message&&d.choices[0].message.content)||'';
        if(text){if(provider==='openai')localStorage.setItem('stockai_worked_openai',m);return text;}
        lastErr=new Error('Empty response ('+m+')');break;}
      var msg=await errMsg(res);lastErr=httpErr(res.status,msg);
      if(v===0&&res.status===400&&/max_tokens|max_completion_tokens/i.test(msg))continue;
      if(res.status===401||res.status===403)throw lastErr;
      if(modelGone(res.status,msg)||/model_not_found|does not exist/i.test(msg)||busy(res.status))break;
      throw lastErr;
    }
  }
  throw lastErr||new Error('No model available');
}

/* ── שכבה אחידה: מחזירה טקסט מכל ספק. override מאפשר בדיקה מתוך טופס ההגדרות ── */
async function aiText(system,user,opts,ov){
  opts=opts||{};try{await window.__securePromise;}catch(e){}
  var cfg=loadAIConfig(),p=(ov&&ov.provider)||cfg.provider;
  if(!p)throw new Error('No AI provider configured');
  var mt=opts.maxTokens||4000;
  if(p==='gemini'){var keys=splitKeys(ov?ov.key:cfg.geminiKey);var d=await geminiCallMulti(keys,system+'\n\n'+user,mt,opts);return d.__text;}
  if(p==='claude')return await claudeCall(ov?ov.key:cfg.claudeKey,system,user,mt,opts);
  if(p==='openai')return await openaiCall('https://api.openai.com/v1/chat/completions',ov?ov.key:cfg.openaiKey,system,user,mt,'openai');
  if(p==='device'){var base=((ov&&ov.url)||cfg.deviceUrl||'http://localhost:11434/v1').replace(/\/+$/,'');return await openaiCall(base+'/chat/completions','none',system,user,mt,'device');}
  if(p==='custom')return await openaiCall((ov&&ov.url)||cfg.customUrl||'',ov?ov.key:(cfg.customKey||'none'),system,user,mt,'custom');
  throw new Error('Unknown AI provider');
}

async function fetchAnalysis(symbol){
  // חיפוש אינטרנט חי (Claude/Gemini) עם נפילה חיננית; הנתונים המחושבים בקוד משמשים עוגן עובדתי
  var text=await aiText(AI_SYSTEM,buildLiveContext(symbol)+'Search for the latest news and developments, then analyze stock '+symbol+'. Think independently — the provided figures are facts, but the judgment is yours. Return ONLY the JSON object as specified, no other text.',{search:true,maxTokens:4000});
  return parseAIResponse(text);
}

/* ── רשימת מודלים חיה למפתח של המשתמש ── */
async function fetchLiveModelList(p,rawKey){
  var key=firstKey(rawKey),list=[];if(!key)throw new Error('No key');
  if(p==='gemini'){
    var r=await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=200&key='+encodeURIComponent(key));
    if(!r.ok)throw new Error(await errMsg(r));var d=await r.json();
    list=(d.models||[]).filter(function(m){return (m.supportedGenerationMethods||[]).indexOf('generateContent')>-1&&/gemini/.test(m.name)&&!/embed|image|tts|audio|live|vision|robotics|computer|learnlm/i.test(m.name);})
      .map(function(m){return m.name.replace(/^models\//,'');});
    list.sort(function(a,b){function sc(x){return (/latest/.test(x)?0:10)+(/flash/.test(x)?0:3)+(/lite/.test(x)?1:0)+(/preview|exp/.test(x)?5:0);}return sc(a)-sc(b)||b.localeCompare(a);});
  }else if(p==='claude'){
    var r2=await fetch('https://api.anthropic.com/v1/models?limit=100',{headers:{'x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'}});
    if(!r2.ok)throw new Error(await errMsg(r2));var d2=await r2.json();list=(d2.data||[]).map(function(m){return m.id;});
  }else if(p==='openai'){
    var r3=await fetch('https://api.openai.com/v1/models',{headers:{'Authorization':'Bearer '+key}});
    if(!r3.ok)throw new Error(await errMsg(r3));var d3=await r3.json();
    list=(d3.data||[]).map(function(m){return m.id;}).filter(function(id){return /^(gpt-|o\d|chatgpt)/.test(id)&&!/audio|realtime|tts|transcribe|image|search|embed|instruct|codex|moderation/i.test(id);}).sort().reverse();
  }
  localStorage.setItem('stockai_models_'+p,JSON.stringify(list));
  return list;
}

/* ── תרגומים לממשק הבינה ── */
var AI_T={
he:{model:"מודל",auto:"אוטומטי (מומלץ)",refresh:"🔄 רענן מודלים",refreshing:"טוען רשימה חיה…",found:"✓ נמצאו {n} מודלים זמינים למפתח שלך",refreshFail:"✗ לא ניתן לטעון רשימה: ",needKey:"הזן מפתח קודם",modelHint:"\"אוטומטי\" מנסה את המודל העדכני ועובר לגיבוי אם מודל הושבת.",disconnect:"⛔ נתק את ה-AI",disconnectQ:"לנתק את ה-AI ולמחוק את המפתח של הספק הזה מהמכשיר?",disconnected:"ה-AI נותק",selectProv:"בחר ספק AI",enterKey:"הזן מפתח API",connected:"✓ ה-AI מחובר!",privacy:"🔒 פיצ'רי הבינה שולחים את נתוני המניה והשאלה לספק שבחרת בלבד."},
en:{model:"Model",auto:"Automatic (recommended)",refresh:"🔄 Refresh models",refreshing:"Loading live list…",found:"✓ Found {n} models available to your key",refreshFail:"✗ Could not load list: ",needKey:"Enter a key first",modelHint:"\"Automatic\" tries the newest model and falls back if a model is retired.",disconnect:"⛔ Disconnect AI",disconnectQ:"Disconnect AI and delete this provider's key from the device?",disconnected:"AI disconnected",selectProv:"Select an AI provider",enterKey:"Enter an API key",connected:"✓ AI connected!",privacy:"🔒 AI features send the stock data and question only to the provider you chose."},
ru:{model:"Модель",auto:"Автоматически (рекомендуется)",refresh:"🔄 Обновить модели",refreshing:"Загрузка списка…",found:"✓ Найдено моделей для вашего ключа: {n}",refreshFail:"✗ Не удалось загрузить: ",needKey:"Сначала введите ключ",modelHint:"«Автоматически» пробует новейшую модель и переключается, если модель отключена.",disconnect:"⛔ Отключить ИИ",disconnectQ:"Отключить ИИ и удалить ключ этого провайдера с устройства?",disconnected:"ИИ отключён",selectProv:"Выберите провайдера ИИ",enterKey:"Введите API-ключ",connected:"✓ ИИ подключён!",privacy:"🔒 Функции ИИ отправляют данные акции и вопрос только выбранному провайдеру."},
es:{model:"Modelo",auto:"Automático (recomendado)",refresh:"🔄 Actualizar modelos",refreshing:"Cargando lista…",found:"✓ {n} modelos disponibles para tu clave",refreshFail:"✗ No se pudo cargar: ",needKey:"Primero ingresa una clave",modelHint:"\"Automático\" prueba el modelo más nuevo y cambia si uno fue retirado.",disconnect:"⛔ Desconectar IA",disconnectQ:"¿Desconectar la IA y borrar la clave de este proveedor del dispositivo?",disconnected:"IA desconectada",selectProv:"Selecciona un proveedor de IA",enterKey:"Ingresa una clave API",connected:"✓ ¡IA conectada!",privacy:"🔒 Las funciones de IA envían los datos y la pregunta solo al proveedor elegido."},
ar:{model:"النموذج",auto:"تلقائي (موصى به)",refresh:"🔄 تحديث النماذج",refreshing:"جارٍ تحميل القائمة…",found:"✓ تم العثور على {n} نماذج متاحة لمفتاحك",refreshFail:"✗ تعذر التحميل: ",needKey:"أدخل مفتاحاً أولاً",modelHint:"\"تلقائي\" يجرب أحدث نموذج وينتقل للبديل إذا توقف نموذج.",disconnect:"⛔ فصل الذكاء الاصطناعي",disconnectQ:"فصل الذكاء الاصطناعي وحذف مفتاح هذا المزود من الجهاز؟",disconnected:"تم فصل الذكاء الاصطناعي",selectProv:"اختر مزود الذكاء الاصطناعي",enterKey:"أدخل مفتاح API",connected:"✓ تم ربط الذكاء الاصطناعي!",privacy:"🔒 ميزات الذكاء الاصطناعي ترسل بيانات السهم والسؤال للمزود الذي اخترته فقط."}
};
function AT(k,o){var l=AI_T[curLang]||AI_T.en,s=l[k]!=null?l[k]:AI_T.en[k];for(var x in (o||{}))s=s.split('{'+x+'}').join(o[x]);return s;}

/* ── רכיב בחירת מודל בתוך חלון ההגדרות ── */
function modelPickerHtml(p){
  var chosen=getChosenModel(p),list=getLiveModels(p),opts=[];
  (list.length?list:AI_DEFAULT_MODELS[p]).forEach(function(m){if(opts.indexOf(m)<0)opts.push(m);});
  if(chosen&&opts.indexOf(chosen)<0)opts.unshift(chosen);
  return '<div class="model-row"><label class="key-label" style="margin:10px 0 4px">'+AT('model')+'</label>'
    +'<div class="model-ctl"><select class="key-input" id="model-'+p+'"><option value="">'+AT('auto')+'</option>'
    +opts.map(function(m){return '<option value="'+escHtml(m)+'"'+(m===chosen?' selected':'')+'>'+escHtml(m)+'</option>';}).join('')
    +'</select><button type="button" class="model-refresh" onclick="refreshModelList(\''+p+'\')">'+AT('refresh')+'</button></div>'
    +'<div class="key-hint" id="modelMsg-'+p+'" style="margin-top:4px">'+AT('modelHint')+'</div></div>';
}
async function refreshModelList(p){
  var msg=document.getElementById('modelMsg-'+p),raw=(document.getElementById('key-'+p)||{}).value||'';
  if(!firstKey(raw)){msg.textContent=AT('needKey');return;}
  msg.textContent=AT('refreshing');
  try{
    var list=await fetchLiveModelList(p,raw),sel=document.getElementById('model-'+p),cur=sel.value;
    sel.innerHTML='<option value="">'+AT('auto')+'</option>'+list.map(function(m){return '<option value="'+escHtml(m)+'"'+(m===cur?' selected':'')+'>'+escHtml(m)+'</option>';}).join('');
    msg.textContent=AT('found',{n:list.length});msg.style.color='var(--green)';
  }catch(e){msg.textContent=AT('refreshFail')+String(e.message||e).slice(0,80);msg.style.color='var(--red)';}
}
function disconnectAI(){
  var p=loadAIConfig().provider;if(!p||!confirm(AT('disconnectQ')))return;
  delKey(p);
  ['stockai_ai_provider','stockai_key_'+p,'stockai_model_'+p,'stockai_models_'+p,'stockai_worked_'+p].forEach(function(k){localStorage.removeItem(k);});
  if(p==='device')localStorage.removeItem('stockai_device_url');
  if(p==='custom')localStorage.removeItem('stockai_custom_url');
  selectedAI=null;updateAIStatus();closeSetup();showToastMsg(AT('disconnected'));
}

function parseAIResponse(text){
  if(!text)throw new Error('Empty response from AI');
  var cleaned=text.replace(/```json|```/g,'').trim();
  // Find first { to last }
  var start=cleaned.indexOf('{');var end=cleaned.lastIndexOf('}');
  if(start===-1||end===-1)throw new Error('No JSON found in response');
  return JSON.parse(cleaned.substring(start,end+1));
}

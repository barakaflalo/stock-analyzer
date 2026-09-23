/* StockAI · app-core.js — Core: constants, data-worker client, theme, AI setup screen, guide, watchlist, analysis cache
   AppNest © 2026 · load order matters: see <script> tags in stock-analyzer.html */
/* ══════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════ */
var ISRAEL_STOCKS=[
  {sym:'TEVA',name:'Teva Pharmaceutical'},{sym:'CHKP',name:'Check Point Software'},
  {sym:'NICE',name:'NICE Systems'},{sym:'MNDY',name:'Monday.com'},
  {sym:'WIX',name:'Wix.com'},{sym:'CYBR',name:'CyberArk Software'},
  {sym:'ESLT',name:'Elbit Systems'},{sym:'ICL',name:'ICL Group'},
  {sym:'KRNT',name:'Kornit Digital'},{sym:'GLBE',name:'Global-E Online'},
  {sym:'DRIO',name:'DarioHealth'},{sym:'GILT',name:'Gilat Satellite'}
];
var US_STOCKS=[
  {sym:'AAPL',name:'Apple Inc.'},{sym:'MSFT',name:'Microsoft Corp.'},
  {sym:'NVDA',name:'NVIDIA Corp.'},{sym:'TSLA',name:'Tesla Inc.'},
  {sym:'GOOGL',name:'Alphabet Inc.'},{sym:'AMZN',name:'Amazon.com'},
  {sym:'META',name:'Meta Platforms'},{sym:'BRK.B',name:'Berkshire Hathaway'},
  {sym:'JPM',name:'JPMorgan Chase'},{sym:'V',name:'Visa Inc.'},
  {sym:'UNH',name:'UnitedHealth'},{sym:'XOM',name:'Exxon Mobil'}
];
var AI_SYSTEM='You are an investment committee applying the AI-Berkshire method: four master perspectives research the stock independently, clash, and a lead forces a verdict. BUSINESS (Duan Yongping style): business model, moat, pricing power — is this a great business? FINANCIAL (Buffett style): ROE, cash flow, balance sheet, valuation vs quality. INVERSION (Munger style): list how this investment dies — competition, disruption, leverage, governance. LONGTERM (Li Lu style): 10-year certainty of the business and management. Rules: 1) Each master scores 1-5 with one sentence of evidence. 2) INFO GRADE: A=abundant coverage (then focus on contrarian risks, beware consensus), B=partial data (flag estimates), C=scarce (focus on first principles, do not fake precision). 3) VETO LIST — any of these is a veto: management integrity issue, financial restatement, going-concern or bankruptcy risk, delisting risk, persistent negative free cash flow with rising debt, heavy dilution. If any veto applies, list it in vetoes and recommendation must NOT be BUY. 4) NO fence-sitting, but if evidence is insufficient say it is a grey zone in bottomLine and use HOLD — never fake certainty. 5) MIRROR TEST: if the case cannot be stated in 5 plain sentences, it is not a BUY. 6) bearishFactors must be the STRONGEST counter-arguments. 7) Any figures computed in code and provided to you are facts — use them, do not recompute. Return ONLY a JSON object (no backticks, no markdown, no extra text) with this exact structure:\n{"symbol":"TICKER","companyName":"Full Name","currentPrice":"$XXX","recommendation":"BUY","confidenceScore":75,"priceTarget":"$XXX","summary":"2-3 sentence analysis","bottomLine":"2-3 plain sentences a non-expert understands","infoGrade":"A","masters":{"business":{"score":4,"note":"one sentence"},"financial":{"score":3,"note":"one sentence"},"inversion":{"score":3,"note":"one sentence"},"longterm":{"score":4,"note":"one sentence"}},"vetoes":[],"bullishFactors":["factor1","factor2","factor3"],"bearishFactors":["strongest counter-argument","second"],"profiles":{"aggressive":{"action":"BUY","note":"one short sentence"},"moderate":{"action":"HOLD","note":"one short sentence"},"conservative":{"action":"AVOID","note":"one short sentence"}},"analystRating":"Buy/Hold/Sell","socialSentiment":"POSITIVE","technicalSignal":"UP","fundamentalScore":70,"riskLevel":"MEDIUM","sources":["source1","source2"]}\nrecommendation must be exactly BUY, SELL, or HOLD. masters scores are integers 1-5. infoGrade is A, B, or C. vetoes is an array (empty if none). profiles.*.action must be BUY, HOLD, SELL, or AVOID. socialSentiment must be POSITIVE, NEUTRAL, or NEGATIVE. technicalSignal must be UP, DOWN, or NEUTRAL. riskLevel must be LOW, MEDIUM, or HIGH.';

/* ══════════════════════════════════════════════════
   MARKET DATA WORKER — נתונים חיים בחינם
   ⚠ החלף את הכתובת אחרי יצירת ה-Worker שלך!
══════════════════════════════════════════════════ */
var DATA_WORKER_URL='https://stockai-data.barakaflalo4780.workers.dev';

async function workerFetch(params){
  var res=await fetch(DATA_WORKER_URL+'/?'+params+'&t='+Date.now());
  if(!res.ok)throw new Error('Data worker HTTP '+res.status);
  var data=await res.json();
  if(!data.ok)throw new Error(data.error||'Worker error');
  return data;
}
async function fetchLiveQuote(symbol){return await workerFetch('action=quote&symbol='+encodeURIComponent(symbol));}
async function fetchLiveChart(symbol,range){return await workerFetch('action=chart&symbol='+encodeURIComponent(symbol)+'&range='+range);}
async function fetchLiveTicker(symbols){return await workerFetch('action=ticker&symbols='+encodeURIComponent(symbols.join(',')));}
async function fetchLiveForex(){return await workerFetch('action=forex');}
async function fetchLiveCrypto(){return await workerFetch('action=crypto');}

/* ══════════════════════════════════════════════════
   THEME
══════════════════════════════════════════════════ */
var isDark=localStorage.getItem('stockai_theme')!=='light';
function applyTheme(){
  var body=document.getElementById('appBody');
  if(isDark){body.classList.remove('light');document.getElementById('themeBtn').textContent='🌙';}
  else{body.classList.add('light');document.getElementById('themeBtn').textContent='☀️';}
}
function toggleTheme(){isDark=!isDark;localStorage.setItem('stockai_theme',isDark?'dark':'light');applyTheme();}

/* ══════════════════════════════════════════════════
   AI SETUP — multilingual content
══════════════════════════════════════════════════ */
var SETUP_CONTENT={
  en:{
    intro:'<strong>🔐 Your API key stays on your device only.</strong><br>Saved in your browser\'s local storage — never sent to any server except the AI provider you choose.',
    providers:[
      {id:'claude',icon:'🤖',name:'Claude (Anthropic)',desc:'Most accurate · Built-in web search for real-time data',badge:'API Key',badgeClass:'badge-paid'},
      {id:'openai',icon:'💬',name:'ChatGPT (OpenAI)',desc:'GPT-4o Mini / GPT-4o · Great reasoning',badge:'API Key',badgeClass:'badge-paid'},
      {id:'gemini',icon:'✨',name:'Gemini (Google)',desc:'Gemini 1.5 Flash · Free tier — no credit card needed',badge:'Free tier',badgeClass:'badge-free'},
      {id:'device',icon:'📱',name:'On-Device AI',desc:'AI installed on your computer — Ollama or LM Studio',badge:'Local',badgeClass:'badge-device'},
      {id:'custom',icon:'⚙️',name:'Custom Endpoint',desc:'Any OpenAI-compatible API URL',badge:'Custom',badgeClass:'badge-device'}
    ],
    areas:{
      claude:{label:'Anthropic API Key',ph:'sk-ant-api03-...',steps:['Go to <a href="https://console.anthropic.com" target="_blank">console.anthropic.com</a> and sign up','Add a payment method (pay-per-use, ~$0.01–0.03 per analysis)','Click <strong>API Keys</strong> in the left sidebar','Click <strong>Create Key</strong> → copy the key and paste above']},
      openai:{label:'OpenAI API Key',ph:'sk-proj-...',steps:['Go to <a href="https://platform.openai.com" target="_blank">platform.openai.com</a> and sign in','Click your profile icon → <strong>API Keys</strong>','Click <strong>+ Create new secret key</strong> → copy immediately (once only!)','Go to <strong>Billing</strong> and add a payment method to activate']},
      gemini:{label:'Google Gemini API Key',ph:'AIza...',steps:['Go to <a href="https://aistudio.google.com" target="_blank">aistudio.google.com</a>','Sign in with any <strong>Google account</strong>','Click <strong>Get API Key</strong> → Create API key in new project','Copy the key (starts with AIza...) and paste above'],note:'✅ Free tier: 15 requests/min — no credit card required!'},
      device:{title:'📱 On-Device AI (Ollama / LM Studio)',info:'Connects to an AI running locally on your computer. Completely private — no data leaves your machine.',steps:['Install <a href="https://ollama.ai" target="_blank">Ollama</a> or <a href="https://lmstudio.ai" target="_blank">LM Studio</a>','Download a model: <strong style="color:var(--gold)">ollama pull llama3</strong> in Terminal','Make sure the server is running before analyzing'],urlLabel:'Local API URL',urlHint:'Ollama: port 11434 · LM Studio: port 1234'},
      custom:{label1:'API Endpoint URL',ph1:'https://your-api.com/v1/chat/completions',label2:'API Key (optional)',ph2:'Your API key...',hint:'Must be OpenAI-compatible (chat/completions format).'}
    },
    saveBtn:'✓ Save & Connect'
  },
  he:{
    intro:'<strong>🔐 המפתח שלך נשמר על המכשיר שלך בלבד.</strong><br>נשמר ב-localStorage של הדפדפן — לא נשלח לשום שרת חוץ מספק ה-AI שתבחר.',
    providers:[
      {id:'claude',icon:'🤖',name:'Claude (Anthropic)',desc:'הכי מדויק · חיפוש אינטרנט בזמן אמת מובנה',badge:'API Key',badgeClass:'badge-paid'},
      {id:'openai',icon:'💬',name:'ChatGPT (OpenAI)',desc:'GPT-4o Mini / GPT-4o · יכולות הסקה מצוינות',badge:'API Key',badgeClass:'badge-paid'},
      {id:'gemini',icon:'✨',name:'Gemini (Google)',desc:'Gemini 1.5 Flash · גרסה חינמית — ללא כרטיס אשראי',badge:'חינמי',badgeClass:'badge-free'},
      {id:'device',icon:'📱',name:'AI במכשיר',desc:'AI מותקן על המחשב שלך — Ollama או LM Studio',badge:'מקומי',badgeClass:'badge-device'},
      {id:'custom',icon:'⚙️',name:'כתובת מותאמת',desc:'כל URL תואם OpenAI',badge:'מותאם',badgeClass:'badge-device'}
    ],
    areas:{
      claude:{label:'Anthropic API Key',ph:'sk-ant-api03-...',steps:['פתח <a href="https://console.anthropic.com" target="_blank">console.anthropic.com</a> וצור חשבון','הוסף אמצעי תשלום (תשלום לפי שימוש, ~$0.01–0.03 לניתוח)','לחץ <strong>API Keys</strong> בסרגל הצד השמאלי','לחץ <strong>Create Key</strong> → העתק את המפתח והדבק למעלה']},
      openai:{label:'OpenAI API Key',ph:'sk-proj-...',steps:['לך ל-<a href="https://platform.openai.com" target="_blank">platform.openai.com</a> והתחבר','לחץ על תמונת הפרופיל → <strong>API Keys</strong>','לחץ <strong>+ Create new secret key</strong> → העתק מיד (מוצג פעם אחת!)','לך ל-<strong>Billing</strong> והוסף אמצעי תשלום להפעלה']},
      gemini:{label:'Google Gemini API Key',ph:'AIza...',steps:['לך ל-<a href="https://aistudio.google.com" target="_blank">aistudio.google.com</a>','התחבר עם כל <strong>חשבון Google</strong>','לחץ <strong>Get API Key</strong> → צור API key בפרויקט חדש','העתק את המפתח (מתחיל ב-AIza...) והדבק למעלה'],note:'✅ גרסה חינמית: 15 בקשות/דקה — לא נדרש כרטיס אשראי!'},
      device:{title:'📱 AI במכשיר (Ollama / LM Studio)',info:'מתחבר ל-AI שרץ מקומית על המחשב שלך. פרטי לחלוטין — שום נתון לא עוזב את המכשיר.',steps:['התקן <a href="https://ollama.ai" target="_blank">Ollama</a> או <a href="https://lmstudio.ai" target="_blank">LM Studio</a>','הורד מודל: <strong style="color:var(--gold)">ollama pull llama3</strong> ב-Terminal','ודא שהשרת פועל לפני הניתוח'],urlLabel:'כתובת API מקומית',urlHint:'Ollama: פורט 11434 · LM Studio: פורט 1234'},
      custom:{label1:'כתובת API',ph1:'https://your-api.com/v1/chat/completions',label2:'מפתח API (אופציונלי)',ph2:'המפתח שלך...',hint:'חייב להיות תואם OpenAI (פורמט chat/completions).'}
    },
    saveBtn:'✓ שמור וחבר'
  },
  ru:{
    intro:'<strong>🔐 Ваш API-ключ хранится только на вашем устройстве.</strong><br>Сохраняется в localStorage браузера — никогда не отправляется на сервер, кроме выбранного вами провайдера ИИ.',
    providers:[
      {id:'claude',icon:'🤖',name:'Claude (Anthropic)',desc:'Самый точный · Встроенный поиск в интернете в реальном времени',badge:'API Key',badgeClass:'badge-paid'},
      {id:'openai',icon:'💬',name:'ChatGPT (OpenAI)',desc:'GPT-4o Mini / GPT-4o · Отличное мышление',badge:'API Key',badgeClass:'badge-paid'},
      {id:'gemini',icon:'✨',name:'Gemini (Google)',desc:'Gemini 1.5 Flash · Бесплатный тариф — карта не нужна',badge:'Бесплатно',badgeClass:'badge-free'},
      {id:'device',icon:'📱',name:'ИИ на устройстве',desc:'ИИ на вашем компьютере — Ollama или LM Studio',badge:'Локально',badgeClass:'badge-device'},
      {id:'custom',icon:'⚙️',name:'Свой эндпоинт',desc:'Любой OpenAI-совместимый URL',badge:'Custom',badgeClass:'badge-device'}
    ],
    areas:{
      claude:{label:'Ключ Anthropic API',ph:'sk-ant-api03-...',steps:['Откройте <a href="https://console.anthropic.com" target="_blank">console.anthropic.com</a> и создайте аккаунт','Добавьте способ оплаты (оплата по использованию, ~$0.01–0.03 за анализ)','В левой панели нажмите <strong>API Keys</strong>','Нажмите <strong>Create Key</strong> → скопируйте ключ и вставьте выше']},
      openai:{label:'Ключ OpenAI API',ph:'sk-proj-...',steps:['Зайдите на <a href="https://platform.openai.com" target="_blank">platform.openai.com</a>','Нажмите на иконку профиля → <strong>API Keys</strong>','Нажмите <strong>+ Create new secret key</strong> → скопируйте сразу (показывается один раз!)','Перейдите в <strong>Billing</strong> и добавьте способ оплаты']},
      gemini:{label:'Ключ Google Gemini API',ph:'AIza...',steps:['Зайдите на <a href="https://aistudio.google.com" target="_blank">aistudio.google.com</a>','Войдите с любым аккаунтом <strong>Google</strong>','Нажмите <strong>Get API Key</strong> → Create API key in new project','Скопируйте ключ (начинается с AIza...) и вставьте выше'],note:'✅ Бесплатный тариф: 15 запросов/мин — карта не нужна!'},
      device:{title:'📱 ИИ на устройстве (Ollama / LM Studio)',info:'Подключается к ИИ, работающему локально на вашем компьютере. Полная приватность — данные не покидают устройство.',steps:['Установите <a href="https://ollama.ai" target="_blank">Ollama</a> или <a href="https://lmstudio.ai" target="_blank">LM Studio</a>','Скачайте модель: <strong style="color:var(--gold)">ollama pull llama3</strong> в терминале','Убедитесь, что сервер запущен перед анализом'],urlLabel:'Локальный URL API',urlHint:'Ollama: порт 11434 · LM Studio: порт 1234'},
      custom:{label1:'URL эндпоинта API',ph1:'https://your-api.com/v1/chat/completions',label2:'API ключ (необязательно)',ph2:'Ваш API ключ...',hint:'Должен быть OpenAI-совместимым (формат chat/completions).'}
    },
    saveBtn:'✓ Сохранить и подключить'
  },
  es:{
    intro:'<strong>🔐 Tu clave API se queda solo en tu dispositivo.</strong><br>Guardada en el localStorage del navegador — nunca se envía a ningún servidor excepto al proveedor de IA que elijas.',
    providers:[
      {id:'claude',icon:'🤖',name:'Claude (Anthropic)',desc:'Más preciso · Búsqueda web en tiempo real integrada',badge:'API Key',badgeClass:'badge-paid'},
      {id:'openai',icon:'💬',name:'ChatGPT (OpenAI)',desc:'GPT-4o Mini / GPT-4o · Gran razonamiento',badge:'API Key',badgeClass:'badge-paid'},
      {id:'gemini',icon:'✨',name:'Gemini (Google)',desc:'Gemini 1.5 Flash · Nivel gratuito — sin tarjeta de crédito',badge:'Gratis',badgeClass:'badge-free'},
      {id:'device',icon:'📱',name:'IA en Dispositivo',desc:'IA instalada en tu computadora — Ollama o LM Studio',badge:'Local',badgeClass:'badge-device'},
      {id:'custom',icon:'⚙️',name:'Endpoint Personalizado',desc:'Cualquier URL compatible con OpenAI',badge:'Custom',badgeClass:'badge-device'}
    ],
    areas:{
      claude:{label:'Clave Anthropic API',ph:'sk-ant-api03-...',steps:['Ve a <a href="https://console.anthropic.com" target="_blank">console.anthropic.com</a> y crea una cuenta','Agrega un método de pago (pago por uso, ~$0.01–0.03 por análisis)','En el panel izquierdo, haz clic en <strong>API Keys</strong>','Haz clic en <strong>Create Key</strong> → copia la clave y pégala arriba']},
      openai:{label:'Clave OpenAI API',ph:'sk-proj-...',steps:['Ve a <a href="https://platform.openai.com" target="_blank">platform.openai.com</a> e inicia sesión','Clic en tu icono de perfil → <strong>API Keys</strong>','Clic en <strong>+ Create new secret key</strong> → cópiala inmediatamente (solo se muestra una vez)','Ve a <strong>Billing</strong> y agrega un método de pago']},
      gemini:{label:'Clave Google Gemini API',ph:'AIza...',steps:['Ve a <a href="https://aistudio.google.com" target="_blank">aistudio.google.com</a>','Inicia sesión con cualquier cuenta <strong>Google</strong>','Clic en <strong>Get API Key</strong> → Crear API key en nuevo proyecto','Copia la clave (empieza con AIza...) y pégala arriba'],note:'✅ Nivel gratuito: 15 solicitudes/min — ¡no se requiere tarjeta de crédito!'},
      device:{title:'📱 IA en Dispositivo (Ollama / LM Studio)',info:'Se conecta a una IA que corre localmente en tu computadora. Completamente privado — ningún dato sale de tu máquina.',steps:['Instala <a href="https://ollama.ai" target="_blank">Ollama</a> o <a href="https://lmstudio.ai" target="_blank">LM Studio</a>','Descarga un modelo: <strong style="color:var(--gold)">ollama pull llama3</strong> en Terminal','Asegúrate de que el servidor esté corriendo antes de analizar'],urlLabel:'URL API Local',urlHint:'Ollama: puerto 11434 · LM Studio: puerto 1234'},
      custom:{label1:'URL del Endpoint API',ph1:'https://your-api.com/v1/chat/completions',label2:'Clave API (opcional)',ph2:'Tu clave API...',hint:'Debe ser compatible con OpenAI (formato chat/completions).'}
    },
    saveBtn:'✓ Guardar y Conectar'
  },
  ar:{
    intro:'<strong>🔐 مفتاح API الخاص بك يبقى على جهازك فقط.</strong><br>محفوظ في localStorage المتصفح — لا يُرسل إلى أي خادم إلا مزود الذكاء الاصطناعي الذي تختاره.',
    providers:[
      {id:'claude',icon:'🤖',name:'Claude (Anthropic)',desc:'الأكثر دقة · بحث ويب مدمج في الوقت الفعلي',badge:'API Key',badgeClass:'badge-paid'},
      {id:'openai',icon:'💬',name:'ChatGPT (OpenAI)',desc:'GPT-4o Mini / GPT-4o · استدلال ممتاز',badge:'API Key',badgeClass:'badge-paid'},
      {id:'gemini',icon:'✨',name:'Gemini (Google)',desc:'Gemini 1.5 Flash · نسخة مجانية — بدون بطاقة ائتمان',badge:'مجاني',badgeClass:'badge-free'},
      {id:'device',icon:'📱',name:'AI على الجهاز',desc:'ذكاء اصطناعي مثبت على جهازك — Ollama أو LM Studio',badge:'محلي',badgeClass:'badge-device'},
      {id:'custom',icon:'⚙️',name:'نقطة نهاية مخصصة',desc:'أي URL متوافق مع OpenAI',badge:'مخصص',badgeClass:'badge-device'}
    ],
    areas:{
      claude:{label:'مفتاح Anthropic API',ph:'sk-ant-api03-...',steps:['افتح <a href="https://console.anthropic.com" target="_blank">console.anthropic.com</a> وأنشئ حساباً','أضف وسيلة دفع (الدفع حسب الاستخدام، ~$0.01–0.03 لكل تحليل)','في الشريط الجانبي الأيسر، انقر <strong>API Keys</strong>','انقر <strong>Create Key</strong> ← انسخ المفتاح والصقه أعلاه']},
      openai:{label:'مفتاح OpenAI API',ph:'sk-proj-...',steps:['اذهب إلى <a href="https://platform.openai.com" target="_blank">platform.openai.com</a> وسجّل الدخول','انقر على صورة الملف الشخصي ← <strong>API Keys</strong>','انقر <strong>+ Create new secret key</strong> ← انسخ فوراً (يظهر مرة واحدة فقط!)','اذهب إلى <strong>Billing</strong> وأضف وسيلة دفع']},
      gemini:{label:'مفتاح Google Gemini API',ph:'AIza...',steps:['اذهب إلى <a href="https://aistudio.google.com" target="_blank">aistudio.google.com</a>','سجّل الدخول بأي حساب <strong>Google</strong>','انقر <strong>Get API Key</strong> ← أنشئ مفتاح API في مشروع جديد','انسخ المفتاح (يبدأ بـ AIza...) والصقه أعلاه'],note:'✅ النسخة المجانية: 15 طلب/دقيقة — لا بطاقة ائتمان مطلوبة!'},
      device:{title:'📱 AI على الجهاز (Ollama / LM Studio)',info:'يتصل بذكاء اصطناعي يعمل محلياً على جهاز الكمبيوتر. خصوصية تامة — لا تغادر أي بيانات جهازك.',steps:['ثبّت <a href="https://ollama.ai" target="_blank">Ollama</a> أو <a href="https://lmstudio.ai" target="_blank">LM Studio</a>','نزّل نموذجاً: <strong style="color:var(--gold)">ollama pull llama3</strong> في Terminal','تأكد من تشغيل الخادم قبل التحليل'],urlLabel:'عنوان API المحلي',urlHint:'Ollama: المنفذ 11434 · LM Studio: المنفذ 1234'},
      custom:{label1:'عنوان URL لنقطة النهاية',ph1:'https://your-api.com/v1/chat/completions',label2:'مفتاح API (اختياري)',ph2:'مفتاحك...',hint:'يجب أن يكون متوافقاً مع OpenAI (تنسيق chat/completions).'}
    },
    saveBtn:'✓ حفظ وتوصيل'
  }
};

function renderSetup(){
  var lang=SETUP_CONTENT[curLang]?curLang:'en';
  var s=SETUP_CONTENT[lang];
  var cfg=loadAIConfig();
  var savedVals={
    claude:cfg.claudeKey||'',openai:cfg.openaiKey||'',
    gemini:cfg.geminiKey||'',device:cfg.deviceUrl||'http://localhost:11434/v1',
    customUrl:cfg.customUrl||'',customKey:cfg.customKey||''
  };
  var html='<div class="setup-intro">'+s.intro+'</div>';
  html+='<div class="ai-options">';
  s.providers.forEach(function(p){
    html+='<div class="ai-option'+(selectedAI===p.id?' selected':'')+'" id="opt-'+p.id+'" onclick="selectAI(\''+p.id+'\')">'
      +'<div class="ai-option-icon">'+p.icon+'</div>'
      +'<div class="ai-option-info"><div class="ai-option-name">'+p.name+'</div><div class="ai-option-desc">'+p.desc+'</div></div>'
      +'<span class="ai-option-badge '+p.badgeClass+'">'+p.badge+'</span>'
      +'</div>';
  });
  html+='</div>';
  // Key areas
  ['claude','openai','gemini'].forEach(function(id){
    var a=s.areas[id];
    var inputHtml;
    if(id==='gemini'){
      inputHtml='<textarea class="key-input" id="key-gemini" placeholder="'+a.ph+'" rows="3" style="resize:vertical;min-height:60px;font-size:11px;line-height:1.6;">'+escHtml(savedVals[id])+'</textarea>'
        +'<div class="key-hint" style="margin-top:4px;color:var(--gold-dim);">'+(MULTIKEY_T[curLang]||MULTIKEY_T.en)+'</div>';
    }else{
      inputHtml='<input type="password" class="key-input" id="key-'+id+'" placeholder="'+a.ph+'" value="'+escHtml(savedVals[id])+'">';
    }
    html+='<div class="key-area'+(selectedAI===id?' visible':'')+'" id="area-'+id+'">'
      +'<div class="key-label">'+a.label+'</div>'
      +inputHtml+modelPickerHtml(id)
      +'<div class="key-hint"><div class="key-hint-steps">';
    a.steps.forEach(function(step,n){html+='<div class="key-step"><span class="key-step-num">'+(n+1)+'</span><span>'+step+'</span></div>';});
    html+='</div>';
    if(a.note)html+='<div class="guide-note-inline" style="margin-top:10px;">'+a.note+'</div>';
    html+='</div></div>';
  });
  // Device area
  var da=s.areas.device;
  html+='<div class="key-area'+(selectedAI==='device'?' visible':'')+'" id="area-device">'
    +'<div class="device-ai-info">'
    +'<strong style="color:var(--gold)">'+da.title+'</strong><br><br>'+da.info
    +'<div class="key-hint-steps" style="margin-top:12px;">';
  da.steps.forEach(function(step,n){html+='<div class="key-step"><span class="key-step-num">'+(n+1)+'</span><span>'+step+'</span></div>';});
  html+='</div><div style="margin-top:14px;">'
    +'<div class="key-label">'+da.urlLabel+'</div>'
    +'<input type="text" class="key-input" id="key-device" value="'+escHtml(savedVals.device)+'">'
    +'<div class="key-hint" style="margin-top:6px;">'+da.urlHint+'</div>'
    +'</div></div></div>';
  // Custom area
  var ca=s.areas.custom;
  html+='<div class="key-area'+(selectedAI==='custom'?' visible':'')+'" id="area-custom">'
    +'<div class="key-label">'+ca.label1+'</div>'
    +'<input type="text" class="key-input" id="key-custom-url" placeholder="'+ca.ph1+'" value="'+escHtml(savedVals.customUrl)+'" style="margin-bottom:10px;">'
    +'<div class="key-label">'+ca.label2+'</div>'
    +'<input type="password" class="key-input" id="key-custom" placeholder="'+ca.ph2+'" value="'+escHtml(savedVals.customKey)+'">'
    +'<div class="key-hint" style="margin-top:6px;">'+ca.hint+'</div>'
    +'</div>';
  html+='<button class="btn-setup-save" onclick="saveAISetup()">'+s.saveBtn+'</button>';
  html+='<button class="btn-test-ai" id="btnTestAI" onclick="testAIConnection()">'+(TEST_T[curLang]||TEST_T.en).test+'</button>';
  if(loadAIConfig().provider)html+='<button class="btn-test-ai" style="border-color:var(--red);color:var(--red)" onclick="disconnectAI()">'+AT('disconnect')+'</button>';
  html+='<div class="key-hint" style="margin-top:10px;text-align:center">'+AT('privacy')+'</div>';
  document.getElementById('setupModalBody').innerHTML=html;
}

/* ── TEST AI CONNECTION ── */
var MULTIKEY_T={
  he:'💡 ניתן להזין כמה מפתחות — אחד בכל שורה. כשנגמרת מכסה של מפתח, האפליקציה עוברת אוטומטית לבא!',
  en:'💡 You can enter multiple keys — one per line. When a key hits its quota, the app rotates to the next automatically!',
  ru:'💡 Можно ввести несколько ключей — по одному в строке. Когда квота исчерпана, приложение автоматически переключается!',
  es:'💡 Puedes ingresar varias claves — una por línea. ¡Cuando se agota la cuota, la app rota automáticamente!',
  ar:'💡 يمكنك إدخال عدة مفاتيح — واحد في كل سطر. عند نفاد الحصة، ينتقل التطبيق تلقائياً للتالي!'
};
var TEST_T={
  he:{test:'🔌 בדוק חיבור',testing:'בודק...',ok:'✓ החיבור תקין! ה-AI עונה',fail:'✗ החיבור נכשל: ',noSel:'בחר ספק AI קודם'},
  en:{test:'🔌 Test Connection',testing:'Testing...',ok:'✓ Connected! AI responds',fail:'✗ Connection failed: ',noSel:'Select an AI provider first'},
  ru:{test:'🔌 Проверить соединение',testing:'Проверка...',ok:'✓ Подключено! ИИ отвечает',fail:'✗ Ошибка: ',noSel:'Сначала выберите провайдера'},
  es:{test:'🔌 Probar conexión',testing:'Probando...',ok:'✓ ¡Conectado! La IA responde',fail:'✗ Falló: ',noSel:'Selecciona un proveedor primero'},
  ar:{test:'🔌 اختبار الاتصال',testing:'جارٍ الاختبار...',ok:'✓ متصل! الذكاء الاصطناعي يستجيب',fail:'✗ فشل: ',noSel:'اختر مزوداً أولاً'}
};
async function testAIConnection(){
  var t=TEST_T[curLang]||TEST_T.en;
  var btn=document.getElementById('btnTestAI');
  if(!selectedAI){btn.textContent=t.noSel;btn.className='btn-test-ai fail';setTimeout(function(){btn.textContent=t.test;btn.className='btn-test-ai';},2500);return;}
  // Temporarily save current form values so the test uses them
  btn.textContent=t.testing;btn.className='btn-test-ai testing';btn.disabled=true;
  try{
    var ov={provider:selectedAI};
    if(selectedAI==='device'){ov.url=document.getElementById('key-device').value.trim()||'http://localhost:11434/v1';}
    else if(selectedAI==='custom'){ov.url=document.getElementById('key-custom-url').value.trim();ov.key=document.getElementById('key-custom').value.trim()||'none';if(!ov.url)throw new Error('No URL');}
    else{ov.key=document.getElementById('key-'+selectedAI).value;if(!firstKey(ov.key))throw new Error('No key');}
    var selM=document.getElementById('model-'+selectedAI);
    window.__modelOv=selM?{p:selectedAI,m:selM.value}:null;
    try{await aiText('Connection test. Answer briefly.','Reply with exactly: OK',{maxTokens:20},ov);}finally{window.__modelOv=null;}
    var wm=localStorage.getItem('stockai_worked_'+selectedAI);
    btn.textContent=t.ok+(wm&&['gemini','claude','openai'].indexOf(selectedAI)>-1?' · '+wm:'');btn.className='btn-test-ai ok';
  }catch(err){
    var msg=String(err.message||err);
    if(msg.length>70)msg=msg.slice(0,70)+'...';
    btn.textContent=t.fail+msg;btn.className='btn-test-ai fail';
  }finally{
    btn.disabled=false;
    setTimeout(function(){btn.textContent=t.test;btn.className='btn-test-ai';},5000);
  }
}
var selectedAI=null;
function loadAIConfig(){
  return{
    provider:localStorage.getItem('stockai_ai_provider'),
    claudeKey:getKey('claude'),
    openaiKey:getKey('openai'),
    geminiKey:getKey('gemini'),
    deviceUrl:localStorage.getItem('stockai_device_url')||'http://localhost:11434/v1',
    customUrl:localStorage.getItem('stockai_custom_url'),
    customKey:getKey('custom')
  };
}
function updateAIStatus(){
  var cfg=loadAIConfig();
  var dot=document.getElementById('aiDot');
  var nameEl=document.getElementById('aiStatusName');
  var names={claude:'Claude',openai:'ChatGPT',gemini:'Gemini',device:'On-Device',custom:'Custom'};
  if(cfg.provider){dot.classList.add('connected');nameEl.textContent=names[cfg.provider]||cfg.provider;}
  else{dot.classList.remove('connected');nameEl.textContent=T('aiNotConnected');}
}
function openSetup(){
  var cfg=loadAIConfig();
  selectedAI=cfg.provider||null;
  renderSetup();
  document.getElementById('setupOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeSetup(){document.getElementById('setupOverlay').classList.remove('open');document.body.style.overflow='';}
function selectAI(provider){
  selectedAI=provider;
  document.querySelectorAll('.ai-option').forEach(function(o){o.classList.remove('selected');});
  document.querySelectorAll('.key-area').forEach(function(a){a.classList.remove('visible');});
  var opt=document.getElementById('opt-'+provider);if(opt)opt.classList.add('selected');
  var area=document.getElementById('area-'+provider);if(area)area.classList.add('visible');
}
function saveAISetup(){
  if(!selectedAI){showToastMsg(AT('selectProv'));return;}
  if(selectedAI==='claude'||selectedAI==='openai'||selectedAI==='gemini'){
    var raw=document.getElementById('key-'+selectedAI).value;
    var keys=splitKeys(raw);
    if(!keys.length){showToastMsg(AT('enterKey'));return;}
    // Gemini שומר את כל המפתחות (רוטציה); השאר — המפתח הנקי הראשון
    setKey(selectedAI,selectedAI==='gemini'?keys.join('\n'):keys[0]);
    var sel=document.getElementById('model-'+selectedAI);
    if(sel&&sel.value)localStorage.setItem('stockai_model_'+selectedAI,sel.value);else localStorage.removeItem('stockai_model_'+selectedAI);
  }else if(selectedAI==='device'){
    localStorage.setItem('stockai_device_url',document.getElementById('key-device').value.trim()||'http://localhost:11434/v1');
  }else if(selectedAI==='custom'){
    localStorage.setItem('stockai_custom_url',document.getElementById('key-custom-url').value.trim());
    setKey('custom',cleanKey(document.getElementById('key-custom').value));
  }
  localStorage.setItem('stockai_ai_provider',selectedAI);
  updateAIStatus();closeSetup();showToastMsg(AT('connected'));
}

/* ══════════════════════════════════════════════════
   GUIDE MODAL
══════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════
   GUIDE — multilingual content
══════════════════════════════════════════════════ */
var GUIDE_CONTENT={
  en:{
    tabs:['App Guide','Claude','ChatGPT','Gemini','On-Device'],
    app:{
      sections:[
        {title:'What is StockAI?',items:[
          {icon:'📊',html:'StockAI analyzes stocks from <strong>US & Israeli markets</strong> using AI. It searches the web for current news, analyst ratings, and social sentiment — then gives you a clear BUY / SELL / HOLD recommendation with a confidence score.'}
        ]},
        {title:'How to analyze a stock',steps:[
          'Connect your AI — tap the <strong>⚙ status button</strong> in the header and choose a provider',
          'Type a <strong>stock symbol</strong> (e.g. AAPL, TSLA, TEVA) or tap a quick-pick button',
          'Tap <strong>▶ Analyze</strong> — wait 15–30 seconds while the AI searches for data',
          'Read the full analysis: recommendation, confidence, bull/bear factors, and sources'
        ]},
        {title:'Watchlist features',items:[
          {icon:'⭐',html:'<strong>My Stocks</strong> — Add any symbol. Shows time since last analysis.'},
          {icon:'🇮🇱',html:'<strong>Israel Top</strong> — Pre-loaded top Israeli stocks (TEVA, CHKP, MNDY, WIX...)'},
          {icon:'🇺🇸',html:'<strong>US Top</strong> — Pre-loaded top US stocks (AAPL, NVDA, TSLA, META...)'},
          {icon:'▶▶',html:'<strong>Analyze All</strong> — Analyzes every stock in your list one by one'},
          {icon:'💾',html:'<strong>Export / Import</strong> — Back up your list and restore it on any device'}
        ]},
        {title:'Understanding results',items:[
          {icon:'🟢',html:'<strong>BUY</strong> — Strong upside signals from fundamentals, sentiment & technicals'},
          {icon:'🔴',html:'<strong>SELL</strong> — Significant negative signals; risk outweighs potential'},
          {icon:'🟡',html:'<strong>HOLD</strong> — Mixed signals; not a clear entry or exit point'},
          {icon:'%',html:'<strong>Confidence Score</strong> — AI certainty. 70%+ = reliable signal.'},
          {icon:'⏱',html:'<strong>Stale warning</strong> — After 2 hours, a Refresh prompt appears automatically'}
        ]}
      ],
      note:'⚠ StockAI is for research only. Always do your own due diligence before investing.'
    },
    claude:{
      sections:[
        {title:'Why choose Claude?',items:[
          {icon:'🌐',html:'Claude is the <strong>recommended provider</strong> — built-in real-time web search finds today\'s news, analyst upgrades, and earnings data.'},
          {icon:'🎯',html:'Produces the most accurate and detailed analysis of all supported providers.'}
        ]},
        {title:'How to get a Claude API Key',steps:[
          'Open <a href="https://console.anthropic.com" target="_blank"><strong>console.anthropic.com</strong></a> and create an account',
          'Go to <strong>Billing</strong> → add a credit or debit card (pay only for what you use)',
          'In the left sidebar, click <strong>API Keys</strong>',
          'Click <strong>Create Key</strong>, give it a name like "StockAI", and copy it',
          'Tap <strong>⚙</strong> in StockAI header → select Claude → paste key → Save'
        ]}
      ],
      note:'💡 Cost: ~$0.01–0.03 per analysis. 100 analyses ≈ $1–3 USD.'
    },
    openai:{
      sections:[
        {title:'About ChatGPT (OpenAI)',items:[
          {icon:'💬',html:'GPT-4o and GPT-4o Mini are powerful models. <strong>Note:</strong> no real-time web search — uses training data up to early 2024.'}
        ]},
        {title:'How to get an OpenAI API Key',steps:[
          'Go to <a href="https://platform.openai.com" target="_blank"><strong>platform.openai.com</strong></a> and sign in',
          'Click your profile icon (top right) → <strong>API Keys</strong>',
          'Click <strong>+ Create new secret key</strong> — copy it immediately (shown only once!)',
          'Go to <strong>Settings → Billing</strong> and add a payment method',
          'Tap <strong>⚙</strong> in StockAI → select ChatGPT → paste key → Save'
        ]}
      ],
      note:'💡 GPT-4o Mini (~$0.005/analysis) · GPT-4o (~$0.05/analysis)'
    },
    gemini:{
      sections:[
        {title:'Gemini — 100% Free to start!',items:[
          {icon:'✨',html:'Gemini 1.5 Flash has a <strong>free tier — no credit card required</strong>. 15 requests/min and 1M tokens/day. Perfect for personal use.'}
        ]},
        {title:'How to get a Gemini API Key (Free)',steps:[
          'Go to <a href="https://aistudio.google.com" target="_blank"><strong>aistudio.google.com</strong></a>',
          'Sign in with any <strong>Google / Gmail account</strong>',
          'Click the blue <strong>"Get API Key"</strong> button',
          'Click <strong>"Create API key in new project"</strong>',
          'Copy the key (starts with AIza...) → paste in StockAI → Save'
        ]}
      ],
      note:'✅ Best choice to start for free. No credit card, no billing needed.'
    },
    device:{
      sections:[
        {title:'On-Device AI — Private & Free',items:[
          {icon:'🔒',html:'Run AI <strong>completely locally</strong> on your computer. No API costs, no internet needed for the AI, maximum privacy.'},
          {icon:'⚠️',html:'Requires a powerful computer (8GB+ RAM). Quality depends on the model you install.'}
        ]},
        {title:'Option A — Ollama (easiest)',steps:[
          'Download from <a href="https://ollama.ai" target="_blank"><strong>ollama.ai</strong></a> — Mac, Windows, Linux',
          'Open Terminal and run: <strong style="color:var(--gold)">ollama pull llama3</strong>',
          'Ollama runs automatically at <strong>http://localhost:11434</strong>',
          'In StockAI: select "On-Device AI" — the default URL works automatically'
        ]},
        {title:'Option B — LM Studio (visual)',steps:[
          'Download from <a href="https://lmstudio.ai" target="_blank"><strong>lmstudio.ai</strong></a>',
          'Search and download a model (e.g. <strong>Mistral 7B</strong> or <strong>Llama 3</strong>)',
          'Click <strong>Local Server</strong> tab → click <strong>Start Server</strong>',
          'In StockAI: set URL to <strong>http://localhost:1234/v1</strong>'
        ]}
      ],
      note:'💡 Best models: Llama 3 8B, Mistral 7B, Phi-3 Medium. All free to download.'
    }
  },
  he:{
    tabs:['מדריך האפליקציה','Claude','ChatGPT','Gemini','AI במכשיר'],
    app:{
      sections:[
        {title:'מה זה StockAI?',items:[
          {icon:'📊',html:'StockAI מנתחת מניות מ<strong>בורסות ארה"ב וישראל</strong> בעזרת AI. היא מחפשת חדשות עדכניות, המלצות אנליסטים וסנטימנט חברתי — ומחזירה המלצת קנה / מכור / החזק עם ציון ביטחון.'}
        ]},
        {title:'איך לנתח מניה',steps:[
          'חבר את ה-AI — לחץ על <strong>⚙ כפתור הסטטוס</strong> בכותרת ובחר ספק',
          'הזן <strong>סימבול מניה</strong> (למשל AAPL, TSLA, TEVA) או לחץ על כפתור מהיר',
          'לחץ <strong>▶ נתח</strong> — המתן 15–30 שניות בזמן שה-AI מחפש נתונים',
          'קרא את הניתוח המלא: המלצה, רמת ביטחון, גורמי עלייה/ירידה, מקורות'
        ]},
        {title:'פיצ\'רי רשימת המעקב',items:[
          {icon:'⭐',html:'<strong>המניות שלי</strong> — הוסף כל סימבול. מציג כמה זמן עבר מהניתוח האחרון.'},
          {icon:'🇮🇱',html:'<strong>מובילות ישראל</strong> — רשימה מוכנה של מניות ישראליות מובילות'},
          {icon:'🇺🇸',html:'<strong>מובילות ארה"ב</strong> — רשימה מוכנה של מניות אמריקאיות מובילות'},
          {icon:'▶▶',html:'<strong>נתח הכל</strong> — מנתח כל מניה ברשימה בזו אחר זו'},
          {icon:'💾',html:'<strong>גיבוי / שחזור</strong> — ייצא ויבא את הרשימה בין מכשירים'}
        ]},
        {title:'הבנת התוצאות',items:[
          {icon:'🟢',html:'<strong>קנה</strong> — אותות עלייה חזקים מפנדמנטלים, סנטימנט וטכניקה'},
          {icon:'🔴',html:'<strong>מכור</strong> — אותות שליליים משמעותיים; הסיכון עולה על הפוטנציאל'},
          {icon:'🟡',html:'<strong>החזק</strong> — אותות מעורבים; לא נקודת כניסה או יציאה ברורה'},
          {icon:'%',html:'<strong>ציון ביטחון</strong> — בטחון ה-AI בהמלצה. 70%+ = אות אמין.'},
          {icon:'⏱',html:'<strong>אזהרת ישן</strong> — אחרי שעתיים מופיע כפתור "רענן" אוטומטית'}
        ]}
      ],
      note:'⚠ StockAI למחקר בלבד. תמיד בצע בדיקות עצמאיות לפני השקעה.'
    },
    claude:{
      sections:[
        {title:'למה לבחור Claude?',items:[
          {icon:'🌐',html:'Claude הוא <strong>הספק המומלץ</strong> — יש לו חיפוש אינטרנט בזמן אמת, מוצא חדשות, שדרוגי אנליסטים ונתוני רווחים עדכניים.'},
          {icon:'🎯',html:'מייצר את הניתוח המדויק והמפורט ביותר מכל הספקים הנתמכים.'}
        ]},
        {title:'איך לקבל Claude API Key',steps:[
          'פתח <a href="https://console.anthropic.com" target="_blank"><strong>console.anthropic.com</strong></a> וצור חשבון',
          'לך ל-<strong>Billing</strong> → הוסף כרטיס אשראי (משלם רק על שימוש)',
          'בסרגל הצד השמאלי, לחץ <strong>API Keys</strong>',
          'לחץ <strong>Create Key</strong>, תן שם כמו "StockAI", והעתק',
          'לחץ <strong>⚙</strong> ב-StockAI → בחר Claude → הדבק את המפתח → שמור'
        ]}
      ],
      note:'💡 עלות: ~$0.01–0.03 לניתוח. 100 ניתוחים ≈ $1–3 דולר.'
    },
    openai:{
      sections:[
        {title:'על ChatGPT (OpenAI)',items:[
          {icon:'💬',html:'GPT-4o ו-GPT-4o Mini הם מודלים חזקים. <strong>שים לב:</strong> אין חיפוש אינטרנט — משתמש בנתוני אימון עד תחילת 2024.'}
        ]},
        {title:'איך לקבל OpenAI API Key',steps:[
          'לך ל-<a href="https://platform.openai.com" target="_blank"><strong>platform.openai.com</strong></a> והתחבר',
          'לחץ על תמונת הפרופיל (פינה ימנית עליונה) ← <strong>API Keys</strong>',
          'לחץ <strong>+ Create new secret key</strong> — העתק מיד (מוצג פעם אחת בלבד!)',
          'לך ל-<strong>Settings → Billing</strong> והוסף אמצעי תשלום',
          'לחץ <strong>⚙</strong> ב-StockAI → בחר ChatGPT → הדבק מפתח → שמור'
        ]}
      ],
      note:'💡 GPT-4o Mini (~$0.005/ניתוח) · GPT-4o (~$0.05/ניתוח)'
    },
    gemini:{
      sections:[
        {title:'Gemini — חינמי לגמרי לתחילת הדרך!',items:[
          {icon:'✨',html:'ל-Gemini 1.5 Flash יש <strong>גרסה חינמית — ללא כרטיס אשראי</strong>. 15 בקשות/דקה ו-1M טוקן/יום. מושלם לשימוש אישי.'}
        ]},
        {title:'איך לקבל Gemini API Key (חינמי)',steps:[
          'לך ל-<a href="https://aistudio.google.com" target="_blank"><strong>aistudio.google.com</strong></a>',
          'התחבר עם כל <strong>חשבון Google / Gmail</strong>',
          'לחץ על הכפתור הכחול <strong>"Get API Key"</strong>',
          'לחץ <strong>"Create API key in new project"</strong>',
          'העתק את המפתח (מתחיל ב-AIza...) → הדבק ב-StockAI → שמור'
        ]}
      ],
      note:'✅ הבחירה הטובה ביותר להתחלה חינמית. לא דרוש כרטיס אשראי.'
    },
    device:{
      sections:[
        {title:'AI במכשיר — פרטיות מלאה וחינמי',items:[
          {icon:'🔒',html:'הפעל AI <strong>מקומית על המחשב שלך</strong>. ללא עלות API, ללא צורך באינטרנט ל-AI, מקסימום פרטיות.'},
          {icon:'⚠️',html:'דרוש מחשב חזק (8GB+ RAM). איכות הניתוח תלויה במודל שתתקין.'}
        ]},
        {title:'אפשרות א׳ — Ollama (הכי קל)',steps:[
          'הורד מ-<a href="https://ollama.ai" target="_blank"><strong>ollama.ai</strong></a> — זמין ל-Mac, Windows, Linux',
          'פתח Terminal והרץ: <strong style="color:var(--gold)">ollama pull llama3</strong>',
          'Ollama רץ אוטומטית על <strong>http://localhost:11434</strong>',
          'ב-StockAI: בחר "AI במכשיר" — ה-URL ברירת המחדל עובד אוטומטית'
        ]},
        {title:'אפשרות ב׳ — LM Studio (ממשק ויזואלי)',steps:[
          'הורד מ-<a href="https://lmstudio.ai" target="_blank"><strong>lmstudio.ai</strong></a>',
          'חפש והורד מודל (לדוגמה <strong>Mistral 7B</strong> או <strong>Llama 3</strong>)',
          'לחץ על לשונית <strong>Local Server</strong> → לחץ <strong>Start Server</strong>',
          'ב-StockAI: הגדר URL ל-<strong>http://localhost:1234/v1</strong>'
        ]}
      ],
      note:'💡 מודלים מומלצים: Llama 3 8B, Mistral 7B, Phi-3 Medium. כולם חינמיים.'
    }
  },
  ru:{
    tabs:['Руководство','Claude','ChatGPT','Gemini','На устройстве'],
    app:{
      sections:[
        {title:'Что такое StockAI?',items:[
          {icon:'📊',html:'StockAI анализирует акции <strong>рынков США и Израиля</strong> с помощью ИИ. Ищет свежие новости, рейтинги аналитиков и настроения соцсетей — и выдаёт рекомендацию КУПИТЬ / ПРОДАТЬ / ДЕРЖАТЬ с оценкой уверенности.'}
        ]},
        {title:'Как анализировать акцию',steps:[
          'Подключите ИИ — нажмите <strong>⚙ кнопку статуса</strong> в шапке и выберите провайдера',
          'Введите <strong>тикер акции</strong> (напр. AAPL, TSLA, TEVA) или нажмите быструю кнопку',
          'Нажмите <strong>▶ Анализ</strong> — подождите 15–30 секунд',
          'Прочитайте анализ: рекомендацию, уверенность, факторы роста/падения и источники'
        ]},
        {title:'Функции списка слежения',items:[
          {icon:'⭐',html:'<strong>Мои акции</strong> — Добавьте тикер. Показывает время с последнего анализа.'},
          {icon:'🇮🇱',html:'<strong>Топ Израиль</strong> — Готовый список лучших израильских акций'},
          {icon:'🇺🇸',html:'<strong>Топ США</strong> — Готовый список лучших американских акций'},
          {icon:'▶▶',html:'<strong>Анализировать всё</strong> — Анализирует каждую акцию по очереди'},
          {icon:'💾',html:'<strong>Экспорт / Импорт</strong> — Создайте резервную копию и восстановите на любом устройстве'}
        ]},
        {title:'Понимание результатов',items:[
          {icon:'🟢',html:'<strong>КУПИТЬ</strong> — Сильные сигналы роста по фундаментальным, настроениям и технике'},
          {icon:'🔴',html:'<strong>ПРОДАТЬ</strong> — Значительные негативные сигналы; риск превышает потенциал'},
          {icon:'🟡',html:'<strong>ДЕРЖАТЬ</strong> — Смешанные сигналы; не чёткая точка входа или выхода'},
          {icon:'%',html:'<strong>Уверенность</strong> — Уверенность ИИ в рекомендации. 70%+ = надёжный сигнал.'},
          {icon:'⏱',html:'<strong>Устаревший анализ</strong> — Через 2 часа появляется кнопка "Обновить"'}
        ]}
      ],
      note:'⚠ StockAI только для исследований. Всегда проводите собственный анализ перед инвестированием.'
    },
    claude:{
      sections:[
        {title:'Почему Claude?',items:[
          {icon:'🌐',html:'Claude — <strong>рекомендуемый провайдер</strong> — встроенный поиск в реальном времени находит сегодняшние новости, апгрейды аналитиков и данные о прибыли.'},
          {icon:'🎯',html:'Выдаёт наиболее точный и детальный анализ среди всех поддерживаемых провайдеров.'}
        ]},
        {title:'Как получить Claude API Key',steps:[
          'Откройте <a href="https://console.anthropic.com" target="_blank"><strong>console.anthropic.com</strong></a> и создайте аккаунт',
          'Перейдите в <strong>Billing</strong> → добавьте карту (оплата только за использование)',
          'В левой боковой панели нажмите <strong>API Keys</strong>',
          'Нажмите <strong>Create Key</strong>, дайте имя "StockAI" и скопируйте',
          'В StockAI нажмите <strong>⚙</strong> → выберите Claude → вставьте ключ → Сохранить'
        ]}
      ],
      note:'💡 Стоимость: ~$0.01–0.03 за анализ. 100 анализов ≈ $1–3 USD.'
    },
    openai:{
      sections:[
        {title:'О ChatGPT (OpenAI)',items:[
          {icon:'💬',html:'GPT-4o и GPT-4o Mini — мощные модели. <strong>Важно:</strong> нет поиска в реальном времени — использует обучающие данные до начала 2024 года.'}
        ]},
        {title:'Как получить OpenAI API Key',steps:[
          'Перейдите на <a href="https://platform.openai.com" target="_blank"><strong>platform.openai.com</strong></a> и войдите',
          'Нажмите на иконку профиля (вверху справа) → <strong>API Keys</strong>',
          'Нажмите <strong>+ Create new secret key</strong> — скопируйте сразу (показывается один раз!)',
          'Перейдите в <strong>Settings → Billing</strong> и добавьте способ оплаты',
          'В StockAI нажмите <strong>⚙</strong> → ChatGPT → вставьте ключ → Сохранить'
        ]}
      ],
      note:'💡 GPT-4o Mini (~$0.005/анализ) · GPT-4o (~$0.05/анализ)'
    },
    gemini:{
      sections:[
        {title:'Gemini — 100% бесплатно для начала!',items:[
          {icon:'✨',html:'Gemini 1.5 Flash имеет <strong>бесплатный тариф — без кредитной карты</strong>. 15 запросов/мин и 1M токенов/день.'}
        ]},
        {title:'Как получить Gemini API Key (бесплатно)',steps:[
          'Перейдите на <a href="https://aistudio.google.com" target="_blank"><strong>aistudio.google.com</strong></a>',
          'Войдите с любым аккаунтом <strong>Google / Gmail</strong>',
          'Нажмите синюю кнопку <strong>"Get API Key"</strong>',
          'Нажмите <strong>"Create API key in new project"</strong>',
          'Скопируйте ключ (начинается с AIza...) → вставьте в StockAI → Сохранить'
        ]}
      ],
      note:'✅ Лучший выбор для бесплатного старта. Карта не нужна.'
    },
    device:{
      sections:[
        {title:'ИИ на устройстве — Приватность и бесплатно',items:[
          {icon:'🔒',html:'Запускайте ИИ <strong>локально на своём компьютере</strong>. Нет расходов на API, не нужен интернет для ИИ, максимальная приватность.'},
          {icon:'⚠️',html:'Нужен мощный компьютер (8GB+ RAM). Качество зависит от установленной модели.'}
        ]},
        {title:'Вариант А — Ollama (проще всего)',steps:[
          'Скачайте с <a href="https://ollama.ai" target="_blank"><strong>ollama.ai</strong></a> — Mac, Windows, Linux',
          'Откройте терминал и выполните: <strong style="color:var(--gold)">ollama pull llama3</strong>',
          'Ollama автоматически запускается на <strong>http://localhost:11434</strong>',
          'В StockAI выберите "На устройстве" — URL по умолчанию работает автоматически'
        ]},
        {title:'Вариант Б — LM Studio (с интерфейсом)',steps:[
          'Скачайте с <a href="https://lmstudio.ai" target="_blank"><strong>lmstudio.ai</strong></a>',
          'Найдите и скачайте модель (напр. <strong>Mistral 7B</strong> или <strong>Llama 3</strong>)',
          'Нажмите вкладку <strong>Local Server</strong> → <strong>Start Server</strong>',
          'В StockAI установите URL: <strong>http://localhost:1234/v1</strong>'
        ]}
      ],
      note:'💡 Лучшие модели: Llama 3 8B, Mistral 7B, Phi-3 Medium. Все бесплатные.'
    }
  },
  es:{
    tabs:['Guía de la App','Claude','ChatGPT','Gemini','En Dispositivo'],
    app:{
      sections:[
        {title:'¿Qué es StockAI?',items:[
          {icon:'📊',html:'StockAI analiza acciones de los <strong>mercados de EEUU e Israel</strong> con IA. Busca noticias actuales, calificaciones de analistas y sentimiento social — y da una recomendación COMPRAR / VENDER / MANTENER con puntuación de confianza.'}
        ]},
        {title:'Cómo analizar una acción',steps:[
          'Conecta tu IA — toca el <strong>botón ⚙ de estado</strong> en el encabezado y elige un proveedor',
          'Escribe un <strong>símbolo de acción</strong> (ej. AAPL, TSLA, TEVA) o toca un botón rápido',
          'Toca <strong>▶ Analizar</strong> — espera 15–30 segundos',
          'Lee el análisis: recomendación, confianza, factores alcistas/bajistas y fuentes'
        ]},
        {title:'Funciones de la lista de seguimiento',items:[
          {icon:'⭐',html:'<strong>Mis Acciones</strong> — Agrega cualquier símbolo. Muestra tiempo desde el último análisis.'},
          {icon:'🇮🇱',html:'<strong>Top Israel</strong> — Lista predefinida de principales acciones israelíes'},
          {icon:'🇺🇸',html:'<strong>Top EEUU</strong> — Lista predefinida de principales acciones americanas'},
          {icon:'▶▶',html:'<strong>Analizar Todo</strong> — Analiza cada acción de tu lista una por una'},
          {icon:'💾',html:'<strong>Exportar / Importar</strong> — Respalda tu lista y restáurala en cualquier dispositivo'}
        ]},
        {title:'Entendiendo los resultados',items:[
          {icon:'🟢',html:'<strong>COMPRAR</strong> — Señales alcistas fuertes de fundamentales, sentimiento y técnica'},
          {icon:'🔴',html:'<strong>VENDER</strong> — Señales negativas significativas; el riesgo supera el potencial'},
          {icon:'🟡',html:'<strong>MANTENER</strong> — Señales mixtas; no es un punto claro de entrada o salida'},
          {icon:'%',html:'<strong>Confianza</strong> — Certeza de la IA. 70%+ = señal confiable.'},
          {icon:'⏱',html:'<strong>Análisis obsoleto</strong> — Después de 2 horas aparece un botón "Actualizar"'}
        ]}
      ],
      note:'⚠ StockAI es solo para investigación. Siempre haz tu propio análisis antes de invertir.'
    },
    claude:{
      sections:[
        {title:'¿Por qué elegir Claude?',items:[
          {icon:'🌐',html:'Claude es el <strong>proveedor recomendado</strong> — búsqueda web en tiempo real, encuentra noticias actuales, upgrades de analistas y datos de ganancias.'},
          {icon:'🎯',html:'Produce el análisis más preciso y detallado de todos los proveedores soportados.'}
        ]},
        {title:'Cómo obtener una Claude API Key',steps:[
          'Abre <a href="https://console.anthropic.com" target="_blank"><strong>console.anthropic.com</strong></a> y crea una cuenta',
          'Ve a <strong>Billing</strong> → agrega una tarjeta (pagas solo por lo que usas)',
          'En el panel izquierdo, haz clic en <strong>API Keys</strong>',
          'Haz clic en <strong>Create Key</strong>, ponle nombre "StockAI" y cópiala',
          'En StockAI toca <strong>⚙</strong> → selecciona Claude → pega la clave → Guardar'
        ]}
      ],
      note:'💡 Costo: ~$0.01–0.03 por análisis. 100 análisis ≈ $1–3 USD.'
    },
    openai:{
      sections:[
        {title:'Sobre ChatGPT (OpenAI)',items:[
          {icon:'💬',html:'GPT-4o y GPT-4o Mini son modelos potentes. <strong>Nota:</strong> sin búsqueda web en tiempo real — usa datos de entrenamiento hasta principios de 2024.'}
        ]},
        {title:'Cómo obtener una OpenAI API Key',steps:[
          'Ve a <a href="https://platform.openai.com" target="_blank"><strong>platform.openai.com</strong></a> e inicia sesión',
          'Clic en tu icono de perfil (arriba derecha) → <strong>API Keys</strong>',
          'Clic en <strong>+ Create new secret key</strong> — cópiala inmediatamente (se muestra solo una vez)',
          'Ve a <strong>Settings → Billing</strong> y agrega un método de pago',
          'En StockAI toca <strong>⚙</strong> → ChatGPT → pega clave → Guardar'
        ]}
      ],
      note:'💡 GPT-4o Mini (~$0.005/análisis) · GPT-4o (~$0.05/análisis)'
    },
    gemini:{
      sections:[
        {title:'Gemini — ¡100% Gratis para empezar!',items:[
          {icon:'✨',html:'Gemini 1.5 Flash tiene un <strong>nivel gratuito — sin tarjeta de crédito</strong>. 15 solicitudes/min y 1M tokens/día.'}
        ]},
        {title:'Cómo obtener una Gemini API Key (Gratis)',steps:[
          'Ve a <a href="https://aistudio.google.com" target="_blank"><strong>aistudio.google.com</strong></a>',
          'Inicia sesión con cualquier cuenta <strong>Google / Gmail</strong>',
          'Clic en el botón azul <strong>"Get API Key"</strong>',
          'Clic en <strong>"Create API key in new project"</strong>',
          'Copia la clave (empieza con AIza...) → pégala en StockAI → Guardar'
        ]}
      ],
      note:'✅ Mejor opción para empezar gratis. Sin tarjeta de crédito.'
    },
    device:{
      sections:[
        {title:'IA en Dispositivo — Privacidad y Gratis',items:[
          {icon:'🔒',html:'Ejecuta IA <strong>completamente local</strong> en tu computadora. Sin costos de API, sin internet para la IA, máxima privacidad.'},
          {icon:'⚠️',html:'Requiere una computadora potente (8GB+ RAM). La calidad depende del modelo instalado.'}
        ]},
        {title:'Opción A — Ollama (más fácil)',steps:[
          'Descarga desde <a href="https://ollama.ai" target="_blank"><strong>ollama.ai</strong></a> — Mac, Windows, Linux',
          'Abre Terminal y ejecuta: <strong style="color:var(--gold)">ollama pull llama3</strong>',
          'Ollama corre automáticamente en <strong>http://localhost:11434</strong>',
          'En StockAI selecciona "En Dispositivo" — la URL predeterminada funciona automáticamente'
        ]},
        {title:'Opción B — LM Studio (interfaz visual)',steps:[
          'Descarga desde <a href="https://lmstudio.ai" target="_blank"><strong>lmstudio.ai</strong></a>',
          'Busca y descarga un modelo (ej. <strong>Mistral 7B</strong> o <strong>Llama 3</strong>)',
          'Clic en pestaña <strong>Local Server</strong> → <strong>Start Server</strong>',
          'En StockAI establece URL: <strong>http://localhost:1234/v1</strong>'
        ]}
      ],
      note:'💡 Mejores modelos: Llama 3 8B, Mistral 7B, Phi-3 Medium. Todos gratuitos.'
    }
  },
  ar:{
    tabs:['دليل التطبيق','Claude','ChatGPT','Gemini','على الجهاز'],
    app:{
      sections:[
        {title:'ما هو StockAI؟',items:[
          {icon:'📊',html:'يحلل StockAI الأسهم من <strong>أسواق الولايات المتحدة وإسرائيل</strong> باستخدام الذكاء الاصطناعي. يبحث عن أحدث الأخبار وتوصيات المحللين ومشاعر السوق — ثم يعطيك توصية شراء / بيع / احتفاظ مع درجة ثقة.'}
        ]},
        {title:'كيفية تحليل سهم',steps:[
          'اربط الذكاء الاصطناعي — اضغط <strong>زر ⚙ الحالة</strong> في الرأس واختر مزوداً',
          'أدخل <strong>رمز السهم</strong> (مثل AAPL, TSLA, TEVA) أو اضغط زر سريع',
          'اضغط <strong>▶ تحليل</strong> — انتظر 15–30 ثانية',
          'اقرأ التحليل الكامل: التوصية، الثقة، العوامل الإيجابية/السلبية، والمصادر'
        ]},
        {title:'ميزات قائمة المتابعة',items:[
          {icon:'⭐',html:'<strong>أسهمي</strong> — أضف أي رمز. يُظهر الوقت منذ آخر تحليل.'},
          {icon:'🇮🇱',html:'<strong>أفضل إسرائيل</strong> — قائمة جاهزة لأفضل الأسهم الإسرائيلية'},
          {icon:'🇺🇸',html:'<strong>أفضل أمريكا</strong> — قائمة جاهزة لأفضل الأسهم الأمريكية'},
          {icon:'▶▶',html:'<strong>تحليل الكل</strong> — يحلل كل سهم في القائمة واحداً تلو الآخر'},
          {icon:'💾',html:'<strong>تصدير / استيراد</strong> — احتفظ بنسخة احتياطية واستعدها على أي جهاز'}
        ]},
        {title:'فهم النتائج',items:[
          {icon:'🟢',html:'<strong>شراء</strong> — إشارات صعود قوية من الأساسيات والمشاعر والتقنيات'},
          {icon:'🔴',html:'<strong>بيع</strong> — إشارات سلبية كبيرة؛ المخاطر تفوق الإمكانات'},
          {icon:'🟡',html:'<strong>احتفاظ</strong> — إشارات مختلطة؛ ليست نقطة دخول أو خروج واضحة'},
          {icon:'%',html:'<strong>درجة الثقة</strong> — يقين الذكاء الاصطناعي. 70%+ = إشارة موثوقة.'},
          {icon:'⏱',html:'<strong>تحذير قديم</strong> — بعد ساعتين، يظهر زر "تحديث" تلقائياً'}
        ]}
      ],
      note:'⚠ StockAI للبحث فقط. دائماً أجرِ تحليلك الخاص قبل الاستثمار.'
    },
    claude:{
      sections:[
        {title:'لماذا تختار Claude؟',items:[
          {icon:'🌐',html:'Claude هو <strong>المزود الموصى به</strong> — يملك بحثاً على الإنترنت في الوقت الفعلي، يجد أحدث الأخبار وترقيات المحللين وبيانات الأرباح.'},
          {icon:'🎯',html:'ينتج أدق وأكثر تفصيلاً للتحليل بين جميع المزودين المدعومين.'}
        ]},
        {title:'كيفية الحصول على Claude API Key',steps:[
          'افتح <a href="https://console.anthropic.com" target="_blank"><strong>console.anthropic.com</strong></a> وأنشئ حساباً',
          'اذهب إلى <strong>Billing</strong> ← أضف بطاقة ائتمان (تدفع فقط مقابل الاستخدام)',
          'في الشريط الجانبي الأيسر، انقر <strong>API Keys</strong>',
          'انقر <strong>Create Key</strong>، أعطه اسم "StockAI" وانسخه',
          'في StockAI اضغط <strong>⚙</strong> ← اختر Claude ← الصق المفتاح ← احفظ'
        ]}
      ],
      note:'💡 التكلفة: ~$0.01–0.03 لكل تحليل. 100 تحليل ≈ $1–3 دولار.'
    },
    openai:{
      sections:[
        {title:'عن ChatGPT (OpenAI)',items:[
          {icon:'💬',html:'GPT-4o وGPT-4o Mini نماذج قوية. <strong>تنبيه:</strong> لا بحث على الإنترنت في الوقت الفعلي — يستخدم بيانات التدريب حتى مطلع 2024.'}
        ]},
        {title:'كيفية الحصول على OpenAI API Key',steps:[
          'اذهب إلى <a href="https://platform.openai.com" target="_blank"><strong>platform.openai.com</strong></a> وسجّل الدخول',
          'انقر على صورة الملف الشخصي (أعلى اليمين) ← <strong>API Keys</strong>',
          'انقر <strong>+ Create new secret key</strong> — انسخه فوراً (يظهر مرة واحدة فقط!)',
          'اذهب إلى <strong>Settings ← Billing</strong> وأضف وسيلة دفع',
          'في StockAI اضغط <strong>⚙</strong> ← ChatGPT ← الصق المفتاح ← احفظ'
        ]}
      ],
      note:'💡 GPT-4o Mini (~$0.005/تحليل) · GPT-4o (~$0.05/تحليل)'
    },
    gemini:{
      sections:[
        {title:'Gemini — مجاني 100% للبدء!',items:[
          {icon:'✨',html:'Gemini 1.5 Flash له <strong>نسخة مجانية — بدون بطاقة ائتمان</strong>. 15 طلب/دقيقة و1M رمز/يوم.'}
        ]},
        {title:'كيفية الحصول على Gemini API Key (مجاناً)',steps:[
          'اذهب إلى <a href="https://aistudio.google.com" target="_blank"><strong>aistudio.google.com</strong></a>',
          'سجّل الدخول بأي حساب <strong>Google / Gmail</strong>',
          'انقر الزر الأزرق <strong>"Get API Key"</strong>',
          'انقر <strong>"Create API key in new project"</strong>',
          'انسخ المفتاح (يبدأ بـ AIza...) ← الصقه في StockAI ← احفظ'
        ]}
      ],
      note:'✅ أفضل اختيار للبدء مجاناً. لا بطاقة ائتمان مطلوبة.'
    },
    device:{
      sections:[
        {title:'AI على الجهاز — خصوصية ومجاني',items:[
          {icon:'🔒',html:'شغّل الذكاء الاصطناعي <strong>محلياً على جهاز الكمبيوتر</strong>. لا تكاليف API، لا إنترنت للذكاء الاصطناعي، أقصى خصوصية.'},
          {icon:'⚠️',html:'يتطلب كمبيوتراً قوياً (8GB+ RAM). الجودة تعتمد على النموذج المثبت.'}
        ]},
        {title:'الخيار أ — Ollama (الأسهل)',steps:[
          'نزّل من <a href="https://ollama.ai" target="_blank"><strong>ollama.ai</strong></a> — Mac, Windows, Linux',
          'افتح Terminal ونفّذ: <strong style="color:var(--gold)">ollama pull llama3</strong>',
          'Ollama يعمل تلقائياً على <strong>http://localhost:11434</strong>',
          'في StockAI: اختر "على الجهاز" — عنوان URL الافتراضي يعمل تلقائياً'
        ]},
        {title:'الخيار ب — LM Studio (واجهة مرئية)',steps:[
          'نزّل من <a href="https://lmstudio.ai" target="_blank"><strong>lmstudio.ai</strong></a>',
          'ابحث ونزّل نموذجاً (مثل <strong>Mistral 7B</strong> أو <strong>Llama 3</strong>)',
          'انقر تبويب <strong>Local Server</strong> ← <strong>Start Server</strong>',
          'في StockAI عيّن URL: <strong>http://localhost:1234/v1</strong>'
        ]}
      ],
      note:'💡 أفضل النماذج: Llama 3 8B, Mistral 7B, Phi-3 Medium. جميعها مجانية.'
    }
  }
};

var currentGuideTab='app';
var GUIDE_KEYS=['app','claude','openai','gemini','device'];

function renderGuide(){
  var lang=GUIDE_CONTENT[curLang]?curLang:'en';
  var g=GUIDE_CONTENT[lang];
  var tabsEl=document.getElementById('guideTabs');
  var panesEl=document.getElementById('guidePanes');
  // Build tabs
  tabsEl.innerHTML='';
  GUIDE_KEYS.forEach(function(key,i){
    var btn=document.createElement('button');
    btn.className='guide-tab'+(key===currentGuideTab?' active':'');
    btn.setAttribute('id','gtab-'+key);
    btn.textContent=g.tabs[i]||key;
    btn.onclick=(function(k){return function(){switchGuideTab(k);};})(key);
    tabsEl.appendChild(btn);
  });
  // Build panes
  panesEl.innerHTML='';
  GUIDE_KEYS.forEach(function(key){
    var data=g[key];if(!data)return;
    var pane=document.createElement('div');
    pane.className='guide-pane'+(key===currentGuideTab?' active':'');
    pane.id='gpane-'+key;
    var html='';
    (data.sections||[]).forEach(function(sec){
      html+='<div class="guide-section"><div class="guide-section-title">'+sec.title+'</div>';
      if(sec.items){sec.items.forEach(function(item){html+='<div class="guide-item"><div class="guide-icon">'+item.icon+'</div><div class="guide-text">'+item.html+'</div></div>';});}
      if(sec.steps){sec.steps.forEach(function(step,n){html+='<div class="guide-step"><div class="guide-step-num">'+(n+1)+'</div><div class="guide-step-text">'+step+'</div></div>';});}
      html+='</div>';
    });
    if(data.note)html+='<div class="guide-note">'+data.note+'</div>';
    pane.innerHTML=html;
    panesEl.appendChild(pane);
  });
}

function openGuide(){
  currentGuideTab='app';
  renderGuide();
  document.getElementById('guideOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeGuide(){document.getElementById('guideOverlay').classList.remove('open');document.body.style.overflow='';}
function switchGuideTab(tab){
  currentGuideTab=tab;
  document.querySelectorAll('.guide-tab').forEach(function(b){b.classList.remove('active');});
  document.querySelectorAll('.guide-pane').forEach(function(p){p.classList.remove('active');});
  var tb=document.getElementById('gtab-'+tab);if(tb)tb.classList.add('active');
  var pn=document.getElementById('gpane-'+tab);if(pn)pn.classList.add('active');
}

/* ══════════════════════════════════════════════════
   WATCHLIST
══════════════════════════════════════════════════ */
function loadWatchlist(){try{return JSON.parse(localStorage.getItem('stockai_watchlist'))||[];}catch(e){return[];}}
function saveWatchlist(list){localStorage.setItem('stockai_watchlist',JSON.stringify(list));updateWatchCount();}
function updateWatchCount(){document.getElementById('watchCount').textContent=loadWatchlist().length;}
function isInWatchlist(sym){return loadWatchlist().indexOf(sym)!==-1;}
function addToWatchlist(sym){
  var s=sym||(document.getElementById('watchAddInput').value.trim().toUpperCase());
  if(!s)return;
  var list=loadWatchlist();
  if(list.indexOf(s)===-1){list.push(s);saveWatchlist(list);}
  document.getElementById('watchAddInput').value='';
  renderWatchlist();updateAddWatchBtn();showToastMsg('✓ '+s);
}
function removeFromWatchlist(sym){
  saveWatchlist(loadWatchlist().filter(function(x){return x!==sym;}));
  renderWatchlist();updateAddWatchBtn();
}
function toggleWatchFromResult(){
  var sym=document.getElementById('rSym').textContent;if(!sym)return;
  if(isInWatchlist(sym))removeFromWatchlist(sym);else addToWatchlist(sym);
  updateAddWatchBtn();
}
function updateAddWatchBtn(){
  var sym=document.getElementById('rSym').textContent;
  var btn=document.getElementById('btnAddWatch');if(!sym||!btn)return;
  if(isInWatchlist(sym)){btn.textContent=T('addedToWatch');btn.className='btn-add-watch added';}
  else{btn.textContent=T('addToWatch');btn.className='btn-add-watch';}
}
function renderWatchlist(){
  var list=loadWatchlist();
  var el=document.getElementById('watchItemsList');
  document.querySelectorAll('[data-t]').forEach(function(e){e.textContent=T(e.getAttribute('data-t'));});
  document.querySelectorAll('[data-tp]').forEach(function(e){e.placeholder=T(e.getAttribute('data-tp'));});
  document.getElementById('watchPanelTitle').textContent=T('watchPanelTitle');
  if(!list.length){
    el.innerHTML='<div class="watch-empty"><div class="watch-empty-icon">'+T('watchEmptyIcon')+'</div>'+T('watchEmpty').replace('\n','<br>')+'</div>';
    document.getElementById('btnAnalyzeAll').disabled=true;return;
  }
  document.getElementById('btnAnalyzeAll').disabled=false;
  el.innerHTML='';
  var cache=getAnalysisCache();
  list.forEach(function(sym){
    var entry=cache[sym];
    var ageStr=entry&&entry.ts?formatAge(entry.ts):'';
    var d=document.createElement('div');d.className='watch-item';
    d.innerHTML='<div class="watch-item-left">'
      +'<div class="watch-item-sym" onclick="analyzeFromWatch(\''+sym+'\')">'+sym+'</div>'
      +(ageStr?'<div class="watch-item-age">'+T('staleMsg').replace('{ago}',ageStr)+'</div>':'')
      +'</div><div class="watch-item-actions">'
      +'<button class="btn-analyze-watch" onclick="analyzeFromWatch(\''+sym+'\')">'+T('analyzeBtn')+'</button>'
      +'<button class="btn-remove-watch" onclick="removeFromWatchlist(\''+sym+'\')">✕</button>'
      +'</div>';
    el.appendChild(d);
  });
  renderPresetList('israelList',ISRAEL_STOCKS);
  renderPresetList('usList',US_STOCKS);
}
function renderPresetList(elId,stocks){
  var el=document.getElementById(elId);var list=loadWatchlist();el.innerHTML='';
  stocks.forEach(function(s){
    var inList=list.indexOf(s.sym)!==-1;
    var d=document.createElement('div');d.className='preset-item';
    d.innerHTML='<div class="preset-sym">'+s.sym+'</div><div class="preset-name">'+s.name+'</div>'
      +'<div class="preset-actions">'
      +'<button class="btn-preset-analyze" onclick="analyzeFromWatch(\''+s.sym+'\')">'+T('analyzeBtn')+'</button>'
      +'<button class="btn-preset-add'+(inList?' added':'')+'" onclick="togglePreset(\''+s.sym+'\')">'+(inList?T('addedToWatch'):T('addToWatch'))+'</button>'
      +'</div>';
    el.appendChild(d);
  });
}
function togglePreset(sym){if(isInWatchlist(sym))removeFromWatchlist(sym);else addToWatchlist(sym);renderWatchlist();}
function openWatchPanel(){renderWatchlist();document.getElementById('watchPanel').classList.add('open');document.getElementById('watchOverlay').classList.add('open');document.body.style.overflow='hidden';}
function closeWatchPanel(){document.getElementById('watchPanel').classList.remove('open');document.getElementById('watchOverlay').classList.remove('open');document.body.style.overflow='';}
function switchTab(tab){
  document.querySelectorAll('.watch-tab').forEach(function(b){b.classList.remove('active');});
  document.querySelectorAll('.tab-pane').forEach(function(p){p.classList.remove('active');});
  document.getElementById('tab-'+tab).classList.add('active');
  document.getElementById('pane-'+tab).classList.add('active');
  if(tab==='israel')renderPresetList('israelList',ISRAEL_STOCKS);
  else if(tab==='us')renderPresetList('usList',US_STOCKS);
}
function analyzeFromWatch(sym){closeWatchPanel();document.getElementById('stockInput').value=sym;analyzeStock(sym);window.scrollTo({top:0,behavior:'smooth'});}

/* Analyze All */
var analyzeAllRunning=false;
async function analyzeAllWatchlist(){
  var list=loadWatchlist();if(!list.length||analyzeAllRunning)return;
  analyzeAllRunning=true;
  var wrap=document.getElementById('allResultsWrap');wrap.style.display='block';wrap.innerHTML='';
  document.getElementById('btnAnalyzeAll').disabled=true;
  list.forEach(function(sym){
    var row=document.createElement('div');row.className='all-result-row';row.id='allrow-'+sym;
    row.innerHTML='<div class="all-result-sym">'+sym+'</div><div class="all-result-loading" id="allstat-'+sym+'">...</div>';
    wrap.appendChild(row);
  });
  for(var j=0;j<list.length;j++){
    var s=list[j];
    try{
      var r=await fetchAnalysis(s);
      cacheAnalysis(s,r);
      var statEl=document.getElementById('allstat-'+s);var rowEl=document.getElementById('allrow-'+s);
      if(statEl&&r){
        var recKey=r.recommendation;
        var color=recKey==='BUY'?'var(--green)':recKey==='SELL'?'var(--red)':'var(--gold)';
        var recTxt=recKey==='BUY'?T('recBuy'):recKey==='SELL'?T('recSell'):T('recHold');
        statEl.className='all-result-rec';statEl.style.color=color;statEl.textContent=recTxt+' '+r.confidenceScore+'%';
        if(r.currentPrice){var pr=document.createElement('div');pr.className='all-result-conf';pr.textContent=r.currentPrice;rowEl.appendChild(pr);}
        (function(sym2,res){rowEl.onclick=function(){closeWatchPanel();renderResult(res,sym2);document.getElementById('stockInput').value=sym2;window.scrollTo({top:0,behavior:'smooth'});};})(s,r);
      }
    }catch(e){var se=document.getElementById('allstat-'+s);if(se){se.textContent='ERR';se.style.color='var(--red)';}}
  }
  analyzeAllRunning=false;document.getElementById('btnAnalyzeAll').disabled=false;
  renderWatchlist();
}

/* Export/Import */
function exportWatchlist(){
  var data=JSON.stringify({app:'StockAI',version:APP_VERSION,user:getUsername(),stockai_watchlist:loadWatchlist(),stockai_thesis:thLoad(),stockai_scoreboard:sbLoad(),stockai_portfolio:pfLoad(),stockai_alerts:alLoad(),exported:new Date().toISOString()},null,2);
  var blob=new Blob([data],{type:'application/json'});var url=URL.createObjectURL(blob);
  var a=document.createElement('a');a.href=url;a.download='stockai-watchlist.json';document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
  showToastMsg(T('backupExport')+' ✓');
}
function importWatchlist(){document.getElementById('importFileInput').click();}
function handleImport(e){
  var file=e.target.files[0];if(!file)return;
  var reader=new FileReader();
  reader.onload=function(ev){
    try{
      var data=JSON.parse(ev.target.result);var imported=data.stockai_watchlist||data;
      if(Array.isArray(data.stockai_portfolio)&&!pfLoad().length)pfSave(data.stockai_portfolio);
      if(Array.isArray(data.stockai_alerts)){var al=alLoad(),aids=al.map(function(x){return x.id;});data.stockai_alerts.forEach(function(x){if(x&&x.id&&aids.indexOf(x.id)<0)al.push(x);});alSave(al);}
      if(Array.isArray(data.stockai_scoreboard)){var sb=sbLoad(),ids=sb.map(function(x){return x.id;});data.stockai_scoreboard.forEach(function(x){if(x&&x.id&&ids.indexOf(x.id)<0)sb.push(x);});sb.sort(function(a,b){return a.id-b.id;});sbSave(sb);}
      if(data.stockai_thesis&&typeof data.stockai_thesis==='object'){var th=thLoad();for(var ks in data.stockai_thesis){if(!th[ks])th[ks]=data.stockai_thesis[ks];}thSaveAll(th);}
      if(Array.isArray(imported)){var ex=loadWatchlist();imported.forEach(function(s){if(ex.indexOf(s)===-1)ex.push(s);});saveWatchlist(ex);renderWatchlist();showToastMsg(T('backupImport')+' ✓');}
    }catch(err){showToastMsg('Error reading file');}
  };reader.readAsText(file);e.target.value='';
}

/* ══════════════════════════════════════════════════
   ANALYSIS CACHE — stale detection
══════════════════════════════════════════════════ */
function getAnalysisCache(){try{return JSON.parse(localStorage.getItem('stockai_cache'))||{};}catch(e){return{};}}
function saveAnalysisCache(cache){localStorage.setItem('stockai_cache',JSON.stringify(cache));}
function cacheAnalysis(sym,result){
  var cache=getAnalysisCache();
  cache[sym]={result:result,ts:Date.now()};
  var keys=Object.keys(cache);
  if(keys.length>20)delete cache[keys[0]];
  saveAnalysisCache(cache);
}
function formatAge(ts){
  var mins=Math.floor((Date.now()-ts)/60000);
  if(mins<1)return '<1min';if(mins<60)return mins+'min';
  var hrs=Math.floor(mins/60);if(hrs<24)return hrs+'h';
  return Math.floor(hrs/24)+'d';
}
function isStale(sym){
  var cache=getAnalysisCache();var entry=cache[sym];
  if(!entry)return false;
  return(Date.now()-entry.ts)>2*60*60*1000;
}
function showStaleBar(sym,ts){
  var bar=document.getElementById('staleBar');
  document.getElementById('staleText').textContent=T('staleMsg').replace('{ago}',formatAge(ts));
  bar.classList.add('visible');
}
function hideStaleBar(){document.getElementById('staleBar').classList.remove('visible');}
function refreshAnalysis(){var sym=document.getElementById('rSym').textContent;if(sym)analyzeStock(sym);}
;(window.__MODS=window.__MODS||{})['app-core']=1;

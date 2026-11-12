/* ═══════════════════════════════════════════════════════════════════════
   AppNest Assistant — המנוע הקבוע (זהה בכל האפליקציות) · גרסה 2: 5 שפות, callAI מהאפליקציה, שרשרת מודלים ל-Claude
   ─────────────────────────────────────────────────────────────────────
   צ'אטבוט היברידי: מדבר בשפה טבעית, עונה על שאלות, ויכול לבצע פעולות
   באפליקציה (לכתוב לשדה, לנווט בין מסכים, להדגיש כפתור).

   איך זה בנוי:
   • המנוע (הקובץ הזה) — לא משתנה בין אפליקציות. מעתיקים אותו כמו שהוא.
   • ה"מפה" — window.APPNEST_ASSISTANT_CONFIG, מוגדרת בכל אפליקציה בנפרד,
     ומתארת למנוע את המסכים/השדות/הכפתורים והרקע של אותה אפליקציה.

   ה-AI: משתמש ב-BYOK הקיים (המפתח שהמשתמש כבר חיבר). נקרא בשפת-האם של כל
   ספק (Claude / Gemini / OpenAI / מקומי / מותאם) — בלי שכבות תרגום.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var CFG0 = window.APPNEST_ASSISTANT_CONFIG;
  if (!CFG0) { console.warn('[AppNest Assistant] אין הגדרות (APPNEST_ASSISTANT_CONFIG) — המנוע לא הופעל.'); return; }
  // המפה נקראת בכל שימוש (לא נשמרת פעם אחת) — אפליקציה שבונה מחדש את המפה בהחלפת שפה תקבל את החדשה.
  function C() { return window.APPNEST_ASSISTANT_CONFIG || CFG0; }

  /* ─────────────── 0. שפה — 5 שפות (גרסה 2) ───────────────
     המפה יכולה להגדיר lang: 'en' או lang: function(){ return curLang; }.
     בלי lang — עברית, כמו קודם (תאימות לאחור לכל האפליקציות הקיימות). */
  var I18N = {
    he: { btn: 'עוזר', title: 'עוזר {0}', clear: 'נקה שיחה', ph: 'שאל אותי משהו, או בקש עזרה…', send: 'שלח', thinking: '…חושב',
      read: 'הקרא / עצור', copy: 'העתק', mic: 'דבר במקום להקליד', nav: 'עברתי למסך "{0}".', wrote: 'כתבתי ל{0}.', field: 'שדה',
      hl: 'הנה זה — סימנתי לך בזהב.', done: 'בוצע ✓', actFail: 'ניסיתי לבצע פעולה אבל לא מצאתי את היעד באפליקציה.',
      noAI: 'כדי לדבר איתי, חבר קודם מפתח AI בהגדרות הבינה של האפליקציה 🔌', oops: 'אופס, משהו השתבש: ',
      micDenied: 'אין לי גישה למיקרופון. אשר את ההרשאה בהגדרות הדפדפן (ליד כתובת האתר) ונסה שוב 🎤', noSpeech: 'לא שמעתי כלום — נסה לדבר קצת יותר חזק 🙂',
      srNo: 'זיהוי הדיבור לא נתמך בדפדפן הזה — אפשר פשוט להקליד 🙂', micFail: 'לא הצלחתי להפעיל את המיקרופון — אפשר פשוט להקליד 🙂',
      hello: 'היי! אני העוזר של {0}. אפשר לשאול אותי כל דבר, לבקש שאכתוב תוכן ישר לאפליקציה, או לעזור לך למצוא דברים. במה אעזור?' },
    en: { btn: 'Assistant', title: '{0} Assistant', clear: 'Clear chat', ph: 'Ask me anything, or ask for help…', send: 'Send', thinking: 'Thinking…',
      read: 'Read aloud / stop', copy: 'Copy', mic: 'Speak instead of typing', nav: 'Opened "{0}".', wrote: 'Wrote to {0}.', field: 'the field',
      hl: 'Here it is — highlighted in gold.', done: 'Done ✓', actFail: 'I tried to do that, but could not find the target in the app.',
      noAI: 'To talk with me, first connect an AI key in the app\'s AI settings 🔌', oops: 'Oops, something went wrong: ',
      micDenied: 'I have no access to the microphone. Allow it in the browser settings (next to the address) and try again 🎤', noSpeech: 'I didn\'t hear anything — try speaking a bit louder 🙂',
      srNo: 'Speech recognition is not supported in this browser — you can just type 🙂', micFail: 'I couldn\'t start the microphone — you can just type 🙂',
      hello: 'Hi! I\'m the {0} assistant. Ask me anything, ask me to fill something in for you, or to help you find things. How can I help?' },
    ru: { btn: 'Помощник', title: 'Помощник {0}', clear: 'Очистить чат', ph: 'Спросите что угодно или попросите помочь…', send: 'Отправить', thinking: 'Думаю…',
      read: 'Прочитать / стоп', copy: 'Копировать', mic: 'Говорить вместо ввода', nav: 'Открыл «{0}».', wrote: 'Записал в {0}.', field: 'поле',
      hl: 'Вот здесь — выделил золотым.', done: 'Готово ✓', actFail: 'Я попытался выполнить действие, но не нашёл цель в приложении.',
      noAI: 'Чтобы поговорить со мной, сначала подключите ключ ИИ в настройках приложения 🔌', oops: 'Упс, что-то пошло не так: ',
      micDenied: 'Нет доступа к микрофону. Разрешите его в настройках браузера (рядом с адресом) и попробуйте снова 🎤', noSpeech: 'Я ничего не услышал — попробуйте говорить чуть громче 🙂',
      srNo: 'Распознавание речи не поддерживается этим браузером — можно просто печатать 🙂', micFail: 'Не удалось включить микрофон — можно просто печатать 🙂',
      hello: 'Привет! Я помощник {0}. Спросите что угодно, попросите что-то заполнить или помочь найти. Чем помочь?' },
    es: { btn: 'Asistente', title: 'Asistente de {0}', clear: 'Borrar chat', ph: 'Pregúntame lo que quieras o pide ayuda…', send: 'Enviar', thinking: 'Pensando…',
      read: 'Leer en voz alta / parar', copy: 'Copiar', mic: 'Habla en vez de escribir', nav: 'Abrí "{0}".', wrote: 'Escribí en {0}.', field: 'el campo',
      hl: 'Aquí está — lo marqué en dorado.', done: 'Hecho ✓', actFail: 'Intenté hacerlo, pero no encontré el destino en la app.',
      noAI: 'Para hablar conmigo, conecta primero una clave de IA en los ajustes de la app 🔌', oops: 'Ups, algo salió mal: ',
      micDenied: 'No tengo acceso al micrófono. Permítelo en los ajustes del navegador (junto a la dirección) e inténtalo de nuevo 🎤', noSpeech: 'No oí nada — intenta hablar un poco más fuerte 🙂',
      srNo: 'Este navegador no admite reconocimiento de voz — puedes escribir 🙂', micFail: 'No pude activar el micrófono — puedes escribir 🙂',
      hello: '¡Hola! Soy el asistente de {0}. Pregúntame lo que quieras, pídeme que rellene algo o que te ayude a encontrar cosas. ¿En qué te ayudo?' },
    ar: { btn: 'المساعد', title: 'مساعد {0}', clear: 'مسح المحادثة', ph: 'اسألني أي شيء أو اطلب المساعدة…', send: 'إرسال', thinking: '…أفكر',
      read: 'اقرأ / توقف', copy: 'نسخ', mic: 'تحدث بدلاً من الكتابة', nav: 'فتحت "{0}".', wrote: 'كتبت في {0}.', field: 'الحقل',
      hl: 'ها هو — ميّزته بالذهبي.', done: 'تم ✓', actFail: 'حاولت تنفيذ ذلك لكن لم أجد الهدف في التطبيق.',
      noAI: 'للتحدث معي، اربط أولاً مفتاح ذكاء اصطناعي في إعدادات التطبيق 🔌', oops: 'عذراً، حدث خطأ: ',
      micDenied: 'لا يوجد وصول إلى الميكروفون. اسمح به في إعدادات المتصفح (بجانب العنوان) وحاول مجدداً 🎤', noSpeech: 'لم أسمع شيئاً — حاول التحدث بصوت أعلى قليلاً 🙂',
      srNo: 'التعرف على الكلام غير مدعوم في هذا المتصفح — يمكنك الكتابة 🙂', micFail: 'لم أتمكن من تشغيل الميكروفون — يمكنك الكتابة 🙂',
      hello: 'مرحباً! أنا مساعد {0}. اسألني أي شيء، أو اطلب مني ملء شيء، أو مساعدتك في إيجاد الأشياء. كيف أساعدك؟' }
  };
  var LANG_NAME = { he: 'עברית', en: 'English', ru: 'Russian (русский)', es: 'Spanish (español)', ar: 'Arabic (العربية)' };
  var SPEECH = { he: 'he-IL', en: 'en-US', ru: 'ru-RU', es: 'es-ES', ar: 'ar-SA' };
  function lang() { var c = C(), l = typeof c.lang === 'function' ? c.lang() : c.lang; return I18N[l] ? l : 'he'; }
  function T(k, a) { var s = (I18N[lang()] || I18N.he)[k]; if (s == null) s = I18N.he[k]; return a != null ? s.split('{0}').join(a) : s; }
  function dir() { var l = lang(); return (l === 'he' || l === 'ar') ? 'rtl' : 'ltr'; }

  /* ─────────────── 1. קריאת ה-AI לפי הספק שהמשתמש חיבר ─────────────── */
  // קורא את הגדרות ה-BYOK של האפליקציה. שם המפתח ב-localStorage ניתן להתאמה
  // דרך המפה (C().aiConfigKey); ברירת מחדל מתאימה ל-SunoPrep/AppNest.
  function readAiConfig() {
    // אם האפליקציה מגדירה קריאת config משלה (כי היא שומרת מפתחות אחרת) — נשתמש בה.
    if (typeof C().readAiConfig === 'function') { try { return C().readAiConfig(); } catch (e) { return null; } }
    var storeKey = C().aiConfigKey || 'sp_ai-config';
    try {
      var raw = localStorage.getItem(storeKey);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }

  function clean(s) { return (s || '').replace(/[\r\n\t]/g, '').trim(); }
  // מפצל שדה מפתחות (שיכול להכיל כמה מפתחות מופרדים בפסיק/שורה) ומחזיר את הראשון הנקי,
  // בדיוק כמו שהאפליקציה עצמה עושה. מונע מצב של פסיקים/רווחים נסתרים שמשבשים את המפתח.
  function firstKey(s) {
    var arr = (s || '').split(/[\n,;]+/).map(function (x) { return x.trim(); }).filter(Boolean);
    return arr[0] || '';
  }

  // מריץ prompt מול הספק המחובר, מחזיר טקסט. זורק אם אין מפתח/ספק.
  async function callAI(prompt) {
    // אפליקציה עם שכבת AI משלה (שרשראות מודלים, ריבוי מפתחות) — משתמשים בה, כדי ששמות מודלים שפגו לא ישברו את העוזר.
    if (typeof C().callAI === 'function') {
      var cfgA = readAiConfig();
      if (!cfgA || !cfgA.provider) throw new Error('NO_AI');
      return await C().callAI(prompt);
    }
    var cfg = readAiConfig();
    if (!cfg || !cfg.provider) throw new Error('NO_AI');
    var p = cfg.provider, k = cfg.keys || {};

    if (p === 'gemini') {
      // מתחיל תמיד מהמודל העדכני (alias שמצביע על הכי חדש), עם גיבויים עדכניים.
      // לא נשען על מודל שמור — כדי לא להיתקע על גרסה שכבר לא קיימת.
      var models = ['gemini-flash-latest', 'gemini-3.5-flash', 'gemini-2.0-flash'];
      var key = firstKey(k.gemini), lastErr = null;
      for (var i = 0; i < models.length; i++) {
        var genCfg = { temperature: 0.5, maxOutputTokens: 4000 };
        if (models[i].indexOf('gemini-2.5') === 0 || models[i].indexOf('gemini-3') === 0) genCfg.thinkingConfig = { thinkingBudget: 0 };
        try {
          var r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + models[i] + ':generateContent?key=' + encodeURIComponent(key), {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: genCfg })
          });
          if (r.ok) {
            var d = await r.json();
            return (d && d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts[0] && d.candidates[0].content.parts[0].text) || '';
          }
          var ej = await r.json().catch(function () { return {}; });
          lastErr = new Error((ej && ej.error && ej.error.message) || ('HTTP ' + r.status));
          if ([404, 429, 500, 503].indexOf(r.status) === -1) throw lastErr;
        } catch (e) { lastErr = e; }
      }
      throw lastErr || new Error('Gemini unavailable');
    }

    if (p === 'claude') {
      // שרשרת מודלים — שם מודל שפג מעביר לבא בתור (כלל הזהב)
      var cms = ['claude-sonnet-5', 'claude-sonnet-4-6', 'claude-haiku-4-5-20251001'], cErr = null;
      for (var ci = 0; ci < cms.length; ci++) {
        var res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': firstKey(k.claude),
            'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
          body: JSON.stringify({ model: cms[ci], max_tokens: 4000, messages: [{ role: 'user', content: prompt }] })
        });
        if (res.ok) { var dc = await res.json(); return (dc.content || []).filter(function (x) { return x.type === 'text'; }).map(function (x) { return x.text; }).join('\n'); }
        var ec = await res.json().catch(function () { return {}; });
        cErr = new Error((ec.error && ec.error.message) || ('HTTP ' + res.status));
        if ([400, 404, 429, 500, 503, 529].indexOf(res.status) === -1) throw cErr;
      }
      throw cErr || new Error('Claude unavailable');
    }

    // openai / device / custom — כולם פורמט OpenAI
    var url, okey, model;
    if (p === 'openai') { url = 'https://api.openai.com/v1/chat/completions'; okey = firstKey(k.openai); model = 'gpt-4o-mini'; }
    else if (p === 'device') { url = (k.deviceUrl || '').replace(/\/+$/, '') + '/chat/completions'; okey = ''; model = 'llama3'; }
    else if (p === 'custom') { url = k.customUrl || ''; okey = firstKey(k.customKey); model = 'gpt-4o-mini'; }
    else throw new Error('UNKNOWN_PROVIDER');
    var h = { 'Content-Type': 'application/json' };
    if (okey) h['Authorization'] = 'Bearer ' + okey;
    var ro = await fetch(url, { method: 'POST', headers: h,
      body: JSON.stringify({ model: model, max_tokens: 4000, messages: [{ role: 'user', content: prompt }] }) });
    if (!ro.ok) { var eo = await ro.json().catch(function () { return {}; }); throw new Error((eo.error && eo.error.message) || ('HTTP ' + ro.status)); }
    var do_ = await ro.json();
    return (do_.choices && do_.choices[0] && do_.choices[0].message && do_.choices[0].message.content) || '';
  }

  /* ─────────────── 2. פעולות על האפליקציה (מבוססות המפה) ─────────────── */
  // מציאת אלמנט לפי טקסט גלוי (יציב יותר מ-selectors באפליקציית React)
  function findByText(tag, text) {
    var els = document.querySelectorAll(tag);
    text = text.trim();
    for (var i = 0; i < els.length; i++) {
      var t = (els[i].textContent || '').trim();
      if (t === text || t.indexOf(text) !== -1) return els[i];
    }
    return null;
  }
  function findField(spec) {
    if (spec.placeholder) {
      var els = document.querySelectorAll('textarea, input');
      for (var i = 0; i < els.length; i++) {
        var ph = els[i].getAttribute('placeholder') || '';
        if (ph.indexOf(spec.placeholder) !== -1) return els[i];
      }
    }
    if (spec.selector) return document.querySelector(spec.selector);
    return null;
  }
  // כתיבה לשדה בצורה ש-React "רואה" (native setter + אירוע input)
  function setReactValue(el, value) {
    var proto = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
    var setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
    setter.call(el, value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }
  function flash(el) {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    var old = el.style.boxShadow, oldT = el.style.transition;
    el.style.transition = 'box-shadow .3s';
    el.style.boxShadow = '0 0 0 3px #C9A84C, 0 0 18px #C9A84C';
    setTimeout(function () { el.style.boxShadow = old; el.style.transition = oldT; }, 2200);
  }

  // מבצע פעולה שה-AI ביקש. מחזיר טקסט-משוב קצר (או null אם נכשל).
  function runAction(act) {
    try {
      if (act.action === 'navigate') {
        var tab = (C().tabs || []).filter(function (t) { return t.name === act.target; })[0];
        // אם האפליקציה מגדירה פונקציית ניווט משלה (למשל showScreen) — נשתמש בה.
        if (typeof C().navigate === 'function') {
          if (!tab) return null;
          C().navigate(tab.screen || tab.match || act.target);
          return T('nav', act.target);
        }
        // ברירת מחדל: מציאת כפתור לפי טקסט ולחיצה
        var btn = findByText('button', (tab && tab.match) || act.target);
        if (btn) { btn.click(); return T('nav', act.target); }
        return null;
      }
      if (act.action === 'writeField') {
        var fld = (C().fields || []).filter(function (f) { return f.name === act.target; })[0];
        var el = fld && findField(fld);
        if (el) { setReactValue(el, act.text || ''); flash(el); return T('wrote', fld.label || T('field')); }
        return null;
      }
      if (act.action === 'highlight') {
        var target = act.target;
        var el2 = findByText('button', target) || (C().fields || []).filter(function (f) { return f.name === target; }).map(function (f) { return findField(f); })[0];
        if (el2) { flash(el2); return T('hl'); }
        return null;
      }
      if (act.action === 'appAction') {
        // פעולה ייחודית לאפליקציה — מוגדרת במפה (C().actions), מפעילה פונקציה של האפליקציה.
        var custom = (C().actions || {})[act.target];
        if (custom && typeof custom.run === 'function') {
          try { custom.run(); return custom.done || T('done'); } catch (e) { return null; }
        }
        return null;
      }
    } catch (e) { return null; }
    return null;
  }

  /* ─────────────── 3. הנחיית ה-AI (system prompt מהמפה) ─────────────── */
  function buildPrompt(history, userMsg) {
    var tabNames = (C().tabs || []).map(function (t) { return '"' + t.name + '"'; }).join(', ');
    var fieldList = (C().fields || []).map(function (f) { return '"' + f.name + '" (' + (f.label || '') + ')'; }).join(', ');
    var convo = history.slice(-12).map(function (m) { return (m.role === 'user' ? 'משתמש' : 'עוזר') + ': ' + m.text; }).join('\n');

    // "עיניים" — קורא את התוכן הנוכחי של השדות, כדי שהעוזר יוכל להתייחס אליו
    // (לשפר, לתרגם, לענות על "מה כתבתי") בלי לבקש מהמשתמש להדביק.
    var fieldState = (C().fields || []).map(function (f) {
      var el = findField(f);
      var val = el ? (el.value || '') : '';
      if (val.length > 1500) val = val.slice(0, 1500) + '…';
      return '• ' + (f.label || f.name) + ': ' + (val ? '"' + val + '"' : '(ריק)');
    }).join('\n');

    // מצב כללי של האפליקציה (אם האפליקציה מספקת תיאור מצב משלה)
    var appState = '';
    if (typeof C().readState === 'function') { try { appState = C().readState() || ''; } catch (e) {} }

    // פעולות ייחודיות לאפליקציה (מעבר לניווט/כתיבה/הדגשה)
    var customActions = C().actions || {};
    var actionList = Object.keys(customActions).map(function (k) { return '"' + k + '" — ' + (customActions[k].desc || ''); }).join('\n');

    return [
      'אתה עוזר חכם בתוך האפליקציה "' + C().appName + '".',
      C().appDescription || '',
      '',
      'אתה יכול גם לבצע פעולות באפליקציה. כשמתאים, החזר בלוק פעולה בשורה נפרדת בסוף התשובה,',
      'בפורמט הזה בדיוק (JSON בין הסימנים):',
      '<<ACTION>>{"action":"navigate","target":"שם המסך"}<<END>>',
      '<<ACTION>>{"action":"writeField","target":"שם השדה","text":"התוכן המלא"}<<END>>',
      '<<ACTION>>{"action":"highlight","target":"טקסט הכפתור או שם השדה"}<<END>>',
      (actionList ? '<<ACTION>>{"action":"appAction","target":"שם הפעולה"}<<END>>' : ''),
      'אם המשתמש ביקש כמה דברים ברצף (למשל "כתוב שיר ואז עבור לקולות") — החזר כמה בלוקי פעולה, כל אחד בשורה נפרדת, בסדר שבו הם צריכים להתבצע (בדרך כלל: קודם לכתוב לשדה, ורק אחר כך לנווט למסך אחר).',
      '',
      'מסכים זמינים לניווט: ' + (tabNames || '(אין)'),
      'שדות זמינים לכתיבה: ' + (fieldList || '(אין)'),
      (actionList ? 'פעולות ייחודיות זמינות (appAction):\n' + actionList : ''),
      '',
      'התוכן שנמצא כרגע בשדות האפליקציה (כדי שתוכל להתייחס אליו — לשפר, לתרגם, לענות עליו):',
      (fieldState || '(אין שדות)'),
      (appState ? '\nמצב האפליקציה כרגע:\n' + appState : ''),
      '',
      (lang() === 'he' ? 'כללים: דבר בעברית, טבעי וידידותי.' : 'כללים: ענה אך ורק בשפה ' + LANG_NAME[lang()] + ', טבעי וידידותי.') + ' תמיד כתוב קודם תשובה קצרה למשתמש, ורק אחריה (אם צריך) את בלוק הפעולה.',
      'אם המשתמש מבקש ליצור או לשנות תוכן (שיר, טקסט) — כתוב את התוצאה המלאה בתוך writeField, לא בגוף הצ\'אט.',
      'אם המשתמש מבקש לשפר/לשנות/לתרגם משהו "שכתבתי" — התבסס על התוכן הנוכחי של השדות למעלה.',
      'לניווט (navigate): השתמש אך ורק בשם מסך שמופיע בדיוק ברשימת המסכים למעלה. אם המשתמש מבקש מסך שלא ברשימה — אל תנחש ואל תנווט למסך אחר; במקום זה אמור לו בקצרה שאין מסך כזה, או שאל למה התכוון.',
      'אם זו רק שאלה/שיחה — אל תחזיר בלוק פעולה בכלל.',
      '',
      (convo ? 'שיחה עד כה:\n' + convo + '\n' : ''),
      'משתמש: ' + userMsg,
      'עוזר:'
    ].join('\n');
  }

  function parseReply(raw) {
    var actions = [], text = raw;
    var re = /<<ACTION>>([\s\S]*?)<<END>>/g, m;
    while ((m = re.exec(raw)) !== null) {
      try { actions.push(JSON.parse(m[1].trim())); } catch (e) {}
    }
    text = raw.replace(/<<ACTION>>[\s\S]*?<<END>>/g, '').trim();
    return { text: text, actions: actions };
  }

  /* ─────────────── 4. ממשק המשתמש (חלון צ'אט + כפתור) ─────────────── */
  // זיכרון מתמשך — השיחה נשמרת מקומית (localStorage) ונטענת בביקור הבא.
  // מפתח ייחודי לכל אפליקציה, כדי שאפליקציות שונות לא יחלקו זיכרון.
  var HKEY = 'appnest_asst_hist_' + (C().appName || 'app');
  function loadHistory() { try { return JSON.parse(localStorage.getItem(HKEY)) || []; } catch (e) { return []; } }
  function saveHistory() { try { localStorage.setItem(HKEY, JSON.stringify(history.slice(-30))); } catch (e) {} }
  var history = loadHistory(), panelEl = null, bodyEl = null, panelInput = null, panelSend = null, busy = false, open = false;

  function el(tag, css, txt) { var e = document.createElement(tag); if (css) e.style.cssText = css; if (txt != null) e.textContent = txt; return e; }

  // הקראת טקסט בעברית (Text-to-Speech מובנה בדפדפן)
  var activePlayBtn = null;
  function stopSpeak() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (activePlayBtn) { activePlayBtn.textContent = '🔊'; activePlayBtn = null; }
  }
  function speak(text, btn) {
    if (!window.speechSynthesis) return;
    stopSpeak();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = SPEECH[lang()] || 'he-IL'; u.rate = 1;
    u.onend = function () { if (btn) btn.textContent = '🔊'; if (activePlayBtn === btn) activePlayBtn = null; };
    if (btn) { btn.textContent = '⏹'; activePlayBtn = btn; }
    window.speechSynthesis.speak(u);
  }

  function addBubble(role, text) {
    var ltr = dir() === 'ltr';  // משתמש בצד ההתחלה של שפת ימין-לשמאל (ימין), ובשפות שמאל-לימין — בצד ימין גם כן
    var wrap = el('div', 'display:flex;align-items:flex-end;gap:5px;margin:8px 0;' + ((role === 'user') !== ltr ? 'justify-content:flex-start;' : 'justify-content:flex-end;'));
    var b = el('div',
      'max-width:82%;padding:9px 13px;border-radius:14px;font:14px/1.5 "Segoe UI",sans-serif;white-space:pre-wrap;word-break:break-word;direction:' + dir() + ';' +
      (role === 'user'
        ? 'background:#2a2a33;color:#eee;border-top-right-radius:4px;'
        : 'background:#C9A84C;color:#0B0B0F;border-top-left-radius:4px;'), text);
    if (role === 'bot' && window.speechSynthesis) {
      var play = el('button', 'background:none;border:none;cursor:pointer;font-size:15px;opacity:.6;padding:2px;flex-shrink:0;', '🔊');
      play.title = T('read');
      play.onclick = function () {
        // אם הכפתור הזה כרגע מקריא — עצור. אחרת — התחל להקריא (ועצור כל הקראה אחרת).
        if (activePlayBtn === play) stopSpeak();
        else speak(b.textContent, play);
      };
      wrap.appendChild(play);
    }
    if (role === 'bot') {
      var copy = el('button', 'background:none;border:none;cursor:pointer;font-size:14px;opacity:.6;padding:2px;flex-shrink:0;', '📋');
      copy.title = T('copy');
      copy.onclick = function () {
        var txt = b.textContent;
        var done = function () { copy.textContent = '✓'; setTimeout(function () { copy.textContent = '📋'; }, 1400); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () {});
        else { try { var ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); done(); } catch (e) {} }
      };
      wrap.appendChild(copy);
    }
    wrap.appendChild(b); bodyEl.appendChild(wrap); bodyEl.scrollTop = bodyEl.scrollHeight;
    return b;
  }

  function setBusy(v) {
    busy = v;
    if (panelSend) { panelSend.disabled = v; panelSend.style.opacity = v ? '.5' : '1'; panelSend.textContent = v ? '…' : T('send'); }
    if (panelInput) { panelInput.disabled = v; }
  }

  async function send(input) {
    if (busy) return;                          // מונע שליחה כפולה בזמן שהעוזר עונה
    var msg = input.value.trim(); if (!msg) return;
    input.value = ''; addBubble('user', msg);
    var thinking = addBubble('bot', T('thinking'));
    setBusy(true);
    try {
      var prompt = buildPrompt(history, msg);
      var raw = await callAI(prompt);
      var parsed = parseReply(raw);
      thinking.textContent = parsed.text || '✓';
      history.push({ role: 'user', text: msg });
      history.push({ role: 'bot', text: parsed.text });
      if (history.length > 30) history = history.slice(-30);
      saveHistory();
      // מבצע את הפעולות לפי הסדר, עם השהיה קטנה בין פעולות כדי לתת למסך להתעדכן
      for (var ai = 0; ai < parsed.actions.length; ai++) {
        var fb = runAction(parsed.actions[ai]);
        if (fb) addBubble('bot', fb);
        else addBubble('bot', T('actFail'));
        if (ai < parsed.actions.length - 1) await new Promise(function (r) { setTimeout(r, 450); });
      }
    } catch (e) {
      if (e.message === 'NO_AI') thinking.textContent = T('noAI');
      else thinking.textContent = T('oops') + e.message;
    } finally {
      setBusy(false);
      if (panelInput) panelInput.focus();
    }
  }

  function addSuggestions(inp) {
    var sugg = C().suggestions || [];
    if (!sugg.length) return;
    var row = el('div', 'display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end;margin:4px 0 8px;');
    sugg.forEach(function (s) {
      var chip = el('button', 'background:#1e1e26;color:#C9A84C;border:1px solid #C9A84C55;border-radius:14px;padding:6px 11px;font:13px "Segoe UI",sans-serif;cursor:pointer;direction:' + dir() + ';', s);
      chip.onclick = function () { inp.value = s; row.remove(); send(inp); };
      row.appendChild(chip);
    });
    bodyEl.appendChild(row); bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function buildPanel() {
    panelEl = el('div', 'position:fixed;bottom:78px;left:16px;width:340px;max-width:calc(100vw - 32px);height:460px;max-height:calc(100vh - 120px);' +
      'background:#141418;border:1px solid #2e2e38;border-radius:16px;z-index:100000;display:none;flex-direction:column;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.55);direction:' + dir() + ';');
    panelEl.id = 'appnest-assistant-panel';
    var head = el('div', 'padding:12px 14px;background:linear-gradient(90deg,#1a1a20,#141418);border-bottom:1px solid #2e2e38;display:flex;align-items:center;gap:8px;');
    head.appendChild(el('span', 'font-size:17px;', '🪄'));
    head.appendChild(el('span', 'color:#C9A84C;font:600 15px "Segoe UI",sans-serif;', T('title', C().appName)));
    var clr = el('span', 'margin-inline-start:auto;cursor:pointer;color:#888;font-size:15px;line-height:1;', '🗑️');
    clr.title = T('clear');
    clr.onclick = clearChat;
    head.appendChild(clr);
    var x = el('span', 'cursor:pointer;color:#888;font-size:20px;line-height:1;', '×');
    x.onclick = toggle; head.appendChild(x);
    bodyEl = el('div', 'flex:1;overflow-y:auto;padding:12px;');
    var foot = el('div', 'padding:10px;border-top:1px solid #2e2e38;display:flex;gap:8px;align-items:center;');
    var inp = el('input', 'flex:1;background:#0d0d11;border:1px solid #2e2e38;border-radius:20px;padding:9px 14px;min-width:0;color:#eee;font:14px "Segoe UI",sans-serif;direction:' + dir() + ';outline:none;');
    inp.placeholder = T('ph');
    inp.onkeydown = function (ev) { if (ev.key === 'Enter') send(inp); };
    // כפתור מיקרופון — דיבור לטקסט (Web Speech API, חינם, מובנה בדפדפן)
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      var rec = new SR();
      rec.lang = SPEECH[lang()] || 'he-IL'; rec.interimResults = false; rec.maxAlternatives = 1;
      var listening = false, micGranted = false;
      var mic = el('button', 'background:#2a2a33;color:#C9A84C;border:none;border-radius:50%;width:38px;height:38px;font-size:17px;cursor:pointer;flex-shrink:0;', '🎤');
      mic.title = T('mic');
      rec.onresult = function (e) { inp.value = e.results[0][0].transcript; inp.focus(); };
      rec.onend = function () { listening = false; mic.style.background = '#2a2a33'; };
      rec.onerror = function (ev) {
        listening = false; mic.style.background = '#2a2a33';
        if (ev && (ev.error === 'not-allowed' || ev.error === 'service-not-allowed'))
          addBubble('bot', T('micDenied'));
        else if (ev && ev.error === 'no-speech')
          addBubble('bot', T('noSpeech'));
        else if (ev && ev.error === 'not-supported')
          addBubble('bot', T('srNo'));
      };
      mic.onclick = async function () {
        if (listening) { rec.stop(); return; }
        // בקשת הרשאה מפורשת — עוזרת בנייד. אם היא נכשלת, עדיין מנסים rec.start()
        // (חלק מהדפדפנים מבקשים הרשאה דרך rec.start עצמו), וההודעה תגיע מ-onerror.
        if (!micGranted && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            var stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(function (t) { t.stop(); });
            micGranted = true;
          } catch (e) { /* לא עוצרים — נותנים ל-rec.start לנסות, ו-onerror יטפל */ }
        }
        try { rec.start(); listening = true; mic.style.background = '#C9A84C'; }
        catch (e) { listening = false; addBubble('bot', T('micFail')); }
      };
      foot.appendChild(mic);
    }
    var snd = el('button', 'background:#C9A84C;color:#0B0B0F;border:none;border-radius:20px;padding:0 16px;height:38px;font:600 14px "Segoe UI",sans-serif;cursor:pointer;flex-shrink:0;', T('send'));
    snd.onclick = function () { send(inp); };
    foot.appendChild(inp); foot.appendChild(snd);
    panelEl.appendChild(head); panelEl.appendChild(bodyEl); panelEl.appendChild(foot);
    document.body.appendChild(panelEl);
    panelInput = inp; panelSend = snd;
    renderConversation();
  }

  // מציג את השיחה בגוף החלון: היסטוריה שמורה אם יש, אחרת הודעת פתיחה + הצעות.
  function renderConversation() {
    bodyEl.innerHTML = '';
    if (history.length) {
      history.forEach(function (m) { addBubble(m.role === 'user' ? 'user' : 'bot', m.text); });
    } else {
      addBubble('bot', T('hello', C().appName));
      if (panelInput) addSuggestions(panelInput);
    }
  }

  function clearChat() {
    history = []; saveHistory(); stopSpeak();
    renderConversation();
  }

  function toggle() {
    if (!panelEl) buildPanel();
    open = !open;
    panelEl.style.display = open ? 'flex' : 'none';
  }

  function addButton() {
    if (document.getElementById('appnest-assistant-btn')) return;
    var b = el('button', 'position:fixed;bottom:16px;left:16px;z-index:100000;background:#C9A84C;color:#0B0B0F;border:none;' +
      'border-radius:24px;padding:10px 18px;font:600 15px "Segoe UI",sans-serif;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.4);', '🪄 ' + T('btn'));
    b.id = 'appnest-assistant-btn';
    b.onclick = toggle;
    document.body.appendChild(b);
  }

  // לשימוש האפליקציה אחרי החלפת שפה: מתרגם את הכפתור ובונה מחדש את החלון (השיחה נשמרת)
  window.AppNestAssistant = {
    refresh: function () {
      var btn = document.getElementById('appnest-assistant-btn'); if (btn) btn.textContent = '🪄 ' + T('btn');
      if (panelEl) { stopSpeak(); panelEl.remove(); panelEl = null; bodyEl = null; panelInput = null; panelSend = null; if (open) { buildPanel(); panelEl.style.display = 'flex'; } }
    },
    toggle: function () { toggle(); },
    isOpen: function () { return open; }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addButton);
  else addButton();
})();

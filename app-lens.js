/* StockAI · app-lens.js — 🧭 strategy lenses (6 rule-based strategies checked on every stock) ·
   3 new screener presets built on them · "why selected / why now" for every screener result (measured vs interpretation)
   Strategy ideas adapted from ZhuLinsen/daily_stock_analysis (MIT) — rewritten for US/Israel; China-only strategies left out.
   AppNest © 2026 · load order: after app-decide.js, before app-import.js / app-init.js */
var P11_T={
he:{lensT:"🧭 עדשות אסטרטגיה",lensSum:"מתאימה ל-{n} מתוך 6 אסטרטגיות",lensNone:"לא מתאימה כרגע לאף אסטרטגיה — אין סיבה טכנית ברורה להיכנס עכשיו",
  stYes:"✅ מתאימה",stNear:"🟡 קרובה",stNo:"— לא",stNa:"❔ אין נתון",
  l_cross:"חציית ממוצעים",l_cross_m:"ממוצע קצר חוצה מעל ממוצע ארוך — סימן לתחילת מגמה עולה.",
  l_cross_y:"ממוצע 20 חצה מעל ממוצע 50 לפני {n} ימים",l_cross_g:"\"צלב זהב\": ממוצע 50 חצה מעל ממוצע 200 לפני {n} ימים",l_cross_n:"ממוצע 20 נמוך ב-{p} מממוצע 50 ועולה — קרוב לחצייה",l_cross_x:"אין חצייה טרייה",
  l_brk:"פריצה בווליום",l_brk_m:"סגירה מעל השיא של 20 הימים עם מחזור גבוה — קונים חזקים נכנסים.",
  l_brk_y:"נסגרה מעל השיא של 20 יום ({h}), עם מחזור ×{r}",l_brk_n:"{p} מתחת לשיא של 20 יום ({h}) — עוד לא פרצה",l_brk_v:"מעל השיא, אבל המחזור חלש (×{r})",l_brk_x:"רחוקה מהשיא של 20 יום",
  l_pb:"תיקון בווליום נמוך",l_pb_m:"במגמה עולה, ירידה שקטה לממוצע 20 — לרוב נקודת כניסה טובה יותר מרדיפה.",
  l_pb_y:"במגמה עולה, {p} מעל ממוצע 20, מחזור 3 ימים ×{r}",l_pb_n:"במגמה עולה ו-{p} מעל ממוצע 20 — קרובה לאזור",l_pb_x:"אין מגמה עולה או רחוקה מהממוצע",
  l_rng:"דשדוש בטווח",l_rng_m:"המניה נעה בין רצפה לתקרה ברורות — קונים ליד הרצפה, מוכרים ליד התקרה.",
  l_rng_y:"טווח {lo}–{hi} ({w}), המחיר בתחתית ({pos})",l_rng_n:"בטווח {lo}–{hi} ({w}), המחיר באמצע ({pos}) — לחכות לרצפה",l_rng_x:"אין טווח ברור (תנועה רחבה או מגמה)",
  l_bot:"תחתית עם ווליום",l_bot_m:"אחרי ירידה גדולה, יום עלייה עם מחזור חריג — סימן אפשרי שהמוכרים נגמרים. מסוכן ומוקדם.",
  l_bot_y:"{p} מתחת לשיא השנתי, ויום עלייה עם מחזור ×{r} ב-5 הימים האחרונים",l_bot_n:"{p} מתחת לשיא השנתי — מחכים ליום עלייה עם ווליום",l_bot_x:"לא בירידה גדולה",
  l_gq:"צמיחה איכותית",l_gq_m:"עסק רווחי שצומח ועבר את מבחן האיכות — מתאים להחזקה ארוכה.",
  l_gq_y:"עברה את מבחן האיכות, צמיחת הכנסות {g}, רווחית",l_gq_n:"{k} מתוך 3 תנאים: איכות, צמיחה מעל 10%, רווחיות",l_gq_x:"לא עומדת בתנאים",l_gq_na:"אין מספיק נתונים פיננסיים",
  lensNote:"כל עדשה היא כלל קבוע שנבדק בקוד מנתוני המסחר. \"מתאימה\" אומר שהתנאים מתקיימים — לא שהמניה תעלה.",
  planLens:"🧭 מתאימה לאסטרטגיות: {l}",
  pBreak:"🚀 פריצה לשיא",dBreak:"מחיר בשיא של 52 שבועות עם מחזור גבוה מהרגיל",pPull:"↩️ תיקון במגמה",dPull:"מעל הממוצע, ירידה שקטה היום, ודירוג טכני חיובי",pBottom:"🪃 תחתית עם ווליום",dBottom:"RSI נמוך, יום עלייה ומחזור כפול מהרגיל",
  whySel:"נבחרה",whyNow:"עכשיו",tagM:"נמדד · TradingView",tagI:"פרשנות",meanT:"מה זה אומר",
  e_rsi:"RSI {v}",e_change:"היום {v}",e_relVol:"מחזור ×{v}",e_mcap:"שווי {v}",e_pe:"מכפיל {v}",e_divYield:"דיבידנד {v}%",e_rating:"דירוג טכני: {v}",e_epsGrowth:"צמיחת רווח מעל {v}%",
  e_ema20:"מעל ממוצע 20",e_high52:"בשיא של 52 שבועות",e_low52:"בשפל של 52 שבועות",now_q:"אין תנועה בולטת היום",
  m_oversold:"ירידה חדה — לפעמים קודמת לתיקון למעלה, אבל יכולה גם להמשיך. כדאי לחכות לסימן היפוך.",m_momentum:"תנועה חזקה עם מחזור — המומנטום יכול להימשך, אבל קל להיכנס מאוחר מדי.",m_value:"זולה ביחס לרווחים וצומחת — כדאי לבדוק למה השוק מתמחר אותה נמוך.",m_dividend:"תשואה גבוהה — כדאי לבדוק שהדיבידנד יציב ולא נובע מצניחת מחיר.",m_volume:"מחזור חריג — משהו קורה. כדאי לבדוק חדשות לפני שמחליטים.",m_techbuy:"רוב האינדיקטורים חיוביים — זה תיאור של המצב, לא תחזית.",m_growth:"רווחים צומחים מהר — בדוק שהמכפיל לא כבר מגלם את כל הצמיחה.",m_breakout:"שיא חדש עם מחזור — מניות בשיא נוטות להמשיך, אבל פריצות גם נכשלות.",m_pullback:"מניה במגמה שמתקנת בשקט — לרוב כניסה טובה יותר מאשר לרדוף.",m_bottomvol:"ניסיון לתחתית — מוקדם ומסוכן. כדאי סטופ קרוב.",m_custom:"התנאים שבחרת בעצמך."},
en:{lensT:"🧭 Strategy lenses",lensSum:"Fits {n} of 6 strategies",lensNone:"Does not fit any strategy right now — no clear technical reason to enter now",
  stYes:"✅ Fits",stNear:"🟡 Close",stNo:"— No",stNa:"❔ No data",
  l_cross:"Moving-average cross",l_cross_m:"A short average crosses above a long one — a sign an uptrend may be starting.",
  l_cross_y:"The 20-day crossed above the 50-day {n} days ago",l_cross_g:"\"Golden cross\": the 50-day crossed above the 200-day {n} days ago",l_cross_n:"The 20-day is {p} below the 50-day and rising — close to a cross",l_cross_x:"No fresh cross",
  l_brk:"Volume breakout",l_brk_m:"A close above the 20-day high on high volume — strong buyers stepping in.",
  l_brk_y:"Closed above the 20-day high ({h}) on volume ×{r}",l_brk_n:"{p} below the 20-day high ({h}) — not broken out yet",l_brk_v:"Above the high, but on weak volume (×{r})",l_brk_x:"Far from the 20-day high",
  l_pb:"Quiet pullback",l_pb_m:"In an uptrend, a quiet dip to the 20-day average — usually a better entry than chasing.",
  l_pb_y:"Uptrend, {p} above the 20-day, 3-day volume ×{r}",l_pb_n:"Uptrend and {p} above the 20-day — close to the zone",l_pb_x:"No uptrend, or far from the average",
  l_rng:"Range trading",l_rng_m:"The stock moves between a clear floor and ceiling — buy near the floor, sell near the ceiling.",
  l_rng_y:"Range {lo}–{hi} ({w}), price at the bottom ({pos})",l_rng_n:"In range {lo}–{hi} ({w}), price in the middle ({pos}) — wait for the floor",l_rng_x:"No clear range (wide moves or a trend)",
  l_bot:"Volume bottom",l_bot_m:"After a big fall, an up day on unusual volume — a possible sign sellers are exhausted. Early and risky.",
  l_bot_y:"{p} below the yearly high, and an up day on volume ×{r} in the last 5 days",l_bot_n:"{p} below the yearly high — waiting for an up day on volume",l_bot_x:"Not after a big fall",
  l_gq:"Quality growth",l_gq_m:"A profitable, growing business that passed the quality test — suits long-term holding.",
  l_gq_y:"Passed the quality test, revenue growth {g}, profitable",l_gq_n:"{k} of 3 conditions: quality, growth above 10%, profitability",l_gq_x:"Does not meet the conditions",l_gq_na:"Not enough financial data",
  lensNote:"Each lens is a fixed rule checked in code on trading data. \"Fits\" means the conditions are met — not that the stock will rise.",
  planLens:"🧭 Fits strategies: {l}",
  pBreak:"🚀 New high",dBreak:"Price at a 52-week high on above-normal volume",pPull:"↩️ Trend pullback",dPull:"Above the average, a quiet down day, and a positive technical rating",pBottom:"🪃 Volume bottom",dBottom:"Low RSI, an up day and double the normal volume",
  whySel:"Picked",whyNow:"Now",tagM:"Measured · TradingView",tagI:"Interpretation",meanT:"What it means",
  e_rsi:"RSI {v}",e_change:"today {v}",e_relVol:"volume ×{v}",e_mcap:"value {v}",e_pe:"P/E {v}",e_divYield:"dividend {v}%",e_rating:"technical rating: {v}",e_epsGrowth:"EPS growth above {v}%",
  e_ema20:"above the 20-day average",e_high52:"at a 52-week high",e_low52:"at a 52-week low",now_q:"No notable move today",
  m_oversold:"A sharp fall — sometimes followed by a rebound, but it can also continue. Wait for a reversal sign.",m_momentum:"A strong move on volume — momentum can continue, but it is easy to enter too late.",m_value:"Cheap relative to earnings and growing — check why the market prices it low.",m_dividend:"High yield — check the dividend is stable and not just the result of a falling price.",m_volume:"Unusual volume — something is happening. Check the news before deciding.",m_techbuy:"Most indicators are positive — a description of now, not a forecast.",m_growth:"Earnings growing fast — check the P/E doesn't already price it all in.",m_breakout:"A new high on volume — stocks at highs tend to continue, but breakouts also fail.",m_pullback:"A stock in a trend pulling back quietly — usually a better entry than chasing.",m_bottomvol:"An attempted bottom — early and risky. Use a close stop.",m_custom:"The conditions you chose yourself."},
ru:{lensT:"🧭 Стратегии",lensSum:"Подходит под {n} из 6 стратегий",lensNone:"Сейчас не подходит ни под одну стратегию — нет явной технической причины входить",
  stYes:"✅ Подходит",stNear:"🟡 Близко",stNo:"— Нет",stNa:"❔ Нет данных",
  l_cross:"Пересечение средних",l_cross_m:"Короткая средняя пересекает длинную снизу вверх — признак начала роста.",
  l_cross_y:"20-дневная пересекла 50-дневную вверх {n} дн. назад",l_cross_g:"«Золотой крест»: 50-дневная пересекла 200-дневную {n} дн. назад",l_cross_n:"20-дневная на {p} ниже 50-дневной и растёт — близко к пересечению",l_cross_x:"Свежего пересечения нет",
  l_brk:"Пробой на объёме",l_brk_m:"Закрытие выше 20-дневного максимума при высоком объёме — входят сильные покупатели.",
  l_brk_y:"Закрылась выше 20-дневного максимума ({h}) при объёме ×{r}",l_brk_n:"На {p} ниже 20-дневного максимума ({h}) — пробоя пока нет",l_brk_v:"Выше максимума, но объём слабый (×{r})",l_brk_x:"Далеко от 20-дневного максимума",
  l_pb:"Тихий откат",l_pb_m:"В восходящем тренде — спокойный откат к 20-дневной средней. Обычно лучше, чем гнаться.",
  l_pb_y:"Рост, на {p} выше 20-дневной, объём за 3 дня ×{r}",l_pb_n:"Рост и на {p} выше 20-дневной — близко к зоне",l_pb_x:"Нет роста или далеко от средней",
  l_rng:"Торговля в диапазоне",l_rng_m:"Акция ходит между ясными полом и потолком — покупать у пола, продавать у потолка.",
  l_rng_y:"Диапазон {lo}–{hi} ({w}), цена у дна ({pos})",l_rng_n:"Диапазон {lo}–{hi} ({w}), цена в середине ({pos}) — ждать пола",l_rng_x:"Ясного диапазона нет",
  l_bot:"Дно на объёме",l_bot_m:"После сильного падения — день роста на необычном объёме. Возможно, продавцы иссякли. Рано и рискованно.",
  l_bot_y:"На {p} ниже годового максимума, и день роста с объёмом ×{r} за 5 дней",l_bot_n:"На {p} ниже годового максимума — ждём день роста на объёме",l_bot_x:"Нет сильного падения",
  l_gq:"Качественный рост",l_gq_m:"Прибыльный растущий бизнес, прошедший тест качества — для долгосрочного владения.",
  l_gq_y:"Прошла тест качества, рост выручки {g}, прибыльна",l_gq_n:"{k} из 3 условий: качество, рост выше 10%, прибыльность",l_gq_x:"Не соответствует условиям",l_gq_na:"Недостаточно финансовых данных",
  lensNote:"Каждая стратегия — фиксированное правило, проверяемое в коде по торговым данным. «Подходит» значит, что условия выполнены, а не что акция вырастет.",
  planLens:"🧭 Подходит под стратегии: {l}",
  pBreak:"🚀 Новый максимум",dBreak:"Цена на 52-недельном максимуме при повышенном объёме",pPull:"↩️ Откат в тренде",dPull:"Выше средней, тихое снижение сегодня и позитивный технический рейтинг",pBottom:"🪃 Дно на объёме",dBottom:"Низкий RSI, день роста и двойной объём",
  whySel:"Выбрана",whyNow:"Сейчас",tagM:"Измерено · TradingView",tagI:"Интерпретация",meanT:"Что это значит",
  e_rsi:"RSI {v}",e_change:"сегодня {v}",e_relVol:"объём ×{v}",e_mcap:"стоимость {v}",e_pe:"P/E {v}",e_divYield:"дивиденд {v}%",e_rating:"тех. рейтинг: {v}",e_epsGrowth:"рост EPS выше {v}%",
  e_ema20:"выше 20-дневной средней",e_high52:"на 52-недельном максимуме",e_low52:"на 52-недельном минимуме",now_q:"Сегодня заметного движения нет",
  m_oversold:"Резкое падение — иногда за ним следует отскок, но оно может продолжиться. Дождитесь разворота.",m_momentum:"Сильное движение на объёме — импульс может продолжиться, но легко войти слишком поздно.",m_value:"Дешёвая относительно прибыли и растёт — проверьте, почему рынок оценивает её низко.",m_dividend:"Высокая доходность — проверьте, что дивиденд стабилен, а не результат падения цены.",m_volume:"Необычный объём — что-то происходит. Проверьте новости.",m_techbuy:"Большинство индикаторов позитивны — это описание, а не прогноз.",m_growth:"Прибыль быстро растёт — проверьте, не заложен ли рост уже в P/E.",m_breakout:"Новый максимум на объёме — акции на максимумах часто продолжают, но пробои тоже проваливаются.",m_pullback:"Акция в тренде тихо откатывает — обычно лучше, чем гнаться.",m_bottomvol:"Попытка дна — рано и рискованно. Ставьте близкий стоп.",m_custom:"Условия, которые вы выбрали сами."},
es:{lensT:"🧭 Estrategias",lensSum:"Encaja en {n} de 6 estrategias",lensNone:"Ahora no encaja en ninguna estrategia — no hay una razón técnica clara para entrar",
  stYes:"✅ Encaja",stNear:"🟡 Cerca",stNo:"— No",stNa:"❔ Sin datos",
  l_cross:"Cruce de medias",l_cross_m:"Una media corta cruza por encima de una larga — señal de que puede empezar una subida.",
  l_cross_y:"La media de 20 cruzó sobre la de 50 hace {n} días",l_cross_g:"\"Cruce dorado\": la de 50 cruzó sobre la de 200 hace {n} días",l_cross_n:"La media de 20 está {p} bajo la de 50 y subiendo — cerca de cruzar",l_cross_x:"Sin cruce reciente",
  l_brk:"Ruptura con volumen",l_brk_m:"Cierre sobre el máximo de 20 días con volumen alto — entran compradores fuertes.",
  l_brk_y:"Cerró sobre el máximo de 20 días ({h}) con volumen ×{r}",l_brk_n:"{p} bajo el máximo de 20 días ({h}) — aún sin ruptura",l_brk_v:"Sobre el máximo, pero con volumen débil (×{r})",l_brk_x:"Lejos del máximo de 20 días",
  l_pb:"Retroceso tranquilo",l_pb_m:"En tendencia alcista, una bajada tranquila a la media de 20 — suele ser mejor entrada que perseguir.",
  l_pb_y:"Tendencia alcista, {p} sobre la media de 20, volumen de 3 días ×{r}",l_pb_n:"Tendencia alcista y {p} sobre la media de 20 — cerca de la zona",l_pb_x:"Sin tendencia alcista o lejos de la media",
  l_rng:"Rango lateral",l_rng_m:"La acción se mueve entre un suelo y un techo claros — comprar cerca del suelo, vender cerca del techo.",
  l_rng_y:"Rango {lo}–{hi} ({w}), precio abajo ({pos})",l_rng_n:"En rango {lo}–{hi} ({w}), precio en medio ({pos}) — esperar el suelo",l_rng_x:"Sin rango claro",
  l_bot:"Suelo con volumen",l_bot_m:"Tras una gran caída, un día alcista con volumen inusual — posible agotamiento vendedor. Temprano y arriesgado.",
  l_bot_y:"{p} bajo el máximo anual, y un día alcista con volumen ×{r} en los últimos 5 días",l_bot_n:"{p} bajo el máximo anual — esperando un día alcista con volumen",l_bot_x:"No tras una gran caída",
  l_gq:"Crecimiento de calidad",l_gq_m:"Un negocio rentable y en crecimiento que pasó el test de calidad — para largo plazo.",
  l_gq_y:"Pasó el test de calidad, crecimiento de ingresos {g}, rentable",l_gq_n:"{k} de 3 condiciones: calidad, crecimiento sobre 10%, rentabilidad",l_gq_x:"No cumple las condiciones",l_gq_na:"Datos financieros insuficientes",
  lensNote:"Cada estrategia es una regla fija revisada en código con datos de negociación. \"Encaja\" significa que se cumplen las condiciones — no que la acción vaya a subir.",
  planLens:"🧭 Encaja en: {l}",
  pBreak:"🚀 Nuevo máximo",dBreak:"Precio en máximo de 52 semanas con volumen superior al normal",pPull:"↩️ Retroceso en tendencia",dPull:"Sobre la media, bajada tranquila hoy y calificación técnica positiva",pBottom:"🪃 Suelo con volumen",dBottom:"RSI bajo, día alcista y el doble del volumen normal",
  whySel:"Elegida",whyNow:"Ahora",tagM:"Medido · TradingView",tagI:"Interpretación",meanT:"Qué significa",
  e_rsi:"RSI {v}",e_change:"hoy {v}",e_relVol:"volumen ×{v}",e_mcap:"valor {v}",e_pe:"PER {v}",e_divYield:"dividendo {v}%",e_rating:"calificación técnica: {v}",e_epsGrowth:"crecimiento del BPA sobre {v}%",
  e_ema20:"sobre la media de 20 días",e_high52:"en máximo de 52 semanas",e_low52:"en mínimo de 52 semanas",now_q:"Sin movimiento destacado hoy",
  m_oversold:"Caída fuerte — a veces sigue un rebote, pero también puede continuar. Espera una señal de giro.",m_momentum:"Movimiento fuerte con volumen — puede continuar, pero es fácil entrar tarde.",m_value:"Barata respecto a sus beneficios y creciendo — revisa por qué el mercado la valora poco.",m_dividend:"Rentabilidad alta — revisa que el dividendo sea estable y no fruto de una caída del precio.",m_volume:"Volumen inusual — algo pasa. Revisa las noticias antes de decidir.",m_techbuy:"La mayoría de indicadores son positivos — describe el presente, no es un pronóstico.",m_growth:"Beneficios creciendo rápido — revisa que el PER no lo descuente ya todo.",m_breakout:"Nuevo máximo con volumen — las acciones en máximos suelen seguir, pero las rupturas también fallan.",m_pullback:"Una acción en tendencia retrocediendo tranquila — suele ser mejor entrada que perseguir.",m_bottomvol:"Intento de suelo — temprano y arriesgado. Usa un stop cercano.",m_custom:"Las condiciones que elegiste tú."},
ar:{lensT:"🧭 الاستراتيجيات",lensSum:"يناسب {n} من 6 استراتيجيات",lensNone:"لا يناسب أي استراتيجية الآن — لا سبب فني واضح للدخول الآن",
  stYes:"✅ يناسب",stNear:"🟡 قريب",stNo:"— لا",stNa:"❔ لا بيانات",
  l_cross:"تقاطع المتوسطات",l_cross_m:"متوسط قصير يتقاطع صعوداً فوق متوسط طويل — إشارة لبداية اتجاه صاعد.",
  l_cross_y:"متوسط 20 تقاطع فوق متوسط 50 قبل {n} أيام",l_cross_g:"\"التقاطع الذهبي\": متوسط 50 فوق متوسط 200 قبل {n} أيام",l_cross_n:"متوسط 20 أقل بـ {p} من متوسط 50 ويرتفع — قريب من التقاطع",l_cross_x:"لا تقاطع حديث",
  l_brk:"اختراق بحجم",l_brk_m:"إغلاق فوق أعلى 20 يوماً بحجم مرتفع — دخول مشترين أقوياء.",
  l_brk_y:"أغلق فوق أعلى 20 يوماً ({h}) بحجم ×{r}",l_brk_n:"أقل بـ {p} من أعلى 20 يوماً ({h}) — لم يخترق بعد",l_brk_v:"فوق القمة لكن بحجم ضعيف (×{r})",l_brk_x:"بعيد عن أعلى 20 يوماً",
  l_pb:"تراجع هادئ",l_pb_m:"في اتجاه صاعد، نزول هادئ إلى متوسط 20 — غالباً دخول أفضل من المطاردة.",
  l_pb_y:"اتجاه صاعد، أعلى بـ {p} من متوسط 20، حجم 3 أيام ×{r}",l_pb_n:"اتجاه صاعد وأعلى بـ {p} من متوسط 20 — قريب من المنطقة",l_pb_x:"لا اتجاه صاعد أو بعيد عن المتوسط",
  l_rng:"تداول في نطاق",l_rng_m:"السهم يتحرك بين أرضية وسقف واضحين — شراء قرب الأرضية وبيع قرب السقف.",
  l_rng_y:"النطاق {lo}–{hi} ({w})، السعر في القاع ({pos})",l_rng_n:"في النطاق {lo}–{hi} ({w})، السعر في المنتصف ({pos}) — انتظر الأرضية",l_rng_x:"لا نطاق واضح",
  l_bot:"قاع بحجم",l_bot_m:"بعد هبوط كبير، يوم صعود بحجم غير عادي — إشارة محتملة لنفاد البائعين. مبكر وخطر.",
  l_bot_y:"أقل بـ {p} من القمة السنوية، ويوم صعود بحجم ×{r} في آخر 5 أيام",l_bot_n:"أقل بـ {p} من القمة السنوية — بانتظار يوم صعود بحجم",l_bot_x:"ليس بعد هبوط كبير",
  l_gq:"نمو بجودة",l_gq_m:"عمل مربح ونامٍ اجتاز اختبار الجودة — مناسب للاحتفاظ الطويل.",
  l_gq_y:"اجتاز اختبار الجودة، نمو الإيرادات {g}، مربح",l_gq_n:"{k} من 3 شروط: الجودة، نمو فوق 10%، الربحية",l_gq_x:"لا يستوفي الشروط",l_gq_na:"بيانات مالية غير كافية",
  lensNote:"كل استراتيجية قاعدة ثابتة تُفحص برمجياً من بيانات التداول. \"يناسب\" يعني أن الشروط متحققة — لا أن السهم سيرتفع.",
  planLens:"🧭 يناسب الاستراتيجيات: {l}",
  pBreak:"🚀 قمة جديدة",dBreak:"السعر عند قمة 52 أسبوعاً بحجم أعلى من المعتاد",pPull:"↩️ تراجع في الاتجاه",dPull:"فوق المتوسط، نزول هادئ اليوم، وتقييم فني إيجابي",pBottom:"🪃 قاع بحجم",dBottom:"RSI منخفض، يوم صعود وحجم مضاعف",
  whySel:"اختير",whyNow:"الآن",tagM:"مقاس · TradingView",tagI:"تفسير",meanT:"ماذا يعني",
  e_rsi:"RSI {v}",e_change:"اليوم {v}",e_relVol:"الحجم ×{v}",e_mcap:"القيمة {v}",e_pe:"مكرر الربح {v}",e_divYield:"توزيعات {v}%",e_rating:"التقييم الفني: {v}",e_epsGrowth:"نمو ربحية السهم فوق {v}%",
  e_ema20:"فوق متوسط 20 يوماً",e_high52:"عند قمة 52 أسبوعاً",e_low52:"عند قاع 52 أسبوعاً",now_q:"لا حركة لافتة اليوم",
  m_oversold:"هبوط حاد — أحياناً يتبعه ارتداد، لكنه قد يستمر. انتظر إشارة انعكاس.",m_momentum:"حركة قوية بحجم — قد يستمر الزخم، لكن من السهل الدخول متأخراً.",m_value:"رخيص مقارنة بالأرباح وينمو — تحقق لماذا يسعّره السوق منخفضاً.",m_dividend:"عائد مرتفع — تحقق من استقرار التوزيعات وأنها ليست نتيجة هبوط السعر.",m_volume:"حجم غير عادي — شيء ما يحدث. راجع الأخبار قبل القرار.",m_techbuy:"معظم المؤشرات إيجابية — وصف للحاضر وليس توقعاً.",m_growth:"الأرباح تنمو بسرعة — تحقق أن المكرر لا يسعّر النمو كله.",m_breakout:"قمة جديدة بحجم — الأسهم عند القمم تميل للاستمرار، لكن الاختراقات تفشل أيضاً.",m_pullback:"سهم في اتجاه يتراجع بهدوء — غالباً دخول أفضل من المطاردة.",m_bottomvol:"محاولة قاع — مبكر وخطر. استخدم وقف خسارة قريباً.",m_custom:"الشروط التي اخترتها بنفسك."}
};
function P11(k,o){var l=P11_T[curLang]||P11_T.en,s=l[k]!=null?l[k]:(P11_T.en[k]!=null?P11_T.en[k]:k);for(var x in (o||{}))s=s.split('{'+x+'}').join(o[x]);return s;}

/* ══ 1. Six lenses — pure functions of daily OHLC (+ quote/quality for the fundamental one) ══ */
var LENS_IDS=['cross','brk','pb','rng','bot','gq'];
function _lsma(c,p,end){if(end<p-1)return null;var s=0;for(var i=end-p+1;i<=end;i++)s+=c[i];return s/p;}
function computeLenses(ohlc,q,quality){
  var bars=(ohlc||[]).filter(function(b){return b&&b[4]!=null&&isFinite(b[4]);});if(bars.length<60)return null;
  var c=bars.map(function(b){return b[4];}),o=bars.map(function(b){return b[1]!=null?b[1]:b[4];}),h=bars.map(function(b){return b[2]!=null?b[2]:b[4];}),l=bars.map(function(b){return b[3]!=null?b[3]:b[4];}),v=bars.map(function(b){return b[5]||0;});
  var n=c.length,last=n-1,px=c[last],P=function(x){return '\u2066'+Math.abs(x).toFixed(1)+'%\u2069';},F=function(x){return fmtPrice(x,(q&&q.currency)||'USD');};
  var ma20=_lsma(c,20,last),ma50=_lsma(c,50,last),avgV20=_dcAvg(v.slice(-21,-1))||0;
  var out={};
  // 1 MA cross — 20 over 50 in the last 10 days, or 50 over 200 in the last 20
  var cross=null,golden=null;
  for(var i=last;i>last-10&&i>50;i--){var a=_lsma(c,20,i),b=_lsma(c,50,i),a0=_lsma(c,20,i-1),b0=_lsma(c,50,i-1);if(a0!=null&&b0!=null&&a0<=b0&&a>b){cross=last-i;break;}}
  if(n>=201)for(i=last;i>last-20;i--){var g=_lsma(c,50,i),k=_lsma(c,200,i),g0=_lsma(c,50,i-1),k0=_lsma(c,200,i-1);if(k0!=null&&g0<=k0&&g>k){golden=last-i;break;}}
  var rising=_lsma(c,20,last)>_lsma(c,20,last-5),gap=ma50?(ma20/ma50-1)*100:0;
  if(cross!=null)out.cross={s:'yes',d:P11('l_cross_y',{n:cross})};
  else if(golden!=null)out.cross={s:'yes',d:P11('l_cross_g',{n:golden})};
  else if(ma20<ma50&&gap>-1&&rising)out.cross={s:'near',d:P11('l_cross_n',{p:P(Math.abs(gap))})};
  else out.cross={s:'no',d:P11('l_cross_x')};
  // 2 Volume breakout — close above the prior 20-day high on ≥1.5× volume
  var hi20=Math.max.apply(null,h.slice(-21,-1)),vr=avgV20?v[last]/avgV20:0;
  if(px>hi20&&vr>=1.5)out.brk={s:'yes',d:P11('l_brk_y',{h:F(hi20),r:vr.toFixed(1)})};
  else if(px>hi20)out.brk={s:'near',d:P11('l_brk_v',{r:vr.toFixed(1)})};
  else if(px>=hi20*0.98)out.brk={s:'near',d:P11('l_brk_n',{p:P((1-px/hi20)*100),h:F(hi20)})};
  else out.brk={s:'no',d:P11('l_brk_x')};
  // 3 Quiet pullback — uptrend, within 2.5% of the 20-day, last 3 days' volume < 0.8× normal
  var up=ma20&&ma50&&px>=ma20*0.99&&ma20>ma50,dist=ma20?(px/ma20-1)*100:99,v3=avgV20?_dcAvg(v.slice(-3))/avgV20:1;
  if(up&&dist<=2.5&&v3<0.8)out.pb={s:'yes',d:P11('l_pb_y',{p:P(dist),r:v3.toFixed(2)})};
  else if(up&&dist<=5)out.pb={s:'near',d:P11('l_pb_n',{p:P(dist)})};
  else out.pb={s:'no',d:P11('l_pb_x')};
  // 4 Range — last 40 days inside a band narrower than 15%, weak trend (ADX)
  var hi40=Math.max.apply(null,h.slice(-40)),lo40=Math.min.apply(null,l.slice(-40)),w=(hi40-lo40)/((hi40+lo40)/2),pos=(hi40>lo40)?(px-lo40)/(hi40-lo40):0.5;
  var t=(typeof computeTechnical==='function')?computeTechnical(bars):null,adx=t?t.adx:30;
  var rv={lo:F(lo40),hi:F(hi40),w:Math.round(w*100)+'%',pos:Math.round(pos*100)+'%'};
  if(w<0.15&&adx<20&&pos<=0.3)out.rng={s:'yes',d:P11('l_rng_y',rv)};
  else if(w<0.15&&pos<=0.3)out.rng={s:'near',d:P11('l_rng_y',rv)};
  else if(w<0.15&&adx<25)out.rng={s:'near',d:P11('l_rng_n',rv)};
  else out.rng={s:'no',d:P11('l_rng_x')};
  // 5 Volume bottom — ≥25% under the yearly high and an up day on ≥2× volume in the last 5 days
  var hi52=Math.max.apply(null,h.slice(-252)),dd=(1-px/hi52)*100,spike=0;
  for(i=last;i>last-5;i--){var avg=_dcAvg(v.slice(Math.max(0,i-20),i))||0;if(avg&&v[i]>=2*avg&&c[i]>o[i]&&c[i]>c[i-1])spike=Math.max(spike,v[i]/avg);}
  if(dd>=25&&spike)out.bot={s:'yes',d:P11('l_bot_y',{p:P(dd),r:spike.toFixed(1)})};
  else if(dd>=25)out.bot={s:'near',d:P11('l_bot_n',{p:P(dd)})};
  else out.bot={s:'no',d:P11('l_bot_x')};
  // 6 Quality growth — fundamentals
  var qv=quality&&quality.verdict,rg=q&&q.revenueGrowth,pm=q&&q.profitMargins,known=0,okc=0;
  if(qv&&qv!=='grey'){known++;if(qv==='pass'||qv==='exempt')okc++;}
  if(rg!=null){known++;if(rg>=0.10)okc++;}
  if(pm!=null){known++;if(pm>0)okc++;}
  if(!known)out.gq={s:'na',d:P11('l_gq_na')};
  else if(okc===3)out.gq={s:'yes',d:P11('l_gq_y',{g:P(rg*100)})};
  else if(okc>=2)out.gq={s:'near',d:P11('l_gq_n',{k:okc})};
  else out.gq={s:'no',d:P11('l_gq_x')};
  return out;
}

var LENS_ST={yes:'stYes',near:'stNear',no:'stNo',na:'stNa'};
function renderLenses(symbol){
  var el=document.getElementById('lvLens');if(!el)return;
  var src=window.__techOhlc;if(!src||src.symbol!==symbol){el.innerHTML='';window.__lensResult=null;return;}
  var q=(window.__lastLiveQuote&&window.__lastLiveQuote.symbol===symbol)?window.__lastLiveQuote:null;
  var qr=window.__qualityResult&&window.__qualityResult.symbol===symbol?window.__qualityResult.res:null;
  var r=computeLenses(src.ohlc,q,qr);if(!r){el.innerHTML='';return;}
  window.__lensResult={symbol:symbol,lens:r};
  var fits=LENS_IDS.filter(function(k){return r[k].s==='yes';});
  var h='<div class="rec-trend-title">'+P11('lensT')+'</div><div class="ln-sum">'+(fits.length?P11('lensSum',{n:fits.length}):P11('lensNone'))+'</div><div class="ln-list">'
    +LENS_IDS.map(function(k){var x=r[k];return '<div class="ln-row '+x.s+'"><div class="ln-top"><b>'+P11('l_'+k)+'</b><span class="ln-st">'+P11(LENS_ST[x.s])+'</span></div><div class="ln-d">'+escHtml(x.d)+'</div><div class="ln-m">'+P11('l_'+k+'_m')+'</div></div>';}).join('')
    +'</div><div class="ta-note">'+P11('lensNote')+'</div>';
  el.innerHTML=h;
  // one line on the action plan, linking to the lenses
  var pl=document.querySelector('#lvPlan .pl-desc');
  if(pl&&fits.length&&!document.querySelector('#lvPlan .pl-lens')){var d=document.createElement('button');d.className='pl-lens';d.textContent=P11('planLens',{l:fits.map(function(k){return P11('l_'+k);}).join(' · ')});d.onclick=function(){switchLiveTab('technical');var e=document.getElementById('lvLens');if(e)e.scrollIntoView({behavior:'smooth',block:'start'});};pl.parentNode.insertBefore(d,pl.nextSibling);}
  try{renderLiveTabs();applyLiveTabs();}catch(e){}
}
(function(){
  var rp=renderPlan;renderPlan=function(symbol){var r=rp.apply(this,arguments);try{renderLenses(symbol);}catch(e){}return r;};
  var lld=loadLiveData;loadLiveData=function(){var e=document.getElementById('lvLens');if(e){e.innerHTML='';e.style.display='none';}window.__lensResult=null;return lld.apply(this,arguments);};
  try{LIVE_TAB_DEFS.forEach(function(d){if(d[0]==='technical'&&d[2].indexOf('lvLens')<0)d[2].splice(1,0,'lvLens');});}catch(e){}
})();
var __origExtraCtx11=buildExtraContext;
buildExtraContext=function(symbol){
  var s=__origExtraCtx11(symbol),lr=window.__lensResult;if(!lr||lr.symbol!==symbol)return s;
  return s+'STRATEGY LENSES (rules computed in code): '+LENS_IDS.map(function(k){return P11_T.en['l_'+k]+'='+lr.lens[k].s;}).join(', ')+'.\n';
};

/* ══ 2. Screener — three presets built on the lenses (before "custom") ══ */
(function(){
  var add=[
    {id:'breakout',n:'pBreak',d:'dBreak',f:[{f:'price',op:'gte',v:'high52'},{f:'relVol',op:'gt',v:1.5},{f:'mcap',op:'gt',v:1e9}],sort:'change',order:'desc',show:'relVol'},
    {id:'pullback',n:'pPull',d:'dPull',f:[{f:'price',op:'gt',v:'ema20'},{f:'change',op:'lt',v:0},{f:'relVol',op:'lt',v:0.8},{f:'rating',op:'gt',v:0.1},{f:'mcap',op:'gt',v:2e9}],sort:'mcap',order:'desc',show:'rating'},
    {id:'bottomvol',n:'pBottom',d:'dBottom',f:[{f:'rsi',op:'lt',v:40},{f:'relVol',op:'gt',v:2},{f:'change',op:'gt',v:0},{f:'mcap',op:'gt',v:5e8}],sort:'relVol',order:'desc',show:'relVol'}
  ];
  var ci=SCR_PRESETS.findIndex(function(x){return x.id==='custom';});
  add.forEach(function(p,i){if(!SCR_PRESETS.some(function(x){return x.id===p.id;}))SCR_PRESETS.splice(ci+i,0,p);});
  // their names live in P11 — let P6 find them
  var p6=P6;P6=function(k,o){return P11_T.en[k]!=null&&/^[pd](Break|Pull|Bottom)$/.test(k)?P11(k,o):p6(k,o);};
})();

/* ══ 3. "Why selected / why now" — every claim tagged: measured (TradingView) or interpretation ══ */
function scrWhy(it,filters){
  var sel=[],now=[],num=function(x,d){return x==null?'—':Number(x).toFixed(d==null?1:d);};
  (filters||[]).forEach(function(c){
    if(typeof c.v==='string'){if(c.v==='ema20'||c.v==='high52'||c.v==='low52')sel.push(P11('e_'+c.v));return;}
    switch(c.f){
      case 'rsi':if(it.rsi!=null)sel.push(P11('e_rsi',{v:Math.round(it.rsi)}));break;
      case 'mcap':if(it.marketCap)sel.push(P11('e_mcap',{v:fmtNum(it.marketCap)}));break;
      case 'pe':if(it.pe)sel.push(P11('e_pe',{v:num(it.pe)}));break;
      case 'divYield':if(it.divYield!=null)sel.push(P11('e_divYield',{v:num(it.divYield)}));break;
      case 'rating':if(it.rating!=null)sel.push(P11('e_rating',{v:PT(tvLabel(it.rating))}));break;
      case 'epsGrowth':sel.push(P11('e_epsGrowth',{v:c.op==='between'?c.v+'–'+c.v2:c.v}));break;
      case 'relVol':case 'change':case 'price':break; // shown under "now"
    }
  });
  if(it.changePct!=null&&Math.abs(it.changePct)>=0.05)now.push(P11('e_change',{v:fmtPct(it.changePct)}));
  if(it.relVol!=null)now.push(P11('e_relVol',{v:num(it.relVol)}));
  if(!now.length)now.push(P11('now_q'));
  return {sel:sel,now:now};
}
scrRun=async function(){
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
    res.innerHTML='<div class="scr-mean"><span class="scr-tag i">'+P11('tagI')+'</span> '+P11('m_'+p.id)+'</div>'
      +'<div class="ta-small" style="margin:6px 0;font-weight:600;color:var(--text)">'+P6('found',{n:d.total>d.items.length?d.items.length+'/'+d.total:d.items.length})+'</div><div class="mk-list">'
      +d.items.map(function(it){var col=it.changePct>=0?'var(--green)':'var(--red)',w=scrWhy(it,q.filters);
        return '<div class="scr-item" onclick="closeModal(\'marketOverlay\');quickLive(\''+escHtml(it.symbol)+'\')"><div class="mk-row"><div class="mk-sym">'+escHtml(it.symbol.replace(/\.TA$/,''))+'</div><div class="mk-name">'+escHtml(it.name||'')+'</div>'
          +'<div class="mk-px">'+fmtPrice(it.price,it.currency)+'</div><div class="mk-chg" style="color:'+col+'">'+fmtPct(it.changePct)+'</div></div>'
          +'<div class="scr-why">'+(w.sel.length?'<span><b>'+P11('whySel')+':</b> '+escHtml(w.sel.join(' · '))+'</span>':'')+'<span><b>'+P11('whyNow')+':</b> '+escHtml(w.now.join(' · '))+'</span></div></div>';}).join('')
      +'</div><div class="ta-note"><span class="scr-tag m">'+P11('tagM')+'</span> '+P6('scrNote')+'</div>';
  }catch(e){res.innerHTML='<div class="fv-warn">'+P6('scrErr')+'</div>';}
};
;(window.__MODS=window.__MODS||{})['app-lens']=1;

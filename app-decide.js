/* StockAI · app-decide.js — 🎯 action plan (entry · stop · target · position size · 6-point checklist) ·
   one decision scale 0–100 · "don't chase" rule · plan facts for the AI · scoreboard v2 (1/5/10/20 trading days,
   30-sample rule, worst move against, AI vs rules) · 🛡️ portfolio risk flags
   Ideas adapted from ZhuLinsen/daily_stock_analysis (MIT License) — rewritten from scratch for US/Israel markets.
   AppNest © 2026 · load order: after app-nav.js, before app-init.js */
var P8_T={
he:{abIdeas:"רעיונות ושיטות (קוד פתוח)",dShort:"י",planT:"🎯 תוכנית פעולה",planScore:"ציון",
  act_strongBuy:"קנייה חזקה",act_buy:"קנייה",act_watch:"המתנה",act_reduce:"צמצום",act_sell:"מכירה",
  ad_strongBuy:"רוב התנאים מתקיימים — אפשר לבנות פוזיציה לפי התוכנית.",ad_buy:"התמונה חיובית, אבל כמה תנאים עוד צריכים אישור.",ad_watch:"האותות מעורבים — עדיף לחכות שתנאי הכניסה יתקיימו.",ad_reduce:"הסיכון גבר. למי שמחזיק: לשקול הקטנת חשיפה.",ad_sell:"המגמה נשברה. למי שמחזיק: להעדיף יציאה מסודרת.",
  lvIdeal:"כניסה אידיאלית",lvSecond:"כניסה שנייה",lvStop:"סטופ-לוס",lvTarget:"יעד",lvRR:"סיכון : סיכוי",lvPos:"גודל פוזיציה",
  posOf:"{n}/10 מהסכום שתכננת למניה",posWait:"0/10 — לא נכנסים עכשיו",
  w_ma20:"ליד ממוצע 20 יום",w_ma50:"ליד ממוצע 50 יום",w_sup:"ליד תמיכה",w_sup2:"תמיכה עמוקה יותר",w_now:"המחיר הנוכחי",w_stop:"מתחת לתמיכה, פחות תנודה יומית (ATR)",w_stopMax:"הגבלה: עד 15% הפסד",w_res:"התנגדות קרובה",w_52:"שיא 52 שבועות",w_2r:"פי 2 מהסיכון (אין התנגדות קרובה)",
  inZone:"✅ המחיר עכשיו באזור הכניסה",aboveZone:"המחיר {p} מעל הכניסה האידיאלית — עדיף לחכות לתיקון",
  holders:"למחזיקים: רמת היציאה היא {s}. מתחת לה התוכנית בטלה.",
  chkT:"✔ רשימת תנאים",
  c_trend:"מגמה עולה",c_trendD_ok:"מחיר מעל ממוצע 20, וממוצע 20 מעל ממוצע 50",c_trendD_w:"מעל ממוצע 50, אבל לא מעל ממוצע 20",c_trendD_b:"מתחת לממוצע 50 — מגמה יורדת",
  c_bias:"לא רודפים אחרי המחיר",c_biasD:"מרחק מממוצע 5 ימים: {p}",
  c_vol:"מחזור תומך",c_volD:"מחזור בימי עלייה מול ימי ירידה (10 ימים): ×{r}",
  c_rsi:"מומנטום בריא",c_rsiD:"RSI {v}",
  c_event:"אין דוח קרוב",c_eventD_soon:"דוח רבעוני בעוד {n} ימים — תנודה חדה אפשרית",c_eventD_ok:"הדוח הבא בעוד {n} ימים",c_eventD_na:"תאריך הדוח הבא לא ידוע",
  c_val:"שווי ואיכות",c_valQ_pass:"עברה את מבחן האיכות",c_valQ_fail:"נכשלה במבחן האיכות",c_valPE:"מכפיל רווח {v}",c_valLoss:"החברה מפסידה (רווח למניה שלילי)",c_valNA:"אין מספיק נתונים",
  g_trend:"⚠️ המחיר מתחת לממוצע 50 יום — לא קונים במגמה יורדת. הציון הוגבל ל\"המתנה\".",
  g_chase:"⚠️ אל תרדוף: המחיר {p} מעל ממוצע 5 ימים. הציון הוגבל ל\"המתנה\" עד שיהיה תיקון.",
  g_earn:"⚠️ דוח בעוד {n} ימים. הציון הוגבל ל\"המתנה\" בגלל סיכון האירוע.",
  g_broke:"⚠️ המחיר שבר את השפל של 20 הימים האחרונים. הציון הוגבל ל\"צמצום\".",
  g_noBad:"ל\"קנייה חזקה\" צריך שאף תנאי לא ייכשל — הציון הוגבל ל\"קנייה\".",
  scale:"הסולם: 80–100 קנייה חזקה · 60–79 קנייה · 40–59 המתנה · 20–39 צמצום · 0–19 מכירה",
  planNote:"התוכנית מחושבת בקוד מנתוני המסחר: ממוצעים, תמיכה והתנגדות, ותנודה יומית (ATR). זו לא המלצת השקעה — ההחלטה שלך.",
  sbT:"📊 כרטיס ניקוד — כמה התחזיות צודקות?",srcAll:"הכל",srcAi:"🤖 AI",srcRules:"🎯 תוכנית",
  hzT:"תוצאות לפי טווח",hz:"{n} ימי מסחר",hz1:"יום מסחר אחד",colRate:"הצלחה",colAvg:"רווח ממוצע בכיוון התחזית",colMae:"תנודה נגד בדרך (ממוצע)",colN:"נבדקו",
  few:"מעט מדי ({n}/30)",pend:"⏳",loadingHist:"טוען היסטוריית מחירים…",
  rule:"איך בודקים: לכל תחזית לוקחים את מחיר הסגירה אחרי 1, 5, 10 ו-20 ימי מסחר. קנייה צדקה אם המחיר עלה, מכירה אם ירד, המתנה אם השינוי קטן מ-5%. אחוז הצלחה מוצג רק אחרי 30 תחזיות שנבדקו — פחות מזה מטעה.",
  maeNote:"תנודה נגד בדרך: הכי רחוק שהמחיר הלך נגד התחזית לפני סוף הטווח. גם תחזית שצדקה יכולה לכאוב בדרך.",
  empty:"עדיין אין תחזיות. כל ניתוח AI וכל תוכנית פעולה נשמרים כאן אוטומטית (פעם ביום לכל מניה), ונבדקים אחר כך מול המחיר בפועל.",
  oneDay:"תחזית אחת לכל מניה ביום מכל מקור. ביצועי עבר אינם מבטיחים ביצועים עתידיים.",
  rkT:"🛡️ דגלי סיכון",rkConc:"מניה אחת כבדה: {s} היא {p} מהתיק",rkConcOk:"פיזור: המניה הגדולה היא {p} מהתיק",rkFew:"רק {n} מניות בתיק — פיזור נמוך",
  rkDd:"ירדו יותר מ-15% ממחיר הקנייה: {l}",rkStop:"קרוב לסטופ או מתחתיו: {l}",rkSig:"תחזית אחרונה של צמצום או מכירה: {l}",rkStale:"אין מחיר עדכני: {l}",
  rkFx:"חשיפה למטבע: דולר {u} · שקל {i}",rkOk:"✅ אין דגלי סיכון כרגע",
  rkNote:"הסטופ נלקח מתוכנית הפעולה האחרונה שנפתחה למניה. אין כאן נתוני ענפים, ולכן אין בדיקת ריכוז לפי ענף."},
en:{abIdeas:"Ideas & methods (open source)",dShort:"d",planT:"🎯 Action plan",planScore:"Score",
  act_strongBuy:"Strong buy",act_buy:"Buy",act_watch:"Watch",act_reduce:"Reduce",act_sell:"Sell",
  ad_strongBuy:"Most conditions are met — a position can be built according to the plan.",ad_buy:"The picture is positive, but a few conditions still need confirmation.",ad_watch:"Signals are mixed — better to wait for the entry conditions.",ad_reduce:"Risk has risen. If you hold it: consider reducing exposure.",ad_sell:"The trend has broken. If you hold it: prefer an orderly exit.",
  lvIdeal:"Ideal entry",lvSecond:"Second entry",lvStop:"Stop-loss",lvTarget:"Target",lvRR:"Risk : reward",lvPos:"Position size",
  posOf:"{n}/10 of the amount you planned for this stock",posWait:"0/10 — not entering now",
  w_ma20:"near the 20-day average",w_ma50:"near the 50-day average",w_sup:"near support",w_sup2:"deeper support",w_now:"current price",w_stop:"below support, minus daily range (ATR)",w_stopMax:"capped: 15% loss at most",w_res:"nearby resistance",w_52:"52-week high",w_2r:"2× the risk (no nearby resistance)",
  inZone:"✅ The price is in the entry zone now",aboveZone:"The price is {p} above the ideal entry — better to wait for a pullback",
  holders:"If you hold it: the exit level is {s}. Below it the plan is void.",
  chkT:"✔ Checklist",
  c_trend:"Uptrend",c_trendD_ok:"Price above the 20-day average, and the 20-day above the 50-day",c_trendD_w:"Above the 50-day, but not above the 20-day",c_trendD_b:"Below the 50-day average — downtrend",
  c_bias:"Not chasing the price",c_biasD:"Distance from the 5-day average: {p}",
  c_vol:"Volume confirms",c_volD:"Volume on up days vs down days (10 days): ×{r}",
  c_rsi:"Healthy momentum",c_rsiD:"RSI {v}",
  c_event:"No earnings soon",c_eventD_soon:"Earnings in {n} days — a sharp move is possible",c_eventD_ok:"Next earnings in {n} days",c_eventD_na:"Next earnings date unknown",
  c_val:"Valuation & quality",c_valQ_pass:"Passed the quality test",c_valQ_fail:"Failed the quality test",c_valPE:"P/E {v}",c_valLoss:"The company is losing money (negative EPS)",c_valNA:"Not enough data",
  g_trend:"⚠️ The price is below the 50-day average — no buying into a downtrend. The score is capped at \"Watch\".",
  g_chase:"⚠️ Don't chase: the price is {p} above the 5-day average. The score is capped at \"Watch\" until a pullback.",
  g_earn:"⚠️ Earnings in {n} days. The score is capped at \"Watch\" because of the event risk.",
  g_broke:"⚠️ The price broke the 20-day low. The score is capped at \"Reduce\".",
  g_noBad:"\"Strong buy\" requires that no condition fails — the score is capped at \"Buy\".",
  scale:"The scale: 80–100 strong buy · 60–79 buy · 40–59 watch · 20–39 reduce · 0–19 sell",
  planNote:"The plan is computed in code from trading data: averages, support and resistance, and daily range (ATR). It is not investment advice — the decision is yours.",
  sbT:"📊 Scoreboard — how often are the calls right?",srcAll:"All",srcAi:"🤖 AI",srcRules:"🎯 Plan",
  hzT:"Results by horizon",hz:"{n} trading days",hz1:"1 trading day",colRate:"Hit rate",colAvg:"Average gain in the called direction",colMae:"Move against, on the way (avg)",colN:"Checked",
  few:"Too few ({n}/30)",pend:"⏳",loadingHist:"Loading price history…",
  rule:"How it is checked: for every call we take the closing price after 1, 5, 10 and 20 trading days. A buy was right if the price rose, a sell if it fell, a watch if the move was under 5%. A hit rate is shown only after 30 checked calls — fewer than that is misleading.",
  maeNote:"Move against: the furthest the price went against the call before the horizon ended. Even a right call can hurt on the way.",
  empty:"No calls yet. Every AI analysis and every action plan is saved here automatically (once a day per stock) and later checked against the real price.",
  oneDay:"One call per stock per day from each source. Past performance does not guarantee future results.",
  rkT:"🛡️ Risk flags",rkConc:"One heavy stock: {s} is {p} of the portfolio",rkConcOk:"Diversification: the largest stock is {p} of the portfolio",rkFew:"Only {n} stocks — low diversification",
  rkDd:"Down more than 15% from the buy price: {l}",rkStop:"Near or below the stop: {l}",rkSig:"Latest call is reduce or sell: {l}",rkStale:"No current price: {l}",
  rkFx:"Currency exposure: dollar {u} · shekel {i}",rkOk:"✅ No risk flags right now",
  rkNote:"The stop comes from the last action plan opened for the stock. There is no sector data here, so there is no sector-concentration check."},
ru:{abIdeas:"Идеи и методы (открытый код)",dShort:"д",planT:"🎯 План действий",planScore:"Оценка",
  act_strongBuy:"Активно покупать",act_buy:"Покупать",act_watch:"Ждать",act_reduce:"Сокращать",act_sell:"Продавать",
  ad_strongBuy:"Большинство условий выполнено — можно набирать позицию по плану.",ad_buy:"Картина позитивная, но несколько условий ещё требуют подтверждения.",ad_watch:"Сигналы смешанные — лучше дождаться условий входа.",ad_reduce:"Риск вырос. Если держите: подумайте о сокращении позиции.",ad_sell:"Тренд сломан. Если держите: лучше выйти организованно.",
  lvIdeal:"Идеальный вход",lvSecond:"Второй вход",lvStop:"Стоп-лосс",lvTarget:"Цель",lvRR:"Риск : прибыль",lvPos:"Размер позиции",
  posOf:"{n}/10 от суммы, запланированной на эту акцию",posWait:"0/10 — сейчас не входить",
  w_ma20:"у 20-дневной средней",w_ma50:"у 50-дневной средней",w_sup:"у поддержки",w_sup2:"более глубокая поддержка",w_now:"текущая цена",w_stop:"ниже поддержки, минус дневной диапазон (ATR)",w_stopMax:"ограничение: не более 15% убытка",w_res:"ближайшее сопротивление",w_52:"максимум за 52 недели",w_2r:"2× риска (нет близкого сопротивления)",
  inZone:"✅ Цена сейчас в зоне входа",aboveZone:"Цена на {p} выше идеального входа — лучше дождаться отката",
  holders:"Если держите: уровень выхода {s}. Ниже него план отменяется.",
  chkT:"✔ Список условий",
  c_trend:"Восходящий тренд",c_trendD_ok:"Цена выше 20-дневной средней, а 20-дневная выше 50-дневной",c_trendD_w:"Выше 50-дневной, но не выше 20-дневной",c_trendD_b:"Ниже 50-дневной средней — нисходящий тренд",
  c_bias:"Не гнаться за ценой",c_biasD:"Отклонение от 5-дневной средней: {p}",
  c_vol:"Объём подтверждает",c_volD:"Объём в дни роста к дням падения (10 дней): ×{r}",
  c_rsi:"Здоровый импульс",c_rsiD:"RSI {v}",
  c_event:"Нет скорого отчёта",c_eventD_soon:"Отчёт через {n} дн. — возможен резкий ход",c_eventD_ok:"Следующий отчёт через {n} дн.",c_eventD_na:"Дата следующего отчёта неизвестна",
  c_val:"Оценка и качество",c_valQ_pass:"Прошла тест качества",c_valQ_fail:"Не прошла тест качества",c_valPE:"P/E {v}",c_valLoss:"Компания убыточна (отрицательная EPS)",c_valNA:"Недостаточно данных",
  g_trend:"⚠️ Цена ниже 50-дневной средней — не покупаем в нисходящем тренде. Оценка ограничена «Ждать».",
  g_chase:"⚠️ Не гонитесь: цена на {p} выше 5-дневной средней. Оценка ограничена «Ждать» до отката.",
  g_earn:"⚠️ Отчёт через {n} дн. Оценка ограничена «Ждать» из-за риска события.",
  g_broke:"⚠️ Цена пробила минимум 20 дней. Оценка ограничена «Сокращать».",
  g_noBad:"Для «Активно покупать» ни одно условие не должно проваливаться — оценка ограничена «Покупать».",
  scale:"Шкала: 80–100 активно покупать · 60–79 покупать · 40–59 ждать · 20–39 сокращать · 0–19 продавать",
  planNote:"План рассчитан в коде по торговым данным: средние, поддержка и сопротивление, дневной диапазон (ATR). Это не инвестиционный совет — решение за вами.",
  sbT:"📊 Табло — как часто прогнозы верны?",srcAll:"Все",srcAi:"🤖 ИИ",srcRules:"🎯 План",
  hzT:"Результаты по горизонту",hz:"{n} торговых дн.",hz1:"1 торговый день",colRate:"Точность",colAvg:"Средний доход в сторону прогноза",colMae:"Ход против по пути (сред.)",colN:"Проверено",
  few:"Слишком мало ({n}/30)",pend:"⏳",loadingHist:"Загрузка истории цен…",
  rule:"Как проверяем: для каждого прогноза берём цену закрытия через 1, 5, 10 и 20 торговых дней. Покупка верна, если цена выросла, продажа — если упала, ожидание — если изменение меньше 5%. Точность показывается только после 30 проверенных прогнозов — меньше вводит в заблуждение.",
  maeNote:"Ход против: насколько далеко цена ушла против прогноза до конца горизонта. Даже верный прогноз может быть болезненным по пути.",
  empty:"Прогнозов пока нет. Каждый анализ ИИ и каждый план действий сохраняются здесь автоматически (раз в день на акцию) и потом проверяются по реальной цене.",
  oneDay:"Один прогноз на акцию в день от каждого источника. Прошлые результаты не гарантируют будущих.",
  rkT:"🛡️ Флаги риска",rkConc:"Одна тяжёлая акция: {s} — {p} портфеля",rkConcOk:"Диверсификация: крупнейшая акция — {p} портфеля",rkFew:"Всего {n} акций — низкая диверсификация",
  rkDd:"Упали более чем на 15% от цены покупки: {l}",rkStop:"Около стопа или ниже: {l}",rkSig:"Последний прогноз — сокращать или продавать: {l}",rkStale:"Нет текущей цены: {l}",
  rkFx:"Валютная доля: доллар {u} · шекель {i}",rkOk:"✅ Сейчас флагов риска нет",
  rkNote:"Стоп берётся из последнего открытого плана действий по акции. Отраслевых данных здесь нет, поэтому проверки концентрации по отраслям нет."},
es:{abIdeas:"Ideas y métodos (código abierto)",dShort:"d",planT:"🎯 Plan de acción",planScore:"Puntuación",
  act_strongBuy:"Compra fuerte",act_buy:"Comprar",act_watch:"Esperar",act_reduce:"Reducir",act_sell:"Vender",
  ad_strongBuy:"Se cumplen la mayoría de las condiciones — se puede construir una posición según el plan.",ad_buy:"El panorama es positivo, pero algunas condiciones aún necesitan confirmación.",ad_watch:"Señales mixtas — mejor esperar a que se cumplan las condiciones de entrada.",ad_reduce:"El riesgo ha aumentado. Si la tienes: considera reducir la exposición.",ad_sell:"La tendencia se rompió. Si la tienes: mejor una salida ordenada.",
  lvIdeal:"Entrada ideal",lvSecond:"Segunda entrada",lvStop:"Stop-loss",lvTarget:"Objetivo",lvRR:"Riesgo : beneficio",lvPos:"Tamaño de posición",
  posOf:"{n}/10 del monto que planeaste para esta acción",posWait:"0/10 — no entrar ahora",
  w_ma20:"cerca de la media de 20 días",w_ma50:"cerca de la media de 50 días",w_sup:"cerca del soporte",w_sup2:"soporte más profundo",w_now:"precio actual",w_stop:"bajo el soporte, menos el rango diario (ATR)",w_stopMax:"límite: 15% de pérdida como máximo",w_res:"resistencia cercana",w_52:"máximo de 52 semanas",w_2r:"2× el riesgo (sin resistencia cercana)",
  inZone:"✅ El precio está ahora en la zona de entrada",aboveZone:"El precio está {p} por encima de la entrada ideal — mejor esperar un retroceso",
  holders:"Si la tienes: el nivel de salida es {s}. Por debajo el plan queda anulado.",
  chkT:"✔ Lista de condiciones",
  c_trend:"Tendencia alcista",c_trendD_ok:"Precio sobre la media de 20 días, y la de 20 sobre la de 50",c_trendD_w:"Sobre la media de 50, pero no sobre la de 20",c_trendD_b:"Bajo la media de 50 días — tendencia bajista",
  c_bias:"Sin perseguir el precio",c_biasD:"Distancia a la media de 5 días: {p}",
  c_vol:"El volumen confirma",c_volD:"Volumen en días alcistas vs bajistas (10 días): ×{r}",
  c_rsi:"Impulso sano",c_rsiD:"RSI {v}",
  c_event:"Sin resultados próximos",c_eventD_soon:"Resultados en {n} días — posible movimiento brusco",c_eventD_ok:"Próximos resultados en {n} días",c_eventD_na:"Fecha de resultados desconocida",
  c_val:"Valoración y calidad",c_valQ_pass:"Aprobó el test de calidad",c_valQ_fail:"No aprobó el test de calidad",c_valPE:"PER {v}",c_valLoss:"La empresa pierde dinero (BPA negativo)",c_valNA:"Datos insuficientes",
  g_trend:"⚠️ El precio está bajo la media de 50 días — no se compra en tendencia bajista. La puntuación se limita a \"Esperar\".",
  g_chase:"⚠️ No persigas: el precio está {p} sobre la media de 5 días. La puntuación se limita a \"Esperar\" hasta un retroceso.",
  g_earn:"⚠️ Resultados en {n} días. La puntuación se limita a \"Esperar\" por el riesgo del evento.",
  g_broke:"⚠️ El precio rompió el mínimo de 20 días. La puntuación se limita a \"Reducir\".",
  g_noBad:"\"Compra fuerte\" exige que ninguna condición falle — la puntuación se limita a \"Comprar\".",
  scale:"La escala: 80–100 compra fuerte · 60–79 comprar · 40–59 esperar · 20–39 reducir · 0–19 vender",
  planNote:"El plan se calcula en código con datos de negociación: medias, soportes y resistencias y rango diario (ATR). No es asesoramiento de inversión — la decisión es tuya.",
  sbT:"📊 Marcador — ¿cuánto aciertan las predicciones?",srcAll:"Todo",srcAi:"🤖 IA",srcRules:"🎯 Plan",
  hzT:"Resultados por horizonte",hz:"{n} días hábiles",hz1:"1 día hábil",colRate:"Aciertos",colAvg:"Ganancia media en la dirección prevista",colMae:"Movimiento en contra (media)",colN:"Revisadas",
  few:"Muy pocas ({n}/30)",pend:"⏳",loadingHist:"Cargando historial de precios…",
  rule:"Cómo se revisa: para cada predicción tomamos el cierre tras 1, 5, 10 y 20 días hábiles. Comprar acertó si el precio subió, vender si bajó, esperar si el cambio fue menor al 5%. El porcentaje de aciertos solo se muestra tras 30 predicciones revisadas — menos que eso engaña.",
  maeNote:"Movimiento en contra: lo más lejos que fue el precio contra la predicción antes de terminar el horizonte. Incluso una predicción acertada puede doler por el camino.",
  empty:"Aún no hay predicciones. Cada análisis de IA y cada plan de acción se guardan aquí automáticamente (una vez al día por acción) y luego se revisan contra el precio real.",
  oneDay:"Una predicción por acción al día de cada fuente. Los resultados pasados no garantizan resultados futuros.",
  rkT:"🛡️ Alertas de riesgo",rkConc:"Una acción pesada: {s} es el {p} de la cartera",rkConcOk:"Diversificación: la mayor acción es el {p} de la cartera",rkFew:"Solo {n} acciones — poca diversificación",
  rkDd:"Bajaron más del 15% desde la compra: {l}",rkStop:"Cerca o debajo del stop: {l}",rkSig:"Última predicción: reducir o vender: {l}",rkStale:"Sin precio actual: {l}",
  rkFx:"Exposición a divisas: dólar {u} · shékel {i}",rkOk:"✅ Sin alertas de riesgo ahora",
  rkNote:"El stop viene del último plan de acción abierto para la acción. Aquí no hay datos de sectores, así que no se revisa la concentración por sector."},
ar:{abIdeas:"أفكار وأساليب (مفتوحة المصدر)",dShort:"ي",planT:"🎯 خطة العمل",planScore:"النتيجة",
  act_strongBuy:"شراء قوي",act_buy:"شراء",act_watch:"انتظار",act_reduce:"تقليص",act_sell:"بيع",
  ad_strongBuy:"معظم الشروط متحققة — يمكن بناء مركز وفق الخطة.",ad_buy:"الصورة إيجابية، لكن بعض الشروط ما زالت تحتاج إلى تأكيد.",ad_watch:"الإشارات مختلطة — الأفضل انتظار تحقق شروط الدخول.",ad_reduce:"ارتفع الخطر. لمن يملكه: فكّر في تقليل التعرض.",ad_sell:"انكسر الاتجاه. لمن يملكه: الأفضل خروج منظم.",
  lvIdeal:"دخول مثالي",lvSecond:"دخول ثانٍ",lvStop:"وقف الخسارة",lvTarget:"الهدف",lvRR:"المخاطرة : العائد",lvPos:"حجم المركز",
  posOf:"{n}/10 من المبلغ الذي خططت له لهذا السهم",posWait:"0/10 — لا دخول الآن",
  w_ma20:"قرب متوسط 20 يوماً",w_ma50:"قرب متوسط 50 يوماً",w_sup:"قرب الدعم",w_sup2:"دعم أعمق",w_now:"السعر الحالي",w_stop:"تحت الدعم، ناقص المدى اليومي (ATR)",w_stopMax:"حد أقصى: خسارة 15%",w_res:"مقاومة قريبة",w_52:"أعلى سعر في 52 أسبوعاً",w_2r:"ضعف المخاطرة (لا مقاومة قريبة)",
  inZone:"✅ السعر الآن في منطقة الدخول",aboveZone:"السعر أعلى من الدخول المثالي بـ {p} — الأفضل انتظار تصحيح",
  holders:"لمن يملكه: مستوى الخروج هو {s}. تحته تُلغى الخطة.",
  chkT:"✔ قائمة الشروط",
  c_trend:"اتجاه صاعد",c_trendD_ok:"السعر فوق متوسط 20، ومتوسط 20 فوق متوسط 50",c_trendD_w:"فوق متوسط 50 لكن ليس فوق متوسط 20",c_trendD_b:"تحت متوسط 50 — اتجاه هابط",
  c_bias:"عدم مطاردة السعر",c_biasD:"البعد عن متوسط 5 أيام: {p}",
  c_vol:"الحجم يؤكد",c_volD:"الحجم في أيام الصعود مقابل الهبوط (10 أيام): ×{r}",
  c_rsi:"زخم صحي",c_rsiD:"RSI {v}",
  c_event:"لا نتائج قريبة",c_eventD_soon:"النتائج بعد {n} أيام — حركة حادة ممكنة",c_eventD_ok:"النتائج القادمة بعد {n} يوماً",c_eventD_na:"موعد النتائج القادمة غير معروف",
  c_val:"التقييم والجودة",c_valQ_pass:"اجتاز اختبار الجودة",c_valQ_fail:"لم يجتز اختبار الجودة",c_valPE:"مكرر الربح {v}",c_valLoss:"الشركة خاسرة (ربحية سهم سالبة)",c_valNA:"بيانات غير كافية",
  g_trend:"⚠️ السعر تحت متوسط 50 يوماً — لا شراء في اتجاه هابط. النتيجة محدودة بـ\"انتظار\".",
  g_chase:"⚠️ لا تطارد: السعر أعلى من متوسط 5 أيام بـ {p}. النتيجة محدودة بـ\"انتظار\" حتى التصحيح.",
  g_earn:"⚠️ النتائج بعد {n} أيام. النتيجة محدودة بـ\"انتظار\" بسبب خطر الحدث.",
  g_broke:"⚠️ كسر السعر أدنى مستوى في 20 يوماً. النتيجة محدودة بـ\"تقليص\".",
  g_noBad:"\"شراء قوي\" يتطلب ألا يفشل أي شرط — النتيجة محدودة بـ\"شراء\".",
  scale:"المقياس: 80–100 شراء قوي · 60–79 شراء · 40–59 انتظار · 20–39 تقليص · 0–19 بيع",
  planNote:"تُحسب الخطة برمجياً من بيانات التداول: المتوسطات والدعم والمقاومة والمدى اليومي (ATR). ليست نصيحة استثمارية — القرار لك.",
  sbT:"📊 لوحة النتائج — كم مرة تصيب التوقعات؟",srcAll:"الكل",srcAi:"🤖 الذكاء الاصطناعي",srcRules:"🎯 الخطة",
  hzT:"النتائج حسب المدة",hz:"{n} أيام تداول",hz1:"يوم تداول واحد",colRate:"نسبة الإصابة",colAvg:"متوسط الربح في اتجاه التوقع",colMae:"الحركة المعاكسة في الطريق (متوسط)",colN:"تم فحصها",
  few:"قليل جداً ({n}/30)",pend:"⏳",loadingHist:"تحميل تاريخ الأسعار…",
  rule:"طريقة الفحص: لكل توقع نأخذ سعر الإغلاق بعد 1 و5 و10 و20 يوم تداول. الشراء صحيح إذا ارتفع السعر، والبيع إذا انخفض، والانتظار إذا كان التغير أقل من 5%. نسبة الإصابة تظهر فقط بعد 30 توقعاً مفحوصاً — أقل من ذلك مضلل.",
  maeNote:"الحركة المعاكسة: أبعد ما ذهب إليه السعر عكس التوقع قبل نهاية المدة. حتى التوقع الصحيح قد يؤلم في الطريق.",
  empty:"لا توجد توقعات بعد. كل تحليل ذكاء اصطناعي وكل خطة عمل تُحفظ هنا تلقائياً (مرة يومياً لكل سهم) وتُفحص لاحقاً مقابل السعر الفعلي.",
  oneDay:"توقع واحد لكل سهم يومياً من كل مصدر. الأداء السابق لا يضمن النتائج المستقبلية.",
  rkT:"🛡️ أعلام المخاطر",rkConc:"سهم واحد ثقيل: {s} يشكل {p} من المحفظة",rkConcOk:"التنويع: أكبر سهم يشكل {p} من المحفظة",rkFew:"{n} أسهم فقط — تنويع منخفض",
  rkDd:"انخفضت أكثر من 15% عن سعر الشراء: {l}",rkStop:"قرب وقف الخسارة أو تحته: {l}",rkSig:"آخر توقع تقليص أو بيع: {l}",rkStale:"لا يوجد سعر حالي: {l}",
  rkFx:"التعرض للعملة: دولار {u} · شيكل {i}",rkOk:"✅ لا توجد أعلام مخاطر الآن",
  rkNote:"وقف الخسارة مأخوذ من آخر خطة عمل فُتحت للسهم. لا توجد هنا بيانات قطاعات، لذلك لا يوجد فحص تركّز حسب القطاع."}
};
function P8(k,o){var l=P8_T[curLang]||P8_T.en,s=l[k]!=null?l[k]:(P8_T.en[k]!=null?P8_T.en[k]:k);for(var x in (o||{}))s=s.split('{'+x+'}').join(o[x]);return s;}

/* ══ 1. One decision scale (0–100) — used by the plan, the AI prompt and the scoreboard ══ */
var DECISION_SCALE=[[80,'strongBuy','BUY'],[60,'buy','BUY'],[40,'watch','HOLD'],[20,'reduce','SELL'],[0,'sell','SELL']];
function decisionFromScore(s){for(var i=0;i<DECISION_SCALE.length;i++)if(s>=DECISION_SCALE[i][0])return {act:DECISION_SCALE[i][1],rec:DECISION_SCALE[i][2]};return {act:'sell',rec:'SELL'};}
function actColor(a){return a==='strongBuy'||a==='buy'?'var(--green)':a==='watch'?'var(--gold)':'var(--red)';}
function _dcAvg(a){var s=0,n=0;for(var i=0;i<a.length;i++)if(a[i]!=null&&isFinite(a[i])){s+=a[i];n++;}return n?s/n:null;}
function _dcPct(x){if(Math.abs(x)<0.05)x=0;return '\u2066'+(x>0?'+':'')+x.toFixed(1)+'%\u2069';}
function _ymd(d){d=d||new Date();var m=d.getMonth()+1,dd=d.getDate();return d.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(dd<10?'0':'')+dd;}

/* ══ 2. The plan — pure function of daily OHLC (+ quote facts). No look-ahead, no AI. ══ */
function computePlan(ohlc,q,quality){
  if(!ohlc||ohlc.length<60)return null;
  var bars=ohlc.filter(function(b){return b&&b[4]!=null&&isFinite(b[4]);});if(bars.length<60)return null;
  var c=bars.map(function(b){return b[4];}),h=bars.map(function(b){return b[2]!=null?b[2]:b[4];}),l=bars.map(function(b){return b[3]!=null?b[3]:b[4];}),v=bars.map(function(b){return b[5]||0;});
  var n=c.length,px=(q&&q.regularPrice>0)?q.regularPrice:c[n-1];
  var ma=function(p){return n>=p?_dcAvg(c.slice(-p)):null;};
  var ma5=ma(5),ma10=ma(10),ma20=ma(20),ma50=ma(50);
  // ATR 14 (Wilder)
  var atr=null;for(var i=1;i<n;i++){var tr=Math.max(h[i]-l[i],Math.abs(h[i]-c[i-1]),Math.abs(l[i]-c[i-1]));atr=atr==null?tr:atr+(tr-atr)/14;}
  if(!(atr>0))atr=px*0.02;
  // swing pivots (±3 bars) over the last 120 bars
  var lows=[],highs=[];
  for(i=Math.max(3,n-120);i<n-3;i++){
    var isL=true,isH=true;for(var k=i-3;k<=i+3;k++){if(l[k]<l[i])isL=false;if(h[k]>h[i])isH=false;}
    if(isL)lows.push(l[i]);if(isH)highs.push(h[i]);
  }
  var sup=lows.filter(function(x){return x<px*0.995;}).sort(function(a,b){return b-a;});
  var res=highs.filter(function(x){return x>px*1.005;}).sort(function(a,b){return a-b;});
  var low20=Math.min.apply(null,l.slice(-20)),s1=sup.length?sup[0]:low20;
  var s2=null;for(i=0;i<sup.length;i++)if(sup[i]<s1*0.97){s2=sup[i];break;}
  if(s2==null)s2=s1-atr;
  var hi52=Math.max.apply(null,h.slice(-252));
  var trendUp=ma20!=null&&ma50!=null&&px>ma20&&ma20>ma50;
  // entries
  var ideal,whyI,second,whyS;
  if(trendUp){
    if(ma20>=s1){ideal=ma20;whyI='w_ma20';}else{ideal=s1;whyI='w_sup';}
    if(ideal>px){ideal=px;whyI='w_now';}
    if(ma50!=null&&ma50>=s2&&ma50<ideal){second=ma50;whyS='w_ma50';}else{second=s2;whyS='w_sup2';}
    if(second>=ideal){second=ideal-atr;whyS='w_sup2';}
  }else{
    ideal=Math.min(px,s1);whyI=ideal===px?'w_now':'w_sup';
    second=s2<ideal?s2:ideal-atr;whyS='w_sup2';
  }
  // stop — below the second entry and the support, minus volatility; never more than 15% under the ideal entry
  var stop=Math.min(second-0.5*atr,ideal-1.5*atr),whyStop='w_stop';
  if((ideal-stop)/ideal>0.15){stop=ideal*0.85;whyStop='w_stopMax';}
  if(stop<=0)stop=ideal*0.85;
  var risk=ideal-stop;
  // target — nearest resistance that pays at least 1R, else the 52-week high, else 2R
  var target=null,whyT='w_2r';
  for(i=0;i<res.length;i++)if(res[i]>=ideal+risk){target=res[i];whyT='w_res';break;}
  if(target==null&&hi52>=ideal+risk&&hi52>px*1.005){target=hi52;whyT='w_52';}
  if(target==null){target=ideal+2*risk;whyT='w_2r';}
  var rr=risk>0?(target-ideal)/risk:null;
  // ── checklist ──
  var t=(typeof computeTechnical==='function')?computeTechnical(bars):null;
  var chk=[];
  // 1 trend
  chk.push({k:'c_trend',s:trendUp?'ok':(ma50!=null&&px>ma50)?'warn':'bad',d:trendUp?P8('c_trendD_ok'):(ma50!=null&&px>ma50)?P8('c_trendD_w'):P8('c_trendD_b')});
  // 2 don't chase (bias vs MA5)
  var bias=ma5?(px/ma5-1)*100:0;
  chk.push({k:'c_bias',s:bias>5?'bad':bias>2?'warn':bias<-5?'warn':'ok',d:P8('c_biasD',{p:_dcPct(bias)}),bias:bias});
  // 3 volume on up days vs down days (10 days)
  var upV=0,dnV=0;for(i=Math.max(1,n-10);i<n;i++){if(c[i]>c[i-1])upV+=v[i];else if(c[i]<c[i-1])dnV+=v[i];}
  var vr=dnV>0?upV/dnV:(upV>0?3:null);
  chk.push({k:'c_vol',s:vr==null?'na':vr>=1.2?'ok':vr>=0.8?'warn':'bad',d:vr==null?P8('c_valNA'):P8('c_volD',{r:vr.toFixed(2)})});
  // 4 momentum
  var rsi=t?t.rsi:null;
  chk.push({k:'c_rsi',s:rsi==null?'na':(rsi>=40&&rsi<=70)?'ok':(rsi>80||rsi<30)?'bad':'warn',d:rsi==null?P8('c_valNA'):P8('c_rsiD',{v:Math.round(rsi)})});
  // 5 event risk — next earnings
  var ed=(q&&q.earningsDate&&typeof daysUntil==='function')?daysUntil(q.earningsDate):null;
  if(ed==null||ed<0)chk.push({k:'c_event',s:'na',d:P8('c_eventD_na')});
  else if(ed<=7)chk.push({k:'c_event',s:'warn',d:P8('c_eventD_soon',{n:ed}),days:ed});
  else chk.push({k:'c_event',s:'ok',d:P8('c_eventD_ok',{n:ed}),days:ed});
  // 6 valuation & quality
  var qv=quality&&quality.verdict;
  if(qv==='pass'||qv==='exempt')chk.push({k:'c_val',s:'ok',d:P8('c_valQ_pass')});
  else if(qv==='fail')chk.push({k:'c_val',s:'bad',d:P8('c_valQ_fail')});
  else if(q&&q.eps!=null&&q.eps<0)chk.push({k:'c_val',s:'bad',d:P8('c_valLoss')});
  else if(q&&q.peRatio>0)chk.push({k:'c_val',s:q.peRatio<25?'ok':q.peRatio<50?'warn':'bad',d:P8('c_valPE',{v:Math.round(q.peRatio*10)/10})});
  else chk.push({k:'c_val',s:'na',d:P8('c_valNA')});
  // ── score: half technical composite, half checklist ──
  var base=t?Math.max(0,Math.min(100,(t.score+3.25)/6.5*100)):50;
  var pts=0,cnt=0;chk.forEach(function(x){if(x.s==='na')return;cnt++;pts+=x.s==='ok'?1:x.s==='warn'?0.5:0;});
  var ratio=cnt?pts/cnt:0.5;
  var score=Math.round(0.5*base+0.5*ratio*100),raw=score,guards=[];
  // guardrails — every cap says why (a neutral action without a reason is not allowed)
  if(chk[0].s==='bad'&&score>59){score=59;guards.push(P8('g_trend'));}
  if(bias>5&&score>59){score=59;guards.push(P8('g_chase',{p:_dcPct(bias)}));}
  if(ed!=null&&ed>=0&&ed<=3&&score>59){score=59;guards.push(P8('g_earn',{n:ed}));}
  var prevLow20=Math.min.apply(null,l.slice(-21,-1));
  if(px<prevLow20&&score>39){score=39;guards.push(P8('g_broke'));}
  if(score>=80&&chk.some(function(x){return x.s==='bad';})){score=79;guards.push(P8('g_noBad'));}
  var d=decisionFromScore(score);
  // position size (of the amount the user planned for this stock)
  var pos=d.act==='strongBuy'?6:d.act==='buy'?4:0;
  if(pos>0){if(t&&t.hvPct>80)pos--;if(rr!=null&&rr<1.5)pos--;if(pos<1)pos=1;}
  return {px:px,ma5:ma5,ma20:ma20,ma50:ma50,atr:atr,ideal:ideal,whyI:whyI,second:second,whyS:whyS,stop:stop,whyStop:whyStop,target:target,whyT:whyT,rr:rr,
    chk:chk,score:score,raw:raw,act:d.act,rec:d.rec,guards:guards,pos:pos,bias:bias,distIdeal:(px/ideal-1)*100,tech:t};
}

/* ══ 3. Render in the Overview tab ══ */
var CHK_ICON={ok:'✅',warn:'⚠️',bad:'❌',na:'❔'};
function renderPlan(symbol){
  var el=document.getElementById('lvPlan');if(!el)return;
  var src=window.__techOhlc;
  if(!src||src.symbol!==symbol){el.innerHTML='';window.__planResult=null;return;}
  var snap=(typeof snapGet==='function')?snapGet(symbol):null,q=snap&&snap.q;
  if(window.__lastLiveQuote&&window.__lastLiveQuote.symbol===symbol)q=window.__lastLiveQuote;
  var qr=window.__qualityResult&&window.__qualityResult.symbol===symbol?window.__qualityResult.res:null;
  var p=computePlan(src.ohlc,q,qr);
  if(!p){el.innerHTML='';window.__planResult=null;return;}
  window.__planResult={symbol:symbol,plan:p,cur:(q&&q.currency)||'USD'};
  var cur=(q&&q.currency)||'USD',F=function(x){return fmtPrice(x,cur);},col=actColor(p.act);
  var lv=function(lbl,val,why,cls){return '<div class="pl-lv'+(cls?' '+cls:'')+'"><span>'+lbl+'</span><b>'+F(val)+'</b><em>'+P8(why)+'</em></div>';};
  var buySide=p.act==='strongBuy'||p.act==='buy'||p.act==='watch';
  var h='<div class="pl-card" style="border-inline-start-color:'+col+'">'
    +'<div class="pl-head"><div class="pl-title">'+P8('planT')+'</div><div class="pl-badge" style="color:'+col+';border-color:'+col+'">'+P8('act_'+p.act)+' · '+p.score+'/100</div></div>'
    +'<div class="pl-meter" role="img" aria-label="'+P8('planScore')+' '+p.score+'/100"><div class="pl-meter-fill" style="width:'+Math.max(3,p.score)+'%;background:'+col+'"></div><i style="inset-inline-start:20%"></i><i style="inset-inline-start:40%"></i><i style="inset-inline-start:60%"></i><i style="inset-inline-start:80%"></i></div>'
    +'<div class="pl-desc">'+P8('ad_'+p.act)+'</div>'
    +p.guards.map(function(g){return '<div class="pl-guard">'+g+'</div>';}).join('');
  if(buySide){
    h+=(p.distIdeal<=1.5?'<div class="pl-zone ok">'+P8('inZone')+'</div>':'<div class="pl-zone">'+P8('aboveZone',{p:_dcPct(p.distIdeal)})+'</div>');
    h+='<div class="pl-lvs">'+lv(P8('lvIdeal'),p.ideal,p.whyI)+lv(P8('lvSecond'),p.second,p.whyS)+lv(P8('lvStop'),p.stop,p.whyStop,'stop')+lv(P8('lvTarget'),p.target,p.whyT,'tgt')+'</div>';
    h+='<div class="pl-row2"><div><span>'+P8('lvRR')+'</span><b style="color:'+(p.rr>=2?'var(--green)':p.rr>=1.5?'var(--gold)':'var(--red)')+'">1 : '+(p.rr!=null?p.rr.toFixed(1):'—')+'</b></div>'
      +'<div><span>'+P8('lvPos')+'</span><b>'+(p.pos>0?P8('posOf',{n:p.pos}):P8('posWait'))+'</b></div></div>';
  }else{
    h+='<div class="pl-zone bad">'+P8('holders',{s:F(p.stop)})+'</div>';
  }
  h+='<div class="pl-chk-t">'+P8('chkT')+'</div><div class="pl-chk">'+p.chk.map(function(x){return '<div class="pl-ck '+x.s+'"><span class="pl-ci">'+CHK_ICON[x.s]+'</span><div><b>'+P8(x.k)+'</b><em>'+escHtml(x.d)+'</em></div></div>';}).join('')+'</div>'
    +'<div class="ta-note">'+P8('scale')+'<br>'+P8('planNote')+'</div></div>';
  el.innerHTML=h;
  try{renderLiveTabs();applyLiveTabs();}catch(e){}
  planStore(symbol,p,cur);
  sbRecordRules(symbol,p,cur);
}
/* last plan per stock — used by the portfolio risk flags (stop level) */
function plansLoad(){try{return JSON.parse(localStorage.getItem('stockai_plans'))||{};}catch(e){return {};}}
function planStore(sym,p,cur){try{var a=plansLoad();a[sym]={stop:p.stop,ideal:p.ideal,target:p.target,act:p.act,score:p.score,cur:cur,d:_ymd()};
  var keys=Object.keys(a);if(keys.length>120){keys.sort(function(x,y){return (a[x].d||'')<(a[y].d||'')?-1:1;});keys.slice(0,keys.length-120).forEach(function(k){delete a[k];});}
  localStorage.setItem('stockai_plans',JSON.stringify(a));}catch(e){}}

/* hook into the stock-card pipeline: clear on a new symbol, draw after the technical data, redraw when quality/events arrive */
(function(){
  var lld=loadLiveData;
  loadLiveData=function(symbol){var e=document.getElementById('lvPlan');if(e){e.innerHTML='';e.style.display='none';}window.__planResult=null;return lld.apply(this,arguments);};
  var lt=loadTechnical;
  loadTechnical=async function(symbol){
    var r=await lt.apply(this,arguments);
    try{if(currentLiveSymbol===symbol)renderPlan(symbol);}catch(e){}
    try{Promise.resolve(window.__extrasPromise).then(function(){if(currentLiveSymbol===symbol)renderPlan(symbol);});}catch(e){}
    return r;
  };
  // the plan belongs to Overview, right under the chart
  try{LIVE_TAB_DEFS.forEach(function(d){if(d[0]==='overview'&&d[2].indexOf('lvPlan')<0)d[2].splice(1,0,'lvPlan');});}catch(e){}
})();

/* plan facts for the AI — computed in code, the AI only interprets (and must explain a disagreement) */
var __origExtraCtx8=buildExtraContext;
buildExtraContext=function(symbol){
  var s=__origExtraCtx8(symbol),pr=window.__planResult;
  if(!pr||pr.symbol!==symbol)return s;
  var p=pr.plan,f=function(x){return x==null?'n/a':(Math.round(x*100)/100);};
  return s+'RULES-BASED ACTION PLAN (computed in code, decision scale 0-100: 80-100 strong buy, 60-79 buy, 40-59 watch, 20-39 reduce, 0-19 sell): action='+P8_T.en['act_'+p.act]+' score '+p.score+'/100'
    +'; ideal entry '+f(p.ideal)+', second entry '+f(p.second)+', stop '+f(p.stop)+', target '+f(p.target)+', risk:reward 1:'+(p.rr!=null?p.rr.toFixed(1):'n/a')
    +'; checklist: '+p.chk.map(function(x){return P8_T.en[x.k]+'='+x.s;}).join(', ')
    +(p.guards.length?'; guardrails applied: '+p.guards.length:'')
    +'.\nIf your recommendation differs from this rules-based action, say exactly why in bottomLine (which fact outweighs which rule).\n';
};

/* ══ 4. Scoreboard v2 — horizons in trading days, 30-sample rule, AI vs rules ══ */
var SB_HZ=[1,5,10,20],SB_MIN=30,__sbHist={},__sbSrc='all',__sbLoading=false;
sbSave=function(a){try{localStorage.setItem('stockai_scoreboard',JSON.stringify(a.slice(-600)));}catch(e){}};
recordPrediction=function(symbol,r){
  var rec=String(r.recommendation||'').toUpperCase();if(['BUY','SELL','HOLD'].indexOf(rec)<0)return;
  var q=window.__lastLiveQuote,price=(q&&q.symbol===symbol&&q.regularPrice)||parsePriceStr(r.currentPrice);if(!price)return;
  var day=_ymd(),all=sbLoad();
  all=all.filter(function(x){return !(x.symbol===symbol&&(x.src||'ai')==='ai'&&_ymd(new Date(x.date))===day);});
  all.push({id:Date.now(),src:'ai',symbol:symbol,rec:rec,conf:r.confidenceScore||null,target:parsePriceStr(r.priceTarget),price:price,cur:(q&&q.currency)||'USD',date:new Date().toISOString(),model:localStorage.getItem('stockai_worked_'+(loadAIConfig().provider||''))||loadAIConfig().provider||''});
  sbSave(all);
};
function sbRecordRules(symbol,p,cur){
  // the first plan of the day counts — re-opening the stock later the same day does not re-price it
  var day=_ymd(),all=sbLoad();
  if(all.some(function(x){return x.symbol===symbol&&x.src==='rules'&&_ymd(new Date(x.date))===day;}))return;
  all.push({id:Date.now()+1,src:'rules',symbol:symbol,rec:p.rec,act:p.act,score:p.score,target:p.target,stop:p.stop,price:p.px,cur:cur,date:new Date().toISOString(),model:'rules'});
  sbSave(all);
}
function _barDay(t){return _ymd(new Date(t*1000));}
/* evaluate one call against daily bars; completed horizons are frozen into the record (x.ev) */
function sbEval2(x){
  var ev=x.ev||{},o=__sbHist[x.symbol],out={};
  SB_HZ.forEach(function(k){if(ev[k])out[k]=ev[k];});
  if(o&&o.length){
    var today=_ymd(),bars=o.filter(function(b){return b&&b[4]!=null&&_barDay(b[0])!==today;}); // only closed days
    var d0=_ymd(new Date(x.date)),i0=-1;
    for(var i=0;i<bars.length;i++){if(_barDay(bars[i][0])>=d0){i0=i;break;}}
    if(i0>=0)SB_HZ.forEach(function(k){
      if(out[k])return;var j=i0+k;if(j>=bars.length)return;
      var ret=(bars[j][4]/x.price-1)*100,mae=0;
      for(var m=i0+1;m<=j;m++){var adv=x.rec==='SELL'?(bars[m][2]/x.price-1)*100:(1-bars[m][3]/x.price)*100;if(adv>mae)mae=adv;}
      var hit=x.rec==='BUY'?ret>0:x.rec==='SELL'?ret<0:Math.abs(ret)<5;
      out[k]={r:Math.round(ret*100)/100,m:Math.round(mae*100)/100,h:hit?1:0};
    });
  }
  return out;
}
function sbFreeze(){
  var all=sbLoad(),changed=false;
  all.forEach(function(x){var e=sbEval2(x),ev=x.ev||{};SB_HZ.forEach(function(k){if(e[k]&&!ev[k]){ev[k]=e[k];changed=true;}});if(Object.keys(ev).length)x.ev=ev;});
  if(changed)sbSave(all);
}
async function sbLoadHistories(){
  var all=sbLoad(),need={};
  all.forEach(function(x){var ev=x.ev||{};if(SB_HZ.every(function(k){return ev[k];}))return;var age=(Date.now()-new Date(x.date).getTime())/86400000;need[x.symbol]=Math.max(need[x.symbol]||0,age);});
  var syms=Object.keys(need).filter(function(s){return !__sbHist[s];});
  if(!syms.length)return;
  __sbLoading=true;
  for(var i=0;i<syms.length;i+=4){
    await Promise.all(syms.slice(i,i+4).map(function(s){
      var age=need[s],range=age<150?'6mo':age<330?'1y':'2y';
      return workerFetch('action=chart&symbol='+encodeURIComponent(s)+'&range='+range+'&interval=1d').then(function(d){__sbHist[s]=d.ohlc||[];}).catch(function(){});
    }));
  }
  __sbLoading=false;sbFreeze();
}
openScoreboard=function(){
  try{var c=JSON.parse(localStorage.getItem('stockai_sb_prices'));if(c&&c.p)__sbPrices=c.p;}catch(e){}
  renderScoreboard();openModal('scoreOverlay');
  Promise.all([sbRefreshPrices(),sbLoadHistories()]).then(renderScoreboard,renderScoreboard);
};
function sbSetSrc(s){__sbSrc=s;renderScoreboard();}
function sbStats(list,k){
  var done=list.map(function(x){return sbEval2(x)[k];}).filter(Boolean);
  var dirRet=[];list.forEach(function(x){var e=sbEval2(x)[k];if(e&&x.rec!=='HOLD')dirRet.push(x.rec==='SELL'?-e.r:e.r);});
  return {n:done.length,hits:done.filter(function(e){return e.h;}).length,avg:_dcAvg(dirRet),mae:_dcAvg(done.map(function(e){return e.m;}))};
}
renderScoreboard=function(){
  var el=document.getElementById('scoreBody');if(!el)return;
  var tt=document.getElementById('scoreTitle');if(tt)tt.textContent=P8('sbT');
  var all=sbLoad().slice().reverse();
  if(!all.length){el.innerHTML='<div class="ta-small" style="padding:10px 0">'+P8('empty')+'</div><div class="ta-note">'+P8('rule')+'</div>';return;}
  var list=all.filter(function(x){return __sbSrc==='all'||(x.src||'ai')===__sbSrc;});
  var h='<div class="mk-tabs">'+[['all','srcAll'],['ai','srcAi'],['rules','srcRules']].map(function(s){var n=s[0]==='all'?all.length:all.filter(function(x){return (x.src||'ai')===s[0];}).length;return '<button class="'+(__sbSrc===s[0]?'on':'')+'" onclick="sbSetSrc(\''+s[0]+'\')">'+P8(s[1])+' · '+n+'</button>';}).join('')+'</div>';
  h+='<div class="rec-trend-title" style="margin-top:10px">'+P8('hzT')+'</div><div class="sb-hz"><div class="sb-hz-h"><span></span><span>'+P8('colRate')+'</span><span>'+P8('colAvg')+'</span><span>'+P8('colMae')+'</span></div>';
  SB_HZ.forEach(function(k){
    var s=sbStats(list,k),rate=s.n>=SB_MIN?Math.round(s.hits/s.n*100):null;
    var rc=rate==null?'var(--text-dim)':rate>=60?'var(--green)':rate>=45?'var(--gold)':'var(--red)';
    h+='<div class="sb-hz-r"><span>'+(k===1?P8('hz1'):P8('hz',{n:k}))+'</span>'
      +'<b style="color:'+rc+'">'+(rate!=null?rate+'%':'<small>'+P8('few',{n:s.n})+'</small>')+'</b>'
      +'<b style="color:'+(s.avg==null?'var(--text-dim)':s.avg>=0?'var(--green)':'var(--red)')+'">'+(s.avg!=null&&s.n>=SB_MIN?_dcPct(s.avg):'—')+'</b>'
      +'<b>'+(s.mae!=null&&s.n>=SB_MIN?'-'+s.mae.toFixed(1)+'%':'—')+'</b></div>';
  });
  h+='</div>'+(__sbLoading?'<div class="ta-small">'+P8('loadingHist')+'</div>':'');
  h+='<div class="sb-actions"><button onclick="__sbHist={};Promise.all([sbRefreshPrices(),sbLoadHistories()]).then(renderScoreboard)">'+P4('sbRefresh')+'</button><button onclick="sbExportCsv()">'+P4('sbCsv')+'</button><button onclick="sbClearAll()">'+P4('sbClear')+'</button></div><div class="sb-list">';
  list.slice(0,150).forEach(function(x){
    var e=sbEval2(x),now=__sbPrices[x.symbol],chg=now?(now/x.price-1)*100:null,rc=x.rec==='BUY'?'var(--green)':x.rec==='SELL'?'var(--red)':'var(--gold)';
    var lbl=x.src==='rules'&&x.act?P8('act_'+x.act):P4('rec'+x.rec);
    var chips=[5,20].map(function(k){var r=e[k];return '<span class="sb-chip">'+k+P8('dShort')+': '+(r?'<b style="color:'+(r.h?'var(--green)':'var(--red)')+'">'+_dcPct(r.r)+' '+(r.h?'✓':'✗')+'</b>':P8('pend'))+'</span>';}).join('');
    h+='<div class="sb-row"><div class="sb-sym" onclick="closeModal(\'scoreOverlay\');quickLive(\''+escHtml(x.symbol)+'\')">'+escHtml(x.symbol)+'</div>'
      +'<div class="sb-rec" style="color:'+rc+';border-color:'+rc+'">'+(x.src==='rules'?'🎯 ':'🤖 ')+lbl+'</div>'
      +'<div class="sb-mid"><div>'+escHtml(_ymd(new Date(x.date)))+' · '+fmtPrice(x.price,x.cur)+(now?' → '+fmtPrice(now,x.cur):'')+(chg!=null?' <strong style="color:'+(chg>=0?'var(--green)':'var(--red)')+'">'+fmtPct(chg)+'</strong>':'')+'</div>'
      +'<div>'+chips+'</div></div>'
      +'<button class="sb-del" aria-label="delete" onclick="sbDelete('+x.id+')">🗑</button></div>';
  });
  h+='</div><div class="ta-note">'+P8('rule')+'<br>'+P8('maeNote')+'<br>'+P8('oneDay')+'</div>';
  el.innerHTML=h;
};
sbDelete=function(id){_undoRemove(sbLoad,sbSave,function(x){return x.id===id;},renderScoreboard);};
sbClearAll=function(){var keep=sbLoad();if(!keep.length)return;sbSave([]);renderScoreboard();undoToast(NT('cleared'),function(){sbSave(keep);renderScoreboard();});};
sbExportCsv=function(){
  var rows=[['user','source','symbol','call','score','price_at_call','currency','date','ret_1d','ret_5d','ret_10d','ret_20d','hit_5d','hit_20d','worst_against_20d','model']];
  sbLoad().forEach(function(x){var e=sbEval2(x),g=function(k,f){return e[k]?e[k][f]:'';};
    rows.push([getUsername(),x.src||'ai',x.symbol,x.act||x.rec,x.score||x.conf||'',x.price,x.cur||'',_ymd(new Date(x.date)),g(1,'r'),g(5,'r'),g(10,'r'),g(20,'r'),g(5,'h'),g(20,'h'),g(20,'m'),x.model||'']);});
  var csv='﻿'+rows.map(function(r){return r.map(function(c){return '"'+String(c).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download='stockai-scoreboard-'+_ymd()+'.csv';document.body.appendChild(a);a.click();a.remove();
};

/* ══ 5. Portfolio risk flags — shown above the holdings, refreshed with the live prices ══ */
function pfRiskHtml(){
  var c=pfCalc();if(!c.rows.length)return '';
  var flags=[],info=[],plans=plansLoad(),sb=sbLoad();
  var pct=function(x){return Math.round(x)+'%';},nm=function(s){return escHtml(String(s).replace(/\.TA$/,''));};
  var known=c.rows.filter(function(r){return r.valueUSD!=null;});
  if(c.value>0&&known.length){
    var top=known.slice().sort(function(a,b){return b.valueUSD-a.valueUSD;})[0],w=top.valueUSD/c.value*100;
    if(w>30&&known.length>1)flags.push(P8('rkConc',{s:nm(top.h.sym),p:pct(w)}));else if(known.length>1)info.push(P8('rkConcOk',{p:pct(w)}));
  }
  if(c.rows.length<5)info.push(P8('rkFew',{n:c.rows.length}));
  var dd=c.rows.filter(function(r){return r.px!=null&&r.h.buy>0&&(r.px/r.h.buy-1)<=-0.15;}).map(function(r){return nm(r.h.sym)+' '+fmtPct((r.px/r.h.buy-1)*100);});
  if(dd.length)flags.push(P8('rkDd',{l:dd.join(', ')}));
  var ns=c.rows.filter(function(r){var p=plans[r.h.sym];if(!p||r.px==null||!(p.stop>0))return false;var stopU=p.cur==='ILA'?p.stop/100:p.stop;return r.px<=stopU*1.03;}).map(function(r){return nm(r.h.sym);});
  if(ns.length)flags.push(P8('rkStop',{l:ns.join(', ')}));
  var sig=c.rows.filter(function(r){var last=null;sb.forEach(function(x){if(x.symbol===r.h.sym&&(!last||x.date>last.date))last=x;});return last&&last.rec==='SELL';}).map(function(r){return nm(r.h.sym);});
  if(sig.length)flags.push(P8('rkSig',{l:sig.join(', ')}));
  var stale=c.rows.filter(function(r){return r.px==null;}).map(function(r){return nm(r.h.sym);});
  if(stale.length)flags.push(P8('rkStale',{l:stale.join(', ')}));
  if(c.value>0){var ils=0;known.forEach(function(r){if(r.cur==='ILS'||r.cur==='ILA')ils+=r.valueUSD;});var ip=ils/c.value*100;info.push(P8('rkFx',{u:pct(100-ip),i:pct(ip)}));}
  return '<div class="rk-card"><div class="rec-trend-title">'+P8('rkT')+'</div>'
    +(flags.length?flags.map(function(f){return '<div class="rk-f">⚠️ '+f+'</div>';}).join(''):'<div class="rk-ok">'+P8('rkOk')+'</div>')
    +info.map(function(f){return '<div class="rk-i">• '+f+'</div>';}).join('')
    +'<div class="ta-note" style="margin-top:6px">'+P8('rkNote')+'</div></div>';
}
var __origPfLive8=pfUpdateLive;
pfUpdateLive=function(){
  var r=__origPfLive8.apply(this,arguments);
  try{var el=document.getElementById('pfLive');if(el&&el.innerHTML){var d=document.createElement('div');d.innerHTML=pfRiskHtml();if(d.firstChild)el.insertBefore(d.firstChild,el.children[1]||null);}}catch(e){}
  return r;
};
;(window.__MODS=window.__MODS||{})['app-decide']=1;

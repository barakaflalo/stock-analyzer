/* StockAI · app-engines.js — Analysis engines: technical, candlesticks, seasonality, quality screen, SEC events, 4-masters render
   AppNest © 2026 · load order matters: see <script> tags in stock-analyzer.html */
/* ══════════════════════════════════════════════════════════════
   ANALYSIS ENGINES — טכני · איכות · אירועים · ועדת מאסטרים
   שיטות מבוססות על Vibe-Trading (MIT) ו-AI Berkshire (MIT)
══════════════════════════════════════════════════════════════ */
var P1_T={
he:{tabTech:"טכני",tabQuality:"איכות",tabEvents:"אירועים",
techT:"📐 איתות טכני משולב",sigStrongBuy:"חיובי חזק",sigBuy:"חיובי",sigNeutral:"ניטרלי",sigSell:"שלילי",sigStrongSell:"שלילי חזק",
dimTrend:"מגמה",dimMom:"מומנטום",dimVol:"זרימת כסף",up:"עולה",down:"יורדת",flat:"צדדית",
adxStrong:"מגמה חזקה",adxWeak:"מגמה חלשה",rsiOver:"קניית יתר",rsiUnder:"מכירת יתר",rsiNormal:"טווח רגיל",obvUp:"כסף נכנס",obvDown:"כסף יוצא",
indRSI:"RSI (14)",indADX:"ADX (14)",indBB:"מיקום בבולינגר",indMA50:"מול ממוצע 50",indMA200:"מול ממוצע 200",indVolR:"מחזור מול ממוצע",indCross:"ממוצעים 50/200",
golden:"צלב זהב ✦",death:"צלב מוות",goldenRecent:"צלב זהב טרי!",deathRecent:"צלב מוות טרי!",
volT:"🌊 תנודתיות",hvL:"תנודתיות שנתית",hvPct:"דירוג מול השנה",volLow:"נמוכה — לעיתים קודמת לתנועה חדה",volHigh:"גבוהה — שוק עצבני",volMid:"רגילה",
candleT:"🕯️ תבניות נרות (5 ימים אחרונים)",noCandles:"לא זוהו תבניות מיוחדות",
hammer:"פטיש",invHammer:"פטיש הפוך",shootingStar:"כוכב נופל",doji:"דוג'י",spinningTop:"סביבון",bullEngulf:"בליעה שורית",bearEngulf:"בליעה דובית",bullHarami:"הראמי שורי",bearHarami:"הראמי דובי",piercing:"קו חודר",darkCloud:"ענן כהה",morningStar:"כוכב בוקר",eveningStar:"כוכב ערב",threeSoldiers:"שלושה חיילים לבנים",threeCrows:"שלושה עורבים שחורים",
bull:"שורי",bear:"דובי",neutral:"ניטרלי",
seasonT:"🗓️ עונתיות (5 שנים)",seasonNote:"תשואה ממוצעת לפי חודש · החודש הנוכחי מודגש",bestM:"החודש החזק",worstM:"החודש החלש",
months:["ינו","פבר","מרץ","אפר","מאי","יוני","יולי","אוג","ספט","אוק","נוב","דצמ"],
techNote:"חישוב אוטומטי מנתוני מסחר יומיים (EMA, ADX, RSI, בולינגר, OBV). אינדיקטורים טכניים מתארים את העבר ואינם מבטיחים את העתיד.",
qualT:"🏅 מבחן איכות — 7 מדדים",qualNote:"מסננת שנועדה לפסול חברות שאינן מהשורה הראשונה — לא איתות קנייה. שיטה: AI Berkshire.",
q1:"תשואה ממוצעת על ההון",q1d:"יעילות הון · סף 8%",q2:"תזרים חופשי מצטבר",q2d:"כסף אמיתי · חייב להיות חיובי",q3:"כיסוי ריבית",q3d:"רווח תפעולי/ריבית · סף פי 2",q4:"שולי רווח גולמי",q4d:"כוח תמחור · סף 15%",q5:"איכות הרווח",q5d:"תזרים/רווח נקי · סף 0.7",q6:"שולי רווח נקי",q6d:"עמידות · סף 5%",q7:"דילול מניות",q7d:"הגנה על בעלי המניות · סף 20%",
pass:"עובר",fail:"נכשל",na:"לא רלוונטי",exempt:"עובר בחריגה",near:"קרוב לסף",
exA:"חריגת השקעה אסטרטגית",exB:"רווחיות נמוכה מבחירה",exC:"מודל מחזור גבוה",
vPass:"✅ עוברת את מסננת האיכות",vExempt:"✅ עוברת — עם חריגה",vFail:"❌ נפסלה — {n} מדדים נכשלו",vGrey:"❓ אזור אפור — אין מספיק נתונים",
yearsL:"מבוסס על {n} שנים ({a}–{b})",noInterest:"אין הוצאות ריבית",
evT:"📅 אירועים קרובים",nextEarn:"דוח רבעוני הבא",exDiv:"יום אקס-דיבידנד",inDays:"בעוד {n} ימים",today:"היום",passed:"עבר",
filingsT:"📑 דיווחים אחרונים לרשות ני\"ע האמריקאית (SEC)",noSec:"אין דיווחי SEC לסימול זה (חברה שאינה מדווחת בארה\"ב)",openDoc:"פתח ↗",evNote:"מקור: SEC EDGAR — המאגר הרשמי של רשות ניירות הערך האמריקאית.",
f8K:"דיווח מיידי",f10K:"דוח שנתי",f10Q:"דוח רבעוני",f20F:"דוח שנתי (חברה זרה)",f40F:"דוח שנתי (קנדה)",f6K:"דיווח שוטף (חברה זרה)",fDEF:"זימון לאסיפת בעלי מניות",fS1:"תשקיף הנפקה",f13:"דיווח בעל מניות מהותי",
i101:"הסכם מהותי",i102:"סיום הסכם מהותי",i103:"פשיטת רגל / כינוס",i201:"רכישה או מכירת נכסים",i202:"תוצאות כספיות",i203:"התחייבות פיננסית חדשה",i205:"התייעלות / קיצוצים",i206:"מחיקת נכסים",i301:"אזהרת מחיקה מהמסחר",i302:"הנפקת מניות פרטית",i401:"החלפת רואה חשבון",i402:"תיקון דוחות קודמים",i502:"שינוי בהנהלה / דירקטוריון",i503:"שינוי תקנון",i507:"תוצאות הצבעה באסיפה",i701:"גילוי לציבור",i801:"אירוע אחר",
mastersT:"🎩 ועדת 4 המאסטרים",mBiz:"מודל עסקי וחפיר",mFin:"פיננסים ושווי",mInv:"היפוך — איך זה נכשל",mLong:"ודאות ל-10 שנים",avgStars:"ציון משוקלל",
infoGradeT:"רמת מידע",gradeA:"A — מידע רב (להיזהר מקונצנזוס)",gradeB:"B — מידע חלקי",gradeC:"C — מידע דל",vetoT:"⛔ דגלים אדומים"},
en:{tabTech:"Technical",tabQuality:"Quality",tabEvents:"Events",
techT:"📐 Composite Technical Signal",sigStrongBuy:"Strong Bullish",sigBuy:"Bullish",sigNeutral:"Neutral",sigSell:"Bearish",sigStrongSell:"Strong Bearish",
dimTrend:"Trend",dimMom:"Momentum",dimVol:"Money Flow",up:"Up",down:"Down",flat:"Sideways",
adxStrong:"Strong trend",adxWeak:"Weak trend",rsiOver:"Overbought",rsiUnder:"Oversold",rsiNormal:"Normal range",obvUp:"Money flowing in",obvDown:"Money flowing out",
indRSI:"RSI (14)",indADX:"ADX (14)",indBB:"Bollinger position",indMA50:"vs 50-day MA",indMA200:"vs 200-day MA",indVolR:"Volume vs average",indCross:"MA 50/200",
golden:"Golden cross ✦",death:"Death cross",goldenRecent:"Fresh golden cross!",deathRecent:"Fresh death cross!",
volT:"🌊 Volatility",hvL:"Annualized volatility",hvPct:"Rank vs past year",volLow:"Low — often precedes a sharp move",volHigh:"High — nervous market",volMid:"Normal",
candleT:"🕯️ Candlestick patterns (last 5 days)",noCandles:"No notable patterns detected",
hammer:"Hammer",invHammer:"Inverted Hammer",shootingStar:"Shooting Star",doji:"Doji",spinningTop:"Spinning Top",bullEngulf:"Bullish Engulfing",bearEngulf:"Bearish Engulfing",bullHarami:"Bullish Harami",bearHarami:"Bearish Harami",piercing:"Piercing Line",darkCloud:"Dark Cloud Cover",morningStar:"Morning Star",eveningStar:"Evening Star",threeSoldiers:"Three White Soldiers",threeCrows:"Three Black Crows",
bull:"Bullish",bear:"Bearish",neutral:"Neutral",
seasonT:"🗓️ Seasonality (5 years)",seasonNote:"Average return by month · current month highlighted",bestM:"Strongest month",worstM:"Weakest month",
months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
techNote:"Computed automatically from daily trading data (EMA, ADX, RSI, Bollinger, OBV). Technical indicators describe the past and do not guarantee the future.",
qualT:"🏅 Quality Test — 7 Metrics",qualNote:"A filter designed to exclude companies that are not first-class — not a buy signal. Method: AI Berkshire.",
q1:"Average return on equity",q1d:"Capital efficiency · min 8%",q2:"Cumulative free cash flow",q2d:"Real cash · must be positive",q3:"Interest coverage",q3d:"EBIT/interest · min 2x",q4:"Gross margin",q4d:"Pricing power · min 15%",q5:"Earnings quality",q5d:"Cash flow/net income · min 0.7",q6:"Net margin",q6d:"Resilience · min 5%",q7:"Share dilution",q7d:"Shareholder protection · max 20%",
pass:"Pass",fail:"Fail",na:"N/A",exempt:"Pass (exempt)",near:"near threshold",
exA:"Strategic-investment exemption",exB:"Deliberate low-margin exemption",exC:"High-turnover model exemption",
vPass:"✅ Passes the quality filter",vExempt:"✅ Passes — with exemption",vFail:"❌ Excluded — {n} metrics failed",vGrey:"❓ Grey zone — not enough data",
yearsL:"Based on {n} years ({a}–{b})",noInterest:"No interest expense",
evT:"📅 Upcoming events",nextEarn:"Next earnings report",exDiv:"Ex-dividend date",inDays:"in {n} days",today:"Today",passed:"Passed",
filingsT:"📑 Recent SEC filings",noSec:"No SEC filings for this symbol (not a US filer)",openDoc:"Open ↗",evNote:"Source: SEC EDGAR — the official database of the U.S. Securities and Exchange Commission.",
f8K:"Current report",f10K:"Annual report",f10Q:"Quarterly report",f20F:"Annual report (foreign)",f40F:"Annual report (Canada)",f6K:"Current report (foreign)",fDEF:"Shareholder meeting proxy",fS1:"IPO prospectus",f13:"Major shareholder filing",
i101:"Material agreement",i102:"Agreement terminated",i103:"Bankruptcy / receivership",i201:"Acquisition or disposition",i202:"Financial results",i203:"New financial obligation",i205:"Restructuring / layoffs",i206:"Asset impairment",i301:"Delisting notice",i302:"Private share sale",i401:"Auditor change",i402:"Prior financials restated",i502:"Management / board change",i503:"Bylaws amendment",i507:"Shareholder vote results",i701:"Regulation FD disclosure",i801:"Other event",
mastersT:"🎩 The 4-Masters Committee",mBiz:"Business model & moat",mFin:"Financials & value",mInv:"Inversion — how it fails",mLong:"10-year certainty",avgStars:"Weighted score",
infoGradeT:"Information level",gradeA:"A — abundant (beware consensus)",gradeB:"B — partial",gradeC:"C — scarce",vetoT:"⛔ Red flags"},
ru:{tabTech:"Техника",tabQuality:"Качество",tabEvents:"События",
techT:"📐 Сводный технический сигнал",sigStrongBuy:"Сильно бычий",sigBuy:"Бычий",sigNeutral:"Нейтральный",sigSell:"Медвежий",sigStrongSell:"Сильно медвежий",
dimTrend:"Тренд",dimMom:"Импульс",dimVol:"Денежный поток",up:"Вверх",down:"Вниз",flat:"Боковик",
adxStrong:"Сильный тренд",adxWeak:"Слабый тренд",rsiOver:"Перекупленность",rsiUnder:"Перепроданность",rsiNormal:"Норма",obvUp:"Деньги входят",obvDown:"Деньги уходят",
indRSI:"RSI (14)",indADX:"ADX (14)",indBB:"Позиция в Боллинджере",indMA50:"К MA 50",indMA200:"К MA 200",indVolR:"Объём к среднему",indCross:"MA 50/200",
golden:"Золотой крест ✦",death:"Крест смерти",goldenRecent:"Свежий золотой крест!",deathRecent:"Свежий крест смерти!",
volT:"🌊 Волатильность",hvL:"Годовая волатильность",hvPct:"Ранг за год",volLow:"Низкая — часто перед резким движением",volHigh:"Высокая — нервный рынок",volMid:"Обычная",
candleT:"🕯️ Свечные модели (5 дней)",noCandles:"Заметных моделей не найдено",
hammer:"Молот",invHammer:"Перевёрнутый молот",shootingStar:"Падающая звезда",doji:"Доджи",spinningTop:"Волчок",bullEngulf:"Бычье поглощение",bearEngulf:"Медвежье поглощение",bullHarami:"Бычий харами",bearHarami:"Медвежий харами",piercing:"Просвет в облаках",darkCloud:"Завеса тёмных облаков",morningStar:"Утренняя звезда",eveningStar:"Вечерняя звезда",threeSoldiers:"Три белых солдата",threeCrows:"Три чёрные вороны",
bull:"Бычья",bear:"Медвежья",neutral:"Нейтральная",
seasonT:"🗓️ Сезонность (5 лет)",seasonNote:"Средняя доходность по месяцам · текущий месяц выделен",bestM:"Лучший месяц",worstM:"Худший месяц",
months:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],
techNote:"Автоматический расчёт по дневным данным (EMA, ADX, RSI, Боллинджер, OBV). Технические индикаторы описывают прошлое и не гарантируют будущее.",
qualT:"🏅 Тест качества — 7 показателей",qualNote:"Фильтр для отсева компаний не первого класса — не сигнал к покупке. Метод: AI Berkshire.",
q1:"Средняя рентабельность капитала",q1d:"Эффективность капитала · мин. 8%",q2:"Накопленный свободный поток",q2d:"Реальные деньги · должен быть > 0",q3:"Покрытие процентов",q3d:"EBIT/проценты · мин. 2x",q4:"Валовая маржа",q4d:"Ценовая сила · мин. 15%",q5:"Качество прибыли",q5d:"Поток/чистая прибыль · мин. 0.7",q6:"Чистая маржа",q6d:"Устойчивость · мин. 5%",q7:"Размытие акций",q7d:"Защита акционеров · макс. 20%",
pass:"Пройден",fail:"Не пройден",na:"Н/П",exempt:"Пройден (исключение)",near:"близко к порогу",
exA:"Исключение: стратегические инвестиции",exB:"Исключение: осознанно низкая маржа",exC:"Исключение: модель высокой оборачиваемости",
vPass:"✅ Проходит фильтр качества",vExempt:"✅ Проходит — с исключением",vFail:"❌ Отсеяна — не пройдено: {n}",vGrey:"❓ Серая зона — мало данных",
yearsL:"На основе {n} лет ({a}–{b})",noInterest:"Нет процентных расходов",
evT:"📅 Ближайшие события",nextEarn:"Следующий отчёт",exDiv:"Экс-дивидендная дата",inDays:"через {n} дн.",today:"Сегодня",passed:"Прошло",
filingsT:"📑 Последние отчёты в SEC",noSec:"Нет отчётов SEC для этого тикера (не американский эмитент)",openDoc:"Открыть ↗",evNote:"Источник: SEC EDGAR — официальная база Комиссии по ценным бумагам США.",
f8K:"Текущий отчёт",f10K:"Годовой отчёт",f10Q:"Квартальный отчёт",f20F:"Годовой отчёт (иностр.)",f40F:"Годовой отчёт (Канада)",f6K:"Текущий отчёт (иностр.)",fDEF:"Созыв собрания акционеров",fS1:"Проспект IPO",f13:"Отчёт крупного акционера",
i101:"Существенное соглашение",i102:"Расторжение соглашения",i103:"Банкротство",i201:"Покупка или продажа активов",i202:"Финансовые результаты",i203:"Новое обязательство",i205:"Реструктуризация / сокращения",i206:"Обесценение активов",i301:"Уведомление о делистинге",i302:"Частное размещение акций",i401:"Смена аудитора",i402:"Пересмотр прошлой отчётности",i502:"Смена руководства / совета",i503:"Изменение устава",i507:"Итоги голосования",i701:"Публичное раскрытие",i801:"Другое событие",
mastersT:"🎩 Комитет 4 мастеров",mBiz:"Бизнес-модель и ров",mFin:"Финансы и оценка",mInv:"Инверсия — как это провалится",mLong:"Уверенность на 10 лет",avgStars:"Итоговая оценка",
infoGradeT:"Уровень информации",gradeA:"A — много (осторожно с консенсусом)",gradeB:"B — частично",gradeC:"C — мало",vetoT:"⛔ Красные флаги"},
es:{tabTech:"Técnico",tabQuality:"Calidad",tabEvents:"Eventos",
techT:"📐 Señal técnica combinada",sigStrongBuy:"Muy alcista",sigBuy:"Alcista",sigNeutral:"Neutral",sigSell:"Bajista",sigStrongSell:"Muy bajista",
dimTrend:"Tendencia",dimMom:"Impulso",dimVol:"Flujo de dinero",up:"Alza",down:"Baja",flat:"Lateral",
adxStrong:"Tendencia fuerte",adxWeak:"Tendencia débil",rsiOver:"Sobrecompra",rsiUnder:"Sobreventa",rsiNormal:"Rango normal",obvUp:"Entra dinero",obvDown:"Sale dinero",
indRSI:"RSI (14)",indADX:"ADX (14)",indBB:"Posición Bollinger",indMA50:"vs MA 50",indMA200:"vs MA 200",indVolR:"Volumen vs promedio",indCross:"MA 50/200",
golden:"Cruce dorado ✦",death:"Cruce de la muerte",goldenRecent:"¡Cruce dorado reciente!",deathRecent:"¡Cruce de la muerte reciente!",
volT:"🌊 Volatilidad",hvL:"Volatilidad anual",hvPct:"Rango vs último año",volLow:"Baja — suele preceder un movimiento fuerte",volHigh:"Alta — mercado nervioso",volMid:"Normal",
candleT:"🕯️ Patrones de velas (5 días)",noCandles:"No se detectaron patrones relevantes",
hammer:"Martillo",invHammer:"Martillo invertido",shootingStar:"Estrella fugaz",doji:"Doji",spinningTop:"Peonza",bullEngulf:"Envolvente alcista",bearEngulf:"Envolvente bajista",bullHarami:"Harami alcista",bearHarami:"Harami bajista",piercing:"Línea penetrante",darkCloud:"Nube oscura",morningStar:"Estrella de la mañana",eveningStar:"Estrella del atardecer",threeSoldiers:"Tres soldados blancos",threeCrows:"Tres cuervos negros",
bull:"Alcista",bear:"Bajista",neutral:"Neutral",
seasonT:"🗓️ Estacionalidad (5 años)",seasonNote:"Rentabilidad media por mes · mes actual resaltado",bestM:"Mejor mes",worstM:"Peor mes",
months:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
techNote:"Cálculo automático con datos diarios (EMA, ADX, RSI, Bollinger, OBV). Los indicadores técnicos describen el pasado y no garantizan el futuro.",
qualT:"🏅 Test de calidad — 7 métricas",qualNote:"Un filtro para descartar empresas que no son de primera — no es señal de compra. Método: AI Berkshire.",
q1:"ROE promedio",q1d:"Eficiencia del capital · mín. 8%",q2:"Flujo libre acumulado",q2d:"Dinero real · debe ser positivo",q3:"Cobertura de intereses",q3d:"EBIT/intereses · mín. 2x",q4:"Margen bruto",q4d:"Poder de precios · mín. 15%",q5:"Calidad del beneficio",q5d:"Flujo/beneficio neto · mín. 0.7",q6:"Margen neto",q6d:"Resiliencia · mín. 5%",q7:"Dilución de acciones",q7d:"Protección del accionista · máx. 20%",
pass:"Aprueba",fail:"Falla",na:"N/A",exempt:"Aprueba (exención)",near:"cerca del umbral",
exA:"Exención de inversión estratégica",exB:"Exención de margen bajo deliberado",exC:"Exención de alta rotación",
vPass:"✅ Supera el filtro de calidad",vExempt:"✅ Supera — con exención",vFail:"❌ Descartada — {n} métricas fallan",vGrey:"❓ Zona gris — faltan datos",
yearsL:"Basado en {n} años ({a}–{b})",noInterest:"Sin gastos por intereses",
evT:"📅 Próximos eventos",nextEarn:"Próximo informe",exDiv:"Fecha ex-dividendo",inDays:"en {n} días",today:"Hoy",passed:"Pasado",
filingsT:"📑 Presentaciones recientes ante la SEC",noSec:"Sin presentaciones SEC para este símbolo (no reporta en EE. UU.)",openDoc:"Abrir ↗",evNote:"Fuente: SEC EDGAR — la base de datos oficial de la SEC de EE. UU.",
f8K:"Informe inmediato",f10K:"Informe anual",f10Q:"Informe trimestral",f20F:"Informe anual (extranjera)",f40F:"Informe anual (Canadá)",f6K:"Informe corriente (extranjera)",fDEF:"Convocatoria de junta",fS1:"Folleto de salida a bolsa",f13:"Informe de accionista mayor",
i101:"Acuerdo material",i102:"Fin de acuerdo",i103:"Quiebra",i201:"Adquisición o venta de activos",i202:"Resultados financieros",i203:"Nueva obligación financiera",i205:"Reestructuración / despidos",i206:"Deterioro de activos",i301:"Aviso de exclusión de bolsa",i302:"Venta privada de acciones",i401:"Cambio de auditor",i402:"Reexpresión de estados previos",i502:"Cambio en dirección / consejo",i503:"Cambio de estatutos",i507:"Resultados de votación",i701:"Divulgación pública",i801:"Otro evento",
mastersT:"🎩 Comité de los 4 maestros",mBiz:"Modelo de negocio y foso",mFin:"Finanzas y valoración",mInv:"Inversión — cómo fracasa",mLong:"Certeza a 10 años",avgStars:"Puntuación ponderada",
infoGradeT:"Nivel de información",gradeA:"A — abundante (cuidado con el consenso)",gradeB:"B — parcial",gradeC:"C — escasa",vetoT:"⛔ Banderas rojas"},
ar:{tabTech:"فني",tabQuality:"الجودة",tabEvents:"الأحداث",
techT:"📐 الإشارة الفنية المركبة",sigStrongBuy:"إيجابي قوي",sigBuy:"إيجابي",sigNeutral:"محايد",sigSell:"سلبي",sigStrongSell:"سلبي قوي",
dimTrend:"الاتجاه",dimMom:"الزخم",dimVol:"تدفق الأموال",up:"صاعد",down:"هابط",flat:"عرضي",
adxStrong:"اتجاه قوي",adxWeak:"اتجاه ضعيف",rsiOver:"تشبع شرائي",rsiUnder:"تشبع بيعي",rsiNormal:"نطاق طبيعي",obvUp:"أموال تدخل",obvDown:"أموال تخرج",
indRSI:"RSI (14)",indADX:"ADX (14)",indBB:"الموقع في بولينجر",indMA50:"مقابل متوسط 50",indMA200:"مقابل متوسط 200",indVolR:"الحجم مقابل المتوسط",indCross:"متوسطات 50/200",
golden:"التقاطع الذهبي ✦",death:"تقاطع الموت",goldenRecent:"تقاطع ذهبي حديث!",deathRecent:"تقاطع موت حديث!",
volT:"🌊 التقلب",hvL:"التقلب السنوي",hvPct:"الترتيب مقابل العام",volLow:"منخفض — غالباً يسبق حركة حادة",volHigh:"مرتفع — سوق متوتر",volMid:"عادي",
candleT:"🕯️ أنماط الشموع (آخر 5 أيام)",noCandles:"لم تُكتشف أنماط بارزة",
hammer:"المطرقة",invHammer:"المطرقة المقلوبة",shootingStar:"الشهاب",doji:"دوجي",spinningTop:"الخذروف",bullEngulf:"الابتلاع الصاعد",bearEngulf:"الابتلاع الهابط",bullHarami:"هارامي صاعد",bearHarami:"هارامي هابط",piercing:"الخط الثاقب",darkCloud:"الغيمة الداكنة",morningStar:"نجمة الصباح",eveningStar:"نجمة المساء",threeSoldiers:"الجنود البيض الثلاثة",threeCrows:"الغربان السود الثلاثة",
bull:"صاعد",bear:"هابط",neutral:"محايد",
seasonT:"🗓️ الموسمية (5 سنوات)",seasonNote:"متوسط العائد حسب الشهر · الشهر الحالي مميز",bestM:"أقوى شهر",worstM:"أضعف شهر",
months:["ينا","فبر","مار","أبر","ماي","يون","يول","أغس","سبت","أكت","نوف","ديس"],
techNote:"حساب تلقائي من بيانات التداول اليومية (EMA، ADX، RSI، بولينجر، OBV). المؤشرات الفنية تصف الماضي ولا تضمن المستقبل.",
qualT:"🏅 اختبار الجودة — 7 مؤشرات",qualNote:"مرشّح لاستبعاد الشركات غير الممتازة — وليس إشارة شراء. المنهجية: AI Berkshire.",
q1:"متوسط العائد على حقوق الملكية",q1d:"كفاءة رأس المال · حد 8%",q2:"التدفق النقدي الحر التراكمي",q2d:"نقد حقيقي · يجب أن يكون موجباً",q3:"تغطية الفوائد",q3d:"الربح التشغيلي/الفوائد · حد 2x",q4:"هامش الربح الإجمالي",q4d:"قوة التسعير · حد 15%",q5:"جودة الأرباح",q5d:"التدفق/صافي الربح · حد 0.7",q6:"هامش صافي الربح",q6d:"المتانة · حد 5%",q7:"تخفيف الأسهم",q7d:"حماية المساهمين · حد 20%",
pass:"ناجح",fail:"راسب",na:"غير منطبق",exempt:"ناجح (استثناء)",near:"قريب من الحد",
exA:"استثناء الاستثمار الاستراتيجي",exB:"استثناء الهامش المنخفض المتعمد",exC:"استثناء نموذج الدوران العالي",
vPass:"✅ تجتاز مرشّح الجودة",vExempt:"✅ تجتاز — مع استثناء",vFail:"❌ مستبعدة — رسبت في {n} مؤشرات",vGrey:"❓ منطقة رمادية — بيانات غير كافية",
yearsL:"مبني على {n} سنوات ({a}–{b})",noInterest:"لا توجد مصاريف فوائد",
evT:"📅 الأحداث القادمة",nextEarn:"التقرير الفصلي القادم",exDiv:"تاريخ استحقاق التوزيعات",inDays:"بعد {n} أيام",today:"اليوم",passed:"مضى",
filingsT:"📑 أحدث الإفصاحات لدى SEC",noSec:"لا إفصاحات SEC لهذا الرمز (شركة غير مُدرجة الإفصاح في أمريكا)",openDoc:"فتح ↗",evNote:"المصدر: SEC EDGAR — قاعدة البيانات الرسمية لهيئة الأوراق المالية الأمريكية.",
f8K:"إفصاح فوري",f10K:"تقرير سنوي",f10Q:"تقرير فصلي",f20F:"تقرير سنوي (شركة أجنبية)",f40F:"تقرير سنوي (كندا)",f6K:"إفصاح جارٍ (شركة أجنبية)",fDEF:"دعوة لاجتماع المساهمين",fS1:"نشرة الاكتتاب",f13:"إفصاح مساهم رئيسي",
i101:"اتفاقية جوهرية",i102:"إنهاء اتفاقية",i103:"إفلاس / حراسة قضائية",i201:"استحواذ أو بيع أصول",i202:"النتائج المالية",i203:"التزام مالي جديد",i205:"إعادة هيكلة / تسريحات",i206:"انخفاض قيمة الأصول",i301:"إشعار شطب من التداول",i302:"بيع أسهم خاص",i401:"تغيير المدقق",i402:"إعادة إصدار قوائم سابقة",i502:"تغيير في الإدارة / المجلس",i503:"تعديل النظام الأساسي",i507:"نتائج تصويت المساهمين",i701:"إفصاح عام",i801:"حدث آخر",
mastersT:"🎩 لجنة الأساتذة الأربعة",mBiz:"نموذج العمل والخندق",mFin:"المالية والتقييم",mInv:"العكس — كيف تفشل",mLong:"اليقين لـ10 سنوات",avgStars:"التقييم المرجّح",
infoGradeT:"مستوى المعلومات",gradeA:"A — وفيرة (احذر الإجماع)",gradeB:"B — جزئية",gradeC:"C — شحيحة",vetoT:"⛔ علامات حمراء"}
};
function PT(k){var l=P1_T[curLang]||P1_T.en;return (l[k]!=null)?l[k]:(P1_T.en[k]!=null?P1_T.en[k]:P3(k));}
function PTf(k,o){var s=PT(k);for(var x in o)s=s.split('{'+x+'}').join(o[x]);return s;}

/* ── Math helpers ── */
function _ema(a,p){var k=2/(p+1),o=[],v=null;for(var i=0;i<a.length;i++){v=(v==null)?a[i]:a[i]*k+v*(1-k);o.push(v);}return o;}
function _sma(a,p){var o=[],s=0;for(var i=0;i<a.length;i++){s+=a[i];if(i>=p)s-=a[i-p];o.push(i>=p-1?s/p:null);}return o;}
function _wild(a,p){var o=[],v=null;for(var i=0;i<a.length;i++){v=(v==null)?a[i]:v+(a[i]-v)/p;o.push(v);}return o;}
function _last(a){for(var i=a.length-1;i>=0;i--)if(a[i]!=null&&!isNaN(a[i]))return a[i];return null;}
function _curSym(c){return c==='ILS'?'₪':c==='EUR'?'€':c==='GBP'?'£':'$';}
function _r2(x){return x==null?null:Math.round(x*100)/100;}

/* ══ TECHNICAL ENGINE (Vibe-Trading technical-basic, ported to JS) ══ */
function computeTechnical(ohlc){
  if(!ohlc||ohlc.length<60)return null;
  var o=ohlc.map(function(x){return x[1];}),h=ohlc.map(function(x){return x[2];}),l=ohlc.map(function(x){return x[3];}),c=ohlc.map(function(x){return x[4];}),v=ohlc.map(function(x){return x[5]||0;});
  var n=c.length,last=c[n-1];
  // Trend: EMA 12/26 + ADX 14 (Wilder)
  var e12=_ema(c,12),e26=_ema(c,26);
  var pdm=[0],mdm=[0],tr=[h[0]-l[0]];
  for(var i=1;i<n;i++){var up=h[i]-h[i-1],dn=l[i-1]-l[i];pdm.push(up>dn&&up>0?up:0);mdm.push(dn>up&&dn>0?dn:0);tr.push(Math.max(h[i]-l[i],Math.abs(h[i]-c[i-1]),Math.abs(l[i]-c[i-1])));}
  var atr=_wild(tr,14),sp=_wild(pdm,14),sm=_wild(mdm,14),dx=[];
  for(i=0;i<n;i++){var pdi=atr[i]?100*sp[i]/atr[i]:0,mdi=atr[i]?100*sm[i]/atr[i]:0;dx.push((pdi+mdi)?100*Math.abs(pdi-mdi)/(pdi+mdi):0);}
  var adx=_last(_wild(dx,14));
  // RSI 14 (Wilder)
  var g=[0],ls=[0];for(i=1;i<n;i++){var d=c[i]-c[i-1];g.push(Math.max(d,0));ls.push(Math.max(-d,0));}
  var ag=_last(_wild(g,14)),al=_last(_wild(ls,14));var rsi=al===0?100:100-100/(1+ag/al);
  // Bollinger 20,2
  var win=c.slice(-20),mean=win.reduce(function(s,x){return s+x;},0)/20;
  var sd=Math.sqrt(win.reduce(function(s,x){return s+(x-mean)*(x-mean);},0)/20);
  var bbU=mean+2*sd,bbL=mean-2*sd,pctB=(bbU-bbL)?(last-bbL)/(bbU-bbL):0.5;
  // OBV + volume ratio
  var obv=[0];for(i=1;i<n;i++)obv.push(obv[i-1]+(c[i]>c[i-1]?v[i]:c[i]<c[i-1]?-v[i]:0));
  var obvSma=_last(_sma(obv,20)),obvUp=obv[n-1]>obvSma;
  var avgV=v.slice(-21,-1).reduce(function(s,x){return s+x;},0)/20,volRatio=avgV?v[n-1]/avgV:null;
  // MA 50/200 + crosses
  var s50=_sma(c,50),s200=n>=200?_sma(c,200):null,ma50=_last(s50),ma200=s200?_last(s200):null;
  var cross=null,crossRecent=false;
  if(s200){cross=ma50>ma200?'golden':'death';for(i=n-20;i<n;i++){if(i>0&&s200[i-1]!=null&&s50[i-1]!=null&&((s50[i-1]<=s200[i-1])!==(s50[i]<=s200[i]))){crossRecent=true;}}}
  // Voting
  var trendBull=_last(e12)>_last(e26),strong=adx>25;
  var trendS=(trendBull?1:-1)*(strong?1:0.5);
  var momS=rsi>70?-1:rsi<30?1:(rsi>55?0.25:rsi<45?-0.25:0);
  var flowS=obvUp?0.75:-0.75;
  var maS=ma200!=null?(last>ma200?0.5:-0.5):0;
  var score=trendS+momS+flowS+maS;
  var label=score>=2?'sigStrongBuy':score>=0.75?'sigBuy':score>-0.75?'sigNeutral':score>-2?'sigSell':'sigStrongSell';
  // Volatility (HV20 annualized + percentile)
  var rets=[];for(i=1;i<n;i++)rets.push(Math.log(c[i]/c[i-1]));
  var hv=[];for(i=19;i<rets.length;i++){var w=rets.slice(i-19,i+1),m=w.reduce(function(s,x){return s+x;},0)/20;hv.push(Math.sqrt(w.reduce(function(s,x){return s+(x-m)*(x-m);},0)/19)*Math.sqrt(252)*100);}
  var hvNow=hv[hv.length-1],hvWin=hv.slice(-120),hvPct=Math.round(hvWin.filter(function(x){return x<=hvNow;}).length/hvWin.length*100);
  return {score:_r2(score),label:label,trendBull:trendBull,adx:_r2(adx),adxStrong:strong,rsi:_r2(rsi),pctB:_r2(pctB),obvUp:obvUp,volRatio:_r2(volRatio),
    ma50:_r2(ma50),ma200:_r2(ma200),last:last,cross:cross,crossRecent:crossRecent,hv:_r2(hvNow),hvPct:hvPct,candles:detectCandles(ohlc)};
}

/* ══ CANDLESTICK PATTERNS — 15 patterns (Vibe-Trading candlestick, ported) ══ */
function detectCandles(ohlc){
  var n=ohlc.length,found=[];
  var bodies=ohlc.slice(-15).map(function(x){return Math.abs(x[4]-x[1]);}),avgBody=bodies.reduce(function(s,x){return s+x;},0)/bodies.length||1e-9;
  function C(i){var x=ohlc[i];var o=x[1],h=x[2],l=x[3],c=x[4];return {o:o,h:h,l:l,c:c,body:Math.abs(c-o),rng:(h-l)||1e-9,up:h-Math.max(o,c),lo:Math.min(o,c)-l,bull:c>o,bear:c<o,mid:(o+c)/2,t:x[0]};}
  for(var i=Math.max(3,n-5);i<n;i++){
    var a=C(i),b=C(i-1),z=C(i-2),downT=ohlc[i-1][4]<ohlc[Math.max(0,i-5)][4],upT=!downT,pats=[];
    if(a.body<=0.1*a.rng)pats.push(['doji','neutral']);
    else if(a.body<=0.3*a.rng&&a.up>a.body&&a.lo>a.body)pats.push(['spinningTop','neutral']);
    if(a.body>0&&a.lo>=2*a.body&&a.up<=0.5*a.body&&downT)pats.push(['hammer','bull']);
    if(a.body>0&&a.up>=2*a.body&&a.lo<=0.5*a.body&&downT)pats.push(['invHammer','bull']);
    if(a.body>0&&a.up>=2*a.body&&a.lo<=0.5*a.body&&upT)pats.push(['shootingStar','bear']);
    if(b.bear&&a.bull&&a.o<=b.c&&a.c>=b.o&&a.body>b.body)pats.push(['bullEngulf','bull']);
    if(b.bull&&a.bear&&a.o>=b.c&&a.c<=b.o&&a.body>b.body)pats.push(['bearEngulf','bear']);
    if(b.bear&&b.body>avgBody&&a.bull&&a.o>b.c&&a.c<b.o&&a.body<b.body*0.6)pats.push(['bullHarami','bull']);
    if(b.bull&&b.body>avgBody&&a.bear&&a.o<b.c&&a.c>b.o&&a.body<b.body*0.6)pats.push(['bearHarami','bear']);
    if(b.bear&&a.bull&&a.o<b.c&&a.c>b.mid&&a.c<b.o)pats.push(['piercing','bull']);
    if(b.bull&&a.bear&&a.o>b.c&&a.c<b.mid&&a.c>b.o)pats.push(['darkCloud','bear']);
    if(z.bear&&z.body>avgBody&&b.body<z.body*0.4&&a.bull&&a.c>z.mid)pats.push(['morningStar','bull']);
    if(z.bull&&z.body>avgBody&&b.body<z.body*0.4&&a.bear&&a.c<z.mid)pats.push(['eveningStar','bear']);
    if(z.bull&&b.bull&&a.bull&&b.c>z.c&&a.c>b.c&&b.o>z.o&&b.o<z.c&&a.o>b.o&&a.o<b.c)pats.push(['threeSoldiers','bull']);
    if(z.bear&&b.bear&&a.bear&&b.c<z.c&&a.c<b.c&&b.o<z.o&&b.o>z.c&&a.o<b.o&&a.o>b.c)pats.push(['threeCrows','bear']);
    pats.forEach(function(p){found.push({key:p[0],dir:p[1],t:a.t});});
  }
  return found.reverse();
}

/* ══ SEASONALITY — ממוצע תשואה לפי חודש (Vibe-Trading seasonal) ══ */
function computeSeasonality(ohlcMonthly){
  if(!ohlcMonthly||ohlcMonthly.length<14)return null;
  var buckets=[];for(var m=0;m<12;m++)buckets.push([]);
  for(var i=1;i<ohlcMonthly.length;i++){var r=ohlcMonthly[i][4]/ohlcMonthly[i-1][4]-1;var mo=new Date(ohlcMonthly[i][0]*1000).getUTCMonth();buckets[mo].push(r*100);}
  var avg=buckets.map(function(b){return b.length?b.reduce(function(s,x){return s+x;},0)/b.length:null;});
  var win=buckets.map(function(b){return b.length?Math.round(b.filter(function(x){return x>0;}).length/b.length*100):null;});
  var best=0,worst=0;avg.forEach(function(v,i){if(v!=null&&(avg[best]==null||v>avg[best]))best=i;if(v!=null&&(avg[worst]==null||v<avg[worst]))worst=i;});
  return {avg:avg,win:win,best:best,worst:worst};
}

/* ── Render: Technical tab ── */
function sigColor(score){return score>=0.75?'var(--green)':score>-0.75?'var(--gold)':'var(--red)';}
async function loadTechnical(symbol){
  var el=document.getElementById('lvTech');if(!el)return;
  window.__techResult=null;
  try{
    var res=await Promise.all([
      workerFetch('action=chart&symbol='+encodeURIComponent(symbol)+'&range=2y&interval=1d'),
      workerFetch('action=chart&symbol='+encodeURIComponent(symbol)+'&range=5y&interval=1mo').catch(function(){return null;})
    ]);
    if(currentLiveSymbol!==symbol)return;
    var t=computeTechnical(res[0].ohlc),s=res[1]?computeSeasonality(res[1].ohlc):null;
    if(!t&&!s)return;
    window.__techResult={symbol:symbol,tech:t,season:s};
    window.__techOhlc={symbol:symbol,ohlc:res[0].ohlc};
    var h='';
    if(t){
      var col=sigColor(t.score);
      h+='<div class="rec-trend-title">'+PT('techT')+'</div>'
        +'<div class="ta-verdict" style="border-color:'+col+'"><div class="ta-verdict-lbl" style="color:'+col+'">'+PT(t.label)+'</div>'
        +'<div class="ta-meter"><div class="ta-meter-fill" style="width:'+Math.max(4,Math.min(100,(t.score+3.25)/6.5*100))+'%;background:'+col+'"></div></div></div>'
        +'<div class="ta-dims">'
        +taDim(PT('dimTrend'),(t.trendBull?PT('up'):PT('down'))+' · '+(t.adxStrong?PT('adxStrong'):PT('adxWeak')),t.trendBull)
        +taDim(PT('dimMom'),t.rsi>70?PT('rsiOver'):t.rsi<30?PT('rsiUnder'):PT('rsiNormal'),t.rsi<30?true:t.rsi>70?false:null)
        +taDim(PT('dimVol'),t.obvUp?PT('obvUp'):PT('obvDown'),t.obvUp)
        +'</div><div class="ta-grid">'
        +taCell(PT('indRSI'),t.rsi,t.rsi>70?'var(--red)':t.rsi<30?'var(--green)':null)
        +taCell(PT('indADX'),t.adx)
        +taCell(PT('indBB'),Math.round(t.pctB*100)+'%')
        +(t.ma50?taCell(PT('indMA50'),fmtPct((t.last/t.ma50-1)*100),t.last>=t.ma50?'var(--green)':'var(--red)'):'')
        +(t.ma200?taCell(PT('indMA200'),fmtPct((t.last/t.ma200-1)*100),t.last>=t.ma200?'var(--green)':'var(--red)'):'')
        +(t.volRatio!=null?taCell(PT('indVolR'),'×'+t.volRatio):'')
        +(t.cross?taCell(PT('indCross'),PT(t.crossRecent?(t.cross+'Recent'):t.cross),t.cross==='golden'?'var(--green)':'var(--red)'):'')
        +'</div>';
      // Volatility
      var vtxt=t.hvPct<=20?PT('volLow'):t.hvPct>=80?PT('volHigh'):PT('volMid');
      h+='<div class="rec-trend-title" style="margin-top:16px">'+PT('volT')+'</div>'
        +'<div class="ta-vol"><span>'+PT('hvL')+': <strong>'+t.hv+'%</strong></span><span>'+PT('hvPct')+': <strong>'+t.hvPct+'</strong>/100</span></div>'
        +'<div class="ta-meter"><div class="ta-meter-fill" style="width:'+t.hvPct+'%;background:var(--gold-dim)"></div></div>'
        +'<div class="ta-small">'+vtxt+'</div>';
      // Candles
      h+='<div class="rec-trend-title" style="margin-top:16px">'+PT('candleT')+'</div>';
      if(t.candles.length){
        h+='<div class="ta-chips">';
        t.candles.slice(0,6).forEach(function(p){
          var cc=p.dir==='bull'?'var(--green)':p.dir==='bear'?'var(--red)':'var(--text-dim)';
          var d=new Date(p.t*1000);
          h+='<span class="ta-chip" style="border-color:'+cc+';color:'+cc+'">'+PT(p.key)+' · '+PT(p.dir)+' <em>'+d.getDate()+'/'+(d.getMonth()+1)+'</em></span>';
        });
        h+='</div>';
      }else h+='<div class="ta-small">'+PT('noCandles')+'</div>';
    }
    // Seasonality
    if(s){
      var mx=0;s.avg.forEach(function(x){if(x!=null)mx=Math.max(mx,Math.abs(x));});
      var cur=new Date().getMonth(),bars='';
      s.avg.forEach(function(x,i){
        var hgt=x==null?0:Math.max(3,Math.round(Math.abs(x)/(mx||1)*34));
        var colr=x==null?'var(--border)':x>=0?'var(--green)':'var(--red)';
        bars+='<div class="ssn-col'+(i===cur?' ssn-cur':'')+'" title="'+(x!=null?x.toFixed(1)+'% · '+s.win[i]+'%↑':'')+'">'
          +'<div class="ssn-top">'+(x!=null&&x>=0?'<div class="ssn-bar" style="height:'+hgt+'px;background:'+colr+'"></div>':'')+'</div>'
          +'<div class="ssn-bot">'+(x!=null&&x<0?'<div class="ssn-bar" style="height:'+hgt+'px;background:'+colr+'"></div>':'')+'</div>'
          +'<div class="ssn-lbl">'+PT('months')[i]+'</div></div>';
      });
      h+='<div class="rec-trend-title" style="margin-top:16px">'+PT('seasonT')+'</div><div class="ssn-wrap">'+bars+'</div>'
        +'<div class="ta-small">'+PT('seasonNote')+' · '+PT('bestM')+': <strong style="color:var(--green)">'+PT('months')[s.best]+' ('+fmtPct(s.avg[s.best])+')</strong> · '
        +PT('worstM')+': <strong style="color:var(--red)">'+PT('months')[s.worst]+' ('+fmtPct(s.avg[s.worst])+')</strong></div>';
    }
    h+='<div class="ta-note">'+PT('techNote')+'</div>';
    el.innerHTML=h;
    renderLiveTabs();applyLiveTabs();
  }catch(e){/* technical tab is optional */}
}
function taDim(lbl,val,pos){var c=pos===true?'var(--green)':pos===false?'var(--red)':'var(--gold)';return '<div class="ta-dim"><div class="ta-dim-lbl">'+lbl+'</div><div class="ta-dim-val" style="color:'+c+'">'+val+'</div></div>';}
function taCell(lbl,val,col){return '<div class="ta-cell"><div class="live-metric-lbl">'+lbl+'</div><div class="live-metric-val"'+(col?' style="color:'+col+'"':'')+'>'+val+'</div></div>';}

/* ══ QUALITY SCREEN — 7 metrics + 3 exemptions (AI Berkshire quality-screen) ══ */
function computeQuality(years,q){
  // מסננים שנים חלקיות (יאהו מחזיר לפעמים שנה עם שדה אחד בלבד)
  years=(years||[]).filter(function(y){return Object.keys(y).length>=4;});
  if(!years.length)return null;
  var ys=years.slice(-5);
  function avg(arr){var a=arr.filter(function(x){return x!=null&&isFinite(x);});return a.length?a.reduce(function(s,x){return s+x;},0)/a.length:null;}
  var isFin=q&&/financial/i.test(q.sector||'');
  var roe=avg(ys.map(function(y){return (y.netIncome!=null&&y.equity>0)?y.netIncome/y.equity:null;}));
  var fcfArr=ys.map(function(y){return y.fcf!=null?y.fcf:(y.ocf!=null&&y.capex!=null?y.ocf+y.capex:null);}).filter(function(x){return x!=null;});
  var fcfSum=fcfArr.length?fcfArr.reduce(function(s,x){return s+x;},0):null;
  var lastY=ys[ys.length-1],cov=null,noInt=false;
  // השנה האחרונה שיש בה גם רווח תפעולי וגם ריבית — חוסר דיווח אינו "אין ריבית"
  var anyIE=years.some(function(y){return y.interestExpense!=null;}),anyEB=ys.some(function(y){return y.ebit!=null;});
  for(var i=years.length-1;i>=0;i--){var yy=years[i];if(yy.ebit!=null&&yy.interestExpense!=null){cov=Math.abs(yy.interestExpense)<1?null:yy.ebit/Math.abs(yy.interestExpense);if(cov==null)noInt=true;break;}}
  if(cov==null&&!noInt&&anyEB&&!anyIE)noInt=true;
  var gm=avg(ys.map(function(y){return (y.grossProfit!=null&&y.revenue)?y.grossProfit/y.revenue:null;}));
  var ocfni=avg(ys.map(function(y){return (y.ocf!=null&&y.netIncome>0)?y.ocf/y.netIncome:null;}));
  var nmArr=ys.map(function(y){return (y.netIncome!=null&&y.revenue)?y.netIncome/y.revenue:null;});
  var nm=avg(nmArr);
  var sh=years.map(function(y){return y.shares||y.dilutedShares||null;}).filter(function(x){return x;});
  var dil=sh.length>=2?sh[sh.length-1]/sh[0]-1:null;
  function st(val,thr,higherGood){if(val==null)return 'na';var ok=higherGood?val>=thr:val<=thr;return ok?'pass':'fail';}
  function nearT(val,thr){return val!=null&&thr!==0&&Math.abs(val-thr)/Math.abs(thr)<0.1;}
  var m=[
    {k:'q1',v:roe,s:st(roe,0.08,true),near:nearT(roe,0.08),fmt:roe!=null?(roe*100).toFixed(1)+'%':'—'},
    {k:'q2',v:fcfSum,s:fcfSum==null?'na':(fcfSum>0?'pass':'fail'),fmt:fcfSum!=null?(fcfSum<0?'-':'')+_curSym(q&&q.currency)+fmtNum(Math.abs(fcfSum)):'—'},
    {k:'q3',v:cov,s:isFin?'na':noInt?'pass':st(cov,2,true),near:nearT(cov,2),fmt:isFin?'—':noInt?PT('noInterest'):cov!=null?cov.toFixed(1)+'x':'—'},
    {k:'q4',v:gm,s:isFin?'na':st(gm,0.15,true),near:nearT(gm,0.15),fmt:gm!=null?(gm*100).toFixed(1)+'%':'—'},
    {k:'q5',v:ocfni,s:ocfni==null?(ys.every(function(y){return !(y.netIncome>0);})?'fail':'na'):st(ocfni,0.7,true),near:nearT(ocfni,0.7),fmt:ocfni!=null?ocfni.toFixed(2):'—'},
    {k:'q6',v:nm,s:st(nm,0.05,true),near:nearT(nm,0.05),fmt:nm!=null?(nm*100).toFixed(1)+'%':'—'},
    {k:'q7',v:dil,s:st(dil,0.20,false),near:nearT(dil,0.20),fmt:dil!=null?fmtPct(dil*100):'—'}
  ];
  // Exemptions
  var ageY=q&&q.firstTradeDate?(Date.now()/1000-q.firstTradeDate)/31557600:99;
  var ocf2=ys.slice(-2).every(function(y){return y.ocf>0;});
  var lastNM=nmArr[nmArr.length-1],prevNM=nmArr[nmArr.length-2];
  if(m[0].s==='fail'&&ageY<10&&gm>0.30&&ocf2){m[0].s='exempt';m[0].ex='exA';}
  if(m[5].s==='fail'&&gm>0.30&&(lastNM>=0.05||(lastNM!=null&&prevNM!=null&&lastNM>prevNM))){m[5].s='exempt';m[5].ex='exB';}
  if(roe>0.20&&ocfni>1.0){[3,5].forEach(function(ix){if(m[ix].s==='fail'){m[ix].s='exempt';m[ix].ex='exC';}});}
  var fails=m.filter(function(x){return x.s==='fail';}).length,nas=m.filter(function(x){return x.s==='na';}).length,exs=m.filter(function(x){return x.s==='exempt';}).length;
  var verdict=(years.length<3||nas>=3)?'grey':fails>0?'fail':exs>0?'exempt':'pass';
  var epsA=years.filter(function(y){return y.netIncome>0&&(y.shares||y.dilutedShares);}).map(function(y){return y.netIncome/(y.dilutedShares||y.shares);});
  var epsCagr=epsA.length>=3?Math.pow(epsA[epsA.length-1]/epsA[0],1/(epsA.length-1))-1:null;
  return {metrics:m,fails:fails,verdict:verdict,span:[years[0].year,years[years.length-1].year],n:years.length,epsCagr:epsCagr};
}
async function loadQuality(symbol,q){
  var el=document.getElementById('lvQuality');if(!el)return;
  window.__qualityResult=null;
  try{
    var d=await workerFetch('action=quality&symbol='+encodeURIComponent(symbol));
    if(currentLiveSymbol!==symbol)return;
    var r=computeQuality(d.years,q);if(!r)return;
    window.__qualityResult={symbol:symbol,res:r};
    try{renderValuation(symbol,q);}catch(e){}
    var vc=r.verdict==='fail'?'var(--red)':r.verdict==='grey'?'var(--gold)':'var(--green)';
    var vt=r.verdict==='pass'?PT('vPass'):r.verdict==='exempt'?PT('vExempt'):r.verdict==='fail'?PTf('vFail',{n:r.fails}):PT('vGrey');
    var h='<div class="rec-trend-title">'+PT('qualT')+'</div>'
      +'<div class="ta-verdict" style="border-color:'+vc+'"><div class="ta-verdict-lbl" style="color:'+vc+'">'+vt+'</div>'
      +'<div class="ta-small">'+PTf('yearsL',{n:r.n,a:r.span[0],b:r.span[1]})+'</div></div><div class="qs-list">';
    r.metrics.forEach(function(x){
      var ic=x.s==='pass'?'✅':x.s==='fail'?'❌':x.s==='exempt'?'🟢':'➖';
      var cc=x.s==='pass'||x.s==='exempt'?'var(--green)':x.s==='fail'?'var(--red)':'var(--text-muted)';
      h+='<div class="qs-row"><div class="qs-ic">'+ic+'</div><div class="qs-main"><div class="qs-name">'+PT(x.k)+'</div>'
        +'<div class="qs-desc">'+PT(x.k+'d')+(x.near&&x.s!=='na'?' · ⚠️ '+PT('near'):'')+(x.ex?' · '+PT(x.ex):'')+'</div></div>'
        +'<div class="qs-val" style="color:'+cc+'">'+x.fmt+'<div class="qs-st">'+PT(x.s)+'</div></div></div>';
    });
    h+='</div><div class="ta-note">'+PT('qualNote')+'</div>';
    el.innerHTML=h;
    renderLiveTabs();applyLiveTabs();
  }catch(e){/* quality optional */}
}

/* ══ EVENTS — upcoming dates + SEC EDGAR filings ══ */
var SEC_FORM_KEY={'8-K':'f8K','8-K/A':'f8K','10-K':'f10K','10-Q':'f10Q','20-F':'f20F','40-F':'f40F','6-K':'f6K','DEF 14A':'fDEF','S-1':'fS1','SC 13D':'f13','SC 13G':'f13','SC 13D/A':'f13','SC 13G/A':'f13'};
var SEC_RED=['1.03','3.01','4.02','2.06'],SEC_GOLD=['5.02','2.01','1.01','2.05','4.01','5.07'];
function daysUntil(dstr){var d=new Date(dstr);if(isNaN(d))return null;var t=new Date();t.setHours(0,0,0,0);d.setHours(0,0,0,0);return Math.round((d-t)/86400000);}
async function loadEvents(symbol,q){
  var el=document.getElementById('lvEvents');if(!el)return;
  window.__eventsResult=null;
  var up='';
  function upRow(lbl,ds){var n=daysUntil(ds);if(n==null)return '';var when=n>0?PTf('inDays',{n:n}):n===0?PT('today'):PT('passed');var c=n>=0&&n<=14?'var(--gold)':'var(--text-dim)';return '<div class="ev-up"><span>'+lbl+'</span><strong>'+escHtml(ds)+'</strong><span style="color:'+c+'">'+when+'</span></div>';}
  if(q&&q.earningsDate)up+=upRow(PT('nextEarn'),q.earningsDate);
  if(q&&q.exDividendDate)up+=upRow(PT('exDiv'),q.exDividendDate);
  var h=up?'<div class="rec-trend-title">'+PT('evT')+'</div>'+up:'';
  el.innerHTML=h;
  try{
    var d=await workerFetch('action=events&symbol='+encodeURIComponent(symbol));
    if(currentLiveSymbol!==symbol)return;
    window.__eventsResult={symbol:symbol,filings:d.filings||[]};
    h+='<div class="rec-trend-title" style="margin-top:'+(up?'16px':'0')+'">'+PT('filingsT')+'</div>';
    if(!d.filings||!d.filings.length){h+='<div class="ta-small">'+PT('noSec')+'</div>';}
    else{
      d.filings.slice(0,12).forEach(function(f){
        var items=(f.items||'').split(',').map(function(s){return s.trim();}).filter(Boolean).filter(function(s){return s!=='9.01';});
        var lvl=items.some(function(i){return SEC_RED.indexOf(i)>-1;})?'red':items.some(function(i){return SEC_GOLD.indexOf(i)>-1;})?'gold':'';
        var bc=lvl==='red'?'var(--red)':lvl==='gold'?'var(--gold)':'var(--border)';
        var itTxt=items.map(function(i){var k='i'+i.replace('.','');return P1_T.en[k]?PT(k):i;}).join(' · ');
        h+='<a class="ev-row" href="'+escHtml(f.url)+'" target="_blank" rel="noopener" style="border-inline-start-color:'+bc+'">'
          +'<div class="ev-top"><span class="ev-form">'+escHtml(f.form)+'</span><span class="ev-type">'+PT(SEC_FORM_KEY[f.form]||'f8K')+'</span><span class="ev-date">'+escHtml(f.date)+'</span></div>'
          +(itTxt?'<div class="ev-items" style="color:'+(lvl?bc:'var(--text-dim)')+'">'+escHtml(itTxt)+'</div>':'')
          +'</a>';
      });
    }
    h+='<div class="ta-note">'+PT('evNote')+'</div>';
    el.innerHTML=h;
  }catch(e){if(up)el.innerHTML=h;}
  renderLiveTabs();applyLiveTabs();
}

/* ══ Extra facts for the AI prompt — המספרים מחושבים בקוד, ה-AI רק מפרש ══ */
function buildExtraContext(symbol){
  var out=[];
  var t=window.__techResult;
  if(t&&t.symbol===symbol&&t.tech){var x=t.tech;
    out.push('COMPUTED TECHNICALS (daily, 1y): composite='+P1_T.en[x.label]+' (score '+x.score+' on -3.25..+3.25), trend '+(x.trendBull?'up':'down')+' ADX '+x.adx+', RSI '+x.rsi+', Bollinger %B '+x.pctB+', OBV '+(x.obvUp?'rising':'falling')+', price vs MA50 '+(x.ma50?fmtPct((x.last/x.ma50-1)*100):'n/a')+', vs MA200 '+(x.ma200?fmtPct((x.last/x.ma200-1)*100):'n/a')+(x.cross?', '+x.cross+' cross'+(x.crossRecent?' (fresh)':''):'')+', 20d volatility '+x.hv+'% (percentile '+x.hvPct+')'+(x.candles.length?', recent candles: '+x.candles.slice(0,3).map(function(c){return P1_T.en[c.key];}).join(', '):''));
  }
  if(t&&t.symbol===symbol&&t.season){var s=t.season;out.push('SEASONALITY (5y): best month '+P1_T.en.months[s.best]+' ('+s.avg[s.best].toFixed(1)+'%), worst '+P1_T.en.months[s.worst]+' ('+s.avg[s.worst].toFixed(1)+'%), current month avg '+(s.avg[new Date().getMonth()]!=null?s.avg[new Date().getMonth()].toFixed(1)+'%':'n/a'));}
  var qr=window.__qualityResult;
  if(qr&&qr.symbol===symbol){out.push('QUALITY SCREEN (7 hard metrics, '+qr.res.n+' fiscal years): verdict '+qr.res.verdict.toUpperCase()+' — '+qr.res.metrics.map(function(m){return P1_T.en[m.k]+' '+m.fmt+' '+m.s;}).join('; '));}
  var ev=window.__eventsResult;
  if(ev&&ev.symbol===symbol&&ev.filings.length){out.push('RECENT SEC FILINGS: '+ev.filings.slice(0,6).map(function(f){return f.date+' '+f.form+(f.items?' items '+f.items:'');}).join('; '));}
  return out.length?'\n'+out.join('\n')+'\nThese figures were COMPUTED IN CODE from real data — treat them as facts, do not recompute or contradict them. technicalSignal must agree with the computed composite.\n':'';
}

/* ══ Render: 4 Masters committee in the AI result ══ */
function renderMasters(r){
  var sec=document.getElementById('rMastersSec');if(!sec)return;
  if(!r.masters){sec.style.display='none';return;}
  var defs=[['business','mBiz'],['financial','mFin'],['inversion','mInv'],['longterm','mLong']],cards='',sum=0,cnt=0;
  defs.forEach(function(d){var x=r.masters[d[0]];if(!x)return;var sc=Math.max(0,Math.min(5,Math.round(Number(x.score)||0)));sum+=Number(x.score)||0;cnt++;
    cards+='<div class="ms-card"><div class="profile-name">'+PT(d[1])+'</div><div class="ms-stars">'+'★'.repeat(sc)+'<span>'+'★'.repeat(5-sc)+'</span></div><div class="profile-note">'+escHtml(x.note||'')+'</div></div>';});
  var g=(r.infoGrade||'').toUpperCase().charAt(0);
  var head='<div class="ms-head">'+(cnt?'<span>'+PT('avgStars')+': <strong style="color:var(--gold)">'+(sum/cnt).toFixed(1)+'/5</strong></span>':'')
    +(g&&'ABC'.indexOf(g)>-1?'<span class="ms-grade">'+PT('infoGradeT')+': '+PT('grade'+g)+'</span>':'')+'</div>';
  var veto='';
  if(r.vetoes&&r.vetoes.length){veto='<div class="ms-veto"><strong>'+PT('vetoT')+'</strong>'+r.vetoes.map(function(v){return '<div>• '+escHtml(v)+'</div>';}).join('')+'</div>';}
  document.getElementById('rMastersLbl').textContent=PT('mastersT');
  document.getElementById('rMasters').innerHTML=head+'<div class="ms-grid">'+cards+'</div>'+veto;
  sec.style.display='block';
}
;(window.__MODS=window.__MODS||{})['app-engines']=1;

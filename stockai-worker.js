// ═══════════════════════════════════════════════════════════════
// StockAI Data Worker v2 — Cloudflare Worker
// גרסה מתוקנת: עוקפת את חסימת יאהו עם v8 chart + cookie/crumb
// מקורות: Yahoo Finance, Frankfurter (מט"ח), CoinGecko (קריפטו)
// ═══════════════════════════════════════════════════════════════

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, max-age=30'
};

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const YH = { 'User-Agent': UA, 'Accept': 'application/json, text/plain, */*', 'Accept-Language': 'en-US,en;q=0.9' };

// Crumb cache (lives as long as the worker instance)
let CRUMB_CACHE = { crumb: null, cookie: null, ts: 0 };

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS_HEADERS });

    // POST — translation requests
    if (request.method === 'POST') {
      try {
        const body = await request.json();
        if (body && body.action === 'translate') {
          return json(await translateTexts(body.texts || [], body.tl || 'he'));
        }
        return json({ ok: false, error: 'Unknown POST action' }, 400);
      } catch (e) {
        return json({ ok: false, error: 'Invalid POST body' }, 400);
      }
    }

    const url = new URL(request.url);
    const action = url.searchParams.get('action') || '';

    try {
      if (action === 'quote') {
        const symbol = (url.searchParams.get('symbol') || '').toUpperCase().trim();
        if (!symbol) return json({ ok: false, error: 'Missing symbol' }, 400);
        return json(await getFullQuote(symbol));
      }
      if (action === 'chart') {
        const symbol = (url.searchParams.get('symbol') || '').toUpperCase().trim();
        const range = url.searchParams.get('range') || '1mo';
        if (!symbol) return json({ ok: false, error: 'Missing symbol' }, 400);
        return json(await getChart(symbol, range));
      }
      if (action === 'ticker') {
        const symbols = (url.searchParams.get('symbols') || 'AAPL,MSFT,NVDA,TSLA,GOOGL,AMZN,META,TEVA,CHKP,NICE,MNDY,WIX')
          .split(',').map(s => s.trim().toUpperCase()).filter(Boolean).slice(0, 20);
        return json(await getTickerBatch(symbols));
      }
      if (action === 'forex') return json(await getForex());
      if (action === 'crypto') return json(await getCrypto());
      if (action === 'news') {
        const symbol = (url.searchParams.get('symbol') || '').toUpperCase().trim();
        if (!symbol) return json({ ok: false, error: 'Missing symbol' }, 400);
        return json(await getNews(symbol));
      }
      if (action === 'indices') return json(await getIndices());
      if (action === 'search') {
        const q = url.searchParams.get('q') || '';
        if (!q) return json({ ok: false, error: 'Missing query' }, 400);
        return json(await searchSymbol(q));
      }

      return json({
        ok: true,
        service: 'StockAI Data Worker v2',
        endpoints: ['?action=quote&symbol=AAPL', '?action=chart&symbol=AAPL&range=1mo', '?action=ticker&symbols=AAPL,TSLA', '?action=forex', '?action=crypto', '?action=search&q=apple']
      });
    } catch (err) {
      return json({ ok: false, error: String(err.message || err) }, 500);
    }
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
  });
}

// ═══════════════════════════════════════════════════════════════
// TRANSLATE — תרגום חינמי דרך Google Translate (gtx client)
// ═══════════════════════════════════════════════════════════════
async function translateTexts(texts, tl) {
  const lang = ['he', 'ru', 'es', 'ar'].includes(tl) ? tl : 'en';
  if (lang === 'en') return { ok: true, translations: texts };
  const list = (Array.isArray(texts) ? texts : []).slice(0, 15);
  const translations = await Promise.all(list.map(async (t) => {
    const text = String(t || '').slice(0, 900);
    if (!text.trim()) return text;
    try {
      const u = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + lang + '&dt=t&q=' + encodeURIComponent(text);
      const r = await fetch(u, { headers: { 'User-Agent': UA } });
      if (!r.ok) return text;
      const d = await r.json();
      const out = (d[0] || []).map(seg => seg[0]).join('');
      return out || text;
    } catch (e) { return text; }
  }));
  return { ok: true, translations };
}

// ═══════════════════════════════════════════════════════════════
// CORE: Yahoo v8 chart — עובד בלי אימות, מכיל את רוב הנתונים
// ═══════════════════════════════════════════════════════════════
async function yahooChartMeta(symbol, range = '1d', interval = '1d') {
  // Try both query hosts — one sometimes blocks, the other works
  const hosts = ['query1.finance.yahoo.com', 'query2.finance.yahoo.com'];
  let lastErr = null;
  for (const host of hosts) {
    try {
      const url = `https://${host}/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}`;
      const res = await fetch(url, { headers: YH, cf: { cacheTtl: 20 } });
      if (!res.ok) { lastErr = new Error('HTTP ' + res.status); continue; }
      const data = await res.json();
      const result = data?.chart?.result?.[0];
      if (!result || !result.meta) { lastErr = new Error('Empty chart result'); continue; }
      return result;
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error('Yahoo chart failed');
}

// ═══════════════════════════════════════════════════════════════
// Cookie + Crumb flow — נדרש ל-quoteSummary (פונדמנטלס)
// ═══════════════════════════════════════════════════════════════
async function getYahooCrumb() {
  // Cache for 30 min
  if (CRUMB_CACHE.crumb && (Date.now() - CRUMB_CACHE.ts) < 30 * 60 * 1000) return CRUMB_CACHE;
  try {
    // Step 1: get session cookie
    const r1 = await fetch('https://fc.yahoo.com/', { headers: { 'User-Agent': UA }, redirect: 'manual' });
    const setCookie = r1.headers.get('set-cookie') || '';
    const cookie = setCookie.split(';')[0];
    if (!cookie) return { crumb: null, cookie: null };
    // Step 2: get crumb using cookie
    const r2 = await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', {
      headers: { 'User-Agent': UA, 'Cookie': cookie }
    });
    if (!r2.ok) return { crumb: null, cookie: null };
    const crumb = (await r2.text()).trim();
    if (!crumb || crumb.includes('<')) return { crumb: null, cookie: null };
    CRUMB_CACHE = { crumb, cookie, ts: Date.now() };
    return CRUMB_CACHE;
  } catch (e) {
    return { crumb: null, cookie: null };
  }
}

async function yahooQuoteSummary(symbol) {
  const { crumb, cookie } = await getYahooCrumb();
  if (!crumb) return null;
  try {
    const modules = 'summaryDetail,defaultKeyStatistics,financialData,assetProfile,calendarEvents,earningsHistory,recommendationTrend,upgradeDowngradeHistory,incomeStatementHistory,insiderTransactions';
    const url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(symbol)}?modules=${modules}&crumb=${encodeURIComponent(crumb)}`;
    const res = await fetch(url, { headers: { ...YH, 'Cookie': cookie } });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.quoteSummary?.result?.[0] || null;
  } catch (e) { return null; }
}

// ═══════════════════════════════════════════════════════════════
// QUOTE — משלב chart meta (תמיד עובד) + quoteSummary (אם מצליח)
// ═══════════════════════════════════════════════════════════════
async function getFullQuote(symbol) {
  let chartResult = null;
  try {
    chartResult = await yahooChartMeta(symbol, '1d', '1d');
  } catch (e) {
    // Final fallback: Stooq
    try {
      const stooq = await getStooqQuote(symbol);
      if (stooq) return { ok: true, source: 'stooq', ...stooq };
    } catch (e2) {}
    return { ok: false, error: 'Symbol not found: ' + symbol };
  }

  const meta = chartResult.meta;
  const prev = meta.chartPreviousClose ?? meta.previousClose ?? null;
  const price = meta.regularMarketPrice ?? null;
  const change = (price != null && prev != null) ? price - prev : null;
  const changePct = (change != null && prev) ? (change / prev) * 100 : null;

  const base = {
    symbol: meta.symbol || symbol,
    name: meta.longName || meta.shortName || symbol,
    currency: meta.currency || 'USD',
    exchange: meta.fullExchangeName || meta.exchangeName || '',
    marketState: meta.marketState || '',
    regularPrice: price,
    regularChange: round2(change),
    regularChangePct: round2(changePct),
    previousClose: prev,
    open: meta.regularMarketOpen ?? null,
    dayHigh: meta.regularMarketDayHigh ?? null,
    dayLow: meta.regularMarketDayLow ?? null,
    volume: meta.regularMarketVolume ?? null,
    week52High: meta.fiftyTwoWeekHigh ?? null,
    week52Low: meta.fiftyTwoWeekLow ?? null,
    fetchedAt: new Date().toISOString()
  };

  // Enrich with fundamentals (best-effort — may fail silently)
  const summary = await yahooQuoteSummary(symbol);
  if (summary) {
    const v = (o) => (o && typeof o === 'object' && 'raw' in o) ? o.raw : (typeof o === 'number' ? o : null);
    const f = (o) => (o && typeof o === 'object' && 'fmt' in o) ? o.fmt : null;
    const detail = summary.summaryDetail || {};
    const stats = summary.defaultKeyStatistics || {};
    const fin = summary.financialData || {};
    const profile = summary.assetProfile || {};
    const cal = summary.calendarEvents || {};

    Object.assign(base, {
      avgVolume: v(detail.averageVolume),
      marketCap: v(detail.marketCap),
      peRatio: v(detail.trailingPE),
      forwardPE: v(detail.forwardPE),
      eps: v(stats.trailingEps),
      beta: v(detail.beta) ?? v(stats.beta),
      dividendRate: v(detail.dividendRate),
      dividendYield: v(detail.dividendYield),
      exDividendDate: f(detail.exDividendDate),
      targetMean: v(fin.targetMeanPrice),
      targetHigh: v(fin.targetHighPrice),
      targetLow: v(fin.targetLowPrice),
      recommendationKey: fin.recommendationKey || null,
      numberOfAnalysts: v(fin.numberOfAnalystOpinions),
      sector: profile.sector || null,
      industry: profile.industry || null,
      employees: profile.fullTimeEmployees || null,
      website: profile.website || null,
      description: profile.longBusinessSummary ? profile.longBusinessSummary.slice(0, 500) : null,
      earningsDate: cal.earnings?.earningsDate?.[0]?.fmt || null,
      // ── מדדים מתקדמים ──
      profitMargins: v(fin.profitMargins),
      operatingMargins: v(fin.operatingMargins),
      returnOnEquity: v(fin.returnOnEquity),
      returnOnAssets: v(fin.returnOnAssets),
      revenueGrowth: v(fin.revenueGrowth),
      totalCash: v(fin.totalCash),
      totalDebt: v(fin.totalDebt),
      debtToEquity: v(fin.debtToEquity),
      freeCashflow: v(fin.freeCashflow),
      ma50: v(detail.fiftyDayAverage),
      ma200: v(detail.twoHundredDayAverage),
      heldInsiders: v(stats.heldPercentInsiders),
      heldInstitutions: v(stats.heldPercentInstitutions),
      shortPctFloat: v(stats.shortPercentOfFloat)
    });

    // ── היסטוריית דוחות רווח (עמד/פספס) ──
    const eh = (summary.earningsHistory?.history || []).slice(-4);
    if (eh.length) base.earningsHist = eh.map(x => ({
      q: x.quarter?.fmt || '',
      actual: v(x.epsActual),
      est: v(x.epsEstimate),
      surprisePct: v(x.surprisePercent)
    }));

    // ── פילוח המלצות אנליסטים ──
    const rt = summary.recommendationTrend?.trend?.[0];
    if (rt) base.recTrend = { strongBuy: rt.strongBuy || 0, buy: rt.buy || 0, hold: rt.hold || 0, sell: rt.sell || 0, strongSell: rt.strongSell || 0 };

    // ── פעולת אנליסט אחרונה ──
    const ud = summary.upgradeDowngradeHistory?.history?.[0];
    if (ud) base.lastAction = {
      firm: ud.firm || '', action: ud.action || '',
      toGrade: ud.toGrade || '', fromGrade: ud.fromGrade || '',
      date: ud.epochGradeDate ? new Date(ud.epochGradeDate * 1000).toISOString().slice(0, 10) : null
    };

    // ── הכנסות ורווח נקי — 4 שנים ──
    const inc = (summary.incomeStatementHistory?.incomeStatementHistory || []).slice(0, 4);
    if (inc.length) base.financialHist = inc.map(x => ({
      year: x.endDate?.fmt ? String(x.endDate.fmt).slice(0, 4) : '',
      revenue: v(x.totalRevenue),
      netIncome: v(x.netIncome)
    })).reverse();

    // ── עסקאות בעלי עניין — 5 אחרונות ──
    const ins = (summary.insiderTransactions?.transactions || []).slice(0, 5);
    if (ins.length) base.insiderTx = ins.map(t => ({
      name: t.filerName || '',
      relation: t.filerRelation || '',
      text: t.transactionText || '',
      shares: v(t.shares),
      value: v(t.value),
      date: t.startDate?.fmt || ''
    }));
  }

  return { ok: true, source: summary ? 'yahoo-full' : 'yahoo-basic', ...base };
}

function round2(n) { return n == null ? null : Math.round(n * 100) / 100; }

// ═══════════════════════════════════════════════════════════════
// STOOQ fallback (price only)
// ═══════════════════════════════════════════════════════════════
async function getStooqQuote(symbol) {
  let stooqSym = symbol.toLowerCase();
  if (!stooqSym.includes('.')) stooqSym += '.us';
  const url = `https://stooq.com/q/l/?s=${stooqSym}&f=sd2t2ohlcv&h&e=csv`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error('Stooq HTTP ' + res.status);
  const csv = await res.text();
  const lines = csv.trim().split('\n');
  if (lines.length < 2) throw new Error('No data');
  const parts = lines[1].split(',');
  if (parts.length < 7 || parts[6] === 'N/D' || !parts[6]) throw new Error('Symbol not found');
  const close = parseFloat(parts[6]);
  const open = parseFloat(parts[3]);
  return {
    symbol, name: symbol, currency: 'USD',
    regularPrice: close,
    regularChange: round2(close - open),
    regularChangePct: round2(open ? ((close - open) / open) * 100 : 0),
    open, dayHigh: parseFloat(parts[4]), dayLow: parseFloat(parts[5]),
    volume: parseInt(parts[7]) || null,
    fetchedAt: new Date().toISOString(), limited: true
  };
}

// ═══════════════════════════════════════════════════════════════
// CHART
// ═══════════════════════════════════════════════════════════════
async function getChart(symbol, range) {
  const intervals = { '1d': '5m', '5d': '30m', '1mo': '1d', '6mo': '1d', '1y': '1wk', '5y': '1mo' };
  const interval = intervals[range] || '1d';
  const result = await yahooChartMeta(symbol, range, interval);
  const timestamps = result.timestamp || [];
  const closes = result.indicators?.quote?.[0]?.close || [];
  const points = [];
  for (let i = 0; i < timestamps.length; i++) {
    if (closes[i] != null) points.push([timestamps[i], round2(closes[i])]);
  }
  return {
    ok: true, symbol, range,
    currency: result.meta?.currency || 'USD',
    previousClose: result.meta?.chartPreviousClose ?? null,
    points
  };
}

// ═══════════════════════════════════════════════════════════════
// TICKER — batch (parallel v8 chart calls)
// ═══════════════════════════════════════════════════════════════
async function getTickerBatch(symbols) {
  const fetchOne = async (sym) => {
    try {
      const result = await yahooChartMeta(sym, '1d', '1d');
      const meta = result.meta;
      if (meta.regularMarketPrice == null) return null;
      const prev = meta.chartPreviousClose ?? meta.previousClose ?? meta.regularMarketPrice;
      const chg = prev ? ((meta.regularMarketPrice - prev) / prev) * 100 : 0;
      return { symbol: sym, price: round2(meta.regularMarketPrice), changePct: round2(chg) };
    } catch (e) { return null; }
  };
  const results = await Promise.all(symbols.map(fetchOne));
  return { ok: true, quotes: results.filter(Boolean), fetchedAt: new Date().toISOString() };
}

// ═══════════════════════════════════════════════════════════════
// FOREX (Frankfurter — ECB)
// ═══════════════════════════════════════════════════════════════
async function getForex() {
  const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=ILS,EUR,GBP,JPY,CHF,CAD,AUD,RUB');
  if (!res.ok) throw new Error('Frankfurter HTTP ' + res.status);
  const data = await res.json();
  let eurIls = null;
  try {
    const res2 = await fetch('https://api.frankfurter.app/latest?from=EUR&to=ILS');
    if (res2.ok) { const d2 = await res2.json(); eurIls = d2.rates?.ILS; }
  } catch (e) {}
  return { ok: true, base: 'USD', date: data.date, rates: data.rates, eurIls, fetchedAt: new Date().toISOString() };
}

// ═══════════════════════════════════════════════════════════════
// CRYPTO — דרך Yahoo (אותו endpoint שעובד למניות — מובטח!)
// ═══════════════════════════════════════════════════════════════
const CRYPTO_YH = [
  { sym: 'BTC-USD', name: 'BTC' }, { sym: 'ETH-USD', name: 'ETH' },
  { sym: 'SOL-USD', name: 'SOL' }, { sym: 'XRP-USD', name: 'XRP' },
  { sym: 'ADA-USD', name: 'ADA' }, { sym: 'DOGE-USD', name: 'DOGE' },
  { sym: 'BNB-USD', name: 'BNB' }, { sym: 'TRX-USD', name: 'TRX' }
];
async function getCrypto() {
  const fetchOne = async (c) => {
    try {
      const result = await yahooChartMeta(c.sym, '1d', '1d');
      const meta = result.meta;
      if (meta.regularMarketPrice == null) return null;
      const prev = meta.chartPreviousClose ?? meta.previousClose ?? meta.regularMarketPrice;
      const chg = prev ? ((meta.regularMarketPrice - prev) / prev) * 100 : 0;
      return { symbol: c.name, usd: round2(meta.regularMarketPrice), change24h: round2(chg) };
    } catch (e) { return null; }
  };
  const results = await Promise.all(CRYPTO_YH.map(fetchOne));
  const coins = results.filter(Boolean);
  if (!coins.length) throw new Error('Crypto unavailable');
  return { ok: true, source: 'yahoo', coins, fetchedAt: new Date().toISOString() };
}

// ═══════════════════════════════════════════════════════════════
// SEARCH
// ═══════════════════════════════════════════════════════════════
async function searchSymbol(q) {
  const hosts = ['query1.finance.yahoo.com', 'query2.finance.yahoo.com'];
  for (const host of hosts) {
    try {
      const url = `https://${host}/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=8&newsCount=0`;
      const res = await fetch(url, { headers: YH });
      if (!res.ok) continue;
      const data = await res.json();
      const quotes = (data.quotes || [])
        .filter(x => x.symbol && (x.quoteType === 'EQUITY' || x.quoteType === 'ETF'))
        .map(x => ({ symbol: x.symbol, name: x.longname || x.shortname || x.symbol, exchange: x.exchDisp || '', type: x.quoteType }));
      return { ok: true, results: quotes };
    } catch (e) {}
  }
  return { ok: false, error: 'Search failed' };
}

// ═══════════════════════════════════════════════════════════════
// NEWS — חדשות אחרונות על מניה (Yahoo search API)
// ═══════════════════════════════════════════════════════════════
async function getNews(symbol) {
  const hosts = ['query1.finance.yahoo.com', 'query2.finance.yahoo.com'];
  for (const host of hosts) {
    try {
      const url = `https://${host}/v1/finance/search?q=${encodeURIComponent(symbol)}&quotesCount=0&newsCount=6`;
      const res = await fetch(url, { headers: YH });
      if (!res.ok) continue;
      const data = await res.json();
      const news = (data.news || []).map(n => ({
        title: n.title,
        publisher: n.publisher,
        link: n.link,
        time: n.providerPublishTime ? new Date(n.providerPublishTime * 1000).toISOString() : null,
        thumbnail: n.thumbnail?.resolutions?.[1]?.url || n.thumbnail?.resolutions?.[0]?.url || null
      }));
      return { ok: true, symbol, news, fetchedAt: new Date().toISOString() };
    } catch (e) {}
  }
  return { ok: false, error: 'News unavailable' };
}

// ═══════════════════════════════════════════════════════════════
// INDICES — מדדים עיקריים: S&P 500, נאסד"ק, דאו, ת"א 35, נפט, זהב
// ═══════════════════════════════════════════════════════════════
async function getIndices() {
  const list = [
    { sym: '^GSPC', name: 'S&P 500' },
    { sym: '^IXIC', name: 'NASDAQ' },
    { sym: '^DJI', name: 'Dow Jones' },
    { sym: 'TA35.TA', name: 'TA-35' },
    { sym: 'GC=F', name: 'Gold' },
    { sym: 'CL=F', name: 'Oil WTI' },
    { sym: '^VIX', name: 'VIX' }
  ];
  const fetchOne = async (item) => {
    try {
      const result = await yahooChartMeta(item.sym, '1d', '1d');
      const meta = result.meta;
      if (meta.regularMarketPrice == null) return null;
      const prev = meta.chartPreviousClose ?? meta.previousClose ?? meta.regularMarketPrice;
      const chg = prev ? ((meta.regularMarketPrice - prev) / prev) * 100 : 0;
      return { symbol: item.sym, name: item.name, price: round2(meta.regularMarketPrice), changePct: round2(chg) };
    } catch (e) { return null; }
  };
  const results = await Promise.all(list.map(fetchOne));
  return { ok: true, indices: results.filter(Boolean), fetchedAt: new Date().toISOString() };
}

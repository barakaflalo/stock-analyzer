/* StockAI · app-ui.js — AI result rendering, share, PWA install, utilities
   AppNest © 2026 · load order matters: see <script> tags in stock-analyzer.html */
/* ══════════════════════════════════════════════════
   RENDER RESULT
══════════════════════════════════════════════════ */
function setLoading(on,sym){
  document.getElementById('loadingBox').classList.toggle('visible',on);
  document.getElementById('errorBox').classList.remove('visible');
  if(on)document.getElementById('resultCard').classList.remove('visible');
  if(on)document.getElementById('loadingSym').textContent=sym||'';
  if(on)try{document.getElementById('loadingBox').scrollIntoView({behavior:'smooth',block:'center'});}catch(e){}
  var btn=document.getElementById('btnAnalyze');
  btn.disabled=on;btn.setAttribute('data-t',on?'btnAnalyzing':'btnAnalyze');
  renderText();
}
function showError(msg){
  document.getElementById('loadingBox').classList.remove('visible');
  var el=document.getElementById('errorBox');el.textContent=msg;el.classList.add('visible');
  try{el.scrollIntoView({behavior:'smooth',block:'center'});}catch(e){}
}

function renderResult(r,symbol){
  if(!r)return;
  document.getElementById('rSym').textContent=r.symbol||symbol||'';
  document.getElementById('rName').textContent=r.companyName||'';
  document.getElementById('rPrice').textContent=r.currentPrice||'—';
  document.getElementById('rTarget').textContent=r.priceTarget||'—';
  document.getElementById('rAnalyst').textContent=r.analystRating||'—';
  document.getElementById('rSummary').textContent=r.summary||'';
  var conf=parseInt(r.confidenceScore)||0;
  document.getElementById('rConfNum').textContent=conf+'% — '+getConfLabel(conf);
  document.getElementById('rFund').textContent=(parseInt(r.fundamentalScore)||0)+'/100';
  setTimeout(function(){document.getElementById('rConfFill').style.width=conf+'%';},120);
  // Recommendation badge
  var recKey=(r.recommendation||'HOLD').toUpperCase();
  var recText=recKey==='BUY'?T('recBuy'):recKey==='SELL'?T('recSell'):T('recHold');
  var recPfx=recKey==='BUY'?'▲ ':recKey==='SELL'?'▼ ':'◼ ';
  var recEl=document.getElementById('rRec');recEl.textContent=recPfx+recText;
  recEl.className='rec-badge '+(recKey==='BUY'?'rec-buy':recKey==='SELL'?'rec-sell':'rec-hold');
  // Risk
  var riskMap={LOW:{t:T('riskLow'),c:'var(--green)'},MEDIUM:{t:T('riskMed'),c:'var(--yellow)'},HIGH:{t:T('riskHigh'),c:'var(--red)'}};
  var rd=riskMap[(r.riskLevel||'').toUpperCase()]||{t:r.riskLevel||'—',c:'var(--text)'};
  var rEl=document.getElementById('rRisk');rEl.textContent=rd.t;rEl.style.color=rd.c;
  // Social sentiment
  var socMap={POSITIVE:{t:T('sentPos'),c:'var(--green)'},NEUTRAL:{t:T('sentNeu'),c:'var(--yellow)'},NEGATIVE:{t:T('sentNeg'),c:'var(--red)'}};
  var sd=socMap[(r.socialSentiment||'').toUpperCase()]||{t:r.socialSentiment||'—',c:'var(--text)'};
  var sEl=document.getElementById('rSocial');sEl.textContent=sd.t;sEl.style.color=sd.c;
  // Technical signal
  var techMap={UP:{t:T('techUp'),c:'var(--green)'},DOWN:{t:T('techDown'),c:'var(--red)'},NEUTRAL:{t:T('techNeu'),c:'var(--yellow)'}};
  var td=techMap[(r.technicalSignal||'').toUpperCase()]||{t:r.technicalSignal||'—',c:'var(--text)'};
  var tEl=document.getElementById('rTech');tEl.textContent=td.t;tEl.style.color=td.c;
  // Bull/Bear factors
  var bullEl=document.getElementById('rBull');bullEl.innerHTML='';
  (r.bullishFactors||[]).forEach(function(f){var d=document.createElement('div');d.className='factor-item';d.innerHTML='<div class="factor-dot" style="background:var(--green)"></div><span>'+escHtml(f)+'</span>';bullEl.appendChild(d);});
  var bearEl=document.getElementById('rBear');bearEl.innerHTML='';
  (r.bearishFactors||[]).forEach(function(f){var d=document.createElement('div');d.className='factor-item';d.innerHTML='<div class="factor-dot" style="background:var(--red)"></div><span>'+escHtml(f)+'</span>';bearEl.appendChild(d);});
  // ── שורה תחתונה + פרופילי משקיע ──
  var blSec=document.getElementById('rBottomLineSec');
  if(r.bottomLine){
    document.getElementById('rBottomLineLbl').textContent=LT('bottomLineT');
    document.getElementById('rBottomLine').textContent=r.bottomLine;
    blSec.style.display='block';
  }else blSec.style.display='none';
  var prSec=document.getElementById('rProfilesSec');
  if(r.profiles&&(r.profiles.aggressive||r.profiles.moderate||r.profiles.conservative)){
    document.getElementById('rProfilesLbl').textContent=LT('profilesT');
    var ACT_COLORS={BUY:'var(--green)',HOLD:'var(--gold)',SELL:'var(--red)',AVOID:'var(--red)'};
    var ACT_LBL={BUY:LT('actBuy'),HOLD:LT('actHold'),SELL:LT('actSell'),AVOID:LT('actAvoid')};
    var ph='';
    [['aggressive','profAgg'],['moderate','profMod'],['conservative','profCon']].forEach(function(p){
      var d=r.profiles[p[0]];if(!d)return;
      var act=(d.action||'').toUpperCase();
      ph+='<div class="profile-card"><div class="profile-name">'+LT(p[1])+'</div>'
        +'<div class="profile-action" style="color:'+(ACT_COLORS[act]||'var(--text)')+'">'+(ACT_LBL[act]||act)+'</div>'
        +'<div class="profile-note">'+escHtml(d.note||'')+'</div></div>';
    });
    document.getElementById('rProfiles').innerHTML=ph;
    prSec.style.display='block';
  }else prSec.style.display='none';
  renderMasters(r);
  // Sources
  var srcEl=document.getElementById('rSources');srcEl.innerHTML='';
  (r.sources||[]).forEach(function(s){var sp=document.createElement('span');sp.className='source-tag';sp.textContent=s;srcEl.appendChild(sp);});
  document.getElementById('resultCard').classList.add('visible');
  if(!window.__noScroll)try{document.getElementById('resultCard').scrollIntoView({behavior:'smooth',block:'start'});}catch(e){}
  currentSymbol=r.symbol||symbol;
  updateAddWatchBtn();
  // Check if stale
  var cache=getAnalysisCache();var entry=cache[currentSymbol];
  if(entry&&isStale(currentSymbol))showStaleBar(currentSymbol,entry.ts);
  else hideStaleBar();
}

function getConfLabel(s){if(s>=75)return T('confHigh');if(s>=50)return T('confMed');return T('confLow');}

function addToHistory(sym,result){
  analysisHistory.unshift({symbol:sym,result:result,time:new Date().toLocaleTimeString()});
  if(analysisHistory.length>5)analysisHistory.pop();
  persistHistory();
  renderHistory();
}
function renderHistory(){
  var wrap=document.getElementById('historyWrap');var list=document.getElementById('historyItems');
  if(!analysisHistory.length){wrap.style.display='none';return;}
  wrap.style.display='block';list.innerHTML='';
  analysisHistory.forEach(function(h){
    var recKey=(h.result.recommendation||'HOLD').toUpperCase();
    var color=recKey==='BUY'?'var(--green)':recKey==='SELL'?'var(--red)':'var(--gold)';
    var recText=recKey==='BUY'?T('recBuy'):recKey==='SELL'?T('recSell'):T('recHold');
    var el=document.createElement('div');el.className='hist-item';
    el.innerHTML='<div class="hist-sym" style="color:'+color+'">'+escHtml(h.symbol)+'</div>'
      +'<div class="hist-rec" style="color:'+color+'">'+escHtml(recText)+'</div>'
      +'<div class="hist-time">'+h.time+'</div>';
    el.onclick=function(){renderResult(h.result,h.symbol);document.getElementById('stockInput').value=h.symbol;};
    list.appendChild(el);
  });
}

/* ══════════════════════════════════════════════════
   SHARE + PWA + UTILS
══════════════════════════════════════════════════ */
function shareApp(){
  var url=location.protocol==='file:'?'https://barakaflalo.github.io/stock-analyzer/':location.origin+location.pathname;
  var who=getUsername()?'\n'+P4('shareBy',{u:getUsername()}):'';
  if(navigator.share){navigator.share({title:T('shareTitle'),text:T('shareText')+who,url:url}).catch(function(){});return;}
  var txt=T('shareText')+who+'\n'+url;
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(function(){showToastMsg('✓ Copied!');});}
  else{var ta=document.createElement('textarea');ta.value=txt;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(ta);showToastMsg('✓ Copied!');}
}
var deferredPrompt=null;
window.addEventListener('beforeinstallprompt',function(e){
  e.preventDefault();deferredPrompt=e;
  if(!localStorage.getItem('pwa_dismissed')){
    document.getElementById('pwaBanner').classList.add('visible');
    document.getElementById('pwaBannerTitle').textContent=T('pwaTitle');
    document.getElementById('pwaBannerText').textContent=T('pwaText');
  }
});
function installPWA(){if(!deferredPrompt)return;deferredPrompt.prompt();deferredPrompt.userChoice.then(function(){deferredPrompt=null;document.getElementById('pwaBanner').classList.remove('visible');});}
function dismissPWA(){localStorage.setItem('pwa_dismissed','1');document.getElementById('pwaBanner').classList.remove('visible');}
function escHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function showToastMsg(msg){var t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show');},2800);}
if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){});});}

/* ══════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════ */

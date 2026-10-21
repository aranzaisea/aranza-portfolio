  var CUR='<svg viewBox="0 0 24 24"><path d="M4 2l16 9-7 2-3 7z" fill="#141A26" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>';
  function ring(){return'<svg class="ring" viewBox="0 0 36 36"><circle class="bgc" cx="18" cy="18" r="15.9"/><circle class="fg" cx="18" cy="18" r="15.9" pathLength="100"/></svg>'}

  /* scene markup */
  var M=[];
  M[0]='<div class="rig"><div class="card"><div class="chead"><span class="ico">C</span><div><span class="ttl">Claim draft</span><span class="sub">CLM-1832 · auto collision</span></div><span class="pill p-ai pulse"><i></i>Copilot</span></div><div class="stack" data-r="fields"></div><div class="foot"><span class="note" data-r="note"></span><button class="sb" data-r="send" tabindex="-1"></button></div></div></div>'+
    '<div class="side"><div class="card"><div class="who"><span class="av">L</span><div><b>Lucy Parker</b><span>Adjuster · reviewing</span></div></div><div class="doc" style="margin-top:calc(var(--u)*1.4)"><span class="sub">police_report.pdf · p.3</span><i style="width:90%"></i><i style="width:72%"></i><i class="hl-hu" data-r="hl" style="width:84%"></i><i style="width:60%"></i></div><button class="sb on wide" style="margin-top:calc(var(--u)*1.4)" data-r="confirm" tabindex="-1"></button></div></div>';
  M[1]='<div class="rig"><div class="card"><div class="chead"><span class="ico">C</span><div><span class="ttl">Liability</span><span class="sub">CLM-1832 · who caused it</span></div><span class="pill p-ai" data-r="tag">AI</span></div>'+
    '<div class="stack"><div class="box" data-r="ans"><span class="k">Answer</span><span class="v typed" data-r="val"></span><div class="reveal" data-r="srcs"><div class="rowx"><span class="src" data-r="s1">↗ police_report.pdf · p.3 · line 14</span></div></div></div>'+
    '<div class="reveal" data-r="split"><div style="display:grid;grid-template-columns:1fr auto 1fr;gap:calc(var(--u)*1);align-items:center"><div class="box ai" data-r="o1"><span class="k">Police report</span><span class="v" style="font-size:calc(var(--u)*1.5)">Driver B at fault</span></div><span class="v" style="color:var(--human)">≠</span><div class="box hu" data-r="o2"><span class="k">Driver statement</span><span class="v" style="font-size:calc(var(--u)*1.5)">Driver A at fault</span></div></div></div></div>'+
    '<div class="foot"><span class="note" data-r="note"></span></div></div></div>'+
    '<div class="side docs"><div class="doc" data-r="d1"><span class="sub">police_report.pdf · p.3</span><i style="width:88%"></i><i class="" data-r="h1" style="width:76%"></i><i style="width:64%"></i><q>“…driver B failed to yield at the junction.”</q></div>'+
    '<div class="doc" data-r="d2" style="margin-top:calc(var(--u)*1.6);opacity:0;transition:opacity .5s,border-color .5s,box-shadow .5s"><span class="sub">statement_driver_A.pdf · p.1</span><i style="width:80%"></i><i data-r="h2" style="width:70%"></i><i style="width:58%"></i><q>“…the other car ran the red light.”</q></div></div>';
  M[2]='<div class="rig auto"><div class="card"><div class="chead"><span class="ico">C</span><div><span class="ttl">Copilot autonomy</span><span class="sub">Claims team · admin</span></div></div>'+
    '<div class="stack" data-r="opts"></div>'+
    '<div class="box" style="margin-top:calc(var(--u)*1.4)" data-r="pol"><span class="k">Confidence threshold · 🔒 locked by policy</span><div class="track" data-r="track"><b></b><s></s></div><div class="reveal" data-r="lockmsg"><span class="pill p-hu">Owner: Claims operations</span></div></div></div></div>'+
    '<div class="side tasks"><div class="card"><span class="k">Who does what</span><div data-r="tasks" style="margin-top:calc(var(--u)*.6)"></div></div></div>';
  M[3]='<div class="rig"><div class="card"><div class="chead"><span class="ico">V</span><div><span class="ttl">Pre-cleared batch</span><span class="sub">62 cases · low risk · L1 triage</span></div><span class="pill p-n" data-r="state">Ready</span></div>'+
    '<div class="stack" data-r="cases" style="gap:calc(var(--u)*.7)"></div><div class="reveal" data-r="ban"><div class="banner">⏸ Batch paused · 1 of 3 samples flagged</div></div>'+
    '<div class="foot"><span class="note" data-r="note"></span><button class="sb" data-r="sign" tabindex="-1"></button></div></div></div>'+
    '<div class="side"><div class="card"><div class="who"><span class="av">L</span><div><b>Sample <span data-r="sn" style="font:inherit;color:inherit;text-transform:none;letter-spacing:0">1</span> of 3</b><span>Analyst · reviewing</span></div></div>'+
    '<div class="box" style="margin-top:calc(var(--u)*1.4)" data-r="sc"><span class="k" data-r="scid">CASE-10461</span><span class="v" style="font-size:calc(var(--u)*1.5)" data-r="scn">Kiwa Logistics SRL</span><span class="small" data-r="scr">Name check · clear</span></div>'+
    '<div class="rowx" style="margin-top:calc(var(--u)*1.4)"><button class="sb ghost" style="flex:1" data-r="flag" tabindex="-1">Flag</button><button class="sb on" style="flex:1" data-r="okb" tabindex="-1">Looks right</button></div></div></div>'+
    '<div class="callout owner" data-r="owner"><b>Sent to rule owner · Sanctions screening</b>“Possible name match on a sanctions list. Pre-clear rule needs a second look.”</div>';
  M[4]='<div class="rig"><div class="card"><div class="chead"><span class="ico">V</span><div><span class="ttl">Marco Aurelio Duarte</span><span class="sub">CASE-10451 · possible PEP match</span></div><span class="pill p-ai pulse" data-r="state"><i></i>4 agents</span></div><div class="stack" data-r="agents"></div>'+
    '<div class="foot"><span class="note" data-r="note"></span><button class="sb" data-r="rec" tabindex="-1"></button></div></div></div>'+
    '<div class="side fix"><div class="card"><span class="k">3 of 4 agents finished</span><p class="small" style="margin:calc(var(--u)*.6) 0 0">Risk and Sanctions results are kept. Add the missing context or continue without it.</p>'+
    '<div class="reveal open" data-r="acts"><div style="display:grid;gap:calc(var(--u)*.8)"><button class="sb on wide" data-r="manual" tabindex="-1">Add context manually</button><button class="sb ghost wide" tabindex="-1">Continue with 3 of 4</button></div></div>'+
    '<div class="reveal" data-r="form"><div class="box hu"><span class="k">Customer context · added by Lucy</span><span class="v typed" style="font-size:calc(var(--u)*1.4)" data-r="ctx"></span></div></div></div></div>';
  M[5]='<div class="phone"><div class="card"><div class="notch"></div><span class="sub">Numi · tonight</span><span class="ttl" style="margin-top:calc(var(--u)*.4)">Tonight’s plan</span>'+
    '<div class="stack" style="gap:calc(var(--u)*.9)"><div class="box" data-r="r1"><span class="k">Dinner</span><span class="v typed" style="font-size:calc(var(--u)*1.6)" data-r="v1"></span></div>'+
    '<div class="box" data-r="r2"><span class="k">Cook at</span><span class="v typed" style="font-size:calc(var(--u)*1.6)"><span class="ul" data-r="ul"><span data-r="v2"></span></span></span><div class="reveal" data-r="as"><span class="pill p-hu" data-r="asp">Assumed · tap to change</span></div><div class="reveal" data-r="pick"><div class="timechips" data-r="chips"><span>7:00</span><span>7:30</span><span>8:00</span></div></div></div>'+
    '<div class="box" data-r="r3"><span class="k">Serves</span><span class="v typed" style="font-size:calc(var(--u)*1.6)" data-r="v3"></span></div></div>'+
    '<button class="sb on wide" style="margin-top:calc(var(--u)*1.4)" tabindex="-1">Start cooking</button></div></div>'+
    '<div class="bubble" data-r="bub"><span class="sub">You</span>Plan dinner with what’s in my fridge.</div>'+
    '<div class="callout" data-r="why"><b>Why this time</b>You didn’t say when. Numi used your usual dinner hour from the last two weeks.</div>';

  /* engine */
  function Ctx(stage){
    var c={stage:stage,timers:[],r:{}};
    stage.querySelectorAll('[data-r]').forEach(function(e){c.r[e.dataset.r]=e});
    c.cursor=stage.querySelector('.cursor');c.ripple=stage.querySelector('.ripple');c.beats=[].slice.call(stage.querySelectorAll('.beat'));
    c.at=function(ms,fn){if(c.jump){c.q.push([ms,fn]);return}c.timers.push(setTimeout(fn,ms))};
    c.clear=function(){c.timers.forEach(clearTimeout);c.timers=[]};
    c.beat=function(n,dur){c.beats.forEach(function(b,i){b.classList.toggle('on',i===n-1);b.classList.toggle('past',i<n-1);b.style.setProperty('--d',(dur||2000)+'ms');if(i===n-1){var bar=b.querySelector('.bar i');bar.style.transition='none';bar.style.width='0';void bar.offsetWidth;bar.style.transition='';bar.style.width=''}})};
    function pos(el,dx,dy){var s=stage.getBoundingClientRect(),r=el.getBoundingClientRect();return[r.left-s.left+r.width*(dx==null?.5:dx),r.top-s.top+r.height*(dy==null?.5:dy)]}
    c.to=function(el,dx,dy){if(c.jump)return;var p=pos(el,dx,dy);c.cursor.style.opacity=1;c.cursor.style.transform='translate('+(p[0]-4)+'px,'+(p[1]-2)+'px)'};
    c.click=function(el,dx,dy){if(c.jump)return;var p=pos(el,dx,dy);c.ripple.style.left=p[0]+'px';c.ripple.style.top=p[1]+'px';c.ripple.classList.remove('go');void c.ripple.offsetWidth;c.ripple.classList.add('go');el.classList.add('press');setTimeout(function(){el.classList.remove('press')},220)};
    c.hide=function(){c.cursor.style.opacity=0};
    c.type=function(el,txt,ms){if(c.jump){el.textContent=txt;return}var n=0,step=Math.max(18,(ms||600)/txt.length);el.textContent='';(function t(){n++;el.textContent=txt.slice(0,n);if(n<txt.length)c.timers.push(setTimeout(t,step))})()};
    c.count=function(el,to,ms){if(c.jump){el.textContent=to+'%';return}var t0=performance.now();(function tick(nw){var k=Math.min(1,(nw-t0)/ms);el.textContent=Math.round(to*(1-Math.pow(1-k,3)))+'%';if(k<1)requestAnimationFrame(tick)})(t0)};
    c.base=function(){stage.classList.remove('shift','end');c.beats.forEach(function(b){b.classList.remove('on','past')});c.cursor.style.transition='none';c.cursor.style.opacity=0;c.cursor.style.transform='translate(80%,110%)';void c.cursor.offsetWidth;c.cursor.style.transition=''};
    return c}

  var SC=[];
  /* 01 confidence */
  SC[0]=function(c){var F=[['Claimant','James Harrington',97],['Vehicle','2021 Toyota Camry',94],['Liability','Third party · 100%',72],['Policy','POL-99281 · active',91]],r=c.r;
    r.fields.innerHTML=F.map(function(f,i){return'<div class="box fgrid"><span class="k">'+f[0]+'</span><span class="v"><span class="typed"></span></span><span class="conf">'+ring()+'<span class="pct">—</span></span>'+(i===2?'<div class="reveal"><div class="rowx"><span class="pill p-hu" data-t>Needs review</span><span class="src">↗ police_report.pdf · p.3</span></div></div>':'')+'</div>'}).join('');
    var rows=[].slice.call(r.fields.children);r.send.innerHTML='<span data-i>🔒</span><span data-x>Send to carrier</span>';
    var si=r.send.querySelector('[data-i]'),sx=r.send.querySelector('[data-x]');
    return function(){c.base();rows.forEach(function(x){x.className='box fgrid';x.querySelector('.typed').textContent='';x.querySelector('.fg').style.strokeDashoffset=100;x.querySelector('.pct').textContent='—'});
      var rv=rows[2].querySelector('.reveal'),tg=rows[2].querySelector('[data-t]');rv.classList.remove('open');tg.className='pill p-hu';tg.textContent='Needs review';
      r.send.className='sb';si.textContent='🔒';sx.textContent='Send to carrier';r.note.textContent='Fields below 85% need a person';r.confirm.className='sb on wide';r.confirm.textContent='Confirm liability';
      c.at(400,function(){c.beat(1,3000)});
      rows.forEach(function(x,i){var v=x.querySelector('.typed');c.at(600+i*650,function(){v.classList.add('shim')});c.at(1100+i*650,function(){v.classList.remove('shim');c.type(v,F[i][1],380);x.querySelector('.fg').style.strokeDashoffset=100-F[i][2];c.count(x.querySelector('.pct'),F[i][2],900)})});
      c.at(3600,function(){c.beat(2,2600);rows[2].classList.add('low');rv.classList.add('open');r.note.textContent='1 field below 85% · claim blocked'});
      c.at(6400,function(){c.beat(3,3600);c.stage.classList.add('shift')});
      c.at(7300,function(){c.to(r.hl,.6,.5)});c.at(8500,function(){c.to(r.confirm)});c.at(9600,function(){c.click(r.confirm)});
      c.at(9800,function(){r.confirm.className='sb ok wide';r.confirm.textContent='✓ Confirmed'});
      c.at(10200,function(){c.beat(4,2600);rows[2].classList.remove('low');rows[2].classList.add('ok');tg.className='pill p-live';tg.textContent='✓ Reviewed by Lucy';r.send.className='sb on';si.textContent='→';r.note.textContent='All fields checked'});
      c.at(10900,function(){c.to(r.send)});c.at(12000,function(){c.click(r.send)});
      c.at(12250,function(){r.send.className='sb ok';si.textContent='✓';sx.textContent='Sent';c.hide()});
      c.at(12700,function(){c.stage.classList.add('end')});return 15200}};
  /* 02 sources */
  SC[1]=function(c){var r=c.r;return function(){c.base();r.val.textContent='';r.ans.className='box';r.srcs.classList.remove('open');r.split.classList.remove('open');r.d1.className='doc';r.h1.className='';r.d2.className='doc';r.d2.style.opacity=0;r.h2.className='';r.tag.className='pill p-ai';r.tag.textContent='AI';r.note.textContent='';r.o1.className='box ai';r.o2.className='box hu';r.ans.style.display='';
      c.at(300,function(){c.beat(1,2200);r.val.classList.add('shim')});
      c.at(1100,function(){r.val.classList.remove('shim');c.type(r.val,'Driver B at fault',420);r.ans.classList.add('ai')});
      c.at(2500,function(){c.beat(2,2600);c.stage.classList.add('shift');r.srcs.classList.add('open')});
      c.at(3000,function(){c.to(r.s1,.4,.5)});c.at(3900,function(){c.click(r.s1,.4,.5);r.d1.className='doc ai lit';r.h1.className='hl-ai'});
      c.at(5200,function(){c.beat(3,3000);c.hide();r.d2.style.opacity=1});
      c.at(5900,function(){r.d2.className='doc hu lit';r.h2.className='hl-hu';r.ans.className='box hu';r.tag.className='pill p-hu';r.tag.textContent='Sources disagree'});
      c.at(6800,function(){r.ans.style.display='none';r.split.classList.add('open');r.note.textContent='Shown side by side · not averaged'});
      c.at(8300,function(){c.beat(4,2800);c.to(r.o1)});c.at(9300,function(){c.click(r.o1);r.o1.className='box ok sel';r.o2.className='box dimmed';r.tag.className='pill p-live';r.tag.textContent='Set by Lucy';r.note.textContent='Statement kept on file'});
      c.at(10200,function(){c.hide();c.stage.classList.add('end')});return 13200}};
  /* 03 autonomy */
  SC[2]=function(c){var r=c.r,O=[['Suggest only','The AI proposes. People do the work.'],['Draft for approval','The AI prepares. A person signs every draft.'],['Auto within guardrails','The AI acts above 85%. People audit a sample.']];
    r.opts.innerHTML=O.map(function(o){return'<div class="box opt"><span class="radio"></span><div><span class="v" style="font-size:calc(var(--u)*1.55)">'+o[0]+'</span><span class="small">'+o[1]+'</span></div></div>'}).join('');
    var opts=[].slice.call(r.opts.children),T=['Read documents','Fill the claim','Request missing photos','Payout over $10k','Deny for fraud'],W=[['AI suggests','p-ai'],['AI drafts · you sign','p-ai'],['AI acts','p-ai']];
    r.tasks.innerHTML=T.map(function(t,i){return'<div class="task"><span>'+t+'</span><span class="pill '+(i>2?'p-hu':'p-ai')+'">'+(i>2?'🔒 Person':'—')+'</span></div>'}).join('');
    var pills=[].slice.call(r.tasks.querySelectorAll('.pill'));
    function level(n){opts.forEach(function(o,i){o.classList.toggle('sel',i===n)});pills.forEach(function(p,i){if(i>2)return;p.className='pill '+(n===0?'p-n':'p-ai');p.textContent=n===0?'You · AI suggests':W[n][0];p.classList.add('press');setTimeout(function(){p.classList.remove('press')},250)})}
    return function(){c.base();opts.forEach(function(o){o.classList.remove('sel')});pills.forEach(function(p,i){if(i<3){p.className='pill p-n';p.textContent='—'}});r.lockmsg.classList.remove('open');r.pol.className='box';
      c.at(300,function(){c.stage.classList.add('shift');c.beat(1,2600);c.to(opts[0],.08,.3)});c.at(1200,function(){c.click(opts[0],.08,.3);level(0)});
      c.at(3000,function(){c.beat(2,2600);c.to(opts[1],.08,.3)});c.at(3900,function(){c.click(opts[1],.08,.3);level(1)});
      c.at(5700,function(){c.beat(3,2600);c.to(opts[2],.08,.3)});c.at(6600,function(){c.click(opts[2],.08,.3);level(2)});
      c.at(8400,function(){c.beat(4,3200);c.to(r.track,.85,.5)});
      c.at(9300,function(){c.click(r.track,.85,.5);r.track.classList.remove('shake');void r.track.offsetWidth;r.track.classList.add('shake');r.pol.className='box hu';r.lockmsg.classList.add('open');pills.slice(3).forEach(function(p){p.classList.add('press');setTimeout(function(){p.classList.remove('press')},300)})});
      c.at(10600,function(){c.hide();c.stage.classList.add('end')});return 13600}};
  /* 04 batch */
  SC[3]=function(c){var r=c.r,N=[['Talleres Nimbo SA','10458'],['Kiwa Logistics SRL','10461'],['Paula Ferreyra','10466'],['Andes Textil','10470'],['R. Benítez','10473'],['Lumen Foods','10477']];
    r.cases.innerHTML=N.map(function(n){return'<div class="box case"><div><span class="nm">'+n[0]+'</span> <span class="sub">CASE-'+n[1]+'</span></div><span class="pill p-live">Low</span></div>'}).join('')+'<div class="sub" style="padding-left:calc(var(--u)*1.2)">+ 56 more</div>';
    var rows=[].slice.call(r.cases.querySelectorAll('.case')),pick=[1,3,4];
    return function(){c.base();rows.forEach(function(x){x.className='box case';x.querySelector('.pill').className='pill p-live';x.querySelector('.pill').textContent='Low'});r.ban.classList.remove('open');r.sign.className='sb';r.sign.textContent='Sign 62 cases';r.note.textContent='Review a sample first';r.state.className='pill p-n';r.state.textContent='Ready';r.owner.classList.remove('in');
      r.sn.textContent='1';r.scid.textContent='CASE-10461';r.scn.textContent='Kiwa Logistics SRL';r.scr.textContent='Name check · clear';r.sc.className='box';r.flag.className='sb ghost';r.okb.className='sb on';
      c.at(300,function(){c.beat(1,2400);rows.forEach(function(x,i){x.style.transitionDelay=(i*60)+'ms';x.classList.add('ai');setTimeout(function(){x.classList.remove('ai')},700+i*60)})});
      c.at(2600,function(){c.beat(2,3200);r.state.className='pill p-hu';r.state.textContent='Sampling 3'});pick.forEach(function(p,j){c.at(2600+j*350,function(){rows[p].classList.add('hu');var pl=rows[p].querySelector('.pill');pl.className='pill p-hu';pl.textContent='Sample '+(j+1)})});
      c.at(3600,function(){c.stage.classList.add('shift')});
      c.at(4500,function(){c.to(r.okb)});c.at(5300,function(){c.click(r.okb);rows[1].className='box case ok';rows[1].querySelector('.pill').className='pill p-live';rows[1].querySelector('.pill').textContent='✓ Checked'});
      c.at(5700,function(){c.beat(3,3000);r.sn.textContent='2';r.scid.textContent='CASE-10470';r.scn.textContent='Andes Textil';r.scr.textContent='Name check · possible match';r.sc.className='box hu'});
      c.at(6300,function(){c.to(r.flag)});c.at(7100,function(){c.click(r.flag);r.flag.className='sb on';r.flag.style.background='var(--risk)';rows[3].className='box case bad';rows[3].querySelector('.pill').className='pill p-risk';rows[3].querySelector('.pill').textContent='✕ Flagged'});
      c.at(7600,function(){rows.forEach(function(x,i){if(i!==3&&i!==1)x.classList.add('dimmed')});r.ban.classList.add('open');r.state.className='pill p-risk';r.state.textContent='Paused';r.sign.textContent='🔒 Sign 62 cases';r.note.textContent='Back to individual review'});
      c.at(8800,function(){c.beat(4,2600);c.hide();r.owner.classList.add('in')});
      c.at(10600,function(){c.stage.classList.add('end');r.flag.style.background=''});return 13600}};
  /* 05 partial failure */
  SC[4]=function(c){var r=c.r,A=['Context','Risk score','Sanctions','Drafting'];
    r.agents.innerHTML=A.map(function(a){return'<div class="box agent"><span class="dot"></span><span class="v" style="font-size:calc(var(--u)*1.45)">'+a+'</span><span class="sub" data-s></span><span class="prog"><i></i></span></div>'}).join('');
    var ag=[].slice.call(r.agents.children);function st(i,cls,txt,w){var a=ag[i];a.className='box agent '+(cls||'');a.querySelector('[data-s]').innerHTML=txt;if(w!=null)a.querySelector('.prog i').style.width=w+'%'}
    return function(){c.base();ag.forEach(function(a,i){st(i,'','',0)});r.state.className='pill p-ai pulse';r.state.innerHTML='<i></i>4 agents';r.rec.className='sb';r.rec.textContent='Recommendation';r.note.textContent='';r.acts.classList.add('open');r.form.classList.remove('open');r.ctx.textContent='';r.manual.className='sb on wide';
      c.at(300,function(){c.beat(1,2400);st(0,'','<span class="spin">⟳</span> reading core banking',35);st(1,'','scoring',45);st(2,'','screening lists',40);st(3,'wait','waiting',0)});
      c.at(1400,function(){st(1,'','scoring',80);st(2,'','screening lists',75)});
      c.at(2400,function(){c.beat(2,3000);st(0,'','⟳ retry 1/3 · 30s time-out',40);st(1,'done','✓ done',100)});
      c.at(3300,function(){st(0,'','⟳ retry 2/3 · 30s time-out',42);st(2,'done','✓ done',100)});
      c.at(4200,function(){st(0,'','⟳ retry 3/3 · 30s time-out',44)});
      c.at(5000,function(){st(0,'fail','✕ failed · core banking time-out',44);st(3,'wait','waiting for Context',0);r.state.className='pill p-risk';r.state.textContent='1 agent failed';r.note.textContent='Risk and Sanctions results kept'});
      c.at(5600,function(){c.beat(3,2600);c.stage.classList.add('shift')});
      c.at(7300,function(){c.beat(4,3600);c.to(r.manual)});c.at(8200,function(){c.click(r.manual)});
      c.at(8400,function(){r.acts.classList.remove('open');r.form.classList.add('open');c.hide()});
      c.at(8900,function(){c.type(r.ctx,'Customer since 2019 · 2 accounts · salary deposits',900)});
      c.at(10000,function(){st(0,'man','✓ added by Lucy',100);st(3,'','drafting…',60);r.state.className='pill p-ai pulse';r.state.innerHTML='<i></i>Drafting'});
      c.at(11000,function(){st(3,'done','✓ done',100);r.state.className='pill p-live';r.state.textContent='Ready';r.rec.className='sb on';r.note.textContent='1 input from a person'});
      c.at(11600,function(){c.stage.classList.add('end')});return 14600}};
  /* 06 assumed */
  SC[5]=function(c){var r=c.r,chips=[].slice.call(r.chips.children);
    return function(){c.base();r.bub.classList.remove('in');r.why.classList.remove('in');['v1','v2','v3'].forEach(function(k){r[k].textContent=''});r.r2.className='box';r.ul.className='ul';r.as.classList.remove('open');r.pick.classList.remove('open');r.asp.className='pill p-hu';r.asp.textContent='Assumed · tap to change';chips.forEach(function(x){x.classList.remove('pick')});
      c.at(300,function(){c.beat(1,2000);r.bub.classList.add('in')});
      c.at(2300,function(){c.beat(2,2600);r.v1.classList.add('shim')});
      c.at(2900,function(){r.v1.classList.remove('shim');c.type(r.v1,'Teriyaki chicken',420);r.v2.parentNode.parentNode.classList.add('shim')});
      c.at(3600,function(){r.v2.parentNode.parentNode.classList.remove('shim');c.type(r.v2,'8:00 pm',260);r.v3.classList.add('shim')});
      c.at(4200,function(){r.v3.classList.remove('shim');c.type(r.v3,'2 people',260)});
      c.at(5000,function(){c.beat(3,2800);c.stage.classList.add('shift');r.bub.classList.remove('in');r.r2.className='box hu';r.ul.className='ul hu';r.as.classList.add('open')});
      c.at(5600,function(){r.why.classList.add('in')});
      c.at(7800,function(){c.beat(4,3200);r.why.classList.remove('in');c.to(r.asp)});c.at(8700,function(){c.click(r.asp);r.pick.classList.add('open')});
      c.at(9500,function(){c.to(chips[1])});c.at(10400,function(){c.click(chips[1]);chips[1].classList.add('pick')});
      c.at(10700,function(){r.v2.textContent='7:30 pm';r.r2.className='box ok';r.ul.className='ul ok';r.asp.className='pill p-live';r.asp.textContent='✓ Set by you';r.pick.classList.remove('open');c.hide()});
      c.at(11400,function(){c.stage.classList.add('end')});return 14000}};


  /* mount: inject each scene, then play it while on screen (or show its last step when motion is reduced) */
  var stages=[].slice.call(document.querySelectorAll('.pstage'));if(!stages.length)return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  stages.forEach(function(st){st.querySelector('.scene').insertAdjacentHTML('afterbegin',M[+st.dataset.i])});
  var S=stages.map(function(st){var c=Ctx(st);return{st:st,c:c,run:SC[+st.dataset.i](c),on:false,vis:false,play:!reduce,shown:false}});
  function still(s){var c=s.c;c.clear();c.jump=true;c.q=[];s.run();c.q.sort(function(a,b){return a[0]-b[0]}).forEach(function(x){x[1]()});c.jump=false;c.q=[];s.st.classList.remove('end');c.hide();c.beat(4,0);s.shown=true}
  function loop(s){if(!s.vis||!s.play){s.on=false;return}s.on=true;var L=s.run();s.c.at(L,function(){s.on=false;loop(s)})}
  function label(s){var b=s.st.querySelector('.ctl');b.textContent=s.play?s.st.dataset.pause:'▶ '+s.st.dataset.play;b.setAttribute('aria-pressed',String(!s.play))}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){var s=S[stages.indexOf(e.target)];s.vis=e.isIntersecting;
    if(s.vis){if(s.play){if(!s.on)loop(s)}else if(!s.shown)still(s)}else{s.c.clear();s.on=false}})},{threshold:.25});
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){stages.forEach(function(st){io.observe(st)})});
  S.forEach(function(s){label(s);s.st.querySelector('.ctl').addEventListener('click',function(){s.play=!s.play;s.c.clear();s.on=false;
    if(s.play){s.st.classList.add('force-motion');loop(s)}else{still(s)}label(s)})});

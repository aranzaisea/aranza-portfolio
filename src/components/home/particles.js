  var canvas=document.getElementById('field');if(!canvas)return;
  var L={};try{L=JSON.parse(canvas.dataset.labels)}catch(e){}
  var gl=canvas.getContext('webgl',{antialias:false,alpha:true,premultipliedAlpha:true,powerPreference:'high-performance'});
  if(!gl){document.documentElement.classList.add('no-gl');return}

  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CAM=6.0, F=1/Math.tan(25*Math.PI/180);
  var small=innerWidth<760;
  var N=small?20000:52000;

  var vs=[
  'attribute vec3 pn;attribute vec3 p0;attribute vec3 p1;attribute vec3 p2;attribute vec3 p3;attribute vec4 r;attribute float k;attribute float lb;',
  'uniform float uStage,uTime,uAspect,uF,uCam,uPix,uCx,uRepel,uIntro,uShift,uCre,uRea,uSpin;uniform vec2 uMouse;',
  'varying vec3 vCol;varying float vA;',
  'float seg(float s,float i){float t=clamp(s-i,0.,1.);t=clamp((t-r.x*.35)/.65,0.,1.);return t*t*(3.-2.*t);}',
  'void main(){',
  ' float s=uStage;',
  ' float it=clamp((uIntro-r.x*.45)/.55,0.,1.);it=it<.5?4.*it*it*it:1.-pow(-2.*it+2.,3.)/2.;',
  ' vec3 p=mix(pn,p0+vec3(0.,uShift,0.),it);',
  ' p=mix(p,p1,seg(s,0.));p=mix(p,p2,seg(s,1.));p=mix(p,p3,seg(s,2.));',
  ' float chaos=1.-it;float tr=abs(sin(clamp(s,0.,3.)*3.14159));',
  ' float w1=clamp(1.-abs(s-1.),0.,1.);float w3=clamp(s-2.,0.,1.);',
  ' p+=vec3(sin(uTime*(.3+r.y)+r.z*6.283),cos(uTime*(.25+r.z)+r.w*6.283),sin(uTime*(.2+r.w)+r.y*6.283))*(.004+.35*chaos+.55*tr);',
  ' p.y+=sin(p.x*2.4-uTime*1.3+r.y*.5)*.05*w1;',
  ' float ccx=uCx*w3;vec3 q=p-vec3(ccx,0.,0.);float a=chaos*2.6+tr*.9*(r.y-.5)+uSpin*w3;float ca=cos(a),sa=sin(a);q.xz=vec2(ca*q.x-sa*q.z,sa*q.x+ca*q.z);p=q+vec3(ccx,0.,0.);',
  ' float tl=.32*w3;float ct=cos(tl),st=sin(tl);p.yz=vec2(ct*p.y-st*p.z,st*p.y+ct*p.z);',
  ' float ry=uMouse.x*.07,rx=-uMouse.y*.05;float cy=cos(ry),sy=sin(ry);p.xz=vec2(cy*p.x-sy*p.z,sy*p.x+cy*p.z);float cx=cos(rx),sx=sin(rx);p.yz=vec2(cx*p.y-sx*p.z,sx*p.y+cx*p.z);',
  ' float hd=(uCam-p.z)/uF;vec2 mw=uMouse*vec2(hd*uAspect,hd);vec2 d=p.xy-mw;float L=length(d);float R=.85*hd/(uCam/uF);',
  ' if(L<R){vec2 dir=d/(L+1e-4);float f=(R-L);p.xy+=(dir*f*1.25+vec2(-dir.y,dir.x)*f*.5)*uRepel;p.z+=f*.8*uRepel*(r.z-.3);}',
  ' float w=max(uCam-p.z,.6);',
  ' gl_Position=vec4(p.x*uF/uAspect,p.y*uF,0.,w);',
  ' float base=(k>.5&&k<2.5?1.9:1.45)*(.7+r.w*.6);',
  ' gl_PointSize=min(uPix*base*(uCam/w)*(1.+1.8*chaos+.6*tr),30.);',
  ' vCol=k<.5?vec3(.278,.341,.812):(k<1.5?vec3(.86,.53,.08):(k<2.5?vec3(.118,.518,.322):vec3(.078,.102,.149)));',
  ' vA=(k>2.5?.9:.88)*smoothstep(16.,3.5,w)*(1.-.35*chaos)*(.82+.18*sin(uTime*1.7+r.z*40.));',
  ' float lit=lb>1.5?uRea:(lb>.5?uCre:0.);',
  ' vec3 litCol=lb>1.5?vec3(.278,.341,.812):vec3(.88,.52,.06);',
  ' vec3 bc=lb<-.5?vec3(.55,.59,.68):mix(vec3(.40,.45,.58),litCol,lit);',
  ' vCol=mix(vCol,bc,w3);',
  ' vA*=mix(1.,lb<-.5?.45:(.6+.5*lit),w3);',
  ' gl_PointSize*=mix(1.,1.+.55*lit,w3);',
  '}'].join('\n');
  var fs=['precision mediump float;varying vec3 vCol;varying float vA;',
  'void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,.1,d);gl_FragColor=vec4(vCol*a*vA,a*vA);}'].join('\n');

  function sh(t,src){var s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){throw new Error(gl.getShaderInfoLog(s))}return s}
  var prog;
  try{prog=gl.createProgram();gl.attachShader(prog,sh(gl.VERTEX_SHADER,vs));gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(prog);if(!gl.getProgramParameter(prog,gl.LINK_STATUS))throw new Error('link')}
  catch(e){document.documentElement.classList.add('no-gl');return}
  gl.useProgram(prog);

  function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

  var bufs={};
  function attr(name,data,size){
    var loc=gl.getAttribLocation(prog,name);if(loc<0)return;
    if(!bufs[name])bufs[name]=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,bufs[name]);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
    gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,0,0);
  }

  // sample the real h1 so the particles write the name exactly where the text sits
  var h1=document.querySelector('h1.name');
  function sampleName(){
    var rect=h1.getBoundingClientRect(),cs=getComputedStyle(h1),S=2;
    var W=Math.ceil(rect.width*S),H=Math.ceil(rect.height*S);if(W<10||H<10)return null;
    var c=document.createElement('canvas');c.width=W;c.height=H;var x=c.getContext('2d');
    x.font=cs.fontWeight+' '+(parseFloat(cs.fontSize)*S)+'px '+cs.fontFamily;
    try{x.letterSpacing=(parseFloat(cs.letterSpacing)*S||0)+'px'}catch(e){}
    x.textBaseline='middle';x.fillStyle='#000';x.fillText(h1.textContent.trim(),0,H/2+parseFloat(cs.fontSize)*S*0.04);
    var d=x.getImageData(0,0,W,H).data,pts=[];
    for(var yy=0;yy<H;yy+=1)for(var xx=0;xx<W;xx+=1){if(d[(yy*W+xx)*4+3]>128)pts.push(rect.left+xx/S,rect.top+scrollY+yy/S)}
    return pts.length?pts:null;
  }

  // A point on a stylised brain, in brain space (x: left-right, y: up, z: front).
  // Returns [x,y,z,lobe] with lobe 0 = none, 1 = creativity (right hemisphere, back two thirds),
  // 2 = reasoning (prefrontal), or null for ambient dust (about 14%).
  var CRE_C=[0,0,0],REA_C=[0,0,0],cN=0,rN=0;
  function brainPoint(R){
    var u=R();
    if(u<0.14)return null;
    if(u<0.205){ // cerebellum: back and below, with fine horizontal folds
      for(var t=0;t<12;t++){var th=R()*6.283,ph=Math.acos(2*R()-1),dx=Math.sin(ph)*Math.cos(th),dy=Math.cos(ph),dz=Math.sin(ph)*Math.sin(th);
        var x=dx*0.5,y=-0.42+dy*0.22,z=-0.86+dz*0.3;if(y>-0.3&&z>-0.8)continue;if(Math.abs(Math.sin(y*42))<0.45||R()<0.15)return[x,y,z,0]}
      return[0,-0.5,-0.9,0];
    }
    if(u<0.22){var a=R()*6.283,h=R();return[Math.cos(a)*0.11,-0.42-h*0.42,-0.38+Math.sin(a)*0.11-h*0.12,0]} // stem
    for(var t2=0;t2<20;t2++){
      var hs=R()<0.5?-1:1,th3=R()*6.283,ph3=Math.acos(2*R()-1),dx2=Math.sin(ph3)*Math.cos(th3),dy2=Math.cos(ph3),dz2=Math.sin(ph3)*Math.sin(th3);
      var rx=dx2*hs<0?0.36:0.64,ry=dy2<0?0.52:0.84,rz=1.18;
      if(dz2>0)ry*=0.92;                                            // frontal lobe slightly lower
      var tb=Math.exp(-Math.pow(dy2+0.4,2)/0.05)*(dx2*hs>0?1:0)*(dz2>-0.3&&dz2<0.7?1:0); // temporal bulge
      var x2=hs*0.38+dx2*rx*(1+0.1*tb),y2=0.08+dy2*ry,z2=dz2*rz*(1+0.05*tb);
      var g=Math.sin(x2*7+Math.sin(z2*5)*1.3)+Math.sin(z2*6.5+Math.sin(y2*6)*1.4)+Math.sin(y2*7.5+x2*2.2);
      var groove=Math.abs(g)<0.26;
      if(!groove&&R()>0.16)continue;
      var k2=(groove?0.965:1.0)+0.02*R();
      x2=hs*0.38+(x2-hs*0.38)*k2;y2=0.08+(y2-0.08)*k2;z2=z2*k2;
      var zn=z2/1.18,lobe=0;
      if(zn>0.42&&y2>-0.35)lobe=2;
      else if(hs>0&&zn<0.25&&y2>-0.45)lobe=1;
      return[x2,y2,z2,lobe];
    }
    return[0.4,0.5,0,0];
  }
  var cxWorld=0,cyWorld=0,halfHW=CAM/F;
  function build(aspect){
    var R=rng(7),halfH=CAM/F,halfW=halfH*aspect,wide=aspect>1.05;
    var cx=wide?halfW*0.44:0, cy=wide?0.1:0.35, sc=wide?1:0.78;
    cxWorld=cx;cyWorld=cy;
    var LB=new Float32Array(N),BS=1.22*sc;
    var PN=new Float32Array(N*3),P0=new Float32Array(N*3),P1=new Float32Array(N*3),P2=new Float32Array(N*3),P3=new Float32Array(N*3),RR=new Float32Array(N*4),K=new Float32Array(N);
    var nodes=[];for(var n=0;n<26;n++){nodes.push([Math.round((R()*2-1)*halfW*1.3/0.34)*0.34,-Math.round(R()*16)*0.34-0.4,0.25+R()*R()*1.6])}
    var tilts=[[0.35,0.2],[-0.55,0.55],[1.15,-0.35]],radii=[0.95,1.38,1.85];
    var pts=sampleName(),np=pts?pts.length/2:0,VW=innerWidth,VH=innerHeight;
    for(var i=0;i<N;i++){
      var u=R(),kind=u<0.10?1:(u<0.14?2:(u<0.52?0:3));K[i]=kind;
      RR[i*4]=R();RR[i*4+1]=R();RR[i*4+2]=R();RR[i*4+3]=R();
      // intro · noise: a swarm filling the whole volume, some particles close to the camera
      PN[i*3]=(R()*2-1)*halfW*1.6;PN[i*3+1]=(R()*2-1)*halfH*1.6;PN[i*3+2]=3.8-R()*12;
      // stage 0 · the name, written by every particle
      if(np){var j=Math.floor(R()*np)*2,px=pts[j]+R()*0.5,py=pts[j+1]+R()*0.5;
        P0[i*3]=(px/VW*2-1)*halfW;P0[i*3+1]=-(py/VH*2-1)*halfH;P0[i*3+2]=(R()-0.5)*0.22;}
      else{P0[i*3]=PN[i*3]*0.3;P0[i*3+1]=PN[i*3+1]*0.3;P0[i*3+2]=0}
      // stage 1 · signal: 9 waveforms, the amber line is the human decision running through
      var li=kind===1?4:(function(){var v=Math.floor(R()*8);return v>=4?v+1:v})();
      var x=(R()*2-1)*halfW*1.08,t=x/halfW,env=Math.exp(-t*t*1.5);
      var y=(li-4)*0.17*sc+Math.sin(x*(1.5+li*0.17)+li*0.8)*0.6*env*(1-Math.abs(li-4)*0.08)*sc+(R()-0.5)*0.018;
      P1[i*3]=x;P1[i*3+1]=y+(wide?-0.2:0.4);P1[i*3+2]=(R()-0.5)*0.25;
      // stage 2 · structure: a lattice floor with data columns (amber/green) rising from it
      if(kind===0||kind===3){
        var gx,gz,step=0.34;
        if(R()<0.5){gx=(R()*2-1)*halfW*1.4;gz=-Math.round(R()*20)*step+0.6}
        else{gx=Math.round((R()*2-1)*halfW*1.4/step)*step;gz=0.6-R()*20*step}
        P2[i*3]=gx;P2[i*3+1]=-1.7+(R()-0.5)*0.01;P2[i*3+2]=gz;
      }else{
        var nd=nodes[Math.floor(R()*nodes.length)];
        P2[i*3]=nd[0]+(R()-0.5)*0.05;P2[i*3+1]=-1.7+R()*nd[2];P2[i*3+2]=nd[1]+(R()-0.5)*0.05;
      }
      // stage 3 · brain: cerebrum with folds, cerebellum, stem; lobes light up in turn
      var bp=brainPoint(R);
      if(bp){P3[i*3]=cx+bp[0]*BS;P3[i*3+1]=cy+bp[1]*BS;P3[i*3+2]=bp[2]*BS;LB[i]=bp[3]}
      else{var th2=R()*6.283,ph2=Math.acos(2*R()-1),r3=(2.4+R()*1.6)*sc;
        P3[i*3]=cx+r3*Math.sin(ph2)*Math.cos(th2);P3[i*3+1]=cy+r3*Math.cos(ph2)*0.75;P3[i*3+2]=r3*Math.sin(ph2)*Math.sin(th2);LB[i]=-1}
    }
    attr('pn',PN,3);attr('p0',P0,3);attr('p1',P1,3);attr('p2',P2,3);attr('p3',P3,3);attr('r',RR,4);attr('k',K,1);attr('lb',LB,1);
    if(np)document.documentElement.classList.add('gl-name');
    CRE_C=[cx+0.62*BS,cy+0.35*BS,-0.35*BS];REA_C=[cx+0.05*BS,cy+0.35*BS,1.0*BS];
    built=true;
  }

  var U={};['uStage','uTime','uAspect','uF','uCam','uPix','uCx','uRepel','uMouse','uIntro','uShift','uCre','uRea','uSpin'].forEach(function(n){U[n]=gl.getUniformLocation(prog,n)});
  gl.disable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);

  var dpr=1,aspect=1,built=false,ready=false,lastW=0;
  function resize(){
    dpr=Math.min(devicePixelRatio||1,1.75);
    var w=innerWidth,h=innerHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
    gl.viewport(0,0,canvas.width,canvas.height);
    var na=w/h;
    if(ready&&(w!==lastW||Math.abs(na-aspect)>0.15||!built)){aspect=na;lastW=w;build(aspect)}else if(!built){aspect=na}
    measure();
  }

  // scroll → stage
  var secs=[].slice.call(document.querySelectorAll('[data-stage]')),anchors=[];
  function measure(){anchors=secs.map(function(s){return{y:s.getBoundingClientRect().top+scrollY,s:+s.dataset.stage}})}
  function targetStage(){
    var vh=innerHeight,st=anchors[0].s;
    for(var i=0;i<anchors.length-1;i++){
      var a=anchors[i],b=anchors[i+1];
      var start=Math.max(b.y-vh*0.9,a.y+(b.y-a.y)*0.35),f=Math.min(1,Math.max(0,(scrollY-start)/(vh*0.5)));if(i===0||f>0)st=a.s+(b.s-a.s)*f;
    }
    return st;
  }

  var names=L.names||['name','signal','structure','brain'];
  var tagCre=document.getElementById('lobeCre'),tagRea=document.getElementById('lobeRea');
  if(tagCre)tagCre.textContent=L.cre||'creativity';if(tagRea)tagRea.textContent=L.rea||'reasoning';
  function bump(t,a,b,f){return Math.min(1,Math.max(0,Math.min((t-a)/f,(b-t)/f)))}
  function ease(x){return x*x*(3-2*x)}
  function project(c,spin,w3){
    var x=c[0]-cxWorld*w3,y=c[1],z=c[2],ca=Math.cos(spin),sa=Math.sin(spin);
    var qx=ca*x-sa*z,qz=sa*x+ca*z;x=qx+cxWorld*w3;z=qz;
    var tl=0.32*w3,ct=Math.cos(tl),st=Math.sin(tl),y2=ct*y-st*z;z=st*y+ct*z;y=y2;
    var ry=mouse[0]*.07,rx=-mouse[1]*.05,cy=Math.cos(ry),sy=Math.sin(ry);qx=cy*x-sy*z;z=sy*x+cy*z;x=qx;
    var cx=Math.cos(rx),sx=Math.sin(rx);y2=cx*y-sx*z;z=sx*y+cx*z;y=y2;
    var w=Math.max(CAM-z,.6);return[(x*F/aspect/w+1)/2*innerWidth,(1-y*F/w)/2*innerHeight,z];
  }
  var hudStage=document.getElementById('hudStage'),hudBar=document.getElementById('hudBar'),hudVal=document.getElementById('hudVal');
  var intro=reduce?1:0,stage=0,mouse=[0,0],mT=[0,0],time=reduce?14:0,moving=!reduce,hover=false,last=performance.now(),running=true;

  addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;hover=true;mT[0]=e.clientX/innerWidth*2-1;mT[1]=-(e.clientY/innerHeight*2-1)});
  document.addEventListener('pointerleave',function(){hover=false});
  addEventListener('resize',resize);
  addEventListener('load',measure);
  document.addEventListener('visibilitychange',function(){running=!document.hidden;if(running){last=performance.now();requestAnimationFrame(frame)}});

  var pause=document.getElementById('pause'),heroPlay=document.getElementById('heroPlay'),heroNote=document.getElementById('heroNote');
  function setPause(p,replay){moving=!p;pause.setAttribute('aria-pressed',String(p));pause.textContent=p?(L.play||'play motion'):(L.pause||'pause motion');
    heroPlay.textContent=p?(L.playAnim||'▶  Play animation'):(L.replay||'↻  Replay');heroPlay.setAttribute('aria-pressed',String(!p));
    if(replay)intro=0}
  if(reduce){heroNote.hidden=false}
  setPause(reduce);
  pause.addEventListener('click',function(){setPause(moving)});
  heroPlay.addEventListener('click',function(){setPause(false,true)});

  function frame(now){
    if(!running)return;
    var dt=Math.min(0.05,(now-last)/1000);last=now;
    if(!built){requestAnimationFrame(frame);return}
    if(moving){time+=dt;intro=Math.min(1,intro+dt/3.0)}
    var ts=targetStage();stage+=(ts-stage)*Math.min(1,dt*3.0);
    var tm=(moving&&hover)?mT:[0,0];mouse[0]+=(tm[0]-mouse[0])*Math.min(1,dt*6);mouse[1]+=(tm[1]-mouse[1])*Math.min(1,dt*6);
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(U.uStage,stage);gl.uniform1f(U.uTime,time);gl.uniform1f(U.uAspect,aspect);gl.uniform1f(U.uF,F);gl.uniform1f(U.uCam,CAM);
    gl.uniform1f(U.uPix,dpr);gl.uniform1f(U.uCx,cxWorld);gl.uniform1f(U.uRepel,moving&&hover?1:0);gl.uniform2f(U.uMouse,mouse[0],mouse[1]);gl.uniform1f(U.uIntro,intro);
    gl.uniform1f(U.uShift,scrollY/innerHeight*2*halfHW);
    var w3=Math.min(1,Math.max(0,stage-2)),ct=time%8,cre=ease(bump(ct,0.2,3.6,0.8)),rea=ease(bump(ct,4.2,7.6,0.8)),spin=time*0.28;
    gl.uniform1f(U.uCre,cre);gl.uniform1f(U.uRea,rea);gl.uniform1f(U.uSpin,spin);
    [[tagCre,CRE_C,cre],[tagRea,REA_C,rea]].forEach(function(o){if(!o[0])return;var q=project(o[1],spin*w3,w3),vis=o[2]*Math.max(0,w3*2-1)*(q[2]>-0.6?1:0.25);
      o[0].style.transform='translate('+q[0].toFixed(1)+'px,'+q[1].toFixed(1)+'px) translate(-50%,-160%)';o[0].style.opacity=vis.toFixed(3)});
    gl.drawArrays(gl.POINTS,0,N);
    var v=stage/3;hudBar.style.width=(v*100).toFixed(1)+'%';hudVal.textContent=v.toFixed(2);hudStage.textContent=intro<0.98?(L.noise||'noise'):(stage>2.5?(cre>rea?(L.cre||'creativity'):(L.rea||'reasoning')):names[Math.min(3,Math.round(stage))]);
    requestAnimationFrame(frame);
  }
  resize();
  requestAnimationFrame(frame);
  var go=function(){if(ready)return;ready=true;resize()};
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(go);setTimeout(go,2500)}else go();

  var canvas=document.getElementById('field');if(!canvas)return;
  var L={};try{L=JSON.parse(canvas.dataset.labels)}catch(e){}
  var gl=canvas.getContext('webgl',{antialias:false,alpha:true,premultipliedAlpha:true,powerPreference:'high-performance'});
  if(!gl){document.documentElement.classList.add('no-gl');return}

  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CAM=6.0, F=1/Math.tan(25*Math.PI/180);
  var small=innerWidth<760;
  var N=small?20000:52000;

  var vs=[
  'attribute vec3 pn;attribute vec3 p0;attribute vec3 p1;attribute vec3 p2;attribute vec3 p3;attribute vec4 r;attribute float k;',
  'uniform float uStage,uTime,uAspect,uF,uCam,uPix,uCx,uRepel,uIntro,uShift;uniform vec2 uMouse;',
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
  ' float ccx=uCx*w3;vec3 q=p-vec3(ccx,0.,0.);float a=chaos*2.6+tr*.9*(r.y-.5)+uTime*.16*w3*(k>.5&&k<1.5?-.6:1.);float ca=cos(a),sa=sin(a);q.xz=vec2(ca*q.x-sa*q.z,sa*q.x+ca*q.z);p=q+vec3(ccx,0.,0.);',
  ' float ry=uMouse.x*.07,rx=-uMouse.y*.05;float cy=cos(ry),sy=sin(ry);p.xz=vec2(cy*p.x-sy*p.z,sy*p.x+cy*p.z);float cx=cos(rx),sx=sin(rx);p.yz=vec2(cx*p.y-sx*p.z,sx*p.y+cx*p.z);',
  ' float hd=(uCam-p.z)/uF;vec2 mw=uMouse*vec2(hd*uAspect,hd);vec2 d=p.xy-mw;float L=length(d);float R=.85*hd/(uCam/uF);',
  ' if(L<R){vec2 dir=d/(L+1e-4);float f=(R-L);p.xy+=(dir*f*1.25+vec2(-dir.y,dir.x)*f*.5)*uRepel;p.z+=f*.8*uRepel*(r.z-.3);}',
  ' float w=max(uCam-p.z,.6);',
  ' gl_Position=vec4(p.x*uF/uAspect,p.y*uF,0.,w);',
  ' float base=(k>.5&&k<2.5?1.9:1.45)*(.7+r.w*.6);',
  ' gl_PointSize=min(uPix*base*(uCam/w)*(1.+1.8*chaos+.6*tr),30.);',
  ' vCol=k<.5?vec3(.278,.341,.812):(k<1.5?vec3(.86,.53,.08):(k<2.5?vec3(.118,.518,.322):vec3(.078,.102,.149)));',
  ' vA=(k>2.5?.9:.88)*smoothstep(16.,3.5,w)*(1.-.35*chaos)*(.82+.18*sin(uTime*1.7+r.z*40.));',
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

  var cxWorld=0,halfHW=CAM/F;
  function build(aspect){
    var R=rng(7),halfH=CAM/F,halfW=halfH*aspect,wide=aspect>1.05;
    var cx=wide?halfW*0.44:0, cy=wide?0.1:0.35, sc=wide?1:0.78;
    cxWorld=cx;
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
      // stage 3 · human core: amber core, AI in orbit, green on the outer ring, ink as a faint shell
      if(kind===1){
        var th=R()*6.283,ph=Math.acos(2*R()-1),rr=Math.cbrt(R())*0.38*sc;
        P3[i*3]=cx+rr*Math.sin(ph)*Math.cos(th);P3[i*3+1]=cy+rr*Math.cos(ph);P3[i*3+2]=rr*Math.sin(ph)*Math.sin(th);
      }else{
        var ring=kind===2?2:(kind===3?(R()<0.55?3:Math.floor(R()*3)):Math.floor(R()*3));
        if(ring===3){var th2=R()*6.283,ph2=Math.acos(2*R()-1),r3=(2.3+R()*1.4)*sc;
          P3[i*3]=cx+r3*Math.sin(ph2)*Math.cos(th2);P3[i*3+1]=cy+r3*Math.cos(ph2)*0.8;P3[i*3+2]=r3*Math.sin(ph2)*Math.sin(th2);}
        else{var a=R()*6.283,rad=radii[ring]*sc+(R()-0.5)*0.05,qx=Math.cos(a)*rad,qz=Math.sin(a)*rad,qy=(R()-0.5)*0.03;
          var tx=tilts[ring][0],tz=tilts[ring][1];
          var y1=qy*Math.cos(tx)-qz*Math.sin(tx),z1=qy*Math.sin(tx)+qz*Math.cos(tx);
          var x2=qx*Math.cos(tz)-y1*Math.sin(tz),y2=qx*Math.sin(tz)+y1*Math.cos(tz);
          P3[i*3]=cx+x2;P3[i*3+1]=cy+y2;P3[i*3+2]=z1;}
      }
    }
    attr('pn',PN,3);attr('p0',P0,3);attr('p1',P1,3);attr('p2',P2,3);attr('p3',P3,3);attr('r',RR,4);attr('k',K,1);
    if(np)document.documentElement.classList.add('gl-name');
    built=true;
  }

  var U={};['uStage','uTime','uAspect','uF','uCam','uPix','uCx','uRepel','uMouse','uIntro','uShift'].forEach(function(n){U[n]=gl.getUniformLocation(prog,n)});
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

  var names=L.names||['name','signal','structure','human core'];
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
    gl.drawArrays(gl.POINTS,0,N);
    var v=stage/3;hudBar.style.width=(v*100).toFixed(1)+'%';hudVal.textContent=v.toFixed(2);hudStage.textContent=intro<0.98?(L.noise||'noise'):names[Math.min(3,Math.round(stage))];
    requestAnimationFrame(frame);
  }
  resize();
  requestAnimationFrame(frame);
  var go=function(){if(ready)return;ready=true;resize()};
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(go);setTimeout(go,2500)}else go();

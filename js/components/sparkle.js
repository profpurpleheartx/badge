let layer=null;
const GLYPHS=["✦","✧","✶"];
function getLayer(){
  if(!layer){
    layer=document.createElement("div");
    layer.className="sparkle-layer";
    layer.setAttribute("aria-hidden","true");
    document.body.appendChild(layer);
  }
  return layer;
}
export function burstSparkles(x,y,color){
  if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const host=getLayer();
  const count=6+Math.floor(Math.random()*3);
  for(let i=0;i<count;i++){
    const el=document.createElement("span");
    el.className="sparkle-bit";
    el.textContent=GLYPHS[Math.floor(Math.random()*GLYPHS.length)];
    const angle=(Math.PI*2*i)/count+Math.random()*.6;
    const dist=26+Math.random()*34;
    const dx=Math.cos(angle)*dist, dy=Math.sin(angle)*dist;
    const size=10+Math.random()*10;
    el.style.left=x+"px"; el.style.top=y+"px";
    el.style.fontSize=size+"px";
    el.style.color=color||"#a77de9";
    el.style.setProperty("--dx",dx+"px");
    el.style.setProperty("--dy",dy+"px");
    el.style.setProperty("--rot",(Math.random()*140-70)+"deg");
    host.appendChild(el);
    el.addEventListener("animationend",()=>el.remove());
  }
}

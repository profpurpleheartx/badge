export function initCertTilt(){
  document.querySelectorAll(".cert").forEach(card=>{
    card.addEventListener("pointermove",e=>{
      if(e.pointerType==="touch")return;
      const b=card.getBoundingClientRect();
      const px=(e.clientX-b.left)/b.width, py=(e.clientY-b.top)/b.height;
      card.style.setProperty("--mx",`${px*100}%`);
      card.style.setProperty("--my",`${py*100}%`);
      card.style.setProperty("--rx",`${(px-0.5)*14}deg`);
      card.style.setProperty("--ry",`${(0.5-py)*14}deg`);
    });
    card.addEventListener("pointerleave",()=>{
      card.style.setProperty("--mx","50%");
      card.style.setProperty("--my","50%");
      card.style.setProperty("--rx","0deg");
      card.style.setProperty("--ry","0deg");
    });
  });
}

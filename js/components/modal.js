import {$,$$} from "../utils/dom.js";
import {burstSparkles} from "./sparkle.js";
let items=[],idx=0,imgIdx=0,lastFocused=null,ui=null,lang="it",inizializzato=false;
export function initCertificationModal(certifications=[],linguaCorrente="it",etichette){
  items=certifications; lang=linguaCorrente; ui=etichette;
  const modal=$("#modal");
  $("#close").setAttribute("aria-label",ui.chiudi);
  $("#prev").setAttribute("aria-label",ui.fotoPrecedente);
  $("#next").setAttribute("aria-label",ui.fotoSuccessiva);
  aggancia(".cert",modal);
  if(!inizializzato){ collegaControlli(modal); inizializzato=true; }
  update();
}
function currentImgs(){return (items[idx]||{}).immagini||[]}
function updateMedia(){
  const c=items[idx]||{}; const imgs=currentImgs();
  const gallery=$("#gallery"); const hasMultiple=imgs.length>1;
  if(gallery) gallery.style.display=hasMultiple?"":"none";
  $("#counter").textContent=imgs.length?`${imgIdx+1} / ${imgs.length}`:"1 / 1";
  const area=$("#modalMedia");
  if(imgs[imgIdx]){
    area.innerHTML="";
    const img=document.createElement("img");
    img.src=imgs[imgIdx];
    img.alt=`${c.nome||ui.certificazione} (${imgIdx+1}/${imgs.length})`;
    img.onerror=()=>{area.innerHTML=cartaDecorativa(c)};
    area.append(img);
  } else {
    area.innerHTML=cartaDecorativa(c);
  }
}
function cartaDecorativa(c){
  return `<div class="modal-paper"><div><strong>${escapeHtml(c.nome||"")}</strong><br><span>PLAY! POKÉMON<br>PROFESSOR CERTIFICATION</span></div></div>`;
}
function update(){
  const c=items[idx]||{}; const t=c[lang]||c.it||{};
  $("#modalName").textContent=c.nome||"";
  $("#modalDate").textContent=c.data?`${ui.ottenuta} ${c.data}`:"";
  $("#modalDetails").textContent=t.descrizione||"";
  imgIdx=0;
  updateMedia();
}
function getFocusable(modal){
  return $$("#modal button, #modal [href], #modal [tabindex]",modal)
    .filter(el=>el.tabIndex!==-1 && el.offsetParent!==null);
}
function apri(i,trigger){
  const modal=$("#modal");
  lastFocused=trigger||document.activeElement;
  modal.classList.remove("open"); void modal.offsetWidth;
  idx=i; update(); modal.classList.add("open");
  const page=$("#page"); if(page) page.setAttribute("aria-hidden","true");
  $("#close").focus();
}
function chiudi(){
  const modal=$("#modal");
  modal.classList.remove("open");
  const page=$("#page"); if(page) page.removeAttribute("aria-hidden");
  if(lastFocused&&typeof lastFocused.focus==="function"){lastFocused.focus()}
  lastFocused=null;
}
function aggancia(selettore,modal){
  $$(selettore).forEach(card=>{
    const openCard=(e)=>{
      const r=card.getBoundingClientRect();
      burstSparkles(e&&e.clientX?e.clientX:r.left+r.width/2, e&&e.clientY?e.clientY:r.top+r.height/2, "#d27bc5");
      apri(Number(card.dataset.i),card);
    };
    card.addEventListener("click",openCard);
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openCard()}});
  });
}
function collegaControlli(modal){
  $("#close").addEventListener("click",chiudi);
  modal.addEventListener("click",e=>{if(e.target===modal)chiudi()});
  $("#prev").addEventListener("click",()=>{const imgs=currentImgs(); if(imgs.length<2)return; imgIdx=(imgIdx+imgs.length-1)%imgs.length; updateMedia()});
  $("#next").addEventListener("click",()=>{const imgs=currentImgs(); if(imgs.length<2)return; imgIdx=(imgIdx+1)%imgs.length; updateMedia()});
  document.addEventListener("keydown",e=>{
    if(!modal.classList.contains("open"))return;
    if(e.key==="Escape"){chiudi();return}
    if(e.key==="ArrowLeft"){$("#prev").click();return}
    if(e.key==="ArrowRight"){$("#next").click();return}
    if(e.key==="Tab"){
      const focusable=getFocusable(modal);
      if(!focusable.length)return;
      const first=focusable[0], last=focusable[focusable.length-1];
      if(e.shiftKey){
        if(document.activeElement===first||!modal.contains(document.activeElement)){e.preventDefault();last.focus()}
      } else {
        if(document.activeElement===last||!modal.contains(document.activeElement)){e.preventDefault();first.focus()}
      }
    }
  });
}
function escapeHtml(v){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}

import {$,$$} from "../utils/dom.js";
import {burstSparkles} from "./sparkle.js";
// Finestra di approfondimento delle info-card (Dal 2022, Arezzo, Specializzazioni).
// I contenuti stanno in data/config.json, dentro "dettaglio" di ogni info-card.
let items=[],lang="it",ui=null,lastFocused=null,inizializzato=false;
export function initInfoModal(info=[],linguaCorrente="it",etichette){
  items=info; lang=linguaCorrente; ui=etichette;
  const modal=$("#infoModal");
  $("#infoClose").setAttribute("aria-label",ui.chiudi);
  $$("#info .infoitem[data-i]").forEach(card=>{
    const apriCard=(e)=>{
      const r=card.getBoundingClientRect();
      burstSparkles(e&&e.clientX?e.clientX:r.left+r.width/2, e&&e.clientY?e.clientY:r.top+r.height/2, "#d27bc5");
      apri(Number(card.dataset.i),card);
    };
    card.addEventListener("click",apriCard);
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();apriCard()}});
  });
  if(!inizializzato){ collegaControlli(modal); inizializzato=true; }
}
function contenuto(d){
  const t=d[lang]||d.it||{};
  const voci=Array.isArray(d.voci)?d.voci:[];
  let html=t.intro?`<p class="infomodalintro">${escapeHtml(t.intro)}</p>`:"";
  if(d.tipo==="timeline"){
    html+=`<ol class="infotimeline">${voci.map(v=>`<li><span class="infowhen">${escapeHtml(v.quando||"")}</span><span>${escapeHtml(v[lang]||v.it||"")}</span></li>`).join("")}</ol>`;
  } else if(d.tipo==="luoghi"){
    html+=`<ul class="infoplaces">${voci.map(v=>{
      const link=/^https:\/\//.test(v.mappa||"")?`<a class="infomap" href="${escapeHtml(v.mappa)}" target="_blank" rel="noopener">${escapeHtml(ui.apriInMappe)}</a>`:"";
      return `<li><strong>${escapeHtml(v.nome||"")}</strong><span>${escapeHtml(v.indirizzo||"")}</span>${link}</li>`;
    }).join("")}</ul>`;
  } else {
    html+=`<ul class="infolist">${voci.map(v=>{
      const vt=v[lang]||v.it||{};
      return `<li><strong>${escapeHtml(vt.titolo||"")}</strong><span>${escapeHtml(vt.testo||"")}</span></li>`;
    }).join("")}</ul>`;
  }
  return html;
}
function apri(i,trigger){
  const d=(items[i]||{}).dettaglio;
  if(!d||typeof d!=="object")return;
  const modal=$("#infoModal");
  lastFocused=trigger||document.activeElement;
  $("#infoModalTitle").textContent=(d[lang]||d.it||{}).titolo||"";
  $("#infoModalBody").innerHTML=contenuto(d);
  modal.classList.remove("open"); void modal.offsetWidth;
  modal.classList.add("open");
  const page=$("#page"); if(page) page.setAttribute("aria-hidden","true");
  $("#infoClose").focus();
}
function chiudi(){
  const modal=$("#infoModal");
  modal.classList.remove("open");
  const page=$("#page"); if(page) page.removeAttribute("aria-hidden");
  if(lastFocused&&typeof lastFocused.focus==="function"){lastFocused.focus()}
  lastFocused=null;
}
function getFocusable(modal){
  return $$("#infoModal button, #infoModal [href]",modal).filter(el=>el.tabIndex!==-1 && el.offsetParent!==null);
}
function collegaControlli(modal){
  $("#infoClose").addEventListener("click",chiudi);
  modal.addEventListener("click",e=>{if(e.target===modal)chiudi()});
  document.addEventListener("keydown",e=>{
    if(!modal.classList.contains("open"))return;
    if(e.key==="Escape"){chiudi();return}
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

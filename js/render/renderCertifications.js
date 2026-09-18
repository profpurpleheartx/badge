import {$} from "../utils/dom.js";
export function renderCertifications(items=[]){
  $("#certs").innerHTML=items.map((x,i)=>{const image=(x.immagini||[])[0]; return `<article class="cert" data-i="${i}" tabindex="0" role="button" aria-label="Apri certificazione ${escapeHtml(x.nome||"")}"><div class="cert-img ${image?"":"placeholder"}">${image?`<img src="${image}" alt="${escapeHtml(x.nome||"Certificazione")}">`:""}<span class="cert-label"><img class="pokeball-dot" src="assets/icons/pokeball.svg" alt="">Attiva</span></div><div class="cert-body"><div class="certname">${escapeHtml(x.nome||"")}</div><div class="certdate">◷ &nbsp;${escapeHtml(x.data||"")}</div><div class="certdesc">${escapeHtml(x.descrizione||"")}</div></div><div class="cert-arrow">→</div></article>`}).join("");
}
function escapeHtml(v){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}

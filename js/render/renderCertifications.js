import {$} from "../utils/dom.js";
export function renderCertifications(items=[],lang,ui){
  $("#certs").innerHTML=items.map((x,i)=>{
    const t=x[lang]||x.it||{};
    const image=(x.immagini||[])[0];
    const inRinnovo=x.stato==="in-rinnovo";
    const statoTesto=inRinnovo?ui.statoRinnovo:ui.statoAttiva;
    return `<article class="cert" data-i="${i}" tabindex="0" role="button" aria-label="${escapeHtml(ui.apriCertificazione)} ${escapeHtml(x.nome||"")}"><div class="cert-img ${image?"":"placeholder"}">${image?`<img src="${image}" alt="${escapeHtml(x.nome||ui.certificazione)}" loading="lazy" onerror="this.closest('.cert-img').classList.add('img-error');this.remove()">`:""}<span class="cert-label ${inRinnovo?"cert-label-rinnovo":""}"><img class="pokeball-dot" src="assets/icons/pokeball.svg" alt="">${escapeHtml(statoTesto)}</span></div><div class="cert-body"><div class="certname">${escapeHtml(x.nome||"")}</div><div class="certdate">◷ &nbsp;${escapeHtml(x.data||"")}</div><div class="certdesc">${escapeHtml(t.descrizione||"")}</div></div><div class="cert-arrow">→</div></article>`;
  }).join("");
}
function escapeHtml(v){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}

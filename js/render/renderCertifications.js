import {$} from "../utils/dom.js";
export function renderCertifications(items=[],lang,ui){
  $("#certs").innerHTML=items.map((x,i)=>{
    const t=x[lang]||x.it||{};
    const image=(x.immagini||[])[0];
    const inRinnovo=x.stato==="in-rinnovo";
    const statoTesto=inRinnovo?ui.statoRinnovo:ui.statoAttiva;
    return `<article class="cert" data-i="${i}" tabindex="0" role="button" aria-label="${escapeHtml(ui.apriCertificazione)} ${escapeHtml(x.nome||"")}"><div class="cert-img ${image?"":"placeholder"}">${image?`<img src="${image}" alt="${escapeHtml(x.nome||ui.certificazione)}" loading="lazy" onerror="this.closest('.cert-img').classList.add('placeholder');this.remove()">`:""}<span class="cert-label ${inRinnovo?"cert-label-rinnovo":""}"><img class="pokeball-dot" src="assets/icons/pokeball.svg" alt="">${escapeHtml(statoTesto)}</span></div><div class="cert-body"><div class="certname">${escapeHtml(x.nome||"")}</div><div class="certdate"><span style="display:inline-flex;vertical-align:-1px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12.6" r="7"/><path d="M12 9v3.6h3"/><path d="M9.8 3.4h4.4"/></svg></span> &nbsp;${escapeHtml(x.data||"")}</div><div class="certdesc">${escapeHtml(t.descrizione||"")}</div></div><div class="cert-arrow"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 12h13"/><path d="M12.5 6.5 18 12l-5.5 5.5"/></svg></div></article>`;
  }).join("");
}
function escapeHtml(v){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}

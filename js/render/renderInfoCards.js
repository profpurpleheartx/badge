import {$} from "../utils/dom.js";
export function renderInfoCards(items=[],lang,ui={}){
  $("#info").innerHTML=items.map((x,i)=>{
    const t=x[lang]||x.it||{};
    const cliccabile=!!x.dettaglio&&typeof x.dettaglio==="object"&&!Array.isArray(x.dettaglio);
    const attr=cliccabile?` role="button" tabindex="0" data-i="${i}" aria-haspopup="dialog" aria-label="${escapeHtml(`${t.titolo||""} — ${ui.apriDettagli||""}`)}"`:"";
    const freccia=cliccabile?`<span class="infoarrow" aria-hidden="true"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 5.5 16 12l-6.5 6.5"/></svg></span>`:"";
    return `<div class="infoitem${cliccabile?" infoitem-cliccabile":""}"${attr}><div class="infoicon"><img src="${x.icona||""}" alt="" loading="lazy" onerror="this.style.display='none'"></div><div><b>${escapeHtml(t.titolo||"")}</b><span>${escapeHtml(t.testo||"")}</span></div>${freccia}</div>`;
  }).join("");
}
function escapeHtml(v){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}

import {$} from "../utils/dom.js";
export function renderInfoCards(items=[],lang){
  $("#info").innerHTML=items.map(x=>{
    const t=x[lang]||x.it||{};
    return `<div class="infoitem"><div class="infoicon"><img src="${x.icona||""}" alt="" loading="lazy" onerror="this.style.display='none'"></div><div><b>${escapeHtml(t.titolo||"")}</b><span>${escapeHtml(t.testo||"")}</span></div></div>`;
  }).join("");
}
function escapeHtml(v){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}

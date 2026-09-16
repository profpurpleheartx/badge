import {$} from "../utils/dom.js";
export function renderInfoCards(items=[]){
  $("#info").innerHTML=items.map(x=>`<div class="infoitem"><div class="infoicon"><img src="${x.icona||""}" alt="" onerror="this.style.display='none'"></div><div><b>${x.titolo||""}</b><span>${x.testo||""}</span></div></div>`).join("");
}

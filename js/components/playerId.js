import {$} from "../utils/dom.js";
import {showToast} from "./toast.js";
import {burstSparkles} from "./sparkle.js";
let playerIdCorrente="",ui=null,collegato=false;
export function initPlayerId(playerId,etichette){
  playerIdCorrente=playerId; ui=etichette;
  if(collegato) return;
  collegato=true;
  $("#copy").addEventListener("click",async(e)=>{
    if(!playerIdCorrente){ showToast(ui.playerIdAssente); return; }
    const riuscito=await copiaTesto(playerIdCorrente);
    showToast(riuscito?ui.playerIdCopiato:ui.playerIdErrore);
    if(!riuscito) return;
    const r=e.currentTarget.getBoundingClientRect();
    burstSparkles(r.left+r.width/2, r.top+r.height/2, "#8d68df");
  });
}
// Prova prima l'API moderna; se non c'è o viene rifiutata (Safari datato,
// pagina non in HTTPS) ripiega su una selezione temporanea. Se fallisce
// anche quella, lo diciamo invece di fingere che sia andata bene.
async function copiaTesto(testo){
  if(navigator.clipboard&&window.isSecureContext){
    try{ await navigator.clipboard.writeText(testo); return true; }catch{ /* si prova il ripiego */ }
  }
  try{
    const area=document.createElement("textarea");
    area.value=testo;
    area.setAttribute("readonly","");
    area.style.cssText="position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    document.body.append(area);
    area.select();
    area.setSelectionRange(0,testo.length);
    const esito=document.execCommand("copy");
    area.remove();
    return !!esito;
  }catch{ return false; }
}

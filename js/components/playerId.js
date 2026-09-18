import {$} from "../utils/dom.js";
import {showToast} from "./toast.js";
import {burstSparkles} from "./sparkle.js";
export function initPlayerId(playerId){
  $("#copy").addEventListener("click",async(e)=>{
    if(!playerId){ showToast("Nessun Player ID disponibile"); return; }
    try{await navigator.clipboard.writeText(playerId)}catch{}
    showToast("Player ID copiato! ✦");
    const r=e.currentTarget.getBoundingClientRect();
    burstSparkles(r.left+r.width/2, r.top+r.height/2, "#8d68df");
  });
}

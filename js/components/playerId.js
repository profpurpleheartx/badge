import {$} from "../utils/dom.js";
import {showToast} from "./toast.js";
export function initPlayerId(playerId){
  $("#copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(playerId)}catch{} showToast("Player ID copiato! ✦")});
}

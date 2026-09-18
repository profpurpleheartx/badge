import {$} from "../utils/dom.js";
import {getRank} from "../data/ranks.js";
export function renderHero(config){
  $("#profileName").textContent=config.nome||"";
  $("#profileNickname").textContent=config.nickname||"";
  const roleEl=$("#profileRole");
  roleEl.innerHTML=`<img class="pokeball-dot" src="assets/icons/pokeball.svg" alt="">${escapeHtml(config.ruolo||"")}`;
  $("#profilePlayerId").textContent=config.playerId||"—";
  const badge=$("#profBadge");
  const rank=getRank(config.rango);
  if(rank){
    badge.innerHTML=`<img src="${rank.immagine}" alt="${escapeHtml(rank.nome)}">`;
    badge.style.setProperty("--rank-color",rank.colore);
    badge.hidden=false;
  } else {
    badge.hidden=true;
  }
  $("#profileBioText").textContent=config.bio||"";
  const avatar=$("#avatar");
  avatar.textContent="";
  if(config.avatar){ const img=document.createElement("img"); img.src=config.avatar; img.alt=config.nome?`Foto di ${config.nome}`:"Avatar"; img.onerror=()=>{img.remove(); avatar.textContent=getInitials(config.nome); avatar.classList.remove("has-image")}; avatar.append(img); avatar.classList.add("has-image"); } else { avatar.classList.remove("has-image"); avatar.textContent=getInitials(config.nome); }
}
function getInitials(name=""){return name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase()||"PH"}
function escapeHtml(v){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}

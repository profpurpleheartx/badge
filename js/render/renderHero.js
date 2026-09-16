import {$} from "../utils/dom.js";
export function renderHero(config){
  $("#profileName").textContent=config.nome||"";
  $("#profileNickname").textContent=config.nickname||"";
  $("#profileRole").textContent=`●  ${config.ruolo||""}`;
  $("#profilePlayerId").textContent=config.playerId||"";
  $("#profileBioText").textContent=config.bio||"";
  const avatar=$("#avatar");
  avatar.textContent="";
  if(config.avatar){ const img=document.createElement("img"); img.src=config.avatar; img.alt=config.nome?`Foto di ${config.nome}`:"Avatar"; img.onerror=()=>{img.remove(); avatar.textContent=getInitials(config.nome); avatar.classList.remove("has-image")}; avatar.append(img); avatar.classList.add("has-image"); } else { avatar.classList.remove("has-image"); avatar.textContent=getInitials(config.nome); }
}
function getInitials(name=""){return name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase()||"PH"}

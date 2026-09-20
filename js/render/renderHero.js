import {$} from "../utils/dom.js";
import {getRank} from "../data/ranks.js";
export function renderHero(config,lang,ui){
  const p=config.profilo||{};
  const t=(config.testi||{})[lang]||{};
  $("#profileName").textContent=p.nome||"";
  $("#profileNickname").textContent=p.nickname||"";
  $("#profileRole").innerHTML=`<img class="pokeball-dot" src="assets/icons/pokeball.svg" alt="">${escapeHtml(t.ruolo||"")}`;
  $("#playerIdLabel").textContent=ui.playerIdLabel;
  $("#profilePlayerId").textContent=p.playerId||"—";
  $("#copy").setAttribute("aria-label",ui.playerIdAria);
  const badge=$("#profBadge");
  const rank=getRank(p.rango);
  if(rank){
    badge.innerHTML=`<img src="${rank.immagine}" alt="${escapeHtml(rank.nome)}">`;
    badge.style.setProperty("--rank-color",rank.colore);
    badge.hidden=false;
  } else {
    badge.hidden=true;
  }
  $("#profileBioText").textContent=t.bio||"";
  const avatar=$("#avatar");
  avatar.textContent="";
  if(p.avatar){
    const img=document.createElement("img");
    img.src=p.avatar;
    img.alt=p.nome?`${ui.avatarDi} ${p.nome}`:"Avatar";
    img.onerror=()=>{img.remove(); avatar.textContent=getInitials(p.nome); avatar.classList.remove("has-image")};
    avatar.append(img); avatar.classList.add("has-image");
  } else {
    avatar.classList.remove("has-image");
    avatar.textContent=getInitials(p.nome);
  }
}
function getInitials(name=""){return name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase()||"PH"}
function escapeHtml(v){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}

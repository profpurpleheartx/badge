import {$,$$} from "../utils/dom.js";
let items=[],idx=0;
export function initCertificationModal(certifications=[]){
  items=certifications; const modal=$("#modal");
  const update=()=>{const c=items[idx]||{}; $("#modalName").textContent=c.nome||""; $("#modalPaper").textContent=c.nome||""; $("#modalDate").textContent=c.data?`Ottenuta: ${c.data}`:""; $("#modalDetails").textContent=c.descrizione||""; const imgs=c.immagini||[]; $("#counter").textContent=imgs.length?`1 / ${imgs.length}`:"1 / 1"; const area=$("#modalMedia"); area.innerHTML=imgs[0]?`<img src="${imgs[0]}" alt="${escapeHtml(c.nome||"Certificazione")}">`:`<div class="modal-paper"><div><strong id="modalPaper">${escapeHtml(c.nome||"")}</strong><br><span>PLAY! POKÉMON<br>PROFESSOR CERTIFICATION</span></div></div>`; };
  const open=i=>{idx=i;update();modal.classList.add("open");$("#close").focus()};
  $$(".cert").forEach(card=>{const openCard=()=>open(Number(card.dataset.i));card.addEventListener("click",openCard);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openCard()}})});
  $("#close").addEventListener("click",()=>modal.classList.remove("open")); modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});
  $("#prev").addEventListener("click",()=>{idx=(idx+items.length-1)%items.length;update()}); $("#next").addEventListener("click",()=>{idx=(idx+1)%items.length;update()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("open")});
  update();
}
function escapeHtml(v){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}

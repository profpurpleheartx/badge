import {$,$$} from "../utils/dom.js";
let items=[],idx=0,imgIdx=0;
export function initCertificationModal(certifications=[]){
  items=certifications; const modal=$("#modal");
  const currentImgs=()=>(items[idx]||{}).immagini||[];
  const updateMedia=()=>{
    const c=items[idx]||{}; const imgs=currentImgs();
    const gallery=$("#gallery"); const hasMultiple=imgs.length>1;
    if(gallery) gallery.style.display=hasMultiple?"":"none";
    $("#counter").textContent=imgs.length?`${imgIdx+1} / ${imgs.length}`:"1 / 1";
    const area=$("#modalMedia");
    area.innerHTML=imgs[imgIdx]?`<img src="${imgs[imgIdx]}" alt="${escapeHtml(c.nome||"Certificazione")} (${imgIdx+1}/${imgs.length})">`:`<div class="modal-paper"><div><strong id="modalPaper">${escapeHtml(c.nome||"")}</strong><br><span>PLAY! POKÉMON<br>PROFESSOR CERTIFICATION</span></div></div>`;
  };
  const update=()=>{
    const c=items[idx]||{};
    $("#modalName").textContent=c.nome||"";
    $("#modalDate").textContent=c.data?`Ottenuta: ${c.data}`:"";
    $("#modalDetails").textContent=c.descrizione||"";
    imgIdx=0;
    updateMedia();
  };
  const open=i=>{modal.classList.remove("open"); void modal.offsetWidth; idx=i;update();modal.classList.add("open");$("#close").focus()};
  $$(".cert").forEach(card=>{const openCard=()=>open(Number(card.dataset.i));card.addEventListener("click",openCard);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openCard()}})});
  $("#close").addEventListener("click",()=>modal.classList.remove("open")); modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});
  $("#prev").addEventListener("click",()=>{const imgs=currentImgs(); if(imgs.length<2)return; imgIdx=(imgIdx+imgs.length-1)%imgs.length; updateMedia()});
  $("#next").addEventListener("click",()=>{const imgs=currentImgs(); if(imgs.length<2)return; imgIdx=(imgIdx+1)%imgs.length; updateMedia()});
  document.addEventListener("keydown",e=>{
    if(!modal.classList.contains("open"))return;
    if(e.key==="Escape")modal.classList.remove("open");
    if(e.key==="ArrowLeft")$("#prev").click();
    if(e.key==="ArrowRight")$("#next").click();
  });
  update();
}
function escapeHtml(v){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}

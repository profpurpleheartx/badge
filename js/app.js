import {loadConfig} from "./config.js";
import {caricaDatiPubblici} from "./data/remote.js";
import {$} from "./utils/dom.js";
import {validateConfig} from "./utils/validateConfig.js";
import {getLingua,setLingua,linguaAlternativa} from "./utils/lang.js";
import {getUI} from "./data/i18n.js";
import {renderHero} from "./render/renderHero.js";
import {renderInfoCards} from "./render/renderInfoCards.js";
import {renderCertifications} from "./render/renderCertifications.js";
import {initPlayerId} from "./components/playerId.js";
import {initCertificationModal} from "./components/modal.js";
import {initCertTilt} from "./components/certTilt.js";

let config=null,lang=getLingua(),certificazioniLocali=[];

// L'app non gestisce le foto delle certificazioni: quelle restano in
// config.json. Quando le certificazioni arrivano dall'app, le foto
// vengono riabbinate per nome, così pubblicare non le fa sparire.
function immaginiDaConfig(nome){
  const trovata=certificazioniLocali.find(c=>(c.nome||"").toLowerCase()===String(nome||"").toLowerCase());
  return (trovata&&trovata.immagini)||[];
}

function disegna(){
  const ui=getUI(lang);
  document.documentElement.lang=lang;
  document.title=`Professor Hub — ${(config.profilo||{}).nome||""}`.trim().replace(/—$/,"").trim();

  $("#brandName").textContent=ui.brand;
  $("#brandAccent").textContent=ui.brandAccent;
  $("#deviceNote").textContent=ui.deviceNote;
  $("#certsTitle").textContent=ui.titoloCertificazioni;
  $("#igTitle").textContent=ui.instagramTitolo;
  $("#igText").textContent=ui.instagramTesto;
  $("#instagramLink").textContent=ui.instagramPulsante;
  $("#instagramLink").href=(config.profilo||{}).instagram||"#";
  $("#footerLeft").textContent=ui.footerSinistra;
  $("#footerRight").textContent=ui.footerDestra;
  $("#appError").textContent=ui.erroreCaricamento;

  const toggle=$("#langToggle");
  toggle.textContent=linguaAlternativa(lang).toUpperCase();
  toggle.setAttribute("aria-label",ui.cambiaLingua);
  toggle.setAttribute("title",ui.cambiaLingua);

  const certificazioni=config.certificazioni||[];
  renderHero(config,lang,ui);
  renderInfoCards(config.info||[],lang);
  renderCertifications(certificazioni,lang,ui);

  const sezione=$("#certificazioni");
  if(sezione) sezione.hidden=!certificazioni.length;
  $("#vediTutte").textContent=ui.vediTutte;

  initPlayerId((config.profilo||{}).playerId||"",ui);
  initCertificationModal(certificazioni,lang,ui);
  initCertTilt();
}

function mostraDisattivata(){
  const ui=getUI(lang);
  const t=(config.testi||{})[lang]||{};
  document.documentElement.lang=lang;
  document.title=`Professor Hub — ${ui.profiloNonDisponibile}`;
  $("#offlineName").textContent=(config.profilo||{}).nome||"";
  $("#offlineMessage").textContent=t.messaggioDisattivata||ui.profiloNonDisponibile;
  $("#offlineScreen").hidden=false;
}

async function start(){
  try{
    config=await loadConfig();
    validateConfig(config);
    if(config.attiva===false){ mostraDisattivata(); return; }
    certificazioniLocali=config.certificazioni||[];

    // Certificazioni e rango arrivano dall'app Professor Hub, se pubblicati.
    // Tutto il resto (nome, bio, info-card, traduzioni) resta di config.json.
    const {dati,origine}=await caricaDatiPubblici();
    if(dati){
      config.certificazioni=(dati.certificazioni||[]).map(c=>({
        nome:c.nome||"",
        data:c.data||"",
        stato:c.stato==="in-rinnovo"?"in-rinnovo":"attiva",
        immagini:immaginiDaConfig(c.nome),
        it:{descrizione:c.descrizioneIt||""},
        en:{descrizione:c.descrizioneEn||""}
      }));
      if(dati.rango) config.profilo={...(config.profilo||{}),rango:dati.rango};
      console.info(`[Professor Hub] Certificazioni dall'app (${origine}): ${config.certificazioni.length}.`);
    } else {
      console.info("[Professor Hub] Nessun dato pubblicato dall'app: uso le certificazioni di config.json.");
    }

    $("#page").hidden=false;
    disegna();
    $("#langToggle").addEventListener("click",()=>{
      lang=setLingua(linguaAlternativa(lang));
      disegna();
    });
    // "Vedi tutte": dove la pagina scorre porta alle certificazioni;
    // nella versione a schermata unica sono già visibili, quindi il link è nascosto via CSS.
    $("#vediTutte").addEventListener("click",e=>{
      e.preventDefault();
      const certs=$("#certs");
      if(certs){ certs.scrollIntoView({behavior:"smooth",block:"nearest"}); const primo=certs.querySelector(".cert"); if(primo) primo.focus(); }
    });
  }catch(error){
    console.error(error);
    $("#appError").textContent=getUI(lang).erroreCaricamento;
    $("#appError").hidden=false;
  }
}
start();

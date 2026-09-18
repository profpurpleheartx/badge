import {loadConfig} from "./config.js";
import {$} from "./utils/dom.js";
import {validateConfig} from "./utils/validateConfig.js";
import {renderHero} from "./render/renderHero.js";
import {renderInfoCards} from "./render/renderInfoCards.js";
import {renderCertifications} from "./render/renderCertifications.js";
import {initPlayerId} from "./components/playerId.js";
import {initCertificationModal} from "./components/modal.js";
import {initCertTilt} from "./components/certTilt.js";

async function start(){
  try{
    const config=await loadConfig();
    validateConfig(config);
    renderHero(config); renderInfoCards(config.info||[]); renderCertifications(config.certificazioni||[]);
    const sezioneCertificazioni=$("#certificazioni");
    if(sezioneCertificazioni) sezioneCertificazioni.hidden=!(config.certificazioni||[]).length;
    $("#instagramLink").href=config.instagram||"#";
    initPlayerId(config.playerId||"");
    initCertificationModal(config.certificazioni||[]);
    initCertTilt();
  }catch(error){console.error(error); $("#appError").hidden=false;}
}
start();

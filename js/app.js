import {loadConfig} from "./config.js";
import {$} from "./utils/dom.js";
import {renderHero} from "./render/renderHero.js";
import {renderInfoCards} from "./render/renderInfoCards.js";
import {renderCertifications} from "./render/renderCertifications.js";
import {initPlayerId} from "./components/playerId.js";
import {initCertificationModal} from "./components/modal.js";

async function start(){
  try{
    const config=await loadConfig();
    renderHero(config); renderInfoCards(config.info||[]); renderCertifications(config.certificazioni||[]);
    $("#instagramLink").href=config.instagram||"#";
    initPlayerId(config.playerId||"");
    initCertificationModal(config.certificazioni||[]);
  }catch(error){console.error(error); $("#appError").hidden=false;}
}
start();

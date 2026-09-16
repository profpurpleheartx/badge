
import { loadConfig } from "./config.js";
import { renderHero } from "./render/renderHero.js";
import { renderInfoCards } from "./render/renderInfoCards.js";
import { renderCertifications } from "./render/renderCertifications.js";
import { initModal } from "./components/modal.js";
import { initPlayerId } from "./components/playerId.js";
import { initToast } from "./components/toast.js";

async function initApp() {
  try {
    const config = await loadConfig();

    renderHero(config);
    renderInfoCards(config);

    const modal = initModal();
    renderCertifications(config, modal.open);

    const showToast = initToast();
    initPlayerId(showToast);

    const instagram = document.querySelector("#instagram-link");
    instagram.href = config.profilo.instagram;
  } catch (error) {
    console.error(error);
    document.body.innerHTML = "<main style='padding:40px;font-family:system-ui'><h1>Errore di caricamento</h1><p>Controlla che il sito sia pubblicato da un server (es. GitHub Pages) e che data/config.json sia presente.</p></main>";
  }
}

document.addEventListener("DOMContentLoaded", initApp);

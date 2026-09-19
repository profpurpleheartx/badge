// Controlla il config caricato e segnala eventuali problemi SOLO in console
// (mai a schermo): serve solo a Irene per capire, aprendo gli strumenti
// sviluppatore, perché qualcosa non appare come previsto.
import {LINGUE} from "./lang.js";

export function validateConfig(config = {}) {
  if (typeof config.attiva !== "boolean") {
    console.warn('[Professor Hub] Campo "attiva" assente o non true/false: la pagina viene mostrata come attiva.');
  }

  const profilo = config.profilo;
  if (!profilo || typeof profilo !== "object") {
    console.warn('[Professor Hub] Blocco "profilo" mancante in config.json: nome, nickname, Player ID e rango non verranno mostrati.');
  } else {
    ["nome", "nickname", "playerId"].forEach((campo) => {
      if (!profilo[campo]) {
        console.warn(`[Professor Hub] Campo "profilo.${campo}" mancante — verrà mostrato un valore di riserva.`);
      }
    });
    if (profilo.rango && !["green", "gold", "red", "violet", "diamond"].includes(profilo.rango)) {
      console.warn(`[Professor Hub] Rango "${profilo.rango}" non riconosciuto: il medaglione resterà nascosto. Valori validi: green, gold, red, violet, diamond.`);
    }
  }

  LINGUE.forEach((lingua) => {
    const testi = (config.testi || {})[lingua];
    if (!testi) {
      console.warn(`[Professor Hub] Blocco "testi.${lingua}" mancante: ruolo e bio saranno vuoti in questa lingua.`);
      return;
    }
    ["ruolo", "bio", "messaggioDisattivata"].forEach((campo) => {
      if (!testi[campo]) {
        console.warn(`[Professor Hub] Campo "testi.${lingua}.${campo}" mancante.`);
      }
    });
  });

  if (!Array.isArray(config.info)) {
    console.warn('[Professor Hub] Campo "info" mancante o non è un elenco: nessuna info-card verrà mostrata.');
  } else {
    config.info.forEach((voce, i) => {
      LINGUE.forEach((lingua) => {
        if (!voce[lingua]) console.warn(`[Professor Hub] Info-card ${i + 1}: traduzione "${lingua}" mancante.`);
      });
    });
  }

  if (!Array.isArray(config.certificazioni) || config.certificazioni.length === 0) {
    console.warn('[Professor Hub] Nessuna certificazione trovata in config.json: la sezione certificazioni verrà nascosta.');
  } else {
    config.certificazioni.forEach((cert, i) => {
      const etichetta = cert.nome || `indice ${i}`;
      if (!cert.nome) console.warn(`[Professor Hub] Certificazione all'indice ${i} senza "nome".`);
      if (cert.stato && !["attiva", "in-rinnovo"].includes(cert.stato)) {
        console.warn(`[Professor Hub] Certificazione "${etichetta}": stato "${cert.stato}" non riconosciuto, verrà mostrata come attiva. Valori validi: attiva, in-rinnovo.`);
      }
      if (!Array.isArray(cert.immagini) || cert.immagini.length === 0) {
        console.info(`[Professor Hub] Certificazione "${etichetta}" senza immagini: verrà mostrato il riquadro decorativo.`);
      }
      LINGUE.forEach((lingua) => {
        if (!cert[lingua]) console.warn(`[Professor Hub] Certificazione "${etichetta}": traduzione "${lingua}" mancante.`);
      });
    });
  }
}

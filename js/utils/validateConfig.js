// Controlla il config caricato e segnala eventuali problemi SOLO in console
// (mai a schermo): serve solo a Irene per capire, aprendo gli strumenti
// sviluppatore, perché qualcosa non appare come previsto.
export function validateConfig(config = {}) {
  const campiBase = ["nome", "nickname", "ruolo", "playerId", "bio"];
  campiBase.forEach((campo) => {
    if (!config[campo]) {
      console.warn(`[Professor Hub] Campo "${campo}" mancante in config.json — verrà mostrato un valore di riserva.`);
    }
  });

  if (!Array.isArray(config.info)) {
    console.warn('[Professor Hub] Campo "info" mancante o non è un elenco: nessuna info-card verrà mostrata.');
  }

  if (!Array.isArray(config.certificazioni) || config.certificazioni.length === 0) {
    console.warn('[Professor Hub] Nessuna certificazione trovata in config.json: la sezione certificazioni verrà nascosta.');
  } else {
    config.certificazioni.forEach((cert, i) => {
      if (!cert.nome) {
        console.warn(`[Professor Hub] Certificazione all'indice ${i} senza "nome".`);
      }
      if (!Array.isArray(cert.immagini) || cert.immagini.length === 0) {
        console.warn(`[Professor Hub] Certificazione "${cert.nome || i}" senza immagini: verrà mostrato il placeholder.`);
      }
    });
  }
}

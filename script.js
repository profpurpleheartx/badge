async function caricaPagina() {
  const contenitore = document.getElementById("pagina");

  let config;
  try {
    const risposta = await fetch("./config.json", { cache: "no-store" });
    config = await risposta.json();
  } catch (errore) {
    contenitore.innerHTML = `
      <div class="pagina-non-attiva">
        <i class="ti ti-alert-triangle"></i>
        <p>Impossibile caricare la pagina in questo momento.</p>
      </div>
    `;
    return;
  }

  // Interruttore per disattivare la pagina senza doverla rimuovere/cancellare
  if (!config.attiva) {
    contenitore.innerHTML = `
      <div class="pagina-non-attiva">
        <i class="ti ti-eye-off"></i>
        <p>Questa pagina non è al momento disponibile.</p>
      </div>
    `;
    return;
  }

  const certificazioniAttive = (config.certificazioni || []).filter((c) => c.attiva);

  const fotoHtml =
    config.foto?.tipo === "foto"
      ? `<img class="foto" src="${escapeAttr(config.foto.url)}" alt="Foto di ${escapeAttr(config.nome)}" />`
      : `<div class="foto-iniziali">${escapeHtml(config.foto?.inizialiAvatar || "")}</div>`;

  const certificazioniHtml =
    certificazioniAttive.length > 0
      ? certificazioniAttive
          .map(
            (c) => `
        <div class="certificazione">
          <i class="ti ti-certificate"></i>
          <span>${escapeHtml(c.nome)}</span>
        </div>`
          )
          .join("")
      : `<p class="nessuna-certificazione">Nessuna certificazione attiva al momento.</p>`;

  contenitore.innerHTML = `
    <div class="scheda">
      ${fotoHtml}
      <p class="nome">${escapeHtml(config.nome || "")}</p>
      ${config.nickname ? `<p class="nickname">${escapeHtml(config.nickname)}</p>` : ""}
      ${config.playerId ? `<span class="player-id">Player ID: ${escapeHtml(config.playerId)}</span>` : ""}

      <p class="etichetta-ruolo">Professor Play!Pokémon</p>
      <div class="certificazioni">
        ${certificazioniHtml}
      </div>

      <p class="footer-pagina">Professor Hub</p>
    </div>
  `;
}

function escapeHtml(testo) {
  const div = document.createElement("div");
  div.textContent = testo ?? "";
  return div.innerHTML;
}

function escapeAttr(testo) {
  return escapeHtml(testo).replace(/"/g, "&quot;");
}

caricaPagina();

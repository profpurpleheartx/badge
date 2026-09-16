async function caricaPagina() {
  const contenitore = document.getElementById("pagina");

  try {
    const risposta = await fetch(new URL("config.json", document.baseURI).href, { cache: "no-store" });
    if (!risposta.ok) throw new Error(`HTTP ${risposta.status}`);
    const config = await risposta.json();

    if (!config.attiva) {
      mostraStato("off");
      return;
    }

    renderPagina(config);
  } catch (errore) {
    console.error(errore);
    mostraStato("error", errore);
  }
}

function renderPagina(config) {
  const certificazioniAttive = (config.certificazioni || []).filter((c) => c.attiva);
  const fotoHtml =
    config.foto?.tipo === "foto" && config.foto?.url
      ? `<img class="foto" src="${escapeAttr(config.foto.url)}" alt="Foto di ${escapeAttr(config.nome || "Professore")}" />`
      : `<div class="foto-iniziali" aria-label="Avatar">${escapeHtml(config.foto?.inizialiAvatar || "")}</div>`;

  const certificazioniHtml = certificazioniAttive.length
    ? certificazioniAttive.map((c, index) => `
      <article class="certificazione"
        tabindex="0"
        role="button"
        data-cert="${escapeAttr(c.immagine || "")}"
        data-title="${escapeAttr(c.nome || "Certificazione")}"
        aria-label="Apri certificazione ${escapeAttr(c.nome || "")}">
        <div class="cert-icon"><i class="ti ${escapeAttr(c.icona || "ti-certificate")}"></i></div>
        <div class="cert-testo">
          <div class="cert-nome">${escapeHtml(c.nome || "")}</div>
          ${c.descrizione ? `<div class="cert-descrizione">${escapeHtml(c.descrizione)}</div>` : ""}
        </div>
        <div class="active"><span class="dot"></span>Attiva</div>
      </article>
    `).join("")
    : `<p class="nessuna-certificazione">Nessuna certificazione attiva al momento.</p>`;

  contenitore.innerHTML = `
    <div class="pagina-sfondo">
      <div class="decor decor-uno"></div>
      <div class="decor decor-due"></div>

      <section class="scheda">
        <div class="topbar">
          <button class="icon-btn" type="button" aria-label="Menu"><i class="ti ti-menu-2"></i></button>
          <button class="icon-btn" type="button" aria-label="Preferiti"><i class="ti ti-sparkles"></i></button>
        </div>

        <header class="hero">
          <div class="avatar-wrap">
            ${fotoHtml}
            <div class="avatar-badge"><i class="ti ti-star-filled"></i></div>
          </div>
          <h1 class="nome">${escapeHtml(config.nome || "")}</h1>
          ${config.nickname ? `<p class="nickname">@${escapeHtml(config.nickname)}</p>` : ""}
          <div class="ruolo"><i class="ti ti-school"></i><span>${escapeHtml(config.ruolo || "Professor Play!Pokémon")}</span></div>
        </header>

        ${config.playerId ? `
        <section class="player" aria-label="Player ID">
          <div class="player-icon"><i class="ti ti-user"></i></div>
          <div>
            <div class="player-label">Player ID</div>
            <div class="player-id" id="playerId">${escapeHtml(config.playerId)}</div>
          </div>
          <button class="copy" id="copyPlayerId" type="button" aria-label="Copia Player ID">
            <i class="ti ti-copy"></i>
          </button>
        </section>` : ""}

        <section class="cert-sezione">
          <div class="section-title">
            <h2><i class="ti ti-award"></i> Certificazioni</h2>
            <span class="count">${certificazioniAttive.length} attive</span>
          </div>
          <div class="certificazioni">${certificazioniHtml}</div>
        </section>

        <footer class="footer-pagina">
          <div class="footer-line"></div>
          <span>Professor Hub · Gotta teach ’em all!</span>
        </footer>
      </section>
    </div>

    <div class="modal" id="certModal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal-card">
        <button class="modal-close" id="modalClose" type="button" aria-label="Chiudi"><i class="ti ti-x"></i></button>
        <div class="modal-image-wrap">
          <img class="modal-image" id="modalImage" alt="" />
          <div class="modal-empty" id="modalEmpty" hidden>
            <i class="ti ti-photo-off"></i>
            <p>Immagine non disponibile.</p>
            <small>Controlla il percorso indicato in config.json.</small>
          </div>
        </div>
        <div class="modal-title" id="modalTitle"></div>
      </div>
    </div>

    <div class="toast" id="toast" role="status">Player ID copiato!</div>
  `;

  inizializzaInterazioni();
}

function inizializzaInterazioni() {
  const modal = document.getElementById("certModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalClose = document.getElementById("modalClose");
  const modalEmpty = document.getElementById("modalEmpty");

  document.querySelectorAll(".certificazione").forEach((card) => {
    card.addEventListener("click", () => apriCertificazione(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        apriCertificazione(card);
      }
    });
  });

  document.getElementById("copyPlayerId")?.addEventListener("click", copiaPlayerId);
  modalClose.addEventListener("click", chiudiCertificazione);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) chiudiCertificazione();
  });

  modalImage.addEventListener("load", () => {
    modalImage.hidden = false;
    modalEmpty.hidden = true;
  });

  modalImage.addEventListener("error", () => {
    modalImage.hidden = true;
    modalEmpty.hidden = false;
  });

  document.addEventListener("keydown", gestioneEscape);
}

function apriCertificazione(card) {
  const modal = document.getElementById("certModal");
  const image = document.getElementById("modalImage");
  const title = document.getElementById("modalTitle");
  const empty = document.getElementById("modalEmpty");

  const percorso = card.dataset.cert ? new URL(card.dataset.cert, document.baseURI).href : "";
  title.textContent = card.dataset.title || "Certificazione";
  image.alt = `Certificazione ${card.dataset.title || ""}`;
  image.hidden = false;
  empty.hidden = true;

  if (percorso) {
    image.src = percorso;
  } else {
    image.removeAttribute("src");
    image.hidden = true;
    empty.hidden = false;
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-aperta");
  document.getElementById("modalClose").focus();
}

function chiudiCertificazione() {
  const modal = document.getElementById("certModal");
  const image = document.getElementById("modalImage");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-aperta");
  image.removeAttribute("src");
}

function gestioneEscape(event) {
  const modal = document.getElementById("certModal");
  if (event.key === "Escape" && modal?.classList.contains("open")) {
    chiudiCertificazione();
  }
}

async function copiaPlayerId() {
  const id = document.getElementById("playerId")?.textContent.trim();
  if (!id) return;

  try {
    await navigator.clipboard.writeText(id);
  } catch {
    const area = document.createElement("textarea");
    area.value = id;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }

  const toast = document.getElementById("toast");
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function mostraStato(tipo, errore) {
  const contenitore = document.getElementById("pagina");
  const stati = {
    error: {
      icona: "ti-alert-triangle",
      titolo: "Impossibile caricare la pagina",
      testo: "Controlla la connessione o riprova.",
      azione: `<button class="riprova" type="button" onclick="caricaPagina()">Riprova</button>`
    },
    off: {
      icona: "ti-eye-off",
      titolo: "Pagina non disponibile",
      testo: "Questa pagina non è al momento disponibile.",
      azione: ""
    }
  };
  const stato = stati[tipo] || stati.error;
  const dettaglio = tipo === "error"
    ? `<small class="errore-dettaglio">Percorso configurazione: ${escapeHtml(new URL("config.json", document.baseURI).href)}<br>${escapeHtml(errore?.message || "Errore sconosciuto")}</small>`
    : "";

  contenitore.innerHTML = `
    <div class="stato-pagina">
      <div class="stato-icona"><i class="ti ${stato.icona}"></i></div>
      <h1>${stato.titolo}</h1>
      <p>${stato.testo}</p>
      ${stato.azione}
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

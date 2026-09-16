
import { $, escapeHtml } from "../utils/dom.js";

export function renderCertifications(config, onOpen) {
  const grid = $("#certification-grid");
  grid.innerHTML = config.certificazioni.map((cert, index) => {
    const first = cert.immagini?.[0];
    const preview = first
      ? `<img class="cert-preview" src="${escapeHtml(first)}" alt="${escapeHtml(cert.nome)}" loading="lazy"
             onerror="this.outerHTML='<div class=&quot;cert-placeholder&quot;>Certificazione</div>'">`
      : `<div class="cert-placeholder">Certificazione</div>`;
    return `
      <article class="cert-card" tabindex="0" data-cert-index="${index}">
        ${preview}
        <div class="cert-meta">
          <div class="cert-title-row">
            <h3>${escapeHtml(cert.nome)}</h3><span class="badge">Attiva</span>
          </div>
          <p class="cert-date">${escapeHtml(cert.data)}</p>
        </div>
      </article>`;
  }).join("");

  grid.querySelectorAll(".cert-card").forEach(card => {
    const open = () => onOpen(config.certificazioni[Number(card.dataset.certIndex)]);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }});
  });
}

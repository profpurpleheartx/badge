
import { $, escapeHtml } from "../utils/dom.js";

export function renderInfoCards(config) {
  const section = $("#info");
  section.innerHTML = `
    <div class="section-heading">
      <span class="eyebrow">Profilo</span>
      <h2>In breve</h2>
    </div>
    <div class="info-grid">
      ${config.info.map(item => `
        <article class="info-card">
          <img class="info-icon" src="${escapeHtml(item.icona)}" alt="" loading="lazy"
               onerror="this.style.display='none'">
          <h3>${escapeHtml(item.titolo)}</h3>
          <p>${escapeHtml(item.testo)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

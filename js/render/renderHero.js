
import { $, escapeHtml } from "../utils/dom.js";
import { initials } from "../utils/helpers.js";

export function renderHero(config) {
  const p = config.profilo;
  const hero = $("#hero");
  const avatar = p.avatar
    ? `<img class="avatar" src="${escapeHtml(p.avatar)}" alt="Avatar di ${escapeHtml(p.nome)}"
          onerror="this.replaceWith(Object.assign(document.createElement('div'), {className:'avatar-fallback', textContent:'${escapeHtml(initials(p.nome))}'}))">`
    : `<div class="avatar-fallback">${escapeHtml(initials(p.nome))}</div>`;

  hero.innerHTML = `
    <div class="avatar-wrap">${avatar}</div>
    <h1>${escapeHtml(p.nome)}</h1>
    <div class="nickname">${escapeHtml(p.nickname)}</div>
    <p class="role">${escapeHtml(p.ruolo)}</p>
    <button class="player-id" id="player-id" type="button" title="Copia Player ID">
      Player ID · <strong>${escapeHtml(p.playerId)}</strong> ⧉
    </button>
    <p class="bio">${escapeHtml(config.bio)}</p>
    <div class="heart-line"><span class="heart">♥</span></div>
  `;
}

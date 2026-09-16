
import { $, escapeHtml } from "../utils/dom.js";

export function initModal() {
  const modal = $("#modal");
  const close = () => { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden","true"); };

  modal.querySelectorAll("[data-modal-close]").forEach(el => el.addEventListener("click", close));
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });

  return {
    open(cert) {
      $("#modal-title").textContent = cert.nome || "Certificação";
      $("#modal-description").textContent = cert.descrizione || "";
      const gallery = $("#modal-gallery");
      gallery.innerHTML = (cert.immagini || []).map(src =>
        `<img src="${escapeHtml(src)}" alt="${escapeHtml(cert.nome)}" loading="lazy"
              onerror="this.style.display='none'">`
      ).join("") || `<div class="cert-placeholder">Nessuna immagine configurata</div>`;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden","false");
    }
  };
}

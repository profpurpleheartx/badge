const $ = (id) => document.getElementById(id);
const state = { cfg: null, certs: [], certIndex: 0, imageIndex: 0 };

async function init() {
  try {
    const r = await fetch("./config.json", { cache: "no-store" });
    if (!r.ok) throw new Error("config.json non trovato");
    state.cfg = await r.json();
    render();
  } catch (e) {
    document.querySelector(".shell").innerHTML =
      '<div style="padding:60px 25px;text-align:center"><h2>Impossibile caricare il sito</h2><p style="color:#777">Assicurati di aver caricato <b>index.html</b> e <b>config.json</b> nella stessa cartella su GitHub Pages.</p></div>';
  }
}

function render() {
  const p = state.cfg.profilo;
  $("name").textContent = p.nome;
  $("nick").textContent = p.nickname;
  $("role").textContent = p.ruolo;
  $("playerId").textContent = p.playerId;
  $("bio").textContent = p.bio;

  if (p.avatar) {
    $("avatar").style.backgroundImage = `url("${p.avatar}")`;
    $("avatar").textContent = "";
  }

  $("info").innerHTML = (state.cfg.info || [])
    .map(
      (x) =>
        `<div class="infoitem"><span class="infoicon">${x.icona}</span><div><b>${x.titolo}</b><span>${x.testo}</span></div></div>`
    )
    .join("");

  state.certs = (state.cfg.certificazioni || []).filter((c) => c.attiva);
  $("certs").innerHTML = state.certs
    .map(
      (c, i) =>
        `<article class="cert" tabindex="0" data-i="${i}" aria-label="Apri ${esc(c.nome)}"><div class="certtop"><span class="certicon">★</span><div><div class="certname">${esc(c.nome)}</div><span class="status">● Attiva</span></div></div><div class="certdate">Ottenuta: ${esc(c.data || "")}</div><div class="certpreview">ANTEPRIMA<br>${esc(c.nome)}</div></article>`
    )
    .join("");

  document.querySelectorAll(".cert").forEach((el) => {
    el.onclick = () => openCert(+el.dataset.i);
    el.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCert(+el.dataset.i);
      }
    };
  });

  const ig = state.cfg.instagram;
  $("instagram").innerHTML =
    ig && ig.attivo
      ? `<a class="insta" href="${esc(ig.url)}" target="_blank" rel="noopener" aria-label="${esc(ig.nome)}">◎</a><div class="instagram-label">${esc(ig.nome)}</div>`
      : "";
}

function esc(v) {
  return String(v ?? "").replace(
    /[&<>"']/g,
    (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
  );
}

function openCert(i) {
  state.certIndex = i;
  state.imageIndex = 0;
  updateModal();
  $("modal").classList.add("open");
  $("modal").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function updateModal() {
  const c = state.certs[state.certIndex];
  const imgs = c.immagini || [];
  $("modalName").textContent = c.nome;
  $("modalDate").textContent = "Ottenuta: " + (c.data || "");
  $("modalDetails").textContent = c.dettagli || c.descrizione || "";
  $("counter").textContent = `${Math.min(state.imageIndex + 1, Math.max(imgs.length, 1))} / ${Math.max(imgs.length, 1)}`;

  if (imgs.length) {
    const src = imgs[state.imageIndex];
    $("modalImg").innerHTML = `<img src="${esc(src)}" alt="${esc(c.nome)}" onerror="this.style.display='none';this.parentElement.insertAdjacentHTML('beforeend','<span>Immagine non disponibile.<br>Controlla il percorso in config.json.</span>')">`;
  } else {
    $("modalImg").innerHTML = "<span>Nessuna immagine configurata.</span>";
  }
}

function closeModal() {
  $("modal").classList.remove("open");
  $("modal").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

$("close").onclick = closeModal;
$("modal").onclick = (e) => {
  if (e.target === $("modal")) closeModal();
};
$("prev").onclick = () => {
  const n = (state.certs[state.certIndex].immagini || []).length;
  if (!n) return;
  state.imageIndex = (state.imageIndex + n - 1) % n;
  updateModal();
};
$("next").onclick = () => {
  const n = (state.certs[state.certIndex].immagini || []).length;
  if (!n) return;
  state.imageIndex = (state.imageIndex + 1) % n;
  updateModal();
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
  if (!$("modal").classList.contains("open")) return;
  if (e.key === "ArrowLeft") $("prev").click();
  if (e.key === "ArrowRight") $("next").click();
});

$("copy").onclick = async () => {
  try {
    await navigator.clipboard.writeText(state.cfg.profilo.playerId);
  } catch {}
  $("toast").classList.add("show");
  setTimeout(() => $("toast").classList.remove("show"), 1400);
};

init();

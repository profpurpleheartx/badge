// Lingua della pagina: di default segue la lingua del dispositivo.
// Se Irene (o chi visita) la cambia a mano, la scelta viene ricordata
// su quel dispositivo e ha la precedenza sul rilevamento automatico.
const CHIAVE = "professorhub:lingua";
export const LINGUE = ["it", "en"];

function linguaDispositivo() {
  const elenco = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || "it"];
  for (const voce of elenco) {
    const base = String(voce).toLowerCase().split("-")[0];
    if (LINGUE.includes(base)) return base;
  }
  return "en"; // dispositivo in una lingua che non gestiamo: l'inglese è più universale
}

function sceltaSalvata() {
  try {
    const salvata = localStorage.getItem(CHIAVE);
    return LINGUE.includes(salvata) ? salvata : null;
  } catch {
    return null; // localStorage bloccato (navigazione privata su vecchi Safari)
  }
}

export function getLingua() {
  return sceltaSalvata() || linguaDispositivo();
}

export function setLingua(lingua) {
  if (!LINGUE.includes(lingua)) return getLingua();
  try { localStorage.setItem(CHIAVE, lingua); } catch { /* senza memoria, vale solo per questa visita */ }
  return lingua;
}

export function linguaAlternativa(lingua) {
  return lingua === "it" ? "en" : "it";
}

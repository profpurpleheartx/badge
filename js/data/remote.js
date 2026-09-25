// Legge il documento pubblico scritto dall'app Professor Hub.
//
// Usa l'API REST di Firestore invece del Firebase SDK: serve una sola
// chiamata di rete a un documento solo, e così questa pagina resta senza
// nessuna dipendenza esterna da caricare.
//
// Il documento badge_pubblico/profilo è l'unico leggibile senza login in
// tutto il progetto (vedi firestore.rules nel repository dell'app) e
// contiene solo dati già pubblici: certificazioni superate e rango.
//
// Tre livelli, in ordine: dato fresco da Firestore → ultima copia
// ricevuta su questo dispositivo → quanto scritto a mano in config.json.
// Così la sezione certificazioni non risulta mai vuota per un problema
// di rete.

const PROGETTO = "professor-hub-e0b16";
const CHIAVE_API = "AIzaSyCJVEKIel5R4tn0LZHtTi_yI0M2p1h3r8s";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROGETTO}/databases/(default)/documents/badge_pubblico`;
const URL = `${BASE}/profilo?key=${CHIAVE_API}`;
const CHIAVE_CACHE = "professorhub:badge:ultimo";
const TIMEOUT_MS = 6000;

// Firestore REST restituisce i valori "tipizzati" ({stringValue: "..."}):
// questa funzione li riporta a normali valori JavaScript.
function valore(v) {
  if (v == null) return null;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("timestampValue" in v) return v.timestampValue;
  if ("nullValue" in v) return null;
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(valore);
  if ("mapValue" in v) return campi(v.mapValue.fields || {});
  return null;
}

function campi(fields) {
  const out = {};
  for (const k of Object.keys(fields)) out[k] = valore(fields[k]);
  return out;
}

function leggiCache() {
  try {
    const grezzo = localStorage.getItem(CHIAVE_CACHE);
    return grezzo ? JSON.parse(grezzo) : null;
  } catch {
    return null;
  }
}

function salvaCache(dati) {
  try {
    localStorage.setItem(CHIAVE_CACHE, JSON.stringify(dati));
  } catch {
    // Spazio pieno (le immagini pesano): si tiene almeno il resto.
    try {
      const leggero = { ...dati, certificazioni: dati.certificazioni.map(({ immagineUrl, ...c }) => c) };
      localStorage.setItem(CHIAVE_CACHE, JSON.stringify(leggero));
    } catch { /* bloccato: pazienza */ }
  }
}

// Ogni certificato pubblicato dall'app sta in un documento a parte
// (badge_pubblico/foto-<id>), con l'immagine come data URL.
async function caricaImmagine(id, signal) {
  try {
    const risposta = await fetch(`${BASE}/${encodeURIComponent(id)}?key=${CHIAVE_API}`, { signal, cache: "no-cache" });
    if (!risposta.ok) return "";
    const immagine = campi((await risposta.json()).fields || {}).immagine;
    return typeof immagine === "string" && immagine.startsWith("data:image/") ? immagine : "";
  } catch {
    return "";
  }
}

export async function caricaDatiPubblici() {
  try {
    const controller = new AbortController();
    const stop = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const risposta = await fetch(URL, { signal: controller.signal, cache: "no-cache" });
    if (!risposta.ok) throw new Error(`Firestore ha risposto ${risposta.status}`);
    const documento = await risposta.json();
    const dati = campi(documento.fields || {});
    if (!Array.isArray(dati.certificazioni)) throw new Error("Documento pubblico senza certificazioni");
    await Promise.all(dati.certificazioni.map(async (c) => {
      if (c && c.immagine) c.immagineUrl = await caricaImmagine(c.immagine, controller.signal);
    }));
    clearTimeout(stop);
    salvaCache(dati);
    return { dati, origine: "firestore" };
  } catch (errore) {
    console.warn("[Professor Hub] Dati pubblici non raggiungibili:", errore.message);
    const cache = leggiCache();
    if (cache) return { dati: cache, origine: "cache" };
    return { dati: null, origine: "config" };
  }
}

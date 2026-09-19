// Etichette dell'interfaccia (pulsanti, titoli di sezione, messaggi).
// I CONTENUTI di Irene (nome, bio, info-card, certificazioni) stanno invece
// in data/config.json: qui non va mai scritto nulla che la riguardi.
export const UI = {
  it: {
    brand: "Professor",
    brandAccent: "Hub",
    deviceNote: "Stile adattato al dispositivo",
    playerIdLabel: "PLAYER ID",
    playerIdCopiato: "Player ID copiato! ✦",
    playerIdAssente: "Nessun Player ID disponibile",
    playerIdErrore: "Copia non riuscita — selezionalo a mano",
    playerIdAria: "Copia il Player ID",
    titoloCertificazioni: "Le mie certificazioni",
    vediTutte: "Vedi tutte →",
    ottenuta: "Ottenuta:",
    statoAttiva: "Attiva",
    statoRinnovo: "In rinnovo",
    instagramTitolo: "Seguimi su Instagram →",
    instagramTesto: "Scopri il mio percorso e le attività Pokémon TCG",
    instagramPulsante: "Apri profilo →",
    footerSinistra: "© Professor Hub",
    footerDestra: "Profilo Professore · Pokémon TCG",
    chiudi: "Chiudi",
    fotoPrecedente: "Foto precedente",
    fotoSuccessiva: "Foto successiva",
    apriCertificazione: "Apri certificazione",
    certificazione: "Certificazione",
    immagineNonDisponibile: "IMMAGINE NON DISPONIBILE",
    erroreCaricamento: "Impossibile caricare il profilo. Controlla data/config.json.",
    cambiaLingua: "Passa all'inglese",
    profiloNonDisponibile: "Profilo non disponibile",
    avatarDi: "Foto di"
  },
  en: {
    brand: "Professor",
    brandAccent: "Hub",
    deviceNote: "Styled for your device",
    playerIdLabel: "PLAYER ID",
    playerIdCopiato: "Player ID copied! ✦",
    playerIdAssente: "No Player ID available",
    playerIdErrore: "Copy failed — please select it manually",
    playerIdAria: "Copy the Player ID",
    titoloCertificazioni: "My certifications",
    vediTutte: "See all →",
    ottenuta: "Earned:",
    statoAttiva: "Active",
    statoRinnovo: "Renewing",
    instagramTitolo: "Follow me on Instagram →",
    instagramTesto: "See my journey and my Pokémon TCG activities",
    instagramPulsante: "Open profile →",
    footerSinistra: "© Professor Hub",
    footerDestra: "Professor profile · Pokémon TCG",
    chiudi: "Close",
    fotoPrecedente: "Previous photo",
    fotoSuccessiva: "Next photo",
    apriCertificazione: "Open certification",
    certificazione: "Certification",
    immagineNonDisponibile: "IMAGE NOT AVAILABLE",
    erroreCaricamento: "Could not load the profile. Check data/config.json.",
    cambiaLingua: "Switch to Italian",
    profiloNonDisponibile: "Profile not available",
    avatarDi: "Photo of"
  }
};

export function getUI(lang) {
  return UI[lang] || UI.it;
}

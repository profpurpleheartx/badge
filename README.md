# Professor Hub

Pagina profilo statica per Professor Play! Pokémon, pubblicabile su GitHub Pages.

## Struttura

- `index.html` — solo la struttura: **non contiene nessun testo di contenuto**
- `data/config.json` — **unica fonte dei contenuti** (profilo, testi IT/EN, info card) — le certificazioni arrivano dall'app
- `js/data/i18n.js` — etichette dell'interfaccia (pulsanti, titoli di sezione) in IT ed EN
- `assets/` — immagini, icone, medaglioni dei ranghi, anteprima social
- `css/` — stile, diviso per componente (`single-screen.css` = versione a schermata unica)
- `js/` — logica: caricamento config, rendering, componenti, utility

Tutto ciò che si vede sulla pagina viene da `config.json`: non esiste nessun valore
scritto due volte, quindi non è possibile che HTML e config dicano cose diverse.

## Accendere e spegnere la pagina

In `data/config.json`, il campo `"attiva"`:

- `true` → la pagina funziona normalmente
- `false` → chi apre il link vede solo nome e il messaggio di cortesia
  (`testi.it.messaggioDisattivata` / `testi.en.messaggioDisattivata`)

Non serve cancellare né spubblicare niente: basta cambiare quella parola e salvare.

## Rango (green/gold/red/violet/diamond)

Arriva dall'app insieme alle certificazioni. Il `"rango"` dentro `"profilo"` in
`config.json` si usa solo se l'app non ha mai pubblicato niente. La mappa
colori/immagini è in `js/data/ranks.js`.

## Certificazioni: arrivano dall'app (e solo da lì)

Certificazioni e rango **non si scrivono qui**: li pubblica l'app Professor Hub,
dal modulo Formazione → pulsante "Pubblica sulla pagina pubblica". Nome, data e
descrizioni (IT/EN) si compilano nell'app. Finiscono in un unico documento
Firestore (`badge_pubblico/profilo`), l'unico leggibile senza login in tutto il
progetto (regola in Firestore → Regole), che questa pagina legge all'apertura.

Vengono pubblicate solo le certificazioni **superate**, **non più segnate «da
verificare»** e **non scadute**. Quando mancano meno di 30 giorni alla scadenza
l'etichetta diventa "In rinnovo"; quando è scaduta sparisce da sola.

Se Firestore non risponde, la pagina usa l'ultima copia ricevuta su quel
dispositivo; se non c'è nemmeno quella, la sezione certificazioni resta nascosta.

## Foto delle certificazioni

Non vanno scritte da nessuna parte: la pagina le trova dal nome della
certificazione, in `assets/certifications/`, tutto minuscolo con i trattini:
"Deck Check" → `deck-check.png`, "La Condotta dei Professori" →
`la-condotta-dei-professori.png`. Se il file non c'è compare il riquadro
decorativo. Per una certificazione nuova basta caricare qui il file con il
nome giusto.

## Lingua

La pagina parte nella lingua del dispositivo (italiano o inglese; qualsiasi altra
lingua vede l'inglese). Il pulsante IT/EN in alto a destra permette di cambiarla a
mano e la scelta viene ricordata su quel dispositivo.

Per tradurre qualcosa: i **contenuti** stanno in `config.json` sotto `it`/`en`,
le **etichette dell'interfaccia** in `js/data/i18n.js`. I nomi delle
certificazioni non si traducono (sono i nomi ufficiali Play! Pokémon).

## Schermata unica

Da 820px di larghezza in su (iPad e desktop) la pagina sta tutta in una videata e
non scorre; se le certificazioni diventano tante scorrono nel loro riquadro. Su
iPhone resta la normale pagina a scorrimento. La regola è in `css/single-screen.css`.

## Sviluppo locale

Servire la cartella con un server HTTP (non aprire `index.html` con `file://`,
altrimenti il fetch di `data/config.json` viene bloccato dalle policy CORS).

## Da fare

- Foto vere delle certificazioni
- Upload immagini / admin panel

# Professor Hub

Pagina profilo statica per Professor Play! Pokémon, pubblicabile su GitHub Pages.

## Struttura

- `index.html` — solo la struttura: **non contiene nessun testo di contenuto**
- `data/config.json` — **unica fonte dei contenuti** (profilo, testi IT/EN, info card, certificazioni)
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

## Cambiare il rango (green/gold/red/violet/diamond)

In `data/config.json`, dentro `"profilo"`, trova `"rango": "green"` e sostituisci
la parola con una di: `green`, `gold`, `red`, `violet`, `diamond`. Il medaglione in
basso a destra sulla foto profilo si aggiorna da solo. La mappa colori/immagini è
in `js/data/ranks.js`.

## Certificazioni: arrivano dall'app

Le certificazioni e il rango **non si scrivono più qui a mano**: li pubblica
l'app Professor Hub, dal modulo Formazione → pulsante "Pubblica sulla pagina
pubblica". Finiscono in un unico documento Firestore (`badge_pubblico/profilo`),
l'unico leggibile senza login in tutto il progetto, che questa pagina legge
all'apertura.

Vengono pubblicate solo le certificazioni **superate**, **non più segnate «da
verificare»** e **non scadute**. Quando mancano meno di 30 giorni alla scadenza
l'etichetta diventa "In rinnovo"; quando è scaduta sparisce da sola.

Se Firestore non risponde, la pagina usa nell'ordine: l'ultima copia ricevuta su
quel dispositivo, e in mancanza anche di quella l'elenco `certificazioni` di
`config.json`, che resta come riserva. Per questo conviene tenerlo grosso modo
allineato, anche se in condizioni normali non viene mai usato.

## Foto delle certificazioni

Le foto restano qui: l'app non le gestisce. Il campo `"immagini"` di ogni
certificazione in `config.json` è un elenco (anche vuoto); quando i dati arrivano
dall'app, le foto vengono riabbinate **per nome**, quindi il nome in `config.json`
deve essere identico a quello scritto nell'app.

Se l'elenco è vuoto compare il riquadro decorativo; se contiene un percorso che
non carica compare "immagine non disponibile". Per aggiungere una foto: caricala
in `assets/certifications/` e scrivi il percorso nell'elenco.

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

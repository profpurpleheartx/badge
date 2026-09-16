# Professor Hub

Pagina profilo statica per Professor Play! Pokémon, pubblicabile su GitHub Pages.

## Struttura
- `index.html` — struttura della pagina
- `data/config.json` — contenuti (profilo, info card, certificazioni)
- `assets/` — immagini e icone
- `css/` — stile, diviso per componente
- `js/` — logica: caricamento config, rendering, componenti, utility

## Sviluppo locale
Servire la cartella con un server HTTP (non aprire `index.html` con `file://`,
altrimenti il fetch di `data/config.json` viene bloccato dalle policy CORS).

## Da fare
Vedi la mappa del repository per l'elenco aggiornato delle attività aperte
(upload immagini, admin panel, validazione config, multilingua).

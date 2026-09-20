// Registro dei ranghi Play! Pokémon Professor.
// Per cambiare il rango in home basta modificare "rango" in data/config.json
// con una di queste chiavi: green, gold, red, violet, diamond.
export const RANKS = {
  green:   { nome: "Green Rank",   colore: "#4C9A72", immagine: "assets/ranks/rank-green.webp" },
  gold:    { nome: "Gold Rank",    colore: "#d19a3f", immagine: "assets/ranks/rank-gold.webp" },
  red:     { nome: "Red Rank",     colore: "#c94f4f", immagine: "assets/ranks/rank-red.webp" },
  violet:  { nome: "Violet Rank",  colore: "#8d68df", immagine: "assets/ranks/rank-purple.webp" },
  diamond: { nome: "Diamond Rank", colore: "#3f7fd1", immagine: "assets/ranks/rank-blue.webp" }
};

export function getRank(key) {
  return RANKS[key] || null;
}

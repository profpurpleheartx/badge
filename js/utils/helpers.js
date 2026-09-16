
export function initials(name = "") {
  return name.split(/\s+/).filter(Boolean).slice(0,2).map(x => x[0]).join("").toUpperCase();
}
export function isImagePath(path = "") {
  return /\.(avif|gif|jpe?g|png|webp|svg)$/i.test(path);
}

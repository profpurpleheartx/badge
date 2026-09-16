
export async function loadConfig() {
  const response = await fetch("data/config.json");
  if (!response.ok) throw new Error("Impossibile caricare data/config.json");
  return response.json();
}

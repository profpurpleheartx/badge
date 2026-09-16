export async function loadConfig(){
  const response=await fetch("data/config.json",{cache:"no-cache"});
  if(!response.ok) throw new Error(`Impossibile caricare data/config.json (${response.status})`);
  return response.json();
}

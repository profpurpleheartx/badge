
import { $ } from "../utils/dom.js";
export function initPlayerId(showToast) {
  const button = $("#player-id");
  if (!button) return;
  button.addEventListener("click", async () => {
    const id = button.querySelector("strong")?.textContent || "";
    try {
      await navigator.clipboard.writeText(id);
      showToast("Player ID copiato");
    } catch {
      showToast(id);
    }
  });
}


import { $ } from "../utils/dom.js";
export function initToast() {
  const toast = $("#toast");
  let timer;
  return message => {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
  };
}

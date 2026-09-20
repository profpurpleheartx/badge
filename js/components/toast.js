import {$} from "../utils/dom.js";
export function showToast(message){const t=$("#toast"); t.textContent=message; t.classList.add("show"); window.setTimeout(()=>t.classList.remove("show"),1400)}

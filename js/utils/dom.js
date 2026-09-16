
export const $ = (selector, root = document) => root.querySelector(selector);
export const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));

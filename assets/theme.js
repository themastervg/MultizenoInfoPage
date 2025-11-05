(function(){
  var saved=localStorage.getItem("theme");
  var prefers=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";
  var theme=saved||prefers;
  if(theme==="light") document.body.classList.add("light-mode");
  function icon(){return document.body.classList.contains("light-mode")?"🌙":"☀"}
  function setIcon(){var b=document.getElementById("themeToggle");if(b) b.textContent=icon()}
  window.addEventListener("DOMContentLoaded",setIcon);
  window.toggleTheme=function(){
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme",document.body.classList.contains("light-mode")?"light":"dark");
    setIcon();
  }
})();

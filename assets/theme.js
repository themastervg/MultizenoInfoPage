(function(){
  var saved=localStorage.getItem("theme");
  var prefersLight=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches;
  if(saved==="light"||(!saved&&prefersLight)) document.documentElement.classList.add("prefers-light");
  function applyTheme(){
    var t=localStorage.getItem("theme");
    var isLight=t==="light"||(t===null&&document.documentElement.classList.contains("prefers-light"));
    document.body.classList.toggle("light-mode",isLight);
    var b=document.getElementById("themeToggle");
    if(b) b.textContent=isLight?"🌙":"☀";
  }
  window.toggleTheme=function(){
    var isLight=document.body.classList.contains("light-mode");
    localStorage.setItem("theme",isLight?"dark":"light");
    applyTheme();
  };
  window.addEventListener("DOMContentLoaded",function(){
    applyTheme();
    var btn=document.getElementById("menuToggle");
    if(btn){
      btn.addEventListener("click",function(){
        document.body.classList.toggle("menu-open");
      });
    }
    var els=document.querySelectorAll(".reveal");
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.15});
    els.forEach(function(el){io.observe(el)});
    document.querySelectorAll(".faq-item").forEach(function(item){
      var sum=item.querySelector(".faq-summary");
      var content=item.querySelector(".faq-content");
      if(!sum||!content) return;
      sum.addEventListener("click",function(){
        var open=item.classList.toggle("open");
        if(open){content.style.maxHeight=content.scrollHeight+"px";}
        else{content.style.maxHeight="0";}
      });
      content.style.maxHeight="0";
    });
  });
})();

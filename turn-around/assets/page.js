// Small touch only: panels are inked as they scroll into view, as in the film. The page is complete without this file.
(function () {
  var root = document.documentElement;
  if (!('IntersectionObserver' in window) || !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  root.className += ' js';
  function ink(panel) {
    var img = panel.querySelector('.art img');
    function go() { panel.classList.add('in'); }
    if (!img || img.complete) go(); else { img.addEventListener('load', go); img.addEventListener('error', go); }
  }
  function start() {
    var panels = document.querySelectorAll('.panel');
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { seen.unobserve(entry.target); ink(entry.target); }
      });
    }, { threshold: 0.2 });
    Array.prototype.forEach.call(panels, function (panel) { seen.observe(panel); });
    window.addEventListener('beforeprint', function () { Array.prototype.forEach.call(panels, function (panel) { panel.classList.add('in'); }); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

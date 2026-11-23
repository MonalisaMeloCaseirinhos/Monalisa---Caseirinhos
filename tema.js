// Tema claro/escuro: segue o sistema e lembra a escolha da pessoa
(function () {
  var raiz = document.documentElement;
  var sistema = matchMedia("(prefers-color-scheme: dark)");
  function salvo() { try { return localStorage.getItem("tema"); } catch (e) { return null; } }
  function aplicar(tema, gravar) {
    raiz.dataset.theme = tema;
    var botao = document.getElementById("tema");
    if (botao) botao.setAttribute("aria-label", tema === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", tema === "dark" ? "#15111D" : "#F8E7E4");
    if (gravar) { try { localStorage.setItem("tema", tema); } catch (e) {} }
  }
  aplicar(salvo() || (sistema.matches ? "dark" : "light"), false);
  document.addEventListener("DOMContentLoaded", function () {
    aplicar(raiz.dataset.theme, false);
    document.getElementById("tema").addEventListener("click", function () {
      aplicar(raiz.dataset.theme === "dark" ? "light" : "dark", true);
    });
  });
  sistema.addEventListener("change", function (e) {
    if (!salvo()) aplicar(e.matches ? "dark" : "light", false);
  });
})();
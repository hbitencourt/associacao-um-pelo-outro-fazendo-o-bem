/* =========================================================
   UM PELO OUTRO FAZENDO O BEM — scripts gerais
   ========================================================= */

/* ---- TELA DE CARREGAMENTO ----
   Some rápido (heurística: tempo suportável de carga deve ser curto).
   Só aparece de forma "cheia" na primeira visita da sessão; nas
   próximas páginas fica bem breve, pra não atrapalhar a navegação. */
(function () {
  const seen = sessionStorage.getItem("upo_loaded");
  const minTime = seen ? 250 : 900;
  sessionStorage.setItem("upo_loaded", "1");

  window.addEventListener("load", () => {
    setTimeout(() => {
      const loader = document.getElementById("loader");
      if (loader) loader.classList.add("hidden");
    }, minTime);
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  /* ---- menu mobile ---- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      const isOpen = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", isOpen);
      toggle.textContent = isOpen ? "✕" : "☰";
    });
  }

  /* ---- animação de entrada ao rolar ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---- barra de acessibilidade: aumentar/diminuir fonte ---- */
  const root = document.documentElement;
  let scale = parseFloat(localStorage.getItem("upo_font_scale")) || 1;
  root.style.setProperty("--font-scale", scale);

  const incBtn = document.getElementById("a11y-font-inc");
  const decBtn = document.getElementById("a11y-font-dec");
  if (incBtn) incBtn.addEventListener("click", () => {
    scale = Math.min(scale + 0.1, 1.3);
    root.style.setProperty("--font-scale", scale);
    localStorage.setItem("upo_font_scale", scale);
  });
  if (decBtn) decBtn.addEventListener("click", () => {
    scale = Math.max(scale - 0.1, 0.9);
    root.style.setProperty("--font-scale", scale);
    localStorage.setItem("upo_font_scale", scale);
  });

  /* ---- barra de acessibilidade: alto contraste ---- */
  const contrastBtn = document.getElementById("a11y-contrast");
  if (contrastBtn) {
    if (localStorage.getItem("upo_contrast") === "1") document.body.classList.add("high-contrast");
    contrastBtn.addEventListener("click", () => {
      document.body.classList.toggle("high-contrast");
      localStorage.setItem("upo_contrast", document.body.classList.contains("high-contrast") ? "1" : "0");
    });
  }

  /* ---- validação simples e genérica para qualquer <form data-validate> ---- */
  document.querySelectorAll("form[data-validate]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      let firstInvalid = null;

      form.querySelectorAll("[required]").forEach((input) => {
        const field = input.closest(".field");
        if (!field) return;
        let ok = input.value.trim() !== "";
        if (ok && input.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);

        field.classList.toggle("invalid", !ok);
        if (!ok) { valid = false; if (!firstInvalid) firstInvalid = input; }
      });

      const successBox = form.parentElement.querySelector(".form-success");
      if (valid) {
        form.reset();
        form.querySelectorAll(".field").forEach((f) => f.classList.remove("invalid"));
        if (successBox) {
          successBox.classList.add("show");
          successBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else if (firstInvalid) {
        firstInvalid.focus();
      }
    });
  });

  /* ---- página de doação: valores sugeridos ---- */
  const amountButtons = document.querySelectorAll(".amount-btn");
  const customAmount = document.getElementById("custom-amount");
  const summaryValue = document.getElementById("summary-value");

  function updateSummary(value) {
    if (summaryValue) summaryValue.textContent = `R$ ${value}`;
  }
  amountButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      amountButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      if (customAmount) customAmount.value = "";
      updateSummary(btn.dataset.value);
    });
  });
  if (customAmount) {
    customAmount.addEventListener("input", () => {
      amountButtons.forEach((b) => b.classList.remove("selected"));
      updateSummary(customAmount.value || "0");
    });
  }

  /* ---- abas de forma de pagamento (PIX / Cartão) ---- */
  const payTabs = document.querySelectorAll(".pay-tab");
  const payPanels = document.querySelectorAll(".pay-panel");
  payTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      payTabs.forEach((t) => t.classList.remove("active"));
      payPanels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.target).classList.add("active");
    });
  });

  /* ---- copiar chave PIX (heurística: feedback imediato do sistema) ---- */
  const pixCopyBtn = document.getElementById("pix-copy-btn");
  if (pixCopyBtn) {
    pixCopyBtn.addEventListener("click", async () => {
      const key = document.getElementById("pix-key").textContent.trim();
      try {
        await navigator.clipboard.writeText(key);
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = key;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      const original = pixCopyBtn.textContent;
      pixCopyBtn.textContent = "Copiado ✓";
      pixCopyBtn.classList.add("copied");
      setTimeout(() => {
        pixCopyBtn.textContent = original;
        pixCopyBtn.classList.remove("copied");
      }, 2200);
    });
  }

  /* ---- máscara visual de cartão (só front-end, sem processar nada) ---- */
  const cardNumber = document.getElementById("card-number");
  if (cardNumber) {
    cardNumber.addEventListener("input", () => {
      let digits = cardNumber.value.replace(/\D/g, "").slice(0, 16);
      cardNumber.value = digits.replace(/(.{4})/g, "$1 ").trim();
    });
  }
  const cardExpiry = document.getElementById("card-expiry");
  if (cardExpiry) {
    cardExpiry.addEventListener("input", () => {
      let digits = cardExpiry.value.replace(/\D/g, "").slice(0, 4);
      cardExpiry.value = digits.length > 2 ? digits.slice(0, 2) + "/" + digits.slice(2) : digits;
    });
  }
});

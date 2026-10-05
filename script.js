/* =========================================================
   CLARICES PATISSERIE — JavaScript puro
   ========================================================= */

/*
  IMPORTANTE:
  O número do WhatsApp não foi informado no briefing.
  Coloque aqui somente os números, com código do país e DDD.
  Exemplo: 5598987654321
*/
const WHATSAPP_NUMBER = "55SEUNUMERO";

document.addEventListener("DOMContentLoaded", () => {
  initWhatsApp();
  initMobileMenu();
  initScrollEffects();
  initOpeningStatus();
  initMenuFilter();
  initReveal();
  initBackToTop();
  initYear();
  initLogoFallback();
});

/* ---------- WhatsApp ---------- */
function initWhatsApp() {
  document.querySelectorAll(".js-whatsapp").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      if (WHATSAPP_NUMBER === "55SEUNUMERO") {
        alert("Antes de publicar o site, abra o arquivo script.js e coloque o número completo do WhatsApp da Clarices na variável WHATSAPP_NUMBER.");
        return;
      }

      const message =
        button.dataset.message ||
        "Oi! Vim pelo site da Clarices Patisserie e gostaria de saber mais.";

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
}

/* ---------- Menu mobile ---------- */
function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".mobile-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);

    toggle.classList.toggle("is-open", open);
    const spans = toggle.querySelectorAll("span");

    if (open) {
      spans[0].style.transform = "translateY(7px) rotate(45deg)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
    } else {
      spans.forEach((span) => {
        span.style.transform = "";
        span.style.opacity = "";
      });
    }
  });

  nav.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
      toggle.querySelectorAll("span").forEach((span) => {
        span.style.transform = "";
        span.style.opacity = "";
      });
    });
  });
}

/* ---------- Header + barra de progresso ---------- */
function initScrollEffects() {
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".scroll-progress span");

  const update = () => {
    const scrollY = window.scrollY;
    header.classList.toggle("scrolled", scrollY > 20);

    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const percent = documentHeight > 0
      ? (scrollY / documentHeight) * 100
      : 0;

    progress.style.width = `${percent}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* ---------- Horário real ---------- */
function initOpeningStatus() {
  const status = document.querySelector("#openingStatus");
  if (!status) return;

  const updateStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0 domingo, 6 sábado
    const minutes = now.getHours() * 60 + now.getMinutes();

    const isWeekend = day === 0 || day === 6;
    const opening = isWeekend ? 14 * 60 + 30 : 15 * 60;
    const closing = isWeekend ? 21 * 60 : 20 * 60;

    const isOpen = minutes >= opening && minutes < closing;

    const title = status.querySelector("strong");
    const dot = status.querySelector(".status-light");

    status.classList.toggle("closed", !isOpen);
    dot.setAttribute("aria-label", isOpen ? "Aberto" : "Fechado");

    if (isOpen) {
      title.textContent = "Aberto agora";
    } else {
      title.textContent = "Fechado agora";
    }
  };

  updateStatus();
  // Atualiza a cada minuto sem precisar recarregar a página.
  setInterval(updateStatus, 60 * 1000);
}

/* ---------- Filtro do cardápio ---------- */
function initMenuFilter() {
  const tabs = document.querySelectorAll(".category-tab");
  const cards = document.querySelectorAll(".menu-card");

  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;

      cards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = filter === "todos" || category === filter;
        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });
}

/* ---------- Animação ao rolar ---------- */
function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------- Botão voltar ao topo ---------- */
function initBackToTop() {
  const button = document.querySelector(".back-to-top");
  if (!button) return;

  window.addEventListener("scroll", () => {
    button.classList.toggle("visible", window.scrollY > 700);
  }, { passive: true });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Ano automático ---------- */
function initYear() {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
}

/* ---------- Fallback visual da logo ---------- */
function initLogoFallback() {
  document.querySelectorAll(".brand-logo").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";
      const fallback = img.parentElement.querySelector(".brand-logo-fallback");
      if (fallback) fallback.style.display = "block";
    });
  });
}

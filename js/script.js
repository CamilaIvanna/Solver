// ========== CARGA DINÁMICA DEL HEADER ==========
fetch('/html/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-placeholder').innerHTML = html;
  });

// ========== CARGA DINÁMICA DEL FOOTER Y MODALES ==========
fetch('/html/footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer-placeholder').innerHTML = html;

    // Esperar al render del contenido antes de enlazar modales
    setTimeout(() => {
      const setupModal = (btnId, modalId) => {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        const close = modal?.querySelector(".close");

        btn?.addEventListener("click", () => {
          if (modal) modal.style.display = "flex";
        });

        close?.addEventListener("click", () => {
          if (modal) modal.style.display = "none";
        });

        window.addEventListener("click", (e) => {
          if (e.target === modal) modal.style.display = "none";
        });
      };

      // Lista de modales
      setupModal("btnReglamentoCliente", "modalReglamentoCliente");
      setupModal("btnConfidencialidad", "modalConfidencialidad");
      setupModal("btnGarantias", "modalGarantias");
      setupModal("btnNuestroEquipo", "modalNuestroEquipo"); // NUEVO MODAL
    }, 100);
  });

// ========== CARRUSEL DE ÉXITO ==========
(function () {
  const root = document.querySelector('.seccion_exito .exito-galeria');
  if (!root) return;

  const track = root.querySelector('.exito-track');
  const items = Array.from(track.children);
  const prev = root.querySelector('.exito-prev');
  const next = root.querySelector('.exito-next');
  const total = items.length;

  let index = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 4000;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function goToSlide(n) {
    index = (n + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function startAutoplay() {
    if (reduce) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => goToSlide(index + 1), AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  prev?.addEventListener('click', () => {
    stopAutoplay(); goToSlide(index - 1); startAutoplay();
  });

  next?.addEventListener('click', () => {
    stopAutoplay(); goToSlide(index + 1); startAutoplay();
  });

  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', startAutoplay);
  root.addEventListener('focusin', stopAutoplay);
  root.addEventListener('focusout', startAutoplay);

  goToSlide(0);
  startAutoplay();
  window.addEventListener("resize", () => goToSlide(index));
})();

(function () {
  const $ = (sel, ctx=document) => ctx.querySelector(sel);

  // Botones
  const btnGarantias          = $("#btnGarantias");
  const btnConfidencialidad   = $("#btnConfidencialidad");
  const btnReglamentoCliente  = $("#btnReglamentoCliente");
  const btnNuestroEquipo      = $("#btnNuestroEquipo");

  // Modales
  const modalGarantias        = $("#modalGarantias");
  const modalConfidencialidad = $("#modalConfidencialidad");
  const modalReglamento       = $("#modalReglamentoCliente");
  const modalEquipo           = $("#modalNuestroEquipo");

  // Funciones
  const openModal = (modal) => {
    if(!modal) return;
    modal.classList.add("is-open");
    document.body.classList.add("body--lock");
    // Accesibilidad: foco al contenido
    const content = modal.querySelector(".modal-content");
    if (content) content.setAttribute("tabindex","-1"), content.focus();
  };

  const closeModal = (modal) => {
    if(!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("body--lock");
  };

  // Abrir
  btnGarantias?.addEventListener("click", () => openModal(modalGarantias));
  btnConfidencialidad?.addEventListener("click", () => openModal(modalConfidencialidad));
  btnReglamentoCliente?.addEventListener("click", () => openModal(modalReglamento));
  btnNuestroEquipo?.addEventListener("click", () => openModal(modalEquipo));

  // Cerrar por botón X
  document.querySelectorAll(".modal .close").forEach(x=>{
    x.addEventListener("click", (e) => closeModal(e.target.closest(".modal")));
  });

  // Cerrar clic fuera del cuadro
  document.querySelectorAll(".modal").forEach(overlay=>{
    overlay.addEventListener("click", (e)=>{
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Cerrar con ESC
  document.addEventListener("keydown", (e)=>{
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.is-open").forEach(m=>closeModal(m));
    }
  });
})();

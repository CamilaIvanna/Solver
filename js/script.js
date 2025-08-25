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
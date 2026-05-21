// Muestra un spinner centrado y redirige a la página indicada después de "delayMs" milisegundos.
function showSpinnerAndRedirect(delayMs = 5000, redirectUrl = 'token.html') {
  const overlay = document.getElementById('spinner-overlay');
  if (!overlay) return;
  overlay.style.display = 'flex';
  // Evitar scroll cuando el overlay está activo
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    window.location.href = redirectUrl;
  }, delayMs);
}

const carousel = document.querySelector(".carousel");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

prevButton.addEventListener("click", () => {
  carousel.scrollBy({
    left: -carousel.offsetWidth / 2,
    behavior: "smooth",
  });
});

nextButton.addEventListener("click", () => {
  carousel.scrollBy({
    left: carousel.offsetWidth / 2,
    behavior: "smooth",
  });
});


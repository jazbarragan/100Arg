document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.container-categorias .categoria');

  // asigna índice para que CSS calcule delay
  items.forEach((el, idx) => el.style.setProperty('--i', idx));

  // IntersectionObserver options: empieza a activar un poco antes con rootMargin
  const obsOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // activa cuando entra cerca del viewport (ajustalo si hace falta)
    threshold: 0
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // si querés que solo aparezca una vez:
        io.unobserve(entry.target);
      } else {
        // si querés que se esconda cuando sale de pantalla, descomenta:
        // entry.target.classList.remove('show');
      }
    });
  }, obsOptions);

  items.forEach(it => io.observe(it));

  console.log('Observer iniciado para', items.length, 'categorías');
});

console.log("conectado");
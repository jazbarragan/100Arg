// Carrusel - cards animadas
// Estrategia: mantener la posición central (middle) del contenedor como la tarjeta "active"
// y rotar los nodos DOM cuando el usuario presiona las flechas. De este modo la clase
// `active` siempre queda en la card del medio y el contenido cambia por rotación.

const container = document.querySelector('.carrusel-tarjetas-animadas-catalogo');
if (!container) {
  // nada que hacer si no existe el contenedor
  console.warn('No se encontró .carrusel-tarjetas-animadas-catalogo');
}

function updateCarousel() {
  const cards = Array.from(container.querySelectorAll('.tarjeta-animado-catalogo'));
  const len = cards.length;
  if (len === 0) return;

  // posición central fija (índice en la lista DOM)
  const centerPos = Math.floor(len / 2);

  // resetear todas las clases
  cards.forEach(card => {
    card.className = 'tarjeta-animado-catalogo';
  });

  // asignar clases según la distancia al centro (offset = i - centerPos)
  cards.forEach((card, i) => {
    const offset = i - centerPos;
    if (offset === 0) card.classList.add('active');
    else if (offset === -1) card.classList.add('side-left-cerca');
    else if (offset === -2) card.classList.add('side-left');
    else if (offset === 1) card.classList.add('side-right-cerca');
    else if (offset === 2) card.classList.add('side-right');
    // otras tarjetas quedan con la clase base (sin estilos especiales)
  });
}

// helpers para rotar nodos DOM
function rotateRight() {
  // mover primer hijo al final -> el contenido avanza a la izquierda, la tarjeta del medio cambia
  const first = container.firstElementChild;
  if (first) container.appendChild(first);
  updateCarousel();
}

function rotateLeft() {
  // mover último hijo al inicio
  const last = container.lastElementChild;
  if (last) container.insertBefore(last, container.firstElementChild);
  updateCarousel();
}

// listeners en las flechas (IDs existentes en el HTML)
const btnRight = document.getElementById('arrow-rigth'); // coincide con el id en HTML
const btnLeft = document.getElementById('arrow-left');
if (btnRight) btnRight.addEventListener('click', (e) => { e.preventDefault(); rotateRight(); });
if (btnLeft) btnLeft.addEventListener('click', (e) => { e.preventDefault(); rotateLeft(); });

// inicializar
updateCarousel();



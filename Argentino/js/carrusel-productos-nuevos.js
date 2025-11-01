document.addEventListener('DOMContentLoaded', () => {
	const view = document.querySelector('.carrusel-productos-nuevos-view');
	const scroller = document.querySelector('.carrusel-productos-nuevos-funcional');
	const btnPrev = document.querySelector('.flecha-izquierda');
	const btnNext = document.querySelector('.flecha-derecha');

	if (!view || !scroller || !btnPrev || !btnNext) return;

		// Envuelve cada imagen en un contenedor .producto y añade una pequeña superposición de tarjeta.
		const imgs = Array.from(scroller.querySelectorAll('img'));
		imgs.forEach(img => {
			// omitir si ya está envuelto 
			if (img.parentElement && img.parentElement.classList.contains('producto')) return;
			const wrapper = document.createElement('div');
			wrapper.className = 'producto';
			// mover imagen al contenedor
			img.parentNode.insertBefore(wrapper, img);
			wrapper.appendChild(img);

			// create a <p> caption below the image that will be visible only on hover
			const captionText = img.getAttribute('data-title') || img.alt || 'Producto';
			const caption = document.createElement('p');
			caption.className = 'producto-caption';
			// insertar un enlace que apunta a catalogo.html dentro del <p>
			const link = document.createElement('a');
			link.href = 'producto.html';
			link.textContent = captionText;
			caption.appendChild(link);
			wrapper.appendChild(caption);


		});

	// cantidad de desplazamiento en cada clic (casi el ancho de una pantalla)
	let scrollAmount = Math.max(220, Math.floor(view.clientWidth * 0.9));

	function updateButtons() {
		const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
		// inicio
		if (scroller.scrollLeft <= 5) {
			btnPrev.classList.add('disabled');
			btnPrev.setAttribute('aria-disabled', 'true');
		} else {
			btnPrev.classList.remove('disabled');
			btnPrev.setAttribute('aria-disabled', 'false');
		}
		// final
		if (scroller.scrollLeft >= maxScrollLeft - 5) {
			btnNext.classList.add('disabled');
			btnNext.setAttribute('aria-disabled', 'true');
		} else {
			btnNext.classList.remove('disabled');
			btnNext.setAttribute('aria-disabled', 'false');
		}
	}

	btnNext.addEventListener('click', () => {
		if (btnNext.classList.contains('disabled')) return;
		scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
	});

	btnPrev.addEventListener('click', () => {
		if (btnPrev.classList.contains('disabled')) return;
		scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
	});

	// update on scroll
	scroller.addEventListener('scroll', () => {
		requestAnimationFrame(updateButtons);
	});

	// recalculate on resize
	window.addEventListener('resize', () => {
		scrollAmount = Math.max(220, Math.floor(view.clientWidth * 0.9));
		updateButtons();
	});

	// allow keyboard navigation when the view is focused
	view.setAttribute('tabindex', '0');
	view.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowRight') btnNext.click();
		if (e.key === 'ArrowLeft') btnPrev.click();
	});

	// inicializar estados
	updateButtons();
});

console.log("conectado");
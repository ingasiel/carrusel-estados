document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const inner = carousel.querySelector('.carousel-inner');
    const cards = carousel.querySelectorAll('.card');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    let currentIndex = 0;
    let cardsPerGroup = 3; // Número predeterminado de tarjetas por grupo

    function showCards() {
        cards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + cardsPerGroup) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function nextSlide() {
        currentIndex += cardsPerGroup;
        if (currentIndex >= cards.length) {
            currentIndex = 0;
        }
        showCards();
        updateDots();
    }

    function prevSlide() {
        currentIndex -= cardsPerGroup;
        if (currentIndex < 0) {
            currentIndex = cards.length - cardsPerGroup;
        }
        showCards();
        updateDots();
    }

    function updateDots() {
        const numDots = Math.ceil(cards.length / cardsPerGroup);
        dotsContainer.innerHTML = '';
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', function () {
                currentIndex = i * cardsPerGroup;
                showCards();
                updateDots();
            });
            dotsContainer.appendChild(dot);
        }
        const dots = dotsContainer.querySelectorAll('.dot');
        dots[currentIndex / cardsPerGroup].classList.add('active');
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto avanzar cada 5 segundos
    setInterval(nextSlide, 5000);

    // Mostrar las primeras tarjetas
    showCards();
    updateDots();

    // Detectar cambios en el tamaño de la pantalla y ajustar el número de tarjetas por grupo
    function updateCardsPerGroup() {
        if (window.innerWidth <= 550) {
            cardsPerGroup = 2; // Si la pantalla es menor o igual a 550px, mostrar 2 tarjetas por grupo
        } else {
            cardsPerGroup = 3; // De lo contrario, mostrar 3 tarjetas por grupo
        }
        showCards(); // Actualizar la visualización de las tarjetas
        updateDots(); // Actualizar los puntos indicadores
    }

    // Ejecutar la función inicialmente y cada vez que se redimensione la pantalla
    updateCardsPerGroup();
    window.addEventListener('resize', updateCardsPerGroup);
});

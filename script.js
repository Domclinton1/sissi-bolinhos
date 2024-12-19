document.addEventListener("DOMContentLoaded", () => {
    const promoAlert = document.querySelector(".promo-alert");
    const menu = document.querySelector(".menu");

    // Calcula a altura da promo-alert
    const promoHeight = promoAlert.offsetHeight;

    // Evento de rolagem
    window.addEventListener("scroll", () => {
        if (window.scrollY > promoHeight) {
            menu.classList.add("fixed"); // Adiciona comportamento fixo
        } else {
            menu.classList.remove("fixed"); // Remove comportamento fixo
        }
    });
});



// Define a data de término para o final do dia atual
function getEndOfDay() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    return endOfDay.getTime();
}

// Função para atualizar a contagem regressiva
function updateCountdown() {
    const now = new Date().getTime();
    const endDate = getEndOfDay();
    const timeRemaining = endDate - now;

    if (timeRemaining > 0) {
        // Calcula os dias, horas, minutos e segundos restantes
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Exibe a contagem regressiva no elemento com id "countdown"
        document.getElementById("countdown").innerHTML = `${hours}h ${minutes}m ${seconds}s restantes`;
    } else {
        // Exibe uma mensagem quando a promoção acabar
        document.getElementById("promo-timer").innerHTML = "A promoção terminou!";
    }
}

// Atualiza a contagem regressiva a cada segundo
setInterval(updateCountdown, 1000);

// Função para toggle nas perguntas frequentes
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('active');
    });
});


// Função para exibir a data atual
function updateCurrentDate() {
    const now = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('pt-BR', options);
    document.getElementById('current-date').textContent = formattedDate;
}

// Chamar a função ao carregar a página
updateCurrentDate();



document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.touch-carousel .carousel');

    carousels.forEach(carousel => {
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let isDragging = false;

        const slides = carousel.children;
        const totalSlides = slides.length;
        const slideWidth = slides[0].offsetWidth;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            carousel.style.transition = 'none'; // Remove transição enquanto arrasta
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const deltaX = currentX - startX;
            currentTranslate = prevTranslate + deltaX;
            carousel.style.transform = `translateX(${currentTranslate}px)`;
        });

        carousel.addEventListener('touchend', () => {
            isDragging = false;

            // Calcula o slide mais próximo
            const movedSlides = Math.round(-currentTranslate / slideWidth);
            const clampedSlides = Math.max(0, Math.min(movedSlides, totalSlides - 1));

            // Atualiza o deslocamento
            currentTranslate = -clampedSlides * slideWidth;
            prevTranslate = currentTranslate;

            // Aplica a transição para o slide mais próximo
            carousel.style.transition = 'transform 0.3s ease';
            carousel.style.transform = `translateX(${currentTranslate}px)`;
        });
    });
});

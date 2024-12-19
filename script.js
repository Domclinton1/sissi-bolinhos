 // Define a data de término da promoção
 const endDate = new Date("2024-12-23T23:59:59").getTime();

 // Função para atualizar a contagem regressiva
 function updateCountdown() {
     const now = new Date().getTime();
     const timeRemaining = endDate - now;

     if (timeRemaining > 0) {
         // Calcula os dias, horas, minutos e segundos restantes
         const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
         const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
         const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

         // Exibe a contagem regressiva no elemento com id "countdown"
         document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
     } else {
         // Exibe uma mensagem quando a promoção acabar
         document.getElementById("promo-timer").innerHTML = "A promoção terminou!";
     }
 }

 // Atualiza a contagem regressiva a cada segundo
 setInterval(updateCountdown, 1000);


 document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('active');
    });
});


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

const carousel = document.querySelector(".carousel");
const triggerSection = document.querySelector(".content-carousel");
const sections = document.querySelectorAll(".bath-grooming");

let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
let lastChangeTime = 0;
let delayTimer;

// 🔹 Novo Observer com threshold ajustado
let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log("🔍 Entrando na seção?", entry.isIntersecting); // 🔥 Depuração

        if (entry.isIntersecting) {
            clearTimeout(delayTimer); // 🔥 Evita múltiplas execuções acumuladas
            delayTimer = setTimeout(() => {
                gsap.to(carousel, { opacity: 1, duration: 0.2, ease: "power2.out" });
                carousel.style.pointerEvents = "auto";
            }, 0); // 🔥 Pequeno atraso antes de aparecer (300ms)
        } else {
            // 🔥 Some imediatamente ao sair da seção
            gsap.to(carousel, { opacity: 0, duration: 0, ease: "power2.in" });
            carousel.style.pointerEvents = "none";
        }
    });
}, { threshold: 0.2 }); // 🔥 Menos sensível para ativar, mas some rápido

observer.observe(triggerSection);

// 🔹 Evento manual de scroll para garantir o desaparecimento imediato
window.addEventListener("scroll", () => {
    const rect = triggerSection.getBoundingClientRect();
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let isScrollingDown = scrollTop > lastScrollTop;
    lastScrollTop = scrollTop;

    if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3) {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => {
            carousel.style.opacity = "1";
            carousel.style.pointerEvents = "auto";
        }, 300); // 🔥 Atraso ao aparecer
    } else {
        gsap.to(carousel, { opacity: 0, duration: isScrollingDown ? 0.6 : 0.3, ease: "power2.in" });
        carousel.style.pointerEvents = "none";
    }
});

// 🔹 Observer para alternar imagens no carrossel
let observerSections = new IntersectionObserver(handleIntersection, { threshold: 0.8 });

sections.forEach(section => observerSections.observe(section));

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            let isScrollingDown = scrollTop > lastScrollTop;
            lastScrollTop = scrollTop;

            rotateImages(isScrollingDown);
        }
    });
}

function rotateImages(isScrollingDown) {
    const images = document.querySelectorAll(".image-wrapper");
    const carousel = document.querySelector(".carousel-imgs");

    if (isScrollingDown) {
        carousel.appendChild(images[0]); // 🔹 Move a PRIMEIRA imagem para o final (scroll para baixo)
    } else {
        carousel.insertBefore(images[images.length - 1], images[0]); // 🔹 Move a ÚLTIMA imagem para o início (scroll para cima)
    }

    updateClasses();
}

function updateClasses() {
    const images = document.querySelectorAll(".image-wrapper");

    images.forEach(img => img.classList.remove("top", "middle", "bottom"));

    images[0].classList.add("top");
    images[1].classList.add("middle");
    images[2].classList.add("bottom");

    applyAnimations();
}

function applyAnimations() {
    gsap.to(".top", { x: "0%", y: "-120%", scale: 0.9, opacity: 0.7, duration: 0.5, ease: "power2.out" });
    gsap.to(".middle", { x: "-250px", y: "0%", scale: 2.2, opacity: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(".bottom", { x: "0%", y: "120%", scale: 0.9, opacity: 0.7, duration: 0.5, ease: "power2.out" });
}


// flip cards
const cards = document.querySelectorAll('.card-wrapper');
  
  cards.forEach((card, index) => {
    // Add delay based on card index
    setTimeout(() => {
      card.style.opacity = '1';
    }, 100 * index);
  });



  /// Inicializa Swiper.js para a seção de promoções
const promoSwiper = new Swiper('.promo-slider', {
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        1024: { slidesPerView: 4 },
        768: { slidesPerView: 2 },
        480: { slidesPerView: 1 },
    },
    loop: true,
});

// Slider para "Nossos Clientes"
let index = 0;
        function moveSlide(step) {
            const slides = document.querySelectorAll(".slide");
            index = (index + step + slides.length) % slides.length;
            document.getElementById("slider").style.transform = `translateX(-${index * 100}%)`;
        }
        setInterval(() => moveSlide(1), 3000);
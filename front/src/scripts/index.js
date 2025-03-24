// Seleciona os elementos
const carouselImgs = document.querySelector('.carousel-imgs');
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel-imgs .image-wrapper'); // Selecione as imagens individuais

// Cria o Intersection Observer
const observerr = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      // Torna o elemento fixo quando o carousel estiver visível
      carouselImgs.classList.add('fixed');
    } else {
      // Remove o comportamento fixo quando o carousel sair da tela
      carouselImgs.classList.remove('fixed');
    }
  },
  {
    threshold: 0.5,  // O 'carousel' precisa estar 50% visível para ativar
  }
);

// Para cada imagem dentro do carousel, aplica a lógica de fixação
images.forEach(image => {
  observerr.observe(image);
});

// Começa a observar o elemento carousel
observerr.observe(carousel);


//gsap
const carouselSection = document.querySelector(".carousel");
const carouselImages = document.querySelector(".carousel-imgs");

let lastScrollTop = 0; // Armazena a última posição do scroll
let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            gsap.to(carouselImages, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" });
        } else {
            gsap.to(carouselImages, { opacity: 0, scale: 0.8, filter: "blur(10px)", duration: 0.8, ease: "power2.inOut" });
        }
    });
}, { threshold: 0.2 });

observer.observe(carouselSection);

let sections = document.querySelectorAll(".bath-grooming");
let observerSections = new IntersectionObserver(handleIntersection, { threshold: 0.6 });

sections.forEach(section => observerSections.observe(section));

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            let isScrollingDown = scrollTop > lastScrollTop; // Verifica se está descendo
            lastScrollTop = scrollTop; // Atualiza a posição do scroll

            rotateImages(isScrollingDown); // Chama a função passando a direção do scroll
        }
    });
}

function rotateImages(isScrollingDown) {
    const images = document.querySelectorAll(".image-wrapper");
    const carousel = document.querySelector(".carousel-imgs");

    if (isScrollingDown) {
        carousel.appendChild(images[0]); // Move a primeira imagem para o final (scroll para baixo)
    } else {
        carousel.insertBefore(images[images.length - 1], images[0]); // Move a última imagem para o início (scroll para cima)
    }

    setTimeout(updateClasses, 50);
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
    gsap.to(".top", { x: "0%", y: "-120%", scale: 0.9, opacity: 0.7, duration: 0.8 });
    gsap.to(".middle", { x: "-300px", y: "0%", scale: 2.5, opacity: 1, duration: 0.8 }); // Somente a do meio desloca
    gsap.to(".bottom", { x: "0%", y: "120%", scale: 0.9, opacity: 0.7, duration: 0.8 });
}




  
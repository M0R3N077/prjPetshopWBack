const swiper = new Swiper(".slider-wrapper", {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
  
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
  
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  
    breakpoints: {
      0: {
        // Celulares pequenos
        slidesPerView: 1,
      },
      480: {
        // Celulares médios
        slidesPerView: 1,
        spaceBetween: 15,
      },
      600: {
        // Celulares grandes
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        // Tablets
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1024: {
        // Desktop
        slidesPerView: 3,
      },
      1280: {
        // Telas maiores
        slidesPerView: 4,
      },
    },
  });
  
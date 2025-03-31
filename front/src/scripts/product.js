document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Add to cart animation
    const addToCartButtons = document.querySelectorAll('[id^="product-btn-"]');
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        this.textContent = '✓ Adicionado!';
        this.style.backgroundColor = '#F8ABC9';
        this.style.color = '#004D40';
        
        setTimeout(() => {
          this.textContent = 'Adicionar ao Carrinho';
          this.style.backgroundColor = '#005D44';
          this.style.color = 'white';
        }, 2000);
      });
    });
  
    // Add animation to products when they come into view
    const productCards = document.querySelectorAll('[id^="product-card-"]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    productCards.forEach(card => {
      card.style.opacity = 0;
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    });
  });
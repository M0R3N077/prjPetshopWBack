document.addEventListener('DOMContentLoaded', function() {
    // Dados dos produtos do carrinho (simulação)
    const cartData = [
      {
        id: 1,
        name: "Aquario Para Peixe",
        price: 89.99,
        quantity: 1,
        image: "https://m.media-amazon.com/images/I/71mmhAWDz9L._AC_UF1000,1000_QL80_.jpg"
      },
      {
        id: 2,
        name: "Ração e cosméticos",
        price: 179.99,
        quantity: 2,
        image: "https://images.tcdn.com.br/img/img_prod/656618/rhenuks_raca_e_forca_kit_hidratacao_e_crescimento_vitamina_a_4_produtos_3658_1_a901bfa5cc72c8799b66146042b1ebca.jpg"
      },
      {
        id: 3,
        name: "Brinquedos",
        price: 159.99,
        quantity: 1,
        image: "https://down-br.img.susercontent.com/file/32e7b64738c4936f67cade4301210821"
      }
    ];
  
    // Elementos do DOM
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartEl = document.getElementById('emptyCart');
    const cartContentEl = document.getElementById('cartContent');
    const subtotalValueEl = document.getElementById('subtotalValue');
    const shippingValueEl = document.getElementById('shippingValue');
    const totalValueEl = document.getElementById('totalValue');
    
    // Constantes
    const SHIPPING_COST = 15.99;
  
    // Funções de formatação
    function formatPrice(price) {
      return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    }
  
    // Renderiza os itens do carrinho
    function renderCartItems() {
      cartItemsContainer.innerHTML = '';
      
      if (cartData.length === 0) {
        cartContentEl.style.display = 'none';
        emptyCartEl.style.display = 'block';
        return;
      }
      
      cartContentEl.style.display = 'grid';
      emptyCartEl.style.display = 'none';
      
      cartData.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.id = `cartItem-${item.id}`;
        
        itemElement.innerHTML = `
          <div class="item-image">
            <img src="${item.image}" alt="${item.name}" id="item-img-${item.id}">
          </div>
          <div class="item-details">
            <div class="item-row">
              <div>
                <div class="item-name" id="item-name-${item.id}">${item.name}</div>
                <div class="item-price" id="item-price-${item.id}">${formatPrice(item.price)}</div>
              </div>
              <div>
                <div class="quantity-controls" id="quantity-controls-${item.id}">
                  <button class="quantity-btn" id="decrease-btn-${item.id}" ${item.quantity <= 1 ? 'disabled' : ''}>
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <span class="quantity-value" id="item-qty-${item.id}">${item.quantity}</span>
                  <button class="quantity-btn" id="increase-btn-${item.id}">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="item-row" style="margin-top: 1rem;">
              <div></div>
              <button class="remove-btn" id="remove-btn-${item.id}">
                <i class="fa-solid fa-trash-can"></i> Remover
              </button>
            </div>
          </div>
        `;
        
        cartItemsContainer.appendChild(itemElement);
        
        // Adicionar event listeners para os botões
        document.getElementById(`decrease-btn-${item.id}`).addEventListener('click', () => decreaseQuantity(item.id));
        document.getElementById(`increase-btn-${item.id}`).addEventListener('click', () => increaseQuantity(item.id));
        document.getElementById(`remove-btn-${item.id}`).addEventListener('click', () => removeItem(item.id));
      });
    }
  
    // Atualiza os valores de resumo
    function updateSummary() {
      const subtotal = cartData.reduce((total, item) => total + (item.price * item.quantity), 0);
      const shipping = cartData.length > 0 ? SHIPPING_COST : 0;
      const total = subtotal + shipping;
      
      subtotalValueEl.textContent = formatPrice(subtotal);
      shippingValueEl.textContent = formatPrice(shipping);
      totalValueEl.textContent = formatPrice(total);
    }
  
    // Funções para manipular os itens do carrinho
    function increaseQuantity(itemId) {
      const item = cartData.find(item => item.id === itemId);
      if (item) {
        item.quantity += 1;
        document.getElementById(`item-qty-${itemId}`).textContent = item.quantity;
        document.getElementById(`decrease-btn-${itemId}`).disabled = false;
        updateSummary();
        showToast('Quantidade aumentada!');
      }
    }
  
    function decreaseQuantity(itemId) {
      const item = cartData.find(item => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        document.getElementById(`item-qty-${itemId}`).textContent = item.quantity;
        if (item.quantity === 1) {
          document.getElementById(`decrease-btn-${itemId}`).disabled = true;
        }
        updateSummary();
        showToast('Quantidade diminuída!');
      }
    }
  
    function removeItem(itemId) {
      const index = cartData.findIndex(item => item.id === itemId);
      if (index !== -1) {
        const removedItem = cartData[index];
        cartData.splice(index, 1);
        renderCartItems();
        updateSummary();
        showToast(`"${removedItem.name}" removido do carrinho!`);
      }
    }
  
    // Cria e exibe uma notificação toast
    function showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.right = '20px';
      toast.style.backgroundColor = 'var(--primary-color)';
      toast.style.color = 'white';
      toast.style.padding = '10px 20px';
      toast.style.borderRadius = 'var(--border-radius)';
      toast.style.boxShadow = 'var(--box-shadow)';
      toast.style.zIndex = '1000';
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.2s';
      toast.textContent = message;
      
      document.body.appendChild(toast);
      
      // Mostra o toast
      setTimeout(() => {
        toast.style.opacity = '1';
      }, 10);
      
      // Remove após 3 segundos
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 200);
      }, 3000);
    }
  
    // Event listener para o botão de checkout
    document.getElementById('checkoutBtn').addEventListener('click', function() {
      showToast('Redirecionando para o checkout...');
      // Simulação de redirecionamento
      setTimeout(() => {
        
      }, 1000);
    });
  
  
    // Inicializar a página
    renderCartItems();
    updateSummary();
  });
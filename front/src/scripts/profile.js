document.addEventListener('DOMContentLoaded', function() {
    // Elementos do modal
    const profileModal = document.getElementById('profile-edit-modal');
    const modalTitle = document.getElementById('profile-modal-title');
    const formLabel = document.getElementById('profile-form-label');
    const editInput = document.getElementById('profile-edit-input');
    const editForm = document.getElementById('profile-edit-form');
    const cancelBtn = document.getElementById('profile-cancel-btn');
    
    // Elementos para edição de pet
    const petFormGroup = document.getElementById('profile-pet-form-group');
    const petNameInput = document.getElementById('profile-pet-name-input');
    const petBreedInput = document.getElementById('profile-pet-breed-input');
    const petAgeInput = document.getElementById('profile-pet-age-input');
    
    // Dados do usuário
    let userData = {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 98765-4321',
      address: 'Rua das Flores, 123 - São Paulo'
    };
    
    // Dados dos pets
    let petsData = [
      {
        id: 1,
        name: 'Rex',
        breed: 'Golden Retriever',
        age: '3 anos',
        image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6'
      }
    ];
    
    // Variável para armazenar o campo que está sendo editado
    let currentField = '';
    let currentPetId = null;
    
    // Configuração dos botões de edição de perfil
    document.getElementById('profile-edit-name-btn').addEventListener('click', function() {
      openModal('name', 'Nome', userData.name);
    });
    
    document.getElementById('profile-edit-email-btn').addEventListener('click', function() {
      openModal('email', 'Email', userData.email);
    });
    
    document.getElementById('profile-edit-phone-btn').addEventListener('click', function() {
      openModal('phone', 'Telefone', userData.phone);
    });
    
    document.getElementById('profile-edit-address-btn').addEventListener('click', function() {
      openModal('address', 'Endereço', userData.address);
    });
    
    // Botão para editar pet existente
    const editPetBtns = document.querySelectorAll('.profile-edit-pet-btn');
    editPetBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const petCard = this.closest('.profile-pet-card');
        const petId = parseInt(petCard.getAttribute('data-pet-id'));
        openPetModal(petId);
      });
    });
    
    // Botão para adicionar novo pet
    document.getElementById('profile-add-pet-btn').addEventListener('click', function() {
      openPetModal();
    });
    
    // Botão para editar avatar
    document.getElementById('profile-edit-avatar-btn').addEventListener('click', function() {
      document.getElementById('profile-avatar-input').click();
    });
    
    // Input de arquivo para avatar
    document.getElementById('profile-avatar-input').addEventListener('change', function(event) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          document.getElementById('profile-avatar').src = e.target.result;
          showAlert('Foto de perfil atualizada com sucesso!', 'success');
        };
        
        reader.readAsDataURL(event.target.files[0]);
      }
    });
    
    // Botão para logout
    document.getElementById('profile-logout-btn').addEventListener('click', function() {
      showAlert('Logout realizado com sucesso!', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    });
    
    // Função para abrir o modal de edição simples
    function openModal(field, label, value) {
      hideElements(petFormGroup);
      showElements(formLabel, editInput);
      
      modalTitle.textContent = `Editar ${label}`;
      formLabel.textContent = label;
      editInput.value = value;
      profileModal.style.display = 'flex';
      currentField = field;
    }
    
    // Função para abrir o modal de edição de pet
    function openPetModal(petId = null) {
      hideElements(formLabel, editInput);
      showElements(petFormGroup);
      
      if (petId) {
        const pet = petsData.find(p => p.id === petId);
        modalTitle.textContent = 'Editar Pet';
        petNameInput.value = pet.name;
        petBreedInput.value = pet.breed;
        petAgeInput.value = pet.age.replace(' anos', '');
        currentPetId = petId;
      } else {
        modalTitle.textContent = 'Adicionar Novo Pet';
        petNameInput.value = '';
        petBreedInput.value = '';
        petAgeInput.value = '';
        currentPetId = null;
      }
      
      profileModal.style.display = 'flex';
      currentField = 'pet';
    }
    
    // Função auxiliar para esconder elementos
    function hideElements(...elements) {
      elements.forEach(el => {
        if (el) el.style.display = 'none';
      });
    }
    
    // Função auxiliar para mostrar elementos
    function showElements(...elements) {
      elements.forEach(el => {
        if (el) el.style.display = 'block';
      });
    }
    
    // Fechar o modal ao clicar no botão cancelar
    cancelBtn.addEventListener('click', function() {
      profileModal.style.display = 'none';
    });
    
    // Fechar o modal clicando fora dele
    profileModal.addEventListener('click', function(event) {
      if (event.target === profileModal) {
        profileModal.style.display = 'none';
      }
    });
    
    // Processar o formulário
    editForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Para edição de pet
      if (currentField === 'pet') {
        const petName = petNameInput.value.trim();
        const petBreed = petBreedInput.value.trim();
        const petAge = petAgeInput.value.trim();
        
        if (!petName || !petBreed || !petAge) {
          showAlert('Por favor, preencha todos os campos', 'error');
          return;
        }
        
        if (currentPetId) {
          // Editar pet existente
          const petIndex = petsData.findIndex(p => p.id === currentPetId);
          if (petIndex !== -1) {
            petsData[petIndex].name = petName;
            petsData[petIndex].breed = petBreed;
            petsData[petIndex].age = `${petAge} anos`;
            
            // Atualizar UI
            const petCard = document.querySelector(`.profile-pet-card[data-pet-id="${currentPetId}"]`);
            petCard.querySelector('.profile-pet-name').textContent = petName;
            petCard.querySelector('.profile-pet-breed').textContent = petBreed;
            petCard.querySelector('.profile-pet-age').textContent = `${petAge} anos`;
            
            showAlert('Pet atualizado com sucesso!', 'success');
          }
        } else {
          // Adicionar novo pet
          const newPet = {
            id: petsData.length > 0 ? Math.max(...petsData.map(p => p.id)) + 1 : 1,
            name: petName,
            breed: petBreed,
            age: `${petAge} anos`,
            image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6' // Imagem padrão
          };
          
          petsData.push(newPet);
          
          // Adicionar pet à UI
          addPetToUI(newPet);
          
          showAlert('Pet adicionado com sucesso!', 'success');
        }
      } else {
        // Para campos simples
        const newValue = editInput.value.trim();
        
        if (!newValue) {
          showAlert('Por favor, preencha o campo', 'error');
          return;
        }
        
        // Atualizar os dados com base no campo atual
        if (currentField === 'name') {
          userData.name = newValue;
          document.getElementById('profile-name').textContent = newValue;
          showAlert('Nome atualizado com sucesso!', 'success');
        } else if (currentField === 'email') {
          userData.email = newValue;
          document.getElementById('profile-email').textContent = newValue;
          showAlert('Email atualizado com sucesso!', 'success');
        } else if (currentField === 'phone') {
          userData.phone = newValue;
          document.getElementById('profile-phone').textContent = newValue;
          showAlert('Telefone atualizado com sucesso!', 'success');
        } else if (currentField === 'address') {
          userData.address = newValue;
          document.getElementById('profile-address').textContent = newValue;
          showAlert('Endereço atualizado com sucesso!', 'success');
        }
      }
      
      // Fechar o modal
      profileModal.style.display = 'none';
    });
    
    // Função para adicionar pet à UI
    function addPetToUI(pet) {
      const petsContainer = document.getElementById('profile-pets-list');
      const addPetCard = document.getElementById('profile-add-pet-card');
      
      const petCard = document.createElement('div');
      petCard.className = 'profile-pet-card';
      petCard.setAttribute('data-pet-id', pet.id);
      
      petCard.innerHTML = `
        <img class="profile-pet-image" src="${pet.image}" alt="${pet.name}">
        <div class="profile-pet-info">
          <h3 class="profile-pet-name">${pet.name}</h3>
          <p class="profile-pet-breed">${pet.breed}</p>
          <p class="profile-pet-age">${pet.age}</p>
        </div>
        <button class="profile-edit-pet-btn profile-edit-btn">
          <span class="profile-pencil-icon"></span>
        </button>
      `;
      
      // Adicionar listener ao botão de edição
      petCard.querySelector('.profile-edit-pet-btn').addEventListener('click', function() {
        openPetModal(pet.id);
      });
      
      // Inserir antes do card de adicionar pet
      petsContainer.insertBefore(petCard, addPetCard);
    }
    
    // Função para exibir alertas
    function showAlert(message, type) {
      // Criar elemento de alerta
      const alertEl = document.createElement('div');
      alertEl.id = 'profile-alert';
      alertEl.textContent = message;
      
      // Configurar estilo do alerta com base no tipo
      alertEl.style.position = 'fixed';
      alertEl.style.bottom = '20px';
      alertEl.style.left = '50%';
      alertEl.style.transform = 'translateX(-50%)';
      alertEl.style.padding = '15px 25px';
      alertEl.style.borderRadius = 'var(--border-radius)';
      alertEl.style.boxShadow = 'var(--box-shadow)';
      alertEl.style.zIndex = '1001';
      alertEl.style.fontSize = '16px';
      alertEl.style.fontWeight = 'bold';
      
      // Definir cores com base no tipo
      if (type === 'success') {
        alertEl.style.backgroundColor = '#E3F2FD';
        alertEl.style.color = '#005D44';
        alertEl.style.borderLeft = '5px solid #005D44';
      } else if (type === 'error') {
        alertEl.style.backgroundColor = '#FFEBEE';
        alertEl.style.color = '#D32F2F';
        alertEl.style.borderLeft = '5px solid #D32F2F';
      } else if (type === 'info') {
        alertEl.style.backgroundColor = '#E8F5E9';
        alertEl.style.color = '#005D44';
        alertEl.style.borderLeft = '5px solid #F8ABC9';
      }
      
      // Adicionar ao corpo do documento
      document.body.appendChild(alertEl);
      
      // Remover após 3 segundos
      setTimeout(function() {
        alertEl.style.opacity = '0';
        alertEl.style.transition = 'opacity 0.5s ease';
        
        // Remover do DOM após a animação
        setTimeout(function() {
          document.body.removeChild(alertEl);
        }, 500);
      }, 3000);
    }
  });
  
  
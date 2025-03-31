document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const calendarGrid = document.getElementById('calendarGrid');
  const currentMonthYearElement = document.getElementById('currentMonthYear');
  const prevMonthButton = document.getElementById('prevMonth');
  const nextMonthButton = document.getElementById('nextMonth');
  const timeSlots = document.querySelectorAll('.time-slot');
  const serviceSelect = document.getElementById('serviceSelect');
  const submitButton = document.getElementById('submitButton');
  const selectedInfo = document.getElementById('selected-info');  // Para mostrar o agendamento
  const pawIcon = document.getElementById('paw-icon');
  
  // Set paw icon path
  pawIcon.src = '../../public/assets/imgs/logoPata.png';
  
  // State variables
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let selectedDay = null;
  let selectedTime = null;
  let selectedService = '';
  
  // Days of the week in Portuguese
  const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
  
  // Month names in Portuguese
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  // Initialize the calendar
  function initCalendar() {
    updateCalendar();
    addEventListeners();
  }
  
  // Update the calendar based on the current month and year
  function updateCalendar() {
    // Clear the grid
    calendarGrid.innerHTML = '';
    
    // Add day headers
    daysOfWeek.forEach(day => {
      const dayHeader = document.createElement('div');
      dayHeader.className = 'day-header';
      dayHeader.textContent = day;
      calendarGrid.appendChild(dayHeader);
    });
    
    // Get days in month and first day of month
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'calendar-day empty';
      calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'calendar-day';
      dayElement.textContent = day;
      dayElement.dataset.day = day;
      
      // Add click event to select the day
      dayElement.addEventListener('click', () => {
        // Remove selected class from all days
        document.querySelectorAll('.calendar-day').forEach(el => {
          el.classList.remove('selected');
        });
        
        // Add selected class to clicked day
        dayElement.classList.add('selected');
        selectedDay = day;
        
        // Update confirmation area
        updateConfirmationArea();
        
        // Check if submit button should be enabled
        checkSubmitButton();
      });
      
      calendarGrid.appendChild(dayElement);
    }
    
    // Update the month and year display
    currentMonthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  }
  
  // Get the number of days in a month
  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  
  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }
  
  // Update the confirmation area with selected info
  function updateConfirmationArea() {
    if (selectedDay && selectedTime && selectedService) {
      const formattedDate = `${selectedDay}/${currentMonth + 1}/${currentYear}`;
      selectedInfo.textContent = `Você selecionou ${formattedDate} às ${selectedTime} para o serviço de ${selectedService}.`;
    } else {
      selectedInfo.textContent = 'Nenhuma seleção feita.';
    }
  }
  
  // Go to previous month
  function goToPreviousMonth() {
    selectedDay = null;
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    updateCalendar();
    checkSubmitButton();
  }
  
  // Go to next month
  function goToNextMonth() {
    selectedDay = null;
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    updateCalendar();
    checkSubmitButton();
  }
  
  // Check if the date is valid for scheduling (until December 2026)
  function isValidSchedulingDate() {
    const endDate = new Date(2026, 11, 31); // December 31, 2026
    const selectedDate = new Date(currentYear, currentMonth, selectedDay || 1);
    return selectedDate <= endDate;
  }
  
  // Check if submit button should be enabled
  function checkSubmitButton() {
    if (selectedDay && selectedTime && selectedService && isValidSchedulingDate()) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }
  
  // Handle form submission
  function handleSubmit() {
    if (selectedDay && selectedTime && selectedService && isValidSchedulingDate()) {
      const formattedDate = `${selectedDay}/${currentMonth + 1}/${currentYear}`;
      
      // Show SweetAlert2 custom alert
      Swal.fire({
        title: 'Agendamento Confirmado!',
        text: `Seu agendamento foi feito com sucesso para ${formattedDate} às ${selectedTime} - Serviço: ${selectedService}.`,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      
      // Reset form
      selectedDay = null;
      selectedTime = null;
      selectedService = '';
      
      // Reset UI
      document.querySelectorAll('.calendar-day').forEach(el => {
        el.classList.remove('selected');
      });
      
      timeSlots.forEach(slot => {
        slot.classList.remove('selected');
      });
      
      serviceSelect.value = '';
      
      checkSubmitButton();
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  }
  
  // Add event listeners
  function addEventListeners() {
    // Previous month button
    prevMonthButton.addEventListener('click', goToPreviousMonth);
    
    // Next month button
    nextMonthButton.addEventListener('click', goToNextMonth);
    
    // Time slot selection
    timeSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        timeSlots.forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        selectedTime = slot.dataset.time;
        
        // Update confirmation area
        updateConfirmationArea();
        
        checkSubmitButton();
      });
    });
    
    // Service selection
    serviceSelect.addEventListener('change', function() {
      selectedService = this.value;
      
      // Update confirmation area
      updateConfirmationArea();
      
      checkSubmitButton();
    });
    
    // Submit button
    submitButton.addEventListener('click', handleSubmit);
  }
  
  // Initialize the app
  initCalendar();
  checkSubmitButton();
});

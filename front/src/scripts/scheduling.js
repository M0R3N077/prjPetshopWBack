const calendarBody = document.getElementById('calendar-body');
const currentMonthYear = document.getElementById('current-month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const timeButtons = document.querySelectorAll('.time-slot-btn');
const serviceInput = document.getElementById('service-input');
const selectedInfo = document.getElementById('selected-info');
const submitBtn = document.getElementById('submit-btn');

let today = new Date();
let selectedDate = '';
let selectedTime = '';
let displayedMonth = today.getMonth();
let displayedYear = today.getFullYear();

function generateCalendar(month, year) {
  calendarBody.innerHTML = '';
  currentMonthYear.textContent = `${monthName(month)} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      let cell = document.createElement('td');

      if (i === 0 && j < firstDay) {
        cell.textContent = '';
      } else if (date > totalDays) {
        cell.textContent = '';
      } else {
        cell.textContent = date;
        cell.classList.add('selectable-date');
        cell.addEventListener('click', () => selectDate(cell, date, month, year));
        date++;
      }
      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }
}

function monthName(month) {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return months[month];
}

function selectDate(cell, day, month, year) {
  document.querySelectorAll('.selected-date').forEach(el => el.classList.remove('selected-date'));
  cell.classList.add('selected-date');
  selectedDate = `${day}/${month + 1}/${year}`;
  updateSelectedInfo();
}

prevMonthBtn.addEventListener('click', () => {
  displayedMonth--;
  if (displayedMonth < 0) {
    displayedMonth = 11;
    displayedYear--;
  }
  generateCalendar(displayedMonth, displayedYear);
});

nextMonthBtn.addEventListener('click', () => {
  displayedMonth++;
  if (displayedMonth > 11) {
    displayedMonth = 0;
    displayedYear++;
  }
  generateCalendar(displayedMonth, displayedYear);
});

timeButtons.forEach(button => {
  button.addEventListener('click', () => {
    timeButtons.forEach(b => b.classList.remove('selected'));
    button.classList.add('selected');
    selectedTime = button.textContent;
    updateSelectedInfo();
  });
});

function updateSelectedInfo() {
  selectedInfo.textContent = `Data: ${selectedDate || 'não selecionado'} | Hora: ${selectedTime || 'não selecionado'} | Serviço: ${serviceInput.value || 'não informado'}`;
}

serviceInput.addEventListener('input', updateSelectedInfo);

submitBtn.addEventListener('click', () => {
  if (!selectedDate || !selectedTime || !serviceInput.value) {
    alert('Por favor, selecione uma data, horário e preencha o serviço.');
    return;
  }
  alert(`Agendamento realizado com sucesso!\nData: ${selectedDate}\nHora: ${selectedTime}\nServiço: ${serviceInput.value}`);
  console.log('Agendamento enviado:', selectedDate, selectedTime, serviceInput.value);
});

generateCalendar(displayedMonth, displayedYear);

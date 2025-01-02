// Получаем элементы
const modal = document.getElementById('modal');
const openButtons = document.querySelectorAll('.open-modal-btn'); // Все кнопки
const closeButton = document.getElementById('closeModalBtn'); // Исправлено

// Функция для открытия модального окна
function openModal() {
    modal.style.display = 'flex';
}

// Функция для закрытия модального окна
function closeModal() {
    modal.style.display = 'none';
}

// Добавляем обработчик клика для каждой кнопки
openButtons.forEach(button => {
    button.addEventListener('click', openModal);
});

// Закрытие окна по кнопке
closeButton.addEventListener('click', closeModal);

// Закрытие окна при клике вне контента
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
 const menuToggle = document.querySelector('.menu-toggle');
        const menu = document.querySelector('.menu');

        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('menu-open');
            menuToggle.classList.toggle('menu-open');
        });

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.menu li a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('menu-open');
                menuToggle.classList.remove('menu-open');
            });
        });




        // Анимация при прокрутке
function handleScrollAnimation() {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.setAttribute('data-aos', 'fade-up');
      }
    });
  }
  
  // Инициализация при загрузке и прокрутке
  window.addEventListener('scroll', handleScrollAnimation);
  handleScrollAnimation();
  



  function animateNumbers() {
    const counters = document.querySelectorAll('.facts-numbers div');
    counters.forEach((counter) => {
      const value = +counter.textContent.replace(/\D/g, ''); // Убираем текст
      let start = 0;
      const duration = 2000; // Время анимации (мс)
      const step = Math.ceil(value / (duration / 16)); // Шаг анимации
  
      const updateCounter = () => {
        start += step;
        if (start >= value) {
          counter.textContent = value.toLocaleString();
        } else {
          counter.textContent = start.toLocaleString();
          requestAnimationFrame(updateCounter);
        }
      };
      updateCounter();
    });
  }
  
  window.addEventListener('scroll', () => {
    const factsSection = document.querySelector('.facts-container');
    const rect = factsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && !factsSection.dataset.animated) {
      factsSection.dataset.animated = true;
      animateNumbers();
    }
  });
  



  // Получаем все чекбоксы и элемент для отображения стоимости
const checkboxes = document.querySelectorAll('#pricing .service-item input[type="checkbox"]');
const totalCostElement = document.getElementById('total-cost');

// Функция для расчета стоимости
function calculateTotalCost() {
    let totalCost = 0;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            totalCost += parseInt(checkbox.dataset.price, 10);
        }
    });

    totalCostElement.textContent = totalCost.toLocaleString(); // Добавляем форматирование
}

// Добавляем обработчики событий на изменение состояния чекбоксов
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', calculateTotalCost);
});

// Вызываем функцию расчета при загрузке страницы
calculateTotalCost();



// Обработка отправки формы
document.getElementById('modal-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Отменяем стандартное поведение формы

  // Получаем данные из формы
  const formData = new FormData(this);

  // Отправляем данные через Fetch API
  fetch('process_form.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.text())
  .then(result => {
      alert(result); // Показываем результат пользователю
      closeModal(); // Закрываем модальное окно
  })
  .catch(error => {
      console.error('Ошибка отправки данных:', error);
      alert('Произошла ошибка. Попробуйте снова.');
  });
});




document.getElementById('modal-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  console.log('Данные формы:', [...formData.entries()]); // Вывод данных в консоль

  fetch('process_form.php', {
      method: 'POST',
      body: formData
  })
  .then(response => {
      console.log('Статус ответа:', response.status); // Проверяем статус
      return response.text();
  })
  .then(result => {
      console.log('Результат:', result); // Вывод результата
      alert(result);
      closeModal();
  })
  .catch(error => {
      console.error('Ошибка отправки данных:', error);
      alert('Произошла ошибка. Попробуйте снова.');
  });
});

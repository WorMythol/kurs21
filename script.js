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




        
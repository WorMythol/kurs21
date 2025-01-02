<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);



// Подключение к базе данных
$servername = "localhost"; // Или хост вашего хостинга
$username = "f1065933_ggg"; // Имя пользователя базы данных
$password = "aQszv5insQ7HkGx"; // Пароль базы данных
$dbname = "f1065933_GG"; // Имя базы данных

$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка подключения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}
echo "Подключение к базе данных успешно.<br>";

// Проверяем метод POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Выводим данные формы для отладки
    echo "Полученные данные: ";
    print_r($_POST);

    // Получаем данные из формы
    $name = isset($_POST['name']) ? $conn->real_escape_string($_POST['name']) : '';
    $phone = isset($_POST['phone']) ? $conn->real_escape_string($_POST['phone']) : '';

    // Проверяем заполненность полей
    if (empty($name) || empty($phone)) {
        die("Ошибка: Все поля формы должны быть заполнены.");
    }

    // SQL-запрос
    $sql = "INSERT INTO records (name, phone) VALUES ('$name', '$phone')";
    if ($conn->query($sql) === TRUE) {
        echo "Запись успешно добавлена!";
    } else {
        echo "Ошибка выполнения запроса: " . $conn->error;
    }
} else {
    echo "Данные не отправлены через POST.";
}
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: text/plain');
echo "Форма успешно обработана!";

// Вывод входящих данных для проверки
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "\nДанные POST:\n";
    print_r($_POST);

    echo "\nФайлы:\n";
    print_r($_FILES);
}
$conn->close();
?>
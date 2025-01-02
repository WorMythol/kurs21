import pymysql
import pandas as pd
from aiogram import Bot, Dispatcher, types
from aiogram.types import InputFile
from aiogram.utils import executor

# Настройки
TOKEN = "7984810053:AAGs2crNYnbpgpQz7tLS15h1ko_kUtenHK4"
DB_HOST = "10.0.74.92"
DB_USER = "f1065933_ggg"
DB_PASSWORD = "aQszv5insQ7HkGx"
DB_NAME = "f1065933_GG"

bot = Bot(token=TOKEN)
dp = Dispatcher(bot)

# Подключение к базе данных
connection = pymysql.connect(
    host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME
)

# Проверка новых записей
last_id = 0

async def check_new_entries():
    global last_id
    with connection.cursor() as cursor:
        cursor.execute("SELECT MAX(id) FROM records")
        max_id = cursor.fetchone()[0]
        if max_id is None:
            max_id = 0
        if max_id > last_id:
            cursor.execute("SELECT * FROM records WHERE id > %s", (last_id,))
            rows = cursor.fetchall()
            for row in rows:
                await bot.send_message(chat_id="1401853599", text=f"Новая запись: {row}")
            last_id = max_id

# Команда для выгрузки базы
@dp.message_handler(commands=["export"])
async def export_db(message: types.Message):
    query = "SELECT * FROM records"
    data = pd.read_sql(query, connection)
    file_path = "database_export.xlsx"
    data.to_excel(file_path, index=False)

    await message.reply_document(InputFile(file_path), caption="Вот выгрузка базы данных.")

# Запуск проверок в фоновом режиме
async def scheduler():
    import asyncio
    while True:
        try:
            await check_new_entries()
        except Exception as e:
            print(f"Ошибка в scheduler: {e}")
        await asyncio.sleep(10)
# Обработчик старта
@dp.message_handler(commands=["start"])
async def start_cmd(message: types.Message):
    await message.reply("Привет! Я бот, который уведомляет о новых записях в базе данных и может сделать выгрузку.")

# Основной запуск
if __name__ == "__main__":
    import asyncio
    loop = asyncio.get_event_loop()
    loop.create_task(scheduler())
    executor.start_polling(dp, skip_updates=True)

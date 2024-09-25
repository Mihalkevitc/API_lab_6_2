# Установка базового образа Node.js
FROM node:16

# Установка рабочей директории в контейнере
WORKDIR /app

# Копирование package.json и package-lock.json
COPY backend/package*.json ./

# Установка зависимостей
RUN npm install --production

# Копирование кода приложения
COPY backend/ .

# Открытие порта (например, если ваше приложение слушает порт 3000)
EXPOSE 3000

# Команда запуска приложения
CMD ["npm", "start"]

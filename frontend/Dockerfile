# Установка базового образа для Node.js для сборки Angular
FROM node:16 as build

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY frontend/package*.json ./

# Установка зависимостей
RUN npm install

# Копирование всех исходных файлов
COPY frontend/ .

# Сборка Angular приложения
RUN npm run build -- --prod

# Использование сервера NGINX для хостинга frontend
FROM nginx:alpine

# Копирование собранного приложения из предыдущего контейнера в NGINX директорию
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Открытие порта
EXPOSE 80

# Запуск NGINX
CMD ["nginx", "-g", "daemon off;"]

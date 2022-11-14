
# Самостоятельный учебный проект в [Яндекс Практикум - Мидл-фронтенд разработчик](https://practicum.yandex.ru/middle-frontend/): Мессанджер

  

![Messanger-chat](https://user-images.githubusercontent.com/29326762/189125988-04f34488-4b4d-4fb5-a194-e9886be08dcb.png)

  
  

## Общие сведения

  

> Макет дизайна в Figma: [https://www.figma.com/file/QBZvh8czFxsV8XJfMBVlcC/Messanger?node-id=0%3A1](https://www.figma.com/file/QBZvh8czFxsV8XJfMBVlcC/Messanger?node-id=0:1)

> Предварительный просмотр в Netlify: [![Netlify Status](https://api.netlify.com/api/v1/badges/69f2bec3-b856-4781-bc17-85b972126262/deploy-status)](https://ozihub.netlify.app)
> Предварительный просмотр в Heroku: [![Heroku Status](https://user-images.githubusercontent.com/29326762/201558415-139cf191-9437-4f41-8c31-7def37c2035a.svg)](https://ozihub.netlify.app)

  

## Технологии

  

- Сборщик проекта - [Webpack](https://webpack.js.org/)

- Шаблонизатор HTML - [Handlebars](https://handlebarsjs.com/)

- CSS - [PostCSS](https://postcss.org/)

- TypeScript - [TS](https://www.typescriptlang.org/)

- Статический анализ кода JS/TS Eslint - [Eslint](https://www.typescriptlang.org/)

- Статический анализ кода CSS Stylelint - [Stylelint](https://stylelint.io/)

- NodeJS - [v16.17.0](https://nodejs.org/dist/v16.17.0/)

- Локальный сервер - [Express](https://expressjs.com/)

- Используется контеризация -  [Docker](https://www.docker.com/)

  

## Развернуть мессанджер локально

-  `git clone https://github.com/imozi/middle.messenger.praktikum.yandex.git`

-  `cd middle.messenger.praktikum.yandex`

-  `npm i`

  

> Режимы запуска проекта

  

-  `npm run dev` - запуск в режиме разработки

-  `npm run build` - запуск сборки проекта

-  `npm start` - запуск локального сервера проекта на порту 3000

  
  

## Развернуть проект через Docker

-  У вас должен быть установлен [Docker](https://docs.docker.com/get-docker/)

-  Так же должен быть установлен [docker-compome](https://docs.docker.com/compose/install/) (Если вы установили Docker Desktop то docker-compose уже должен быть установлен)

  

-  `git clone https://github.com/imozi/middle.messenger.praktikum.yandex.git`

-  `cd middle.messenger.praktikum.yandex`

-  `docker-compose up -d (При этом Docker Desktop должен быть запущен), после сборки образа и запуска контейнера приложение будет доступно по адресу: http://localhost, при желании можно поменять порт в файле docker-compose.yaml в поле ports изменить 80 порт на любой другой который вам нужен, и тогда приложение будет доступно по адресу: http://localhost:${ваш порт}`
FROM node:16.17-alpine

WORKDIR /var/www

COPY ./package*.json ./

RUN npm i

COPY ./ .

EXPOSE 3000

CMD [ "npm", "start" ]
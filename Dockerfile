FROM node:12.16.1-alpine

ENV PORT=8080

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE $PORT
CMD [ "npm", "start" ]
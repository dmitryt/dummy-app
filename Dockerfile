FROM node:12.16.1-alpine

ENV PORT=8081

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8081
CMD [ "npm", "start" ]

FROM node:18-alpine as deps
WORKDIR /app

COPY package.json ./
RUN npm install

COPY ./ ./

CMD [ "node", "index.js" ]
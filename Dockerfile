FROM --platform=linux/amd64 node:18-alpice as deps
WORKDIR /app

COPY package.json ./
RUN npm install

COPY ./src ./

CMD [ "node", "index.js" ]
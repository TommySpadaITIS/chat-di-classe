FROM node:18

WORKDIR /app

COPY package.json ./
RUN npm install

COPY ./ws-server.js .

EXPOSE 3001
CMD ["node", "ws-server.js"]

FROM node:current

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3028

ENV NODE_ENV=prod

CMD ["npm", "start"]

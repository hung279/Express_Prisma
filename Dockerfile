FROM node:18-alpine3.16

EXPOSE 8080

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]
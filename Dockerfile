FROM node:20.9.0

WORKDIR /app

ENV PORT 8080

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "start"]
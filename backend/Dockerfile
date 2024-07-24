FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma db push

EXPOSE 4116

CMD ["npm", "start"]
# 도커로부터 node를 베이스 이미지로
FROM node:20.10.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]
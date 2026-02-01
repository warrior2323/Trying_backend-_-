FROM node:25-alpine
WORKDIR /usr/arc/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node","server.js"]
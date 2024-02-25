FROM node:21-alpine3.18
WORKDIR /app
COPY pacakage.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "server"]
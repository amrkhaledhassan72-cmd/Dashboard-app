FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000 4000
# required for docker desktop port mapping

# CMD ["npm", "run", "prod"]
CMD ["npm", "run", "dev"]
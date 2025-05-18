# Pull base image.
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Expose ports
EXPOSE 8080

CMD ["npm", "start"]

VOLUME '/db'
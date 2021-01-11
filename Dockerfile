FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN ls -lA
RUN npm run-script build
EXPOSE 8080
CMD [ "node", "/usr/src/app/server/server.js" ]
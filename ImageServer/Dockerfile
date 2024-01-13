FROM node:16
WORKDIR /home/azureuser/node/server
COPY package*.json ./
COPY . .
RUN npm install 
CMD ["bash", "-c", "echo Starting Node.js... && node app.js && echo Node.js stopped."]
CMD npm run start

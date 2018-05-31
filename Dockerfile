FROM node

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY frontend/justpostme/ .

EXPOSE 80
EXPOSE 443
 
RUN yarn add global serve@6.5.4
 
CMD [ "node", "server.js"]

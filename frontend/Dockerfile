FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY justpostme/ .

EXPOSE 80
EXPOSE 443
 
RUN yarn add global express
RUN yarn add global https
RUN yarn add global http
RUN yarn add global fs
 
CMD [ "node", "server.js"]

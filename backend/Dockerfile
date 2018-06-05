FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

EXPOSE 80
EXPOSE 6069
 
RUN yarn add global express
RUN yarn add global https
RUN yarn add global fs
RUN yarn add global mssql
RUN yarn add global body-parser
RUN yarn add global request
RUN yarn add global dotenv
 
CMD [ "node", "server.js"]

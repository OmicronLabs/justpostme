FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

EXPOSE 80
EXPOSE 6069
 
RUN apk update
RUN apk add openssh
RUN mkdir -p /root/.ssh
ADD id_rsa /root/.ssh/id_rsa
RUN chmod 700 /root/.ssh/id_rsa
RUN echo "Host mhutti1.eu\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config
RUN yarn add global express
RUN yarn add global https
RUN yarn add global fs
RUN yarn add global mssql
RUN yarn add global body-parser
RUN yarn add global request
RUN yarn add global dotenv
 
CMD [ "node", "server.js"]

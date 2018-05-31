FROM node

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY frontend/justpostme/build .

EXPOSE 80
EXPOSE 443
 
RUN yarn add global serve@6.5.4
 
CMD [ "yarn", "serve", ".", "-p", "443", "-T"]

FROM node

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY frontend/justpostme/build .

EXPOSE 80

RUN yarn add global serve

CMD [ "yarn", "serve", ".", "-l", "80"]

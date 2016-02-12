FROM node:latest

RUN apt-get update && \
    apt-get install -y git

RUN npm install -g sails grunt bower pm2 npm-check-updates
RUN mkdir /server

VOLUME ["/server"]
WORKDIR /server
EXPOSE 1337

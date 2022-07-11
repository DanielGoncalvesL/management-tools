FROM node:16.15.1

WORKDIR /home/usr/api

COPY package.json yarn.* ./

RUN yarn

COPY . .

ENV RUN_DOCKER=1

EXPOSE 8080

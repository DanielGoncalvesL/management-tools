FROM node:16.14.2-alpine

WORKDIR /home/usr/api

COPY package.json yarn.* ./

RUN yarn --prod

RUN yarn add -D typescript

COPY . .

ENV RUN_DOCKER=1

EXPOSE 8080

CMD ["yarn", "start"]

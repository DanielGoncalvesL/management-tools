FROM node:lts-alpine

RUN mkdir -p /home/root/api/node_modules && chown -R root:root /home/root/api

WORKDIR /home/root/api

COPY package.json yarn.* ./

USER root

RUN yarn

COPY --chown=root:root . .

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

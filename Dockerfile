FROM node:12.16.0-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git curl openssh-client

RUN mkdir -p /usr/src/tecton
WORKDIR /usr/src/tecton

COPY ./package.json ./yarn.lock ./
RUN yarn

COPY . .
RUN yarn run build

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
RUN yarn upload

ENV PORT=80
EXPOSE 80

CMD [ "sh", "-c", "./www" ]
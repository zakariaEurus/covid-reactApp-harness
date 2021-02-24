FROM node:12.19.0-alpine3.10

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

ENV APP=/app

RUN chmod -R 777 $APP

RUN yarn install

COPY . /app

RUN yarn build

CMD [ "yarn", "start"]


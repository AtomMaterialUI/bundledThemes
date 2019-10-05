FROM node:9-alpine

RUN ["mkdir", "/output"]

COPY . /src

WORKDIR /src

RUN ["yarn"]

CMD ["node", "index.js"]
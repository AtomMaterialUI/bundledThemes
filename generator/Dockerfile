FROM node:16-alpine

RUN ["mkdir", "/output"]

COPY . /src

WORKDIR /src

RUN ["yarn"]

CMD ["node", "index.js"]
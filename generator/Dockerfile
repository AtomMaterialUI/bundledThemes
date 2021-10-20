FROM node:17-alpine

RUN ["mkdir", "/output"]

COPY . /src

WORKDIR /src

RUN ["yarn"]

CMD ["node", "index.js"]
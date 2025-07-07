FROM node:22-alpine

RUN mkdir -p /node/app
WORKDIR /node/app

COPY --chown=node:node . ./

RUN npm install && chown -R node:node /node

EXPOSE 3000

USER node

CMD npm run start
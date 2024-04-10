FROM node
RUN mkdir -p /kafka-producer
WORKDIR /kafka-producer

ADD . ./
RUN yarn install --immutable
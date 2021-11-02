FROM node:16
ENV PORT=3001
WORKDIR /app

COPY ./package.json .

RUN yarn install

COPY . .

EXPOSE 3001

ENTRYPOINT ["/app/startup.sh"]
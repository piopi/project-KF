FROM node:16

WORKDIR /app

COPY . .
# Install client and build the client side
RUN cd /app/client && yarn install && INLINE_RUNTIME_CHUNK=false yarn build && mv /app/client/build /app/server
# Install the server
RUN cd /app/server && yarn install && cp -R /app/server/* /app/

EXPOSE 3001

CMD bash -c "cd /app && yarn seed & yarn start" 
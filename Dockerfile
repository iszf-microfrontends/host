ARG PORT

FROM node:16.20.0-alpine3.16 as builder

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.23.1-alpine as runner

COPY ./nginx.conf /etc/nginx/templates/nginx.conf.template

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html/

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
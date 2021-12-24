#stage 1
FROM node:latest as builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm install
COPY . .

RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=builder /usr/src/app/dist/christmas-trivia /usr/share/nginx/html
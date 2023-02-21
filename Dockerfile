FROM node:17.0.0 as build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:17.0.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY --from=build /app/dist ./dist
EXPOSE 80
CMD npm run start:prod
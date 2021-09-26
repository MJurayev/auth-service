FROM node:14.16.1-alpine as build-cache

RUN mkdir -p /web_client
WORKDIR /web_client
COPY ./web_client/package.json /web_client

RUN npm i 

COPY ./web_client/ .

RUN npm run build --prod


FROM node:14.16.1-alpine
RUN mkdir /auth_service
WORKDIR /auth_service


#copy backend files and install packages
# COPY ./api/package.json .
COPY ./api/. .
RUN npm i

#if has bcrypt in package.json
RUN npm uninstall bcrypt
RUN npm i bcrypt 

#copy frontend files
RUN mkdir build
COPY --from=build-cache /web_client/dist/todo1 /auth_service/build

# set enviroment variable
ENV PORT=8000
ENV NODE_ENV=production
EXPOSE 8000
CMD ["npm", "start"]
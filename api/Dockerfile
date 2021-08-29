FROM node:14-alpine
RUN mkdir auth-service
WORKDIR /auth-service

COPY . .

RUN npm i
ENV PORT=8000
ENV NODE_ENV=production
EXPOSE 8000
CMD ["node", "app.js"]
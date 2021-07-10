FROM node:14.16.1
LABEL maintainer milan@darkrush.photo
VOLUME ["/root"]
WORKDIR /usr/src/app
COPY dist/package*.json ./
RUN npm install --only=production > /dev/null
COPY dist/apps/web-socket/. /usr/src/app/dist/socket
EXPOSE 8082
CMD ["node", "/usr/src/app/dist/socket/main"]
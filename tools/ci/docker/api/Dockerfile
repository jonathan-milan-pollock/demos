FROM node:14.16.1
LABEL maintainer milan@darkrush.photo
VOLUME ["/root"]
ADD /docker/api/install-tools.sh /root
RUN /root/install-tools.sh
WORKDIR /usr/src/app
COPY dist/package*.json ./
RUN npm install --only=production > /dev/null
COPY dist/apps/api/. /usr/src/app/dist/api
EXPOSE 8081
CMD ["node", "/usr/src/app/dist/api/main"]
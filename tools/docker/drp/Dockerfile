FROM node:14.16.1
LABEL maintainer milan@darkrush.photo
VOLUME ["/root"]
ADD /tools/docker/drp/install-tools.sh /root
RUN /root/install-tools.sh
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production > /dev/null
COPY dist/website/. /usr/src/app/dist/website
EXPOSE 8080
CMD ["node", "/usr/src/app/dist/website/server/main"]
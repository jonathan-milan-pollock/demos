FROM node:10.24.1 AS builder
LABEL maintainer milan@darkrush.photo
VOLUME ["/root"]
ADD /tools/docker/install-tools.sh /root
RUN /root/install-tools.sh
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production > /dev/null
COPY dist/website/. /usr/src/app/dist/website
CMD [ "node", "/usr/src/app/dist/website/server/main" ]

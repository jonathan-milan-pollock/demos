FROM node:10.24.1 AS builder
LABEL maintainer milan@darkrush.photo
VOLUME ["/root"]
ADD /tools/docker/install-ffmpeg.sh /root
RUN /root/install-ffmpeg.sh
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production > /dev/null
COPY dist/website/. /usr/src/app/dist/website
CMD [ "node", "/usr/src/app/dist/website/server/main" ]

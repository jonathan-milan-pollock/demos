FROM node:14.16.1
LABEL maintainer milan@darkrush.photo
VOLUME ["/root"]
RUN apt-get update
RUN apt-get install -y ffmpeg
RUN apt-get install -y melt
WORKDIR /usr/src/app
COPY dist/node_modules/ ./node_modules/
COPY dist/apps/api/. /usr/src/app/dist/api
EXPOSE 8081
CMD ["node", "/usr/src/app/dist/api/main"]
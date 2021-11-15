FROM node:14.16.1
LABEL maintainer milan@darkrush.photo
VOLUME ["/root"]
RUN apt-get update
RUN apt-get install -y libasound2
RUN apt-get install -y libc6
RUN apt-get install -y wget

WORKDIR /usr/bin
RUN wget https://github.com/mltframework/shotcut/releases/download/v21.10.31/shotcut-linux-x86_64-211031.AppImage && \
  chmod +x /usr/bin/shotcut-linux-x86_64-211031.AppImage && \
  /usr/bin/shotcut-linux-x86_64-211031.AppImage --appimage-extract && \
  rm /usr/bin/shotcut-linux-x86_64-211031.AppImage

WORKDIR /usr/src/app
COPY dist/node_modules/ ./node_modules/
COPY dist/apps/api/. /usr/src/app/dist/api
EXPOSE 8081
CMD ["node", "/usr/src/app/dist/api/main"]

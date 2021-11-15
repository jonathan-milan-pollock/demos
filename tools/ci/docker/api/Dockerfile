FROM node:14.16.1
LABEL maintainer milan@darkrush.photo
VOLUME ["/root"]
RUN apt-get update
RUN apt-get install -y wget

# $ wget https://github.com/mltframework/shotcut/releases/download/v15.06/shotcut-debian7-x86_64-150601.tar.bz2
# $ tar -xjvf shotcut-debian7-x86_64-150601.tar.bz2
# $ sudo rm -rf /opt/shotcut
# $ sudo mv Shotcut /opt/shotcut
# $ sudo ln -sf /opt/Shotcut/Shotcut.app/shotcut /usr/bin/shotcut

# RUN apt-get install -y snapd
# RUN apt-get install shotcut --classic
WORKDIR /usr/bin
RUN wget https://github.com/mltframework/shotcut/releases/download/v21.10.31/shotcut-linux-x86_64-211031.AppImage && \
  exec shotcut-linux-x86_64-211031.AppImage --appimage-extract && \
  rm shotcut-linux-x86_64-211031.AppImage






#&& rm -rf /opt/shotcut
# COPY Shotcut /usr/bin/shotcut
# /usr/bin/shotcut/bin/melt

# COPY /opt/shotcut/Shotcut.app/shotcut/. /usr/bin/shotcut
# sudo ln -sf

RUN ls /usr/bin/

WORKDIR /usr/src/app
COPY dist/node_modules/ ./node_modules/
COPY dist/apps/api/. /usr/src/app/dist/api
EXPOSE 8081
CMD ["node", "/usr/src/app/dist/api/main"]

FROM node:14.16.1
LABEL maintainer milan@darkrush.photo
VOLUME ["/root"]
ADD /docker/api/install-tools.sh /root
USER root
RUN /root/install-tools.sh
WORKDIR /usr/src/app
COPY dist/node_modules/ ./node_modules/
RUN ls -la ./node_modules/*
COPY dist/apps/api/. /usr/src/app/dist/api
EXPOSE 8081
CMD ["node", "/usr/src/app/dist/api/main"]